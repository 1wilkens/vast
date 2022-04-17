//    _   _____   __________
//   | | / / _ | / __/_  __/     Visibility
//   | |/ / __ |_\ \  / /          Across
//   |___/_/ |_/___/ /_/       Space and Time
//
// SPDX-FileCopyrightText: (c) 2022 The VAST Contributors
// SPDX-License-Identifier: BSD-3-Clause

#include "vast/concept/parseable/numeric/real.hpp"

#include "vast/logger.hpp"

#include <fast_float/fast_float.h>

#include <string>

namespace vast {

template <class Iterator>
bool float_parser::parse(Iterator& f, const Iterator& l, unused_type) const {
  float result;
  auto answer = fast_float::from_chars(&*f, &*l, result,
                                       fast_float::chars_format::general);
  f += answer.ptr - &*f;
  return answer.ec == std::errc();
}

template <class Iterator>
bool float_parser::parse(Iterator& f, const Iterator& l, float& a) const {
  auto answer
    = fast_float::from_chars(&*f, &*l, a, fast_float::chars_format::general);
  f += answer.ptr - &*f;
  return answer.ec == std::errc();
}

template bool
float_parser::parse(std::string::iterator&, const std::string::iterator&,
                    unused_type) const;
template bool float_parser::parse(std::string::iterator&,
                                  const std::string::iterator&, float&) const;

template bool
float_parser::parse(std::string::const_iterator&,
                    const std::string::const_iterator&, unused_type) const;
template bool
float_parser::parse(std::string::const_iterator&,
                    const std::string::const_iterator&, float&) const;

template bool
float_parser::parse(char const*&, char const* const&, unused_type) const;
template bool
float_parser::parse(char const*&, char const* const&, float&) const;

template <class Iterator>
bool double_parser::parse(Iterator& f, const Iterator& l, unused_type) const {
  double result;
  auto answer = fast_float::from_chars(&*f, &*l, result,
                                       fast_float::chars_format::general);
  f += answer.ptr - &*f;
  return answer.ec == std::errc();
}

template <class Iterator>
bool double_parser::parse(Iterator& f, const Iterator& l, double& a) const {
  auto answer
    = fast_float::from_chars(&*f, &*l, a, fast_float::chars_format::general);
  f += answer.ptr - &*f;
  return answer.ec == std::errc();
}

template bool
double_parser::parse(std::string::iterator&, const std::string::iterator&,
                     unused_type) const;
template bool double_parser::parse(std::string::iterator&,
                                   const std::string::iterator&, double&) const;

template bool
double_parser::parse(std::string::const_iterator&,
                     const std::string::const_iterator&, unused_type) const;
template bool
double_parser::parse(std::string::const_iterator&,
                     const std::string::const_iterator&, double&) const;

template bool
double_parser::parse(char const*&, char const* const&, unused_type) const;
template bool
double_parser::parse(char const*&, char const* const&, double&) const;

} // namespace vast
