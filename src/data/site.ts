/**
 * site.ts — global site chrome.
 *
 * Identity and contact details (name, email, GitHub, LinkedIn) are read from
 * cv.json, the single source of truth for the CV. Anything left as an empty
 * string is treated as "not supplied": the UI hides it rather than inventing a
 * value. Nothing here is fabricated.
 */

import { cv } from './cv';

export interface SiteConfig {
  name: string;
  shortName: string;
  role: string;
  email: string;
  edition: string;
  /** Canonical site URL, e.g. 'https://username.github.io/portfolio/'. Optional. */
  url: string;
  /** Social preview image path (public/). */
  ogImage: string;
  /**
   * Supply these to reveal the footer links.
   * Leave '' and the link simply will not render. Do NOT invent usernames.
   */
  github: string;
  linkedin: string;
  /**
   * A downloadable résumé placed in /public, e.g.
   * '/brian-misocho-moranga-resume.pdf'. Rendered through asset().
   */
  resume: string;
  /**
   * Availability indicator. Leave null unless it is accurate and you can keep
   * it current. Example: 'Open to the right work'.
   */
  availability: string | null;
}

export const site: SiteConfig = {
  name: cv.name,
  shortName: 'Brian',
  role: 'Senior backend software engineer',
  email: cv.email,
  edition: 'FIELD NOTES · ENGINEERING PORTFOLIO · 2026',
  url: 'https://misocho.github.io/portfolio/',
  ogImage: '/og-image.jpg',

  github: cv.github,
  linkedin: cv.linkedin,
  resume: '/brian-misocho-moranga-resume.pdf',
  availability: null,
};

export const hasLink = (value: string): boolean => value.trim().length > 0;
