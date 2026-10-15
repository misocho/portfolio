// scripts/prerender.mjs
//
// Injects the server-rendered app into the built index.html so the shipped
// HTML already contains the portfolio's real content — no JavaScript required
// to read it.
//
//   dist/index.html  +  dist-ssr/entry-server.js
//        ->  dist/index.html   (with the #root placeholder filled in)
//
// Runs after `vite build` and `vite build --ssr` (see the `build` script).
// Dependency-free: plain Node. Fails the build if the expected content is
// missing, so CI catches a broken prerender.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = join(root, 'dist/index.html');
const serverEntry = join(root, 'dist-ssr/entry-server.js');

if (!existsSync(indexPath)) {
  throw new Error('prerender: dist/index.html not found — run `vite build` first');
}
if (!existsSync(serverEntry)) {
  throw new Error('prerender: dist-ssr/entry-server.js not found — run `vite build --ssr` first');
}

/* ---- render ----------------------------------------------------------- */
const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = render();

if (typeof appHtml !== 'string' || appHtml.length < 1000) {
  throw new Error('prerender: rendered markup looks empty');
}

/* ---- inject ----------------------------------------------------------- */
const template = readFileSync(indexPath, 'utf8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) {
  throw new Error(`prerender: could not find ${marker} in dist/index.html`);
}
const html = template.replace(marker, `<div id="root">${appHtml}</div>`);

/* ---- verify ----------------------------------------------------------- */
// A few strings that must appear in the initial HTML. If any are missing the
// prerender is broken and the build should stop.
const required = [
  'Notes from the', // hero heading
  'EnkaAI',
  'Beoflow',
  'Dorsa AI',
  'Experience', // about/experience subhead
  'Skills',
  'Education',
  'Contact',
];
const missing = required.filter((needle) => !html.includes(needle));
if (missing.length > 0) {
  throw new Error(`prerender: expected content missing from initial HTML: ${missing.join(', ')}`);
}

writeFileSync(indexPath, html);
console.log(
  `prerender -> dist/index.html (${(appHtml.length / 1024).toFixed(0)} KB of app markup inlined)`,
);
