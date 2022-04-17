//    _   _____   __________
//   | | / / _ | / __/_  __/     Visibility
//   | |/ / __ |_\ \  / /          Across
//   |___/_/ |_/___/ /_/       Space and Time
//
// SPDX-FileCopyrightText: (c) 2016 The VAST Contributors
// SPDX-License-Identifier: BSD-3-Clause

#pragma once

#include "vast/concept/parseable/numeric/integral.hpp"
#include "vast/concepts.hpp"
#include "vast/detail/type_list.hpp"

#include <cmath>
#include <limits>
#include <type_traits>

namespace vast {
namespace policy {

struct require_dot {};
struct optional_dot {};

} // namespace policy

struct float_parser : parser_base<float_parser> {
  using attribute = float;
  template <class Iterator>
  bool parse(Iterator& f, const Iterator& l, unused_type) const;

  template <class Iterator>
  bool parse(Iterator& f, const Iterator& l, float& a) const;
};

struct double_parser : parser_base<double_parser> {
  using attribute = double;
  template <class Iterator>
  bool parse(Iterator& f, const Iterator& l, unused_type) const;

  template <class Iterator>
  bool parse(Iterator& f, const Iterator& l, double& a) const;
};

template <>
struct parser_registry<float> {
  using type = float_parser;
};

template <>
struct parser_registry<double> {
  using type = double_parser;
};

namespace parsers {

auto const fp = float_parser{};
auto const real = double_parser{};
auto const fp_opt_dot = float_parser{};
auto const real_opt_dot = double_parser{};

} // namespace parsers
} // namespace vast

