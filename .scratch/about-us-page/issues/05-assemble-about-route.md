Status: ready-for-agent
Blocked by: 02-site-header-variant-active-link, 03-page-hero-component, 04-story-section-component

# Assemble /about route + wire entry points

## Parent

.scratch/about-us-page/PRD.md

## What to build

The actual About Us page, live at `/about`, and the site-wide entry points that lead to it:

- New route `src/app/about/page.tsx` assembling: `SiteHeader` (`variant="solid"`) → `PageHero` → `StorySection` → `WhyChooseUsSection` → `CtaSection` → `SiteFooter`.
- `WhyChooseUsSection` and `CtaSection` render with no prop/content differences from the homepage — same component, same data, imported from their `components/sections/` location. No changes to these components in this ticket.
- The Why Choose Us section's collage image reuses the existing committed `landscaping-collage.jpg` — no new asset needed.
- Homepage's existing About teaser section's "Read More" `<span>` becomes a real link to `/about`.

## Acceptance criteria

- [x] Visiting `/about` renders the full page: solid-variant header with "About" active, page hero (breadcrumb "Home / About Us", eyebrow "OUR STORY", heading "Family-Owned. Passion-Driven.", description), story section, Why Choose Us section, CTA section, footer
- [x] Page matches the Figma "About Us" frame (`517:376`) layout and content
- [x] Homepage's "Read More" link in the About teaser section navigates to `/about`
- [x] Clicking "About" in the nav from any page navigates to `/about`
- [x] No regressions to the homepage's own About teaser section content/layout aside from the added link
- [x] Page layout reflows correctly at narrower viewports (no silent overflow), consistent with the rest of the site

## Blocked by

- 02-site-header-variant-active-link — needs the `solid` variant and real `/about` href.
- 03-page-hero-component — needs `PageHero` to render the page's hero banner.
- 04-story-section-component — needs `StorySection` to render the page's story content.

## Comments

Implemented — all acceptance criteria above verified (typecheck, test suite, and a live browser check on /about and /). Ready to merge.
