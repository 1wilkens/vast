//    _   _____   __________
//   | | / / _ | / __/_  __/     Visibility
//   | |/ / __ |_\ \  / /          Across
//   |___/_/ |_/___/ /_/       Space and Time
//
// SPDX-FileCopyrightText: (c) 2020 The VAST Contributors
// SPDX-License-Identifier: BSD-3-Clause

#include "vast/io/read.hpp"

#include "vast/as_bytes.hpp"
#include "vast/error.hpp"
#include "vast/file.hpp"
#include "vast/logger.hpp"

#include <cstddef>
#include <filesystem>
#include <span>

namespace vast::io {

caf::error
read(const std::filesystem::path& filename, std::span<std::byte> xs) {
  file f{filename};
  if (!f.open(file::read_only))
    return caf::make_error(ec::filesystem_error, "failed open file");
  auto bytes_read = f.read(xs.data(), xs.size());
  if (!bytes_read)
    return bytes_read.error();
  if (*bytes_read != xs.size())
    return caf::make_error(ec::filesystem_error, "incomplete read of",
                           filename.string());
  return caf::none;
}

caf::expected<std::vector<std::byte>>
read(const std::filesystem::path& filename) {
  std::error_code err{};
  const auto size = std::filesystem::file_size(filename, err);
  if (size == static_cast<std::uintmax_t>(-1))
    return caf::make_error(ec::filesystem_error,
                           fmt::format("failed to get file size for filename "
                                       "{}: {}",
                                       filename, err.message()));
  std::vector<std::byte> buffer(size);
  if (auto err = read(filename, as_writeable_bytes(buffer)))
    return err;
  return buffer;
}

} // namespace vast::io
