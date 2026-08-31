Status: ready-for-agent
Blocked by: None — can start immediately

# Hero Image Switcher component

## Parent

.scratch/homepage-carousels/PRD.md

## What to build

A new `Hero Image Switcher` component, wired into the homepage hero section, replacing the current static large-photo + thumbnails + decorative arrow.

- Plain React state (no Swiper) tracking which of the 3 hero items is active.
- Items: the 3 images currently used as hero thumbnails (`hero-thumb-1`, `hero-thumb-2`, the third existing hero thumbnail image). The image currently hardcoded as the large photo (unrelated to the 3 thumbnails) is dropped from rotation. Each item's own image is used for both its thumbnail and, when active, the large photo — no separate paired asset.
- Initial active item: the first item.
- Clicking a thumbnail sets it active. Clicking the (currently decorative) arrow icon advances to the next item, wrapping from the last item back to the first.
- Active-thumbnail styling: `translateY(-12px)` plus a 1px `#f89c1c` border, applied via a CSS transition (~150-200ms ease), not an instant style swap.
- Large-photo change: CSS opacity crossfade (~200-250ms) between old and new image, not an instant swap.
- Fixes the existing `-scale-y-100` flip present on all three thumbnails — they render right-side-up.

## Acceptance criteria

- [ ] New component exists and is used by the homepage hero section in place of the current static markup
- [ ] Clicking any thumbnail updates the large photo to that thumbnail's image
- [ ] The active thumbnail shows `translateY(-12px)` + 1px `#f89c1c` border; only one thumbnail is active at a time
- [ ] Clicking the arrow advances to the next item in order, and wraps from the last item to the first
- [ ] On initial render, the first item is active and shown as the large photo
- [ ] Thumbnails render right-side-up (no `-scale-y-100`)
- [ ] Large-photo transitions crossfade; active-thumbnail style changes are animated, not instant
- [ ] Behavioral tests: clicking a thumbnail activates it and updates the large photo; clicking the arrow cycles through all 3 items and wraps

## Blocked by

None — can start immediately.
