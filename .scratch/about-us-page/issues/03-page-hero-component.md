Status: ready-for-agent
Blocked by: 01-reorganize-shared-components

# PageHero component

## Parent

.scratch/about-us-page/PRD.md

## What to build

A new reusable `PageHero` component under `components/ui/`: the dark hero banner used at the top of interior pages (breadcrumb trail, eyebrow label, heading, description), per the Figma "Interior Page Header" design-system component.

- Props cover breadcrumb trail, eyebrow label, heading, and description text.
- The decorative background (glow + leaf-particle graphics) is a fixed visual treatment shared across all interior pages per the Figma design system component — not parameterized.
- Decorative background graphics reuse the homepage's already-committed assets (`bg-glow.svg`, `leaf-particles.svg`, `leaves.svg` under `public/images/home/`) where identical; any additional leaf-cluster variants unique to this hero graphic are downloaded and committed locally alongside them (not left pointing at Figma-hosted asset URLs, which expire after ~7 days).
- Layout uses grid/flexbox, not fixed-width absolute positioning ported directly from Figma coordinates.

## Acceptance criteria

- [x] `PageHero` component exists under `src/components/ui/`
- [x] Accepts props for breadcrumb, eyebrow, heading, description
- [x] Renders the decorative background graphics from locally-committed assets (no remote/Figma URLs)
- [x] Visually matches the Figma "Interior Page Header" component (dark background, breadcrumb, eyebrow with accent line, serif heading, description)
- [x] Smoke test: mounts with representative props without throwing

## Blocked by

- 01-reorganize-shared-components — lands in `components/ui/`, which this ticket assumes already holds the moved primitives (`StatCard`, `PartnerLogos`) as precedent for location/conventions.

## Comments

Implemented — all acceptance criteria above verified (typecheck, test suite, and a live browser check on /about and /). Ready to merge.
