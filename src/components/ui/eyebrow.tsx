import type { ComponentProps } from "react";

type EyebrowProps = {
    text: string;
    className?: string;
    color?: string;
} & ComponentProps<"p">;

export function Eyebrow({ text, className = "", color = "text-forrest", ...props }: EyebrowProps) {
    return (
        <p className={`eyebrow ${color} ${className}`} {...props}>
            {text}
        </p>
    );
}
