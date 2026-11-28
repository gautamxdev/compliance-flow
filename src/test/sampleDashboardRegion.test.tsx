import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";

describe("sample dashboard region", () => {
  it("is a region named by its window title that holds the filings table", () => {
    render(<HeroSection />);
    const region = screen.getByRole("region", { name: "FirmOps — Sample client dashboard" });
    expect(region).toHaveAttribute("id", "sample-dashboard");
    expect(within(region).getByRole("table")).toBeInTheDocument();
  });

  it("hides the decorative window controls from screen readers", () => {
    render(<HeroSection />);
    const title = document.getElementById("sample-dashboard-title") as HTMLElement;
    const controls = title.parentElement?.previousElementSibling as HTMLElement;
    expect(controls.children).toHaveLength(3);
    expect(controls).toHaveAttribute("aria-hidden", "true");
  });
});
