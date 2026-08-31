Status: ready-for-agent
Blocked by: 01-prefactor-icon-sets-and-dead-assets

# ArrowLink/PillButton Iconify migration

## Parent

.scratch/iconify-icon-swap/PRD.md

## What to build

`ArrowLink` and `PillButton` currently accept an `icon: string` image-URL prop and render `<img src={icon}>`. Replace that prop on both components with `iconName: string` plus an optional `iconSet?: IconSet` (defaulting to `lucide`), rendering `<Icon name={iconName} set={iconSet} />` internally instead. `iconSize`/`iconWidth`/`iconHeight` props are unchanged and continue to control rendered dimensions. Update every existing call site of both components in the same change, since the old prop stops compiling — there is no valid in-between state where some call sites still pass a URL.

Call sites to migrate, each getting a picked `iconName`/`iconSet` and verified visually against the current design in the browser:

- The "Learn More" arrow link (services section)
- The "View All Projects" and "View Project" arrow links (portfolio section)
- The "Discover More" pill button (why-choose-us section)
- The "Call Us Today" pill button (cta section) — this one currently renders a phone/call glyph, not a plain arrow
- The pill button inside the process section's closing CTA row, which currently renders the same arrow glyph as the "About" section's large green arrow accent (`ci:arrow-right-lg` — exact provenance recovered from the source SVG)

## Acceptance criteria

- [ ] `ArrowLink` no longer has an `icon: string` prop; it has `iconName: string` and optional `iconSet?: IconSet` (default `lucide`), and renders `<Icon>` internally
- [ ] `PillButton` no longer has an `icon: string` prop; it has `iconName: string` (optional, since `PillButton`'s `icon` was already optional) and optional `iconSet?: IconSet` (default `lucide`), and renders `<Icon>` internally
- [ ] All five call sites listed above pass `iconName`/`iconSet` and render the correct glyph, verified visually in the browser at their actual rendered size and color
- [ ] The process-section call site renders `ci:arrow-right-lg`, matching the visually identical arrow used in the about-section and hero-section direct-glyph swaps
- [ ] No remaining call site of `ArrowLink` or `PillButton` passes an image URL
- [ ] New/updated render tests for `ArrowLink` and `PillButton` assert each renders an `Icon` with the given `iconName`/`iconSet` (not an `<img>`) — this is the one test seam for this spec
- [ ] Existing test suite still passes
- [ ] No visual regression on the homepage beyond intended icon-source changes

## Blocked by

- 01-prefactor-icon-sets-and-dead-assets — needs the `ci` set (and any other set a picked glyph turns out to need) registered first.
