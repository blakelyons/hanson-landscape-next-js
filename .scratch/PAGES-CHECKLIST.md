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

### Blog (decision needed)
Old site has `/blog/` and ~35 posts, almost all 2013–2014 (checklists, mowing tips, award news, snow stats). Options: (a) drop and 301 to home/relevant service page, (b) rebuild blog index + posts, (c) migrate only evergreen ones. Not scheduled.
- [ ] Decide blog scope: drop / full migrate / selective
- [ ] `/blog` index
- [ ] `/category/seasonal-news`
- Posts (all dated 2013–2014, slugs at hansonlandscape.com/{slug}): unilock-century-club-award (x2), landscaping-ideas-to-consider (x2), lawn-mowing-tips-for-dry-weather (x2), hello-world, may/june/july/august/september landscape checklists, general-information-on-lawn-mowing, portfolio-of-work, around-the-office, snow-removal-services, retaining-walls, project-armor-up(-2013), uses-and-benefits-of-brick-pavers, landscaping-maintenance-what-is-included, nightscapes-what-are-they, mulch-why-and-how-much, hanson-landscape-on-linkedin, landscaper-of-the-year, landscaping-worth-investment, hanson-landscape-named-landscaper-year-finalist, choose-landscaper, winter-storms, chicago-snowfall-numbers, included-snow-removal-services, snow-removal, grubs-and-their-effects, customer-service-and-taking-the-extra-steps
- Note: old post `/residential-landscape-design/` (2014) is shadowed by the page of the same slug; ignore.

### Redirects to configure at deploy
- [x] `/career-oppurtonities` -> `/careers`
- [x] `/contact/request-a-quote` -> `/contact` (next.config.ts)
- [x] `/portfolio/{residential,commercial-2,landscape-maintenance,lighting-nightscapes,water-features}` -> `/portfolio`
- [x] `/site-map` kept, no redirect needed
- [ ] Blog URLs per blog decision
- [ ] `/author/hanson-landscape/`, `/feed/`, `/wp-json/` — no action, just let 404

## Not on old site but in new design
- Testimonials section content, Careers copy, Privacy Policy, footer "Our Mission" text (placeholder lorem in `site-footer.tsx`)
