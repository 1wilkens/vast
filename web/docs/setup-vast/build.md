---
sidebar_position: 1
---

# Build

Like many C++ projects, VAST uses [CMake](https://cmake.org) to manage the build
process. Aside from a modern C++20 compiler, you need to ensure availability of
the dependencies in the table below.

We provide [Nix](#nix) expressions for deterministic builds.

## Dependencies

:::tip SPDX SBOM
Every [release](https://github.com/tenzir/vast/releases) of VAST includes an
[SBOM](https://en.wikipedia.org/wiki/Software_bill_of_materials) in
[SPDX](https://spdx.dev) format that includes a comprehensive listing of all
dependencies and versions.

👉 [Download the **latest SBOM** here][latest-sbom].
:::

[latest-sbom]: https://github.com/tenzir/vast/releases/latest/download/VAST.spdx

|Required|Dependency|Version|Description|
|:-:|:-:|:-:|-|
|✓|C++ Compiler|C++20 required|VAST is tested to compile with GCC >= 10.0 and Clang >= 13.0.|
|✓|[CMake](https://cmake.org)|>= 3.18|Cross-platform tool for building, testing and packaging software.|
|✓|[CAF](https://github.com/actor-framework/actor-framework)|>= 0.17.6|Implementation of the actor model in C++. (Bundled as submodule.)|
|✓|[FlatBuffers](https://google.github.io/flatbuffers/)|>= 1.12.0|Memory-efficient cross-platform serialization library.|
|✓|[Apache Arrow](https://arrow.apache.org)|>= 7.0.0|Required for in-memory data representation. Must be built with Compute, Zstd and Parquet enabled.|
|✓|[yaml-cpp](https://github.com/jbeder/yaml-cpp)|>= 0.6.2|Required for reading YAML configuration files.|
|✓|[simdjson](https://github.com/simdjson/simdjson)|>= 0.7|Required for high-performance JSON parsing.|
|✓|[spdlog](https://github.com/gabime/spdlog)|>= 1.5|Required for logging.|
|✓|[fmt](https://fmt.dev)|>= 7.1.3|Required for formatted text output.|
|✓|[xxHash](https://github.com/Cyan4973/xxHash)|>= 0.8.0|Required for computing fast hash digests.|
||[libpcap](https://www.tcpdump.org)||Required for PCAP import, export, and pivoting to and from PCAP traces.|
||[broker](https://github.com/zeek/broker)||Required to build the Broker plugin.|
||[Doxygen](http://www.doxygen.org)||Required to build documentation for libvast.|
||[Pandoc](https://github.com/jgm/pandoc)||Required to build manpage for VAST.|

The minimum specified versions reflect those versions that we use in CI and
manual testing. Older versions may still work in select cases.

### Nix Environment

We provide a Nix flake you can use to setup an environment in which all
dependencies are available. Running `nix develop` inside the main source
directory will get you there.

You can also delegate the entire build process to Nix with by invoking
`nix build`, but be aware that this method does not support incremental
builds in case you plan to make changes to the source code.

## Compile

Building VAST involves the following steps:

1. [Download the latest release](https://github.com/tenzir/vast/releases/latest)
   or clone the repository recursively:
  ```bash
  git clone --recursive https://github.com/tenzir/vast
  ```

2. Configure the build with CMake. For faster builds, we recommend passing
  `-G Ninja` to `cmake`.
  ```bash
  cd vast
  cmake -B build
  ```

  Optionally, you can use the CMake TUI to visually configure the build:
  ```bash
  ccmake build
  ```

  The source tree also contains a set of CMake presets that combine various
  configuration options into curated build flavors. You can list them with:
  ```bash
  cmake --list-presets
  ```

3. Build the executable:
  ```bash
  cmake --build build --target all
  ```

## Test

After you have built the executable, run the unit and integration tests to
verify that your build works as expected:

1. Run component-level unit tests:
  ```bash
  ctest --test-dir build
  ```

2. Run end-to-end integration tests:
  ```bash
  cmake --build build --target integration
  ```
## Install

5. Install VAST system-wide or into a custom prefix:
  ```bash
  cmake --install build
  # Optional: Install to a custom prefix
  cmake --install build --prefix /path/to/install/prefix
  ```
