import { describe, expect, it } from "vitest";
import { dashboardViewSearch, parseDashboardView } from "@/lib/sampleDashboard";

describe("parseDashboardView loose matching", () => {
  it("accepts re-cased filter and sort values", () => {
    expect(parseDashboardView("?filter=Overdue&due=DESC")).toEqual({ scope: "overdue", sort: "desc", query: "" });
  });

  it("accepts spaces, plus signs and underscores in place of hyphens", () => {
    expect(parseDashboardView("?filter=due+soon").scope).toBe("due-soon");
    expect(parseDashboardView("?filter=Due%20Soon").scope).toBe("due-soon");
    expect(parseDashboardView("?filter=due_soon").scope).toBe("due-soon");
  });

  it("ignores surrounding whitespace", () => {
    expect(parseDashboardView("?filter=%20open%20&due=%20asc").scope).toBe("open");
    expect(parseDashboardView("?filter=%20open%20&due=%20asc").sort).toBe("asc");
  });

  it("still falls back for values that are not a known view", () => {
    expect(parseDashboardView("?filter=due--soon-ish&due=up")).toEqual({ scope: "all", sort: "none", query: "" });
  });

  it("leaves the search query exactly as written", () => {
    expect(parseDashboardView("?q=GST_R1").query).toBe("GST_R1");
  });

  it("writes the canonical value back to the URL", () => {
    const view = parseDashboardView("?filter=Due+Soon&due=Asc");
    expect(dashboardViewSearch(view, "?filter=Due+Soon&due=Asc")).toBe("?filter=due-soon&due=asc");
  });
});
