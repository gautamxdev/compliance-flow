import { describe, it, expect, afterEach, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";

const taskNames = () =>
  within(screen.getByRole("table"))
    .queryAllByTestId("task-name")
    .map((el) => el.textContent);

describe("sample dashboard reset view", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("only offers Reset view once the filter or sort has changed", () => {
    render(<HeroSection />);
    expect(screen.queryByRole("button", { name: "Reset view" })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /^Due/ }));
    expect(screen.getByRole("button", { name: "Reset view" })).toBeInTheDocument();
  });

  it("restores all filings in their default order", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));

    render(<HeroSection />);
    const defaultOrder = taskNames();

    fireEvent.click(screen.getByRole("button", { name: "Open only" }));
    fireEvent.click(screen.getByRole("button", { name: /^Due/ }));
    fireEvent.click(screen.getByRole("button", { name: /^Due/ }));
    expect(taskNames()).not.toEqual(defaultOrder);

    fireEvent.click(screen.getByRole("button", { name: "Reset view" }));

    expect(taskNames()).toEqual(defaultOrder);
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("columnheader", { name: /^Due/ })).toHaveAttribute("aria-sort", "none");
    expect(screen.queryByRole("button", { name: "Reset view" })).toBeNull();
  });
});
