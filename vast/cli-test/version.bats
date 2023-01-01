setup_file() {
  bats_require_minimum_version 1.8.0
}

setup() {
    bats_load_library bats-support
    bats_load_library bats-assert
}

@test "the version command" {
  run -0 --separate-stderr vast version

  assert_output --partial '"Build Configuration": {'
  # TODO: factor into `assert_json`
  jq -e . > /dev/null 2>&1 <<< "$output"
}
