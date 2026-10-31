import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";

describe("sample dashboard client list", () => {
  it("marks the client shown in the table as current", () => {
    render(<HeroSection />);
    const list = screen.getByRole("list", { name: "Clients" });
    const items = within(list).getAllByRole("listitem");

    expect(items.map((li) => li.textContent)).toEqual([
      "Sharma Enterprises",
      "Patel Industries",
      "Kumar & Sons",
    ]);
    expect(items[0]).toHaveAttribute("aria-current", "true");
    expect(items[1]).not.toHaveAttribute("aria-current");
    expect(items[2]).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(/^Sharma Enterprises — FY/);
  });
});
