import Link from "next/link";
import type { ComponentProps } from "react";
import { Icon } from "@/components/ui/icon";
import type { IconSet } from "@/lib/icon-config";

type ArrowLinkProps = {
    children: string;
    iconName: string;
    iconSet?: IconSet;
    iconSize?: number;
    iconWidth?: number;
    iconHeight?: number;
    textClassName?: string;
    className?: string;
} & Omit<ComponentProps<typeof Link>, "children" | "href"> & { href?: ComponentProps<typeof Link>["href"] };

export function ArrowLink({
    children,
    iconName,
    iconSet,
    iconSize = 12,
    iconWidth,
    iconHeight,
    textClassName = "text-forrest text-sm font-medium",
    className = "",
    href = "#",
    ...props
}: ArrowLinkProps) {
    return (
        <Link href={href} className={`inline-flex items-center gap-2.5 whitespace-nowrap ${className}`} {...props}>
            <span className={textClassName}>{children}</span>
            <span className={`${textClassName} shrink-0`}>
                <Icon name={iconName} set={iconSet} width={iconWidth ?? iconSize} height={iconHeight ?? iconSize} />
            </span>
        </Link>
    );
}
