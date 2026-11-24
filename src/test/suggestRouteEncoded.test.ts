import { describe, it, expect } from "vitest";
import { suggestPage } from "@/lib/suggestRoute";

describe("404 suggestions for encoded links", () => {
  it("decodes percent-escapes before matching", () => {
    expect(suggestPage("/%50rivacy")?.path).toBe("/privacy");
    expect(suggestPage("/terms%2Dof%2Duse")?.path).toBe("/terms");
    expect(suggestPage("/%46%41%51")?.path).toBe("/#faq");
  });

  it("splits words joined with + the way form-encoded links write spaces", () => {
    expect(suggestPage("/privacy+policy")?.path).toBe("/privacy");
    expect(suggestPage("/book+a+demo")?.path).toBe("/#cta");
  });

  it("still matches other segments when one has a malformed escape", () => {
    expect(() => suggestPage("/%E0%A4")).not.toThrow();
    expect(suggestPage("/%E0%A4/privacy")?.path).toBe("/privacy");
  });
});
