"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PageTransitionType } from "@/lib/page-transitions";
import { useIrisLeafTransition } from "@/components/transitions/iris-leaf-overlay";
import { useCrossFadeTransition } from "@/components/transitions/cross-fade-overlay";
import { Logo } from "@/components/ui/logo";

// Three transitions, all closing over the old page then reopening onto the
// new one, driven entirely by GSAP:
//   - doors-forrest: two edge panels slide in from off-screen to meet at
//     center (closing), the route swaps behind them, then they slide back
//     out (reopening).
//   - iris-leaf: see iris-leaf-overlay.tsx for its close/reveal behavior.
//   - cross-fade: see cross-fade-overlay.tsx for its close/reveal behavior.
//
// Each door's hidden resting position is a plain CSS class (globals.css:
// .route-transition-door-left/-right) — that class is what's on screen
// before any JS runs, so a hard load never flashes the overlay. A mount-time
// gsap.set() (in a layout effect, so still pre-paint) then re-establishes
// that same position through GSAP itself: GSAP's xPercent/scale are tracked
// in its own internal cache, separate from the raw computed transform, and
// importing a percentage-based CSS transform implicitly (by just animating
// xPercent without ever having set it first) gets cached as a plain pixel
// `x` instead — so a later `xPercent: 0` tween computes against the wrong
// baseline and produces no visible movement. Never through React's `style`
// prop, though — this component re-renders on every pathname change, which
// would reset a React-controlled inline transform to its literal JSX value
// and stomp whatever GSAP was mid-animating.
const CLOSE_DURATION = 0.35;
const REOPEN_DELAY = 0.8;
const REOPEN_DURATION = 0.35;
// If router.push never lands on a new pathname (failed navigation, same route),
// reveal anyway so the cover can never get stuck on screen.
const NAVIGATION_TIMEOUT_MS = 8000;

gsap.registerPlugin(ScrollTrigger);

type RouteTransitionContextValue = {
    /**
     * Plays the close animation, navigates, and reveals once the route has changed.
     * Latest call wins: if the user clicks again mid-transition, earlier calls never push.
     */
    navigate: (href: string, type: PageTransitionType) => Promise<void>;
};

const RouteTransitionContext = createContext<RouteTransitionContextValue | null>(null);

export function useRouteTransition() {
    const ctx = useContext(RouteTransitionContext);
    if (!ctx) throw new Error("useRouteTransition must be used within RouteTransitionProvider");
    return ctx;
}

export function RouteTransitionProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const leftDoorRef = useRef<HTMLDivElement>(null);
    const rightDoorRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    // Which transition's cover is currently (or about to be) closed and needs revealing.
    const activeTypeRef = useRef<PageTransitionType | null>(null);
    // Increments per navigate() call so a stale click can tell it lost to a newer one.
    const navTokenRef = useRef(0);
    const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const irisLeaf = useIrisLeafTransition();
    const crossFade = useCrossFadeTransition();

    useGSAP(() => {
        // x: 0 forces out whatever plain-pixel baseline GSAP parsed from the
        // CSS class's percentage-based transform on first touch — without
        // it, xPercent stacks on top of that baseline instead of replacing
        // it (e.g. ends up at -200%, and a later `xPercent: 0` tween still
        // leaves the imported baseline in place, so nothing visibly moves).
        gsap.set(leftDoorRef.current, { x: 0, xPercent: -100 });
        gsap.set(rightDoorRef.current, { x: 0, xPercent: 100 });
        gsap.set(logoRef.current!, { opacity: 0, xPercent: 100 });
    }, []);

    const closeDoors = () =>
        new Promise<void>((resolve) => {
            gsap.killTweensOf([leftDoorRef.current, rightDoorRef.current, logoRef.current]);
            const tl = gsap.timeline({ defaults: { duration: 0.35, ease: "power2.inOut" } });
            tl.to(logoRef.current!, {
                opacity: 1,
                xPercent: 0,
            }).to(
                [leftDoorRef.current, rightDoorRef.current],
                {
                    xPercent: 0,
                    duration: CLOSE_DURATION,
                    ease: "power2.inOut",
                    onComplete: () => {
                        setTimeout(() => {
                            resolve();
                        }, 100);
                    },
                },
                "<",
            );
        });

    const reopenDoors = () => {
        gsap.killTweensOf([leftDoorRef.current, rightDoorRef.current, logoRef.current]);
        gsap.to(logoRef.current!, {
            opacity: 0,
            duration: 0.35,
            ease: "power2.inOut",
        });
        gsap.to(leftDoorRef.current, {
            xPercent: -100,
            duration: REOPEN_DURATION,
            delay: REOPEN_DELAY,
            ease: "power2.inOut",
        });
        gsap.to(rightDoorRef.current, {
            xPercent: 100,
            duration: REOPEN_DURATION,
            delay: REOPEN_DELAY,
            ease: "power2.inOut",
        });
    };

    const revealActive = useCallback(() => {
        const type = activeTypeRef.current;
        if (!type) return;
        activeTypeRef.current = null;
        if (watchdogRef.current) clearTimeout(watchdogRef.current);

        if (type === "iris-leaf") irisLeaf.reveal();
        else if (type === "cross-fade") crossFade.reveal();
        else if (type === "doors-forrest") reopenDoors();
        // eslint-disable-next-line react-hooks/exhaustive-deps -- reopenDoors only touches refs
    }, [irisLeaf, crossFade]);

    const navigate = useCallback(
        (href: string, type: PageTransitionType) => {
            const token = ++navTokenRef.current;
            if (watchdogRef.current) clearTimeout(watchdogRef.current);
            activeTypeRef.current = type;

            const close =
                type === "iris-leaf" ? irisLeaf.close() : type === "cross-fade" ? crossFade.close() : closeDoors();

            return close.then(() => {
                if (token !== navTokenRef.current) return; // a newer click took over
                router.push(href);
                watchdogRef.current = setTimeout(revealActive, NAVIGATION_TIMEOUT_MS);
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps -- closeDoors only touches refs
        [irisLeaf, crossFade, router, revealActive],
    );

    // Route has swapped behind the (now fully closed) cover. Re-measure ScrollTriggers
    // against the new page's final layout, then reopen a frame later so the new page's
    // entrance animations don't start in the middle of that mount's main-thread work.
    useEffect(() => {
        if (!activeTypeRef.current) return;
        let secondFrame = 0;
        const firstFrame = requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            secondFrame = requestAnimationFrame(revealActive);
        });
        return () => {
            cancelAnimationFrame(firstFrame);
            cancelAnimationFrame(secondFrame);
        };
    }, [pathname, revealActive]);

    useEffect(
        () => () => {
            if (watchdogRef.current) clearTimeout(watchdogRef.current);
        },
        [],
    );

    const contextValue = useMemo(() => ({ navigate }), [navigate]);

    return (
        <RouteTransitionContext.Provider value={contextValue}>
            {children}
            <div aria-hidden className="pointer-events-none fixed inset-0 z-100">
                <div
                    ref={leftDoorRef}
                    className="bg-forrest route-transition-door-left absolute inset-y-0 left-0 flex w-1/2 items-center justify-center"
                />
                <div
                    ref={rightDoorRef}
                    className="bg-forrest route-transition-door-right absolute inset-y-0 right-0 w-1/2"
                >
                    <div
                        ref={logoRef}
                        className="pointer-events-none absolute z-1000 flex h-full w-full items-center justify-start opacity-0"
                    >
                        <Logo
                            isScrolled={false}
                            effectiveVariant="solid"
                            className="translate-x-[-50%] lg:block"
                            size="lg"
                        />
                    </div>
                </div>
            </div>
            {irisLeaf.overlay}
            {crossFade.overlay}
        </RouteTransitionContext.Provider>
    );
}
