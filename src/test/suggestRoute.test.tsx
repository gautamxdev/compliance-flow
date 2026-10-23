import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import { suggestPage } from "@/lib/suggestRoute";

describe("404 page suggestions", () => {
  it("maps near-miss paths to the page they were aiming for", () => {
    expect(suggestPage("/Privacy/")?.path).toBe("/privacy");
    expect(suggestPage("/privacy-policy")?.path).toBe("/privacy");
    expect(suggestPage("/privcy")?.path).toBe("/privacy");
    expect(suggestPage("/term")?.path).toBe("/terms");
    expect(suggestPage("/terms-of-use")?.path).toBe("/terms");
    expect(suggestPage("/legal/terms_and_conditions")?.path).toBe("/terms");
  });

  it("stays quiet for unrelated or empty paths", () => {
    expect(suggestPage("/")).toBeNull();
    expect(suggestPage("/pricing")).toBeNull();
    expect(suggestPage("/blog/gst-due-dates")).toBeNull();
  });

  it("links the suggestion from the 404 page", () => {
    render(
      <MemoryRouter initialEntries={["/privacy-policy"]}>
        <NotFound />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/privacy");
  });

  it("shows no suggestion when nothing is close", () => {
    render(
      <MemoryRouter initialEntries={["/pricing"]}>
        <NotFound />
      </MemoryRouter>,
    );
    expect(screen.queryByTestId("route-suggestion")).toBeNull();
  });
});
