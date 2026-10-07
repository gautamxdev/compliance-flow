import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import CTASection from "@/components/landing/CTASection";

describe("CTA copy email confirmation", () => {
  const writeText = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    vi.useFakeTimers();
    writeText.mockClear();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const click = async () => {
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /copy email|email copied/i }));
    });
  };

  it("announces the copy through a status region", async () => {
    render(<CTASection />);
    expect(screen.getByRole("status")).toBeEmptyDOMElement();

    await click();

    expect(writeText).toHaveBeenCalledWith("hello@compliancework.in");
    expect(screen.getByRole("status")).toHaveTextContent(
      "hello@compliancework.in copied to clipboard",
    );
    expect(screen.getByRole("button", { name: /email copied/i })).not.toHaveAttribute("aria-live");
  });

  it("restarts the confirmation window on a repeat click", async () => {
    render(<CTASection />);

    await click();
    act(() => vi.advanceTimersByTime(1500));
    await click();
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByRole("button", { name: /email copied/i })).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByRole("button", { name: /copy email/i })).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });

  it("clears the pending reset when the section unmounts", async () => {
    const { unmount } = render(<CTASection />);
    await click();
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
