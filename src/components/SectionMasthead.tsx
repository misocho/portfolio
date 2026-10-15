import type { ReactNode } from 'react';

interface SectionMastheadProps {
  num: string;
  label: string;
  title: ReactNode;
  deck?: ReactNode;
  /** Renders a lighter, supporting masthead for secondary sections. */
  minor?: boolean;
}

export function SectionMasthead({ num, label, title, deck, minor = false }: SectionMastheadProps) {
  return (
    <header className={`masthead${minor ? ' masthead--minor' : ''}`} data-reveal>
      <div className="masthead__index">
        <span className="masthead__num">{num}</span>
        <span className="label">{label}</span>
      </div>
      <h2 className="masthead__title">{title}</h2>
      {deck && <p className="masthead__deck">{deck}</p>}
    </header>
  );
}
