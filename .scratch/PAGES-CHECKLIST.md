Status: reference

# Page migration checklist (old hansonlandscape.com -> rebuild)

Source: Yoast page/post sitemaps, fetched 2026-10-05. Old site is WordPress. Legacy URLs are kept 1:1 where noted so no redirects are needed.

## Built
- [x] `/` Home
- [x] `/about`
- [x] `/portfolio` (lister) + `/portfolio/[slug]` (detail)
- [x] `/residential-services` (hub)
- [x] `/commercial-services` (hub)
- [x] `/residential-landscape-design`
- [x] `/residential-landscape-construction`
- [x] `/commercial-landscape-maintenance`
- [x] `/commercial-landscape-enhancement`
- [x] `/commercial-landscape-construction`
- [x] `/snow-and-ice-management`

## Still to build

### Core pages
- [x] `/contact` — built from Figma node 529:652; combined contact + quote form
- [x] `/contact/request-a-quote` — folded into /contact; 301 in next.config.ts
- [x] `/testimonials` — all 11 legacy testimonials migrated (`src/content/testimonials.ts`). No design: built from site look and feel.
- [x] `/careers` — old page had no job listings, only call/email-resume instructions; same here. 301 from `/career-oppurtonities`. No design.
- [x] `/site-map` — built; generated from services data. Hub/service pages added to it automatically, but static pages are listed by hand in the page file.
- [x] `/privacy-policy` — DRAFT generic policy based on what the site does. Needs client/legal review before launch.

### Portfolio category pages (old URLs, now replaced by filters)
- [x] `/portfolio/residential` — redirect to `/portfolio?sector=residential` (confirm param name in portfolio-grid)
- [x] `/portfolio/commercial-2` — redirect to `/portfolio?sector=commercial`
- [x] `/portfolio/landscape-maintenance` — redirect to /portfolio (Service not a filter chip; search only)
- [x] `/portfolio/lighting-nightscapes` — redirect to /portfolio (Project Type, search only)
- [x] `/portfolio/water-features` — redirect to /portfolio (Project Type, search only)

### Blog — migrated (all 30 unique posts)
Source: WP REST API. Content in `src/content/blog.ts`, images in `public/images/blog/{slug}/`. Dates are 2013–2017, so content is dated; consider a refresh pass.
- [x] `/blog` index
- [x] `/blog/[slug]` x30 (old URLs `/{slug}` and `/yyyy/mm/{slug}` 301 here)
- [x] `/category/seasonal-news` -> `/blog`
- Skipped: `hello-world` (WordPress boilerplate) -> redirects to `/blog`; old post `residential-landscape-design` (shadowed by the service page; its text is residential design portfolio chatter)
- Duplicates merged: lawn-mowing-tips-for-dry-weather-2, landscaping-ideas-to-consider-2, hanson-receives-unilock-century-club-award-2 -> canonical posts
- 5 images referenced by old posts return 404 on the live site and were omitted
- Not migrated: post categories/tags (single category), author pages, feed

### Redirects to configure at deploy
- [x] `/career-oppurtonities` -> `/careers`
- [x] `/contact/request-a-quote` -> `/contact` (next.config.ts)
- [x] `/portfolio/{residential,commercial-2,landscape-maintenance,lighting-nightscapes,water-features}` -> `/portfolio`
- [x] `/site-map` kept, no redirect needed
- [x] Blog URLs (generated in next.config.ts from blog data)
- [ ] `/author/hanson-landscape/`, `/feed/`, `/wp-json/` — no action, just let 404

## Not on old site but in new design
- Testimonials section content, Careers copy, Privacy Policy, footer "Our Mission" text (placeholder lorem in `site-footer.tsx`)
