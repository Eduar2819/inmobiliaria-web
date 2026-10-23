import { useCallback, useState } from 'react';
import { prefersReducedMotion } from './prefersReducedMotion';

/**
 * Counts from 0 to `target` with an ease-out cubic once the element is visible.
 * Returns the ref to attach and the formatted value to render.
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(target: number, durationMs = 1600) {
  const [value, setValue] = useState(target);

  const ref = useCallback(
    (el: T | null) => {
      if (!el || prefersReducedMotion()) return;
      let frame = 0;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          io.disconnect();
          const t0 = performance.now();
          const step = (now: number) => {
            const k = Math.min(1, (now - t0) / durationMs);
            setValue(Math.round(target * (1 - Math.pow(1 - k, 3))));
            if (k < 1) frame = requestAnimationFrame(step);
          };
          frame = requestAnimationFrame(step);
        },
        { threshold: 0.12 },
      );
      io.observe(el);
      return () => {
        io.disconnect();
        cancelAnimationFrame(frame);
      };
    },
    [target, durationMs],
  );

  return { ref, value: value.toLocaleString('en-US') };
}
