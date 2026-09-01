"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import type { SiteHeaderVariant } from "./site-header";
import { Icon } from "@/components/ui/icon";

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
            className="absolute -top-1.5 left-full ml-1 flex min-w-[200px] flex-col gap-1 rounded-xl border border-[rgba(250,251,248,0.14)] bg-[#1a2e1a] p-2 shadow-[0px_8px_24px_rgba(0,0,0,0.35)]"
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
                className="hover:text-primary flex items-center justify-between gap-6 rounded-lg px-4 py-2 font-sans text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-[#29462f]"
            >
                {item.label}
                {hasChildren ? <span className="text-xs text-[rgba(250,251,248,0.5)]">›</span> : null}
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
                className="flex min-w-[220px] flex-col gap-1 rounded-xl border border-[rgba(250,251,248,0.14)] bg-[#1a2e1a] p-2 shadow-[0px_8px_24px_rgba(0,0,0,0.35)]"
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

    return (
        <div
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
                        ? "text-forrest flex items-center gap-1.5 rounded-full px-5 py-2.5 font-sans text-base leading-normal font-medium whitespace-nowrap transition-colors hover:text-white"
                        : "flex items-center gap-1.5 rounded-full px-5 py-2.5 font-sans text-base leading-normal font-medium whitespace-nowrap text-white transition-colors hover:text-white"
                }
            >
                Our Services
                <span className="text-sm">
                    <Icon icon="lucide:chevron-right" />
                </span>
            </Link>
            {open ? <ServicesMenuPanel /> : null}
        </div>
    );
}
