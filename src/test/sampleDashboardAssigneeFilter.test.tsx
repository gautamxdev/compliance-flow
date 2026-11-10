import { describe, it, expect, afterEach } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";

describe("sample dashboard assignee shortcut", () => {
  afterEach(() => {
    window.history.replaceState(null, "", "/");
  });

  it("narrows the table to one person's filings when their name is clicked", () => {
    render(<HeroSection />);
    const [rahul] = screen.getAllByRole("button", { name: "Show filings assigned to Rahul M." });
    fireEvent.click(rahul);
    expect(screen.getByRole("searchbox")).toHaveValue("Rahul M.");
    const names = within(screen.getByRole("table"))
      .getAllByTestId("task-name")
      .map((el) => el.textContent);
    expect(names).toEqual(["GST R1 - October", "Tax Audit"]);
    expect(window.location.search).toContain("q=Rahul+M.");
  });

  it("keeps the current filter while switching to the person", () => {
    render(<HeroSection />);
    fireEvent.click(screen.getByRole("button", { name: /^Open only/ }));
    fireEvent.click(screen.getByRole("button", { name: "Show filings assigned to Priya K." }));
    const names = within(screen.getByRole("table"))
      .getAllByTestId("task-name")
      .map((el) => el.textContent);
    expect(names).toEqual(["GST R1 - November"]);
  });
});
