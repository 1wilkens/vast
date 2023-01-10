#!/usr/bin/env bash

OLD_VERSION=$1
NEW_VERSION=$2

set -euxo pipefail

pushd "$(git -C "$(dirname "$(readlink -f "${0}")")" rev-parse --show-toplevel)/docker/compose"

# Pull the old version to create a database.
export COMPOSE_FILE="vast.yaml:vast.volume.yaml"
export VAST_CONSOLE_VERBOSITY=verbose
export VAST_CONTAINER_REF=$OLD_VERSION
export VAST_CONTAINER_REGISTRY=docker.io
docker compose pull
docker compose up --detach --force-recreate vast
sleep 5
docker compose logs
docker compose run --rm --no-TTY --entrypoint bash vast -c \
    "vast import --blocking suricata && vast flush" \
    < ../../vast/integration/data/suricata/eve.json
docker compose run --rm --interactive=false vast export json \
    '#type == "suricata.alert"' > old.json
docker compose down
sleep 5
# Pull the new version to double-check the output.
export VAST_CONTAINER_REF=$NEW_VERSION
export VAST_CONTAINER_REGISTRY=ghcr.io
docker compose pull
docker compose up --detach --force-recreate vast
sleep 5
docker compose run --rm --interactive=false vast export json \
  '#type == "suricata.alert"' > new.json
docker compose down -v
# Compare old and new
diff old.json new.json
