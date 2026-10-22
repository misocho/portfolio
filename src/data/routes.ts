import { asset } from '../lib/asset';
import { beoflow, dorsa, enkaai, type Project } from './projects';
import { notes, type EngineeringNote } from './notes';

type RouteBase = {
  /** Path relative to the Vite base, always with a trailing slash. */
  path: string;
  title: string;
  description: string;
  /** Path in /public, resolved through asset() at render time. */
  ogImage: string;
};

export type SiteRoute =
  | (RouteBase & { kind: 'home' })
  | (RouteBase & { kind: 'project'; project: Project })
  | (RouteBase & { kind: 'note'; note: EngineeringNote });

export const homeRoute: SiteRoute = {
  kind: 'home',
  path: '/',
  title: 'Brian Misocho — Backend engineer, AI & distributed systems',
  description:
    'Senior backend engineer in Nairobi. Case studies from EnkaAI, Beoflow and Dorsa AI, plus notes on async reliability, performance and AI systems.',
  ogImage: '/og-image.jpg',
};

const projectRoutes: SiteRoute[] = [
  {
    kind: 'project',
    project: enkaai,
    path: '/work/enkaai/',
    title: 'EnkaAI — AI procurement backend · Brian Misocho',
    description:
      'Inside EnkaAI: deterministic rules around AI extraction, human approval for consequential actions, and idempotent imports in a procurement platform.',
    ogImage: '/og-enkaai.jpg',
  },
  {
    kind: 'project',
    project: beoflow,
    path: '/work/beoflow/',
    title: 'Beoflow — fast, correct time-series processing · Brian Misocho',
    description:
      'How a Rust rewrite took Beoflow’s per-athlete readiness recomputation from seconds to milliseconds without giving up correctness.',
    ogImage: '/og-beoflow.jpg',
  },
  {
    kind: 'project',
    project: dorsa,
    path: '/work/dorsa-ai/',
    title: 'Dorsa AI — backend for perioperative care · Brian Misocho',
    description:
      'Backend leadership for Dorsa AI’s perioperative care platform: multi-tenant services, AI/NLP workflow orchestration and document ingestion.',
    ogImage: '/og-dorsa-ai.jpg',
  },
];

const noteRoutes: SiteRoute[] = [
  {
    kind: 'note',
    note: notes[0],
    path: '/notes/async-reliability/',
    title: 'Making asynchronous systems reliable · Brian Misocho',
    description:
      'A practical note on making async work legible: explicit units of work, stable identifiers, and retries that are safe to repeat.',
    ogImage: '/og-note-async-reliability.jpg',
  },
  {
    kind: 'note',
    note: notes[1],
    path: '/notes/processing-speed/',
    title: 'Faster processing without breaking correctness · Brian Misocho',
    description:
      'How to make a slow path faster without losing correctness: pin down the contract, measure the change, and state the scope.',
    ogImage: '/og-note-processing-speed.jpg',
  },
  {
    kind: 'note',
    note: notes[2],
    path: '/notes/understandable-apis/',
    title: 'APIs and data models that stay understandable · Brian Misocho',
    description:
      'Why the shape of a data model is a promise, and how explicit states and tenant boundaries keep APIs understandable.',
    ogImage: '/og-note-understandable-apis.jpg',
  },
  {
    kind: 'note',
    note: notes[3],
    path: '/notes/ai-where-it-helps/',
    title: 'Using AI where it adds value · Brian Misocho',
    description:
      'A boundary for AI in operations: let models read and propose, keep consequential decisions with accountable people.',
    ogImage: '/og-note-ai-where-it-helps.jpg',
  },
];

export const routes: SiteRoute[] = [homeRoute, ...projectRoutes, ...noteRoutes];

/** Turn a browser pathname into the canonical route path. */
export function routePath(pathname: string): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const relative = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  const trimmed = relative.replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

export function getRoute(pathname: string): SiteRoute {
  const path = routePath(pathname);
  return routes.find((route) => route.path === path) ?? homeRoute;
}

export function routeHref(path: string): string {
  return asset(path);
}

export function homeHref(hash?: string): string {
  return `${asset('/')}${hash ? `#${hash}` : ''}`;
}

export function projectRoute(id: string): SiteRoute | undefined {
  return projectRoutes.find(
    (route) => route.kind === 'project' && route.project.id === id,
  );
}

export function noteRoute(id: string): SiteRoute | undefined {
  return noteRoutes.find(
    (route) => route.kind === 'note' && route.note.id === id,
  );
}

export function nextProjectRoute(id: string): SiteRoute {
  const index = projectRoutes.findIndex(
    (route) => route.kind === 'project' && route.project.id === id,
  );
  return projectRoutes[(index + 1) % projectRoutes.length] ?? projectRoutes[0];
}

export function nextNoteRoute(id: string): SiteRoute {
  const index = noteRoutes.findIndex(
    (route) => route.kind === 'note' && route.note.id === id,
  );
  return noteRoutes[(index + 1) % noteRoutes.length] ?? noteRoutes[0];
}
