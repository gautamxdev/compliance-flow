import { describe, it, expect, beforeEach, vi } from "vitest";
import { prefersReducedMotion, scrollToId } from "@/lib/scrollToId";

describe("scrollToId", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("no-ops when the target id is missing", () => {
    expect(() => scrollToId("missing")).not.toThrow();
  });

  it("scrolls smoothly unless reduced motion is preferred", () => {
    const el = document.createElement("div");
    el.id = "cta";
    el.scrollIntoView = vi.fn();
    document.body.appendChild(el);

    window.matchMedia = vi.fn().mockReturnValue({ matches: false }) as unknown as typeof window.matchMedia;
    scrollToId("cta");
    expect(el.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "center" });

    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as unknown as typeof window.matchMedia;
    scrollToId("cta");
    expect(el.scrollIntoView).toHaveBeenLastCalledWith({ behavior: "auto", block: "center" });
  });

  it("reports prefers-reduced-motion from matchMedia", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as unknown as typeof window.matchMedia;
    expect(prefersReducedMotion()).toBe(true);
    window.matchMedia = vi.fn().mockReturnValue({ matches: false }) as unknown as typeof window.matchMedia;
    expect(prefersReducedMotion()).toBe(false);
  });
});
