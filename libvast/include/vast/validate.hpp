//    _   _____   __________
//   | | / / _ | / __/_  __/     Visibility
//   | |/ / __ |_\ \  / /          Across
//   |___/_/ |_/___/ /_/       Space and Time
//
// SPDX-FileCopyrightText: (c) 2022 The VAST Contributors
// SPDX-License-Identifier: BSD-3-Clause

#pragma once

#include <vast/data.hpp>

#include <caf/error.hpp>

namespace vast {

enum class validate {
  // No data must have an incompatible layout entry.
  // Ensures forward compatibility by skipping over unknown fields.
  permissive,
  // All data must have a compatible layout entry.
  strict,
  // The data must correspond exactly to the layout, ie. no fields
  // can be left out to get a default value. Mostly useful for tests.
  exhaustive,
};

/// Check that all keys in `data` are found in `configuration::layout` with
/// the correct type.
caf::error validate(const vast::data&, const vast::record_type& layout,
                    enum validate mode);

} // namespace vast
