"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";
import type { SiteHeaderVariant } from "./site-header";
gsap.registerPlugin(MorphSVGPlugin);

// chevron-right (lucide, 24x24 viewBox)
const CHEVRON_D = "m9 18l6-6l-6-6";
// maple-leaf, scaled from its native 15x15 viewBox into 24x24 so it shares
// coordinate space with the chevron — MorphSVGPlugin morphs raw path
// coordinates, so mismatched viewBoxes would distort the tween.
const MAPLE_LEAF_D =
    "m2.32 24l4.96 -6.43l3.78 6.34L12.8 20.8l7.44 1.6l-0.61 -1.7c-0.1 -0.24 0.02 -0.5 0.24 -0.61L24 18L20.42 15.68c-0.19 -0.13 -0.27 -0.38 -0.19 -0.61l0.78 -1.9L16.8 12.8L24 7.71l-3.42 -0.85l2.56 -6l-6 2.56L16.29 0L11.2 7.2l-0.35 -4.21l-1.92 0.77c-0.22 0.08 -0.46 0 -0.61 -0.19L6 0L3.9 4.11c-0.13 0.22 -0.38 0.34 -0.62 0.24L1.58 3.74L3.2 11.2L0 12.88l6.43 3.84l-6.3 5.09q0.1 0.82 0.67 1.39c0.38 0.38 0.9 0.66 1.52 0.8";

function ChevronToLeafIcon({
    open,
    className,
    leafColor = "currentColor",
}: {
    open: boolean;
    className?: string;
    leafColor?: string;
}) {
    const pathRef = useRef<SVGPathElement>(null);

    useGSAP(() => {
        gsap.to(pathRef.current, {
            morphSVG: open ? MAPLE_LEAF_D : CHEVRON_D,
            fillOpacity: open ? 1 : 0,
            strokeOpacity: open ? 0 : 1,
            strokeWidth: open ? 0 : 2,
            duration: 0.4,
            ease: "power2.inOut",
        });
    }, [open]);

    return (
        <span className={className}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                    ref={pathRef}
                    fill={leafColor}
                    fillOpacity={0}
                    stroke="currentColor"
                    strokeOpacity={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={CHEVRON_D}
                />
            </svg>
        </span>
    );
}

function useDropdownEnter<T extends HTMLElement>() {
    const ref = useRef<T>(null);

    useLayoutEffect(() => {
        if (!ref.current) return;
        gsap.fromTo(ref.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" });
    }, []);

    return ref;
}

type MenuItem = {
    label: string;
    children?: MenuItem[];
};

const SERVICES_MENU: MenuItem[] = [
    {
        label: "Residential Services",
        children: [{ label: "Item 1" }, { label: "Item 2" }],
    },
    {
        label: "Commercial Services",
        children: [{ label: "Item 1" }, { label: "Item 2" }],
    },
];

function SubmenuPanel({ items }: { items: MenuItem[] }) {
    const ref = useDropdownEnter<HTMLDivElement>();

    return (
        <div
            ref={ref}
            className="absolute -top-1.5 left-full ml-1 flex min-w-50 flex-col gap-1 rounded-xl border border-[rgba(250,251,248,0.14)] bg-[#1a2e1a] p-2 shadow-[0px_8px_24px_rgba(0,0,0,0.35)]"
        >
            {items.map((item) => (
                <MenuNode key={item.label} item={item} />
            ))}
        </div>
    );
}

function MenuNode({ item }: { item: MenuItem }) {
    const [open, setOpen] = useState(false);
    const hasChildren = Boolean(item.children?.length);

    return (
        <div
            className="relative"
            onMouseEnter={() => hasChildren && setOpen(true)}
            onMouseLeave={() => hasChildren && setOpen(false)}
        >
            <Link
                href="#"
                className="hover:text-primary group flex items-center justify-between gap-6 rounded-lg px-4 py-2 font-sans text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-[#29462f]"
            >
                {item.label}
                {hasChildren ? (
                    <ChevronToLeafIcon
                        open={open}
                        leafColor="var(--color-primary)"
                        className="text-muted text-xs transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                    />
                ) : null}
            </Link>
            {hasChildren && open ? <SubmenuPanel items={item.children!} /> : null}
        </div>
    );
}

function ServicesMenuPanel() {
    const ref = useDropdownEnter<HTMLDivElement>();

    return (
        // Extra top padding on this wrapper (not margin) keeps the gap to the
        // trigger inside the hoverable box, so mousing down into the panel
        // doesn't cross dead space and trigger the parent's onMouseLeave.
        <div className="absolute top-full left-0 pt-4">
            <div
                ref={ref}
                className="flex min-w-55 flex-col gap-1 rounded-xl border border-[rgba(250,251,248,0.14)] bg-[#1a2e1a] p-2 shadow-[0px_8px_24px_rgba(0,0,0,0.35)]"
            >
                {SERVICES_MENU.map((item) => (
                    <MenuNode key={item.label} item={item} />
                ))}
            </div>
        </div>
    );
}

export function ServicesNavDropdown({
    variant = "transparent",
    registerItem,
    onHoverEnter,
}: {
    variant?: SiteHeaderVariant;
    registerItem?: (key: string, el: HTMLAnchorElement | null) => void;
    onHoverEnter?: () => void;
}) {
    const [open, setOpen] = useState(false);

    const rootRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={rootRef}
            className="relative"
            onMouseEnter={() => {
                setOpen(true);
                onHoverEnter?.();
            }}
            onMouseLeave={() => setOpen(false)}
        >
            <Link
                ref={(el) => registerItem?.("services", el)}
                href="#"
                className={
                    variant === "solid"
                        ? "text-forrest is-dropdown-link flex items-center gap-3 rounded-full px-5 py-2.5 font-sans text-sm leading-normal font-medium whitespace-nowrap transition-all duration-300 ease-in-out hover:text-white lg:text-base"
                        : "is-dropdown-link flex items-center gap-3 rounded-full px-5 py-2.5 font-sans text-sm leading-normal font-medium whitespace-nowrap text-white transition-all duration-300 ease-in-out hover:text-white lg:text-base"
                }
            >
                <span>Our Services</span>
                <ChevronToLeafIcon open={open} className="services-chevron text-sm" />
            </Link>
            {open ? <ServicesMenuPanel /> : null}
        </div>
    );
}
