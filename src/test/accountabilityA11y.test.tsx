import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import AccountabilitySection from "@/components/landing/AccountabilitySection";

describe("accountability section", () => {
  it("is a region named by its heading", () => {
    render(<AccountabilitySection />);
    expect(
      screen.getByRole("region", { name: "Know exactly who did what — always" }),
    ).toBeInTheDocument();
  });

  it("hides the decorative pulse dots in front of each benefit", () => {
    render(<AccountabilitySection />);
    const region = screen.getByRole("region", { name: "Know exactly who did what — always" });
    const benefit = within(region).getByText("Employee-wise work attribution").closest("li");
    expect(benefit).not.toBeNull();
    const dot = benefit!.firstElementChild as HTMLElement;
    expect(dot).toHaveAttribute("aria-hidden", "true");
    expect(benefit).toHaveTextContent(/^Employee-wise work attribution$/);
  });
});
