Status: resolved
Type: task

# Add Mouse Wind layer and rename Scroll Gust pool

Add a third nested `<g>` per Leaf in `src/components/ui/large-tree-svg.tsx` (beside the sway and gust groups) with its own ref array, to hold Mouse Wind rotation. Rename `physicsLeafIndexes` to `scrollGustPool`.

## Acceptance criteria
- [ ] Each Leaf has a Mouse Wind `<g>` layer; rendered output looks unchanged
- [ ] Scroll Sway and Scroll Gust behave as before
- [ ] `physicsLeafIndexes` renamed to `scrollGustPool`; typecheck, lint, tests pass

## Answer
Added a third nested `<g>` per Leaf (innermost, around dot + leaf path) with `mouseWindGroupRefs` in `large-tree-svg.tsx`. Renamed `physicsLeafIndexes` to `scrollGustPool`. Ref array is unused until ticket 03. Typecheck, lint, tests pass; no visual change expected (Blake to eyeball).
