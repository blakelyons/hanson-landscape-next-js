import Link from "next/link";
import type { ComponentProps } from "react";
import { Icon } from "@/components/ui/icon";

type ArrowLinkProps = {
    children: string;
    icon: string;
    iconSize?: number;
    iconWidth?: number;
    iconHeight?: number;
    textClassName?: string;
    className?: string;
} & Omit<ComponentProps<typeof Link>, "children" | "href"> & { href?: ComponentProps<typeof Link>["href"] };

export function ArrowLink({
    children,
    icon,
    iconSize = 12,
    iconWidth,
    iconHeight,
    textClassName = "text-forrest text-sm font-medium",
    className = "",
    href = "#",
    ...props
}: ArrowLinkProps) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center gap-2.5 whitespace-nowrap ${textClassName} ${className}`}
            {...props}
        >
            <span>{children}</span>
            <Icon icon={icon} className="shrink-0" width={iconWidth ?? iconSize} height={iconHeight ?? iconSize} />
        </Link>
    );
}
