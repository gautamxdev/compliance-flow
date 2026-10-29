import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import { formatLegalDate, legalIsoDate } from "@/lib/legal";

describe("legal pages last-updated date", () => {
  it("formats the revision date in long and machine-readable forms", () => {
    const date = new Date(2026, 8, 20);
    expect(formatLegalDate(date)).toBe("20 September 2026");
    expect(legalIsoDate(date)).toBe("2026-09-20");
  });

  it.each([
    ["Privacy", Privacy],
    ["Terms", Terms],
  ])("marks the %s revision date up as a <time>", (_name, Page) => {
    render(
      <MemoryRouter>
        <Page />
      </MemoryRouter>,
    );
    const time = screen.getByTestId("legal-last-updated");
    expect(time.tagName).toBe("TIME");
    expect(time).toHaveAttribute("dateTime", "2026-09-20");
    expect(time).toHaveTextContent("20 September 2026");
  });
});
