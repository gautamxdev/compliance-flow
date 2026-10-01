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

  it("scrolls to the start and focuses the target", () => {
    const el = document.createElement("div");
    el.id = "cta";
    el.scrollIntoView = vi.fn();
    el.focus = vi.fn();
    document.body.appendChild(el);

    window.matchMedia = vi.fn().mockReturnValue({ matches: false }) as unknown as typeof window.matchMedia;
    scrollToId("cta");
    expect(el.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
    expect(el.getAttribute("tabindex")).toBe("-1");
    expect(el.focus).toHaveBeenCalledWith({ preventScroll: true });

    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as unknown as typeof window.matchMedia;
    scrollToId("cta");
    expect(el.scrollIntoView).toHaveBeenLastCalledWith({ behavior: "auto", block: "start" });
  });

  it("does not overwrite an existing tabindex", () => {
    const el = document.createElement("div");
    el.id = "faq";
    el.setAttribute("tabindex", "0");
    el.scrollIntoView = vi.fn();
    el.focus = vi.fn();
    document.body.appendChild(el);

    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as unknown as typeof window.matchMedia;
    scrollToId("faq");
    expect(el.getAttribute("tabindex")).toBe("0");
    expect(el.focus).toHaveBeenCalledWith({ preventScroll: true });
  });

  it("reports prefers-reduced-motion from matchMedia", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as unknown as typeof window.matchMedia;
    expect(prefersReducedMotion()).toBe(true);
    window.matchMedia = vi.fn().mockReturnValue({ matches: false }) as unknown as typeof window.matchMedia;
    expect(prefersReducedMotion()).toBe(false);
  });
});
