import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PortfolioGrid } from "./portfolio-grid";
import { PROJECTS } from "@/content/projects";

let search = "";
vi.mock("next/navigation", () => ({
    useSearchParams: () => new URLSearchParams(search),
}));
vi.mock("@/components/transitions/transition-link", () => ({
    TransitionLink: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
        <a href={href} {...props}>
            {children}
        </a>
    ),
}));
vi.mock("next/image", () => ({
    // eslint-disable-next-line @next/next/no-img-element
    default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

const cards = () => screen.getAllByRole("link", { name: /^View / });

describe("PortfolioGrid", () => {
    it("shows 6 projects first and reveals the rest with Load More", () => {
        search = "";
        render(<PortfolioGrid projects={PROJECTS} />);

        expect(cards()).toHaveLength(6);
        expect(screen.getByText(`Showing 6 of ${PROJECTS.length}`)).toBeInTheDocument();

        fireEvent.click(screen.getByRole("link", { name: "Load More" }));
        expect(cards()).toHaveLength(12);
        expect(screen.queryByRole("link", { name: "Load More" })).not.toBeInTheDocument();
    });

    it("filters by sector and resets to the first page", () => {
        search = "";
        render(<PortfolioGrid projects={PROJECTS} />);

        fireEvent.click(screen.getByRole("button", { name: "Commercial" }));
        const commercial = PROJECTS.filter((project) => project.sector === "commercial");
        expect(cards()).toHaveLength(commercial.length);
        expect(window.location.search).toBe("?sector=commercial");
    });

    it("searches, and offers Clear filters when nothing matches", () => {
        search = "";
        render(<PortfolioGrid projects={PROJECTS} />);

        fireEvent.change(screen.getByLabelText("Search projects"), { target: { value: "zzzz" } });
        expect(screen.getByText("No projects match your search.")).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
        expect(cards()).toHaveLength(6);
    });

    it("starts from the filters in the URL", () => {
        search = "sector=residential&q=naperville";
        render(<PortfolioGrid projects={PROJECTS} />);

        expect(screen.getByRole("button", { name: "Residential" })).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByLabelText("Search projects")).toHaveValue("naperville");
    });
});
