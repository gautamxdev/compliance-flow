/** Smooth-scroll to an element by id, honoring prefers-reduced-motion. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });

  // Ensure keyboard/screen-reader focus follows the scroll destination.
  if (!el.hasAttribute("tabindex")) {
    el.setAttribute("tabindex", "-1");
  }
  el.focus({ preventScroll: true });
}

/**
 * True when the visitor asked the OS for reduced motion. Browsers and embedded
 * webviews without matchMedia are treated as "no preference" instead of
 * throwing, so navigation clicks still scroll.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
