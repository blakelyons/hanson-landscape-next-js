import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage from "./page";

vi.mock("next/navigation", () => ({
    usePathname: () => "/about",
}));

describe("AboutPage", () => {
    it("renders header, hero, story, why-choose-us, cta, and footer sections", () => {
        render(<AboutPage />);

        expect(screen.getByRole("link", { name: "About" })).toHaveClass("bg-[#f89c1c]");
        expect(screen.getByText("Family-Owned. Passion-Driven.")).toBeInTheDocument();
        expect(
            screen.getByText("How a small crew became Chicagoland's trusted name in outdoor living."),
        ).toBeInTheDocument();
        expect(screen.getByText("Why Choose us")).toBeInTheDocument();
        expect(screen.getByText("Ready to Transform Your Space?")).toBeInTheDocument();
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });
});
