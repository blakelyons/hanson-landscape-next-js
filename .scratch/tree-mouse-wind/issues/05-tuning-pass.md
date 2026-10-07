Status: resolved
Type: task
Blocked by: 04

# Tune Mouse Wind by feel

Blake checks in the browser and adjusts the constants (radius, cap, dead-zone, curve, elastic ease/duration). Also decide whether Scroll Gust is now redundant on desktop.

## Acceptance criteria
- [ ] Slow pass: subtle motion on nearby Leaves only
- [ ] Fast pass: clearly stronger, still capped and tasteful
- [ ] Decision recorded on keeping or removing Scroll Gust

## Answer
Tuned by feel with Blake. Final values: radius 110, max rotation 24deg, full speed 1.5 viewBox units/ms, distance falloff `1 - (d/r)^2`, settle `elastic.out(1, 0.3)` over 2.4s (kick 0.15s).
Decision: keep Scroll Gust. It stays alongside Mouse Wind and Scroll Sway.
