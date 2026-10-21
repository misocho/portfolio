import { useState } from 'react';

export interface DisclosureItem {
  id: string;
  title: string;
  paragraphs: string[];
}

/**
 * Independently-collapsible technical notes. The public page and the image
 * gallery share the same fold behaviour: a real button, a visible expanded
 * state, and a panel that is removed from the accessibility tree when closed.
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
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const panelId = `disc-panel-${item.id}`;
        const buttonId = `disc-button-${item.id}`;

        return (
          <div className="fold" key={item.id} data-open={isOpen}>
            <button
              type="button"
              className="fold__summary"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
            >
              <span className="fold__title">{item.title}</span>
              <span className="fold__sign" aria-hidden="true" />
            </button>
            <div
              className="fold__body"
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
            >
              <div className="fold__body-inner">
                <div className="fold__pad">
                  {item.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
