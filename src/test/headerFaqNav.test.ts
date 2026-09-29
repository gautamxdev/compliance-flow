import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("header FAQ navigation", () => {
  it("exposes FAQ in desktop and mobile nav targets", () => {
    const header = readFileSync(
      resolve(__dirname, "../components/landing/Header.tsx"),
      "utf8",
    );

    expect(header).toContain('{ id: "faq", label: "FAQ" }');
    expect(header).toContain('href="#faq"');
    expect(header).toContain('scrollToId("faq")');
  });
});
