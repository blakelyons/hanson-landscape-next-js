import { describe, expect, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
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
        const { container, getByLabelText } = render(
            <Carousel slides={[slide("a"), slide("b"), slide("c")]} slidesPerView={1} loop />,
        );
        const activeSlideText = () => container.querySelector(".swiper-slide-active")?.textContent;
        expect(activeSlideText()).toBe("a");

        const next = getByLabelText("Next slide");
        fireEvent.click(next);
        expect(activeSlideText()).toBe("b");
        fireEvent.click(next);
        expect(activeSlideText()).toBe("c");
        fireEvent.click(next);
        expect(activeSlideText()).toBe("a");
    });
});
