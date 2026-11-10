import { describe, it, expect, afterEach, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";

describe("sample dashboard date checks share the render's day", () => {
  afterEach(() => {
    vi.useRealTimers();
    window.history.replaceState(null, "", "/");
  });

  it("treats a filing due today as due today, not overdue, late in the evening", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 8, 30, 23, 59, 50));
    render(<HeroSection />);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "Tax Audit" } });
    expect(screen.getAllByText("due today").length).toBeGreaterThan(0);
    expect(screen.queryByText(/day late/)).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /^Overdue/ }));
    expect(within(screen.getByRole("table")).queryByText("Tax Audit")).toBeNull();
  });

  it("marks it one day late once the visitor's day rolls over", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 1, 0, 0, 10));
    render(<HeroSection />);
    fireEvent.click(screen.getByRole("button", { name: /^Overdue/ }));
    const table = screen.getByRole("table");
    expect(within(table).getAllByText("1 day late").length).toBeGreaterThan(0);
  });
});
