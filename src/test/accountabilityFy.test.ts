import { describe, it, expect } from "vitest";
import { getAccountabilityActivities } from "@/components/landing/AccountabilitySection";
import { getIndianFinancialYear } from "@/lib/indianFy";

describe("accountability activity FY labels", () => {
  it("ties FY-scoped targets to the current Indian financial year", () => {
    const oct = new Date(2026, 9, 11);
    const { label } = getIndianFinancialYear(oct);
    expect(label).toBe("FY 2026-27");

    const targets = getAccountabilityActivities(oct).map((a) => a.target);
    expect(targets).toContain(`Balance Sheet - ${label}`);
    expect(targets).toContain(`ITR Filing - ${label}`);
    expect(targets.join(" ")).not.toMatch(/2024-25/);
  });

  it("rolls FY labels forward after 1 April", () => {
    const april = new Date(2027, 3, 2);
    const { label } = getIndianFinancialYear(april);
    expect(label).toBe("FY 2027-28");
    const sheet = getAccountabilityActivities(april).find((a) =>
      a.target.startsWith("Balance Sheet"),
    );
    expect(sheet?.target).toBe(`Balance Sheet - ${label}`);
  });
});
