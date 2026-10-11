#!/usr/bin/env bash
set -Eeuo pipefail

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
deploy_script="$script_dir/remote-deploy.sh"

run_case() {
  case_name=$1
  fail_stage=$2
  expected_status=$3
  expected_up_count=$4
  expect_rollback=$5

  case_dir=$(mktemp -d)
  mkdir -p "$case_dir/bin" "$case_dir/compose"
  : > "$case_dir/compose/docker-compose.yml"
  : > "$case_dir/docker.log"
  printf '0' > "$case_dir/curl.count"

  cat > "$case_dir/bin/docker" <<'MOCK_DOCKER'
#!/usr/bin/env bash
set -eu
echo "$*" >> "$MOCK_DOCKER_LOG"

if [ "$1" = "compose" ]; then
  shift
  [ "$1" = "-f" ] && shift 2
  action=$1
  shift
  case "$action" in
    config) exit 0 ;;
    ps)
      printf '%s\n' cid-current
      exit 0
      ;;
    build)
      [ "${FAIL_STAGE:-}" = "build" ] && exit 41
      exit 0
      ;;
    up)
      up_count=$(grep -c '^compose .* up ' "$MOCK_DOCKER_LOG" || true)
      if [ "${FAIL_STAGE:-}" = "start" ] && [ "$up_count" -eq 1 ]; then
        exit 42
      fi
      exit 0
      ;;
  esac
fi

if [ "$1" = "inspect" ]; then
  case "$3" in
    *State.Running*) printf '%s\n' true ;;
    *Config.Image*) printf '%s\n' innovatorsaihub-website ;;
    *Image*) printf '%s\n' sha256:old ;;
  esac
  exit 0
fi

[ "$1" = "image" ] && [ "$2" = "inspect" ] && exit 0
[ "$1" = "tag" ] && exit 0
exit 99
MOCK_DOCKER

  cat > "$case_dir/bin/curl" <<'MOCK_CURL'
#!/usr/bin/env bash
set -eu
count=$(cat "$MOCK_CURL_COUNT")
count=$((count + 1))
printf '%s' "$count" > "$MOCK_CURL_COUNT"
if [ "${FAIL_STAGE:-}" = "post-health" ] && [ "$count" -eq 3 ]; then
  exit 43
fi
exit 0
MOCK_CURL

  chmod +x "$case_dir/bin/docker" "$case_dir/bin/curl"

  set +e
  PATH="$case_dir/bin:$PATH" \
    FAIL_STAGE="$fail_stage" \
    MOCK_DOCKER_LOG="$case_dir/docker.log" \
    MOCK_CURL_COUNT="$case_dir/curl.count" \
    COMPOSE_DIR="$case_dir/compose" \
    DEPLOY_LOCK_DIR="$case_dir/deploy.lock" \
    bash "$deploy_script" >"$case_dir/output.log" 2>&1
  status=$?
  set -e

  up_count=$(grep -c '^compose .* up ' "$case_dir/docker.log" || true)
  rollback_count=$(grep -c '^tag sha256:old innovatorsaihub-website$' "$case_dir/docker.log" || true)

  [ "$status" -eq "$expected_status" ] || {
    echo "$case_name: expected status $expected_status, got $status"
    cat "$case_dir/output.log"
    exit 1
  }
  [ "$up_count" -eq "$expected_up_count" ] || {
    echo "$case_name: expected $expected_up_count up calls, got $up_count"
    cat "$case_dir/docker.log"
    exit 1
  }
  [ "$rollback_count" -eq "$expect_rollback" ] || {
    echo "$case_name: rollback expectation failed"
    cat "$case_dir/docker.log"
    exit 1
  }

  rm -rf "$case_dir"
  echo "PASS $case_name"
}

bash -n "$deploy_script"
run_case success "" 0 1 0
run_case build_failure build 41 0 0
run_case start_failure start 42 2 1
run_case post_health_failure post-health 43 2 1
