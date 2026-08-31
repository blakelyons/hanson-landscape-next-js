import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { PillButton } from "./pill-button";

vi.mock("@/components/ui/icon", () => ({
    Icon: ({ name, set }: { name: string; set?: string }) => <span data-testid="icon" data-name={name} data-set={set} />,
}));

describe("PillButton", () => {
    it("renders an Icon with the given iconName/iconSet instead of an img", () => {
        const { container, getByTestId } = render(
            <PillButton iconName="phone" iconSet="lucide">
                Call Us Today
            </PillButton>,
        );

        expect(container.querySelector("img")).not.toBeInTheDocument();
        const icon = getByTestId("icon");
        expect(icon).toHaveAttribute("data-name", "phone");
        expect(icon).toHaveAttribute("data-set", "lucide");
    });

    it("renders no icon when iconName is omitted", () => {
        const { queryByTestId } = render(<PillButton>Get a Free Quote</PillButton>);
        expect(queryByTestId("icon")).not.toBeInTheDocument();
    });
});
