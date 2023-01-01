setup_suite() {
  bats_require_minimum_version 1.8.0
  load lib/common.bash

  mkdir -p cli-test-state
}

teardown_suite() {
  # coreutils rmdir has --ignore-fail-on-non-empty, but that is not portable.
  # We simply assume that an error means the directory is not empty.
  rmdir cli-test-state || true
}
