import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FaqSection, { faqIdFromHash } from "@/components/landing/FaqSection";

describe("FAQ hash deep links", () => {
  it("maps known hashes to FAQ item ids", () => {
    expect(faqIdFromHash("#faq-early-access")).toBe("faq-early-access");
    expect(faqIdFromHash("faq-data")).toBe("faq-data");
    expect(faqIdFromHash("#faq-missing")).toBeUndefined();
    expect(faqIdFromHash("")).toBeUndefined();
  });

  it("opens the matching FAQ answer when the URL hash targets it", () => {
    render(
      <MemoryRouter initialEntries={["/#faq-early-access"]}>
        <FaqSection />
      </MemoryRouter>,
    );

    const trigger = screen.getByRole("button", { name: /How does early access work/i });
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(screen.getByText(/no paid subscription during early access/i)).toBeVisible();
  });

  it("leaves FAQs collapsed when the hash is unrelated", () => {
    render(
      <MemoryRouter initialEntries={["/#problem"]}>
        <FaqSection />
      </MemoryRouter>,
    );

    for (const trigger of screen.getAllByRole("button")) {
      if (trigger.getAttribute("data-state")) {
        expect(trigger).toHaveAttribute("data-state", "closed");
      }
    }
  });
});
