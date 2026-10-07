import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";
import { formatDueDate, getSampleDashboardTasks, toIsoDate } from "@/lib/sampleDashboard";

describe("sample dashboard filings", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("keeps every due date inside the financial year being shown", () => {
    for (const today of [new Date(2026, 9, 7), new Date(2027, 1, 15)]) {
      const fyStart = new Date(2026, 3, 1);
      const fyEnd = new Date(2027, 2, 31);
      for (const { due } of getSampleDashboardTasks(today)) {
        expect(due.getTime()).toBeGreaterThanOrEqual(fyStart.getTime());
        expect(due.getTime()).toBeLessThanOrEqual(fyEnd.getTime());
      }
    }
  });

  it("formats due dates compactly with a machine-readable twin", () => {
    const due = new Date(2026, 8, 30);
    expect(formatDueDate(due)).toBe("30 Sep 2026");
    expect(toIsoDate(due)).toBe("2026-09-30");
  });

  it("renders FY-consistent rows and a live task count in the hero", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 7));

    render(<HeroSection />);

    expect(screen.getByText("4 tasks")).toBeInTheDocument();
    const table = screen.getByRole("table");
    expect(within(table).getAllByRole("row")).toHaveLength(5);
    const gstDue = within(table).getByText("11 Nov 2026");
    expect(gstDue.tagName).toBe("TIME");
    expect(gstDue).toHaveAttribute("datetime", "2026-11-11");
    expect(within(table).queryByText(/2024/)).toBeNull();
  });
});
