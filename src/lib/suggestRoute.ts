/** `key` is the URL word that points at the page; it defaults to the path without its leading slash. */
export type KnownPage = { path: string; label: string; key?: string };

/** Pages a mistyped or outdated link is most likely aiming for. */
export const KNOWN_PAGES: KnownPage[] = [
  { path: "/privacy", label: "Privacy Policy" },
  { path: "/terms", label: "Terms of Use" },
  // FAQ lives on the landing page, so old /faq links land on its section.
  { path: "/#faq", label: "FAQ", key: "faq" },
  // Demo requests and contact details live in the landing page's closing section.
  { path: "/#cta", label: "Request a demo", key: "demo" },
  { path: "/#cta", label: "Contact us", key: "contact" },
];

/** Classic edit distance; inputs here are short URL segments. */
function editDistance(a: string, b: string): number {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = row;
  }
  return prev[b.length];
}

/**
 * Best guess at the page a missing path meant: "/Privacy/", "/privacy-policy",
 * "/term", "/terms-of-use" and "/legal/terms_and_conditions" all point
 * somewhere real. Returns null when the path is not close to any known page.
 */
export function suggestPage(pathname: string, pages: KnownPage[] = KNOWN_PAGES): KnownPage | null {
  const segments = pathname.toLowerCase().split("/").filter(Boolean);
  if (segments.length === 0) return null;
  const words = segments.flatMap((segment) => segment.split(/[-_.\s]+|%20/).filter(Boolean));
  const candidates = [...segments, ...words];

  let best: { page: KnownPage; distance: number } | null = null;
  for (const page of pages) {
    const key = page.key ?? page.path.slice(1);
    if (candidates.includes(key) || candidates.includes(`${key}s`)) return page;
    const distance = Math.min(...candidates.map((word) => editDistance(word, key)));
    // Short keys like "faq" need a tighter limit, or any three-letter word would match.
    const limit = key.length <= 4 ? 1 : 2;
    if (distance <= limit && (!best || distance < best.distance)) best = { page, distance };
  }
  return best?.page ?? null;
}
