import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { PageHero } from "./page-hero";

describe("PageHero", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <PageHero
        breadcrumb="Home  /  About Us"
        eyebrow="OUR STORY"
        heading="Family-Owned. Passion-Driven."
        description="A description of the page."
      />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
