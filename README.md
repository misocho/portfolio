# Field Notes — Portfolio of Brian Misocho Morang'a

An editorial portfolio built around a **FIELD NOTES** concept — a vintage
engineering journal. Warm paper, ink, a single rust accent, and a forest-green
counterpoint. The writing is deliberately honest: it shows what Brian worked
on, within the wider teams that shipped the products, and never invents
screenshots, metrics or features.

Built with **Vite 5 + React 18 + TypeScript**, self-hosted fonts, and no
animation libraries. It exports to a fully static site for GitHub Pages.

---

## Quick start

```bash
npm install
npm run dev           # http://localhost:5173/portfolio/
npm run build         # resume:build → type-check → client + SSR build → pre-render into dist/
npm run preview       # serve the production build locally
npm run resume:build  # regenerate public/resume.html from src/data/cv.json
npm run typecheck     # tsc only
npm run lint          # eslint
```

> Note the `/portfolio/` path in the dev URL: the default base path is
> `'/portfolio/'`. Change it via the `VITE_BASE` environment variable (see
> below) if your repository or domain differs.

---

## What you must supply

A few details can only come from Brian. Until they are supplied, the UI hides
them rather than showing a guess. Identity and contact details (name, email,
GitHub, LinkedIn) come from **`src/data/cv.json`** — the CV's single source of
truth; site chrome lives in **`src/data/site.ts`** (which reads those values
from `cv.json`).

| What | Where | Note |
|---|---|---|
| Name, email, GitHub, LinkedIn | `src/data/cv.json` | Single source of truth for the CV; `site.ts` reads them from here. Supplied. |
| Location | `src/data/cv.json` → `location` | Shown in the hero byline. Supplied. |
| Résumé PDF | `src/data/site.ts` → `resume` | Supplied: `'/brian-misocho-moranga-resume.pdf'`. See **Résumé** below. |
| Availability line | `src/data/site.ts` → `availability` | Supplied: `'Open to senior backend / AI systems roles'`. Keep it accurate and current; rendered in the hero and the wide-nav status chip. |
| Public source repository | `src/data/site.ts` → `source` | Supplied: `'https://github.com/misocho/portfolio'`, linked from the footer as inspectable proof of work. |
| Canonical URL | `src/data/site.ts` → `url` | Optional; for metadata. |
| Base path | `vite.config.ts` | `VITE_BASE` env var; default `'/portfolio/'`. |
| A genuine Dorsa screenshot | `public/media/dorsa/` + `src/data/projects.ts` | See **Media honesty** below. |

---

## Résumé

There is **one source of truth** for CV content: **`src/data/cv.json`** — contact
details, professional summary, roles (with intro and bullets), skills and
education. Everything else is generated from it, so the website and the paperwork
can never drift apart:

- **On-site CV** — the `#cv` section (`src/components/Cv.tsx`) renders the
  essentials from `cv.json` — contact, professional summary, skills and
  education — and points to the PDF for the full role-by-role history.
- **Printable CV** — `public/resume.html`, a self-contained, on-brand A4 document.
- **Downloadable PDF** — `public/brian-misocho-moranga-resume.pdf`.

### Generating the printable HTML

```
src/data/cv.json  +  resume/resume.template.html   ->   public/resume.html
```

```bash
npm run resume:build
```

`scripts/build-resume.mjs` is dependency-free plain Node. It fills the marked
slots in the template and **inlines the `@fontsource` woff2 files as data URIs**,
so the generated document prints identically from disk, from the site, or over
HTTP — no font path or server needed. This also runs automatically as `prebuild`,
so every `npm run build` keeps the printable in sync.

### Generating the PDF

The PDF is a print of the generated HTML (A4, CSS page size, background
graphics). With headless Chromium:

1. `npm run resume:build`
2. Serve `public/` over HTTP:
   `python3 -m http.server 5199 --directory public`
3. Open `http://localhost:5199/resume.html` → **Print → Save as PDF** — paper
   **A4**, margins **Default**, **Background graphics** on. Save over
   `public/brian-misocho-moranga-resume.pdf`.

`resume.md` at the repository root remains a **full prose master** — more
detailed than the printed CV — kept for reference. It is no longer the source of
the PDF.

The on-site CV's **Download PDF** button and the Contact section's **Résumé**
button both download `brian-misocho-moranga-resume.pdf` through `asset()`, so
they resolve under the configured base path. The generated `resume.html` is also
served at `/<base>/resume.html` as a live, print-ready web CV and is linked from
the on-site CV as **Open print version**.

---

## Static pre-rendering

The site is a single-page React app, but the production build **pre-renders**
it so the shipped `index.html` already contains the page's content. Without
this, non-JS consumers (search crawlers, link unfurlers, text extractors) would
see only an empty `<div id="root">`.

How it works (`npm run build`):

1. `vite build` → the client bundle and `dist/index.html`.
2. `vite build --ssr src/entry-server.tsx` → a small Node bundle built from the
   same `App`/components (`dist-ssr/`).
3. `node scripts/prerender.mjs` → renders that bundle with `react-dom/server`,
   injects the markup into `dist/index.html`, and **fails the build** if the
   expected content is missing.

In the browser, `src/main.tsx` **hydrates** the pre-rendered markup (falling
back to a plain client render in `npm run dev`). No runtime server is involved
— the output is still fully static.

---

## Crawlability (robots.txt & sitemap.xml)

`public/robots.txt` and `public/sitemap.xml` are copied to the site at build
time.

> **GitHub Pages project sites:** crawlers look for the host-level
> `https://<user>.github.io/robots.txt`, which belongs to GitHub and cannot be
> overridden from a project. The `Sitemap:` line here is therefore
> informational — submit the sitemap directly in **Google Search Console**
> (`https://misocho.github.io/portfolio/sitemap.xml`).

---

## Analytics (Umami Cloud)

Privacy-friendly, cookieless analytics via **https://cloud.umami.is**. The
tracker is **opt-in by configuration**: it is injected only when
`VITE_UMAMI_WEBSITE_ID` is set, so the site makes no third-party request until
you provide an ID.

1. Add the site in Umami Cloud and copy its **Website ID**.
2. Set it locally in `.env.local` (see `.env.example`):
   `VITE_UMAMI_WEBSITE_ID=<your-id>`
3. For the deployed site, add a repository **Variable** (Settings → Secrets
   and variables → Actions → Variables → `VITE_UMAMI_WEBSITE_ID`); the deploy
   workflow passes it to the build.

`src/lib/analytics.ts` loads the tracker and records page views (automatically)
plus **outbound-link** and **file-download** events (e.g. the résumé PDF). It
is a no-op when the ID is absent.

Tracking is restricted to `VITE_UMAMI_DOMAINS` (default: `misocho.github.io`),
so local development and preview builds are never recorded.

---

## Deploying to GitHub Pages

1. Push this project to a repository on GitHub.
2. In the repository: **Settings → Pages → Build and deployment → Source =
   "GitHub Actions"**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and
   deploys automatically.
4. Optional: add the `VITE_UMAMI_WEBSITE_ID` repository **variable** to enable
   analytics (see **Analytics** above).

### Base path (important)

The base path must match where the site is served:

- **Project site** — `https://<user>.github.io/<repo>/` → base `'/<repo>/'`
  (the workflow sets this automatically from the repo name).
- **User/org site** — `https://<user>.github.io/` → base `'/'`.
  Edit the `VITE_BASE` line in the workflow to `VITE_BASE: /`.

Local builds default to `'/portfolio/'`. Override with:

```bash
VITE_BASE=/ npm run build      # for a user/org site
VITE_BASE=/my-repo/ npm run build
```

### Release checklist

Run this before (and after) pushing to `main`:

1. **Gate locally** — `npm run typecheck && npm run lint && npm run build`.
   The build pre-renders into `dist/index.html` and **fails** if required content
   is missing.
2. **Push to `main`** — `.github/workflows/deploy.yml` runs the same gate, then
   deploys. Record the Actions **run ID**.
3. **Verify live** at `https://misocho.github.io/portfolio/`:
   - `200` on `/`, `robots.txt`, `sitemap.xml`, `og-image.jpg`, `favicon.svg`,
     `resume.pdf`, `resume.html`, `404.html`.
   - Page **hydrates** (interactive nav, notes, gallery) with **no console
     errors or hydration warnings**.
   - `robots.txt` allows crawlers and points at `/portfolio/sitemap.xml`.
   - Canonical/OG/Twitter tags match the deployed URL.

> The site is a GitHub Pages **project** site, so the actionable `robots.txt`
> lives at `/portfolio/robots.txt`; the host-root file belongs to GitHub.

---

## Project structure

```
src/
  components/     UI: Nav, Hero, WorkSection, ProjectFeature, Lightbox, Cv, …
  data/           Content: cv.json (CV source of truth), site, projects, experience, skills, notes, nav
  hooks/          useReveal, useScrollSpy, useReducedMotion, useLockBodyScroll
  lib/asset.ts    Resolves /public paths against Vite's base
  lib/analytics.ts   Optional Umami Cloud analytics (no-op without an ID)
  entry-server.tsx   Build-time render entry for pre-rendering
  main.tsx        Client entry: hydrates the pre-rendered markup
  vite-env.d.ts   Typed import.meta.env (VITE_UMAMI_*)
  styles/         tokens → base → layout → components → print
scripts/
  build-resume.mjs   cv.json + template → public/resume.html (no dependencies)
  prerender.mjs      Renders the SSR bundle into dist/index.html
resume/
  resume.template.html   Branded A4 template (with content markers)
public/
  resume.html     Generated printable CV (self-contained; do not edit by hand)
  brian-misocho-moranga-resume.pdf   Downloadable PDF (printed from resume.html)
  robots.txt      Crawl rules + sitemap reference
  sitemap.xml     Single-page sitemap
  media/enkaai/   Prototype screenshots (own work; demo/fixture data only)
  media/beoflow/  Published Beoflow imagery
  media/dorsa/    Published Dorsa imagery + product-suite icons
  og-image.jpg    Social preview (1200×630)
  favicon.svg     404.html  .nojekyll
resume.md         Full prose master for the résumé (reference, not the PDF source)
.env.example      Sample environment variables (no secrets)
```

> Build output: `dist/` (the static site) and `dist-ssr/` (the temporary SSR
> bundle used by the pre-render step; git-ignored).

---

## Media honesty

Every image in `public/media/` is either published on a product's public
marketing site or rendered from Brian's own work, and every one is used to
illustrate products Brian contributed to as part of a wider team. Nothing is
confidential or invented.

- **EnkaAI** has no public site (it is a beta). Its images are rendered from
  **Brian's own prototype** and use **demo/fixture data only** — no customer
  data, credentials or uploaded documents — and are labelled as prototype/beta
  screens throughout. See `MEDIA-SOURCES.md`.
- **Beoflow** publishes genuine interface screenshots; they are shown and
  labelled as such.
- **Dorsa AI does not publish dashboard screenshots.** Its section therefore
  shows a clearly-labelled *illustrative* composition built only from Dorsa's
  own published illustration, hero imagery and product-suite names.

`MEDIA-SOURCES.md` records the origin of every asset and gives step-by-step
instructions for dropping in a genuine Dorsa screenshot when one is cleared for
use. The placeholder entry (`dorsa-placeholder` in `src/data/projects.ts`) is
designed to look intentional until then.

Featured work leads with **EnkaAI** (`01`), then Beoflow (`02`) and Dorsa (`03`).

---

## Accessibility & performance

- Semantic landmarks, a skip link, and visible focus rings throughout (the
  gallery's dark surface swaps the rust ring for a paper one so it stays
  legible).
- The image gallery is a proper modal dialog: focus is trapped and restored,
  `Escape` closes, arrow keys navigate, body scroll is locked, and the rest of
  the page is marked `inert` while it is open.
- All motion respects `prefers-reduced-motion`; scroll reveals degrade to plain
  visible content and transition durations drop to `0ms`.
- Colour pairs were checked against WCAG AA (see comments in
  `src/styles/tokens.css`).
- Images carry intrinsic `width`/`height` (no layout shift) and are lazy-loaded
  below the fold. A print stylesheet produces a clean, ink-friendly résumé view.
- Fonts are self-hosted and **latin-subset only** (the site is English; every
  glyph used sits in the latin range), so the build ships 9 woff2 files instead
  of the full per-script set.

---

## License

Source code © Brian Misocho Morang'a. Product imagery and marks remain the
property of their respective owners (Beoflow, Dorsa AI) and are used for
reference and illustration.
