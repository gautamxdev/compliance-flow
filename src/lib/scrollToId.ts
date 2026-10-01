/** Smooth-scroll to an element by id, honoring prefers-reduced-motion. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
    block: "start",
  });

  // Ensure keyboard/screen-reader focus follows the scroll destination.
  if (!el.hasAttribute("tabindex")) {
    el.setAttribute("tabindex", "-1");
  }
  el.focus({ preventScroll: true });
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
