//    _   _____   __________
//   | | / / _ | / __/_  __/     Visibility
//   | |/ / __ |_\ \  / /          Across
//   |___/_/ |_/___/ /_/       Space and Time
//
// SPDX-FileCopyrightText: (c) 2018 The VAST Contributors
// SPDX-License-Identifier: BSD-3-Clause

#include "vast/system/connect_to_node.hpp"

#include "vast/fwd.hpp"

#include "vast/concept/parseable/vast/endpoint.hpp"
#include "vast/defaults.hpp"
#include "vast/endpoint.hpp"
#include "vast/error.hpp"
#include "vast/logger.hpp"
#include "vast/system/connector.hpp"
#include "vast/system/node_control.hpp"
#include "vast/system/version_command.hpp"

#include <caf/scoped_actor.hpp>
#include <caf/settings.hpp>

namespace vast::system {
namespace {

void check_version(record& remote_version) {
  auto local_version = retrieve_versions();
  if (local_version["VAST"] != remote_version["VAST"])
    VAST_WARN("client version {} does not match remote version {}; "
              "this may cause unexpected behavior",
              local_version["VAST"], remote_version["VAST"]);
  else
    VAST_DEBUG("client verified that local VAST version matches remote "
               "VAST version {}",
               local_version["VAST"]);
  if (local_version["plugins"] != remote_version["plugins"])
    VAST_WARN("client plugins {} do not match remote plugins {}; "
              "this may cause unexpected behavior",
              local_version["plugins"], remote_version["plugins"]);
  else
    VAST_DEBUG("client verified that local VAST plugins match remote "
               "VAST plugins {}",
               local_version["plugins"]);
}

caf::expected<endpoint> get_node_endpoint(const caf::settings& opts) {
  endpoint node_endpoint;
  auto endpoint_str
    = get_or(opts, "vast.endpoint", defaults::system::endpoint.data());
  if (!parsers::endpoint(endpoint_str, node_endpoint))
    return caf::make_error(ec::parse_error, "invalid endpoint",
                           endpoint_str.data());
  // Default to port 42000/tcp if none is set.
  if (!node_endpoint.port)
    node_endpoint.port = port{defaults::system::endpoint_port, port_type::tcp};
  if (node_endpoint.port->type() == port_type::unknown)
    node_endpoint.port->type(port_type::tcp);
  if (node_endpoint.port->type() != port_type::tcp)
    return caf::make_error(ec::invalid_configuration, "invalid protocol",
                           *node_endpoint.port);
  if (node_endpoint.host.empty())
    node_endpoint.host = defaults::system::endpoint_host;
  return node_endpoint;
}

} // namespace

caf::expected<node_actor>
connect_to_node(caf::scoped_actor& self, const caf::settings& opts) {
  // Fetch values from config.
  auto node_endpoint = get_node_endpoint(opts);
  if (!node_endpoint)
    return std::move(node_endpoint.error());
  auto timeout = node_connection_timeout(opts);
  auto connector_actor
    = self->spawn(connector, defaults::system::node_connection_retries,
                  defaults::system::node_connection_retry_delay,
                  *node_endpoint->port, node_endpoint->host, timeout);
  auto result = caf::expected<node_actor>{caf::error{}};
  self->request(connector_actor, caf::infinite, atom::connect_v)
    .receive(
      [&](node_actor& res) {
        result = std::move(res);
      },
      [&](caf::error& err) {
        result = std::move(err);
      });
  if (!result) {
    return result;
  }
  self->request(*result, timeout, atom::get_v, atom::version_v)
    .receive(
      [&](record& remote_version) {
        check_version(remote_version);
      },
      [&](caf::error& error) {
        result = caf::make_error(ec::version_error,
                                 fmt::format("failed to receive remote version "
                                             "within specified "
                                             "connection-timeout of {}: {}",
                                             timeout, std::move(error)));
      });
  return result;
}

} // namespace vast::system
