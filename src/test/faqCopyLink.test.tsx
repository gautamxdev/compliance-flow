import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FaqSection, { faqShareUrl } from "@/components/landing/FaqSection";

describe("FAQ copy link", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("builds an absolute link that targets the answer", () => {
    expect(faqShareUrl("faq-data", "https://firmops.in/?ref=x#faq")).toBe(
      "https://firmops.in/?ref=x#faq-data",
    );
  });

  it("copies the answer link and confirms it", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });

    render(
      <MemoryRouter initialEntries={["/#faq-tally"]}>
        <FaqSection />
      </MemoryRouter>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: /Copy link to this answer/i }),
    );

    await waitFor(() => expect(screen.getByText("Link copied")).toBeInTheDocument());
    expect(writeText).toHaveBeenCalledWith(expect.stringMatching(/#faq-tally$/));
    expect(screen.getByRole("status")).toHaveTextContent(/copied to clipboard/i);
  });
});
