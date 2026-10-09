import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";
import {
  formatDueDate,
  getSampleDashboardTasks,
  isOverdue,
  toIsoDate,
} from "@/lib/sampleDashboard";

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

  it("flags only open filings whose due date is before today", () => {
    const today = new Date(2026, 9, 9); // 9 Oct 2026
    const tasks = getSampleDashboardTasks(today);

    const taxAudit = tasks.find((t) => t.task === "Tax Audit")!;
    expect(taxAudit.status).toBe("In Progress");
    expect(isOverdue(taxAudit, today)).toBe(true);

    const novGst = tasks.find((t) => t.task === "GST R1 - November")!;
    expect(novGst.status).toBe("Pending");
    expect(isOverdue(novGst, today)).toBe(false);

    const itr = tasks.find((t) => t.task === "ITR Filing")!;
    expect(itr.status).toBe("Filed");
    // Filed stays non-overdue even when the due date is in the past.
    expect(isOverdue(itr, today)).toBe(false);
  });

  it("treats due-today open filings as not overdue", () => {
    const due = new Date(2026, 9, 9);
    expect(
      isOverdue(
        { task: "Notice reply", status: "Pending", assignee: "A", due },
        new Date(2026, 9, 9),
      ),
    ).toBe(false);
  });

  it("renders FY-consistent rows, overdue callouts, and a live task count", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));

    render(<HeroSection />);

    expect(screen.getByText(/4 tasks/)).toBeInTheDocument();
    expect(screen.getByText("1 overdue")).toBeInTheDocument();

    const table = screen.getByRole("table");
    expect(within(table).getAllByRole("row")).toHaveLength(5);

    const gstDue = within(table).getByText("11 Nov 2026");
    expect(gstDue.tagName).toBe("TIME");
    expect(gstDue).toHaveAttribute("datetime", "2026-11-11");
    expect(gstDue).not.toHaveClass("text-destructive");

    const taxDue = within(table).getByText("30 Sep 2026");
    expect(taxDue.tagName).toBe("TIME");
    expect(taxDue).toHaveClass("text-destructive");
    expect(within(table).getByText("Overdue")).toBeInTheDocument();

    expect(within(table).queryByText(/2024/)).toBeNull();
  });
});
