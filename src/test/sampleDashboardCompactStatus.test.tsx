import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";

const rowFor = (task: string) => {
  const name = within(screen.getByRole("table"))
    .getAllByTestId("task-name")
    .find((el) => el.textContent === task);
  if (!name) throw new Error(`row ${task} not found`);
  return name.closest("tr") as HTMLTableRowElement;
};

describe("sample dashboard compact status", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows each filing's status in the compact due line for narrow screens", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));

    render(<HeroSection />);

    const expected: Record<string, string> = {
      "GST R1 - October": "Filed",
      "GST R1 - November": "Pending",
      "ITR Filing": "Filed",
      "Tax Audit": "In Progress",
    };

    for (const [task, status] of Object.entries(expected)) {
      const compact = within(rowFor(task)).getByTestId("task-due-compact");
      const badge = within(compact).getByTestId("task-status-compact");
      expect(badge).toHaveTextContent(status);
      // Only shown where the Status column is hidden.
      expect(badge.className).toContain("sm:hidden");
    }
  });

  it("reuses the status column's colour for the compact badge", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));

    render(<HeroSection />);

    const pending = within(rowFor("GST R1 - November")).getByTestId("task-status-compact");
    const filed = within(rowFor("ITR Filing")).getByTestId("task-status-compact");
    expect(pending.className).toContain("text-warning");
    expect(filed.className).toContain("text-success");
  });
});
