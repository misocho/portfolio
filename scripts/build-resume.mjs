// scripts/build-resume.mjs
//
// Renders the canonical print CV from the single source of truth.
//
//   src/data/cv.json  +  resume/resume.template.html
//        ->  public/resume.html   (self-contained, fonts inlined)
//
// Run via `npm run resume:build` (also wired as `prebuild`, so every
// `npm run build` keeps the printable in sync). Dependency-free: plain Node.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const cv = JSON.parse(readFileSync(join(root, 'src/data/cv.json'), 'utf8'));
const template = readFileSync(join(root, 'resume/resume.template.html'), 'utf8');

/* ---- helpers ---------------------------------------------------------- */
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const dataUri = (rel) => {
  const b64 = readFileSync(join(root, rel)).toString('base64');
  return `data:font/woff2;base64,${b64}`;
};

/* ---- inlined @font-face ---------------------------------------------- */
const faces = [
  ['Inter', 400, 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2'],
  ['Inter', 500, 'node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2'],
  ['Inter', 600, 'node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2'],
  ['Newsreader', 400, 'node_modules/@fontsource/newsreader/files/newsreader-latin-400-normal.woff2'],
  ['Newsreader', 500, 'node_modules/@fontsource/newsreader/files/newsreader-latin-500-normal.woff2'],
  ['Newsreader', 600, 'node_modules/@fontsource/newsreader/files/newsreader-latin-600-normal.woff2'],
  ['IBM Plex Mono', 400, 'node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2'],
  ['IBM Plex Mono', 500, 'node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2'],
];

const fontFaces = faces
  .map(
    ([family, weight, rel]) => `      @font-face {
        font-family: '${family}';
        font-style: normal;
        font-weight: ${weight};
        font-display: swap;
        src: url('${dataUri(rel)}') format('woff2');
      }`
  )
  .join('\n');

/* ---- header ----------------------------------------------------------- */
const contact = [
  [esc(cv.location), null],
  [esc(cv.email), `mailto:${cv.email}`],
  [esc(cv.phone), `tel:${cv.phone.replace(/[^+\d]/g, '')}`],
  ['github.com/misocho', cv.github],
  ['linkedin.com/in/brian-moranga', cv.linkedin],
  ['misocho.github.io/portfolio', cv.portfolio],
];

const contactHtml = contact
  .map(([text, href]) =>
    href
      ? `        <li><a href="${esc(href)}">${text}</a></li>`
      : `        <li>${text}</li>`
  )
  .join('\n');

const header = `    <header class="head">
      <p class="head__kicker">Curriculum vitae</p>
      <h1>${esc(cv.name)}</h1>
      <p class="head__title">${esc(cv.title)}</p>
      <ul class="head__contact">
${contactHtml}
      </ul>
    </header>`;

/* ---- roles ------------------------------------------------------------ */
const roles = cv.roles
  .map((r) => {
    const when = `<p class="role__when"><span>${esc(r.period)}</span></p>`;
    const intro = r.intro ? `\n        <p class="role__intro">${esc(r.intro)}</p>` : '';
    const bullets = r.bullets.length
      ? `\n        <ul>\n${r.bullets.map((b) => `          <li>${esc(b)}</li>`).join('\n')}\n        </ul>`
      : '';
    return `      <article class="role">
        <div class="role__head">
          <div>
            <h3 class="role__org">${esc(r.org)}</h3>
            <p class="role__role">${esc(r.title)} — ${esc(r.location)}</p>
          </div>
          ${when}
        </div>${intro}${bullets}
      </article>`;
  })
  .join('\n');

/* ---- skills ----------------------------------------------------------- */
const skills = cv.skills
  .map(
    (g) =>
      `        <p class="skill-row"><b>${esc(g.title)}:</b> <span>${esc(g.items.join(' · '))}</span></p>`
  )
  .join('\n');

/* ---- education -------------------------------------------------------- */
const education = cv.education
  .map(
    (e) => `      <div class="edu">
        <div>
          <h3>${esc(e.org)}</h3>
          <p class="edu__detail">${esc(e.qualification)}</p>
        </div>
        <p class="edu__when">${esc(e.period)}</p>
      </div>`
  )
  .join('\n');

/* ---- footer ----------------------------------------------------------- */
const footer = `    <footer class="foot">
      <span>${esc(cv.name)} — Curriculum vitae</span>
      <span><a href="${esc(cv.github)}">github.com/misocho</a> · <a href="${esc(cv.linkedin)}">linkedin</a> · <a href="mailto:${esc(cv.email)}">${esc(cv.email)}</a></span>
    </footer>`;

/* ---- assemble --------------------------------------------------------- */
let out = template
  .replace('/*__FONT_FACES__*/', fontFaces)
  .replace('<!--__HEADER__-->', header)
  .replace('<!--__SUMMARY__-->', esc(cv.summary))
  .replace('<!--__ROLES__-->', roles)
  .replace('<!--__SKILLS__-->', skills)
  .replace('<!--__EDUCATION__-->', education)
  .replace('<!--__FOOTER__-->', footer);

const leftovers = out.match(/__(FONT_FACES|HEADER|SUMMARY|ROLES|SKILLS|EDUCATION)__/g);
if (leftovers) {
  throw new Error(`Unreplaced template markers: ${[...new Set(leftovers)].join(', ')}`);
}

mkdirSync(join(root, 'public'), { recursive: true });
const dest = join(root, 'public/resume.html');
writeFileSync(dest, out);
console.log(`resume:build -> public/resume.html (${(out.length / 1024).toFixed(0)} KB, ${cv.roles.length} roles)`);
