import { useState } from 'react';
import { projects } from '../data/projects';
import { Lightbox } from './Lightbox';
import { ProjectFeature } from './ProjectFeature';
import { SectionMasthead } from './SectionMasthead';

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
