import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToId } from "@/lib/scrollToId";

const DEFAULT_TITLE = "FirmOps — Structured Workspace for CA Firms";

const TITLES: Record<string, string> = {
  "/": DEFAULT_TITLE,
  "/privacy": "Privacy Policy · FirmOps",
  "/terms": "Terms of Use · FirmOps",
};

/**
 * Title for a pathname. The router matches routes case-insensitively and
 * ignores a trailing slash, so "/Privacy" and "/terms/" render real pages and
 * must not get the "Page not found" title.
 */
function titleForPath(pathname: string): string {
  const normalized = pathname.toLowerCase().replace(/\/+$/, "") || "/";
  return TITLES[normalized] ?? "Page not found · FirmOps";
}

/**
 * Section id a URL hash points at. Shared links arrive percent-encoded
 * ("#who%2Dits%2Dfor") or re-cased by hand ("#FAQ"), so decode the hash and,
 * when no element has that exact id, fall back to its lowercase form (every
 * landing section id is lowercase).
 */
function sectionIdFromHash(hash: string): string {
  const raw = hash.replace(/^#/, "");
  let id = raw;
  try {
    id = decodeURIComponent(raw);
  } catch {
    // Malformed escape: use the hash as typed.
  }
  if (!id || document.getElementById(id)) return id;
  return id.toLowerCase();
}

/** Keep the tab title and scroll position in sync with the active route. */
export function RouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.title = titleForPath(pathname);

    if (pathname === "/" && hash.replace(/^#/, "")) {
      // Defer until the landing sections are in the DOM.
      window.requestAnimationFrame(() => scrollToId(sectionIdFromHash(hash)));
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

export { DEFAULT_TITLE, TITLES, sectionIdFromHash, titleForPath };
