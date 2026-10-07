import { describe, expect, it } from "vitest";
import {
    clientToViewBox,
    computeLeafBasePoint,
    MOUSE_WIND_DEAD_ZONE_SPEED,
    MOUSE_WIND_FULL_SPEED,
    MOUSE_WIND_MAX_ROTATION,
    MOUSE_WIND_RADIUS,
    mouseWindRotation,
    resolveWindMode,
    windDistanceFalloff,
    windSpeedStrength,
} from "./large-tree-svg.logic";

describe("computeLeafBasePoint", () => {
    const square = "M0,0 L10,0 L10,10 L0,10 Z";

    it("returns the point on the left edge nearest a trunk path to the left", () => {
        const trunk = "M-50,5 L-40,5";

        expect(computeLeafBasePoint(square, trunk)).toEqual({ x: 0, y: 5 });
    });

    it("returns the top-right corner when the trunk sits beyond that corner", () => {
        const trunk = "M20,20 L20,30";

        expect(computeLeafBasePoint(square, trunk)).toEqual({ x: 10, y: 10 });
    });

    it("returns the point on the bottom edge nearest a trunk path below", () => {
        const trunk = "M5,50 L5,60";

        expect(computeLeafBasePoint(square, trunk)).toEqual({ x: 5, y: 10 });
    });

    it("picks the nearer of two disjoint trunk segments", () => {
        const trunk = "M-40,5 L-30,5 M100,100 L110,110";

        expect(computeLeafBasePoint(square, trunk)).toEqual({ x: 0, y: 5 });
    });

    it("handles curved leaf paths without throwing and stays within the sampled bounds", () => {
        const curvedLeaf = "M0,0 C0,50 100,50 100,0 L100,80 L0,80 Z";
        const trunk = "M-50,40 L-40,40";

        const basePoint = computeLeafBasePoint(curvedLeaf, trunk);

        expect(basePoint.x).toBeGreaterThanOrEqual(0);
        expect(basePoint.y).toBeGreaterThanOrEqual(0);
    });
});

describe("resolveWindMode", () => {
    const modes = ["scrub", "impulse", "hybrid"] as const;

    it("returns 'none' when prefers-reduced-motion is set, regardless of viewport or configured mode", () => {
        for (const configuredMode of modes) {
            for (const isMobileViewport of [true, false]) {
                expect(resolveWindMode({ configuredMode, prefersReducedMotion: true, isMobileViewport })).toBe("none");
            }
        }
    });

    it("forces 'scrub' on mobile viewports when reduced-motion is not set, regardless of configured mode", () => {
        for (const configuredMode of modes) {
            expect(resolveWindMode({ configuredMode, prefersReducedMotion: false, isMobileViewport: true })).toBe(
                "scrub",
            );
        }
    });

    it("passes the configured mode through unchanged on non-mobile viewports with no reduced-motion", () => {
        for (const configuredMode of modes) {
            expect(resolveWindMode({ configuredMode, prefersReducedMotion: false, isMobileViewport: false })).toBe(
                configuredMode,
            );
        }
    });
});

describe("clientToViewBox", () => {
    const viewBox = { width: 852, height: 979 };

    it("maps the rect's corners to the viewBox corners when aspect ratios match", () => {
        const rect = { left: 100, top: 50, width: 426, height: 489.5 };

        expect(clientToViewBox({ x: 100, y: 50 }, rect, viewBox)).toEqual({ x: 0, y: 0 });
        expect(clientToViewBox({ x: 526, y: 539.5 }, rect, viewBox)).toEqual({ x: 852, y: 979 });
    });

    it("accounts for xMidYMid meet letterboxing when the rect is wider than the viewBox ratio", () => {
        const rect = { left: 0, top: 0, width: 1000, height: 979 };

        expect(clientToViewBox({ x: 500, y: 0 }, rect, viewBox)).toEqual({ x: 426, y: 0 });
    });
});

describe("windDistanceFalloff", () => {
    it("is 1 at the leaf and 0 at or beyond the radius", () => {
        expect(windDistanceFalloff(0, MOUSE_WIND_RADIUS)).toBe(1);
        expect(windDistanceFalloff(MOUSE_WIND_RADIUS, MOUSE_WIND_RADIUS)).toBe(0);
        expect(windDistanceFalloff(MOUSE_WIND_RADIUS + 50, MOUSE_WIND_RADIUS)).toBe(0);
    });

    it("decreases monotonically with distance", () => {
        const near = windDistanceFalloff(20, MOUSE_WIND_RADIUS);
        const far = windDistanceFalloff(60, MOUSE_WIND_RADIUS);

        expect(near).toBeGreaterThan(far);
        expect(far).toBeGreaterThan(0);
    });
});

describe("windSpeedStrength", () => {
    it("is 0 at or below the dead-zone speed", () => {
        expect(windSpeedStrength(0)).toBe(0);
        expect(windSpeedStrength(MOUSE_WIND_DEAD_ZONE_SPEED)).toBe(0);
    });

    it("reaches 1 at full speed and never exceeds it", () => {
        expect(windSpeedStrength(MOUSE_WIND_FULL_SPEED)).toBe(1);
        expect(windSpeedStrength(MOUSE_WIND_FULL_SPEED * 10)).toBe(1);
    });

    it("is eased: a speed halfway through the range already gives more than half strength", () => {
        const mid = (MOUSE_WIND_DEAD_ZONE_SPEED + MOUSE_WIND_FULL_SPEED) / 2;

        expect(windSpeedStrength(mid)).toBeGreaterThan(0.5);
        expect(windSpeedStrength(mid)).toBeLessThan(1);
    });
});

describe("mouseWindRotation", () => {
    const base = { x: 400, y: 400 };

    it("is 0 for a leaf outside the radius", () => {
        const cursor = { x: base.x - MOUSE_WIND_RADIUS - 1, y: base.y };

        expect(mouseWindRotation({ base, cursor, speed: MOUSE_WIND_FULL_SPEED })).toBe(0);
    });

    it("is 0 when the cursor is below the dead-zone speed", () => {
        const cursor = { x: base.x - 10, y: base.y };

        expect(mouseWindRotation({ base, cursor, speed: 0 })).toBe(0);
    });

    it("swings away from the cursor: positive when the cursor is left of the base, negative when right", () => {
        const left = mouseWindRotation({ base, cursor: { x: base.x - 10, y: base.y }, speed: MOUSE_WIND_FULL_SPEED });
        const right = mouseWindRotation({ base, cursor: { x: base.x + 10, y: base.y }, speed: MOUSE_WIND_FULL_SPEED });

        expect(left).toBeGreaterThan(0);
        expect(right).toBeLessThan(0);
        expect(left).toBe(-right);
    });

    it("never exceeds the max rotation", () => {
        const rotation = mouseWindRotation({
            base,
            cursor: { x: base.x - 1, y: base.y },
            speed: MOUSE_WIND_FULL_SPEED * 10,
        });

        expect(Math.abs(rotation)).toBeLessThanOrEqual(MOUSE_WIND_MAX_ROTATION);
    });

    it("moves a nearer leaf more than a farther one at the same speed", () => {
        const near = mouseWindRotation({ base, cursor: { x: base.x - 10, y: base.y }, speed: MOUSE_WIND_FULL_SPEED });
        const far = mouseWindRotation({ base, cursor: { x: base.x - 60, y: base.y }, speed: MOUSE_WIND_FULL_SPEED });

        expect(near).toBeGreaterThan(far);
    });

    it("is 0 (not NaN or -0 noise) when the cursor is exactly above or below the base", () => {
        expect(mouseWindRotation({ base, cursor: { x: base.x, y: base.y - 10 }, speed: MOUSE_WIND_FULL_SPEED })).toBe(
            0,
        );
    });
});
