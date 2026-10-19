import { useState } from 'react';
import { projects } from '../data/projects';
import { ArrowUpRight } from './icons';
import { Lightbox } from './Lightbox';
import { ProjectFeature } from './ProjectFeature';
import { SectionMasthead } from './SectionMasthead';

/**
 * One-line routes into the strongest work. Each line restates a claim that is
 * already qualified in the case study — nothing new is asserted here.
 */
const selectedWork = [
  {
    id: 'enkaai',
    num: '01',
    name: 'EnkaAI',
    line: 'AI procurement — deterministic rules over LLM extraction, human-approved actions.',
  },
  {
    id: 'beoflow',
    num: '02',
    name: 'Beoflow',
    line: 'Time-series processing — readiness recomputation from seconds to milliseconds.',
  },
  {
    id: 'dorsa',
    num: '03',
    name: 'Dorsa AI',
    line: 'Perioperative care — backend services, multi-tenancy and NLP workflow orchestration.',
  },
];

interface OpenState {
  projectId: string;
  index: number;
}

export function WorkSection() {
  const [open, setOpen] = useState<OpenState | null>(null);

  const activeProject = open ? projects.find((p) => p.id === open.projectId) ?? null : null;
  const gallery = activeProject ? activeProject.media.filter((m) => !m.placeholder) : [];

  return (
    <section className="section" id="work">
      <div className="container">
        <SectionMasthead
          num="01"
          label="Featured work"
          title="Three products, and the parts I built."
          deck="EnkaAI, an AI-enabled procurement and operations platform; Beoflow, a coach and athlete performance platform; and Dorsa AI, software for perioperative care. Where a product publishes its own imagery, you will see it; where it does not, that is said plainly."
        />

        <nav className="work-index" aria-labelledby="work-index-label" data-reveal>
          <p className="label work-index__label" id="work-index-label">
            In this section
          </p>
          <ol className="work-index__list" role="list">
            {selectedWork.map((item) => (
              <li key={item.id}>
                <a className="work-index__link" href={`#${item.id}`}>
                  <span className="work-index__num">{item.num}</span>
                  <span className="work-index__name">{item.name}</span>
                  <span className="work-index__line">{item.line}</span>
                  <ArrowUpRight className="work-index__arrow" width={12} height={12} />
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {projects.map((project, i) => (
          <ProjectFeature
            key={project.id}
            project={project}
            reversed={i % 2 === 1}
            onOpen={(projectId) => setOpen({ projectId, index: 0 })}
          />
        ))}
      </div>

      {activeProject && gallery.length > 0 && (
        <Lightbox
          project={activeProject}
          media={gallery}
          index={open?.index ?? 0}
          onNavigate={(index) => setOpen((prev) => (prev ? { ...prev, index } : prev))}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}
