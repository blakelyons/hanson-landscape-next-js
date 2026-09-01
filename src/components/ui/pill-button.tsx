import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "@/components/ui/icon";

type PillButtonVariant = "green" | "primary" | "primary-dark" | "outline";
type PillButtonSize = "sm" | "md" | "lg";

const variantSurfaceClasses: Record<PillButtonVariant, string> = {
    green: "bg-forrest",
    primary: "bg-primary",
    "primary-dark": "bg-primary-dark",
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
    icon?: string;
    iconSize?: number;
    className?: string;
} & Omit<ComponentProps<typeof Link>, "children" | "href"> & { href?: ComponentProps<typeof Link>["href"] };

export function PillButton({
    children,
    variant = "green",
    size = "md",
    textClassName = "text-white",
    icon,
    iconSize = 14,
    className = "",
    href = "#",
    ...props
}: PillButtonProps) {
    return (
        <Link
            href={href}
            className={`group hover:bg-primary-light inline-flex items-center justify-center gap-2.5 rounded-full text-center whitespace-nowrap transition-all duration-300 ease-in-out hover:gap-2.5 ${variantSurfaceClasses[variant]} ${sizeClasses[size]} ${textClassName} ${className}`}
            {...props}
        >
            <span>{children}</span>
            {icon ? <Icon icon={icon} className="shrink-0" width={iconSize} height={iconSize} /> : null}
        </Link>
    );
}
