import { describe, it, expect, afterEach, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";
import {
  filterTasksByScope,
  getSampleDashboardTasks,
  isDueSoon,
  visibleCountLabel,
  type SampleTask,
} from "@/lib/sampleDashboard";

const task = (status: SampleTask["status"], due: Date): SampleTask => ({
  task: "GST R3B",
  status,
  assignee: "Priya K.",
  due,
});

describe("isDueSoon", () => {
  const today = new Date(2026, 11, 4);

  it("covers open filings due today through the next 7 days", () => {
    expect(isDueSoon(task("Pending", new Date(2026, 11, 4)), today)).toBe(true);
    expect(isDueSoon(task("In Progress", new Date(2026, 11, 11)), today)).toBe(true);
    expect(isDueSoon(task("Pending", new Date(2026, 11, 12)), today)).toBe(false);
  });

  it("leaves out overdue and filed work", () => {
    expect(isDueSoon(task("Pending", new Date(2026, 11, 3)), today)).toBe(false);
    expect(isDueSoon(task("Filed", new Date(2026, 11, 6)), today)).toBe(false);
  });

  it("labels the visible count for the due-soon scope", () => {
    expect(visibleCountLabel(1, "due-soon")).toBe("1 due soon");
    const tasks = getSampleDashboardTasks(today);
    expect(filterTasksByScope(tasks, "due-soon", today).map((t) => t.task)).toEqual([
      "GST R1 - November",
    ]);
  });
});

describe("sample dashboard Due soon chip", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("counts and shows only open filings due within a week", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 11, 6));

    render(<HeroSection />);

    const chip = screen.getByRole("button", { name: "Due soon" });
    expect(screen.getByTestId("scope-count-due-soon")).toHaveTextContent("1");
    expect(chip).toHaveAccessibleDescription("1 filing");

    fireEvent.click(chip);
    expect(chip).toHaveAttribute("aria-pressed", "true");
    const names = within(screen.getByRole("table")).getAllByTestId("task-name");
    expect(names.map((n) => n.textContent)).toEqual(["GST R1 - November"]);
    expect(screen.getByTestId("visible-count")).toHaveTextContent("1 due soon");
    expect(screen.getByTestId("sample-dashboard-caption")).toHaveTextContent(
      "open filings due in the next 7 days",
    );
  });

  it("says nothing is due soon when the week ahead is clear", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));

    render(<HeroSection />);
    fireEvent.click(screen.getByRole("button", { name: "Due soon" }));

    expect(screen.getByText("Nothing due in the next 7 days.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show all filings" })).toBeInTheDocument();
  });
});
