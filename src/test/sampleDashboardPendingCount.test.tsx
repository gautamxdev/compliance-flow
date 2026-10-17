import { describe, it, expect, afterEach, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";
import { countOpenTasks, getSampleDashboardTasks } from "@/lib/sampleDashboard";

const taskNames = () =>
  within(screen.getByRole("table"))
    .queryAllByTestId("task-name")
    .map((el) => el.textContent);

describe("sidebar pending filings count", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("counts every filing that is not Filed", () => {
    const tasks = getSampleDashboardTasks(new Date(2026, 9, 9));
    expect(countOpenTasks(tasks)).toBe(2);
    expect(countOpenTasks([])).toBe(0);
    expect(countOpenTasks(tasks.map((t) => ({ ...t, status: "Filed" as const })))).toBe(0);
  });

  it("shows the live open count next to Pending Filings", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));

    render(<HeroSection />);

    const item = screen.getByRole("button", { name: "Pending Filings, 2 open" });
    expect(within(item).getByTestId("pending-filings-count")).toHaveTextContent("2");
  });

  it("toggles the Open only view from the sidebar item", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));

    render(<HeroSection />);

    const item = screen.getByRole("button", { name: /^Pending Filings/ });
    expect(item).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(item);
    expect(item).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Open only" })).toHaveAttribute("aria-pressed", "true");
    expect(taskNames()).toEqual(["GST R1 - November", "Tax Audit"]);

    fireEvent.click(item);
    expect(item).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
    expect(taskNames()).toHaveLength(4);
  });
});
