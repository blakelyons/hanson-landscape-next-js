import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { AboutSection } from "./about-section";

vi.mock("@/components/ui/carousel", () => ({
    Carousel: ({ slides }: { slides: unknown[] }) => <div data-testid="carousel" data-slide-count={slides.length} />,
}));

describe("AboutSection", () => {
    it("passes all 5 photos to the Carousel", () => {
        const { getByTestId } = render(<AboutSection />);
        expect(getByTestId("carousel")).toHaveAttribute("data-slide-count", "5");
    });
});
