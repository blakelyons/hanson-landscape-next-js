"use client";

import { useState } from "react";
import type { SiteHeaderVariant } from "./site-header";

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
    return (
        <div className="absolute top-0 left-full ml-1 flex min-w-[200px] flex-col gap-1 rounded-xl border border-[rgba(250,251,248,0.14)] bg-[#1a2e1a] p-2 shadow-[0px_8px_24px_rgba(0,0,0,0.35)]">
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
            <a
                href="#"
                className="hover:text-primary flex items-center justify-between gap-6 rounded-lg px-4 py-2 font-sans text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-[#29462f]"
            >
                {item.label}
                {hasChildren ? <span className="text-xs text-[rgba(250,251,248,0.5)]">›</span> : null}
            </a>
            {hasChildren && open ? <SubmenuPanel items={item.children!} /> : null}
        </div>
    );
}

export function ServicesNavDropdown({ variant = "transparent" }: { variant?: SiteHeaderVariant }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <a
                href="#"
                className={
                    variant === "solid"
                        ? "text-forrest hover:text-primary rounded-full px-5 py-2 font-sans text-base leading-normal font-medium whitespace-nowrap transition-colors"
                        : "hover:text-primary font-sans text-base leading-[52px] font-medium whitespace-nowrap text-white transition-colors"
                }
            >
                Our Services
            </a>
            {open ? (
                <div className="absolute top-full left-0 flex min-w-[220px] flex-col gap-1 rounded-xl border border-[rgba(250,251,248,0.14)] bg-[#1a2e1a] p-2 shadow-[0px_8px_24px_rgba(0,0,0,0.35)]">
                    {SERVICES_MENU.map((item) => (
                        <MenuNode key={item.label} item={item} />
                    ))}
                </div>
            ) : null}
        </div>
    );
}
