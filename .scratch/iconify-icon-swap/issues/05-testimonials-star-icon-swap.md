Status: ready-for-agent
Blocked by: 01-prefactor-icon-sets-and-dead-assets

# Testimonials star-icon swap

## Parent

.scratch/iconify-icon-swap/PRD.md

## What to build

Swap the five `<img>`-rendered star glyphs in each testimonial card's rating row (`star-icon.svg`) for `<Icon>`. No recoverable exact provenance — pick the closest available filled star glyph (default `lucide`, or another enabled set if it's a materially closer visual match to the current filled/colored star) and verify visually against the current design in the browser.

## Acceptance criteria

- [ ] Each testimonial card's 5-star rating row renders via `Icon` instead of `<img src="star-icon.svg">`
- [ ] The rendered star glyph is visually a filled/solid star matching the current color, not an empty outline
- [ ] No `<img>` tags remain pointing at `star-icon.svg`
- [ ] Visual check in the browser confirms no regression on the homepage testimonials section

## Blocked by

- 01-prefactor-icon-sets-and-dead-assets — needs the icon-set registry available for whichever set the picked glyph comes from.
