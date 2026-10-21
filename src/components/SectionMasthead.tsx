import type { ReactNode } from 'react';

interface SectionMastheadProps {
  title: ReactNode;
  note?: ReactNode;
  reveal?: boolean;
}

/**
 * The section head: a display-scale title and, where it earns its place, one
 * short line of context. No section numbers, no eyebrow labels.
 */
export function SectionMasthead({ title, note, reveal = true }: SectionMastheadProps) {
  return (
    <header className="section-head" data-reveal={reveal ? '' : undefined}>
      <h2 className="section-head__title">{title}</h2>
      {note && <p className="section-head__note">{note}</p>}
    </header>
  );
}
