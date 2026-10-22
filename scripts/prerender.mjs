// scripts/prerender.mjs
//
// Renders every public route into static HTML at build time. The home page
// keeps its #root placeholder filled; project and note pages get their own
// index.html with route-specific metadata, structured data and canonical URL.
//
// Runs after `vite build` and `vite build --ssr` (see the `build` script).

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = join(root, 'dist/index.html');
const serverEntry = join(root, 'dist-ssr/entry-server.js');

if (!existsSync(indexPath)) {
  throw new Error('prerender: dist/index.html not found — run `vite build` first');
}
if (!existsSync(serverEntry)) {
  throw new Error('prerender: dist-ssr/entry-server.js not found — run `vite build --ssr` first');
}

const { render, routes, site } = await import(pathToFileURL(serverEntry).href);
const template = readFileSync(indexPath, 'utf8');
const today = new Date().toLocaleDateString('en-CA');

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const absolute = (path) => new URL(path.replace(/^\//, ''), site.url).href;

const setMeta = (html, attribute, key, content) => {
  const pattern = new RegExp(`(<meta\\s+${attribute}="${key}"\\s+content=")[^"]*("\\s*/>)`, 'i');
  if (pattern.test(html)) return html.replace(pattern, `$1${escapeHtml(content)}$2`);
  return html.replace('</head>', `    <meta ${attribute}="${key}" content="${escapeHtml(content)}" />\n  </head>`);
};

const person = {
  '@type': 'Person',
  '@id': `${site.url}#person`,
  name: 'Brian Misocho Morang’a',
  alternateName: 'Brian Misocho',
  jobTitle: 'Senior backend engineer',
  description: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  sameAs: [site.github, site.linkedin].filter(Boolean),
  knowsAbout: [
    'Backend engineering',
    'Distributed systems',
    'Python',
    'FastAPI',
    'PostgreSQL',
    'Docker',
    'Rust',
    'AWS',
    'AI systems',
    'API design',
    'Multi-tenant architecture',
  ],
};

const website = {
  '@type': 'WebSite',
  '@id': `${site.url}#website`,
  url: site.url,
  name: 'Brian Misocho — Field Notes',
  publisher: { '@id': `${site.url}#person` },
  inLanguage: 'en',
};

const graphFor = (route, canonical) => {
  const graph = [person, website];

  if (route.kind === 'project') {
    const project = route.project;
    graph.push({
      '@type': 'CreativeWork',
      '@id': `${canonical}#work`,
      name: project.name,
      headline: route.title,
      description: project.summary,
      url: canonical,
      creator: { '@id': `${site.url}#person` },
      about: project.areas,
      keywords: [...project.languages, ...project.technologies].join(', '),
      genre: 'Case study',
      inLanguage: 'en',
      isPartOf: { '@id': `${site.url}#website` },
    });
  } else if (route.kind === 'note') {
    graph.push({
      '@type': 'TechArticle',
      '@id': `${canonical}#article`,
      headline: route.note.title,
      description: route.description,
      url: canonical,
      author: { '@id': `${site.url}#person` },
      about: ['Backend engineering', 'Distributed systems', 'AI systems'],
      inLanguage: 'en',
      isPartOf: { '@id': `${site.url}#website` },
    });
  } else {
    graph.push({
      '@type': 'ProfilePage',
      '@id': `${canonical}#page`,
      url: canonical,
      name: route.title,
      description: route.description,
      mainEntity: { '@id': `${site.url}#person` },
      isPartOf: { '@id': `${site.url}#website` },
    });
  }

  if (route.kind !== 'home') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: site.url,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: route.kind === 'project' ? route.project.name : route.note.title,
          item: canonical,
        },
      ],
    });
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll(
    '<',
    '\\u003c',
  );
};

const headFor = (route, canonical) => {
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`);
  html = setMeta(html, 'name', 'description', route.description);
  html = setMeta(html, 'property', 'og:type', route.kind === 'home' ? 'website' : 'article');
  html = setMeta(html, 'property', 'og:url', canonical);
  html = setMeta(html, 'property', 'og:title', route.title);
  html = setMeta(html, 'property', 'og:description', route.description);
  html = setMeta(html, 'property', 'og:image', absolute(route.ogImage));
  html = setMeta(html, 'property', 'og:image:alt', route.title);
  html = setMeta(html, 'name', 'twitter:title', route.title);
  html = setMeta(html, 'name', 'twitter:description', route.description);
  html = setMeta(html, 'name', 'twitter:image', absolute(route.ogImage));
  html = setMeta(html, 'name', 'twitter:image:alt', route.title);
  const themeColor =
    route.kind === 'project'
      ? { enkaai: '#fe7141', beoflow: '#d1ddd3', dorsa: '#f0ff1c' }[route.project.theme] ??
        '#fe7141'
      : route.kind === 'note'
        ? '#f0ff1c'
        : '#fe7141';
  html = setMeta(html, 'name', 'theme-color', themeColor);

  const canonicalPattern = /(<link rel="canonical" href=")[^"]*("\s*\/>)/;
  html = canonicalPattern.test(html)
    ? html.replace(canonicalPattern, `$1${escapeHtml(canonical)}$2`)
    : html.replace('</head>', `    <link rel="canonical" href="${escapeHtml(canonical)}" />\n  </head>`);

  const structuredData = `<script type="application/ld+json">${graphFor(route, canonical)}</script>`;
  return html.replace('</head>', `    ${structuredData}\n  </head>`);
};

const requiredFor = (route) => {
  if (route.kind === 'project') {
    return [route.project.name, route.project.tagline, 'The work', 'Technical notes'];
  }
  if (route.kind === 'note') {
    return [route.note.title, 'In practice'];
  }
  return [
    'Brian Misocho',
    'EnkaAI',
    'Beoflow',
    'Dorsa AI',
    'The evidence',
    'Experience',
    'Tools',
    'Education',
    'Contact',
  ];
};

let rendered = 0;
for (const route of routes) {
  const appHtml = render(route.path);
  if (typeof appHtml !== 'string' || appHtml.length < 1000) {
    throw new Error(`prerender: rendered markup for ${route.path} looks empty`);
  }

  const canonical = absolute(route.path);
  const html = headFor(route, canonical).replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  );

  const missing = requiredFor(route).filter((needle) => !html.includes(needle));
  if (missing.length > 0) {
    throw new Error(
      `prerender: expected content missing from ${route.path}: ${missing.join(', ')}`,
    );
  }

  const target =
    route.path === '/'
      ? indexPath
      : join(root, 'dist', route.path.replace(/^\//, ''), 'index.html');
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
  rendered += 1;
  console.log(
    `prerender -> dist${route.path}index.html (${(appHtml.length / 1024).toFixed(0)} KB of app markup)`,
  );
}

const urls = routes
  .map(
    (route) =>
      `  <url>\n    <loc>${escapeHtml(absolute(route.path))}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
  )
  .join('\n');

writeFileSync(
  join(root, 'dist/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

console.log(`prerender -> ${rendered} routes and dist/sitemap.xml`);
