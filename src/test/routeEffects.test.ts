import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { DEFAULT_TITLE, TITLES, titleForPath } from "@/components/RouteEffects";

describe("RouteEffects", () => {
  it("maps known routes to FirmOps page titles", () => {
    expect(TITLES["/"]).toBe(DEFAULT_TITLE);
    expect(TITLES["/privacy"]).toContain("Privacy");
    expect(TITLES["/terms"]).toContain("Terms");
    expect(DEFAULT_TITLE).toContain("FirmOps");
  });

  it("titles case and trailing-slash variants the router still renders", () => {
    expect(titleForPath("/Privacy")).toBe(TITLES["/privacy"]);
    expect(titleForPath("/terms/")).toBe(TITLES["/terms"]);
    expect(titleForPath("/TERMS//")).toBe(TITLES["/terms"]);
    expect(titleForPath("/")).toBe(DEFAULT_TITLE);
    expect(titleForPath("/pricing")).toBe("Page not found · FirmOps");
  });

  it("is mounted inside the router in App", () => {
    const app = readFileSync(resolve(__dirname, "../App.tsx"), "utf8");
    expect(app).toContain("RouteEffects");
    expect(app).toContain('from "./components/RouteEffects"');
  });
});
