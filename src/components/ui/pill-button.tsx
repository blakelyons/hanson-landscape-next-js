import type { AnchorHTMLAttributes, ReactNode } from "react";

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
  icon?: string;
  iconSize?: number;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

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
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full text-center ${variantSurfaceClasses[variant]} ${sizeClasses[size]} ${textClassName} ${className}`}
      {...props}
    >
      {children}
      {icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={icon} alt="" className="shrink-0" style={{ width: iconSize, height: iconSize }} />
      ) : null}
    </a>
  );
}
