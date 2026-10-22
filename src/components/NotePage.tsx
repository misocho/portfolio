import { homeHref, nextNoteRoute, projectRoute, routeHref, type SiteRoute } from '../data/routes';
import { PageClose, PageHeader } from './PageChrome';

type NoteRoute = Extract<SiteRoute, { kind: 'note' }>;

export function NotePage({ route }: { route: NoteRoute }) {
  const note = route.note;
  const [lede, ...body] = note.body;
  const next = nextNoteRoute(note.id);
  const related = note.relatedProject ? projectRoute(note.relatedProject) : undefined;
  const nextNote = next.kind === 'note' ? next.note : null;
  const relatedProject = related?.kind === 'project' ? related.project : null;

  return (
    <>
      <PageHeader />

      <main id="main">
        <header className="note-hero">
          <div className="shell">
            <h1 className="note-hero__title">{note.title}</h1>
          </div>
        </header>

        <article className="note-article">
          <div className="shell note-grid">
            <p className="note-lede">{lede}</p>
            <div className="note-body">
              {body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>

        {relatedProject && related && (
          <section className="note-related" aria-labelledby="note-related-heading">
            <div className="shell note-grid">
              <h2 className="note-related__heading" id="note-related-heading">
                In practice
              </h2>
              <div className="note-related__body">
                <p>Where this way of working showed up:</p>
                <a className="note-related__link" href={routeHref(related.path)}>
                  {relatedProject.name} — {relatedProject.tagline}
                </a>
              </div>
            </div>
          </section>
        )}
      </main>

      <PageClose
        nextLabel={nextNote ? 'Next note' : 'All notes'}
        nextTitle={nextNote ? nextNote.title : 'How I work'}
        nextHref={nextNote ? routeHref(next.path) : homeHref('notes')}
      />
    </>
  );
}
