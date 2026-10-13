import { describe, it, expect, afterEach, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";
import {
  getSampleDashboardTasks,
  nextDueSort,
  sortTasksByDue,
} from "@/lib/sampleDashboard";

const taskNames = () =>
  within(screen.getByRole("table"))
    .getAllByRole("row")
    .slice(1)
    .map((row) => within(row).getAllByRole("cell")[0].textContent);

describe("sample dashboard due-date sort", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("cycles none → asc → desc → none", () => {
    expect(nextDueSort("none")).toBe("asc");
    expect(nextDueSort("asc")).toBe("desc");
    expect(nextDueSort("desc")).toBe("none");
  });

  it("sorts by due date without mutating the input", () => {
    const tasks = getSampleDashboardTasks(new Date(2026, 9, 9));
    const original = tasks.map((t) => t.task);

    expect(sortTasksByDue(tasks, "asc").map((t) => t.task)).toEqual([
      "ITR Filing",
      "Tax Audit",
      "GST R1 - October",
      "GST R1 - November",
    ]);
    expect(sortTasksByDue(tasks, "desc").map((t) => t.task)).toEqual([
      "GST R1 - November",
      "GST R1 - October",
      "Tax Audit",
      "ITR Filing",
    ]);
    expect(sortTasksByDue(tasks, "none")).toBe(tasks);
    expect(tasks.map((t) => t.task)).toEqual(original);
  });

  it("toggles the Due header sort and reflects it in aria-sort", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));

    render(<HeroSection />);

    const header = screen.getByRole("columnheader", { name: /Due/ });
    const button = within(header).getByRole("button", { name: "Due" });
    expect(header).toHaveAttribute("aria-sort", "none");
    expect(taskNames()).toEqual(["GST R1 - October", "GST R1 - November", "ITR Filing", "Tax Audit"]);

    fireEvent.click(button);
    expect(header).toHaveAttribute("aria-sort", "ascending");
    expect(taskNames()).toEqual(["ITR Filing", "Tax Audit", "GST R1 - October", "GST R1 - November"]);

    fireEvent.click(button);
    expect(header).toHaveAttribute("aria-sort", "descending");
    expect(taskNames()).toEqual(["GST R1 - November", "GST R1 - October", "Tax Audit", "ITR Filing"]);

    fireEvent.click(button);
    expect(header).toHaveAttribute("aria-sort", "none");
    expect(taskNames()[0]).toBe("GST R1 - October");
  });

  it("keeps the due sort when filtering to open filings", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));

    render(<HeroSection />);

    fireEvent.click(screen.getByRole("button", { name: "Due" }));
    fireEvent.click(screen.getByRole("button", { name: "Open only" }));
    expect(taskNames()).toEqual(["Tax Audit", "GST R1 - November"]);
  });
});
