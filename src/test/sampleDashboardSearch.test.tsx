import { describe, it, expect, afterEach, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";
import { filterTasksByQuery, getSampleDashboardTasks } from "@/lib/sampleDashboard";

const taskNames = () =>
  within(screen.getByRole("table"))
    .queryAllByTestId("task-name")
    .map((el) => el.textContent);

const searchBox = () => screen.getByRole("searchbox", { name: "Search filings by task or assignee" });

describe("sample dashboard search", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("matches task names and assignees case-insensitively", () => {
    const tasks = getSampleDashboardTasks(new Date(2026, 9, 9));

    expect(filterTasksByQuery(tasks, "   ")).toBe(tasks);
    expect(filterTasksByQuery(tasks, "gst").map((t) => t.task)).toEqual([
      "GST R1 - October",
      "GST R1 - November",
    ]);
    expect(filterTasksByQuery(tasks, "  rahul  ").map((t) => t.task)).toEqual([
      "GST R1 - October",
      "Tax Audit",
    ]);
    expect(filterTasksByQuery(tasks, "tax   audit").map((t) => t.task)).toEqual(["Tax Audit"]);
    expect(filterTasksByQuery(tasks, "notice")).toEqual([]);
  });

  it("narrows the table and combines with the scope filter", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));

    render(<HeroSection />);
    fireEvent.change(searchBox(), { target: { value: "Rahul" } });
    expect(taskNames()).toEqual(["GST R1 - October", "Tax Audit"]);

    fireEvent.click(screen.getByRole("button", { name: "Open only" }));
    expect(taskNames()).toEqual(["Tax Audit"]);
    expect(screen.getByTestId("sample-dashboard-caption")).toHaveTextContent('matching "Rahul"');
  });

  it("explains an empty search and clears it", () => {
    render(<HeroSection />);
    fireEvent.change(searchBox(), { target: { value: "notices" } });

    expect(taskNames()).toEqual([]);
    expect(screen.getByText(/No filings match/)).toHaveTextContent("No filings match “notices”.");

    fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(searchBox()).toHaveValue("");
    expect(taskNames()).toHaveLength(4);
  });

  it("clears on Escape and on Reset view", () => {
    render(<HeroSection />);
    fireEvent.change(searchBox(), { target: { value: "priya" } });
    expect(taskNames()).toEqual(["GST R1 - November"]);

    fireEvent.keyDown(searchBox(), { key: "Escape" });
    expect(searchBox()).toHaveValue("");

    fireEvent.change(searchBox(), { target: { value: "priya" } });
    fireEvent.click(screen.getByRole("button", { name: "Reset view" }));
    expect(searchBox()).toHaveValue("");
    expect(taskNames()).toHaveLength(4);
  });
});
