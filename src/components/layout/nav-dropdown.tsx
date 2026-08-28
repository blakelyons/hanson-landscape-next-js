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
    <div className="absolute left-full top-0 ml-1 flex min-w-[200px] flex-col gap-1 rounded-xl border border-[rgba(250,251,248,0.14)] bg-[#1a2e1a] p-2 shadow-[0px_8px_24px_rgba(0,0,0,0.35)]">
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
        className="flex items-center justify-between gap-6 whitespace-nowrap rounded-lg px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-[#29462f] hover:text-primary"
      >
        {item.label}
        {hasChildren ? <span className="text-xs text-[rgba(250,251,248,0.5)]">›</span> : null}
      </a>
      {hasChildren && open ? <SubmenuPanel items={item.children!} /> : null}
    </div>
  );
}

export function ServicesNavDropdown({
  variant = "transparent",
}: {
  variant?: SiteHeaderVariant;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <a
        href="#"
        className={
          variant === "solid"
            ? "whitespace-nowrap rounded-full px-5 py-2 font-sans text-base font-medium leading-normal text-forrest transition-colors hover:text-primary"
            : "whitespace-nowrap font-sans text-base font-medium leading-[52px] text-white transition-colors hover:text-primary"
        }
      >
        Our Services
      </a>
      {open ? (
        <div className="absolute left-0 top-full flex min-w-[220px] flex-col gap-1 rounded-xl border border-[rgba(250,251,248,0.14)] bg-[#1a2e1a] p-2 shadow-[0px_8px_24px_rgba(0,0,0,0.35)]">
          {SERVICES_MENU.map((item) => (
            <MenuNode key={item.label} item={item} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
