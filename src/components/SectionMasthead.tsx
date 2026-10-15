import type { ReactNode } from 'react';

interface SectionMastheadProps {
  num: string;
  label: string;
  title: ReactNode;
  deck?: ReactNode;
}

export function SectionMasthead({ num, label, title, deck }: SectionMastheadProps) {
  return (
    <header className="masthead" data-reveal>
      <div className="masthead__index">
        <span className="masthead__num">{num}</span>
        <span className="label">{label}</span>
      </div>
      <h2 className="masthead__title">{title}</h2>
      {deck && <p className="masthead__deck">{deck}</p>}
    </header>
  );
}
