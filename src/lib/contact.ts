/** Where demo requests and general questions go. */
export const CONTACT_EMAIL = "hello@compliancework.in";

const DEMO_SUBJECT = "FirmOps demo request";
const DEMO_BODY = "Hi FirmOps team,\n\nI'd like to request a demo for our CA firm.\n\nFirm name: \nCity: \n";

/** mailto: link with an encoded subject and body, so the address is only defined once. */
export function mailtoLink(subject?: string, body?: string, email: string = CONTACT_EMAIL): string {
  const params = [
    subject ? `subject=${encodeURIComponent(subject)}` : "",
    body ? `body=${encodeURIComponent(body)}` : "",
  ].filter(Boolean);
  return `mailto:${email}${params.length ? `?${params.join("&")}` : ""}`;
}

/** Pre-filled demo request email used by the closing call to action. */
export const DEMO_MAILTO = mailtoLink(DEMO_SUBJECT, DEMO_BODY);
