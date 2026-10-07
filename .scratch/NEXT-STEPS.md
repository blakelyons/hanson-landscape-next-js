Status: ready-for-human

# Next steps to launch

Check items off as they land. Related lists: `PAGES-CHECKLIST.md` (page migration, redirects), `services-pages/LINKS-TODO.md` (links, contact form), `DEPLOYMENT.md` (server setup).

## 1. Engineering cleanup (DONE 2026-10-07)
Build passes (65 static pages). 71/71 tests pass. Redirects verified against `next start` (no chains; covered by `src/lib/redirects.test.ts`). Added default description, canonical URLs, Open Graph/Twitter card + generated share image, `/api/` disallowed in robots, About page metadata. Note: homepage (`src/app/page.tsx`) is a client component so it uses the site-wide default title/description.
- [x] Run `npm run build:local` (`next build --webpack`). Never run since the blog (30 posts, 30 images), service pages and redirect rules were added. Fix any build or redirect errors.
- [x] Fix the 3 failing tests: `about-section.test.tsx` (flaky, passes alone), `testimonials-section.test.tsx` (".w-282" carousel width), `carousel.test.tsx` (loop wrap).
- [x] Site-wide metadata: replace the TODO default description in `src/app/layout.tsx`; add Open Graph / Twitter share image; confirm `robots.ts` and `sitemap.ts` output.
- [x] Check `next.config.ts` redirects against the live-site URL list (hit each old URL in dev, expect 308 to the new page).

## 2. SEO (code work DONE 2026-10-08; analytics/Search Console intentionally left out)
- [x] JSON-LD: site-wide `HomeAndConstructionBusiness` + `WebSite` (layout), `Service` on service pages, `BlogPosting` on posts, `BreadcrumbList` on every interior page (`src/lib/structured-data.ts`, tested).
- [x] Home page now has its own title/description (page split into a server `page.tsx` + client `components/home/home-page.tsx`).
- [x] Titles/descriptions: audited; blog excerpts rewritten to end at sentence boundaries and fit 160 chars (`src/lib/seo-lengths.test.ts` keeps it that way).
- [x] Per-page Open Graph images for services, blog posts (first image) and portfolio projects; default branded card for the rest.
- [x] Custom 404 (noindex, no bogus canonical) with helpful links.
- [x] Blog images without alt text fall back to the post title.
- [x] Performance: four oversized originals (12.7 MB, 8 MB...) recompressed to ~1 MB each; consultation background now uses next/image.
- [ ] Confirm business address and hours, then fill `BUSINESS.address` / `BUSINESS.openingHours` in `src/content/site.ts` (JSON-LD picks them up automatically; omitted until confirmed).
- [ ] Add social profile URLs (`sameAs`) if Hanson has them.
- [ ] LEFT OUT FOR NOW: Google Analytics / Tag Manager, Search Console verification + sitemap submission, Google Business Profile, Core Web Vitals check on the live URL (run PageSpeed Insights after deploy).
- [ ] Redirect map QA re-test after deploy (covered by `src/lib/redirects.test.ts` in code).

## 3. Content needing client / Blake input
- [ ] Real photos for the 6 service pages, 2 hubs and blog cards (currently placeholder project photos, `src/content/services.ts`).
- [~] Footer "Our Mission": replaced lorem with a draft based on the About page copy (`site-footer.tsx`). Needs Blake/client approval.
- [~] Partner logos: 7 real logos from the legacy site now live (Unilock, Belgard, Aquascape, Easy Pro, Unique Lighting, ILCA, NFIB) in `public/images/partners/`. They're small (150-300px). TODO: get higher-res files, confirm each brand still allows use, and add the current SIMA logo (legacy only had a membership certificate that expired in 2016, so it was left out).
- [ ] Privacy Policy: draft only, needs client or legal review (`src/app/privacy-policy/page.tsx`).
- [ ] Blog: all posts 2013–2017. Decide: keep as archive, or refresh/remove stale ones.
- [~] Portfolio: placeholder Projects now use REAL photos from the legacy category galleries (`public/images/portfolio/legacy/`, ~40 photos, matched by residential/commercial/maintenance/lighting/water features). Project names, locations, summaries, challenge/solution text are still placeholders: the old site never had named projects. Need real Projects (name, town, year, what was built) + their photos in `public/images/portfolio/{slug}/`.
- [ ] Hours, certifications, and any claims on the About page (e.g. "started in 2001 with a single truck", "25+ years", "CAMME Award", "500+ projects"): confirm accuracy. Legacy SIMA certificate listed the business as Hanson Landscape Inc, Big Rock, IL: confirm the address to show in the footer/structured data.

## 4. QA (Blake, in browser)
- [ ] Mobile and tablet layouts of all new pages (services, hubs, contact, testimonials, careers, blog, privacy, site map).
- [ ] Page transitions: rapid clicks, clicking Home while on Home, browser back during a transition, returning to `/` (hero background and intro states).
- [ ] About dropdown (About Us / Blog) on desktop hover and in the mobile drawer.
- [ ] Contact form: validation, success and error states, attachment.
- [ ] Keyboard and screen-reader pass; optional automated accessibility audit (Lighthouse / axe).

## 5. Contact email (last step)
- [ ] Create a Resend account (blake@blakelyons.com for testing) and set `RESEND_API_KEY` in `.env.local`.
- [ ] Send a real test submission (with and without attachment) to `blake@blakelyons.com`.
- [ ] Decide on the real mail setup with Hanson (who receives inquiries; provider stays Resend or swaps).
- [ ] Verify `hansonlandscape.com` in Resend; set `CONTACT_FROM_EMAIL` (e.g. `website@hansonlandscape.com`) and `CONTACT_TO_EMAIL` to Hanson's inbox in the server env.
- [ ] Optional: Cloudflare Turnstile if spam appears (honeypot + rate limit already in place).

## 6. Deploy
- [ ] Follow `DEPLOYMENT.md` (PM2 + `ecosystem.config.js` + `deploy/`). Set production env vars (`NEXT_PUBLIC_SITE_URL`, Resend vars).
- [ ] Point DNS; confirm HTTPS and www/non-www redirect.
- [ ] Smoke test: home, one page per type, contact form, an old blog URL, an old career URL.
- [ ] Post-launch: Search Console, check 404s for a week, watch contact inbox.

## Known quirks (not blockers)
- Home hero intro plays once per full page load; revisits show the finished state by design (ask Claude to replay it on return if wanted).
- API route rate limiter is per-process memory (resets on PM2 reload).
- `/api/contact` needs a live Node server (no static export).
