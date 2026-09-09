"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";
import { useUIStore } from "@/store/ui-store";
import { NAV_LINKS, NAV_LINKS_AFTER } from "./site-header";
import { ChevronToLeafIcon, SERVICES_MENU, type MenuItem } from "./chevron-to-leaf-icon";
import { Logo } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";

gsap.registerPlugin(MorphSVGPlugin);

// Three horizontal bars (top/middle/bottom) morphing into an X: top and
// bottom bars morph into the X's two diagonals, the middle bar just fades.
const HAMBURGER_TOP_D = "m4 6h16";
const HAMBURGER_MID_D = "m4 12h16";
const HAMBURGER_BOTTOM_D = "m4 18h16";
const CLOSE_TOP_D = "m6 6l12 12";
const CLOSE_BOTTOM_D = "m6 18l12 -12";

function HamburgerIcon({ open, className }: { open: boolean; className?: string }) {
    const topRef = useRef<SVGPathElement>(null);
    const midRef = useRef<SVGPathElement>(null);
    const bottomRef = useRef<SVGPathElement>(null);

    useGSAP(() => {
        gsap.to(topRef.current, {
            morphSVG: open ? CLOSE_TOP_D : HAMBURGER_TOP_D,
            duration: 0.4,
            ease: "power2.inOut",
        });
        gsap.to(bottomRef.current, {
            morphSVG: open ? CLOSE_BOTTOM_D : HAMBURGER_BOTTOM_D,
            duration: 0.4,
            ease: "power2.inOut",
        });
        gsap.to(midRef.current, { opacity: open ? 0 : 1, duration: 0.2, ease: "power2.inOut" });
    }, [open]);

    return (
        <span className={className}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                    <path ref={topRef} d={HAMBURGER_TOP_D} />
                    <path ref={midRef} d={HAMBURGER_MID_D} />
                    <path ref={bottomRef} d={HAMBURGER_BOTTOM_D} />
                </g>
            </svg>
        </span>
    );
}

const LG_BREAKPOINT_QUERY = "(min-width: 1024px)";

const drawerLinkClasses =
    "font-sans text-lg font-medium text-forrest transition-colors flex items-center gap-2.5 hover:text-[#f89c1c]";

const OUR_SERVICES_ITEM: MenuItem = { label: "Our Services", children: SERVICES_MENU };

// Indexed by nesting depth (0-2 for this menu's two levels) — kept as
// literal classes so Tailwind's static scan can find them.
const INDENT_CLASSES = ["pl-0", "pl-4", "pl-8"];

function AccordionRow({ item, depth, onNavigate }: { item: MenuItem; depth: number; onNavigate: () => void }) {
    const [open, setOpen] = useState(false);
    const submenuRef = useRef<HTMLDivElement>(null);
    const hasChildren = Boolean(item.children?.length);
    const indentClass = INDENT_CLASSES[depth] ?? INDENT_CLASSES[INDENT_CLASSES.length - 1];

    // Submenu stays mounted (height starts at 0) so opening can slide-down
    // to its measured height instead of popping in, and each row can fade
    // up in a stagger once the container has room for them.
    useGSAP(
        () => {
            const submenu = submenuRef.current;
            if (!submenu) return;
            const rows = submenu.children[0]?.children;

            if (open) {
                gsap.to(submenu, { height: "auto", duration: 0.35, ease: "power2.inOut" });
                if (rows?.length) {
                    gsap.fromTo(
                        rows,
                        { opacity: 0, y: 8 },
                        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out", delay: 0.1 },
                    );
                }
            } else {
                gsap.to(submenu, { height: 0, duration: 0.3, ease: "power2.inOut" });
            }
        },
        { dependencies: [open], scope: submenuRef },
    );

    if (!hasChildren) {
        return (
            <Link href="#" onClick={onNavigate} className={`${drawerLinkClasses} ${indentClass}`}>
                {item.label}
            </Link>
        );
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                aria-expanded={open}
                className={`${drawerLinkClasses} ${indentClass} flex w-full items-center justify-between gap-3 text-left`}
            >
                <span>{item.label}</span>
                <ChevronToLeafIcon open={open} className="text-sm" />
            </button>
            <div ref={submenuRef} className="h-0 overflow-hidden" aria-hidden={!open}>
                <div className={`flex flex-col gap-4 pt-4 ${depth === 0 ? "border-primary border-l-2" : ""}`}>
                    {item.children!.map((child) => (
                        <AccordionRow key={child.label} item={child} depth={depth + 1} onNavigate={onNavigate} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function MobileNav() {
    const isOpen = useUIStore((state) => state.isMobileNavOpen);
    const toggleMobileNav = useUIStore((state) => state.toggleMobileNav);
    const closeMobileNav = useUIStore((state) => state.closeMobileNav);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement>(null);

    // Slide the button off-screen at/above `lg`; only animate on breakpoint
    // crossings, snap instantly to the correct position on mount.
    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;
        const mql = window.matchMedia(LG_BREAKPOINT_QUERY);

        gsap.set(button, { xPercent: mql.matches ? 100 : 0 });

        const handleChange = (event: MediaQueryListEvent) => {
            gsap.to(button, { xPercent: event.matches ? 100 : 0, duration: 0.4, ease: "power2.inOut" });
        };
        mql.addEventListener("change", handleChange);
        return () => mql.removeEventListener("change", handleChange);
    }, []);

    // Backdrop/drawer stay mounted so this timeline can play in both
    // directions; visibility/pointer-events only flip once it settles.
    useGSAP(() => {
        const backdrop = backdropRef.current;
        const drawer = drawerRef.current;
        const items = itemsRef.current?.children;
        if (!backdrop || !drawer) return;

        if (isOpen) gsap.set([backdrop, drawer], { visibility: "visible", pointerEvents: "auto" });

        const tl = gsap.timeline({
            onComplete: () => {
                if (!isOpen) gsap.set([backdrop, drawer], { visibility: "hidden", pointerEvents: "none" });
            },
        });

        tl.to(backdrop, { opacity: isOpen ? 1 : 0, duration: 0.3, ease: "power2.inOut" }, 0);
        tl.to(drawer, { xPercent: isOpen ? 0 : 100, duration: 0.4, ease: "power2.inOut" }, 0);
        if (items?.length) {
            tl.to(
                items,
                isOpen
                    ? { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }
                    : { opacity: 0, y: 12, duration: 0.15, ease: "power2.in" },
                isOpen ? 0.15 : 0,
            );
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeMobileNav();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, closeMobileNav]);

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                onClick={toggleMobileNav}
                aria-expanded={isOpen}
                aria-controls="mobile-nav-drawer"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="bg-primary fixed top-6 right-6 z-50 flex size-11 items-center justify-center rounded-full text-white shadow-md lg:hidden"
            >
                <HamburgerIcon open={isOpen} className="text-2xl" />
            </button>

            <div
                ref={backdropRef}
                data-testid="mobile-nav-backdrop"
                aria-hidden
                onClick={closeMobileNav}
                className="invisible fixed inset-0 z-30 bg-black/40 opacity-0 backdrop-blur-sm"
            />

            <div
                ref={drawerRef}
                id="mobile-nav-drawer"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                className="invisible fixed inset-y-0 right-0 z-40 w-full max-w-100 bg-white"
            >
                <div className="flex h-dvh flex-col gap-6 pb-8">
                    <div className="flex-0">
                        <Logo isScrolled effectiveVariant="solid" className="mt-8 ml-8" />
                    </div>
                    <div ref={itemsRef} className="flex h-full flex-1 flex-col gap-6 p-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={closeMobileNav}
                                className={drawerLinkClasses}
                            >
                                <Icon icon={link.icon} className="size-5" />
                                {link.label}
                            </Link>
                        ))}
                        <AccordionRow item={OUR_SERVICES_ITEM} depth={0} onNavigate={closeMobileNav} />
                        {NAV_LINKS_AFTER.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={closeMobileNav}
                                className={drawerLinkClasses}
                            >
                                <Icon icon={link.icon} className="size-5" />
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="mt-auto flex-0 px-8">
                        <Link
                            href="#"
                            onClick={closeMobileNav}
                            className="bg-primary mt-auto flex h-11 items-center justify-center rounded-full px-8 font-sans text-sm font-medium whitespace-nowrap text-black"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
