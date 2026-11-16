import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import WhatThisIsNotSection from "@/components/landing/WhatThisIsNotSection";

describe("what this is not section", () => {
  it("is a region named by its heading that lists each before/after pair", () => {
    render(<WhatThisIsNotSection />);
    const region = screen.getByRole("region", { name: "Why firms outgrow folders and trackers" });
    const items = within(within(region).getByRole("list")).getAllByRole("listitem");
    expect(items).toHaveLength(4);
    expect(items[1]).toHaveTextContent("BeforeReplacing your books");
    expect(items[1]).toHaveTextContent("AfterWorks alongside Tally & Zoho");
  });
});
