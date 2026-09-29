import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("footer back to top", () => {
  it("offers a reduced-motion-aware scroll-to-top control", () => {
    const footer = readFileSync(
      resolve(__dirname, "../components/landing/Footer.tsx"),
      "utf8",
    );

    expect(footer).toContain("Back to top");
    expect(footer).toContain("scrollTo");
    expect(footer).toContain("prefersReducedMotion");
    expect(footer).toContain('to="/privacy"');
    expect(footer).toContain('to="/terms"');
  });
});
