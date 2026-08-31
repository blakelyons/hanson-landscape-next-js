import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { StorySection } from "./story-section";

describe("StorySection", () => {
    it("renders without crashing", () => {
        const { container } = render(<StorySection />);
        expect(container.firstChild).toBeInTheDocument();
    });
});
