//    _   _____   __________
//   | | / / _ | / __/_  __/     Visibility
//   | |/ / __ |_\ \  / /          Across
//   |___/_/ |_/___/ /_/       Space and Time
//
// SPDX-FileCopyrightText: (c) 2022 The VAST Contributors
// SPDX-License-Identifier: BSD-3-Clause

#include "vast/system/connector.hpp"

#include "vast/concept/printable/to_string.hpp"
#include "vast/concept/printable/vast/port.hpp"
#include "vast/defaults.hpp"
#include "vast/logger.hpp"
#include "vast/system/node_control.hpp"
#include "vast/system/version_command.hpp"

#include <caf/io/middleman.hpp>
#include <caf/openssl/all.hpp>

namespace vast::system {

namespace {
bool is_non_recoverable_error_enum(caf::sec err_enum) {
  switch (err_enum) {
    case caf::sec::none:
    case caf::sec::unexpected_message:
    case caf::sec::unexpected_response:
    case caf::sec::request_receiver_down:
    case caf::sec::request_timeout:
    case caf::sec::no_such_group_module:
    case caf::sec::no_actor_published_at_port:
    case caf::sec::unexpected_actor_messaging_interface:
    case caf::sec::state_not_serializable:
    case caf::sec::unsupported_sys_key:
    case caf::sec::unsupported_sys_message:
    case caf::sec::disconnect_during_handshake:
    case caf::sec::cannot_forward_to_invalid_actor:
    case caf::sec::no_route_to_receiving_node:
    case caf::sec::failed_to_assign_scribe_from_handle:
    case caf::sec::failed_to_assign_doorman_from_handle:
    case caf::sec::cannot_close_invalid_port:
    case caf::sec::cannot_connect_to_node:
    case caf::sec::cannot_open_port:
    case caf::sec::network_syscall_failed:
    case caf::sec::invalid_argument:
    case caf::sec::invalid_protocol_family:
    case caf::sec::cannot_publish_invalid_actor:
    case caf::sec::cannot_spawn_actor_from_arguments:
    case caf::sec::end_of_stream:
    case caf::sec::no_context:
    case caf::sec::unknown_type:
    case caf::sec::no_proxy_registry:
    case caf::sec::runtime_error:
    case caf::sec::remote_linking_failed:
    case caf::sec::cannot_add_upstream:
    case caf::sec::upstream_already_exists:
    case caf::sec::invalid_upstream:
    case caf::sec::cannot_add_downstream:
    case caf::sec::downstream_already_exists:
    case caf::sec::invalid_downstream:
    case caf::sec::no_downstream_stages_defined:
    case caf::sec::stream_init_failed:
    case caf::sec::invalid_stream_state:
    case caf::sec::unhandled_stream_error:
    case caf::sec::bad_function_call:
    case caf::sec::feature_disabled:
    case caf::sec::cannot_open_file:
    case caf::sec::socket_invalid:
    case caf::sec::socket_disconnected:
    case caf::sec::socket_operation_failed:
    case caf::sec::unavailable_or_would_block:
    case caf::sec::malformed_basp_message:
    case caf::sec::serializing_basp_payload_failed:
    case caf::sec::redundant_connection:
    case caf::sec::remote_lookup_failed:
    case caf::sec::no_tracing_context:
    case caf::sec::all_requests_failed:
    case caf::sec::field_invariant_check_failed:
    case caf::sec::field_value_synchronization_failed:
    case caf::sec::invalid_field_type:
    case caf::sec::unsafe_type:
    case caf::sec::save_callback_failed:
    case caf::sec::load_callback_failed:
    case caf::sec::conversion_failed:
    case caf::sec::connection_closed:
    case caf::sec::type_clash:
    case caf::sec::unsupported_operation:
    case caf::sec::no_such_key:
    case caf::sec::broken_promise:
    case caf::sec::connection_timeout:
    case caf::sec::action_reschedule_failed:
      return false;
    case caf::sec::incompatible_versions:
    case caf::sec::incompatible_application_ids:
      return true;
  }
  return true;
}

bool is_non_recoverable_error(const caf::error& err) {
  if (err.category() != caf::type_id_v<caf::sec>)
    return false;
  const auto err_code = std::underlying_type_t<caf::sec>{err.code()};
  auto err_enum = caf::sec{caf::sec::none};
  if (!caf::from_integer(err_code, err_enum)) {
    VAST_WARN("unable to retrieve error code for a remote node connection "
              "error:{}",
              err);
    return false;
  }
  return is_non_recoverable_error_enum(err_enum);
}
} // namespace

connector_actor::behavior_type
connector(connector_actor::stateful_pointer<connector_state> self,
          std::size_t max_connection_attempts,
          caf::timespan connection_retry_delay, vast::port port,
          std::string host, caf::timespan connection_timeout) {
  self->state.connection_retry_delay = connection_retry_delay;
  self->state.port = std::move(port);
  self->state.host = std::move(host);
  self->state.node_connection_timeout = connection_timeout;
  return {[self,
           max_connection_attempts](atom::connect) -> caf::result<node_actor> {
            if (self->state.promise.pending())
              return self->state.promise;
            self->state.remaining_connection_attempts = max_connection_attempts;
            self->state.promise = self->make_response_promise<node_actor>();
            VAST_INFO("client connects to VAST node at {}", self->state.host);
            self->send(self, atom::internal_v, atom::start_v);
            return self->state.promise;
          },
          [self](atom::internal, atom::start) {
            auto middleman = self->system().has_openssl_manager()
                               ? self->system().openssl_manager().actor_handle()
                               : self->system().middleman().actor_handle();
            self
              ->request(middleman, self->state.node_connection_timeout,
                        caf::connect_atom_v, self->state.host,
                        self->state.port.number())
              .then(
                [self](const caf::node_id& node_id, caf::strong_actor_ptr& node,
                       const std::set<std::string>&) {
                  VAST_DEBUG("client connected to VAST node: {} at {}:{}",
                             to_string(node_id), self->state.host,
                             to_string(self->state.port));
                  self->state.promise.deliver(
                    caf::actor_cast<node_actor>(std::move(node)));
                },
                [self](caf::error& err) {
                  if (is_non_recoverable_error(err)
                      || --self->state.remaining_connection_attempts == 0) {
                    self->state.promise.deliver(caf::make_error(
                      ec::system_error,
                      fmt::format("failed to connect to VAST node at {}:{}: {}",
                                  self->state.host, self->state.port.number(),
                                  std::move(err))));
                  } else {
                    self->delayed_send(self, self->state.connection_retry_delay,
                                       atom::internal_v, atom::start_v);
                  }
                });
          }};
}

} // namespace vast::system
