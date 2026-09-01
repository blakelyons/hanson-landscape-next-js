import { describe, expect, it, vi } from "vitest";
import { render, within } from "@testing-library/react";
import { SiteHeader } from "./site-header";

const { usePathnameMock } = vi.hoisted(() => ({ usePathnameMock: vi.fn() }));

vi.mock("next/navigation", () => ({
    usePathname: usePathnameMock,
}));

describe("SiteHeader", () => {
    it("marks Home active and About inactive at / (solid variant)", () => {
        usePathnameMock.mockReturnValue("/");
        const { container } = render(<SiteHeader variant="solid" />);
        const nav = within(container.querySelector("nav")!);

        expect(nav.getByRole("link", { name: "Home" })).toHaveClass("bg-[#f89c1c]");
        expect(nav.getByRole("link", { name: "About" })).not.toHaveClass("bg-[#f89c1c]");
    });

    it("marks About active and Home inactive at /about (solid variant)", () => {
        usePathnameMock.mockReturnValue("/about");
        const { container } = render(<SiteHeader variant="solid" />);
        const nav = within(container.querySelector("nav")!);

        expect(nav.getByRole("link", { name: "About" })).toHaveClass("bg-[#f89c1c]");
        expect(nav.getByRole("link", { name: "Home" })).not.toHaveClass("bg-[#f89c1c]");
    });

    it("never shows active-link highlighting on the transparent (homepage) variant", () => {
        usePathnameMock.mockReturnValue("/");
        const { container } = render(<SiteHeader variant="transparent" />);
        const nav = within(container.querySelector("nav")!);

        expect(nav.getByRole("link", { name: "Home" })).not.toHaveClass("bg-[#f89c1c]");
    });

    it("gives Home and About real hrefs, leaves other links as placeholders", () => {
        usePathnameMock.mockReturnValue("/");
        const { container } = render(<SiteHeader />);
        const nav = within(container.querySelector("nav")!);

        expect(nav.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
        expect(nav.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
        expect(nav.getByRole("link", { name: "Portfolio" })).toHaveAttribute("href", "#");
        expect(nav.getByRole("link", { name: "Testimonials" })).toHaveAttribute("href", "#");
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
