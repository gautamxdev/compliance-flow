import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("CTA copy email", () => {
  it("lets visitors copy the demo inbox without opening mail", () => {
    const cta = readFileSync(
      resolve(__dirname, "../components/landing/CTASection.tsx"),
      "utf8",
    );

    expect(cta).toContain("Copy email");
    expect(cta).toContain("clipboard.writeText");
    expect(cta).toContain("hello@compliancework.in");
    expect(cta).toContain("DEMO_MAILTO");
  });
});
