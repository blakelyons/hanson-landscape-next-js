Status: ready-for-agent
Blocked by: 01-prefactor-icon-sets-and-dead-assets

# Hero + About direct-glyph swap

## Parent

.scratch/iconify-icon-swap/PRD.md

## What to build

Swap the plain `<img>`-rendered glyphs in the hero and about sections for `<Icon>`, with no component API change — these are direct element swaps only.

- Hero section: the building glyph (`icon-building.svg` → `mingcute:building-6-line`, exact provenance recovered), the house glyph (`icon-house.svg` → `streamline-ultimate:house-1`, exact provenance recovered), and the large arrow accent (`arrow-icon-lg-hero.svg` → `ci:arrow-right-lg`, exact provenance recovered).
- About section: the two small arrow accents rendered directly as `<img>` (`arrow-icon-lg-amber.svg` and `arrow-icon-lg-green.svg`, both → `ci:arrow-right-lg`) — not the process-section `PillButton` usage of the green variant, which is covered by the `ArrowLink`/`PillButton` migration ticket.

Each swapped-in `Icon` preserves the current color treatment (amber vs. green, etc.) via CSS `color`, since Iconify icons default to `currentColor`.

## Acceptance criteria

- [ ] Hero section's building glyph renders via `Icon` (`mingcute:building-6-line`), matching current appearance and size
- [ ] Hero section's house glyph renders via `Icon` (`streamline-ultimate:house-1`), matching current appearance and size
- [ ] Hero section's large arrow accent renders via `Icon` (`ci:arrow-right-lg`), matching current appearance, size, and color
- [ ] About section's two arrow accents (amber and green) render via `Icon` (`ci:arrow-right-lg`), matching current appearance, size, and color
- [ ] No `<img>` tags remain pointing at `icon-building.svg`, `icon-house.svg`, `arrow-icon-lg-hero.svg`, `arrow-icon-lg-amber.svg`, or `arrow-icon-lg-green.svg` in the hero and about sections
- [ ] Visual check in the browser confirms no regression on the homepage hero or about section

## Blocked by

- 01-prefactor-icon-sets-and-dead-assets — needs `mingcute`, `streamline-ultimate`, and `ci` sets registered first.
