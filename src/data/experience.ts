import { cv } from './cv';

export interface ExperienceItem {
  dates: string;
  role: string;
  org: string;
  /**
   * A short, neutral scope line. These deliberately describe areas of work,
   * not achievements, to avoid overstating contribution.
   */
  desc?: string;
}

/**
 * Concise, presentation-only descriptions for the homepage timeline.
 *
 * Employment facts — role, organisation and dates — are taken from cv.json,
 * the single source of truth, so the homepage can never contradict the CV.
 * Only the one-line description is edited for the homepage's tighter layout.
 */
const descOverrides: Record<string, string> = {
  EnkaAI: 'Part-time. Backend engineering for an AI-enabled procurement and operations platform.',
  DevCentreHouse: 'Backend services and product features for AI-enabled applications.',
  'Beoflow B.V.': 'Backend engineering for a coach- and athlete-facing performance platform.',
  'Dorsa AI': 'Backend leadership for an AI-enabled perioperative-care platform.',
  'Infocap Enterprises': 'Software development for a livestock-management platform.',
  'Andela Kenya': 'Software engineering internship.',
};

export const experience: ExperienceItem[] = cv.roles.map((role) => ({
  dates: role.period,
  role: role.title,
  org: role.org,
  desc: descOverrides[role.org],
}));

export interface EducationItem {
  dates: string;
  qualification: string;
  org: string;
}

export const education: EducationItem[] = cv.education.map((item) => ({
  dates: item.period,
  qualification: item.qualification,
  org: item.org,
}));
