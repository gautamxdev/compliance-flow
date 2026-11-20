import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "@/components/landing/Header";

type Callback = (entries: Partial<IntersectionObserverEntry>[]) => void;

describe("header sample dashboard link", () => {
  let callback: Callback | null = null;
  let sections: HTMLElement | null = null;
  const original = window.matchMedia;

  beforeEach(() => {
    callback = null;
    sections = document.createElement("div");
    sections.innerHTML =
      '<div id="sample-dashboard"></div><section id="problem"></section><section id="faq"></section>';
    document.body.appendChild(sections);
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn().mockImplementation((cb: Callback) => {
        callback = cb;
        return { observe: vi.fn(), disconnect: vi.fn(), unobserve: vi.fn() };
      }),
    );
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    window.matchMedia = original;
    sections?.remove();
  });

  const entry = (id: string, isIntersecting: boolean) => ({
    target: document.getElementById(id)!,
    isIntersecting,
  });

  const renderHeader = () =>
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

  it("marks the desktop button as the current location while the dashboard is in view", () => {
    renderHeader();
    const button = screen.getByRole("button", { name: "View sample dashboard" });
    expect(button).not.toHaveAttribute("aria-current");

    act(() => callback!([entry("sample-dashboard", true)]));
    expect(button).toHaveAttribute("aria-current", "location");

    act(() => callback!([entry("sample-dashboard", false), entry("problem", true)]));
    expect(button).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "The Problem" })).toHaveAttribute("aria-current", "location");
  });

  it("prefers the dashboard over a section below it when both are on screen", () => {
    renderHeader();
    act(() => callback!([entry("problem", true), entry("sample-dashboard", true)]));
    expect(screen.getByRole("button", { name: "View sample dashboard" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "The Problem" })).not.toHaveAttribute("aria-current");
  });

  it("highlights the dashboard item in the mobile menu", () => {
    renderHeader();
    act(() => callback!([entry("sample-dashboard", true)]));
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const mobileNav = screen.getByRole("navigation", { name: "Mobile" });
    const item = Array.from(mobileNav.querySelectorAll("button")).find(
      (b) => b.textContent === "View sample dashboard",
    )!;
    expect(item).toHaveAttribute("aria-current", "location");
  });
});
