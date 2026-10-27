import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </MemoryRouter>,
  );

describe("legal page cross-links", () => {
  it("moves between Privacy and Terms without going home first", () => {
    renderAt("/privacy");
    const legalNav = screen.getByRole("navigation", { name: "Legal" });
    expect(legalNav).toContainElement(screen.getByRole("link", { name: "Back to home" }));

    fireEvent.click(screen.getByRole("link", { name: "Read the Terms of Use" }));
    expect(screen.getByRole("heading", { level: 1, name: "Terms of Use" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("link", { name: "Read the Privacy Policy" }));
    expect(screen.getByRole("heading", { level: 1, name: "Privacy Policy" })).toBeInTheDocument();
  });
});
