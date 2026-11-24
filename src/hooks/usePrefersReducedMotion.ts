import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/scrollToId";
import { onMediaQueryChange } from "@/lib/mediaQuery";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Live prefers-reduced-motion flag. Unlike a one-off read during render, this
 * updates when the visitor flips the OS setting while the page is open.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(prefersReducedMotion);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(QUERY);
    const onChange = () => setReduce(mql.matches);
    onChange();
    return onMediaQueryChange(mql, onChange);
  }, []);

  return reduce;
}
