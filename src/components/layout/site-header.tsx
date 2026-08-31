"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ServicesNavDropdown } from "./nav-dropdown";

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
function NavLink({ link, active, variant }: { link: NavLinkData; active: boolean; variant: SiteHeaderVariant }) {
    if (variant === "transparent") {
        return (
            <Link
                href={link.href}
                className="hover:text-primary font-sans text-base leading-[52px] font-medium whitespace-nowrap text-white transition-colors"
            >
                {link.label}
            </Link>
        );
    }

    return (
        <Link
            href={link.href}
            className={`rounded-full px-5 py-2 font-sans text-base leading-normal font-medium whitespace-nowrap transition-colors ${
                active ? "bg-primary text-white" : "text-forrest hover:text-primary"
            }`}
        >
            {link.label}
        </Link>
    );
}

export function SiteHeader({ variant = "transparent" }: { variant?: SiteHeaderVariant }) {
    const pathname = usePathname();

    return (
        <header className={headerContainerClasses[variant]}>
            <div
                className={`container flex h-full ${variant === "solid" ? "items-center" : "items-start"} justify-between`}
            >
                <Link
                    href="/"
                    className={`ml-[94px] block h-[145px] w-[183px] shrink-0 ${variant === "transparent" ? "mt-[7px]" : ""}`}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="Hanson Landscape" className="size-full object-cover" src="/images/home/logo.png" />
                </Link>
                <nav
                    className={`flex flex-1 items-center justify-end gap-8 ${variant === "transparent" ? "mt-7.75" : ""}`}
                >
                    {NAV_LINKS.map((link) => (
                        <NavLink
                            key={link.label}
                            link={link}
                            active={variant === "solid" && pathname === link.href}
                            variant={variant}
                        />
                    ))}
                    <ServicesNavDropdown variant={variant} />
                    {NAV_LINKS_AFTER.map((link) => (
                        <NavLink key={link.label} link={link} active={false} variant={variant} />
                    ))}
                    <a
                        href="#"
                        className="bg-primary flex shrink-0 items-center justify-center rounded-[39px] px-8 py-2.5 font-sans text-sm font-medium whitespace-nowrap text-white"
                    >
                        Contact Us
                    </a>
                </nav>
            </div>
        </header>
    );
}
