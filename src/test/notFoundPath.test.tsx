import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";

describe("404 page", () => {
  it("shows the address that could not be found", () => {
    render(
      <MemoryRouter initialEntries={["/pricing/annual"]}>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("This page doesn't exist");
    expect(screen.getByTestId("missing-path")).toHaveTextContent("/pricing/annual");
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
  });
});
