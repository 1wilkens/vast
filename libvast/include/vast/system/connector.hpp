//    _   _____   __________
//   | | / / _ | / __/_  __/     Visibility
//   | |/ / __ |_\ \  / /          Across
//   |___/_/ |_/___/ /_/       Space and Time
//
// SPDX-FileCopyrightText: (c) 2023 The VAST Contributors
// SPDX-License-Identifier: BSD-3-Clause

#pragma once

#include "vast/system/actors.hpp"

#include <caf/io/middleman_actor.hpp>
#include <caf/typed_event_based_actor.hpp>

namespace vast::system {

struct connector_state {
  // Actor responsible for TCP connection with a remote node.
  caf::io::middleman_actor middleman;
};

/// @brief Creates an actor that establishes the connection to a remote VAST
/// node.
/// @return actor handle that can be used to connect with a remote vast node.
connector_actor::behavior_type
connector(connector_actor::stateful_pointer<connector_state> self);

} // namespace vast::system
