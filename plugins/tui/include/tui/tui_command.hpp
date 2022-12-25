//    _   _____   __________
//   | | / / _ | / __/_  __/     Visibility
//   | |/ / __ |_\ \  / /          Across
//   |___/_/ |_/___/ /_/       Space and Time
//
// SPDX-FileCopyrightText: (c) 2022 The VAST Contributors
// SPDX-License-Identifier: BSD-3-Clause

#pragma once

#include <vast/command.hpp>
#include <vast/fwd.hpp>

#include <caf/fwd.hpp>
#include <caf/message.hpp>

namespace vast::plugins::tui {

caf::message tui_command(const invocation&, caf::actor_system&);

} // namespace vast::plugins::tui