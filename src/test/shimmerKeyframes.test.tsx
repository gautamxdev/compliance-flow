import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "@/components/landing/Header";
import CTASection from "@/components/landing/CTASection";

describe("button shimmer", () => {
  it("defines shimmer-sweep globally instead of inside the CTA section", () => {
    const css = readFileSync(resolve(__dirname, "../index.css"), "utf8");
    expect(css).toMatch(/@keyframes shimmer-sweep\s*\{/);

    const { container } = render(<CTASection />);
    expect(container.querySelector("style")).toBeNull();
  });

  it("hides the header shimmer from assistive tech and under reduced motion", () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const shimmer = container.querySelector("[class*='shimmer-sweep']");
    expect(shimmer).not.toBeNull();
    expect(shimmer).toHaveAttribute("aria-hidden", "true");
    expect(shimmer?.className).toContain("motion-reduce:hidden");
  });
});
