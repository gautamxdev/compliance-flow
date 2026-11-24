import { describe, it, expect, afterEach, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { onMediaQueryChange } from "@/lib/mediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const original = window.matchMedia;

/** A MediaQueryList as old Safari ships it: addListener only, no addEventListener. */
function installLegacyMatchMedia(initial: boolean) {
  let matches = initial;
  const listeners = new Set<() => void>();
  window.matchMedia = ((query: string) => ({
    get matches() {
      return matches;
    },
    media: query,
    addListener: (cb: () => void) => listeners.add(cb),
    removeListener: (cb: () => void) => listeners.delete(cb),
  })) as unknown as typeof window.matchMedia;
  return {
    set(next: boolean) {
      matches = next;
      listeners.forEach((cb) => cb());
    },
    listenerCount: () => listeners.size,
  };
}

const Probe = () => <p data-testid="probe">{usePrefersReducedMotion() ? "reduce" : "motion"}</p>;

describe("onMediaQueryChange", () => {
  afterEach(() => {
    window.matchMedia = original;
  });

  it("uses addEventListener when the browser has it", () => {
    const mql = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
    } as unknown as MediaQueryList;
    const cb = vi.fn();
    const off = onMediaQueryChange(mql, cb);
    expect(mql.addEventListener).toHaveBeenCalledWith("change", cb);
    expect(mql.addListener).not.toHaveBeenCalled();
    off();
    expect(mql.removeEventListener).toHaveBeenCalledWith("change", cb);
  });

  it("does nothing when neither listener API exists", () => {
    expect(() => onMediaQueryChange({} as MediaQueryList, vi.fn())()).not.toThrow();
  });

  it("lets usePrefersReducedMotion follow the OS setting on addListener-only browsers", () => {
    const media = installLegacyMatchMedia(false);
    const { unmount } = render(<Probe />);
    expect(screen.getByTestId("probe")).toHaveTextContent("motion");

    act(() => media.set(true));
    expect(screen.getByTestId("probe")).toHaveTextContent("reduce");

    unmount();
    expect(media.listenerCount()).toBe(0);
  });
});
