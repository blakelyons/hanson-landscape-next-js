import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { AboutCarouselSlide } from "./about-carousel-slide";

describe("AboutCarouselSlide", () => {
    it("renders the image with the given crop offsets", () => {
        const { getByAltText } = render(
            <AboutCarouselSlide src="/images/home/project-photo-3.jpg" top="0.05%" left="-4.45%" />,
        );

        const img = getByAltText("Landscaping project");
        expect(img).toHaveAttribute("src", "/images/home/project-photo-3.jpg");
        expect(img).toHaveStyle({ top: "0.05%", left: "-4.45%" });
    });

    it("defaults to no crop offset", () => {
        const { getByAltText } = render(<AboutCarouselSlide src="/images/home/project-photo-1.jpg" />);

        expect(getByAltText("Landscaping project")).toHaveStyle({ top: "0%", left: "0%" });
    });
});
