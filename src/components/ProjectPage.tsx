import type { MediaCredit, Project, ProjectMedia } from '../data/projects';
import { homeHref, nextProjectRoute, routeHref, type SiteRoute } from '../data/routes';
import { ImportReplay } from './ImportReplay';
import { PageClose, PageHeader } from './PageChrome';

type ProjectRoute = Extract<SiteRoute, { kind: 'project' }>;

function Credit({ credit }: { credit?: MediaCredit }) {
  if (!credit) return null;
  return (
    <a href={credit.href} target="_blank" rel="noreferrer noopener">
      {credit.label}
    </a>
  );
}

function MediaCaption({ media, mediaNote }: { media: ProjectMedia; mediaNote?: string }) {
  return (
    <figcaption className="case-caption">
      <span>{media.caption}</span>
      <span>{media.credit ? <Credit credit={media.credit} /> : mediaNote}</span>
    </figcaption>
  );
}

export function ProjectPage({ route }: { route: ProjectRoute }) {
  const project: Project = route.project;
  const media = project.media.filter((item) => !item.placeholder);
  const [lead, ...gallery] = media;
  const next = nextProjectRoute(project.id);
  const stack = [...project.languages, ...project.technologies].join(' · ');
  const nextProject = next.kind === 'project' ? next.project : null;

  if (!lead) return null;

  return (
    <>
      <PageHeader />

      <main id="main">
        <header className={`case-hero case-hero--${project.theme}`}>
          <div className="shell">
            <h1 className="case-hero__title">{project.name}</h1>

            <div className="case-hero__stage">
              <p className="case-hero__tagline">{project.tagline}</p>
              <p className="case-hero__summary">{project.summary}</p>
            </div>

            <dl className="case-hero__facts">
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>{project.areas.join(' · ')}</dd>
              </div>
              {stack && (
                <div>
                  <dt>Stack</dt>
                  <dd>{stack}</dd>
                </div>
              )}
            </dl>
          </div>
        </header>

        <figure className={`case-lead${lead.height > lead.width ? ' case-lead--portrait' : ''}`}>
          {lead.height > lead.width ? (
            <div className="shell case-lead__portrait">
              <img
                src={lead.src}
                alt={lead.alt}
                width={lead.width}
                height={lead.height}
                loading="eager"
                decoding="async"
              />
              <div className="case-lead__aside">
                <p className="case-lead__caption">{lead.caption}</p>
                <p className="case-lead__credit">
                  {lead.credit ? <Credit credit={lead.credit} /> : project.mediaNote}
                </p>
                {lead.credit && project.mediaNote && (
                  <p className="case-lead__note">{project.mediaNote}</p>
                )}
              </div>
            </div>
          ) : (
            <>
              <img
                src={lead.src}
                alt={lead.alt}
                width={lead.width}
                height={lead.height}
                loading="eager"
                decoding="async"
              />
              <div className="shell">
                <MediaCaption media={lead} mediaNote={project.mediaNote} />
              </div>
            </>
          )}
        </figure>

        <section className="case-section" aria-labelledby="case-work-heading">
          <div className="shell case-grid">
            <h2 className="case-heading" id="case-work-heading">
              The work
            </h2>
            <div className="case-copy">
              <p className="case-outcome">
                <mark>{project.outcome}</mark>
              </p>

              <h3 className="case-subhead">What I built</h3>
              <ul className="case-list">
                {project.contribution.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              {project.external && (
                <a
                  className="case-external"
                  href={project.external.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {project.external.label} ↗
                </a>
              )}
            </div>
          </div>
        </section>

        {project.technical && project.technical.length > 0 && (
          <section
            className="section--surface case-section"
            aria-labelledby="case-technical-heading"
          >
            <div className="shell case-grid">
              <h2 className="case-heading" id="case-technical-heading">
                Technical notes
              </h2>
              <div className="case-copy case-details">
                {project.technical.map((detail) => (
                  <article className="case-detail" key={detail.title}>
                    <h3 className="case-subhead">{detail.title}</h3>
                    {detail.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {project.evidence && (
          <section className="case-section case-section--evidence" aria-labelledby="case-record-heading">
            <div className="shell case-grid">
              <h2 className="case-heading" id="case-record-heading">
                The record
              </h2>
              <div className="case-copy">
                <h3 className="case-subhead">{project.evidence.title}</h3>
                <p className="case-lead-text">{project.evidence.lead}</p>
                <ul className="case-list">
                  {project.evidence.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {project.evidence.note && (
                  <p className="case-fineprint">{project.evidence.note}</p>
                )}
                {project.id === 'enkaai' && <ImportReplay />}
              </div>
            </div>
          </section>
        )}

        {gallery.length > 0 && (
          <section className="case-section" aria-labelledby="case-gallery-heading">
            <div className="shell">
              <h2 className="case-heading" id="case-gallery-heading">
                The interface
              </h2>
              <div className={`case-gallery${gallery.length % 2 === 0 ? ' case-gallery--even' : ''}`}>
                {gallery.map((item) => (
                  <figure className="case-gallery__item" key={item.id}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      decoding="async"
                    />
                    <MediaCaption media={item} mediaNote={project.mediaNote} />
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section--surface case-section" aria-labelledby="case-caveat-heading">
          <div className="shell case-grid">
            <h2 className="case-heading" id="case-caveat-heading">
              The caveat
            </h2>
            <div className="case-copy">
              <p>{project.honestyNote}</p>
              {project.mediaNote && <p className="case-fineprint">{project.mediaNote}</p>}
            </div>
          </div>
        </section>
      </main>

      <PageClose
        nextLabel={nextProject ? 'Next project' : 'All work'}
        nextTitle={nextProject ? nextProject.name : 'The work'}
        nextHref={nextProject ? routeHref(next.path) : homeHref('work')}
      />
    </>
  );
}
