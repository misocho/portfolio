import { skillGroups, skillsNote } from '../data/skills';
import { SectionMasthead } from './SectionMasthead';

export function Skills() {
  return (
    <section className="section section--surface" id="skills">
      <div className="shell">
        <SectionMasthead
          title="Tools"
          note="What I reach for, and the problems they are for."
          reveal={false}
        />

        <div className="skills">
          {skillGroups.map((group) => (
            <div className="skills__group" key={group.title}>
              <h3 className="skills__group-title">{group.title}</h3>
              <p className="skills__items">{group.items.join('\u00a0· ')}</p>
            </div>
          ))}
        </div>

        <p className="skills__note">{skillsNote}</p>
      </div>
    </section>
  );
}
