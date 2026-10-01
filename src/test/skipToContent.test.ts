import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("skip to content", () => {
  const indexSrc = readFileSync(
    resolve(__dirname, "../pages/Index.tsx"),
    "utf8",
  );

  it("links skip control to a focusable main landmark", () => {
    expect(indexSrc).toContain('href="#main-content"');
    expect(indexSrc).toMatch(/id="main-content"/);
    expect(indexSrc).toMatch(/tabIndex=\{-1\}/);
  });
});
