import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("merges class names and drops falsy values", () => {
    expect(cn("px-2", false && "hidden", "text-sm")).toContain("px-2");
    expect(cn("px-2", "px-4")).toContain("px-4");
  });
});
