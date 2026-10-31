import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";

const searchBox = () => screen.getByRole("searchbox", { name: "Search filings by task or assignee" });
const clearButton = () => screen.queryByRole("button", { name: "Clear search text" });

describe("sample dashboard search clear button", () => {
  it("only shows while there is text, then clears and keeps focus in the box", () => {
    render(<HeroSection />);
    expect(clearButton()).toBeNull();

    fireEvent.change(searchBox(), { target: { value: "amit" } });
    expect(within(screen.getByRole("table")).getAllByTestId("task-name")).toHaveLength(1);

    fireEvent.click(clearButton()!);
    expect(searchBox()).toHaveValue("");
    expect(searchBox()).toHaveFocus();
    expect(within(screen.getByRole("table")).getAllByTestId("task-name")).toHaveLength(4);
    expect(clearButton()).toBeNull();
  });
});
