Status: needs-triage
Type: task
Blocked by: 03

# Leaf settle: inertia kick then elastic return

On each hit, kick the Leaf's Mouse Wind layer with inertia, then tween back to 0deg with `elastic.out`. Use `overwrite: "auto"` so repeated hits mid-swing don't stack tweens.

## Acceptance criteria
- [ ] Leaf swings away, overshoots rest slightly, and settles at 0deg
- [ ] Hitting a Leaf mid-swing replaces the old tween cleanly
- [ ] No leftover tweens or rotation drift after the cursor leaves
