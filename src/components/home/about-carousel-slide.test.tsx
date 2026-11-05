import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { AboutCarouselSlide } from "./about-carousel-slide";

vi.mock("next/image", () => ({
    // eslint-disable-next-line @next/next/no-img-element
    default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

describe("AboutCarouselSlide", () => {
    it("renders the image with the given src", () => {
        const { getByAltText } = render(<AboutCarouselSlide src="/images/home/project-photo-3.jpg" />);

        expect(getByAltText("Landscaping project")).toHaveAttribute("src", "/images/home/project-photo-3.jpg");
    });

    it("uses a custom alt when given", () => {
        const { getByAltText } = render(<AboutCarouselSlide src="/images/home/project-photo-3.jpg" alt="Patio" />);

        expect(getByAltText("Patio")).toBeInTheDocument();
    });
});
