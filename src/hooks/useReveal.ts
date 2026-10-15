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

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (targets.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    // The production build is pre-rendered, so content is visible before this
    // effect runs. Mark anything already on screen as visible *before* enabling
    // the reveal styles, otherwise it would fade out and back in on hydration.
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportHeight && rect.bottom > 0) el.classList.add('is-visible');
    });

    root.classList.add('reveal-enabled');

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
