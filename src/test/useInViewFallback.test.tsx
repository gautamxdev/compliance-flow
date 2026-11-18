import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useInView } from "@/hooks/useInView";

const Probe = () => {
  const { ref, visible } = useInView();
  return <div ref={ref}>{visible ? "shown" : "hidden"}</div>;
};

describe("useInView without IntersectionObserver", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows the content instead of crashing", () => {
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: false }));
    vi.stubGlobal("IntersectionObserver", undefined);
    render(<Probe />);
    expect(screen.getByText("shown")).toBeInTheDocument();
  });
});
