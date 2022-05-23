//    _   _____   __________
//   | | / / _ | / __/_  __/     Visibility
//   | |/ / __ |_\ \  / /          Across
//   |___/_/ |_/___/ /_/       Space and Time
//
// SPDX-FileCopyrightText: (c) 2021 The VAST Contributors
// SPDX-License-Identifier: BSD-3-Clause

#pragma once

#include "vast/bitmap.hpp"
#include "vast/detail/overload.hpp"
#include "vast/expression.hpp"
#include "vast/system/actors.hpp"
#include "vast/uuid.hpp"

#include <caf/typed_actor_view.hpp>

namespace vast {

/// A wrapper for an expression related command.
struct query {
  // -- nested type definitions ------------------------------------------------

  /// A count query to collect the number of hits for the expression.
  struct count {
    enum mode { estimate, exact };
    system::receiver_actor<uint64_t> sink;
    enum mode mode = {};

    friend bool operator==(const count& lhs, const count& rhs) {
      return lhs.sink == rhs.sink && lhs.mode == rhs.mode;
    }

    template <class Inspector>
    friend auto inspect(Inspector& f, count& x) {
      return f(caf::meta::type_name("vast.query.count"), x.sink, x.mode);
    }
  };

  /// An extract query to retrieve the events that match the expression.
  struct extract {
    system::receiver_actor<table_slice> sink;

    friend bool operator==(const extract& lhs, const extract& rhs) {
      return lhs.sink == rhs.sink;
    }

    template <class Inspector>
    friend auto inspect(Inspector& f, extract& x) {
      return f(caf::meta::type_name("vast.query.extract"), x.sink);
    }
  };

  /// The query command type.
  using command = caf::variant<count, extract>;

  // -- constructor & destructor -----------------------------------------------

  query() = default;
  query(query&&) = default;
  query(const query&) = default;

  query(command cmd, expression expr)
    : cmd(std::move(cmd)), expr(std::move(expr)) {
  }

  query& operator=(query&&) = default;
  query& operator=(const query&) = default;

  ~query() = default;

  // -- helper functions to make query creation less boiler-platey -------------

  template <class Actor>
  static query
  make_count(const Actor& sink, enum count::mode m, expression expr) {
    return {count{caf::actor_cast<system::receiver_actor<uint64_t>>(sink), m},
            std::move(expr)};
  }

  template <class Actor>
  static query make_extract(const Actor& sink, expression expr) {
    return {extract{caf::actor_cast<system::receiver_actor<table_slice>>(sink)},
            std::move(expr)};
  }

  // -- misc -------------------------------------------------------------------

  friend bool operator==(const query& lhs, const query& rhs) {
    return lhs.cmd == rhs.cmd && lhs.expr == rhs.expr
           && lhs.priority == rhs.priority;
  }

  template <class Inspector>
  friend auto inspect(Inspector& f, query& q) {
    return f(caf::meta::type_name("vast.query"), q.id, q.cmd, q.expr, q.ids,
             q.priority);
  }

  // -- data members -----------------------------------------------------------

  /// The query id.
  uuid id = uuid::nil();

  /// The query command.
  command cmd;

  /// The query expression.
  expression expr = {};

  /// The event ids to restrict the query evaluation to, if set.
  vast::ids ids = {};

  struct priority {
    constexpr static uint8_t high = 80;
    constexpr static uint8_t normal = 30;
    constexpr static uint8_t low = 10;
  };

  /// The query priority.
  uint8_t priority = priority::normal;
};

} // namespace vast

namespace fmt {

template <>
struct formatter<vast::query> {
  template <class ParseContext>
  constexpr auto parse(ParseContext& ctx) -> decltype(ctx.begin()) {
    return ctx.begin();
  }

  template <class FormatContext>
  auto format(const vast::query& value, FormatContext& ctx)
    -> decltype(ctx.out()) {
    auto out = ctx.out();
    auto f = vast::detail::overload{
      [&](const vast::query::count& cmd) {
        out = format_to(out, "count(");
        switch (cmd.mode) {
          case vast::query::count::estimate:
            out = format_to(out, "estimate, ");
            break;
          case vast::query::count::exact:
            out = format_to(out, "exact, ");
            break;
        }
      },
      [&](const vast::query::extract&) {
        out = format_to(out, "extract(");
      },
    };
    caf::visit(f, value.cmd);
    return format_to(out, "{} (priority::{}), [{}])", value.expr,
                     value.priority, value.ids);
  }
};

} // namespace fmt
