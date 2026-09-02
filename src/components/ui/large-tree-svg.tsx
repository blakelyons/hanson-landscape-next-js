"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LEAF_PATHS, TRUNK_PATH } from "./tree-leaf-paths";
import { LEAF_BASE_POINTS } from "./leaf-base-points";
import { resolveWindMode, type WindMode } from "./large-tree-svg.logic";

gsap.registerPlugin(MorphSVGPlugin, Physics2DPlugin, PhysicsPropsPlugin, InertiaPlugin, ScrollTrigger);

// Tunable knobs for this experiment — swap the feel without touching the wiring below.
const WIND_MODE: WindMode = "hybrid";
const PHYSICS_LEAF_COUNT = 20;

const MOBILE_VIEWPORT_QUERY = "(max-width: 1023px)";
const DOT_RADIUS = 3;
const SWAY_CYCLES = 5;
const GUST_COOLDOWN_MS = 600;
const GUST_SAMPLE_SIZE = 4;

const basePointById = new Map(LEAF_BASE_POINTS.map((point) => [point.id, point]));

function randomBetween(min: number, max: number) {
    return min + Math.random() * (max - min);
}

function shuffled<T>(items: T[]): T[] {
    return [...items].sort(() => Math.random() - 0.5);
}

// A tiny circle expressed as a path (not a <circle>) so MorphSVGPlugin animates
// this element's own `d` in place, instead of swapping it for a new path node.
function circlePathD(cx: number, cy: number, r: number) {
    const k = 0.5522847498;
    const o = r * k;
    return [
        `M ${cx - r} ${cy}`,
        `C ${cx - r} ${cy - o} ${cx - o} ${cy - r} ${cx} ${cy - r}`,
        `C ${cx + o} ${cy - r} ${cx + r} ${cy - o} ${cx + r} ${cy}`,
        `C ${cx + r} ${cy + o} ${cx + o} ${cy + r} ${cx} ${cy + r}`,
        `C ${cx - o} ${cy + r} ${cx - r} ${cy + o} ${cx - r} ${cy}`,
        "Z",
    ].join(" ");
}

export function LargeTreeSvg() {
    const containerRef = useRef<SVGSVGElement>(null);
    const dotRefs = useRef<(SVGPathElement | null)[]>([]);
    const leafRefs = useRef<(SVGPathElement | null)[]>([]);
    const swayGroupRefs = useRef<(SVGGElement | null)[]>([]);
    const gustGroupRefs = useRef<(SVGGElement | null)[]>([]);

    const swayParams = useMemo(
        () =>
            LEAF_PATHS.map(() => ({
                amplitude: randomBetween(3, 9),
                phase: randomBetween(0, Math.PI * 2),
                frequencyScale: randomBetween(0.7, 1.3),
            })),
        [],
    );

    const physicsLeafIndexes = useMemo(() => {
        const indexes = LEAF_PATHS.map((_, i) => i);
        return shuffled(indexes).slice(0, Math.min(PHYSICS_LEAF_COUNT, indexes.length));
    }, []);

    const { contextSafe } = useGSAP({ scope: containerRef });

    useGSAP(
        () => {
            const container = containerRef.current;
            if (!container) return;

            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const isMobileViewport = window.matchMedia(MOBILE_VIEWPORT_QUERY).matches;
            const effectiveWindMode = resolveWindMode({
                configuredMode: WIND_MODE,
                prefersReducedMotion,
                isMobileViewport,
            });

            // Reduced motion: CSS alone already renders the fully-grown, static
            // end-state (see globals.css) — skip building any timeline entirely.
            if (prefersReducedMotion) return;

            const startSway = contextSafe(() => {
                if (effectiveWindMode !== "scrub" && effectiveWindMode !== "hybrid") return;

                ScrollTrigger.create({
                    trigger: container,
                    start: "top 25%",
                    end: "bottom top",
                    scrub: true,
                    onUpdate: (self) => {
                        LEAF_PATHS.forEach((leafPath, i) => {
                            const group = swayGroupRefs.current[i];
                            const base = basePointById.get(leafPath.id);
                            if (!group || !base) return;
                            const { amplitude, phase, frequencyScale } = swayParams[i];
                            const rotation =
                                amplitude *
                                Math.sin(self.progress * Math.PI * 2 * SWAY_CYCLES * frequencyScale + phase);
                            gsap.set(group, { rotation, svgOrigin: `${base.x} ${base.y}` });
                        });
                    },
                });
            });

            const fireGust = contextSafe(() => {
                const sample = shuffled(physicsLeafIndexes).slice(0, GUST_SAMPLE_SIZE);
                sample.forEach((i) => {
                    const group = gustGroupRefs.current[i];
                    const base = basePointById.get(LEAF_PATHS[i].id);
                    if (!group || !base) return;
                    gsap.to(group, {
                        svgOrigin: `${base.x} ${base.y}`,
                        inertia: { rotation: { velocity: randomBetween(-260, 260), min: -14, max: 14, end: 0 } },
                    });
                });
            });

            const startGusts = contextSafe(() => {
                if (effectiveWindMode !== "impulse" && effectiveWindMode !== "hybrid") return;

                let lastDirection = 0;
                let lastFireTime = 0;
                ScrollTrigger.create({
                    trigger: container,
                    start: "top 25%",
                    end: "bottom top",
                    onUpdate: (self) => {
                        const now = performance.now();
                        if (self.direction !== lastDirection && now - lastFireTime > GUST_COOLDOWN_MS) {
                            lastDirection = self.direction;
                            lastFireTime = now;
                            fireGust();
                        }
                    },
                });
            });

            const runGrowth = contextSafe(() => {
                const order = shuffled(LEAF_PATHS.map((_, i) => i));
                const tl = gsap.timeline({
                    onComplete: () => {
                        startSway();
                        startGusts();
                    },
                });

                order.forEach((i, position) => {
                    const dot = dotRefs.current[i];
                    const leaf = leafRefs.current[i];
                    if (!dot || !leaf) return;
                    const delay = position * randomBetween(0.012, 0.028);

                    tl.to(
                        dot,
                        { morphSVG: LEAF_PATHS[i].d, duration: randomBetween(0.4, 0.8), ease: "power1.inOut" },
                        delay,
                    )
                        .to(dot, { opacity: 0, duration: 0.1 }, ">-0.1")
                        .set(leaf, { opacity: 1 }, "<");
                });
            });

            ScrollTrigger.create({
                trigger: container,
                start: "top 25%",
                toggleActions: "play none none none",
                onEnter: runGrowth,
            });
        },
        { scope: containerRef },
    );

    return (
        <svg
            ref={containerRef}
            preserveAspectRatio="none"
            overflow="visible"
            style={{ display: "block" }}
            width="852"
            height="979"
            viewBox="0 0 852 979"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="tree 1">
                <path id={TRUNK_PATH.id} d={TRUNK_PATH.d} fill={TRUNK_PATH.fill} />
                {LEAF_PATHS.map((leaf, i) => {
                    const base = basePointById.get(leaf.id);
                    const cx = base?.x ?? 0;
                    const cy = base?.y ?? 0;
                    return (
                        <g
                            key={leaf.id}
                            ref={(el) => {
                                swayGroupRefs.current[i] = el;
                            }}
                        >
                            <g
                                ref={(el) => {
                                    gustGroupRefs.current[i] = el;
                                }}
                            >
                                <path
                                    ref={(el) => {
                                        dotRefs.current[i] = el;
                                    }}
                                    className="tree-leaf-dot"
                                    d={circlePathD(cx, cy, DOT_RADIUS)}
                                    fill={leaf.fill}
                                    style={{ opacity: 1 }}
                                />
                                <path
                                    ref={(el) => {
                                        leafRefs.current[i] = el;
                                    }}
                                    className="tree-leaf-shape"
                                    id={leaf.id}
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d={leaf.d}
                                    fill={leaf.fill}
                                    style={{ opacity: 0 }}
                                />
                            </g>
                        </g>
                    );
                })}
            </g>
        </svg>
    );
}
