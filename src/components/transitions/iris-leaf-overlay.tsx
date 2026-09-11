"use client";

import { useCallback, useMemo, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(MorphSVGPlugin);

// iris-leaf page transition: a small leaf-shaped path scales up while its
// outline morphs into a solid rectangle, until it fully covers the viewport
// in --color-primary (closing). Reopening onto the new route is a plain
// opacity fade of that covering rectangle — not a reverse morph/shrink — so
// after the fade completes the shape resets instantly (no animation) back
// to the small leaf at scale 0, ready for the next transition.
const VIEW_BOX = "0 0 75.3 63.8";
const LEAF_D =
    "M43.2,57.7c-.6.5-1,1.2-1.3,1.9-1.5,4.1-5.3.8-8.5,3.8l-2.2-3.5-13.7,3.9c.4-5-5.6-5.4-11.6-5.7l10-8.5c2.4-1.4,1.6-3-.9-4.6l-11.5-4.1c3.4-1.6,2.9-4.3,1.2-7.4,1.5-2.3-2.5-5.5-4.8-8.4,2.9.6,6.4,2,7.8.5,2.7.8,5.1,1.1,5.5-2.3,2.9,2.9,6.4,3.8,9.9,4.5l4.3,2c-.2-4-3.8-4.9-4.6-12.9-.9-.7-1.8-1.3-2.7-3.6,4.9,2.1,3.8-2.3,4-5.2,1.9-1.7,4.2-3.1,3-8.1,2.4,3.7,4.3,4.5,5.9,4.1,4,5.5,6.2,4.4,7.8,1.2.6,5.2,1.6,6.7,2.5,8.4.6,2.8,1.6,6.1,1.3,7.7,2.3,4.5,3.6,2.3,4.5.5l5.3-7.5c4.9.7,9.7-3.8,14.6-7.7-1.7,4.6-2.5,8.3-.3,9-2.1,4.7-1,8.1,2.4,10.5-2.6,1.1-4.9,4.9-7.3,7.7-3.9,3.9.9,3.6,2.2,4.9,5.5,1.3,6.2,3.6,9,5.5-3.4.2-6.8.4-8.9,3.8-2.7,2.1-3.2,3.9-1.3,5.3-1.2-.6-1.3.3-4-2-2.4.3-5.6,1.3-6.5.4-1.6-.9-2.6.3-3.5,2.2-.5,2.3.3,2.1.6,2.9-4.2.4-4,3.2-5.4,1.4s-2.1-1.3-3.2-.6h0Z";
// Same viewBox, full-bleed rectangle — the morph target. It doesn't need to
// match the viewport's aspect ratio: once solid and scaled past
// IRIS_COVER_SCALE it overshoots the screen in both axes regardless, unlike
// the leaf's concave outline which would leave gaps at large scale.
const RECT_D = "M0,0 H75.3 V63.8 H0 Z";

const REOPEN_DELAY = 0.05;
const REOPEN_DURATION = 0.4;
const IRIS_COVER_SCALE = 20;
// Close plays in three beats so the leaf shape reads before it disappears:
// grow to LEAF_HOLD_SCALE as a leaf (no morph yet), hold there briefly so
// the eye can register "maple leaf", then scale the rest of the way to
// IRIS_COVER_SCALE while morphing into the rectangle.
const LEAF_HOLD_SCALE = 6;
const GROW_DURATION = 0.35;
const HOLD_DURATION = 0;
const MORPH_DURATION = 0.45;

export function useIrisLeafTransition() {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    useGSAP(() => {
        gsap.set(svgRef.current, { scale: 0, opacity: 1 });
        gsap.set(pathRef.current, { morphSVG: LEAF_D });
    }, []);

    const close = useCallback(
        () =>
            new Promise<void>((resolve) => {
                gsap.timeline({ onComplete: resolve })
                    .to(svgRef.current, { scale: LEAF_HOLD_SCALE, duration: GROW_DURATION, ease: "power2.out" })
                    .to(
                        svgRef.current,
                        { scale: IRIS_COVER_SCALE, duration: MORPH_DURATION, ease: "power2.inOut" },
                        `+=${HOLD_DURATION}`,
                    )
                    .to(pathRef.current, { morphSVG: RECT_D, duration: MORPH_DURATION, ease: "power2.inOut" }, "<");
            }),
        [],
    );

    const reveal = useCallback(() => {
        gsap.to(svgRef.current, {
            opacity: 0,
            duration: REOPEN_DURATION,
            delay: REOPEN_DELAY,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.set(svgRef.current, { scale: 0, opacity: 1 });
                gsap.set(pathRef.current, { morphSVG: LEAF_D });
            },
        });
    }, []);

    const overlay = useMemo(
        () => (
            <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center">
                <svg ref={svgRef} viewBox={VIEW_BOX} className="route-transition-iris h-26 w-35">
                    <path ref={pathRef} className="fill-primary" d={LEAF_D} />
                </svg>
            </div>
        ),
        [],
    );

    return useMemo(() => ({ overlay, close, reveal }), [overlay, close, reveal]);
}
