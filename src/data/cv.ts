import cvData from './cv.json';

/**
 * cv.ts — typed accessor for the single source of truth (cv.json).
 *
 * cv.json holds all CV content AND the canonical contact details. Both the
 * on-site CV section and the generated print document (public/resume.html)
 * read from it, so the website and the PDF never drift apart.
 */

export interface CvRole {
  org: string;
  title: string;
  location: string;
  period: string;
  current?: boolean;
  intro?: string;
  bullets: string[];
}

export interface CvSkillGroup {
  title: string;
  items: string[];
}

export interface CvEducation {
  org: string;
  qualification: string;
  period: string;
}

export interface Cv {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  summary: string;
  roles: CvRole[];
  skills: CvSkillGroup[];
  education: CvEducation[];
}

export const cv = cvData as Cv;
