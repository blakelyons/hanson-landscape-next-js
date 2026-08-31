Status: ready-for-agent
Blocked by: 02-arrowlink-pillbutton-iconify-migration, 03-hero-about-direct-glyph-swap, 04-services-process-direct-glyph-swap, 05-testimonials-star-icon-swap

# Delete swapped source SVGs

## Parent

.scratch/iconify-icon-swap/PRD.md

## What to build

Once every Iconify replacement has been verified rendering correctly, delete the now-unused source SVG files from `public/images/home/`. Git history is the rollback mechanism — no files are kept "just in case."

Files to delete: `icon-building.svg`, `icon-house.svg`, `arrow-icon-lg-hero.svg`, `arrow-icon-lg-amber.svg`, `arrow-icon-lg-green.svg`, `icon-arrow-diagonal.svg`, `icon-design.svg`, `shovel-icon.svg`, `cursor-arrow.svg`, `star-icon.svg`, `arrow-icon-learn-more.svg`, `arrow-icon-view-all.svg`, `arrow-icon-view-project.svg`, `arrow-icon-discover-more.svg`, `arrow-icon-cta.svg`.

## Acceptance criteria

- [ ] All fifteen listed SVG files are deleted from `public/images/home/`
- [ ] No reference to any deleted file remains anywhere in `src/`
- [ ] Full test suite passes
- [ ] Full visual check of the homepage in the browser confirms no broken images and no regression anywhere the deleted files used to render

## Blocked by

- 02-arrowlink-pillbutton-iconify-migration
- 03-hero-about-direct-glyph-swap
- 04-services-process-direct-glyph-swap
- 05-testimonials-star-icon-swap
