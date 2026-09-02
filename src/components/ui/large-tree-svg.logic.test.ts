import { describe, expect, it } from "vitest";
import { computeLeafBasePoint, resolveWindMode } from "./large-tree-svg.logic";

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
