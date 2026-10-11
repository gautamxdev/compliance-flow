import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("accountability activity reduced motion", () => {
  it("skips hover lift and stagger when reduced motion is preferred", () => {
    const source = readFileSync(
      resolve(__dirname, "../components/landing/AccountabilitySection.tsx"),
      "utf8",
    );

    expect(source).toContain("prefersReducedMotion");
    expect(source).toContain("reduceMotion");
    expect(source).toContain("hover:-translate-y-[2px]");
    expect(source).toContain('reduceMotion ? undefined : { transitionDelay');
  });
});
