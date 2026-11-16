import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CoreIdeaSection from "@/components/landing/CoreIdeaSection";

describe("core idea mobile flow", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn().mockImplementation(() => ({ observe: vi.fn(), disconnect: vi.fn(), unobserve: vi.fn() })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows a decorative down arrow between stacked steps on small screens only", () => {
    render(<CoreIdeaSection />);
    const arrows = screen.getAllByTestId("core-idea-arrow-down");
    expect(arrows).toHaveLength(4);
    for (const arrow of arrows) {
      expect(arrow).toHaveAttribute("aria-hidden", "true");
      expect(arrow.getAttribute("class")).toContain("md:hidden");
    }
  });
});
