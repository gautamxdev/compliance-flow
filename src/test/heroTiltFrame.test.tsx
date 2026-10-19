import { describe, it, expect, afterEach, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";

const tiltCard = () => screen.getByRole("table").closest("[style*='rotateX']") as HTMLElement;

describe("hero dashboard tilt", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("coalesces rapid mouse moves into one update per animation frame", () => {
    const frames: FrameRequestCallback[] = [];
    const raf = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb: FrameRequestCallback) => {
        frames.push(cb);
        return frames.length;
      });

    render(<HeroSection />);
    const card = tiltCard();
    vi.spyOn(card, "getBoundingClientRect").mockReturnValue({
      left: 0,
      top: 0,
      width: 200,
      height: 100,
      right: 200,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    fireEvent.mouseEnter(card);
    fireEvent.mouseMove(card, { clientX: 10, clientY: 10 });
    fireEvent.mouseMove(card, { clientX: 50, clientY: 50 });
    fireEvent.mouseMove(card, { clientX: 200, clientY: 50 });

    expect(raf).toHaveBeenCalledTimes(1);
    expect(card.style.transform).toBe("rotateX(0deg) rotateY(0deg)");

    // The frame uses the latest pointer position (right edge, vertical middle).
    act(() => frames[0](0));
    expect(card.style.transform).toBe("rotateX(0deg) rotateY(4deg)");
  });

  it("drops a queued frame when the pointer leaves", () => {
    const cancel = vi.spyOn(window, "cancelAnimationFrame");
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 7);

    render(<HeroSection />);
    const card = tiltCard();

    fireEvent.mouseMove(card, { clientX: 10, clientY: 10 });
    fireEvent.mouseLeave(card);

    expect(cancel).toHaveBeenCalledWith(7);
    expect(card.style.transform).toBe("rotateX(0deg) rotateY(0deg)");
  });
});
