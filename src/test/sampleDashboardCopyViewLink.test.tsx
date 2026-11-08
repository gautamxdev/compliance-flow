import { describe, it, expect, afterEach, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import HeroSection from "@/components/landing/HeroSection";
import { dashboardViewUrl } from "@/lib/sampleDashboard";

describe("dashboardViewUrl", () => {
  it("points at the sample dashboard with the view in the query", () => {
    expect(
      dashboardViewUrl({ scope: "overdue", sort: "asc", query: "" }, "https://firmops.in/?ref=x#faq"),
    ).toBe("https://firmops.in/?ref=x&filter=overdue&due=asc#sample-dashboard");
    expect(dashboardViewUrl({ scope: "all", sort: "none", query: "" }, "https://firmops.in/")).toBe(
      "https://firmops.in/#sample-dashboard",
    );
  });
});

describe("sample dashboard Copy link", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("copies a link to the current view and confirms it", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });

    render(<HeroSection />);
    fireEvent.click(screen.getByRole("button", { name: "Open only" }));
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "gst" } });
    fireEvent.click(screen.getByRole("button", { name: "Copy link to this view" }));

    await waitFor(() => expect(screen.getByText("Link copied")).toBeInTheDocument());
    expect(writeText).toHaveBeenCalledWith(
      expect.stringMatching(/\/\?filter=open&q=gst#sample-dashboard$/),
    );
    expect(screen.getByRole("status")).toHaveTextContent(/copied to clipboard/i);
  });

  it("falls back to a prompt when the clipboard is unavailable", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    const prompt = vi.spyOn(window, "prompt").mockReturnValue(null);

    render(<HeroSection />);
    fireEvent.click(screen.getByRole("button", { name: "Copy link to this view" }));

    await waitFor(() => expect(prompt).toHaveBeenCalled());
    expect(prompt.mock.calls[0][1]).toMatch(/#sample-dashboard$/);
    expect(screen.queryByText("Link copied")).toBeNull();
  });
});
