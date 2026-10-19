#!/usr/bin/env bash
# Zero-downtime-ish build. Builds into the inactive slot (.next-a / .next-b) while the
# running server keeps serving the active one, then points PM2 at the new slot and reloads.
# A failed build leaves the live site untouched. Run on the droplet (`npm run build`).
set -euo pipefail

cd "$(dirname "$0")/.."

active=$(cat .active-dist 2>/dev/null || echo ".next")
if [[ "$active" == ".next-a" ]]; then next=".next-b"; else next=".next-a"; fi

echo "-> building into $next (live: $active)"
# next/font fetches Google Fonts at build time, which occasionally flakes — retry before
# giving up. A failed build never touches the live slot.
for attempt in 1 2 3; do
  rm -rf "$next"
  if NEXT_DIST_DIR="$next" npx next build --webpack; then break; fi
  [[ "$attempt" == 3 ]] && { echo "build failed after 3 attempts; live site unchanged" >&2; exit 1; }
  echo "build attempt $attempt failed, retrying..." >&2
  sleep 5
done

echo "$next" > .active-dist
pm2 reload ecosystem.config.js --update-env || pm2 start ecosystem.config.js
pm2 save >/dev/null 2>&1 || true

# Old slot (and the legacy .next on first run) is no longer served; the server was just
# reloaded onto $next. Keep $active as an instant rollback target.
if [[ "$active" != ".next-a" && "$active" != ".next-b" ]]; then rm -rf "$active"; fi
echo "-> live on $next"
