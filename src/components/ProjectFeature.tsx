import type { EvidenceArtifact, Project, ProjectMedia } from '../data/projects';
import { asset } from '../lib/asset';
import { Disclosure } from './Disclosure';
import { ArrowUpRight, Expand } from './icons';
import { StackGroups } from './StackGroups';

function byId(media: ProjectMedia[], id: string): ProjectMedia {
  const found = media.find((m) => m.id === id);
  if (!found) throw new Error(`Missing media: ${id}`);
  return found;
}

/* ------------------------------------------------------------------ */
/* EnkaAI — a Command Center capture above the supporting screens       */
/* ------------------------------------------------------------------ */

const enkaaiThumbs = [
  { id: 'approvals', label: 'Approvals' },
  { id: 'purchase-orders', label: 'Purchase orders' },
  { id: 'data-sources', label: 'Data sources' },
];

function EnkaaiSpread({ media }: { media: ProjectMedia[] }) {
  const main = byId(media, 'command-center');

  return (
    <div className="enkaai-spread">
      <div className="enkaai-spread__main">
        <div className="window">
          <div className="window__bar">
            <span className="window__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="window__url">command center</span>
          </div>
          <div className="window__screen">
            <img
              src={main.src}
              width={main.width}
              height={main.height}
              alt={main.alt}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <p className="spread-annotation">
          <span className="spread-annotation__idx">A</span>
          Command Center — the decisions that still need you
        </p>
      </div>

      <div className="enkaai-spread__rail">
        {enkaaiThumbs.map((t) => {
          const m = byId(media, t.id);
          return (
            <figure className="enkaai-thumb" key={m.id}>
              <img
                src={m.src}
                width={m.width}
                height={m.height}
                alt={m.alt}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{t.label}</figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Beoflow — a console capture beside the athlete app screens          */
/* ------------------------------------------------------------------ */

function BeoflowSpread({ media }: { media: ProjectMedia[] }) {
  const console = byId(media, 'squad-dashboard');
  const phones = ['athlete-phone-dashboard', 'app-week', 'app-load'].map((id) => byId(media, id));

  return (
    <div className="beoflow-spread">
      <div className="beoflow-spread__console">
        <div className="window">
          <div className="window__bar">
            <span className="window__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="window__url">coach · squad overview</span>
          </div>
          <div className="window__screen">
            <img
              src={console.src}
              width={console.width}
              height={console.height}
              alt={console.alt}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <p className="spread-annotation">
          <span className="spread-annotation__idx">A</span>
          Coach view — event readiness across the squad
        </p>
      </div>

      <div className="beoflow-spread__rail">
        <p className="spread-annotation">
          <span className="spread-annotation__idx">B</span>
          Athlete app
        </p>
        <div className="beoflow-spread__phones">
          {phones.map((p) => (
            <div className="phone" key={p.id}>
              <img
                src={p.src}
                width={p.width}
                height={p.height}
                alt={p.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dorsa — an illustrative composition from Dorsa's published assets   */
/* ------------------------------------------------------------------ */

const dorsaRows = [
  { file: 'suite-scout.svg', name: 'Scout' },
  { file: 'suite-assistant.svg', name: 'Assistant' },
  { file: 'suite-tracker.svg', name: 'Tracker' },
  { file: 'suite-comms.svg', name: 'Comms' },
];

function DorsaStage({ media }: { media: ProjectMedia[] }) {
  const hub = byId(media, 'hub-spoke-illustration');

  return (
    <div className="dorsa-stage">
      <span className="dorsa-badge">Illustrative</span>

      <div className="dorsa-stage__head">
        <span className="tag">Dorsa AI</span>
        <span className="tag">Platform overview</span>
      </div>

      <figure className="dorsa-stage__figure">
        <img
          src={hub.src}
          width={hub.width}
          height={hub.height}
          alt={hub.alt}
          loading="lazy"
          decoding="async"
        />
        <figcaption>Published platform illustration — intelligent hub with computer vision and smart sensors</figcaption>
      </figure>

      <div className="dorsa-stage__foot">
        <div className="dorsa-flow">
          {dorsaRows.map((row, i) => (
            <div className="dorsa-node" key={row.file}>
              <span className="dorsa-node__idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="dorsa-node__label">{row.name}</span>
              <img
                src={asset(`/media/dorsa/${row.file}`)}
                alt=""
                width={22}
                height={22}
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
        <span className="tag dorsa-stage__more">+ Crisis Management · Optimizer · Navigator</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Evidence artifact — sits under "Evidence and outcome"                */
/* ------------------------------------------------------------------ */

function Evidence({ evidence }: { evidence: EvidenceArtifact }) {
  return (
    <div className="evidence">
      <h5 className="evidence__title">{evidence.title}</h5>
      <p className="project__body">{evidence.lead}</p>
      <ul className="evidence__points">
        {evidence.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      {evidence.note && <p className="evidence__note">{evidence.note}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* A single featured project                                           */
/* ------------------------------------------------------------------ */

interface ProjectFeatureProps {
  project: Project;
  reversed: boolean;
  onOpen: (projectId: string) => void;
}

export function ProjectFeature({ project, reversed, onOpen }: ProjectFeatureProps) {
  const galleryCount = project.media.filter((m) => !m.placeholder).length;
  const defaultNote = `Images: ${project.name} — published by ${project.name}${
    project.theme === 'dorsa' ? ' or built from its published assets' : ''
  }.`;

  return (
    <article className={`project project--${project.theme}`} id={project.id}>
      <div className="project__head">
        <span className="project__num" aria-hidden="true">
          {project.index}
        </span>
        <div className="project__headline">
          <p className="project__kicker">{project.kicker}</p>
          <h3 className="project__title">{project.title}</h3>
          <p className="project__tagline">{project.tagline}</p>
        </div>
      </div>

      <div className={`split split--work${reversed ? ' is-reversed' : ''}`}>
        <div className="split__text stack" data-reveal>
          <h4 className="project__subhead">Problem</h4>
          <p className="project__body">{project.summary}</p>

          <h4 className="project__subhead">My contribution</h4>
          <ul className="contribution">
            {project.contribution.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>

          <h4 className="project__subhead">Evidence and outcome</h4>
          <p className="project__body">{project.outcome}</p>

          {project.evidence && <Evidence evidence={project.evidence} />}

          {project.technical && project.technical.length > 0 && (
            <>
              <h4 className="project__subhead">Engineering decisions</h4>
              <Disclosure
                label={`${project.name} engineering decisions`}
                items={project.technical.map((t, i) => ({
                  id: `${project.id}-tech-${i}`,
                  title: t.title,
                  paragraphs: t.paragraphs,
                }))}
              />
            </>
          )}

          <h4 className="project__subhead">Stack &amp; focus areas</h4>
          <StackGroups project={project} />

          {project.external && (
            <div className="project__actions">
              <a
                className="btn btn--rust"
                href={project.external.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                {project.external.label}
                <ArrowUpRight width={13} height={13} />
              </a>
            </div>
          )}

          <p className="sources-line">
            <strong>Note —</strong> {project.honestyNote}
          </p>
        </div>

        <div className="split__media" data-reveal>
          <p className="plate__eyebrow">Inspect the work</p>
          <button
            type="button"
            className="plate" aria-haspopup="dialog"
            onClick={() => onOpen(project.id)}
            aria-label={`Open the ${project.name} image gallery (${galleryCount} images)`}
          >
            <div className="plate__frame">
              {project.theme === 'enkaai' ? (
                <EnkaaiSpread media={project.media} />
              ) : project.theme === 'beoflow' ? (
                <BeoflowSpread media={project.media} />
              ) : (
                <DorsaStage media={project.media} />
              )}
            </div>
            <span className="plate__caption">
              <b>
                <Expand width={13} height={13} />
                Open gallery
              </b>
              <span>
                {galleryCount} image{galleryCount === 1 ? '' : 's'}
              </span>
            </span>
          </button>

          <p className="plate-note">
            <span className="dot" aria-hidden="true" />
            {project.mediaNote ?? defaultNote}
          </p>
        </div>
      </div>
    </article>
  );
}
