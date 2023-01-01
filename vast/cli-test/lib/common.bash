# Prints the given parameters.
debug() {
  local level=$1
  shift
  if [ "$level" -le "${debug_level:-0}" ]; then
    echo "# $*" >&3
  fi
}

# TODO: Add documentation.
check() {
  local args=()
  
  while [[ $# -gt 0 ]]; do
    case $1 in
      --bg)
        shift # past argument
        local process_group="$1"
        shift # past value
        ;;
      -c|--cmd)
        shift # past argument
        args+=("bash")
        args+=("-c")
        args+=("$1")
        shift # past value
        ;;
      *)
        args+=("$1") # save positional arg
        shift # past argument
        ;;
    esac
  done
  if [ -n "${process_group}" ]; then
    debug 1 "running: ${args[*]}"
    run -0 "${args[@]}" 3>&- &
    export pid_="$!"
    eval "$process_group+=(\"$pid_\")"
  else
    run -0 "${args[@]}"
  fi
}

assert_sorted() {
  local output_="$output"
  output=$(sort <<< "$output_")
  assert_output "$@"
}

setup_db() {
  export VAST_DB_DIRECTORY="cli-test-state/$BATS_TEST_NAME"
  rm -rf "$VAST_DB_DIRECTORY"
}
teardown_db() {
  if [ -n  "$BATS_TEST_COMPLETED" ] && [  "$BATS_TEST_COMPLETED" -eq 1 ]; then
    rm -rf "$VAST_DB_DIRECTORY"
  fi
}

setup_node() {
  coproc NODE { vast -qq -e ":0" start --print-endpoint; }
  read -r -u "${NODE[0]}" VAST_ENDPOINT
  export VAST_ENDPOINT
}
teardown_node() {
  vast -qq stop
  wait "$NODE_PID"
}

bats_load_library bats-support
bats_load_library bats-assert
