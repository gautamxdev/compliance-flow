import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import { decodePath } from "@/lib/decodePath";

describe("decodePath", () => {
  it("decodes percent-escapes so the path reads as typed", () => {
    expect(decodePath("/pricing%20plans")).toBe("/pricing plans");
    expect(decodePath("/%E0%A4%95%E0%A4%B0")).toBe("/कर");
  });

  it("leaves a malformed escape as it is instead of throwing", () => {
    expect(decodePath("/100%")).toBe("/100%");
    expect(decodePath("/%E0%A4")).toBe("/%E0%A4");
  });
});

describe("404 page missing path", () => {
  it("shows an encoded address decoded", () => {
    render(
      <MemoryRouter initialEntries={["/pricing%20plans"]}>
        <NotFound />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("missing-path")).toHaveTextContent("/pricing plans");
  });
});
