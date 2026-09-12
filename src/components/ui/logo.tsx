import { TransitionLink } from "@/components/transitions/transition-link";
import type { SiteHeaderVariant } from "@/components/layout/site-header";

type LogoProps = {
    isScrolled?: boolean;
    effectiveVariant?: SiteHeaderVariant;
    className?: string;
    size?: "sm" | "md" | "lg";
    id?: string;
};

export function Logo({
    isScrolled = false,
    effectiveVariant = "solid",
    className = "",
    size = "lg",
    id = "logo",
}: LogoProps) {
    return (
        <TransitionLink
            href="/"
            id={id}
            className={`logo block shrink-0 transition-[height,width,margin-top] duration-300 ${
                isScrolled
                    ? "h-25 w-31.5"
                    : size === "sm"
                      ? "h-20 w-26.25"
                      : size === "md"
                        ? "h-20 w-26.25 xl:h-30 xl:w-37.5"
                        : "h-28 w-35 xl:h-36.25 xl:w-45.75"
            } ${effectiveVariant === "transparent" ? "mt-1.75" : ""} ${className}`}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Hanson Landscape" className="size-full object-cover" src="/images/home/logo.png" />
        </TransitionLink>
    );
}
