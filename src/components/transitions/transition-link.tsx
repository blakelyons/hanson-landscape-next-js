"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithRef, MouseEvent } from "react";
import { useRouteTransition } from "@/components/transitions/route-transition-overlay";
import { getPageTransition } from "@/lib/page-transitions";

// Drop-in replacement for next/link's <Link> that plays the destination
// route's registered page transition (see src/lib/page-transitions.ts)
// before navigating, instead of an instant swap.
//
// Falls back to a plain Link navigation (no cover) whenever the transition
// couldn't end: same pathname (query/hash-only change never changes
// usePathname, so the reveal would never fire), modified clicks (new tab),
// and non-internal hrefs.
export function TransitionLink({ href, onClick, target, ...props }: ComponentPropsWithRef<typeof Link>) {
    const pathname = usePathname();
    const { navigate } = useRouteTransition();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented || typeof href !== "string" || !href.startsWith("/")) return;
        if (target && target !== "_self") return;
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        const destination = href.split(/[?#]/)[0] || "/";
        if (destination === pathname) return;

        const type = getPageTransition(destination);
        if (type === "none") return;

        e.preventDefault();
        void navigate(href, type);
    };

    return <Link href={href} target={target} onClick={handleClick} {...props} />;
}
