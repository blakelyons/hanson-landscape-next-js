import type { AnchorHTMLAttributes } from "react";

type ArrowLinkProps = {
  children: string;
  icon: string;
  iconSize?: number;
  iconWidth?: number;
  iconHeight?: number;
  textClassName?: string;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

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
    <a
      href={href}
      className={`inline-flex items-center gap-2.5 whitespace-nowrap ${className}`}
      {...props}
    >
      <span className={textClassName}>{children}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon}
        alt=""
        className="shrink-0"
        style={{ width: iconWidth ?? iconSize, height: iconHeight ?? iconSize }}
      />
    </a>
  );
}
