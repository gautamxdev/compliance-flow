import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import ProblemSection from "@/components/landing/ProblemSection";

describe("problem section", () => {
  it("lists each problem inside the region named by its heading", () => {
    render(<ProblemSection />);
    const region = screen.getByRole("region", { name: "Where compliance work quietly breaks" });
    const items = within(within(region).getByRole("list")).getAllByRole("listitem");
    expect(items).toHaveLength(4);
    expect(within(items[2]).getByRole("heading", { level: 3 })).toHaveTextContent("Lost accountability");
  });

  it("hides the decorative problem icons from screen readers", () => {
    const { container } = render(<ProblemSection />);
    const icons = container.querySelectorAll("svg");
    expect(icons).toHaveLength(4);
    icons.forEach((icon) => expect(icon.closest('[aria-hidden="true"]')).not.toBeNull());
  });
});
