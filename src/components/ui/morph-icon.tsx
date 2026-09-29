"use client";

import { useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";
import { getIcon } from "@iconify/react";
import { Icon } from "@/components/ui/icon";

gsap.registerPlugin(MorphSVGPlugin);

const SHAPE_SELECTOR = "circle, rect, ellipse, line, polygon, polyline";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type MorphIconProps = {
    icon: string;
    hoverIcon: string;
    width: number;
    height: number;
    className?: string;
    duration?: number;
    ease?: string;
};

// MorphSVG tweens one path's `d`, but Iconify icons are often several shapes
// (lucide:arrow-right is one path, lucide:house is two, some use <circle>).
// Collapse everything into a single compound path so any icon can morph into
// any other; MorphSVG pairs up the subpaths itself.
function collapseToSinglePath(svg: SVGSVGElement): SVGPathElement | null {
    MorphSVGPlugin.convertToPath(Array.from(svg.querySelectorAll<gsap.SVGPrimitive>(SHAPE_SELECTOR)));
    const paths = Array.from(svg.querySelectorAll("path"));
    const [first, ...rest] = paths;
    if (!first) return null;
    if (rest.length) {
        first.setAttribute("d", paths.map((path) => path.getAttribute("d") ?? "").join(" "));
        rest.forEach((path) => path.remove());
    }
    return first;
}

// The hover icon is never rendered on its own, so build its combined `d` from
// the registered icon data in a throwaway (but attached, since convertToPath
// needs layout) SVG.
function hoverPathData(hoverIcon: string): string | null {
    const data = getIcon(hoverIcon);
    if (!data) return null;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("aria-hidden", "true");
    svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;visibility:hidden";
    svg.innerHTML = data.body;
    document.body.appendChild(svg);
    const d = collapseToSinglePath(svg)?.getAttribute("d") ?? null;
    svg.remove();
    return d;
}

/**
 * Icon that morphs into `hoverIcon` while its closest link/button is hovered
 * or focused, and back on leave. Both icons should share a viewBox (every
 * lucide icon is 24×24) and a fill/stroke style, since only the path data
 * morphs — the base icon's stroke/fill attributes stay put.
 */
export function MorphIcon({
    icon,
    hoverIcon,
    width,
    height,
    className,
    duration = 0.4,
    ease = "power2.inOut",
}: MorphIconProps) {
    const wrapperRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const wrapper = wrapperRef.current;
            const svg = wrapper?.querySelector("svg");
            const trigger = wrapper?.closest("a, button");
            if (!wrapper || !svg || !trigger) return;

            const path = collapseToSinglePath(svg);
            const targetD = hoverPathData(hoverIcon);
            if (!path || !targetD) return;

            const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
            const tween = gsap.to(path, {
                morphSVG: targetD,
                duration: reducedMotion ? 0 : duration,
                ease,
                paused: true,
            });

            const play = () => tween.play();
            const reverse = () => tween.reverse();
            trigger.addEventListener("mouseenter", play);
            trigger.addEventListener("mouseleave", reverse);
            trigger.addEventListener("focusin", play);
            trigger.addEventListener("focusout", reverse);

            return () => {
                trigger.removeEventListener("mouseenter", play);
                trigger.removeEventListener("mouseleave", reverse);
                trigger.removeEventListener("focusin", play);
                trigger.removeEventListener("focusout", reverse);
            };
        },
        { scope: wrapperRef, dependencies: [icon, hoverIcon, duration, ease], revertOnUpdate: true },
    );

    return (
        <span ref={wrapperRef} className={`inline-flex ${className ?? ""}`}>
            <Icon icon={icon} width={width} height={height} />
        </span>
    );
}
