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

describe("sample dashboard compact assignee", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows who owns each filing next to the task name below md", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));

    render(<HeroSection />);

    const expected: Record<string, string> = {
      "GST R1 - October": "Rahul M.",
      "GST R1 - November": "Priya K.",
      "ITR Filing": "Amit S.",
      "Tax Audit": "Rahul M.",
    };

    for (const [task, assignee] of Object.entries(expected)) {
      const row = rowFor(task);
      const compact = within(row).getByTestId("task-assignee-compact");
      expect(compact).toHaveClass("md:hidden");
      // Screen readers hear "Assigned to …"; sighted users see just the name.
      expect(compact).toHaveTextContent(`Assigned to ${assignee}`);
      expect(within(compact).getByText("Assigned to")).toHaveClass("sr-only");
    }
  });

  it("keeps the task name on its own so filters and sorting read cleanly", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));

    render(<HeroSection />);

    expect(within(rowFor("Tax Audit")).getByTestId("task-name")).toHaveTextContent(/^Tax Audit$/);
  });
});
