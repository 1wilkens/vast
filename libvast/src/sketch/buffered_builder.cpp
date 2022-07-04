//    _   _____   __________
//   | | / / _ | / __/_  __/     Visibility
//   | |/ / __ |_\ \  / /          Across
//   |___/_/ |_/___/ /_/       Space and Time
//
// SPDX-FileCopyrightText: (c) 2021 The VAST Contributors
// SPDX-License-Identifier: BSD-3-Clause

#include "vast/sketch/buffered_builder.hpp"

#include "vast/detail/array_hasher.hpp"
#include "vast/error.hpp"
#include "vast/sketch/sketch.hpp"

#include <arrow/record_batch.h>
#include <caf/error.hpp>
#include <caf/expected.hpp>
#include <fmt/format.h>

namespace vast::sketch {

caf::error buffered_builder::add(const std::shared_ptr<arrow::Array>& xs) {
  for (auto digest : detail::hash_array(*xs))
    digests_.insert(digest);
  // TODO: figure out how to handle NULL values.
  return caf::none;
}

caf::expected<sketch> buffered_builder::finish() {
  auto result = build(digests_);
  if (result)
    digests_.clear();
  return result;
}

const std::unordered_set<uint64_t>& buffered_builder::digests() const {
  return digests_;
}

} // namespace vast::sketch
