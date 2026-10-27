import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";

describe("sample dashboard due sort hint", () => {
  it("describes what the next click on Due will do", () => {
    render(<HeroSection />);
    const button = screen.getByRole("button", { name: "Due" });
    expect(button).toHaveAccessibleDescription("Click to sort by due date, earliest first.");

    fireEvent.click(button);
    expect(button).toHaveAccessibleDescription("Click to sort by due date, latest first.");

    fireEvent.click(button);
    expect(button).toHaveAccessibleDescription("Click to restore the default order.");

    fireEvent.click(button);
    expect(button).toHaveAccessibleDescription("Click to sort by due date, earliest first.");
  });
});
