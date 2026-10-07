import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "@/components/landing/Header";

describe("header logo on the landing page", () => {
  let scrollTo: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    scrollTo = vi.fn();
    vi.stubGlobal("scrollTo", scrollTo);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const renderAt = (entry: string) =>
    render(
      <MemoryRouter initialEntries={[entry]}>
        <Header />
      </MemoryRouter>,
    );

  it("scrolls back to the top when already on the landing page", () => {
    renderAt("/");
    fireEvent.click(screen.getByRole("link", { name: "FirmOps" }));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "smooth" });
  });

  it("leaves hash navigation to the route effects", () => {
    renderAt("/#faq");
    fireEvent.click(screen.getByRole("link", { name: "FirmOps" }));
    expect(scrollTo).not.toHaveBeenCalled();
  });
});
