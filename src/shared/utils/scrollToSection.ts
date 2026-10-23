import { prefersReducedMotion } from '../hooks/prefersReducedMotion';

/** Smooth-scrolls to a section id, leaving room for the sticky nav. */
export function scrollToSection(id: string, offset = 60): void {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}
