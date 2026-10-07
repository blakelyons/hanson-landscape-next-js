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
import { clientToViewBox, mouseWindRotation, resolveWindMode, type Point, type WindMode } from "./large-tree-svg.logic";

gsap.registerPlugin(MorphSVGPlugin, Physics2DPlugin, PhysicsPropsPlugin, InertiaPlugin, ScrollTrigger);

// Tunable knobs for this experiment — swap the feel without touching the wiring below.
const WIND_MODE: WindMode = "hybrid";
const SCROLL_GUST_POOL_SIZE = 20;

const VIEWBOX = { width: 852, height: 979 };
const HOVER_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const MOBILE_VIEWPORT_QUERY = "(max-width: 1023px)";
const DOT_RADIUS = 3;
const SWAY_CYCLES = 5;
const GUST_COOLDOWN_MS = 600;
const GUST_SAMPLE_SIZE = 4;
const MOUSE_WIND_KICK_DURATION = 0.15;
const MOUSE_WIND_SETTLE_DURATION = 2.4;
const MOUSE_WIND_SETTLE_EASE = "elastic.out(1, 0.3)";
const GROWTH_START = "top center";
const GROWTH_END = "top top+=20%";

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
    const mouseWindGroupRefs = useRef<(SVGGElement | null)[]>([]);

    const swayParams = useMemo(
        () =>
            LEAF_PATHS.map(() => ({
                amplitude: randomBetween(3, 9),
                phase: randomBetween(0, Math.PI * 2),
                frequencyScale: randomBetween(0.7, 1.3),
            })),
        [],
    );

    const scrollGustPool = useMemo(() => {
        const indexes = LEAF_PATHS.map((_, i) => i);
        return shuffled(indexes).slice(0, Math.min(SCROLL_GUST_POOL_SIZE, indexes.length));
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
                    start: GROWTH_START,
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
                const sample = shuffled(scrollGustPool).slice(0, GUST_SAMPLE_SIZE);
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
                    start: GROWTH_START,
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

            // Mouse Wind: starts once Growth completes, and only for hovering pointers
            // (mouse/trackpad) — touch drags would fight page scroll.
            let removeMouseWind: (() => void) | null = null;
            const startMouseWind = contextSafe(() => {
                if (removeMouseWind || !window.matchMedia(HOVER_POINTER_QUERY).matches) return;

                let last: { point: Point; time: number } | null = null;
                const onPointerMove = (event: PointerEvent) => {
                    const point = clientToViewBox(
                        { x: event.clientX, y: event.clientY },
                        container.getBoundingClientRect(),
                        VIEWBOX,
                    );
                    const previous = last;
                    last = { point, time: event.timeStamp };
                    if (!previous || event.timeStamp <= previous.time) return;

                    const speed =
                        Math.hypot(point.x - previous.point.x, point.y - previous.point.y) /
                        (event.timeStamp - previous.time);

                    LEAF_PATHS.forEach((leafPath, i) => {
                        const group = mouseWindGroupRefs.current[i];
                        const base = basePointById.get(leafPath.id);
                        if (!group || !base) return;
                        const rotation = mouseWindRotation({ base, cursor: point, speed });
                        if (rotation === 0) return;
                        // Kick toward the target, then wobble back to rest. Killing the old tweens
                        // first means a Leaf hit mid-swing re-kicks smoothly from where it is now.
                        gsap.killTweensOf(group);
                        gsap.timeline()
                            .to(group, {
                                svgOrigin: `${base.x} ${base.y}`,
                                rotation,
                                duration: MOUSE_WIND_KICK_DURATION,
                                ease: "power2.out",
                            })
                            .to(group, {
                                rotation: 0,
                                duration: MOUSE_WIND_SETTLE_DURATION,
                                ease: MOUSE_WIND_SETTLE_EASE,
                            });
                    });
                };

                window.addEventListener("pointermove", onPointerMove, { passive: true });
                removeMouseWind = () => window.removeEventListener("pointermove", onPointerMove);
            });

            const growthTimeline = gsap.timeline({ paused: true });
            const order = shuffled(LEAF_PATHS.map((_, i) => i));

            order.forEach((i, position) => {
                const dot = dotRefs.current[i];
                const leaf = leafRefs.current[i];
                if (!dot || !leaf) return;
                const delay = position * randomBetween(0.006, 0.014);

                growthTimeline
                    .to(
                        dot,
                        { morphSVG: LEAF_PATHS[i].d, duration: randomBetween(0.2, 0.4), ease: "power1.inOut" },
                        delay,
                    )
                    .to(dot, { opacity: 0, duration: 0.1 }, ">-0.1")
                    .set(leaf, { opacity: 1 }, "<");
            });

            // Growth is scrubbed the first time through; once it completes, lock it
            // (kill the trigger) so scrolling back up afterward never un-grows it.
            const growthTrigger = ScrollTrigger.create({
                trigger: container,
                start: GROWTH_START,
                end: GROWTH_END,
                scrub: true,
                animation: growthTimeline,
                onLeave: (self) => {
                    startMouseWind();
                    // allowAnimation=true: killing the trigger must not also kill (and
                    // revert) growthTimeline — it needs to stay frozen fully-grown.
                    self.kill(false, true);
                },
            });

            // Wind runs the whole time the tree is on screen, concurrently with
            // growth (not gated behind growth completing).
            startSway();
            startGusts();

            // Page loaded already scrolled past the Tree: Growth is complete without onLeave firing.
            if (growthTrigger.progress === 1) startMouseWind();

            return () => removeMouseWind?.();
        },
        { scope: containerRef },
    );

    return (
        <svg
            ref={containerRef}
            preserveAspectRatio="xMidYMid meet"
            overflow="visible"
            className="block h-auto w-[min(100vw,852px)]"
            viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
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
                                <g
                                    ref={(el) => {
                                        mouseWindGroupRefs.current[i] = el;
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
                        </g>
                    );
                })}
            </g>
        </svg>
    );
}
