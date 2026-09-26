import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("FAQ section", () => {
  it("is mounted on the landing page and uses the accordion", () => {
    const index = readFileSync(resolve(__dirname, "../pages/Index.tsx"), "utf8");
    const faq = readFileSync(
      resolve(__dirname, "../components/landing/FaqSection.tsx"),
      "utf8",
    );

    expect(index).toContain("FaqSection");
    expect(index).toContain("<FaqSection />");
    expect(faq).toContain('id="faq"');
    expect(faq).toContain("Accordion");
    expect(faq).toContain("Questions firms usually ask");
  });
});
