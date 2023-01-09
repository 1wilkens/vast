//    _   _____   __________
//   | | / / _ | / __/_  __/     Visibility
//   | |/ / __ |_\ \  / /          Across
//   |___/_/ |_/___/ /_/       Space and Time
//
// SPDX-FileCopyrightText: (c) 2022 The VAST Contributors
// SPDX-License-Identifier: BSD-3-Clause

#pragma once

#include "vast/fwd.hpp"

#include "vast/port.hpp"
#include "vast/system/actors.hpp"

#include <caf/timespan.hpp>
#include <caf/typed_event_based_actor.hpp>
#include <caf/typed_response_promise.hpp>

#include <string>

namespace vast::system {

struct connector_state {
  /// The amount of connection attempts left before failing.
  std::size_t remaining_connection_attempts{0u};
  /// Delay between two connection attempts.
  caf::timespan connection_retry_delay{0u};
  /// The port of a remote node server.
  class port port;
  /// The hostname or IP address of a remote node server.
  std::string host;
  /// Middleman request timeout.
  caf::timespan node_connection_timeout;
};

/// @brief Creates an actor that establishes the connection to a remote vast
/// node
/// @param max_connection_attempts The maximum number of times the connector will
/// try to connect with a remote node when the connection can't be established.
/// @param connection_retry_delay delay between two connection attempts.
/// @param port port of a remote node server.
/// @param host hostname or IP address of a remote node server.
/// @param connection_timeout middleman request timeout.
/// @return actor handle that can be used to connect with a remote vast node.
connector_actor::behavior_type
connector(connector_actor::stateful_pointer<connector_state> self,
          std::size_t max_connection_attempts,
          caf::timespan connection_retry_delay, vast::port port,
          std::string host, caf::timespan connection_timeout);

} // namespace vast::system
