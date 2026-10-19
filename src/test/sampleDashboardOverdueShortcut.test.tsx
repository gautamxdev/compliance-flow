import { describe, it, expect, afterEach, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";

const taskNames = () =>
  within(screen.getByRole("table"))
    .queryAllByTestId("task-name")
    .map((el) => el.textContent);

describe("sample dashboard overdue shortcut", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("switches to the Overdue view from the summary count", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));

    render(<HeroSection />);

    fireEvent.click(screen.getByRole("button", { name: "Show 1 overdue filing" }));

    expect(screen.getByRole("button", { name: "Overdue" })).toHaveAttribute("aria-pressed", "true");
    expect(taskNames()).toEqual(["Tax Audit"]);
    // Already on the Overdue view, so the shortcut goes away.
    expect(screen.queryByRole("button", { name: /^Show \d+ overdue/ })).toBeNull();
  });

  it("pluralises the label and hides the shortcut when nothing is overdue", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2027, 0, 1));

    const { unmount } = render(<HeroSection />);
    expect(screen.getByRole("button", { name: "Show 2 overdue filings" })).toBeInTheDocument();
    unmount();

    vi.setSystemTime(new Date(2026, 3, 10));
    render(<HeroSection />);
    expect(screen.queryByRole("button", { name: /^Show \d+ overdue/ })).toBeNull();
  });
});
