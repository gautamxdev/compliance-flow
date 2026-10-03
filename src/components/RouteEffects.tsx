import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToId } from "@/lib/scrollToId";

const DEFAULT_TITLE = "FirmOps — Structured Workspace for CA Firms";

const TITLES: Record<string, string> = {
  "/": DEFAULT_TITLE,
  "/privacy": "Privacy Policy · FirmOps",
  "/terms": "Terms of Use · FirmOps",
};

/** Keep the tab title and scroll position in sync with the active route. */
export function RouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.title = TITLES[pathname] ?? "Page not found · FirmOps";

    const id = hash.replace(/^#/, "");
    if (pathname === "/" && id) {
      // Defer until the landing sections are in the DOM.
      window.requestAnimationFrame(() => scrollToId(id));
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

export { DEFAULT_TITLE, TITLES };
