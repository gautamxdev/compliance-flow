import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import NotFound from "@/pages/NotFound";

const renderAt = (ui: React.ReactElement) =>
  render(<MemoryRouter initialEntries={["/"]}>{ui}</MemoryRouter>);

describe("FirmOps logo accessible names", () => {
  it("names the header home link once, not 'FirmOps FirmOps'", () => {
    renderAt(<Header />);
    expect(screen.getByRole("link", { name: "FirmOps" })).toHaveAttribute("href", "/");
  });

  it("names the 404 home link once", () => {
    renderAt(<NotFound />);
    expect(screen.getByRole("link", { name: "FirmOps" })).toHaveAttribute("href", "/");
  });

  it("treats the footer logo mark as decorative next to the wordmark", () => {
    renderAt(<Footer />);
    expect(screen.queryByRole("img", { name: "FirmOps" })).toBeNull();
    expect(screen.getByText("FirmOps", { selector: "span" })).toBeInTheDocument();
  });
});
