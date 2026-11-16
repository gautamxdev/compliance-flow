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

    const lists = screen.getAllByRole("list");
    expect(lists).toHaveLength(3);
    const firstBenefit = within(lists[0]).getAllByRole("listitem")[0];
    expect(firstBenefit.querySelector('[aria-hidden="true"]')?.textContent).toBe("—");
  });
});
