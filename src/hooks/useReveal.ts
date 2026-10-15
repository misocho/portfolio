import { useEffect } from 'react';

/**
 * Progressive enhancement for scroll reveals. If the user prefers reduced
 * motion, we never enable the effect and content stays visible (see base.css).
 *
 * The reveal styles only apply once `.reveal-enabled` is present on <html>,
 * so there is no flash of hidden content before hydration, and content is
 * fully visible when JS is unavailable.
 */
export function useReveal(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add('reveal-enabled');

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (targets.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      root.classList.remove('reveal-enabled');
    };
  }, [enabled]);
}
