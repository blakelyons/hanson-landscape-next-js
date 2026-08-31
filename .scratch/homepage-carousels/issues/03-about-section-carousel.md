Status: ready-for-agent
Blocked by: 02-carousel-component

# About section (Family-Owned) carousel

## Parent

.scratch/homepage-carousels/PRD.md

## What to build

Replace the About ("Family-Owned. Passion-Driven.") section's two hardcoded side-by-side photos and 5 decorative static dots with the reusable `Carousel` component.

- Slides: the project's photo pool — 4 images (the two currently hardcoded photos plus two more from the existing image set).
- `slidesPerView=2` (so the pool of 4 renders as 2 pages, matching a 2-dot indicator).
- Both dots and prev/next arrows shown.
- `loop=true`.

## Acceptance criteria

- [ ] About section renders the `Carousel` component in place of the two hardcoded `<img>` blocks and the 5 static dots
- [ ] 4 photos are shown, 2 at a time
- [ ] Dots reflect 2 pages; prev/next arrows are present and functional
- [ ] Carousel wraps around at both ends
- [ ] Visual spacing/sizing matches the section's existing layout (no regression to surrounding content)

## Blocked by

- 02-carousel-component — this ticket wires the primitive built there into a real section.
