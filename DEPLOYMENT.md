# Deployment (DigitalOcean Droplet)

Standard Node build, not a static export — server-only env vars (contact
form API keys, etc) require a live Node process (App Router API routes /
server actions), so `next build && next start` behind Nginx is the target,
not `next export`.

## One-time droplet setup

Run `npm run provision-droplet` locally — it walks through creating the
droplet, SSH keys, a GitHub deploy key, server bootstrap (Node/Nginx/PM2/
certbot), first build, DNS, and TLS, step by step. Manually, the same
procedure is:

1. Install Node (match `.nvmrc`), PM2 (`npm i -g pm2`), and Nginx.
2. Clone the repo, copy `.env.example` to `.env.local` (or `.env.production`)
   and fill in real values.
3. `npm ci && npm run build` — `build` runs `next build` then reloads the PM2
   process, falling back to starting it if it isn't running yet (first-time
   setup), so this one command builds and starts the app.
4. `pm2 save && pm2 startup` (so it survives a reboot)
5. Copy `deploy/nginx.conf.example` to
   `/etc/nginx/sites-available/hansonlandscape.com`, symlink into
   `sites-enabled`, `nginx -t`, then reload Nginx.
6. `certbot --nginx -d hansonlandscape.com -d www.hansonlandscape.com` for TLS.

## Hardening (run after provision-droplet, before going live)

```bash
npm run provision-security
```

Creates a non-root sudo user (`deploy`), copies your SSH key to it, moves the
app + PM2 process to run as `deploy` instead of root, then disables root SSH
login and password auth, and installs `fail2ban` + unattended security
updates. Ends with root SSH permanently disabled — has a safety gate that
requires confirming `ssh deploy@<ip>` works before locking root out. After
this, `deploy/remote-deploy.sh` automatically switches to `deploy@<ip>`.

## Cloudflare (client sites proxied through Cloudflare)

```bash
npm run provision-cloudflare
```

Run after the domain's DNS is proxied (orange cloud) through Cloudflare and
pointed at the droplet. Restricts the origin firewall to only accept
ports 80/443 from Cloudflare's published IP ranges (so the origin can't be
hit directly, bypassing Cloudflare's WAF/caching), and configures Nginx to
trust `CF-Connecting-IP` so logs/rate-limiting see the real visitor IP
instead of Cloudflare's edge IP. Also walks through setting SSL/TLS mode to
"Full (strict)" in the Cloudflare dashboard (manual step).

## Redeploys

From your laptop:

```bash
npm run deploy
```

Pushes the current branch, then SSHes into the droplet and runs
`deploy/deploy.sh` (`git pull && npm ci && npm run build`). Requires committed
changes (fails on a dirty tree) and a droplet reachable at the IP hardcoded in
`deploy/remote-deploy.sh` (or cached in `deploy/.wizard-state` by the
provisioning wizard).

## `build` vs `build:local`

`npm run build` is the server-ready build: `next build` followed by a PM2
reload (falling back to `pm2 start` if the process isn't registered yet). Use
it on the droplet — it's what `deploy/deploy.sh` and `provision-droplet.sh`
call, and what you'd run yourself if you ever build on the server by hand.

`npm run build:local` is a plain `next build`, no PM2 involved — use it on
your laptop (e.g. to sanity-check the production build compiles) since PM2
isn't managing anything there.
