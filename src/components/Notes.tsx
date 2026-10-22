import { useState } from 'react';
import { notes } from '../data/notes';
import { noteRoute, routeHref } from '../data/routes';
import { SectionMasthead } from './SectionMasthead';

export function Notes() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="section section--acid" id="notes">
      <div className="shell">
        <SectionMasthead
          title="How I work"
          note="Four judgment calls behind the code — the thinking that does not fit on a résumé."
        />

        <div className="notes">
          {notes.map((note) => {
            const isOpen = openId === note.id;
            const panelId = `note-panel-${note.id}`;
            const buttonId = `note-button-${note.id}`;

            return (
              <div className="fold" key={note.id} data-open={isOpen}>
                <button
                  type="button"
                  className="fold__summary"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : note.id)}
                >
                  <span className="fold__title">{note.title}</span>
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
                      {note.paragraphs.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                      {noteRoute(note.id) && (
                        <a
                          className="fold__more"
                          href={routeHref(noteRoute(note.id)?.path ?? '/notes/')}
                          tabIndex={isOpen ? 0 : -1}
                          aria-hidden={!isOpen}
                        >
                          Read the full note <span aria-hidden="true">→</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
