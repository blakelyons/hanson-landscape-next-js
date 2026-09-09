import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "@/components/ui/icon";

type PillButtonVariant =
    | "secondary"
    | "primary"
    | "primary-dark"
    | "outline-primary"
    | "outline-primary-dark"
    | "outline-secondary"
    | "outline-white";
type PillButtonSize = "sm" | "md" | "lg";

const variantSurfaceClasses: Record<PillButtonVariant, string> = {
    secondary: "bg-forrest hover:bg-forrest-light border-2 border-forrest hover:border-forrest-light",
    primary: "bg-primary hover:bg-primary-light border-2 border-primary hover:border-primary-light",
    "primary-dark": "bg-primary-dark hover:bg-primary border-2 border-primary-dark hover:border-primary",
    "outline-primary": "border-2 bg-transparent border-primary hover:border-primary-light",
    "outline-white": "border-2 bg-transparent border-white hover:border-white-light hover:border-primary",
    "outline-primary-dark": "border-2 bg-transparent border-primary-dark hover:border-primary",
    "outline-secondary": "border-2 bg-transparent border-forrest hover:border-forrest-light",
};

const sizeClasses: Record<PillButtonSize, string> = {
    sm: "px-4 py-2 text-xs font-medium",
    md: "px-8 py-4 text-base font-medium",
    lg: "px-6 py-3 text-base font-medium lg:px-7 lg:py-4.25",
};

type PillButtonProps = {
    children: ReactNode;
    variant?: PillButtonVariant;
    size?: PillButtonSize;
    textClassName?: string;
    icon?: string;
    iconSize?: number;
    iconPosition?: "left" | "right";
    animateIconOnHover?: boolean;
    className?: string;
} & Omit<ComponentProps<typeof Link>, "children" | "href"> & { href?: ComponentProps<typeof Link>["href"] };

export function PillButton({
    children,
    variant = "secondary",
    size = "md",
    textClassName = "text-white",
    icon,
    iconSize = 14,
    iconPosition = "right",
    animateIconOnHover = false,
    className = "",
    href = "#",
    ...props
}: PillButtonProps) {
    return (
        <Link
            href={href}
            className={`btn btn--pill group inline-flex ${iconPosition === "left" ? "flex-row-reverse" : "flex-row"} items-center justify-center gap-2.5 rounded-full text-center whitespace-nowrap transition-all duration-300 ease-in-out hover:gap-2.5 ${variantSurfaceClasses[variant]} ${sizeClasses[size]} ${textClassName} ${className}`}
            {...props}
        >
            <span className="transition-all duration-300 ease-in-out">{children}</span>
            {icon ? (
                <Icon
                    icon={icon}
                    className={`shrink-0 transition-transform duration-300 ease-in-out ${animateIconOnHover ? "group-hover:translate-x-1" : ""}`}
                    width={iconSize}
                    height={iconSize}
                />
            ) : null}
        </Link>
    );
}
