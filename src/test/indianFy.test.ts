import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getIndianFinancialYear } from "@/lib/indianFy";

describe("getIndianFinancialYear", () => {
  it("starts the FY in April", () => {
    expect(getIndianFinancialYear(new Date(2026, 3, 1)).label).toBe("FY 2026-27");
    expect(getIndianFinancialYear(new Date(2026, 2, 31)).label).toBe("FY 2025-26");
  });

  it("powers the sample dashboard copy", () => {
    const hero = readFileSync(
      resolve(__dirname, "../components/landing/HeroSection.tsx"),
      "utf8",
    );
    expect(hero).toContain("getIndianFinancialYear");
    expect(hero).toContain("currentFy");
    expect(hero).not.toContain("FY 2024-25");
  });
});
