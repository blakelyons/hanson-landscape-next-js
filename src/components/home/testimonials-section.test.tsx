import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { TestimonialsSection } from "./testimonials-section";

vi.mock("@/components/ui/icon", () => ({
    Icon: ({ icon }: { icon: string }) => <span data-testid="icon" data-icon={icon} />,
}));

describe("TestimonialsSection", () => {
    it("renders the static row (no Swiper markup) with 3 testimonials", () => {
        const { container, getAllByText } = render(<TestimonialsSection />);

        expect(container.querySelector(".swiper")).not.toBeInTheDocument();
        expect(getAllByText("Sarah M.")).toHaveLength(3);
    });

    it("locks the carousel width so slidesPerView=3 divides back to each card's 336px width", () => {
        const { container } = render(<TestimonialsSection />);

        expect(container.querySelector(".w-282")).toBeInTheDocument();
    });
});
