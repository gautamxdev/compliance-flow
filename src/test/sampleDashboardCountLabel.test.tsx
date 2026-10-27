import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";
import { visibleCountLabel } from "@/lib/sampleDashboard";

describe("sample dashboard count label", () => {
  it("uses a singular noun for one task", () => {
    expect(visibleCountLabel(0, "all")).toBe("0 tasks");
    expect(visibleCountLabel(1, "all")).toBe("1 task");
    expect(visibleCountLabel(4, "all")).toBe("4 tasks");
    expect(visibleCountLabel(1, "open")).toBe("1 open");
    expect(visibleCountLabel(3, "overdue")).toBe("3 overdue");
  });

  it("reads '1 task' when a search leaves a single row", () => {
    render(<HeroSection />);
    fireEvent.change(screen.getByRole("searchbox", { name: "Search filings by task or assignee" }), {
      target: { value: "priya" },
    });
    expect(screen.getByTestId("visible-count")).toHaveTextContent(/^1 task$/);
  });
});
