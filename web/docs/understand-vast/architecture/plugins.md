---
sidebar_position: 3
---

# Plugins

VAST has a plugin system that makes it easy to hook into various places of
the data processing pipeline and add custom functionality in a safe and
sustainable way. A set of customization points allow anyone to add new
functionality that adds CLI commands, receives a copy of the input stream,
spawns queries, or implements integrations with third-party libraries.

There exist **dynamic plugins** that come in the form shared libraries, and
**static plugins** that are compiled into libvast or VAST itself:

![Plugins](/img/plugins.light.png#gh-light-mode-only)
![Plugins](/img/plugins.dark.png#gh-dark-mode-only)

Plugins do not only exist for extensions by third parties, but VAST also
implements core functionality through the plugin API. Such plugins compile as
static plugins. Because they are always built, we call them *native plugins*.

## Plugin types

VAST offers several customization points to exchange or enhance functionality
selectively. Here is a list of available plugin categories and plugin types:

![Plugin types](/img/plugin-types.light.png#gh-light-mode-only)
![Plugin types](/img/plugin-types.dark.png#gh-dark-mode-only)

### Command

The command plugin adds a new command to the `vast` executable, at a configurable
location in the command hierarchy. New commands can have sub-commands as well
and allow for flexible structuring of the provided functionality.

### Component

The component plugin spawns a [component](components) inside the VAST node. A
component is an [actor](actor-model) and runs in parallel with all other
components.

This plugin is the most generic mechanism to introduce new functionality.

### Analyzer

The analyzer plugin hooks into the processing path of data by spawning a new
actor inside the server that receives the full stream of table slices. The
analyzer plugin is a refinement of the [component plugin](#component).

### Reader

The reader plugin adds a new format to parse input data, such as JSON (ASCII) or
PCAP (binary).

Reader plugins automatically add the subcommands `vast import <format>`.

### Writer

The writer plugin adds a new format to print data, such as JSON (ASCII) or PCAP
(binary).

Writer plugins automatically add the subcommands `vast export <format>`.

### Query Language

A query language plugin adds an alternative parser for a query expression. This
plugin allows for replacing the query *frontend* while using VAST as *backend*
execution engine.

For example, you could write a SQL plugin that takes an expression like
`SELECT * FROM zeek.conn WHERE id.orig_h = "1.2.3.4"` and executes it on
historical data or runs it as live query.

### Pipeline

The pipeline operator plugin adds a new [pipeline
operator](/docs/understand-vast/query-language/operators) that users can reference in
a [pipeline definition](/docs/understand-vast/query-language/pipelines).

### Aggregation Function

The aggregation function plugin adds a new [aggregation
function](/docs/understand-vast/query-language/operators/summarize#aggregate-functions)
for the `summarize` pipeline operator that performs an incremental aggregation over
a set of grouped input values of a single type.

### Store

Inside a partition, the store plugin implements the conversion from in-memory
Arrow record batches to the persistent format, and vice versa.
