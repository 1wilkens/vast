//    _   _____   __________
//   | | / / _ | / __/_  __/     Visibility
//   | |/ / __ |_\ \  / /          Across
//   |___/_/ |_/___/ /_/       Space and Time
//
// SPDX-FileCopyrightText: (c) 2021 The VAST Contributors
// SPDX-License-Identifier: BSD-3-Clause

#include <vast/data.hpp>
#include <vast/error.hpp>
#include <vast/logger.hpp>
#include <vast/plugin.hpp>
#include <vast/system/catalog.hpp>
#include <vast/system/index.hpp>
#include <vast/system/node_control.hpp>
#include <vast/system/spawn_or_connect_to_node.hpp>

#include <caf/function_view.hpp>
#include <caf/scoped_actor.hpp>

namespace vast::plugins::rebuild {

namespace {

caf::message rebuild_command(const invocation& inv, caf::actor_system& sys) {
  // Create a scoped actor for interaction with the actor system.
  auto self = caf::scoped_actor{sys};
  // Connect to the node.
  auto node_opt = system::spawn_or_connect_to_node(self, inv.options,
                                                   content(sys.config()));
  if (auto* err = std::get_if<caf::error>(&node_opt))
    return caf::make_message(std::move(*err));
  const auto& node
    = std::holds_alternative<system::node_actor>(node_opt)
        ? std::get<system::node_actor>(node_opt)
        : std::get<scope_linked<system::node_actor>>(node_opt).get();
  // Get catalog and index actors.
  auto components
    = system::get_node_components<system::catalog_actor, system::index_actor>(
      self, node);
  if (!components)
    return caf::make_message(std::move(components.error()));
  const auto& [catalog, index] = std::move(*components);
  // Get the partition IDs from the catalog.
  const auto lookup_id = uuid::random();
  const auto expr = expression{predicate{
    meta_extractor{meta_extractor::import_time},
    relational_operator::less,
    data{time{time::clock::now()}},
  }};
  auto catalog_result = caf::expected<system::catalog_result>{caf::no_error};
  self->request(catalog, caf::infinite, atom::candidates_v, lookup_id, expr)
    .receive(
      [&](system::catalog_result& value) {
        catalog_result = std::move(value);
      },
      [&](caf::error& err) {
        catalog_result = std::move(err);
      });
  if (!catalog_result)
    return caf::make_message(std::move(catalog_result.error()));
  fmt::print("starting transformation of {} partitions...\n",
             catalog_result->partitions.size());
  // Run identity transform on all partitions for the index.
  auto partition_info
    = caf::expected<std::vector<vast::partition_info>>{caf::no_error};
  self
    ->request(index, caf::infinite, atom::rebuild_v, catalog_result->partitions)
    .receive(
      [&](std::vector<vast::partition_info>& value) {
        partition_info = std::move(value);
      },
      [&](caf::error& err) {
        partition_info = std::move(err);
      });
  if (!partition_info)
    return caf::make_message(std::move(partition_info.error()));
  // Print some statistics for the user.
  fmt::print("successfully transformed {} -> {} partitions\n",
             catalog_result->partitions.size(), partition_info->size());
  return caf::none;
}

/// An example plugin.
class plugin final : public virtual command_plugin {
public:
  /// Loading logic.
  plugin() = default;

  /// Teardown logic.
  ~plugin() override = default;

  /// Initializes a plugin with its respective entries from the YAML config
  /// file, i.e., `plugin.<NAME>`.
  /// @param config The relevant subsection of the configuration.
  caf::error initialize(data) override {
    return caf::none;
  }

  /// Returns the unique name of the plugin.
  [[nodiscard]] const char* name() const override {
    return "rebuild";
  }

  /// Creates additional commands.
  [[nodiscard]] std::pair<std::unique_ptr<command>, command::factory>
  make_command() const override {
    auto rebuild
      = std::make_unique<command>("rebuild", "TODO", command::opts());
    auto factory = command::factory{
      {"rebuild", rebuild_command},
    };
    return {std::move(rebuild), std::move(factory)};
  };
};

} // namespace

} // namespace vast::plugins::rebuild

VAST_REGISTER_PLUGIN(vast::plugins::rebuild::plugin)
