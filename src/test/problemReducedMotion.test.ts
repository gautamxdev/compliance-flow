import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("problem section reduced motion", () => {
  it("skips hover lift animation when reduced motion is preferred", () => {
    const source = readFileSync(
      resolve(__dirname, "../components/landing/ProblemSection.tsx"),
      "utf8",
    );

    expect(source).toContain("prefersReducedMotion");
    expect(source).toContain("reduceMotion");
    expect(source).toContain("hover:-translate-y-2");
    expect(source).toContain("aria-labelledby");
    expect(source).toContain("problem-heading");
  });
});
