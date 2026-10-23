import { describe, it, expect, afterEach, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";

const taskNames = () =>
  within(screen.getByRole("table"))
    .queryAllByTestId("task-name")
    .map((el) => el.textContent);

describe("sample dashboard empty filter state", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("offers Show all filings when the Overdue view has no rows", () => {
    // Early in the FY nothing open is past due yet.
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 3, 5));

    render(<HeroSection />);
    fireEvent.click(screen.getByRole("button", { name: "Overdue" }));

    expect(taskNames()).toEqual([]);
    expect(screen.getByText("Nothing overdue. Every open filing is on schedule.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Show all filings" }));

    expect(taskNames()).toHaveLength(4);
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.queryByRole("button", { name: "Show all filings" })).toBeNull();
  });

  it("does not show the action while rows are visible", () => {
    render(<HeroSection />);
    expect(screen.queryByRole("button", { name: "Show all filings" })).toBeNull();
  });
});
