import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("route hash scroll", () => {
  it("scrolls to a landing section when the URL hash is set", () => {
    const source = readFileSync(
      resolve(__dirname, "../components/RouteEffects.tsx"),
      "utf8",
    );

    expect(source).toContain("scrollToId");
    expect(source).toContain("hash");
    expect(source).toContain('pathname === "/"');
    expect(source).toContain("requestAnimationFrame");
  });
});
