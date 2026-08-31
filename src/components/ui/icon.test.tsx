import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Icon } from "./icon";

// @iconify/react's runtime-API Icon renders a placeholder <span> synchronously
// and swaps in the resolved <svg> once fetched from Iconify's API — testing
// for the resolved SVG here would make this test depend on network access.
// This just checks the component mounts without throwing.
describe("Icon", () => {
    it("renders without crashing", () => {
        const { container } = render(<Icon name="leaf" />);
        expect(container.firstChild).toBeInTheDocument();
    });
});
