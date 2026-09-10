import { useEffect, useRef, useState } from "react";

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
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
