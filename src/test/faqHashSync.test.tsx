import { describe, it, expect, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FaqSection, { faqHashFor } from "@/components/landing/FaqSection";

describe("FAQ hash sync", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/");
  });

  it("maps the open item to a shareable hash", () => {
    expect(faqHashFor("faq-data")).toBe("#faq-data");
    expect(faqHashFor(undefined)).toBe("#faq");
  });

  it("writes the opened answer's id to the URL and falls back to #faq when closed", () => {
    render(
      <MemoryRouter>
        <FaqSection />
      </MemoryRouter>,
    );
    const lengthBefore = window.history.length;
    const trigger = screen.getByRole("button", { name: /Who is FirmOps built for/i });

    fireEvent.click(trigger);
    expect(window.location.hash).toBe("#faq-who");

    fireEvent.click(trigger);
    expect(window.location.hash).toBe("#faq");
    expect(window.history.length).toBe(lengthBefore);
  });
});
