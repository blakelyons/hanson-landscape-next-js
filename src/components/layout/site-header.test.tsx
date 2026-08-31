import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteHeader } from "./site-header";

const { usePathnameMock } = vi.hoisted(() => ({ usePathnameMock: vi.fn() }));

vi.mock("next/navigation", () => ({
    usePathname: usePathnameMock,
}));

describe("SiteHeader", () => {
    it("marks Home active and About inactive at / (solid variant)", () => {
        usePathnameMock.mockReturnValue("/");
        render(<SiteHeader variant="solid" />);

        expect(screen.getByRole("link", { name: "Home" })).toHaveClass("bg-primary");
        expect(screen.getByRole("link", { name: "About" })).not.toHaveClass("bg-primary");
    });

    it("marks About active and Home inactive at /about (solid variant)", () => {
        usePathnameMock.mockReturnValue("/about");
        render(<SiteHeader variant="solid" />);

        expect(screen.getByRole("link", { name: "About" })).toHaveClass("bg-primary");
        expect(screen.getByRole("link", { name: "Home" })).not.toHaveClass("bg-primary");
    });

    it("never shows active-link highlighting on the transparent (homepage) variant", () => {
        usePathnameMock.mockReturnValue("/");
        render(<SiteHeader variant="transparent" />);

        expect(screen.getByRole("link", { name: "Home" })).not.toHaveClass("bg-primary");
    });

    it("gives Home and About real hrefs, leaves other links as placeholders", () => {
        usePathnameMock.mockReturnValue("/");
        render(<SiteHeader />);

        expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
        expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
        expect(screen.getByRole("link", { name: "Portfolio" })).toHaveAttribute("href", "#");
        expect(screen.getByRole("link", { name: "Testimonials" })).toHaveAttribute("href", "#");
    });

    it("renders the solid variant with an opaque background, transparent variant without", () => {
        usePathnameMock.mockReturnValue("/");
        const { container: solidContainer } = render(<SiteHeader variant="solid" />);
        expect(solidContainer.querySelector("header")).toHaveClass("bg-white");

        const { container: transparentContainer } = render(<SiteHeader variant="transparent" />);
        expect(transparentContainer.querySelector("header")).not.toHaveClass("bg-white");
        expect(transparentContainer.querySelector("header")).toHaveClass("absolute");
    });
});
