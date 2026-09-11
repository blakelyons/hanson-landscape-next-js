"use client";

import { useCallback, useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// cross-fade page transition: a plain full-screen color overlay that fades
// in (closing, covering the old page), then fades back out (reopening, once
// the route has swapped behind it) to reveal the new page. No shape, no
// morph — just opacity.
const CLOSE_DURATION = 0.35;
const REOPEN_DELAY = 0.05;
const REOPEN_DURATION = 0.35;

export function useCrossFadeTransition() {
    const overlayRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.set(overlayRef.current, { opacity: 0 });
    }, []);

    const close = useCallback(
        () =>
            new Promise<void>((resolve) => {
                gsap.to(overlayRef.current, {
                    opacity: 1,
                    duration: CLOSE_DURATION,
                    ease: "power2.inOut",
                    onComplete: resolve,
                });
            }),
        [],
    );

    const reveal = useCallback(() => {
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: REOPEN_DURATION,
            delay: REOPEN_DELAY,
            ease: "power2.inOut",
        });
    }, []);

    const overlay = useMemo(
        () => (
            <div
                ref={overlayRef}
                aria-hidden
                className="route-transition-fade bg-forrest pointer-events-none fixed inset-0 z-100"
            />
        ),
        [],
    );

    return useMemo(() => ({ overlay, close, reveal }), [overlay, close, reveal]);
}
