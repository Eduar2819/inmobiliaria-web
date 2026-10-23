import { useEffect, useState } from 'react';

/**
 * True once the page has scrolled past `threshold` pixels.
 * Watches a 1px sentinel with IntersectionObserver instead of listening to every scroll frame.
 */
export function useScrolled(threshold = 30): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = `position:absolute;top:${threshold}px;left:0;width:1px;height:1px;pointer-events:none;`;
    document.body.prepend(sentinel);
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry?.isIntersecting));
    io.observe(sentinel);
    return () => {
      io.disconnect();
      sentinel.remove();
    };
  }, [threshold]);
  return scrolled;
}
