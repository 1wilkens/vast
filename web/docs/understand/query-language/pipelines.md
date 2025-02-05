---
sidebar_position: 1
---

# Pipelines

A pipeline is chain of [operators](operators) that represents a dataflow. An
operator consumes data, performs a transformation, and produces new data,
possibly with a different schema. Think of it as UNIX pipes where output from
one command is input to the next.

![Query Language](/img/query-language.light.png#gh-light-mode-only)
![Query Language](/img/query-language.dark.png#gh-dark-mode-only)

The basic idea is that a query consists of two connected pieces: a *dataset* to
represent a data source and a *pipeline* as a squence of operators to process
the data.

To date, a VAST [expression](expressions) takes the role of a dataset and you
can only [define a pipeline](/docs/use/transform) statically in the YAML
configuration. Being able to execute pipeline as part of the query is our most
requested feature, and we are actively working on bringing this ability into the
query language.

## Define a pipeline

Add a uniquely named pipeline under the key `vast.pipelines` in the
configuration file:

```yaml
vast:
  pipelines:
     example:
       - hash:
           field: src_ip
           out: pseudonym
           salt: "B3IwnumKPEJDAA4u"
       - summarize:
           group-by:
             - src_ip
             - dest_ip
           aggregate:
             flow.pkts_toserver: sum
             flow.pkts_toclient: sum
             flow.bytes_toserver: sum
             flow.bytes_toclient: sum
             flow.start: min
             flow.end: max
```

The above `example` pipeline consists of two operators, `hash` and `summarize`
that execute in sequential order.

Please consult the [section on data transformation](/docs/use/transform) on
where you can deploy pipelines today. Have a look at [all available
operators](operators) to better understand what you can do with the data.
