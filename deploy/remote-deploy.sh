#!/usr/bin/env bash
set -Eeuo pipefail

compose_dir="${COMPOSE_DIR:-/docker/innovatorsaihub}"
compose_file="${COMPOSE_FILE:-docker-compose.yml}"
service="${WEBSITE_SERVICE:-website}"
local_health_url="${LOCAL_HEALTH_URL:-http://127.0.0.1:8088/healthz}"
public_url="${PUBLIC_URL:-https://www.innovatorsaihub.com/}"
lock_dir="${DEPLOY_LOCK_DIR:-/tmp/innovatorsaihub-deploy.lock}"

previous_image=
service_image=
rollback_required=0

health_check() {
  curl --fail --silent --show-error --max-time 15 --retry 3 --retry-delay 2 \
    --output /dev/null "$local_health_url"
  curl --fail --silent --show-error --location --max-time 30 --retry 3 \
    --retry-delay 2 --output /dev/null "$public_url"
}

rollback_on_error() {
  status=$?
  trap - ERR
  set +e

  if [ "$rollback_required" -eq 1 ] && [ -n "$previous_image" ] && [ -n "$service_image" ]; then
    echo "Deployment failed; restoring previous website image."
    docker tag "$previous_image" "$service_image"
    docker compose -f "$compose_file" up -d --no-deps --force-recreate \
      --wait --wait-timeout 60 "$service"
    rollback_status=$?
    if [ "$rollback_status" -eq 0 ]; then
      health_check
      rollback_status=$?
    fi
    if [ "$rollback_status" -eq 0 ]; then
      echo "Rollback completed and health checks passed."
    else
      echo "::error::Rollback did not pass health verification; inspect the website container immediately."
    fi
  fi

  exit "$status"
}

cleanup() {
  rmdir "$lock_dir" 2>/dev/null || true
}

trap rollback_on_error ERR

for command_name in docker curl; do
  command -v "$command_name" >/dev/null 2>&1 || {
    echo "::error::Missing required command: $command_name"
    exit 2
  }
done

if ! mkdir "$lock_dir" 2>/dev/null; then
  echo "::error::Another website deployment appears to be running: $lock_dir"
  exit 3
fi
trap cleanup EXIT

cd "$compose_dir"
docker compose -f "$compose_file" config --quiet

current_container=$(docker compose -f "$compose_file" ps -q "$service")
if [ -z "$current_container" ]; then
  echo "::error::No existing $service container found; refusing a deployment without a rollback baseline."
  exit 4
fi
if [ "$(docker inspect -f '{{.State.Running}}' "$current_container")" != "true" ]; then
  echo "::error::Existing $service container is not running."
  exit 5
fi

previous_image=$(docker inspect -f '{{.Image}}' "$current_container")
service_image=$(docker inspect -f '{{.Config.Image}}' "$current_container")
docker image inspect "$previous_image" >/dev/null

# Confirm the current release is healthy before making any change.
health_check

docker compose -f "$compose_file" build --no-cache "$service"
rollback_required=1
docker compose -f "$compose_file" up -d --no-deps --wait --wait-timeout 60 "$service"
health_check
rollback_required=0

echo "Deployment completed; local and public health checks passed."
