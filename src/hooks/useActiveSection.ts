import { useEffect, useRef, useState } from "react";

/**
 * Track which of the given section ids is currently in the reading band of
 * the viewport (just below the fixed header). Returns the id of the topmost
 * visible section, or null when none of them are on screen.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const visibleRef = useRef(new Set<string>());
  const key = ids.join("|");

  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      return;
    }

    const order = key.split("|").filter(Boolean);
    const nodes = order
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    if (nodes.length === 0) return;

    const visible = visibleRef.current;
    visible.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        setActiveId(order.find((id) => visible.has(id)) ?? null);
      },
      // Top inset clears the 4rem fixed header; bottom inset keeps the band
      // to the upper part of the screen so the highlight matches what's read.
      { rootMargin: "-80px 0px -55% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      visible.clear();
    };
  }, [key]);

  return activeId;
}
