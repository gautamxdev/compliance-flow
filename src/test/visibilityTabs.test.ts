import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("visibility role tabs", () => {
  it("exposes tablist semantics and uses the in-view flag", () => {
    const src = readFileSync(
      resolve(__dirname, "../components/landing/VisibilitySection.tsx"),
      "utf8",
    );

    expect(src).toContain('role="tablist"');
    expect(src).toContain('role="tab"');
    expect(src).toContain("aria-selected");
    expect(src).toContain('role="tabpanel"');
    expect(src).toContain("visible ?");
    expect(src).toContain("ArrowDown");
  });
});
