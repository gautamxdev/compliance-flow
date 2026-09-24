import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/scrollToId";

export function useInView(options?: IntersectionObserverInit) {
  const reduceMotion = prefersReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(reduceMotion);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, ...optionsRef.current }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}
