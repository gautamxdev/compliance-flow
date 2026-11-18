import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import { CONTACT_EMAIL } from "@/lib/contact";

const renderPage = (page: JSX.Element) => render(<MemoryRouter>{page}</MemoryRouter>);

describe("legal page contact links", () => {
  it("opens a deletion request email from the Privacy Policy", () => {
    renderPage(<Privacy />);
    const link = screen.getByRole("link", { name: CONTACT_EMAIL });
    const href = link.getAttribute("href") ?? "";
    expect(href.startsWith(`mailto:${CONTACT_EMAIL}?`)).toBe(true);
    expect(decodeURIComponent(href.split("subject=")[1])).toBe("Personal data deletion request");
  });

  it("points Terms questions at the shared contact email", () => {
    renderPage(<Terms />);
    expect(screen.getByRole("link", { name: CONTACT_EMAIL })).toHaveAttribute(
      "href",
      `mailto:${CONTACT_EMAIL}`,
    );
  });
});
