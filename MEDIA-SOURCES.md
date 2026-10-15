# Media sources & honesty notes

This file records where every image in `public/media/` came from, what it is,
and its status. It exists so the portfolio stays honest: we never present an
invented interface as a real product screenshot.

Most assets below are **published on the public marketing sites** of the
products and were downloaded on the build date. They are used here to showcase
products Brian Misocho Morang'a contributed to as part of a wider team. Replace
or remove any asset if a product owner asks; nothing here is confidential.

The EnkaAI images are the exception and are documented in their own section:
they are rendered from Brian's **own prototype**, not from a third party.

Legend: **SCREENSHOT** = a genuine software interface published by the product ·
**PHOTO** = a photograph published by the product · **ILLUSTRATION** = a diagram
or drawing published by the product · **BRAND** = a logo/wordmark.

---

## EnkaAI — beta, no public site

EnkaAI is in development and has no public marketing site, so none of its
imagery comes from a third party. The images below were rendered from **Brian's
own EnkaAI prototype** — the interactive HTML UI in the EnkaAI codebase — at a
1440×900 capture size and saved as WebP. They are the real prototype interface,
populated entirely with **demo/fixture data** (a fictional "Sarah" persona and
sample suppliers such as Linen House and CleanPro). **No customer data,
credentials or uploaded documents appear in any of them.** Because EnkaAI is a
beta, these are labelled as prototype screens throughout the site.

| Local file | Status | What it is (prototype screen) |
|---|---|---|
| `enkaai/enkaai-command-center.webp` | SCREENSHOT (prototype) | Command Center — the queue of decisions awaiting a person. |
| `enkaai/enkaai-approvals.webp` | SCREENSHOT (prototype) | Approvals — a purchase order awaiting approval with its audit context (PO-1012, Linen House, KES 84,500). |
| `enkaai/enkaai-purchase-orders.webp` | SCREENSHOT (prototype) | Purchase orders — the PO list and their statuses (PO-1012, PO-1018, …). |
| `enkaai/enkaai-data-sources.webp` | SCREENSHOT (prototype) | Data sources — connected inputs and their import state. |
| `enkaai/enkaai-audit.webp` | SCREENSHOT (prototype) | Audit — the append-only record of what was observed, recommended, approved and done. |

> These captures use demo/fixture data only. Do not replace them with images
> that contain real supplier documents, personal data or credentials.

---

## Beoflow — https://beoflow.com/

| Local file | Status | What it is (per Beoflow's own page) | Origin URL |
|---|---|---|---|
| `beoflow/squad-dashboard.webp` | SCREENSHOT | Coach-facing squad overview — "Same event, different preparation, one overview … every member's readiness for the event in one view." | https://beoflow.com/bg/squad-track.webp |
| `beoflow/athlete-phone-dashboard.webp` | SCREENSHOT | Athlete app, "My data": 37 days until the goal, readiness 74 vs a 7-day average of 67, sleep 6 h 37 min. | https://beoflow.com/bg/phonedash.webp |
| `beoflow/app-week.webp` | SCREENSHOT | Athlete app, weekly activities: five sessions, 3.9 hours, 6 km, 17.2 tonnes. | https://beoflow.com/bg/app-week.webp |
| `beoflow/app-load.webp` | SCREENSHOT | Athlete app, "Lens": hybrid load & balance, combined ratio 1.42. | https://beoflow.com/bg/app-load.webp |
| `beoflow/app-done.webp` | SCREENSHOT | Athlete app, post-session summary: HR 135 bpm, cardio load 56.2, strength load 59.2. | https://beoflow.com/bg/app-done.webp |
| `beoflow/coach-in-use.webp` | PHOTO | Product in use: a coach and an athlete at a table in a gym with the coach dashboard open on a laptop (matches Beoflow's own `og:image:alt`). | https://beoflow.com/bg/hero-coach-dark.webp |
| `beoflow/wordmark.svg` | BRAND | Beoflow wordmark. | https://beoflow.com/brand/wordmark.svg |
| `beoflow/icon.svg` | BRAND | Beoflow app icon. | https://beoflow.com/brand/icon.svg |

> The athlete-app alt text above is Beoflow's **own** published alternative text,
> reproduced so the description is faithful to the source rather than invented.

---

## Dorsa AI — https://www.dorsa.ai/

Dorsa's public site does **not** expose dashboard screenshots. It publishes an
illustration, a set of product-suite icons, a hero video/poster and brand art.
The portfolio therefore presents Dorsa with a clearly-labelled **illustrative
composition** built from these authentic materials — not a fake screenshot.

| Local file | Status | What it is | Origin URL |
|---|---|---|---|
| `dorsa/hub-spoke-illustration.png` | ILLUSTRATION | Dorsa's own "Intelligent hub with computer vision and smart sensors" diagram (hub-and-spoke architecture). | cdn.prod.website-files.com/…/6696b3e4…_Website%20Illustration%20(1).png |
| `dorsa/hero-poster.jpg` | PHOTO | Poster frame of Dorsa's hero background film. | cdn.prod.website-files.com/…/62cc10b0…_video-1080-poster-00001.jpg |
| `dorsa/og.jpg` | ILLUSTRATION | Dorsa's social share card. | cdn.prod.website-files.com/…/62fe3f7b…_OG.jpg |
| `dorsa/logo.svg` | BRAND | Dorsa logo. | cdn.prod.website-files.com/…/62c68e59…_logo.svg |
| `dorsa/suite-scout.svg` | BRAND | Product-suite icon: **SCOUT**. | cdn.prod.website-files.com/…/62d80dad…_icon-1.svg |
| `dorsa/suite-assistant.svg` | BRAND | Product-suite icon: **ASSISTANT**. | cdn.prod.website-files.com/…/…_icon-2.svg |
| `dorsa/suite-crisis.svg` | BRAND | Product-suite icon: **CRISIS MANAGEMENT**. | cdn.prod.website-files.com/…/…_icon-3.svg |
| `dorsa/suite-tracker.svg` | BRAND | Product-suite icon: **TRACKER**. | cdn.prod.website-files.com/…/…_icon-4.svg |
| `dorsa/suite-comms.svg` | BRAND | Product-suite icon: **COMMS**. | cdn.prod.website-files.com/…/…_icon-5.svg |
| `dorsa/suite-optimizer.svg` | BRAND | Product-suite icon: **Optimizer**. | cdn.prod.website-files.com/…/…_Optimizer%20(2).svg |
| `dorsa/suite-navigator.svg` | BRAND | Product-suite icon: **Navigator**. | cdn.prod.website-files.com/…/62ecfd27…_Navigator.svg |

The suite/channel names (SCOUT, ASSISTANT, CRISIS MANAGEMENT, TRACKER, COMMS,
Optimizer, Navigator) are taken directly from Dorsa's own "Product Suite"
section.

---

## ▶ ADD A GENUINE DORSA SCREENSHOT HERE

When Brian has a cleared, non-confidential screenshot (or an approved marketing
image) of the Dorsa platform, drop it in as:

```
public/media/dorsa/platform-screenshot-01.webp
```

Then, in `src/data/projects.ts`, replace the placeholder entry whose
`placeholder: true` (id `dorsa-placeholder`) with a real entry, e.g.:

```ts
{
  src: '/media/dorsa/platform-screenshot-01.webp',
  width: 1600, height: 1000,           // real dimensions, to avoid layout shift
  alt: 'Describe exactly what the screenshot shows.',
  caption: 'Dorsa platform — screenshot.',
  kind: 'screenshot',
  credit: { label: 'Image: Dorsa AI', href: 'https://www.dorsa.ai/' },
}
```

Do not invent what an unavailable screenshot shows. If no cleared image exists,
leave the placeholder in place — it is designed to look intentional.
