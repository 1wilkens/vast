//    _   _____   __________
//   | | / / _ | / __/_  __/     Visibility
//   | |/ / __ |_\ \  / /          Across
//   |___/_/ |_/___/ /_/       Space and Time
//
// SPDX-FileCopyrightText: (c) 2022 The VAST Contributors
// SPDX-License-Identifier: BSD-3-Clause

#pragma once

#include <vast/type.hpp>

#include <string>

namespace vast::plugins::web {

// The configuration that can be set by the user via
// YAML or command-line options.
struct configuration {
  static const record_type& layout() noexcept {
    static auto result = vast::record_type{
      {"bind", vast::string_type{}},    {"port", vast::integer_type{}},
      {"mode", vast::string_type{}},    {"certfile", vast::string_type{}},
      {"keyfile", vast::string_type{}},
    };
    return result;
  }

  template <class Inspector>
  friend auto inspect(Inspector& f, configuration& x) {
    return f(caf::meta::type_name("vast.plugins.rest.configuration"),
             x.bind_address, x.port, x.mode, x.certfile, x.keyfile);
  }

  enum class server_mode {
    dev,
    server,
    upstream,
    mtls,
  };

  std::string mode = "server";
  std::string certfile = {};
  std::string keyfile = {};
  std::string bind_address = "127.0.0.1";
  int port = 42001;
};

// The resolved and validated configuration that gets used at runtime.
class server_config {
public:
  /// The listen address of the server.
  std::string bind_address = {};

  /// The listen port of the server.
  uint16_t port = {};

  /// Whether the server should allow plain http requests.
  bool require_tls = true;

  /// Whether the server should require client certificates for
  /// incoming connections.
  bool require_clientcerts = false;

  /// Whether the server should require a valid authentication token
  /// for API requests.
  bool require_authentication = true;

  /// Whether to allow the server to bind to non-local addresses.
  bool require_localhost = true;

  /// The path to the TLS certificate.
  std::filesystem::path certfile = {};

  /// The path to the TLS private key.
  std::filesystem::path keyfile = {};
};

/// Validate that the user-provided configuration makes sense.
caf::expected<server_config> convert_and_validate(configuration);

} // namespace vast::plugins::web
