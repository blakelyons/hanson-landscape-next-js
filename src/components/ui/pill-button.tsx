import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "@/components/ui/icon";
import type { IconSet } from "@/lib/icon-config";

type PillButtonVariant = "green" | "amber" | "amber-dark" | "outline";
type PillButtonSize = "sm" | "md" | "lg";

const variantSurfaceClasses: Record<PillButtonVariant, string> = {
    green: "bg-forrest",
    amber: "bg-primary",
    "amber-dark": "bg-amber-dark",
    outline: "border-[1.5px] border-[rgba(250,251,248,0.35)]",
};

const sizeClasses: Record<PillButtonSize, string> = {
    sm: "px-4 py-2 text-xs font-medium",
    md: "px-8 py-4 text-base font-medium",
    lg: "px-7 py-[17px] text-[15px] font-bold",
};

type PillButtonProps = {
    children: ReactNode;
    variant?: PillButtonVariant;
    size?: PillButtonSize;
    textClassName?: string;
    iconName?: string;
    iconSet?: IconSet;
    iconSize?: number;
    className?: string;
} & Omit<ComponentProps<typeof Link>, "children" | "href"> & { href?: ComponentProps<typeof Link>["href"] };

export function PillButton({
    children,
    variant = "green",
    size = "md",
    textClassName = "text-white",
    iconName,
    iconSet,
    iconSize = 14,
    className = "",
    href = "#",
    ...props
}: PillButtonProps) {
    return (
        <Link
            href={href}
            className={`group inline-flex items-center justify-center gap-2.5 rounded-full text-center whitespace-nowrap ${variantSurfaceClasses[variant]} ${sizeClasses[size]} ${textClassName} ${className}`}
            {...props}
        >
            <span>{children}</span>
            {iconName ? (
                <Icon name={iconName} set={iconSet} className="shrink-0" width={iconSize} height={iconSize} />
            ) : null}
        </Link>
    );
}
