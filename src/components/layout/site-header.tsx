"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ServicesNavDropdown } from "./nav-dropdown";
import { Icon } from "@/components/ui/icon";
import { getPillTargetRect } from "@/lib/nav-pill";

export type SiteHeaderVariant = "transparent" | "solid";

type NavLinkData = {
    label: string;
    href: string;
};

const NAV_LINKS: NavLinkData[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
];

const NAV_LINKS_AFTER: NavLinkData[] = [
    { label: "Portfolio", href: "#" },
    { label: "Testimonials", href: "#" },
];

const headerContainerClasses: Record<SiteHeaderVariant, string> = {
    transparent: "absolute inset-x-0 top-[13px] z-20 h-[114px] w-full",
    solid: "relative z-20 h-[114px] w-full bg-white",
};

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
            <Link
                ref={(el) => registerItem(link.label, el)}
                href={link.href}
                onMouseEnter={onHoverEnter}
                className="rounded-full px-5 py-2.5 font-sans text-base leading-normal font-medium whitespace-nowrap text-white transition-colors hover:text-white"
            >
                {link.label}
            </Link>
        );
    }

    return (
        <Link
            ref={(el) => registerItem(link.label, el)}
            href={link.href}
            onMouseEnter={onHoverEnter}
            className={`rounded-full px-5 py-2.5 font-sans text-base leading-normal font-medium whitespace-nowrap transition-colors ${
                active ? "bg-primary text-white" : "text-forrest hover:text-white"
            }`}
        >
            {link.label}
        </Link>
    );
}

export function SiteHeader({ variant = "transparent" }: { variant?: SiteHeaderVariant }) {
    const pathname = usePathname();
    const navRef = useRef<HTMLElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef(new Map<string, HTMLAnchorElement>());

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
        gsap.to(pill, { x, y, width, height, opacity: 1, duration: 0.2, ease: "power2.inOut" });
    };

    const hidePill = () => {
        gsap.to(pillRef.current, { opacity: 0, duration: 0.3, ease: "power1.out" });
    };

    return (
        <header className={headerContainerClasses[variant]}>
            <div
                className={`container flex h-full ${variant === "solid" ? "items-center" : "items-start"} justify-between`}
            >
                <Link
                    href="/"
                    className={`ml-23.5 block h-36.25 w-45.75 shrink-0 ${variant === "transparent" ? "mt-1.75" : ""}`}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="Hanson Landscape" className="size-full object-cover" src="/images/home/logo.png" />
                </Link>
                <nav
                    ref={navRef}
                    onMouseLeave={hidePill}
                    className={`relative flex flex-1 items-center justify-end gap-10 ${variant === "transparent" ? "mt-[57.5px]" : ""}`}
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
                            active={variant === "solid" && pathname === link.href}
                            variant={variant}
                            registerItem={registerItem}
                            onHoverEnter={() => showPillAt(link.label)}
                        />
                    ))}
                    <ServicesNavDropdown
                        variant={variant}
                        registerItem={registerItem}
                        onHoverEnter={() => showPillAt("services")}
                    />
                    {NAV_LINKS_AFTER.map((link) => (
                        <NavLink
                            key={link.label}
                            link={link}
                            active={false}
                            variant={variant}
                            registerItem={registerItem}
                            onHoverEnter={() => showPillAt(link.label)}
                        />
                    ))}
                    <Link
                        href="#"
                        className="bg-primary group hover:bg-primary-light group flex shrink-0 items-center justify-center gap-1.5 rounded-[39px] px-8 py-2.5 font-sans text-sm font-medium font-semibold whitespace-nowrap text-black transition-all duration-300 ease-in-out"
                    >
                        <span className="transition-all duration-300 ease-in-out">
                            <Icon icon="lucide:mail" />
                        </span>
                        <span className="transition-all duration-300 ease-in-out">Contact Us</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}
