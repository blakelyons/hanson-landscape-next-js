# Applied useGSAP dependency-array fix to real code

Blake had the fix applied to `nav-dropdown.tsx`'s `ServicesNavDropdown` — swapping a raw `gsap.to()` render-body call for `useGSAP(() => {...}, { dependencies: [open], scope: rootRef })`. This confirms the lesson landed at the right level; next GSAP lesson can build on the `contextSafe()` idiom (event-driven, not state-driven animations) rather than re-explaining `useGSAP` basics. Related: [[0001-prior-nextjs-knowledge]].
