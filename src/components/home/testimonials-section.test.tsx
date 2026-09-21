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
        expect(getAllByText(TESTIMONIALS[0].name).length).toBeGreaterThanOrEqual(TESTIMONIALS.length);
    });

    it("locks the carousel width so slidesPerView=3 divides back to each card's 336px width", () => {
        const { container } = render(<TestimonialsSection />);

        expect(container.querySelector(".w-282")).toBeInTheDocument();
    });
});
