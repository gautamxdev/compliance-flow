import { describe, it, expect, afterEach, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";
import {
  calendarDaysBetween,
  dueRelativeLabel,
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

    const dueCell = (task: string) =>
      within(within(table).getByText(task).closest("tr")!).getAllByRole("cell")[3];

    const gstDue = within(dueCell("GST R1 - October")).getByText("11 Nov 2026");
    expect(gstDue.tagName).toBe("TIME");
    expect(gstDue).toHaveAttribute("datetime", "2026-11-11");
    expect(gstDue).not.toHaveClass("text-destructive");

    const taxDue = within(dueCell("Tax Audit")).getByText("30 Sep 2026");
    expect(taxDue.tagName).toBe("TIME");
    expect(taxDue).toHaveClass("text-destructive");
    expect(within(dueCell("Tax Audit")).getByText("9 days late")).toBeInTheDocument();
    // GST R1 Nov due 11 Dec
    expect(within(dueCell("GST R1 - November")).getByText("in 63 days")).toBeInTheDocument();

    expect(within(table).queryByText(/2024/)).toBeNull();
  });

  it("repeats the due date and late/left hint under each task for narrow screens", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));

    render(<HeroSection />);

    const compact = screen.getAllByTestId("task-due-compact");
    expect(compact).toHaveLength(4);
    expect(compact.every((el) => el.classList.contains("lg:hidden"))).toBe(true);

    const taxRow = within(screen.getByRole("table")).getByText("Tax Audit").closest("tr")!;
    const taxCompact = within(taxRow).getByTestId("task-due-compact");
    expect(taxCompact).toHaveTextContent("Due 30 Sep 2026 · 9 days late");
    const taxTime = within(taxCompact).getByText("30 Sep 2026");
    expect(taxTime.tagName).toBe("TIME");
    expect(taxTime).toHaveAttribute("datetime", "2026-09-30");
    expect(taxTime).toHaveClass("text-destructive");

    // Filed rows show only the date, no relative hint.
    const itrRow = within(screen.getByRole("table")).getByText("ITR Filing").closest("tr")!;
    expect(within(itrRow).getByTestId("task-due-compact")).toHaveTextContent(/^Due 31 Jul 2026$/);
  });

  it("describes how many days late or left until a due date", () => {
    const today = new Date(2026, 9, 9);
    expect(
      dueRelativeLabel(
        { task: "A", status: "Pending", assignee: "A", due: new Date(2026, 9, 6) },
        today,
      ),
    ).toBe("3 days late");
    expect(
      dueRelativeLabel(
        { task: "B", status: "In Progress", assignee: "A", due: new Date(2026, 9, 8) },
        today,
      ),
    ).toBe("1 day late");
    expect(
      dueRelativeLabel(
        { task: "C", status: "Pending", assignee: "A", due: new Date(2026, 9, 9) },
        today,
      ),
    ).toBe("due today");
    expect(
      dueRelativeLabel(
        { task: "D", status: "Pending", assignee: "A", due: new Date(2026, 9, 10) },
        today,
      ),
    ).toBe("due tomorrow");
    expect(
      dueRelativeLabel(
        { task: "E", status: "Pending", assignee: "A", due: new Date(2026, 9, 16) },
        today,
      ),
    ).toBe("in 7 days");
    expect(
      dueRelativeLabel(
        { task: "F", status: "Filed", assignee: "A", due: new Date(2026, 9, 1) },
        today,
      ),
    ).toBeNull();
    expect(calendarDaysBetween(new Date(2026, 9, 9), new Date(2026, 9, 12))).toBe(3);
  });

  it("filters the sample table down to open filings", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));

    render(<HeroSection />);

    expect(screen.getByText(/4 tasks/)).toBeInTheDocument();
    expect(within(screen.getByRole("table")).getByText("ITR Filing")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Open only" }));

    expect(screen.getByText(/2 open/)).toBeInTheDocument();
    const table = screen.getByRole("table");
    expect(within(table).queryByText("ITR Filing")).toBeNull();
    expect(within(table).queryByText("GST R1 - October")).toBeNull();
    expect(within(table).getByText("GST R1 - November")).toBeInTheDocument();
    expect(within(table).getByText("Tax Audit")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open only" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    fireEvent.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getByText(/4 tasks/)).toBeInTheDocument();
    expect(within(screen.getByRole("table")).getByText("ITR Filing")).toBeInTheDocument();
  });
});
