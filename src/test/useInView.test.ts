import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useInView } from "@/hooks/useInView";

describe("useInView", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("starts visible immediately when reduced motion is preferred", () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }) as unknown as typeof window.matchMedia;

    const observe = vi.fn();
    const disconnect = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn().mockImplementation(() => ({
        observe,
        disconnect,
        unobserve: vi.fn(),
      })),
    );

    const { result } = renderHook(() => useInView());
    expect(result.current.visible).toBe(true);
    expect(observe).not.toHaveBeenCalled();
  });
});
