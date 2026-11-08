import { describe, it, expect, afterEach, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";
import { dashboardViewSearch, parseDashboardView } from "@/lib/sampleDashboard";

describe("dashboard view in the URL", () => {
  it("parses known values and ignores junk", () => {
    expect(parseDashboardView("?filter=overdue&due=desc&q=gst")).toEqual({
      scope: "overdue",
      sort: "desc",
      query: "gst",
    });
    expect(parseDashboardView("?filter=late&due=sideways")).toEqual({
      scope: "all",
      sort: "none",
      query: "",
    });
  });

  it("writes only non-default values and keeps other params", () => {
    expect(dashboardViewSearch({ scope: "all", sort: "none", query: "" })).toBe("");
    expect(dashboardViewSearch({ scope: "open", sort: "asc", query: "priya k" }, "?ref=mail")).toBe(
      "?ref=mail&filter=open&due=asc&q=priya+k",
    );
    expect(dashboardViewSearch({ scope: "all", sort: "none", query: "  " }, "?ref=mail&filter=open")).toBe(
      "?ref=mail",
    );
  });
});

describe("sample dashboard URL state", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("opens the view described by the URL", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 9));
    window.history.replaceState(null, "", "/?filter=open&due=desc#sample-dashboard");

    render(<HeroSection />);

    expect(screen.getByRole("button", { name: "Open only" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("columnheader", { name: /^Due/ })).toHaveAttribute("aria-sort", "descending");
    expect(within(screen.getByRole("table")).getAllByTestId("task-name").map((n) => n.textContent)).toEqual([
      "GST R1 - November",
      "Tax Audit",
    ]);
  });

  it("keeps the address bar in step without adding history entries", () => {
    window.history.replaceState(null, "", "/?ref=mail#sample-dashboard");
    const before = window.history.length;

    render(<HeroSection />);
    fireEvent.click(screen.getByRole("button", { name: "Overdue" }));
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "audit" } });

    expect(window.location.search).toBe("?ref=mail&filter=overdue&q=audit");
    expect(window.location.hash).toBe("#sample-dashboard");
    expect(window.history.length).toBe(before);

    fireEvent.click(screen.getByRole("button", { name: "Reset view" }));
    expect(window.location.search).toBe("?ref=mail");
  });
});
