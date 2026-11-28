import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";

const tiltCard = () => screen.getByRole("table").closest("[style*='rotateX']") as HTMLElement;

const RECT = {
  left: 0,
  top: 0,
  width: 200,
  height: 100,
  right: 200,
  bottom: 100,
  x: 0,
  y: 0,
  toJSON: () => ({}),
};

// jsdom has no PointerEvent, so pointerType would be dropped from fired events.
class TestPointerEvent extends MouseEvent {
  pointerType: string;
  constructor(type: string, init: PointerEventInit = {}) {
    super(type, init);
    this.pointerType = init.pointerType ?? "";
  }
}

describe("hero dashboard tilt on touch screens", () => {
  beforeEach(() => {
    vi.stubGlobal("PointerEvent", TestPointerEvent);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("ignores the emulated mouse events that follow a tap", () => {
    const raf = vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 1);
    render(<HeroSection />);
    const card = tiltCard();
    vi.spyOn(card, "getBoundingClientRect").mockReturnValue(RECT);

    fireEvent.pointerDown(card, { pointerType: "touch" });
    fireEvent.mouseEnter(card);
    fireEvent.mouseMove(card, { clientX: 200, clientY: 50 });

    expect(raf).not.toHaveBeenCalled();
    expect(card.style.transform).toBe("rotateX(0deg) rotateY(0deg)");
    expect(card.style.background).not.toContain("radial-gradient");
  });

  it("tilts again once a real mouse moves over the card", () => {
    const frames: FrameRequestCallback[] = [];
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb: FrameRequestCallback) => {
      frames.push(cb);
      return frames.length;
    });
    render(<HeroSection />);
    const card = tiltCard();
    vi.spyOn(card, "getBoundingClientRect").mockReturnValue(RECT);

    fireEvent.pointerDown(card, { pointerType: "touch" });
    fireEvent.pointerMove(card, { pointerType: "mouse" });
    fireEvent.mouseEnter(card);
    fireEvent.mouseMove(card, { clientX: 200, clientY: 50 });

    expect(frames).toHaveLength(1);
    act(() => frames[0](0));
    expect(card.style.transform).toBe("rotateX(0deg) rotateY(4deg)");
  });
});
