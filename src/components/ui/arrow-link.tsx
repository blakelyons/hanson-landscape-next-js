import Link from "next/link";
import type { ComponentProps } from "react";
import { Icon } from "@/components/ui/icon";

type ArrowLinkProps = {
    children: string;
    icon: string;
    iconSize?: number;
    iconWidth?: number;
    iconHeight?: number;
    iconPosition?: "left" | "right";
    textClassName?: string;
    className?: string;
} & Omit<ComponentProps<typeof Link>, "children" | "href"> & { href?: ComponentProps<typeof Link>["href"] };

export function ArrowLink({
    children,
    icon,
    iconSize = 12,
    iconWidth,
    iconHeight,
    iconPosition = "right",
    textClassName = "text-forrest text-sm font-medium",
    className = "",
    href = "#",
    ...props
}: ArrowLinkProps) {
    const shift = iconPosition === "left" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1";
    const iconEl = (
        <span className={`transition-all duration-300 ease-in-out ${shift}`}>
            <Icon icon={icon} className="shrink-0" width={iconWidth ?? iconSize} height={iconHeight ?? iconSize} />
        </span>
    );

    return (
        <Link
            href={href}
            className={`inline-flex items-center gap-2 whitespace-nowrap ${textClassName} ${className} group`}
            {...props}
        >
            {iconPosition === "left" ? iconEl : null}
            <span>{children}</span>
            {iconPosition === "right" ? iconEl : null}
        </Link>
    );
}
