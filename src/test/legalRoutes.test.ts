import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("legal routes", () => {
  it("wires Privacy and Terms pages in App and Footer", () => {
    const app = readFileSync(resolve(__dirname, "../App.tsx"), "utf8");
    const footer = readFileSync(
      resolve(__dirname, "../components/landing/Footer.tsx"),
      "utf8",
    );

    expect(app).toContain('path="/privacy"');
    expect(app).toContain('path="/terms"');
    expect(app).toContain('from "./pages/Privacy"');
    expect(app).toContain('from "./pages/Terms"');
    expect(footer).toContain('to="/privacy"');
    expect(footer).toContain('to="/terms"');
    expect(footer).not.toContain('href="#"');
  });
});
