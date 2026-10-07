Status: resolved
Type: task
Blocked by: 03

# Leaf settle: inertia kick then elastic return

On each hit, kick the Leaf's Mouse Wind layer with inertia, then tween back to 0deg with `elastic.out`. Use `overwrite: "auto"` so repeated hits mid-swing don't stack tweens.

## Acceptance criteria
- [ ] Leaf swings away, overshoots rest slightly, and settles at 0deg
- [ ] Hitting a Leaf mid-swing replaces the old tween cleanly
- [ ] No leftover tweens or rotation drift after the cursor leaves

## Answer
Replaced the yoyo placeholder in `large-tree-svg.tsx`: on each hit, `killTweensOf(group)` then a timeline kicks to the target rotation (0.15s `power2.out`) and returns to 0 with `elastic.out(1, 0.4)` over 1.6s. Tunables: `MOUSE_WIND_KICK_DURATION`, `MOUSE_WIND_SETTLE_DURATION`, `MOUSE_WIND_SETTLE_EASE`.
Deviation: used a timed kick tween instead of `InertiaPlugin`; same effect for this, simpler, and a re-hit mid-swing restarts from the current rotation. Strength/cap unchanged (still 14deg) — "move a bit more" is for ticket 05.
