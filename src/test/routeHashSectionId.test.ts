import { describe, it, expect, afterEach } from "vitest";
import { sectionIdFromHash } from "@/components/RouteEffects";

function addSection(id: string) {
  const el = document.createElement("section");
  el.id = id;
  document.body.appendChild(el);
}

describe("sectionIdFromHash", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("strips the leading # from a plain hash", () => {
    addSection("faq");
    expect(sectionIdFromHash("#faq")).toBe("faq");
  });

  it("decodes a percent-encoded hash", () => {
    addSection("who-its-for");
    expect(sectionIdFromHash("#who%2Dits%2Dfor")).toBe("who-its-for");
  });

  it("falls back to lowercase when the hash was re-cased", () => {
    addSection("faq");
    expect(sectionIdFromHash("#FAQ")).toBe("faq");
    expect(sectionIdFromHash("#Core-Idea")).toBe("core-idea");
  });

  it("keeps an exact match even when it has capitals", () => {
    addSection("Pricing");
    expect(sectionIdFromHash("#Pricing")).toBe("Pricing");
  });

  it("uses the hash as typed when it has a malformed escape", () => {
    expect(sectionIdFromHash("#faq%E0")).toBe("faq%e0");
  });
});
