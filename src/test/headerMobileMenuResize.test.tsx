import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "@/components/landing/Header";

type Listener = (e: { matches: boolean }) => void;

describe("header mobile menu", () => {
  const original = window.matchMedia;
  let desktop = false;
  let listeners: Listener[] = [];

  beforeEach(() => {
    desktop = false;
    listeners = [];
    window.matchMedia = ((query: string) => ({
      matches: query === "(min-width: 768px)" ? desktop : false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: (_: string, fn: Listener) => {
        if (query === "(min-width: 768px)") listeners.push(fn);
      },
      removeEventListener: (_: string, fn: Listener) => {
        listeners = listeners.filter((l) => l !== fn);
      },
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = original;
  });

  it("closes when the viewport grows to desktop width", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("dialog", { name: "Menu" })).toBeInTheDocument();
    expect(listeners).toHaveLength(1);

    desktop = true;
    act(() => listeners.forEach((fn) => fn({ matches: true })));

    expect(screen.queryByRole("dialog", { name: "Menu" })).not.toBeInTheDocument();
    expect(listeners).toHaveLength(0);
  });
});
