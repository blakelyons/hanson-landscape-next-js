Status: ready-for-agent
Blocked by: 02-carousel-component

# Testimonials carousel branch

## Parent

.scratch/homepage-carousels/PRD.md

## What to build

`TestimonialsSection` passes `TESTIMONIALS` (rendered as `TestimonialCard`s) straight into `Carousel` as slides — no local `isCarousel` boolean. Carousel's own `slides.length > slidesPerView` check reproduces the "more than 3 testimonials" threshold with no separate logic in this section.

- `slidesPerView=3`, `spaceBetween={60}` (overriding Carousel's 16px default to match the cards' existing 60px gap), `showDots=false`, `showArrows=true`, `loop=true`.
- At ≤3 testimonials: Carousel's own threshold check renders the Static Row — `TestimonialCard` list, no Swiper involved at all. No behavior or visual change from today.
- At >3 testimonials: Carousel renders as a real carousel, advancing one card at a time.
- Since testimonial cards are fixed-width (336px), the `Carousel` instance here is sized so Swiper's numeric `slidesPerView=3` computes to the same 336px-per-slide width the static row already uses.

## Acceptance criteria

- [ ] With ≤3 testimonials, the section renders the current static row unchanged (no `Carousel`/Swiper markup present) — driven entirely by Carousel's own threshold, not a section-local flag
- [ ] With >3 testimonials, the section renders `Carousel` with the testimonial cards as slides, `slidesPerView=3`, `spaceBetween=60`, arrows only (no dots), advancing one card at a time
- [ ] Carousel path wraps around at both ends
- [ ] Card sizing (336px per card) is visually unchanged between the static-row and carousel paths
- [ ] Behavioral tests cover both branches: ≤3 renders static row; >3 renders Carousel

## Blocked by

- 02-carousel-component — this ticket wires the primitive built there into a real section.
