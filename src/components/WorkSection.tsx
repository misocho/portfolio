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
    <section className="section section--white" id="work">
      <div className="shell">
        <SectionMasthead
          title="Three products"
          note="EnkaAI, Beoflow and Dorsa AI. In each, I built the backend behind the interface."
        />
      </div>

      <div className="work-list">
        {projects.map((project, i) => (
          <ProjectFeature
            key={project.id}
            project={project}
            priority={i === 0}
            onOpen={(index) => setOpen({ projectId: project.id, index })}
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
