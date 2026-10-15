import { describe, it, expect, afterEach, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";
import { filterTasksByScope, getSampleDashboardTasks } from "@/lib/sampleDashboard";

const taskNames = () =>
  within(screen.getByRole("table"))
    .queryAllByTestId("task-name")
    .map((el) => el.textContent);

describe("sample dashboard overdue filter", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("narrows filings to all, open, or overdue open ones", () => {
    const today = new Date(2026, 9, 9);
    const tasks = getSampleDashboardTasks(today);

    expect(filterTasksByScope(tasks, "all", today)).toBe(tasks);
    expect(filterTasksByScope(tasks, "open", today).map((t) => t.task)).toEqual([
      "GST R1 - November",
      "Tax Audit",
    ]);
    expect(filterTasksByScope(tasks, "overdue", today).map((t) => t.task)).toEqual([
      "Tax Audit",
    ]);
    // Filed ITR is past due but never counts as overdue.
    expect(filterTasksByScope(tasks, "overdue", new Date(2027, 0, 1)).map((t) => t.task)).toEqual([
      "GST R1 - November",
      "Tax Audit",
    ]);
  });

  it("shows only overdue filings when the Overdue chip is pressed", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));

    render(<HeroSection />);

    fireEvent.click(screen.getByRole("button", { name: "Overdue" }));

    expect(screen.getByRole("button", { name: "Overdue" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "false");
    expect(taskNames()).toEqual(["Tax Audit"]);
    // The count reads "1 overdue" without repeating the overdue suffix.
    expect(screen.getByText("1 overdue")).toBeInTheDocument();
    expect(screen.queryByText(/overdue · /)).toBeNull();
  });

  it("explains an empty overdue view instead of rendering a bare table", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    // Early in the FY nothing open is past due yet.
    vi.setSystemTime(new Date(2026, 3, 10));

    render(<HeroSection />);

    fireEvent.click(screen.getByRole("button", { name: "Overdue" }));

    expect(taskNames()).toEqual([]);
    expect(
      within(screen.getByRole("table")).getByText("Nothing overdue. Every open filing is on schedule."),
    ).toBeInTheDocument();
    expect(screen.getByText(/0 overdue/)).toBeInTheDocument();
  });
});
