# Hanson Landscape — Next.js site

Next.js 16 (App Router) site for hansonlandscape.com. Runs as a standard
Node server (not a static export) so API routes/server actions stay
available — deployed to a DigitalOcean droplet via PM2 + Nginx (see
`DEPLOYMENT.md`). A headless CMS (Payload or ExpressionEngine, TBD) may be
wired in later for the blog/portfolio; for now content is hardcoded.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** for utilities/design tokens (`src/app/globals.css`,
  `@theme` block) + **SASS** for structural component styles that need
  nesting/mixins (`src/styles/`) — see comments in `src/styles/main.scss`.
- **GSAP** + **Lenis** smooth scroll, synced via `SmoothScrollProvider`
  (`src/components/providers/smooth-scroll-provider.tsx`).
- **Zustand** for client UI state (`src/store/`).
- **TanStack Query** for client-side data fetching once CMS endpoints exist
  (`src/components/providers/query-provider.tsx`).
- **next-themes** wired up (`src/components/providers/theme-provider.tsx`);
  no theme variants defined yet.
- **Iconify** (`@iconify/react`, runtime API) with **Lucide** as the
  default set — see `src/lib/icon-config.ts` to enable more icon sets.
- **Formstack** contact form proxied through `src/app/api/contact/route.ts`
  (keeps the API key server-side) — example client form in
  `src/components/ui/contact-form-example.tsx`.
- **Vitest** + **React Testing Library** for unit/component tests.
- Native Next.js **Metadata API** for SEO (`generateMetadata`,
  `src/app/sitemap.ts`, `src/app/robots.ts`) — no `next-seo` dependency.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Formstack keys, site URL
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev` — dev server
- `npm run build` / `npm run start` — production build + Node server
- `npm run lint` — ESLint
- `npm run test` / `npm run test:watch` — Vitest
- `npm run format` — Prettier

## Folder structure

```
src/
  app/                 routes (App Router), api/, sitemap.ts, robots.ts
  components/
    providers/         client providers mounted in the root layout
    ui/                 shared UI components
  lib/                 server/shared utilities (formstack.ts, icon-config.ts)
  store/               Zustand stores
  styles/              SASS partials (imported once from the root layout)
  hooks/               shared React hooks
```

## Deployment

See `DEPLOYMENT.md` for the DigitalOcean droplet setup (PM2 + Nginx).
