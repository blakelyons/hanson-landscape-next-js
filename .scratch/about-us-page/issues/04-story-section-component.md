Status: ready-for-agent
Blocked by: 01-reorganize-shared-components

# StorySection component + story image asset

## Parent

.scratch/about-us-page/PRD.md

## What to build

A new `StorySection` component under `components/about/` — bespoke to the About Us page, per the Figma "Story Section":

- Renders a photo, an "EST. 2001" eyebrow row, a serif heading ("How a small crew became Chicagoland's trusted name in outdoor living."), a narrative paragraph, and a row of `StatCard`s.
- Stat data: 25+ years of craftsmanship, 500+ projects delivered, 100% satisfaction rating — a distinct dataset from the homepage About teaser's stats (20+ years, 3x award, 100% satisfaction). Not shared data.
- Reuses `StatCard` from its new `components/ui/` location.
- The story photo is downloaded from the Figma asset and committed locally under the site's images convention (not left pointing at the Figma-hosted URL, which expires after ~7 days).
- Layout uses grid/flexbox (image + text columns, stat row), matching the patterns already established for the homepage's Why Choose Us section (`minmax(0, 1fr)` grid tracks, `min-w-0` on flex children that must shrink) rather than fixed-width absolute positioning ported directly from Figma coordinates.

## Acceptance criteria

- [x] `StorySection` component exists under `src/components/about/`
- [x] Renders photo, eyebrow, heading, paragraph, and 3 `StatCard`s with the specified stat data
- [x] Story photo asset is committed under the repo's local image assets (not a remote Figma URL)
- [x] Layout reflows correctly at narrower viewports using grid/flexbox techniques (no silent overflow)
- [x] Smoke test: mounts without throwing

## Blocked by

- 01-reorganize-shared-components — depends on `StatCard` already living in `components/ui/`.

## Comments

Implemented — all acceptance criteria above verified (typecheck, test suite, and a live browser check on /about and /). Ready to merge.
