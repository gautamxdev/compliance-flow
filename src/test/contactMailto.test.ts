import { describe, it, expect } from "vitest";
import { CONTACT_EMAIL, DEMO_MAILTO, mailtoLink } from "@/lib/contact";

describe("contact mailto links", () => {
  it("builds a bare mailto when there is no subject or body", () => {
    expect(mailtoLink()).toBe(`mailto:${CONTACT_EMAIL}`);
  });

  it("encodes subject and body so mail apps keep line breaks and apostrophes", () => {
    expect(mailtoLink("A & B", "Line 1\nIt's")).toBe(
      `mailto:${CONTACT_EMAIL}?subject=A%20%26%20B&body=Line%201%0AIt's`,
    );
  });

  it("keeps the demo request pre-filled with the firm details prompt", () => {
    const url = new URL(DEMO_MAILTO);
    expect(url.protocol).toBe("mailto:");
    expect(url.pathname).toBe(CONTACT_EMAIL);
    const body = decodeURIComponent(DEMO_MAILTO.split("body=")[1]);
    expect(decodeURIComponent(DEMO_MAILTO.split("subject=")[1].split("&")[0])).toBe("FirmOps demo request");
    expect(body).toContain("Firm name:");
    expect(body).toContain("City:");
  });
});
