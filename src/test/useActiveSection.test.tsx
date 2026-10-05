import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useActiveSection } from "@/hooks/useActiveSection";

type Callback = (entries: Partial<IntersectionObserverEntry>[]) => void;

describe("useActiveSection", () => {
  let callback: Callback | null = null;
  const observe = vi.fn();
  const disconnect = vi.fn();

  beforeEach(() => {
    callback = null;
    observe.mockClear();
    disconnect.mockClear();
    document.body.innerHTML =
      '<section id="problem"></section><section id="who-its-for"></section><section id="faq"></section>';
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn().mockImplementation((cb: Callback) => {
        callback = cb;
        return { observe, disconnect, unobserve: vi.fn() };
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  const entry = (id: string, isIntersecting: boolean) => ({
    target: document.getElementById(id)!,
    isIntersecting,
  });

  it("observes every section that exists on the page", () => {
    renderHook(() => useActiveSection(["problem", "who-its-for", "faq", "missing"]));
    expect(observe).toHaveBeenCalledTimes(3);
  });

  it("reports the topmost visible section in nav order", () => {
    const { result } = renderHook(() => useActiveSection(["problem", "who-its-for", "faq"]));
    expect(result.current).toBeNull();

    act(() => callback!([entry("faq", true), entry("who-its-for", true)]));
    expect(result.current).toBe("who-its-for");

    act(() => callback!([entry("who-its-for", false)]));
    expect(result.current).toBe("faq");

    act(() => callback!([entry("faq", false)]));
    expect(result.current).toBeNull();
  });

  it("disconnects the observer on unmount", () => {
    const { unmount } = renderHook(() => useActiveSection(["problem"]));
    unmount();
    expect(disconnect).toHaveBeenCalled();
  });
});
