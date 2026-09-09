import Link from "next/link";
import type { SiteHeaderVariant } from "@/components/layout/site-header";

type LogoProps = {
    isScrolled?: boolean;
    effectiveVariant?: SiteHeaderVariant;
    className?: string;
    size?: "sm" | "md" | "lg";
};

export function Logo({ isScrolled = false, effectiveVariant = "solid", className = "", size = "lg" }: LogoProps) {
    return (
        <Link
            href="/"
            className={`block shrink-0 ${
                isScrolled
                    ? "h-25 w-31.5"
                    : size === "sm"
                      ? "h-20 w-26.25"
                      : size === "md"
                        ? "h-30 w-37.5"
                        : "h-36.25 w-45.75"
            } ${effectiveVariant === "transparent" ? "mt-1.75" : ""} ${className}`}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Hanson Landscape" className="size-full object-cover" src="/images/home/logo.png" />
        </Link>
    );
}
