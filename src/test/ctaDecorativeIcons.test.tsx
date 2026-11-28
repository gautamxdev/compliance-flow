import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";

const expectIconsHidden = (el: HTMLElement) => {
  const icons = el.querySelectorAll("svg");
  expect(icons.length).toBeGreaterThan(0);
  icons.forEach((svg) => expect(svg).toHaveAttribute("aria-hidden", "true"));
};

describe("decorative icons on header and hero buttons", () => {
  it("hides the header's dashboard arrow and menu icon from screen readers", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expectIconsHidden(screen.getByRole("button", { name: "View sample dashboard" }));
    expectIconsHidden(screen.getByRole("button", { name: "Open menu" }));
  });

  it("hides the hero's Request early access arrow from screen readers", () => {
    render(<HeroSection />);
    expectIconsHidden(screen.getByRole("button", { name: "Request early access" }));
  });
});
