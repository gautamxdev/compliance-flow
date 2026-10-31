import { describe, it, expect, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";

const robots = () => document.head.querySelector('meta[name="robots"]');

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <NotFound />
    </MemoryRouter>,
  );

describe("404 page robots meta", () => {
  afterEach(() => {
    robots()?.remove();
  });

  it("adds noindex while shown and removes it on leave", () => {
    const { unmount } = renderAt("/pricing");
    expect(robots()).toHaveAttribute("content", "noindex");
    unmount();
    expect(robots()).toBeNull();
  });

  it("restores an existing robots tag", () => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "index, follow";
    document.head.appendChild(meta);

    const { unmount } = renderAt("/nope");
    expect(robots()).toHaveAttribute("content", "noindex");
    unmount();
    expect(robots()).toHaveAttribute("content", "index, follow");
  });
});
