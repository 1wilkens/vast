//    _   _____   __________
//   | | / / _ | / __/_  __/     Visibility
//   | |/ / __ |_\ \  / /          Across
//   |___/_/ |_/___/ /_/       Space and Time
//
// SPDX-FileCopyrightText: (c) 2022 The VAST Contributors
// SPDX-License-Identifier: BSD-3-Clause

#pragma once

#include <vast/http_api.hpp>
#include <vast/plugin.hpp>

#include <restinio/compiler_features.hpp>
#include <restinio/message_builders.hpp>
#include <restinio/request_handler.hpp>
#include <restinio/router/express.hpp>

namespace vast::plugins::web {

// Note: If desired, `restinio` provides users to embed arbitrary `extra_data`
// into each request.
using request_handle_t
  = restinio::generic_request_handle_t<restinio::no_extra_data_factory_t::data_t>;
using response_t
  = restinio::response_builder_t<restinio::user_controlled_output_t>;
using route_params_t = restinio::router::route_params_t;

class restinio_response final : public vast::http_response {
public:
  restinio_response(request_handle_t&& handle, route_params_t&& route_params,
                    const rest_endpoint&);
  ~restinio_response() override;

  restinio_response(restinio_response&&) = default;
  restinio_response(const restinio_response&) = delete;
  restinio_response& operator=(const restinio_response&) = delete;
  restinio_response& operator=(restinio_response&&) = delete;

  void append(std::string body) override;

  void abort(uint16_t error_code, std::string message) override;

  // Add a custom response header.
  void add_header(std::string field, std::string value);

  // Get a handle to the original request.
  [[nodiscard]] const request_handle_t& request() const;

  // Get a handle to the original route parameters.
  [[nodiscard]] const route_params_t& route_params() const;

private:
  request_handle_t request_;
  route_params_t route_params_;
  response_t response_;
  size_t body_size_ = {};
};

} // namespace vast::plugins::web
