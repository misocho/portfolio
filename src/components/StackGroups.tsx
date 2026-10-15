import type { Project } from '../data/projects';

export function StackGroups({ project }: { project: Project }) {
  const groups = [
    { label: 'Languages', items: project.languages, variant: 'lang' as const },
    { label: 'Technologies', items: project.technologies, variant: 'tech' as const },
    { label: 'Areas', items: project.areas, variant: 'area' as const },
  ].filter((g) => g.items.length > 0);

  return (
    <div className="stack-groups">
      {groups.map((group) => (
        <div className="stack-group" key={group.label}>
          <span className="stack-group__label">{group.label}</span>
          <div className="chips">
            {group.items.map((item) => (
              <span className={`chip${group.variant === 'area' ? ' chip--area' : ''}`} key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
