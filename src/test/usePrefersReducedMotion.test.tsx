import { describe, it, expect, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import CTASection from "@/components/landing/CTASection";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const original = window.matchMedia;

function installMatchMedia(initial: boolean) {
  let matches = initial;
  const listeners = new Set<() => void>();
  window.matchMedia = ((query: string) => ({
    get matches() {
      return matches;
    },
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: (_: string, cb: () => void) => listeners.add(cb),
    removeEventListener: (_: string, cb: () => void) => listeners.delete(cb),
    dispatchEvent: () => true,
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

describe("usePrefersReducedMotion", () => {
  afterEach(() => {
    window.matchMedia = original;
  });

  it("follows changes to the OS setting and unsubscribes on unmount", () => {
    const media = installMatchMedia(false);
    const { unmount } = render(<Probe />);
    expect(screen.getByTestId("probe")).toHaveTextContent("motion");

    act(() => media.set(true));
    expect(screen.getByTestId("probe")).toHaveTextContent("reduce");

    act(() => media.set(false));
    expect(screen.getByTestId("probe")).toHaveTextContent("motion");

    unmount();
    expect(media.listenerCount()).toBe(0);
  });

  it("drops the CTA shimmer once reduced motion is switched on", () => {
    const media = installMatchMedia(false);
    const { container } = render(<CTASection />);
    const link = screen.getByRole("link", { name: "Request a demo" });
    expect(link.querySelector('[aria-hidden="true"]')).not.toBeNull();

    act(() => media.set(true));
    expect(link.querySelector('[aria-hidden="true"]')).toBeNull();
    expect(container.innerHTML).not.toContain("animate-pulse");
  });
});
