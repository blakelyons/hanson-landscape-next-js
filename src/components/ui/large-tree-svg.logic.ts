export type Point = { x: number; y: number };

type BoundingBox = { minX: number; minY: number; maxX: number; maxY: number };

const CURVE_SAMPLES = 16;
const NUMBER_PATTERN = /-?\d*\.?\d+/g;
const COMMAND_PATTERN = /([MLHVCQZmlhvcqz])([^MLHVCQZmlhvcqz]*)/g;

function parseArgs(raw: string): number[] {
    return (raw.match(NUMBER_PATTERN) ?? []).map(Number);
}

function sampleCubicBezier(p0: Point, p1: Point, p2: Point, p3: Point): Point[] {
    const points: Point[] = [];
    for (let i = 1; i <= CURVE_SAMPLES; i++) {
        const t = i / CURVE_SAMPLES;
        const mt = 1 - t;
        points.push({
            x: mt ** 3 * p0.x + 3 * mt ** 2 * t * p1.x + 3 * mt * t ** 2 * p2.x + t ** 3 * p3.x,
            y: mt ** 3 * p0.y + 3 * mt ** 2 * t * p1.y + 3 * mt * t ** 2 * p2.y + t ** 3 * p3.y,
        });
    }
    return points;
}

function sampleQuadraticBezier(p0: Point, p1: Point, p2: Point): Point[] {
    const points: Point[] = [];
    for (let i = 1; i <= CURVE_SAMPLES; i++) {
        const t = i / CURVE_SAMPLES;
        const mt = 1 - t;
        points.push({
            x: mt ** 2 * p0.x + 2 * mt * t * p1.x + t ** 2 * p2.x,
            y: mt ** 2 * p0.y + 2 * mt * t * p1.y + t ** 2 * p2.y,
        });
    }
    return points;
}

/** Samples an SVG path's `d` string into a flat point list (curves flattened), for bbox/distance math — not a renderer. */
export function samplePathPoints(d: string): Point[] {
    const points: Point[] = [];
    let current: Point = { x: 0, y: 0 };
    let subpathStart: Point = { x: 0, y: 0 };

    let match: RegExpExecArray | null;
    COMMAND_PATTERN.lastIndex = 0;
    while ((match = COMMAND_PATTERN.exec(d)) !== null) {
        const code = match[1];
        const isRelative = code === code.toLowerCase();
        const args = parseArgs(match[2]);
        const resolve = (x: number, y: number): Point =>
            isRelative ? { x: current.x + x, y: current.y + y } : { x, y };

        switch (code.toUpperCase()) {
            case "M": {
                for (let i = 0; i < args.length; i += 2) {
                    const p = resolve(args[i], args[i + 1]);
                    if (i === 0) subpathStart = p;
                    current = p;
                    points.push(p);
                }
                break;
            }
            case "L": {
                for (let i = 0; i < args.length; i += 2) {
                    current = resolve(args[i], args[i + 1]);
                    points.push(current);
                }
                break;
            }
            case "H": {
                for (const x of args) {
                    current = isRelative ? { x: current.x + x, y: current.y } : { x, y: current.y };
                    points.push(current);
                }
                break;
            }
            case "V": {
                for (const y of args) {
                    current = isRelative ? { x: current.x, y: current.y + y } : { x: current.x, y };
                    points.push(current);
                }
                break;
            }
            case "C": {
                for (let i = 0; i < args.length; i += 6) {
                    const p1 = resolve(args[i], args[i + 1]);
                    const p2 = resolve(args[i + 2], args[i + 3]);
                    const p3 = resolve(args[i + 4], args[i + 5]);
                    points.push(...sampleCubicBezier(current, p1, p2, p3));
                    current = p3;
                }
                break;
            }
            case "Q": {
                for (let i = 0; i < args.length; i += 4) {
                    const p1 = resolve(args[i], args[i + 1]);
                    const p2 = resolve(args[i + 2], args[i + 3]);
                    points.push(...sampleQuadraticBezier(current, p1, p2));
                    current = p2;
                }
                break;
            }
            case "Z": {
                current = subpathStart;
                points.push(current);
                break;
            }
            default:
                break;
        }
    }

    return points;
}

function boundingBox(points: Point[]): BoundingBox {
    if (points.length === 0) {
        throw new Error("Cannot compute a bounding box for an empty point list");
    }
    let minX = points[0].x;
    let minY = points[0].y;
    let maxX = points[0].x;
    let maxY = points[0].y;
    for (const p of points) {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
    }
    return { minX, minY, maxX, maxY };
}

function closestPointOnBox(p: Point, box: BoundingBox): Point {
    return {
        x: Math.min(Math.max(p.x, box.minX), box.maxX),
        y: Math.min(Math.max(p.y, box.minY), box.maxY),
    };
}

function distance(a: Point, b: Point): number {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

/** The bbox point on the leaf nearest the trunk path — the leaf's attachment ("base") point. */
export function computeLeafBasePoint(leafPathD: string, trunkPathD: string): Point {
    const leafBox = boundingBox(samplePathPoints(leafPathD));
    const trunkPoints = samplePathPoints(trunkPathD);

    let best: Point | null = null;
    let bestDistance = Infinity;
    for (const trunkPoint of trunkPoints) {
        const candidate = closestPointOnBox(trunkPoint, leafBox);
        const d = distance(candidate, trunkPoint);
        if (d < bestDistance) {
            bestDistance = d;
            best = candidate;
        }
    }

    if (!best) {
        throw new Error("Trunk path produced no points to measure against");
    }
    return best;
}

export type WindMode = "scrub" | "impulse" | "hybrid";
export type EffectiveWindMode = WindMode | "none";

export function resolveWindMode(input: {
    configuredMode: WindMode;
    prefersReducedMotion: boolean;
    isMobileViewport: boolean;
}): EffectiveWindMode {
    if (input.prefersReducedMotion) return "none";
    if (input.isMobileViewport) return "scrub";
    return input.configuredMode;
}
