#!/usr/bin/env bash
# Redeploy script — run on the droplet (or via `ssh droplet 'bash -s' < deploy/deploy.sh`).
# Matches the "Redeploys" steps in DEPLOYMENT.md.
set -euo pipefail

cd "$(dirname "$0")/.."

git pull

# `npm ci` wipes node_modules, which the live server is still reading — only do it when
# the lockfile actually changed since the last deploy.
lock_hash=$(sha256sum package-lock.json | cut -d' ' -f1)
if [[ "$lock_hash" != "$(cat .deployed-lock 2>/dev/null || true)" ]]; then
  npm ci
  echo "$lock_hash" > .deployed-lock
fi

npm run build
