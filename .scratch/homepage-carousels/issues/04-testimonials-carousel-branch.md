Status: ready-for-agent
Blocked by: 02-carousel-component

# Testimonials carousel branch

## Parent

.scratch/homepage-carousels/PRD.md

## What to build

`TestimonialsSection` computes `isCarousel = TESTIMONIALS.length > 3` and branches its render on it:

- `isCarousel === false`: renders exactly today's static flex-row markup — `TestimonialCard` list, no `Carousel`/Swiper involved at all. No behavior or visual change from today at ≤3 testimonials.
- `isCarousel === true`: renders the same `TestimonialCard`s as `Carousel` slides — `slidesPerView=3`, advancing one slide at a time, `showDots=false`, `showArrows=true`, `loop=true`.
- Since testimonial cards are fixed-width (336px) with a 60px gap, the `Carousel` instance here is sized so Swiper's numeric `slidesPerView=3` computes to the same 336px-per-slide width the static row already uses.

## Acceptance criteria

- [ ] With ≤3 testimonials, the section renders the current static row unchanged (no `Carousel`/Swiper markup present)
- [ ] With >3 testimonials, the section renders `Carousel` with the testimonial cards as slides, `slidesPerView=3`, arrows only (no dots), advancing one card at a time
- [ ] Carousel path wraps around at both ends
- [ ] Card sizing (336px per card) is visually unchanged between the static-row and carousel paths
- [ ] Behavioral tests cover both branches: ≤3 renders static row; >3 renders Carousel

## Blocked by

- 02-carousel-component — this ticket wires the primitive built there into a real section.
