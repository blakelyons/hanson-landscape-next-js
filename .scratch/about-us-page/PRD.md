Status: ready-for-agent

# About Us Page

## Problem Statement

The Hanson Landscape site redesign currently only has a homepage implemented. The Figma design file (page "About Us", node `517:376`) specifies a full About Us page — with a dark hero banner, a "how we started" story section, a "why choose us" section, and a call-to-action — but none of it exists in the Next.js codebase yet. Visitors clicking "About" in the nav, or the "Read More" link in the homepage's About teaser, currently have nowhere to go (`href="#"` / plain text).

Separately, the site's global nav chrome (header, footer, dropdown) currently lives under `src/components/home/`, and several small presentational components (`StatCard`, `PartnerLogos`) are already reused across multiple sections despite living in a page-specific folder — the component folder structure doesn't yet reflect what's actually page-specific vs. site-wide vs. reusable, which will only get more confusing as more pages are added.

## Solution

Build `/about` as a real route rendering the About Us page per the Figma design, and reorganize the component tree so folder location reflects actual reuse scope going forward:

- `src/components/layout/` — site-wide chrome used on every page (header, footer, nav dropdown, footer column)
- `src/components/sections/` — full content sections reused verbatim across multiple pages (Why Choose Us, CTA)
- `src/components/ui/` — reusable presentational primitives (existing: `PillButton`, `ArrowLink`, `SectionIntro`, `Icon`; moved in: `StatCard`, `PartnerLogos`; new: `PageHero`)
- `src/components/about/` — bespoke sections used only on the About page (`StorySection`)
- `src/components/home/` — sections used only on the homepage

`SiteHeader` gains a `variant` (`"transparent"` for the homepage overlay style, `"solid"` for the interior/light-background style used on About and future interior pages) and active-link highlighting driven by the current route, matching the Figma design's amber active-pill treatment on interior pages. `Home` and `About` nav links get real `href`s; other nav links remain placeholders until their pages exist.

The homepage's existing About teaser section's "Read More" affordance becomes a real link to `/about`.

## User Stories

1. As a site visitor, I want to click "About" in the main nav, so that I land on a dedicated About Us page instead of a dead `#` link.
2. As a site visitor on the homepage, I want to click "Read More" in the About teaser section, so that I can read the full company story on the About Us page.
3. As a site visitor on the About Us page, I want to see a breadcrumb ("Home / About Us") in the page header, so that I understand where I am in the site hierarchy.
4. As a site visitor on the About Us page, I want to see the current nav item ("About") visually highlighted, so that I get the same "you are here" orientation the homepage nav doesn't need but interior pages do.
5. As a site visitor on the About Us page, I want to read the company's founding story (a photo, an "EST. 2001" eyebrow, a heading, and a narrative paragraph), so that I understand the company's history and credibility.
6. As a site visitor on the About Us page, I want to see key company stats (years of craftsmanship, projects delivered, satisfaction rating) next to the story, so that I can quickly gauge the company's track record.
7. As a site visitor on the About Us page, I want to see the same "Why Choose Us" content (expert landscaping, reliable support, stats, imagery) that appears on the homepage, so that the value proposition is reinforced consistently across the site.
8. As a site visitor on the About Us page, I want to see a call-to-action ("Ready to Transform Your Space?" with a free quote button and a call button), so that I have a clear next step after reading about the company.
9. As a site visitor on the About Us page, I want to see the standard site footer (company info, service menus, contact info, partner logos), so that I have consistent navigation and contact options regardless of which page I'm on.
10. As a site visitor on a small viewport, I want the About Us page's layout (story section, stat row, why-choose-us grid) to reflow using the same grid/flexbox techniques as the homepage, so that the page doesn't visually break like the pre-fix Why Choose Us section did on the homepage.
11. As a developer extending the site (e.g. building the Portfolio or Contact pages next), I want `SiteHeader`, `SiteFooter`, and the nav dropdown to live in a clearly-named shared `layout/` folder, so that I don't have to guess whether "home" components are homepage-only or site-wide.
12. As a developer extending the site, I want a reusable `PageHero` component (breadcrumb, eyebrow, heading, description, decorative background), so that building the next interior page (Portfolio, Contact) doesn't require re-deriving the same dark hero banner from Figma again.
13. As a developer extending the site, I want `WhyChooseUsSection` and `CtaSection` in a `sections/` folder rather than `home/`, so that importing them into the About page doesn't read as a cross-page-folder hack.
14. As a developer extending the site, I want `StatCard` and `PartnerLogos` in `ui/` alongside the other reusable primitives, so that their location matches how broadly they're actually used (already 3+ call sites each after this change).
15. As a developer maintaining `SiteHeader`, I want the active-nav-link logic driven by the current pathname (not a hardcoded prop per page), so that the active state stays correct automatically as more routes are added.
16. As a developer maintaining the design-to-code mapping, I want the About page's reused sections (Why Choose Us, CTA) to remain byte-for-byte the same components as the homepage's, so that a future design change to either only needs to happen in one place.
17. As a site visitor, I want all images on the About Us page (story photo, decorative hero graphics, why-choose-us collage) to load from locally-hosted assets, so that the page doesn't depend on Figma's short-lived (~7 day) asset URLs.

## Implementation Decisions

- **New route**: `/about`, rendering a new page component analogous in structure to the existing homepage (`SiteHeader` → `PageHero` → `StorySection` → `WhyChooseUsSection` → `CtaSection` → `SiteFooter`).
- **Component reorganization** (moves, not rewrites — import paths update, behavior unchanged for moved components):
    - `SiteHeader`, `ServicesNavDropdown`, `SiteFooter`, `FooterColumn` move from `components/home/` to `components/layout/`.
    - `WhyChooseUsSection`, `CtaSection` move from `components/home/` to `components/sections/`. No content or markup changes — these render identically on both the homepage and the About page.
    - `StatCard`, `PartnerLogos` move from `components/home/` to `components/ui/`, joining `PillButton`, `ArrowLink`, `SectionIntro`, `Icon`.
    - Homepage-only sections (`HeroSection`, `TrustBar`, `ServicesSection`, `AboutSection` (the homepage teaser), `TestimonialsSection`, `PortfolioBento`, `ProcessSection`, `ConsultationSection`) stay in `components/home/`.
    - New `StorySection` component is added under `components/about/`, since it is bespoke to the About page.
- **`SiteHeader` variant + active link**:
    - New `variant` prop: `"transparent"` (current homepage look — overlay nav, no solid background) or `"solid"` (opaque light background, used on interior pages including About).
    - Active-link detection is derived from the current route via `usePathname`, not passed in as a prop — this is the one piece of real conditional logic in the feature, so it's the seam the tests target.
    - Nav link list stays a single source of truth (shared between variants); only the container's background/color treatment and the active-link highlight (amber pill background behind the current page's label, matching Figma) differ by variant.
    - `Home` (`/`) and `About` (`/about`) nav links get real `href`s. `Our Services` (dropdown), `Portfolio`, `Testimonials`, and `Contact Us` remain `href="#"` placeholders — their target pages don't exist yet.
- **New `PageHero` component** (`components/ui/`): reusable dark hero banner used at the top of interior pages. Props cover breadcrumb trail, eyebrow label, heading, and description — the decorative background (glow + leaf-particle graphics) is a fixed visual treatment shared across all interior pages per the Figma design system component, not parameterized.
- **New `StorySection` component** (`components/about/`): renders a photo, an "EST. 2001" eyebrow row, a serif heading, a narrative paragraph, and a row of `StatCard`s (25+ years of craftsmanship, 500+ projects delivered, 100% satisfaction rating) — a distinct stats dataset from the homepage About teaser's stats (20+ years, 3x award, 100% satisfaction), not shared data.
- **Reused sections**: `WhyChooseUsSection` and `CtaSection` render on the About page with no prop/content differences from the homepage — same component, same data, imported from their new `sections/` location.
- **Homepage About teaser update**: the existing "Read More" `<span>` in the homepage's About section becomes a link to `/about`.
- **Assets**: the About page's Why Choose Us section reuses the existing `landscaping-collage.jpg` (already committed for the homepage's identical section) — no new download needed there. The Story Section's photo is a new asset to be downloaded and committed locally (not left pointing at a Figma-hosted URL, which expires after ~7 days). The hero banner's decorative background graphics (`bg-glow.svg`, `leaf-particles.svg`, `leaves.svg`) are already committed under `public/images/home/` from the homepage hero section and are reused as-is; any additional leaf-cluster variants unique to the interior-page hero graphic get downloaded and committed alongside them.
- **Layout technique**: story section, stat row, and any multi-column layout on the new page use CSS grid/flexbox (matching the fixes already applied to `WhyChooseUsSection`, including the `minmax(0, 1fr)` grid-track and `min-w-0` flex-shrink patterns established there), rather than fixed-width absolute positioning ported directly from Figma coordinates.

## Testing Decisions

- Test type: component-level render tests via Vitest + `@testing-library/react` (jsdom environment) — the only test seam that exists in this codebase today (prior art: `src/components/ui/icon.test.tsx`).
- Tests assert externally-observable rendered output (text content, presence of an active-state class/attribute, link `href`s) — never internal implementation details like component state or class name strings unrelated to the assertion.
- `SiteHeader` is the one component with real conditional logic in this feature (variant switch, active-link derivation from pathname) and gets real behavioral assertions: e.g. rendering at `/about` marks the "About" link active and not "Home"; the `variant` prop changes rendered output; `Home`/`About` links carry real `href`s.
- `PageHero` and `StorySection` are pure presentational components (props/data in, markup out, no branching) and get the same shallow "renders without crashing" smoke test as `Icon` — mount with representative props and assert the container renders — rather than deep interaction tests, since there's no behavior to exercise beyond "does it mount."
- `WhyChooseUsSection` and `CtaSection` are unchanged by this feature (moved, not modified) and are not newly tested as part of this work.
- No new test infrastructure (no E2E runner, no visual regression tooling) is introduced.

## Out of Scope

- Portfolio, Contact, and other "Interior Page Template" pages seen in the Figma file — only the About Us page is being built now, though `PageHero` and the `layout/`/`sections/` reorg are done with those future pages in mind.
- Wiring `Our Services`, `Portfolio`, `Testimonials`, or `Contact Us` nav links to real routes — those pages don't exist yet.
- Any animation/motion on the new page (per repo convention already established: no animations).
- Changing the visual design or content of `WhyChooseUsSection` or `CtaSection` — they are reused exactly as-is.
- A CMS or data layer for About page content (story text, stats) — content is hardcoded to match Figma, same convention as the rest of the site today.
- Visual/pixel-perfect QA pass against Figma (separate follow-up step after implementation, same process used for the homepage).

## Further Notes

- This spec was produced from an interactive planning session (`/grill-with-docs` → `grilling` skill) that reviewed the full Figma file (`Fp5ZA5dvalpgAY1m7WCPQ8`, "About Us" frame `517:376`) and the existing homepage implementation, and confirmed folder architecture, asset handling, header/hero componentization, and nav-linking decisions with the developer one at a time.
- The Figma file's "Interior Page Header"/"Interior Global Header" components are shared design-system components already reused across Portfolio, Contact, and generic "Interior Page Template" frames — confirming `PageHero` and the `solid` `SiteHeader` variant are safe to build as genuinely reusable now rather than speculatively.
- Once this page ships, re-running the homepage's post-implementation visual-QA process (DOM-measurement-based comparison against Figma coordinates, as previously done for the Why Choose Us and About sections) is recommended before considering the About page done.
