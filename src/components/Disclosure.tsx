import { useState } from 'react';

export interface DisclosureItem {
  id: string;
  title: string;
  paragraphs: string[];
}

/**
 * A set of independently-collapsible explanations. Reuses the Engineering
 * notes accordion styles (`.note`), so behaviour, focus and reduced-motion
 * handling stay consistent with the rest of the site. Multiple panels may be
 * open at once.
 */
export function Disclosure({ items, label }: { items: DisclosureItem[]; label: string }) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  return (
    <div className="disclosure" aria-label={label}>
      {items.map((item, i) => {
        const isOpen = openIds.has(item.id);
        const panelId = `disc-panel-${item.id}`;
        const buttonId = `disc-button-${item.id}`;

        return (
          <div className="note" key={item.id} data-open={isOpen}>
            <button
              type="button"
              className="note__summary"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
            >
              <span className="note__idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="note__title">{item.title}</span>
              <span className="note__sign" aria-hidden="true" />
            </button>
            <div
              className="note__body"
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
            >
              {item.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
