# 02: Services accordion in drawer

**What to build:** Replace the drawer's plain "Our Services" link with a 2-level accordion mirroring the desktop `ServicesNavDropdown` flyout: Our Services expands to Residential Services/Commercial Services, each of which expands to its own items. Same expand/collapse chevron-to-maple-leaf icon morph as the desktop hover interaction, extracted so both surfaces share it.

**Blocked by:** 01 (mobile nav shell)

**Status:** ready-for-agent

- [ ] "Our Services" in the drawer becomes an accordion row (no longer a plain link) that expands/collapses its children in place.
- [ ] Expanding "Our Services" reveals Residential Services and Commercial Services as their own accordion rows, sourced from the same `SERVICES_MENU` data the desktop dropdown uses (no duplicated/forked data).
- [ ] Expanding Residential Services or Commercial Services reveals their own items (placeholder Item 1/Item 2 content, same as desktop).
- [ ] Each accordion row's expand/collapse control uses the existing chevron-to-maple-leaf morph icon (`MorphSVGPlugin`-based), extracted out of `nav-dropdown.tsx` into a shared location so both the desktop dropdown and this accordion use the same component.
- [ ] Icon morph direction matches desktop semantics: chevron when collapsed, maple leaf when expanded.
- [ ] Tapping a leaf-level item link closes the whole drawer (same close-on-link-click behavior as ticket 01's flat links).
- [ ] Tests: expanding/collapsing each of the two accordion levels toggles the icon's expanded-state attribute and the corresponding child rows' visibility.
