#!/usr/bin/env bash
# Redeploy script — run on the droplet (or via `ssh droplet 'bash -s' < deploy/deploy.sh`).
# Matches the "Redeploys" steps in DEPLOYMENT.md.
set -euo pipefail

cd "$(dirname "$0")/.."

git pull
npm ci
npm run build
