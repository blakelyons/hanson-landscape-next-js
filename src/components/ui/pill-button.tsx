import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "@/components/ui/icon";

type PillButtonVariant =
    "secondary" | "primary" | "primary-dark" | "outline-primary" | "outline-primary-dark" | "outline-secondary";
type PillButtonSize = "sm" | "md" | "lg";

const variantSurfaceClasses: Record<PillButtonVariant, string> = {
    secondary: "bg-forrest hover:bg-forrest-light",
    primary: "bg-primary hover:bg-primary-light",
    "primary-dark": "bg-primary-dark hover:bg-primary",
    "outline-primary": "border-2 bg-transparent border-primary hover:border-primary-light",
    "outline-primary-dark": "border-2 bg-transparent border-primary-dark hover:border-primary",
    "outline-secondary": "border-2 bg-transparent border-forrest hover:border-forrest-light",
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
    variant = "secondary",
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
            className={`group inline-flex items-center justify-center gap-2.5 rounded-full text-center whitespace-nowrap transition-all duration-300 ease-in-out hover:gap-2.5 ${variantSurfaceClasses[variant]} ${sizeClasses[size]} ${textClassName} ${className}`}
            {...props}
        >
            <span>{children}</span>
            {icon ? <Icon icon={icon} className="shrink-0" width={iconSize} height={iconSize} /> : null}
        </Link>
    );
}
