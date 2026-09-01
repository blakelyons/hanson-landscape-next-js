import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { PillButton } from "./pill-button";

vi.mock("@/components/ui/icon", () => ({
    Icon: ({ icon }: { icon: string }) => <span data-testid="icon" data-icon={icon} />,
}));

describe("PillButton", () => {
    it("renders an Icon with the given icon instead of an img", () => {
        const { container, getByTestId } = render(<PillButton icon="lucide:phone">Call Us Today</PillButton>);

        expect(container.querySelector("img")).not.toBeInTheDocument();
        const icon = getByTestId("icon");
        expect(icon).toHaveAttribute("data-icon", "lucide:phone");
    });

    it("renders no icon when icon is omitted", () => {
        const { queryByTestId } = render(<PillButton>Get a Free Quote</PillButton>);
        expect(queryByTestId("icon")).not.toBeInTheDocument();
    });
});
