#!/usr/bin/env bash
# Run locally via `npm run deploy`. Pushes current branch, then triggers
# deploy/deploy.sh on the droplet over SSH.
set -euo pipefail

cd "$(dirname "$0")/.."

DROPLET_IP="161.35.125.143"
REMOTE_USER="root"
REMOTE_PATH="/var/www/hanson-landscape"

# Pick up cached values from the provisioning wizards (harden-server.sh
# switches REMOTE_USER to "deploy" once root SSH login is disabled).
if [[ -f deploy/.wizard-state ]]; then
  ip=$(grep -E '^DROPLET_IP=' deploy/.wizard-state | tail -n1 | cut -d= -f2-)
  [[ -n "$ip" ]] && DROPLET_IP="$ip"
  user=$(grep -E '^REMOTE_USER=' deploy/.wizard-state | tail -n1 | cut -d= -f2-)
  [[ -n "$user" ]] && REMOTE_USER="$user"
fi
DROPLET_HOST="${REMOTE_USER}@${DROPLET_IP}"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Uncommitted changes present — commit or stash before deploying." >&2
  exit 1
fi

branch=$(git rev-parse --abbrev-ref HEAD)
echo "→ pushing ${branch}..."
git push origin "$branch"

echo "→ deploying on ${DROPLET_HOST}..."
ssh "$DROPLET_HOST" "cd '$REMOTE_PATH' && bash deploy/deploy.sh"


echo "✓ deployed"
