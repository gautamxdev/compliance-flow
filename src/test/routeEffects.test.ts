import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { DEFAULT_TITLE, TITLES } from "@/components/RouteEffects";

describe("RouteEffects", () => {
  it("maps known routes to FirmOps page titles", () => {
    expect(TITLES["/"]).toBe(DEFAULT_TITLE);
    expect(TITLES["/privacy"]).toContain("Privacy");
    expect(TITLES["/terms"]).toContain("Terms");
    expect(DEFAULT_TITLE).toContain("FirmOps");
  });

  it("is mounted inside the router in App", () => {
    const app = readFileSync(resolve(__dirname, "../App.tsx"), "utf8");
    expect(app).toContain("RouteEffects");
    expect(app).toContain('from "./components/RouteEffects"');
  });
});
