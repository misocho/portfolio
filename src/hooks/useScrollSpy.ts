import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view for the nav.
 * Uses a thin band near the middle of the viewport so the active item changes
 * when a section actually takes over the screen, not when it merely appears.
 */
export function useScrollSpy(ids: string[]): string {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    if (ids.length === 0) return;

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0 || !('IntersectionObserver' in window)) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        const next = ids.find((id) => visible.has(id));
        if (next) setActiveId(next);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
