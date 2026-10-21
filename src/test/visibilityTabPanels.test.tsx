import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import VisibilitySection from "@/components/landing/VisibilitySection";

describe("visibility role tab panels", () => {
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

  it("points every tab at its own panel, labelled by that tab", () => {
    render(<VisibilitySection />);
    for (const tab of screen.getAllByRole("tab")) {
      const panel = document.getElementById(tab.getAttribute("aria-controls")!);
      expect(panel).not.toBeNull();
      expect(panel).toHaveAttribute("role", "tabpanel");
      expect(panel).toHaveAttribute("aria-labelledby", tab.id);
    }
  });

  it("shows only the selected role's panel and makes it focusable", () => {
    render(<VisibilitySection />);
    const [, managers] = screen.getAllByRole("tab");

    fireEvent.click(managers);

    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAttribute("id", managers.getAttribute("aria-controls"));
    expect(panel).toHaveTextContent("85%");
    expect(panel).toHaveAttribute("tabindex", "0");
    expect(screen.getAllByRole("tabpanel", { hidden: true })).toHaveLength(3);
  });
});
