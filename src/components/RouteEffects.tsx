import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_TITLE = "FirmOps — Structured Workspace for CA Firms";

const TITLES: Record<string, string> = {
  "/": DEFAULT_TITLE,
  "/privacy": "Privacy Policy · FirmOps",
  "/terms": "Terms of Use · FirmOps",
};

/** Keep the tab title and scroll position in sync with the active route. */
export function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = TITLES[pathname] ?? "Page not found · FirmOps";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export { DEFAULT_TITLE, TITLES };
