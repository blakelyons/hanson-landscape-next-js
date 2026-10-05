"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wires Lenis smooth scroll into GSAP's ticker so ScrollTrigger stays in
 * sync with Lenis's virtual scroll position instead of the raw scroll
 * event. Mounted once near the root layout.
 *
 * Pattern: https://gsap.com/resources/lenis-and-gsap/
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const lenisRef = useRef<Lenis | null>(null);
    const isFirstPathRef = useRef(true);

    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: false,
        });
        lenisRef.current = lenis;

        lenis.on("scroll", ScrollTrigger.update);

        function raf(time: number) {
            lenis.raf(time * 1000);
        }

        gsap.ticker.add(raf);
        // Leaving GSAP's default lag smoothing enabled protects tweens that
        // start right after a main-thread stall (heavy scroll-linked
        // sections, image decode, etc.) from computing their first frame's
        // elapsed time as already past their duration and rendering
        // complete instantly instead of animating. Disabling it (as GSAP's
        // Lenis recipe suggests) is only needed to stop GSAP's own
        // backgrounded-tab catch-up from fighting Lenis's — Lenis's own
        // "scroll" → ScrollTrigger.update() wiring above already keeps
        // ScrollTrigger synced without it.

        // This provider wraps the whole page, so React commits its effect
        // last — after every section below (including pinned ones, which
        // insert pin-spacer elements that change document height) has
        // already created its own ScrollTriggers. Any of those triggers
        // that computed its start/end position before a later sibling's
        // pin-spacer was inserted is left with a stale, too-early pixel
        // value — the trigger fires as soon as the page scrolls past that
        // stale position, well before the element visually reaches it. A
        // single refresh here, after everything has mounted, re-measures
        // every ScrollTrigger against the final layout.
        const refresh = () => ScrollTrigger.refresh();
        if (document.readyState === "complete") {
            requestAnimationFrame(refresh);
        } else {
            window.addEventListener("load", refresh);
        }

        return () => {
            window.removeEventListener("load", refresh);
            gsap.ticker.remove(raf);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Client-side navigation: Next resets the window scroll, but Lenis keeps its own
    // virtual position from the previous page (so the first wheel tick would jump back
    // to it) and ScrollTriggers measured while the new page was still settling keep stale
    // start positions (reveals fire early or never). Sync Lenis, then re-measure once the
    // page has had time to lay out images/fonts.
    useEffect(() => {
        if (isFirstPathRef.current) {
            isFirstPathRef.current = false;
            return;
        }
        lenisRef.current?.scrollTo(0, { immediate: true, force: true });
        lenisRef.current?.resize();
        const timer = setTimeout(() => ScrollTrigger.refresh(), 600);
        return () => clearTimeout(timer);
    }, [pathname]);

    return <>{children}</>;
}
