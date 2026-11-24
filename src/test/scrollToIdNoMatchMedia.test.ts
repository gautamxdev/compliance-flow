import { describe, it, expect, afterEach, vi } from "vitest";
import { prefersReducedMotion, scrollToId } from "@/lib/scrollToId";

const original = window.matchMedia;

describe("scrollToId without matchMedia", () => {
  afterEach(() => {
    window.matchMedia = original;
    document.body.innerHTML = "";
  });

  it("treats a missing matchMedia as no reduced-motion preference", () => {
    // Simulate a browser without matchMedia.
    window.matchMedia = undefined as unknown as typeof window.matchMedia;
    expect(prefersReducedMotion()).toBe(false);
  });

  it("still scrolls and focuses the target instead of throwing", () => {
    // Simulate a browser without matchMedia.
    window.matchMedia = undefined as unknown as typeof window.matchMedia;
    const el = document.createElement("section");
    el.id = "faq";
    el.scrollIntoView = vi.fn();
    el.focus = vi.fn();
    document.body.appendChild(el);

    expect(() => scrollToId("faq")).not.toThrow();
    expect(el.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
    expect(el.focus).toHaveBeenCalledWith({ preventScroll: true });
  });
});
