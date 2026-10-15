import { cv } from './cv';

export interface SkillGroup {
  title: string;
  items: string[];
}

/**
 * A concise subset for the homepage, drawn from the canonical CV skill groups
 * in cv.json. Each pick is filtered against its CV group, so the homepage can
 * only ever show *less* than the CV — never something that contradicts it.
 * Group titles come straight from the CV.
 */
const homePicks: Record<string, string[]> = {
  'Languages & Frameworks': ['Python', 'FastAPI', 'Django', 'TypeScript', 'React'],
  'Data & Storage': ['PostgreSQL', 'Redis', 'Ingestion pipelines', 'Idempotent processing'],
  'Cloud & DevOps': ['AWS (ECS, Lambda, RDS, S3)', 'Docker', 'CI/CD'],
  'Systems & Architecture': [
    'Distributed systems',
    'Asynchronous processing',
    'REST API design',
    'Workflow orchestration',
  ],
  'AI Engineering': [
    'LLM integrations',
    'Structured extraction',
    'Deterministic business rules',
    'Human-reviewed workflows',
  ],
};

export const skillGroups: SkillGroup[] = cv.skills.map((group) => {
  const picked = (homePicks[group.title] ?? []).filter((item) => group.items.includes(item));
  return {
    title: group.title,
    items: picked.length > 0 ? picked : group.items.slice(0, 4),
  };
});

export const skillsNote =
  'The through-line across all of this is backend and systems work: making things fast, reliable and clear enough that the people depending on them can move with confidence.';
