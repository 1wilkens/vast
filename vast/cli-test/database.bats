# shellcheck disable=SC2016

setup() {
  load lib/common.bash
  setup_db
  setup_node
}

teardown() {
  teardown_node
  #teardown_db
}

# Enable bare mode so settings in ~/.config/vast or the build configuration
# have no effect.
export VAST_BARE=1

@test "import and export commands" {
  < "$BATS_TEST_DIRNAME/data/suricata/eve.json" \
    run -0 --separate-stderr vast import -b suricata
  run -0 --separate-stderr vast count

  assert_output 8
}

@test "parallel imports" {
  local imports=()
  check --bg imports --separate-stderr -c \
    "zcat \"$BATS_TEST_DIRNAME/data/zeek/conn.log.gz\" \
     | vast import -b zeek"
  { check --bg imports --separate-stderr \
    vast import -b suricata; \
  } < "$BATS_TEST_DIRNAME/data/suricata/eve.json"
  { check --bg imports --separate-stderr \
    vast import -b suricata; \
  } < "$BATS_TEST_DIRNAME/data/suricata/eve.json"
  { check --bg imports --separate-stderr \
    vast import -b suricata; \
  } < "$BATS_TEST_DIRNAME/data/suricata/eve.json"
  check --bg imports --separate-stderr -c \
    "zcat \"$BATS_TEST_DIRNAME/data/zeek/conn.log.gz\" \
     | vast import -b zeek"
  { check --bg imports --separate-stderr \
    vast import -b suricata; \
  } < "$BATS_TEST_DIRNAME/data/suricata/eve.json"
  wait "${imports[@]}"
  check --separate-stderr vast count

  assert_output 16956
}

@test "batch size" {
  check --separate-stderr -c \
    "zcat \"$BATS_TEST_DIRNAME/data/zeek/conn.log.gz\" \
     | vast import -b zeek"

  check --separate-stderr vast export ascii 'resp_h == 192.168.1.104'
  assert_output <"$BATS_TEST_DIRNAME/reference/server-zeek-conn-log/step_01.ref"

  # import some more to make sure accounting data is in the system.
  check --separate-stderr -c \
    "zcat \"$BATS_TEST_DIRNAME/data/zeek/conn.log.gz\" \
     | vast import -b --batch-size=10 zeek"
  check --separate-stderr -c \
    "zcat \"$BATS_TEST_DIRNAME/data/zeek/conn.log.gz\" \
     | vast import -b --batch-size=1000 zeek"
  check --separate-stderr -c \
    "zcat \"$BATS_TEST_DIRNAME/data/zeek/conn.log.gz\" \
     | vast import -b --batch-size=100000 zeek"
  check --separate-stderr -c \
    "zcat \"$BATS_TEST_DIRNAME/data/zeek/conn.log.gz\" \
     | vast import -b --batch-size=1 -n 242 zeek"

  check --separate-stderr vast status --detailed
  check jq '.index.statistics.layouts | del(."vast.metrics")' <<< "$output"
  assert_output <"$BATS_TEST_DIRNAME/reference/server-zeek-conn-log/step_06.ref"

  check --separate-stderr vast status --detailed
  check jq -ec 'del(.version) | del(.system."swap-space-usage") | paths(scalars) as $p | {path:$p, type:(getpath($p) | type)}' <<< "$output"
  assert_output <"$BATS_TEST_DIRNAME/reference/server-zeek-conn-log/step_07.ref"

  check --separate-stderr vast status --detailed index importer
  check jq -ec 'paths(scalars) as $p | {path:$p, type:(getpath($p) | type)}' <<< "$output"
  assert_output <"$BATS_TEST_DIRNAME/reference/server-zeek-conn-log/step_08.ref"
}
