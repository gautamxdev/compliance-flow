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

  it("moves focus to the site header after scrolling up", () => {
    const footer = readFileSync(
      resolve(__dirname, "../components/landing/Footer.tsx"),
      "utf8",
    );
    const header = readFileSync(
      resolve(__dirname, "../components/landing/Header.tsx"),
      "utf8",
    );

    expect(footer).toContain('getElementById("site-header")');
    expect(footer).toContain("focus({ preventScroll: true })");
    expect(header).toContain('id="site-header"');
    expect(header).toContain("tabIndex={-1}");
  });
});
