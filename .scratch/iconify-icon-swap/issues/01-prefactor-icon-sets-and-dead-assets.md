Status: ready-for-agent
Blocked by: None — can start immediately

# Prefactor: enable icon sets + delete dead assets

## Parent

.scratch/iconify-icon-swap/PRD.md

## What to build

Register the additional Iconify icon sets this feature needs, and clear out dead SVG assets discovered during spec'ing, so every downstream ticket can pick a glyph without touching `icon-config.ts` itself.

- Add `mingcute`, `streamlineUltimate` (prefix `streamline-ultimate`), `proicons`, and `ci` entries to `ICON_SETS` in `src/lib/icon-config.ts`, alongside the existing `lucide`. `DEFAULT_ICON_SET` stays `lucide`.
- Delete `public/images/home/icon-phone.svg` and `public/images/home/cursor-pointer.svg` — both confirmed unreferenced anywhere in `src/`.

## Acceptance criteria

- [ ] `ICON_SETS` in `icon-config.ts` includes `lucide`, `mingcute`, `streamlineUltimate` (→ `streamline-ultimate`), `proicons`, and `ci`
- [ ] `DEFAULT_ICON_SET` is unchanged (`lucide`)
- [ ] `icon-phone.svg` and `cursor-pointer.svg` are deleted from `public/images/home/`
- [ ] No references to the deleted files remain anywhere in `src/`
- [ ] Existing test suite (`icon.test.tsx`) still passes
- [ ] Homepage renders identically to before (visual no-op — this ticket only expands the registry and removes dead files)

## Blocked by

None — can start immediately.
