//    _   _____   __________
//   | | / / _ | / __/_  __/     Visibility
//   | |/ / __ |_\ \  / /          Across
//   |___/_/ |_/___/ /_/       Space and Time
//
// SPDX-FileCopyrightText: (c) 2022 The VAST Contributors
// SPDX-License-Identifier: BSD-3-Clause

#pragma once

#include <vast/fwd.hpp>
// #include <vast/http_api.hpp>
#include <vast/plugin.hpp>
#include <vast/system/actors.hpp>

#include <memory>

namespace vast::plugins::web {

class restinio_response;
using restinio_response_ptr = std::shared_ptr<restinio_response>;

using token_t = std::string;

} // namespace vast::plugins::web

CAF_BEGIN_TYPE_ID_BLOCK(vast_rest_plugin_types, 1500)
  CAF_ADD_TYPE_ID(vast_rest_plugin_types,
                  (vast::plugins::web::restinio_response))
  CAF_ADD_TYPE_ID(vast_rest_plugin_types,
                  (std::shared_ptr<vast::plugins::web::restinio_response>))

  CAF_ADD_ATOM(vast_rest_plugin_types, vast::atom, generate, "generate")
  CAF_ADD_ATOM(vast_rest_plugin_types, vast::atom, validate, "validate")
CAF_END_TYPE_ID_BLOCK(vast_rest_plugin_types)

namespace vast::plugins::web {

/// Server-side AUTHENTICATOR actor.
using authenticator_actor = system::typed_actor_fwd<
  caf::replies_to<atom::generate>::with<token_t>,
  caf::replies_to<atom::validate, token_t>::with<bool>>::
  extend_with<system::status_client_actor>::unwrap;

} // namespace vast::plugins::web

CAF_BEGIN_TYPE_ID_BLOCK(vast_rest_plugin_actors, vast_rest_plugin_types::end)
  CAF_ADD_TYPE_ID(vast_rest_plugin_actors,
                  (vast::plugins::web::authenticator_actor))
CAF_END_TYPE_ID_BLOCK(vast_rest_plugin_actors)

CAF_ALLOW_UNSAFE_MESSAGE_TYPE(vast::plugins::web::restinio_response);
