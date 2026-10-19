import { describe, it, expect, afterEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";

describe("sample dashboard table caption", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("names the table and follows the current filter and due sort", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));

    render(<HeroSection />);

    const table = screen.getByRole("table", {
      name: "Sharma Enterprises filings for FY 2026-27: all filings, in default order.",
    });
    expect(table).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Open only" }));
    fireEvent.click(screen.getByRole("button", { name: /^Due/ }));
    expect(screen.getByTestId("sample-dashboard-caption")).toHaveTextContent(
      "Sharma Enterprises filings for FY 2026-27: open filings only, sorted by due date, earliest first.",
    );

    fireEvent.click(screen.getByRole("button", { name: "Overdue" }));
    fireEvent.click(screen.getByRole("button", { name: /^Due/ }));
    expect(screen.getByTestId("sample-dashboard-caption")).toHaveTextContent(
      "overdue filings only, sorted by due date, latest first.",
    );
  });
});
