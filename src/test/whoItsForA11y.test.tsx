import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import WhoItsForSection from "@/components/landing/WhoItsForSection";

describe("who it's for section accessibility", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn().mockImplementation(() => ({ observe: vi.fn(), disconnect: vi.fn(), unobserve: vi.fn() })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("is a region named by its heading with decorative icons and dashes hidden", () => {
    const { container } = render(<WhoItsForSection />);
    expect(screen.getByRole("region", { name: "Built for every role in your firm" })).toBeInTheDocument();

    container.querySelectorAll("svg").forEach((svg) => expect(svg).toHaveAttribute("aria-hidden", "true"));

    const firstBenefit = within(screen.getByRole("list", { name: "CA Partners benefits" })).getAllByRole(
      "listitem",
    )[0];
    expect(firstBenefit.querySelector('[aria-hidden="true"]')?.textContent).toBe("—");
  });

  it("lists each role as an item named by its title with its own benefits list", () => {
    render(<WhoItsForSection />);
    const region = screen.getByRole("region", { name: "Built for every role in your firm" });
    const roles = within(region).getAllByRole("list")[0];
    const items = within(roles).getAllByRole("listitem", { name: /./ });
    expect(items.map((item) => within(item).getByRole("heading").textContent)).toEqual([
      "CA Partners",
      "Managers",
      "Articles & Staff",
    ]);
    expect(screen.getByRole("listitem", { name: "Managers" })).toContainElement(
      screen.getByRole("list", { name: "Managers benefits" }),
    );
  });
});
