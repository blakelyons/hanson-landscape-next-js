import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { useUIStore } from "@/store/ui-store";
import { MobileNav } from "./mobile-nav";

function stubMatchMedia() {
    vi.stubGlobal(
        "matchMedia",
        vi.fn().mockImplementation((query: string) => ({
            matches: false,
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        })),
    );
}

describe("MobileNav", () => {
    beforeEach(() => {
        useUIStore.setState({ isMobileNavOpen: false, activeModal: null });
        stubMatchMedia();
    });

    it("toggles aria-expanded and the store's open state when the button is clicked", () => {
        render(<MobileNav />);
        const button = screen.getByRole("button", { name: /open menu/i });

        expect(button).toHaveAttribute("aria-expanded", "false");

        fireEvent.click(button);
        expect(button).toHaveAttribute("aria-expanded", "true");
        expect(useUIStore.getState().isMobileNavOpen).toBe(true);

        fireEvent.click(button);
        expect(button).toHaveAttribute("aria-expanded", "false");
        expect(useUIStore.getState().isMobileNavOpen).toBe(false);
    });

    it("closes when the backdrop is clicked", () => {
        render(<MobileNav />);
        fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
        expect(useUIStore.getState().isMobileNavOpen).toBe(true);

        fireEvent.click(screen.getByTestId("mobile-nav-backdrop"));
        expect(useUIStore.getState().isMobileNavOpen).toBe(false);
    });

    it("closes when Escape is pressed", () => {
        render(<MobileNav />);
        fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
        expect(useUIStore.getState().isMobileNavOpen).toBe(true);

        fireEvent.keyDown(window, { key: "Escape" });
        expect(useUIStore.getState().isMobileNavOpen).toBe(false);
    });

    it("closes when a nav link is clicked", () => {
        render(<MobileNav />);
        fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
        expect(useUIStore.getState().isMobileNavOpen).toBe(true);

        fireEvent.click(screen.getByRole("link", { name: "Home" }));
        expect(useUIStore.getState().isMobileNavOpen).toBe(false);
    });

    it("renders all expected top-level destinations", () => {
        render(<MobileNav />);
        const drawer = screen.getByRole("dialog");

        for (const label of ["Home", "About", "Portfolio", "Testimonials", "Contact Us"]) {
            expect(within(drawer).getByRole("link", { name: label })).toBeInTheDocument();
        }
        expect(within(drawer).getByRole("button", { name: "Our Services" })).toBeInTheDocument();
    });

    it("expands and collapses the Our Services accordion, revealing its children", () => {
        render(<MobileNav />);
        const drawer = screen.getByRole("dialog");
        const servicesButton = within(drawer).getByRole("button", { name: "Our Services" });

        expect(servicesButton).toHaveAttribute("aria-expanded", "false");
        expect(within(drawer).queryByRole("button", { name: "Residential Services" })).not.toBeInTheDocument();

        fireEvent.click(servicesButton);
        expect(servicesButton).toHaveAttribute("aria-expanded", "true");
        expect(within(drawer).getByRole("button", { name: "Residential Services" })).toBeInTheDocument();
        expect(within(drawer).getByRole("button", { name: "Commercial Services" })).toBeInTheDocument();

        fireEvent.click(servicesButton);
        expect(servicesButton).toHaveAttribute("aria-expanded", "false");
        expect(within(drawer).queryByRole("button", { name: "Residential Services" })).not.toBeInTheDocument();
    });

    it("expands and collapses a second-level section, revealing its leaf items", () => {
        render(<MobileNav />);
        const drawer = screen.getByRole("dialog");

        fireEvent.click(within(drawer).getByRole("button", { name: "Our Services" }));
        const residentialButton = within(drawer).getByRole("button", { name: "Residential Services" });

        expect(residentialButton).toHaveAttribute("aria-expanded", "false");
        expect(within(drawer).queryByRole("link", { name: "Item 1" })).not.toBeInTheDocument();

        fireEvent.click(residentialButton);
        expect(residentialButton).toHaveAttribute("aria-expanded", "true");
        expect(within(drawer).getAllByRole("link", { name: "Item 1" })).toHaveLength(1);
        expect(within(drawer).getAllByRole("link", { name: "Item 2" })).toHaveLength(1);

        fireEvent.click(residentialButton);
        expect(residentialButton).toHaveAttribute("aria-expanded", "false");
        expect(within(drawer).queryByRole("link", { name: "Item 1" })).not.toBeInTheDocument();
    });

    it("closes the whole drawer when a leaf-level service item is clicked", () => {
        render(<MobileNav />);
        const drawer = screen.getByRole("dialog");

        fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
        fireEvent.click(within(drawer).getByRole("button", { name: "Our Services" }));
        fireEvent.click(within(drawer).getByRole("button", { name: "Residential Services" }));
        expect(useUIStore.getState().isMobileNavOpen).toBe(true);

        fireEvent.click(within(drawer).getAllByRole("link", { name: "Item 1" })[0]);
        expect(useUIStore.getState().isMobileNavOpen).toBe(false);
    });
});
