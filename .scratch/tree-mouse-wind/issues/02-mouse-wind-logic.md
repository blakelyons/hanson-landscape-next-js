Status: resolved
Type: task
Blocked by: none

# Mouse Wind pure logic with tests

In `large-tree-svg.logic.ts`, add tested pure functions: pointer to viewBox conversion inputs, distance falloff within radius (viewBox units), eased speed-to-strength curve with cap and dead-zone, swing direction away from the cursor. Constants (radius, cap, dead-zone) exported or grouped as tunables.

## Acceptance criteria
- [ ] Leaf outside radius gets zero strength; inside, strength falls off with distance
- [ ] Speed below dead-zone gives zero; strength is eased and never exceeds the cap
- [ ] Direction sign is away from the cursor on either side of the Leaf base
- [ ] Unit tests cover each case in `large-tree-svg.logic.test.ts`

## Answer
Added to `large-tree-svg.logic.ts` with tests: `clientToViewBox`, `windDistanceFalloff` (quadratic ease to 0 at radius), `windSpeedStrength` (dead-zone then sqrt, cap 1), `mouseWindRotation` (away from cursor by horizontal side, 0 when exactly above/below). Exported tunables: `MOUSE_WIND_RADIUS` 90, `MOUSE_WIND_MAX_ROTATION` 14, `MOUSE_WIND_DEAD_ZONE_SPEED` 0.05, `MOUSE_WIND_FULL_SPEED` 3 (viewBox units/ms).
Note for 03: pointer conversion is the pure `clientToViewBox` (assumes `xMidYMid meet`, which the SVG uses) rather than `getScreenCTM`; either works. Speed units are viewBox units per ms.
