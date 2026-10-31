import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import VisibilitySection from "@/components/landing/VisibilitySection";

describe("visibility role panels", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn().mockImplementation(() => ({
        observe: vi.fn(),
        disconnect: vi.fn(),
        unobserve: vi.fn(),
      })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("hides placeholder rows from assistive tech and only lifts them with motion allowed", () => {
    render(<VisibilitySection />);
    const panel = screen.getByRole("tabpanel", { name: /Partners/ });
    const rows = panel.querySelector('[data-testid="visibility-mock-rows"]') as HTMLElement;

    expect(rows).toHaveAttribute("aria-hidden", "true");
    for (const row of Array.from(rows.children)) {
      expect(row.className).toContain("motion-safe:hover:-translate-y-[1px]");
      expect(row.className).not.toMatch(/(^|\s)hover:-translate-y/);
    }
    // The real content of the panel stays readable.
    expect(panel).toHaveTextContent("42");
    expect(panel).toHaveTextContent("Overdue Filings View");
  });
});
