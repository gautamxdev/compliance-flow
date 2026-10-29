import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";

describe("sample dashboard filter chip counts", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows how many filings each chip would list", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));

    render(<HeroSection />);

    expect(screen.getByTestId("scope-count-all")).toHaveTextContent("4");
    expect(screen.getByTestId("scope-count-open")).toHaveTextContent("2");
    expect(screen.getByTestId("scope-count-overdue")).toHaveTextContent("1");
  });

  it("keeps chip names short and reads the count as a description", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));

    render(<HeroSection />);

    const overdue = screen.getByRole("button", { name: "Overdue" });
    expect(overdue).toHaveAccessibleDescription("1 filing");
    expect(screen.getByRole("button", { name: "Open only" })).toHaveAccessibleDescription("2 filings");
  });
});
