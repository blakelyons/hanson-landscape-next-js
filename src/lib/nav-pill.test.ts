import { describe, expect, it } from "vitest";
import { getPillTargetRect } from "./nav-pill";

describe("getPillTargetRect", () => {
    it("returns the target's size unchanged", () => {
        const containerRect = { left: 0, top: 0, width: 800, height: 100 };
        const targetRect = { left: 120, top: 30, width: 64, height: 40 };

        expect(getPillTargetRect(containerRect, targetRect)).toEqual({ x: 120, y: 30, width: 64, height: 40 });
    });

    it("positions relative to the container's origin, not the viewport", () => {
        const containerRect = { left: 250, top: 60, width: 800, height: 100 };
        const targetRect = { left: 400, top: 80, width: 64, height: 40 };

        expect(getPillTargetRect(containerRect, targetRect)).toEqual({ x: 150, y: 20, width: 64, height: 40 });
    });

    it("handles the target sitting flush with the container's origin", () => {
        const containerRect = { left: 100, top: 20, width: 800, height: 100 };
        const targetRect = { left: 100, top: 20, width: 90, height: 42 };

        expect(getPillTargetRect(containerRect, targetRect)).toEqual({ x: 0, y: 0, width: 90, height: 42 });
    });
});
