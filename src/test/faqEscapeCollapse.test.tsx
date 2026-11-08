import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FaqSection from "@/components/landing/FaqSection";

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <FaqSection />
    </MemoryRouter>,
  );

describe("FAQ Escape", () => {
  it("collapses the open answer and returns focus to its question", () => {
    window.history.replaceState(null, "", "/#faq-data");
    renderAt("/#faq-data");
    const trigger = screen.getByRole("button", { name: /client data stay under our control/i });
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(screen.getByRole("button", { name: /Copy link to this answer/i }), { key: "Escape" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
    expect(window.location.hash).toBe("#faq");
  });

  it("does nothing when every answer is already closed", () => {
    renderAt("/");
    const trigger = screen.getByRole("button", { name: /replacement for Tally/i });
    trigger.focus();
    const event = fireEvent.keyDown(trigger, { key: "Escape" });

    expect(event).toBe(true);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
