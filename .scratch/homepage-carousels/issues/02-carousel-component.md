Status: ready-for-agent
Blocked by: None — can start immediately

# Reusable Carousel component

## Parent

.scratch/homepage-carousels/PRD.md

## What to build

A new reusable `Carousel` component under `components/ui/`, backed by Swiper.js, not yet wired into any page section (that happens in the tickets that follow, which both depend on this one).

- Adds `swiper` as a new npm dependency.
- Props: a list of slide contents, `slidesPerView`, `showDots`, `showArrows`, `loop`, plus pass-through spacing/className props as needed for callers to match their existing visual spacing.
- All navigation (dots, arrows, looping) is delegated to Swiper's built-in modules/config — no custom paging logic written by hand.
- `showDots`/`showArrows` independently control whether those controls render at all.
- `loop=true` wraps around at both ends (advancing past the last slide returns to the first, and vice versa).

## Acceptance criteria

- [ ] `Carousel` component exists under `src/components/ui/`
- [ ] Accepts `slides`, `slidesPerView`, `showDots`, `showArrows`, `loop` props
- [ ] `showDots={false}` renders no dot controls; `showArrows={false}` renders no prev/next arrows
- [ ] With `loop=true`, advancing past the last slide wraps to the first (and reverse for prev)
- [ ] `swiper` added to `package.json` dependencies
- [ ] Behavioral tests: dots/arrows visibility toggles correctly per props; wrap-around behavior with `loop=true`
- [ ] Not yet imported/used by any homepage section (that's the next tickets)

## Blocked by

None — can start immediately.
