//    _   _____   __________
//   | | / / _ | / __/_  __/     Visibility
//   | |/ / __ |_\ \  / /          Across
//   |___/_/ |_/___/ /_/       Space and Time
//
// SPDX-FileCopyrightText: (c) 2023 The VAST Contributors
// SPDX-License-Identifier: BSD-3-Clause

#pragma once

#include "vast/port.hpp"

#include <caf/timespan.hpp>

#include <string>

namespace vast::system {

struct connect_request {
  /// The number of times the connector will
  /// try to connect with a remote node when the connection can't be established.
  std::uint64_t remaining_attempts = 0u;
  /// Delay between two connection attempts.
  caf::timespan retry_delay;
  /// Middleman request timeout.
  caf::timespan timeout;
  /// Port of a remote node server.
  vast::port::number_type port;
  /// Hostname or IP address of a remote node server.
  std::string host;
};

bool inspect(auto& f, connect_request& x) {
  return f.object(x)
    .pretty_name("connect_request")
    .fields(f.field("remaining_attempts", x.remaining_attempts),
            f.field("retry_delay", x.retry_delay),
            f.field("timeout", x.timeout), f.field("port", x.port),
            f.field("host", x.host));
}

} // namespace vast::system
