"use client";

import { useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(MorphSVGPlugin);

export type MenuItem = {
    label: string;
    children?: MenuItem[];
};

export const SERVICES_MENU: MenuItem[] = [
    {
        label: "Residential Services",
        children: [{ label: "Item 1" }, { label: "Item 2" }],
    },
    {
        label: "Commercial Services",
        children: [{ label: "Item 1" }, { label: "Item 2" }],
    },
];

// chevron-right (lucide, 24x24 viewBox)
const CHEVRON_D = "m9 18l6-6l-6-6";
// maple-leaf, scaled from its native 15x15 viewBox into 24x24 so it shares
// coordinate space with the chevron — MorphSVGPlugin morphs raw path
// coordinates, so mismatched viewBoxes would distort the tween.
const MAPLE_LEAF_D =
    "m2.32 24l4.96 -6.43l3.78 6.34L12.8 20.8l7.44 1.6l-0.61 -1.7c-0.1 -0.24 0.02 -0.5 0.24 -0.61L24 18L20.42 15.68c-0.19 -0.13 -0.27 -0.38 -0.19 -0.61l0.78 -1.9L16.8 12.8L24 7.71l-3.42 -0.85l2.56 -6l-6 2.56L16.29 0L11.2 7.2l-0.35 -4.21l-1.92 0.77c-0.22 0.08 -0.46 0 -0.61 -0.19L6 0L3.9 4.11c-0.13 0.22 -0.38 0.34 -0.62 0.24L1.58 3.74L3.2 11.2L0 12.88l6.43 3.84l-6.3 5.09q0.1 0.82 0.67 1.39c0.38 0.38 0.9 0.66 1.52 0.8";

export function ChevronToLeafIcon({
    open,
    className,
    leafColor = "currentColor",
}: {
    open: boolean;
    className?: string;
    leafColor?: string;
}) {
    const pathRef = useRef<SVGPathElement>(null);

    useGSAP(() => {
        gsap.to(pathRef.current, {
            morphSVG: open ? MAPLE_LEAF_D : CHEVRON_D,
            fillOpacity: open ? 1 : 0,
            strokeOpacity: open ? 0 : 1,
            strokeWidth: open ? 0 : 2,
            duration: 0.4,
            ease: "power2.inOut",
        });
    }, [open]);

    return (
        <span className={className}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                    ref={pathRef}
                    fill={leafColor}
                    fillOpacity={0}
                    stroke="currentColor"
                    strokeOpacity={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={CHEVRON_D}
                />
            </svg>
        </span>
    );
}
