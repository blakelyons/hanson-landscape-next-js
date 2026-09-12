"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";
import { TransitionLink } from "@/components/transitions/transition-link";
import { ServicesNavDropdown } from "./nav-dropdown";
import { MobileNav } from "./mobile-nav";
import { getPillTargetRect } from "@/lib/nav-pill";
import { Logo } from "@/components/ui/logo";
gsap.registerPlugin(MorphSVGPlugin);

export type SiteHeaderVariant = "transparent" | "solid";

// lucide:mail (envelope flap + rounded-rect body, as an equivalent path so it
// can morph) and lucide:mail-open (flap + peaked-roof body), 24x24 viewBox.
const MAIL_FLAP_D = "m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7";
const MAIL_BODY_D = "M4 4H20A2 2 0 0 1 22 6V18A2 2 0 0 1 20 20H4A2 2 0 0 1 2 18V6A2 2 0 0 1 4 4Z";
const MAIL_OPEN_FLAP_D = "m22 10l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10";
const MAIL_OPEN_BODY_D =
    "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0z";

function MailToMailOpenIcon({ open, className }: { open: boolean; className?: string }) {
    const flapRef = useRef<SVGPathElement>(null);
    const bodyRef = useRef<SVGPathElement>(null);

    useGSAP(() => {
        gsap.to(flapRef.current, {
            morphSVG: open ? MAIL_OPEN_FLAP_D : MAIL_FLAP_D,
            duration: 0.4,
            ease: "power2.inOut",
            y: open ? -2 : 0,
        });
        gsap.to(bodyRef.current, {
            morphSVG: open ? MAIL_OPEN_BODY_D : MAIL_BODY_D,
            duration: 0.4,
            ease: "power2.inOut",
            y: open ? -2 : 0,
        });
    }, [open]);

    return (
        <span className={className}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                    <path ref={flapRef} d={MAIL_FLAP_D} />
                    <path ref={bodyRef} d={MAIL_BODY_D} />
                </g>
            </svg>
        </span>
    );
}

export type NavLinkData = {
    label: string;
    href: string;
    icon: string;
};

export const NAV_LINKS: NavLinkData[] = [
    { label: "Home", href: "/", icon: "lucide:house" },
    { label: "About", href: "/about", icon: "lucide:hard-hat" },
];

export const NAV_LINKS_AFTER: NavLinkData[] = [
    { label: "Portfolio", href: "#", icon: "lucide:briefcase" },
    { label: "Testimonials", href: "#", icon: "lucide:star" },
];

const headerContainerClasses: Record<SiteHeaderVariant, string> = {
    transparent: "inset-x-0 z-20 h-(--header-height) w-full",
    solid: "z-20 h-(--header-height) w-full bg-white",
};

// Delay between the header leaving the viewport (scrolled past its own
// height) and the sticky drawer sliding down into view.
const DRAWER_REVEAL_DELAY_MS = 300;

// Exported so HeroSection can delay its own entrance until this finishes.
export const HEADER_SLIDE_DURATION = 1.2;

// Active-link highlighting is an interior-page (solid) affordance — the
// homepage's transparent overlay header keeps its original plain-text nav
// unchanged, active route or not, to avoid a visual regression there.
function NavLink({
    link,
    active,
    variant,
    registerItem,
    onHoverEnter,
}: {
    link: NavLinkData;
    active: boolean;
    variant: SiteHeaderVariant;
    registerItem: (key: string, el: HTMLAnchorElement | null) => void;
    onHoverEnter: () => void;
}) {
    if (variant === "transparent") {
        return (
            <TransitionLink
                ref={(el) => registerItem(link.label, el)}
                href={link.href}
                onMouseEnter={onHoverEnter}
                className="rounded-full px-5 py-2.5 font-sans text-sm leading-normal font-medium whitespace-nowrap text-white transition-colors hover:text-white xl:text-base"
            >
                {link.label}
            </TransitionLink>
        );
    }

    return (
        <TransitionLink
            ref={(el) => registerItem(link.label, el)}
            href={link.href}
            onMouseEnter={onHoverEnter}
            className={`rounded-full px-5 py-2.5 font-sans text-sm leading-normal font-medium whitespace-nowrap transition-colors lg:text-base ${
                active ? "bg-primary text-white" : "text-forrest hover:text-white"
            }`}
        >
            {link.label}
        </TransitionLink>
    );
}

export function SiteHeader({
    variant = "transparent",
    playIntro = true,
}: {
    variant?: SiteHeaderVariant;
    playIntro?: boolean;
}) {
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef(new Map<string, HTMLAnchorElement>());
    const [mailOpen, setMailOpen] = useState(false);
    // isScrolled: header has scrolled past its own height and left the
    // viewport (like a normal, non-sticky header would).
    const [isScrolled, setIsScrolled] = useState(false);
    const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    // The mount entrance effect below owns the header's initial position.
    // This lets the scroll-drawer effect (right below) skip whenever
    // isScrolled hasn't actually changed since its last run — comparing
    // values (rather than a one-shot "have I run yet" flag) is what makes it
    // safe under React Strict Mode's dev-only double-invoke: both the
    // throwaway trial run and the real run see the same "unchanged" value
    // and skip identically, instead of the trial run consuming a one-shot
    // flag and leaving the real run to fire for real and stomp whatever the
    // entrance tween is mid-animating.
    const prevIsScrolledRef = useRef(isScrolled);

    // Threshold = header's own height (its distance from the top of the
    // page to its bottom edge, captured before any scroll happens).
    useEffect(() => {
        const header = headerRef.current;

        if (!header) return;
        const threshold = header.offsetTop + header.offsetHeight;

        const handleScroll = () => setIsScrolled(window.scrollY > threshold);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Initial slide-down from the CSS-hidden resting position
    // (.header-item-hidden on the logo and nav — the header bar itself never
    // moves, only these two pieces, staggered). Gated by playIntro so a page
    // that opts out (e.g. a revisit to "/" after the intro has already
    // played once) just shows them in place instead of replaying the slide.
    useGSAP(() => {
        const logo = headerRef.current?.querySelector("#logo");
        const globalNav = headerRef.current?.querySelector("#global-nav");
        if (!logo || !globalNav) return;

        // y: 0 forces out the plain-pixel baseline GSAP parses from the
        // computed matrix on first touch. GSAP only ever sees the resolved
        // (pixel) matrix from getComputedStyle, never the original CSS
        // declaration — so even though .header-item-hidden's translateY is
        // written as a percentage, GSAP has no way to know that and imports
        // it as plain `y` pixels, leaving its internal `yPercent` at 0. This
        // re-establishes yPercent as the actual baseline before animating it
        // (same xPercent/x gotcha documented in route-transition-overlay.tsx).
        gsap.set([logo, globalNav], { y: 0, yPercent: -100, opacity: 0 });

        if (!playIntro) {
            gsap.set([logo, globalNav], { yPercent: 0, opacity: 1 });
            return;
        }
        const tl = gsap.timeline({ defaults: { duration: HEADER_SLIDE_DURATION, ease: "power2.inOut" } });
        tl.to([logo, globalNav], { yPercent: 0, opacity: 1 });
    }, [playIntro]);

    const effectiveVariant: SiteHeaderVariant = isScrolled ? "solid" : variant;

    // Once the header has scrolled out of view (isScrolled), the logo/nav
    // are parked off-screen (yPercent -100, unseen since they just left the
    // viewport). After a beat, they slide down into view like a drawer.
    // Scrolling back up before that delay fires cancels the pending reveal.
    useGSAP(() => {
        if (prevIsScrolledRef.current === isScrolled) return;
        prevIsScrolledRef.current = isScrolled;

        const logo = headerRef.current?.querySelector("#logo");
        const globalNav = headerRef.current?.querySelector("#global-nav");
        if (!logo || !globalNav) return;

        if (revealTimerRef.current) clearTimeout(revealTimerRef.current);

        if (isScrolled) {
            gsap.set([logo, globalNav], { yPercent: -100, opacity: 0 });
            revealTimerRef.current = setTimeout(() => {
                gsap.to([logo, globalNav], {
                    yPercent: 0,
                    opacity: 1,
                    duration: HEADER_SLIDE_DURATION,
                    ease: "power2.out",
                });
            }, DRAWER_REVEAL_DELAY_MS);
        } else {
            gsap.set([logo, globalNav], { yPercent: 0, opacity: 1 });
        }

        return () => {
            if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
        };
    }, [isScrolled]);

    const registerItem = (key: string, el: HTMLAnchorElement | null) => {
        if (el) itemRefs.current.set(key, el);
        else itemRefs.current.delete(key);
    };

    const showPillAt = (key: string) => {
        const nav = navRef.current;
        const target = itemRefs.current.get(key);
        const pill = pillRef.current;
        if (!nav || !target || !pill) return;

        const { x, y, width, height } = getPillTargetRect(nav.getBoundingClientRect(), target.getBoundingClientRect());
        gsap.to(pill, { x, y, width, height, opacity: 1, duration: 0.6, ease: "power2.inOut" });
    };

    const hidePill = () => {
        gsap.to(pillRef.current, { opacity: 0, duration: 0.3, ease: "power1.out" });
    };

    return (
        <>
            {/* base "solid" header sits in normal flow; going fixed on scroll
                pulls it out of flow, so hold its space to stop content jumping */}
            {isScrolled && variant === "solid" && <div className="h-(--header-height) w-full" aria-hidden />}
            <header
                ref={headerRef}
                className={`global-header ${headerContainerClasses[effectiveVariant]} ${
                    isScrolled ? "fixed top-0" : effectiveVariant === "transparent" ? "absolute top-3.25" : "relative"
                }`}
            >
                <div
                    className={`container flex h-full ${effectiveVariant === "solid" ? "items-center" : "items-start"} justify-between`}
                >
                    <Logo
                        id="logo"
                        isScrolled={isScrolled || pathname !== "/"}
                        effectiveVariant={effectiveVariant}
                        className="header-item-hidden hidden opacity-0 lg:block"
                        size={isScrolled || pathname !== "/" ? "md" : "lg"}
                    />
                    <nav
                        id="global-nav"
                        ref={navRef}
                        onMouseLeave={hidePill}
                        className={`header-item-hidden relative hidden flex-1 items-center justify-end gap-2 opacity-0 lg:flex xl:gap-4 ${effectiveVariant === "transparent" ? "mt-10" : ""}`}
                    >
                        <div
                            ref={pillRef}
                            aria-hidden
                            className="bg-primary pointer-events-none absolute top-0 left-0 -z-10 rounded-full opacity-0"
                        />
                        {NAV_LINKS.map((link) => (
                            <NavLink
                                key={link.label}
                                link={link}
                                active={effectiveVariant === "solid" && pathname === link.href}
                                variant={effectiveVariant}
                                registerItem={registerItem}
                                onHoverEnter={() => showPillAt(link.label)}
                            />
                        ))}
                        <ServicesNavDropdown
                            variant={effectiveVariant}
                            registerItem={registerItem}
                            onHoverEnter={() => showPillAt("services")}
                        />
                        {NAV_LINKS_AFTER.map((link) => (
                            <NavLink
                                key={link.label}
                                link={link}
                                active={false}
                                variant={effectiveVariant}
                                registerItem={registerItem}
                                onHoverEnter={() => showPillAt(link.label)}
                            />
                        ))}
                        <Link
                            href="#"
                            onMouseEnter={() => setMailOpen(true)}
                            onMouseLeave={() => setMailOpen(false)}
                            className="group hover:bg-primary-light group bg-primary flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-full px-8 font-sans text-sm font-medium whitespace-nowrap text-black transition-all duration-300 ease-in-out xl:text-base"
                        >
                            <MailToMailOpenIcon open={mailOpen} className="transition-all duration-300 ease-in-out" />
                            <span className="transition-all duration-300 ease-in-out">Contact Us</span>
                        </Link>
                    </nav>
                </div>
            </header>
            <MobileNav />
        </>
    );
}
