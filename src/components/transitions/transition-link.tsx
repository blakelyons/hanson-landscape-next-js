"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ComponentPropsWithRef, MouseEvent } from "react";
import { useRouteTransition } from "@/components/transitions/route-transition-overlay";
import { getPageTransition } from "@/lib/page-transitions";

// Drop-in replacement for next/link's <Link> that plays the destination
// route's registered page transition (see src/lib/page-transitions.ts)
// before navigating, instead of an instant swap.
export function TransitionLink({ href, onClick, ...props }: ComponentPropsWithRef<typeof Link>) {
    const router = useRouter();
    const { beginTransition } = useRouteTransition();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented || typeof href !== "string" || !href.startsWith("/")) return;

        const type = getPageTransition(href);
        if (type === "none") return;

        e.preventDefault();
        void beginTransition(type).then(() => router.push(href));
    };

    return <Link href={href} onClick={handleClick} {...props} />;
}
