# Deployment (DigitalOcean Droplet)

Standard Node build, not a static export — `FORMSTACK_API_KEY` and other
server-only env vars require a live Node process (App Router API routes /
server actions), so `next build && next start` behind Nginx is the target,
not `next export`.

## One-time droplet setup

1. Install Node (match `.nvmrc`), PM2 (`npm i -g pm2`), and Nginx.
2. Clone the repo, copy `.env.example` to `.env.local` (or `.env.production`)
   and fill in real values.
3. `npm ci && npm run build`
4. `pm2 start ecosystem.config.js`
5. `pm2 save && pm2 startup` (so it survives a reboot)
6. Copy `deploy/nginx.conf.example` to
   `/etc/nginx/sites-available/hansonlandscape.com`, symlink into
   `sites-enabled`, `nginx -t`, then reload Nginx.
7. `certbot --nginx -d hansonlandscape.com -d www.hansonlandscape.com` for TLS.

## Redeploys

```bash
git pull
npm ci
npm run build
pm2 reload ecosystem.config.js
```
