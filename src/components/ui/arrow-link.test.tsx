import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { ArrowLink } from "./arrow-link";

vi.mock("@/components/ui/icon", () => ({
    Icon: ({ name, set }: { name: string; set?: string }) => <span data-testid="icon" data-name={name} data-set={set} />,
}));

describe("ArrowLink", () => {
    it("renders an Icon with the given iconName/iconSet instead of an img", () => {
        const { container, getByTestId } = render(
            <ArrowLink href="#" iconName="arrow-right" iconSet="mingcute">
                Learn More
            </ArrowLink>,
        );

        expect(container.querySelector("img")).not.toBeInTheDocument();
        const icon = getByTestId("icon");
        expect(icon).toHaveAttribute("data-name", "arrow-right");
        expect(icon).toHaveAttribute("data-set", "mingcute");
    });
});
