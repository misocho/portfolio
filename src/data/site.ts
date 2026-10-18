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
  /** Where Brian is based, shown in the hero byline. Read from cv.json. */
  location: string;
  /** Canonical site URL, e.g. 'https://username.github.io/portfolio/'. Optional. */
  url: string;
  /** Social preview image path (public/). */
  ogImage: string;
  /**
   * The public source repository for this site, linked from the footer as
   * inspectable proof of work. Supplied.
   */
  source: string;
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
   * Availability indicator. Supplied — keep it current and accurate. It is
   * rendered in the hero and (at wide widths) as a nav status chip.
   */
  availability: string | null;
}

export const site: SiteConfig = {
  name: cv.name,
  shortName: 'Brian',
  role: 'Senior backend engineer · AI systems',
  email: cv.email,
  edition: 'FIELD NOTES · ENGINEERING PORTFOLIO · 2026',
  location: cv.location,
  url: 'https://misocho.github.io/portfolio/',
  ogImage: '/og-image.jpg',
  source: 'https://github.com/misocho/portfolio',

  github: cv.github,
  linkedin: cv.linkedin,
  resume: '/brian-misocho-moranga-resume.pdf',
  availability: 'Open to senior backend / AI systems roles',
};

export const hasLink = (value: string): boolean => value.trim().length > 0;
