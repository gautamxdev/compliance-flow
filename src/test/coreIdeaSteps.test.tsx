import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import CoreIdeaSection from "@/components/landing/CoreIdeaSection";

describe("core idea hierarchy", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn().mockImplementation(() => ({ observe: vi.fn(), disconnect: vi.fn(), unobserve: vi.fn() })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("is labelled by its heading and lists the five steps in order", () => {
    const { container } = render(<CoreIdeaSection />);
    expect(screen.getByRole("region", { name: "Everything starts with the client" })).toBeInTheDocument();

    const list = screen.getByRole("list", { name: /How work is organised/ });
    expect(list.tagName).toBe("OL");
    const items = within(list).getAllByRole("listitem");
    expect(items.map((li) => li.textContent)).toEqual([
      "YourCA Firm",
      "SelectClient",
      "ChooseFinancial Year",
      "TrackCompliance Tasks",
      "AttachDocuments",
    ]);

    const arrows = container.querySelectorAll("svg");
    expect(arrows.length).toBeGreaterThan(0);
    arrows.forEach((svg) => expect(svg).toHaveAttribute("aria-hidden", "true"));
  });
});
