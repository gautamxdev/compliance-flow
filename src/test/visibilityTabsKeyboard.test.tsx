import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import VisibilitySection from "@/components/landing/VisibilitySection";

describe("visibility role tabs keyboard support", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn().mockImplementation(() => ({
        observe: vi.fn(),
        disconnect: vi.fn(),
        unobserve: vi.fn(),
      })),
    );
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  const selectedTab = () =>
    screen.getAllByRole("tab").find((tab) => tab.getAttribute("aria-selected") === "true");

  it("declares a vertical tablist", () => {
    render(<VisibilitySection />);
    expect(screen.getByRole("tablist")).toHaveAttribute("aria-orientation", "vertical");
  });

  it("jumps to the last and first role with End and Home", () => {
    render(<VisibilitySection />);
    const [partners] = screen.getAllByRole("tab");

    fireEvent.keyDown(partners, { key: "End" });
    expect(selectedTab()).toHaveTextContent("Staff");
    expect(document.activeElement).toBe(selectedTab());

    fireEvent.keyDown(selectedTab()!, { key: "Home" });
    expect(selectedTab()).toHaveTextContent("Partners");
    expect(document.activeElement).toBe(selectedTab());
  });

  it("still wraps with the arrow keys and ignores other keys", () => {
    render(<VisibilitySection />);
    const [partners] = screen.getAllByRole("tab");

    fireEvent.keyDown(partners, { key: "ArrowUp" });
    expect(selectedTab()).toHaveTextContent("Staff");

    fireEvent.keyDown(selectedTab()!, { key: "ArrowDown" });
    expect(selectedTab()).toHaveTextContent("Partners");

    fireEvent.keyDown(selectedTab()!, { key: "a" });
    expect(selectedTab()).toHaveTextContent("Partners");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("42");
  });
});
