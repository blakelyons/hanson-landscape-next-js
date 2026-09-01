Status: ready-for-agent
Blocked by: 02-carousel-component

# About section (Family-Owned) carousel

## Parent

.scratch/homepage-carousels/PRD.md

## What to build

Replace the About ("Family-Owned. Passion-Driven.") section's two hardcoded side-by-side photos and 5 decorative static dots with the reusable `Carousel` component.

- New component: `AboutCarouselSlide`, scoped to the About section (file lives next to `about-section.tsx`, not generalized into `components/ui/` — no second caller exists yet). Owns the per-photo crop/pan markup (the `absolute`-positioned, oversized `<img>` with percentage top/left offsets) that today's two hardcoded blocks each do slightly differently.
- Slides: all 5 currently-available photos in `public/images/home/` — `project-photo-1.jpg`, `project-photo-2.jpg`, `project-photo-3.jpg`, `project-photo-4.jpg`, `about-carousel-photo-2.jpg` — each wrapped in an `AboutCarouselSlide`.
  - **Before wiring it in**: `project-photo-1.jpg` is 12.1MB — an order of magnitude larger than the other 4 (317KB–1.7MB) and almost certainly not web-optimized. Compress/re-export it first, or confirm with Blake whether it should be swapped for a lighter source image.
- `slidesPerView=2` — 5 > 2, so Carousel's own threshold check activates the carousel (no boolean computed in this section).
- Both dots and prev/next arrows shown (component defaults — no need to pass them explicitly).
- `loop=true`.
- Dots render one per slide (5 dots, `slidesPerGroup=1`) — matches the original 5-dot decorative mockup exactly, now with real content behind each dot.

## Acceptance criteria

- [ ] About section renders the `Carousel` component (via 5 `AboutCarouselSlide`s) in place of the two hardcoded `<img>` blocks and the 5 static dots
- [ ] All 5 photos are shown, 2 at a time
- [ ] 5 dots are shown (one per slide); prev/next arrows are present and functional
- [ ] Carousel wraps around at both ends
- [ ] Visual spacing/sizing matches the section's existing layout (no regression to surrounding content) — default `spaceBetween=16` needs no extra wiring here
- [ ] `project-photo-1.jpg` is confirmed web-optimized (or replaced) before use

## Blocked by

- 02-carousel-component — this ticket wires the primitive built there into a real section.
