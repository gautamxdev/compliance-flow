import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";
import { splitByQuery } from "@/lib/sampleDashboard";

describe("sample dashboard search highlight", () => {
  it("splits text into matching and plain pieces", () => {
    expect(splitByQuery("Tax Audit", "  ")).toEqual([{ text: "Tax Audit", match: false }]);
    expect(splitByQuery("GST R1 - October", "gst")).toEqual([
      { text: "GST", match: true },
      { text: " R1 - October", match: false },
    ]);
    expect(splitByQuery("Tax Audit", "tax   au")).toEqual([
      { text: "Tax Au", match: true },
      { text: "dit", match: false },
    ]);
    expect(splitByQuery("aXaXa", "a")).toEqual([
      { text: "a", match: true },
      { text: "X", match: false },
      { text: "a", match: true },
      { text: "X", match: false },
      { text: "a", match: true },
    ]);
  });

  it("marks the matched part of task names while searching", () => {
    render(<HeroSection />);
    const table = screen.getByRole("table");
    expect(table.querySelector("mark")).toBeNull();

    fireEvent.change(screen.getByRole("searchbox", { name: "Search filings by task or assignee" }), {
      target: { value: "audit" },
    });
    const name = within(table).getByTestId("task-name");
    expect(name).toHaveTextContent("Tax Audit");
    expect(name.querySelector("mark")).toHaveTextContent("Audit");
  });
});
