import { useState } from 'react';
import { notes } from '../data/notes';
import { SectionMasthead } from './SectionMasthead';

export function Notes() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="section" id="notes">
      <div className="container">
        <SectionMasthead
          num="02"
          label="Notes"
          title="How I like to work."
          deck="Short notes on the judgment calls behind the code — the engineering thinking that does not fit neatly on a résumé."
          minor
        />

        <div className="grid-notes">
          {notes.map((note) => {
            const isOpen = openId === note.id;
            const panelId = `note-panel-${note.id}`;
            const buttonId = `note-button-${note.id}`;

            return (
              <div className="note" key={note.id} data-reveal data-open={isOpen}>
                <button
                  type="button"
                  className="note__summary"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : note.id)}
                >
                  <span className="note__idx">{note.index}</span>
                  <span className="note__title">{note.title}</span>
                  <span className="note__sign" aria-hidden="true" />
                </button>
                <div
                  className="note__body"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  {note.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
