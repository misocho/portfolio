import type { Project } from '../data/projects';
import { Disclosure } from './Disclosure';
import { ArrowUpRight } from './icons';

interface ProjectFeatureProps {
  project: Project;
  priority: boolean;
  onOpen: (index: number) => void;
}

function Stack({ project }: { project: Project }) {
  const rows = [
    { label: 'Languages', items: project.languages },
    { label: 'Technologies', items: project.technologies },
    { label: 'Areas', items: project.areas },
  ].filter((row) => row.items.length > 0);

  return (
    <dl className="project__stack">
      {rows.map((row) => (
        <div key={row.label}>
          <dt>{row.label}</dt>
          <dd>{row.items.join('\u00a0· ')}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * One project record: an oversized real image, a small cluster of further
 * fragments, and the claim, contribution and caveats alongside.
 */
export function ProjectFeature({ project, priority, onOpen }: ProjectFeatureProps) {
  const media = project.media.filter((m) => !m.placeholder);
  const main = media[0];
  const thumbs = media.slice(1, 4);

  if (!main) return null;

  return (
    <article className={`project project--${project.theme}`} id={project.id}>
      <div className="project__grid">
        <figure className="project__visual" data-reveal>
          <button
            type="button"
            className="project__image-button"
            aria-haspopup="dialog"
            aria-label={`Open the ${project.name} image gallery, ${media.length} images`}
            onClick={() => onOpen(0)}
          >
            <img
              className="project__image"
              src={main.src}
              alt={main.alt}
              width={main.width}
              height={main.height}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
            />
          </button>

          <figcaption className="project__caption">
            <span>{main.caption}</span>
            <span className="project__caption-open">
              {main.credit ? (
                <a href={main.credit.href} target="_blank" rel="noreferrer noopener">
                  {main.credit.label}
                </a>
              ) : (
                project.mediaNote
              )}
            </span>
          </figcaption>

          {thumbs.length > 0 && (
            <div className="project__gallery">
              {thumbs.map((m, i) => (
                <button
                  type="button"
                  className="project__thumb"
                  key={m.id}
                  onClick={() => onOpen(i + 1)}
                  aria-label={`Open image ${i + 2}: ${m.caption}`}
                >
                  <img
                    src={m.src}
                    alt=""
                    width={m.width}
                    height={m.height}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          )}
        </figure>

        <div className="project__text" data-reveal>
          <h3 className="project__title">{project.name}</h3>
          <p className="project__tagline">{project.tagline}</p>
          <p className="project__summary">{project.summary}</p>

          <h4 className="project__label">What I built</h4>
          <ul className="project__list">
            {project.contribution.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="project__outcome">
            <mark>{project.outcome}</mark>
          </p>

          <Stack project={project} />

          {project.technical && project.technical.length > 0 && (
            <div className="project__details">
              <Disclosure
                label={`${project.name} technical notes`}
                items={project.technical.map((item, i) => ({
                  id: `${project.id}-tech-${i}`,
                  title: item.title,
                  paragraphs: item.paragraphs,
                }))}
              />
            </div>
          )}

          <p className="project__honesty">
            <strong>Note.</strong> {project.honestyNote}
          </p>

          {project.external && (
            <a
              className="project__external"
              href={project.external.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              {project.external.label}
              <ArrowUpRight width={13} height={13} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
