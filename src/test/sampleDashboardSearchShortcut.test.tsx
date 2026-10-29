import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";

const search = () => screen.getByRole("searchbox", { name: "Search filings by task or assignee" });

describe("sample dashboard search shortcut", () => {
  it("focuses the search box when / is pressed on the page", () => {
    render(<HeroSection />);

    expect(search()).toHaveAttribute("aria-keyshortcuts", "/");
    fireEvent.keyDown(document.body, { key: "/" });
    expect(search()).toHaveFocus();
    // The slash itself must not land in the box.
    expect(search()).toHaveValue("");
  });

  it("leaves / alone while typing in another field or with modifiers", () => {
    render(
      <>
        <input aria-label="Other field" />
        <HeroSection />
      </>,
    );

    const other = screen.getByRole("textbox", { name: "Other field" });
    other.focus();
    fireEvent.keyDown(other, { key: "/" });
    expect(other).toHaveFocus();

    other.blur();
    fireEvent.keyDown(document.body, { key: "/", ctrlKey: true });
    expect(search()).not.toHaveFocus();
  });
});
