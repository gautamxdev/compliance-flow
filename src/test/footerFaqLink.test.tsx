import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "@/components/landing/Footer";

describe("footer FAQ link", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("scrolls to the FAQ section and moves focus there without a page jump", () => {
    const faq = document.createElement("section");
    faq.id = "faq";
    const scrollIntoView = vi.fn();
    faq.scrollIntoView = scrollIntoView;
    document.body.appendChild(faq);

    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: "FAQ" });
    expect(link).toHaveAttribute("href", "#faq");
    const notPrevented = fireEvent.click(link);

    expect(notPrevented).toBe(false);
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(faq);
  });
});
