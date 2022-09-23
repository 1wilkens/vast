---
jupyter:
  jupytext:
    cell_metadata_filter: -all
    text_representation:
      extension: .md
      format_name: markdown
      format_version: '1.3'
      jupytext_version: 1.14.0
  kernelspec:
    display_name: Bash
    language: bash
    name: bash
---

# Quickstart

This notebook showcases the key use cases of VAST in an interactive manner.

:::caution Work in Progress
This page is work in progress. It is the first example of a [notebook-based
approach of writing user
guides](/docs/develop/contributing/notebooks), but the content and
CI-workflow is not fully fleshed out. Stay tuned.
:::

## Install VAST

First, let's get a VAST binary to play with. The easiest way to [setup
VAST](/docs/setup) is downloading a static binary on Linux.

:::note Coming soon: the VAST installer
The easiest way to obain VAST is through our installer script:

```bash .noeval
/bin/bash -c "$(curl -fsSL https://vast.io/install.sh)"
```

On Linux, the script downloads a static build. On macOS, the script clones the
repo and creates a release build.
:::

Following the instructions to add `/opt/vast/bin` to your `PATH`, test
whether you are ready to use VAST:

```bash .noeval
vast version
```

## Start a VAST node

Begin with starting a VAST node:

```bash .noeval
vast start
```
```
[14:12:09.207] VAST v2.1.0 is listening on localhost:42000
```

This command creates a listening socket at `localhost:42000` that you can now
interact with client commands from other terminals.

Test the connection with a new command:

```bash .noeval
vast status | jq .system
```
```
{
  "current-memory-usage": 10322685460480,
  "database-path": "/tmp/vast",
  "in-memory-table-slices": 0,
  "peak-memory-usage": 645167841280
}
```

## Ingest data

After we have a VAST node to interact with, let's ingest some data.

We [prepared a dataset][m57-with-malware] derived from one day of the M57
recording and injected with malicious traffic from malware-trafic-analysis.net,
adjusting timestamps such that the malware activity occurs in the same day as
the background noise.

[m57-with-malware]: https://drive.google.com/drive/folders/1mPJYVGKTk86P2JU3KD-WFz8tUkTLK095?usp=sharing

```bash .noeval
cd /tmp
curl -OL TODO
vast import pcap < dataset/PCAP/*.pcap
vast import zeek < dataset/Zeek/*.log
vast import suricata < dataset/Suricata/eve.json
```

## Run queries

With a loaded VAST node, we can now answer some questions.
