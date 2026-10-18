import { skillGroups, skillsNote } from '../data/skills';
import { SectionMasthead } from './SectionMasthead';

export function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionMasthead
          num="05"
          label="Skills"
          title="Tools and areas of focus."
          deck="What I reach for, and the kind of problems they are for."
          minor
        />

        <div className="skills">
          {skillGroups.map((group) => (
            <div className="skills__group" key={group.title} data-reveal>
              <h3 className="skills__group-title">{group.title}</h3>
              <ul className="skills__list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="skills__note">{skillsNote}</p>
      </div>
    </section>
  );
}
