import { describe, expect, it, vi } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import { Carousel } from "./carousel";

vi.mock("@/components/ui/icon", () => ({
    Icon: ({ icon, className }: { icon: string; className?: string }) => (
        <span data-testid="icon" data-icon={icon} className={className} />
    ),
}));

function slide(label: string) {
    return <div data-testid="slide">{label}</div>;
}

describe("Carousel", () => {
    it("renders a static row with no Swiper markup when slides.length <= slidesPerView", () => {
        const { container, getAllByTestId, queryByTestId } = render(
            <Carousel slides={[slide("a"), slide("b")]} slidesPerView={2} />,
        );

        expect(getAllByTestId("slide")).toHaveLength(2);
        expect(container.querySelector(".swiper")).not.toBeInTheDocument();
        expect(queryByTestId("icon")).not.toBeInTheDocument();
    });

    it("renders as a carousel when slides.length > slidesPerView", () => {
        const { container, getAllByTestId } = render(
            <Carousel slides={[slide("a"), slide("b"), slide("c")]} slidesPerView={2} />,
        );

        expect(getAllByTestId("slide")).toHaveLength(3);
        expect(container.querySelector(".swiper")).toBeInTheDocument();
    });

    it("shows dots and arrows by default once the carousel is active", () => {
        const { container, getAllByTestId } = render(
            <Carousel slides={[slide("a"), slide("b"), slide("c")]} slidesPerView={2} />,
        );

        expect(container.querySelector(".swiper-pagination")).toBeInTheDocument();
        expect(getAllByTestId("icon")).toHaveLength(2);
    });

    it("hides dots when showDots is false", () => {
        const { container } = render(
            <Carousel slides={[slide("a"), slide("b"), slide("c")]} slidesPerView={2} showDots={false} />,
        );

        expect(container.querySelector(".swiper-pagination")).not.toBeInTheDocument();
    });

    it("hides arrows when showArrows is false", () => {
        const { queryByTestId } = render(
            <Carousel slides={[slide("a"), slide("b"), slide("c")]} slidesPerView={2} showArrows={false} />,
        );

        expect(queryByTestId("icon")).not.toBeInTheDocument();
    });

    it("does not show dots or arrows for the static row even when both are enabled", () => {
        const { container, queryByTestId } = render(
            <Carousel slides={[slide("a"), slide("b")]} slidesPerView={2} showDots showArrows />,
        );

        expect(container.querySelector(".swiper-pagination")).not.toBeInTheDocument();
        expect(queryByTestId("icon")).not.toBeInTheDocument();
    });

    it("wraps from the last slide back to the first when loop is true", () => {
        // jsdom has no layout, so Swiper sees a 0px-wide container and treats it as locked;
        // give it real dimensions, and complete each transition manually (jsdom never
        // fires `transitionend`, and Swiper ignores clicks while one is animating).
        const sizes = vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(300);
        const offsets = vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(300);

        try {
            const { container, getByLabelText } = render(
                <Carousel slides={[slide("a"), slide("b"), slide("c")]} slidesPerView={1} loop />,
            );
            const activeSlideText = () => container.querySelector(".swiper-slide-active")?.textContent;
            const finishTransition = () =>
                act(() => {
                    container.querySelector(".swiper-wrapper")?.dispatchEvent(new Event("transitionend"));
                });
            expect(activeSlideText()).toBe("a");

            const next = getByLabelText("Next slide");
            for (const expected of ["b", "c", "a"]) {
                fireEvent.click(next);
                finishTransition();
                expect(activeSlideText()).toBe(expected);
            }
        } finally {
            sizes.mockRestore();
            offsets.mockRestore();
        }
    });
});
