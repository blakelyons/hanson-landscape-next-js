import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { TESTIMONIALS, TestimonialsSection } from "./testimonials-section";

vi.mock("@/components/ui/icon", () => ({
    Icon: ({ icon }: { icon: string }) => <span data-testid="icon" data-icon={icon} />,
}));

describe("TestimonialsSection", () => {
    // Static row only kicks in at <=3 testimonials (no upper bound on the
    // carousel branch), so assert against the branch rule, not a hardcoded count.
    it("renders Swiper carousel markup when there are more than 3 testimonials", () => {
        expect(TESTIMONIALS.length).toBeGreaterThan(3);

        const { container, getAllByText } = render(<TestimonialsSection />);

        expect(container.querySelector(".swiper")).toBeInTheDocument();
        for (const { name } of TESTIMONIALS.slice(0, 3)) {
            expect(getAllByText(name).length).toBeGreaterThanOrEqual(1);
        }
    });

    it("renders the section heading and a card (with stars) per visible testimonial", () => {
        const { getByText, container } = render(<TestimonialsSection />);

        expect(getByText("What Our Clients Say")).toBeInTheDocument();
        expect(container.querySelectorAll(".testimonial-card").length).toBeGreaterThanOrEqual(3);
        expect(container.querySelectorAll(".testimonial-card__stars .star").length).toBeGreaterThanOrEqual(15);
    });
});
