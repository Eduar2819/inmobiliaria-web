import { useCallback } from 'react';

/**
 * Scroll-reveal: returns a ref callback. The element fades up once it
 * enters the viewport (styles live in design-system/styles/motion.css).
 * Spread the returned props onto the element: `<div {...useReveal(120)}>`.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delayMs = 0) {
  const ref = useCallback(
    (el: T | null) => {
      if (!el) return;
      el.style.setProperty('--reveal-delay', `${delayMs}ms`);
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            (entry.target as HTMLElement).dataset.reveal = 'visible';
            io.unobserve(entry.target);
          }
        },
        { threshold: 0.12 },
      );
      io.observe(el);
      return () => io.disconnect();
    },
    [delayMs],
  );

  return { ref, 'data-reveal': 'hidden' } as const;
}
