/** Smooth-scroll to an element by id, honoring prefers-reduced-motion. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
    block: "center",
  });
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
