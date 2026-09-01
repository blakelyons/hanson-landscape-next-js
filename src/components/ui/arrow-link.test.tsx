import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { ArrowLink } from "./arrow-link";

vi.mock("@/components/ui/icon", () => ({
    Icon: ({ icon }: { icon: string }) => <span data-testid="icon" data-icon={icon} />,
}));

describe("ArrowLink", () => {
    it("renders an Icon with the given icon instead of an img", () => {
        const { container, getByTestId } = render(
            <ArrowLink href="#" icon="mingcute:arrow-right">
                Learn More
            </ArrowLink>,
        );

        expect(container.querySelector("img")).not.toBeInTheDocument();
        const icon = getByTestId("icon");
        expect(icon).toHaveAttribute("data-icon", "mingcute:arrow-right");
    });
});
