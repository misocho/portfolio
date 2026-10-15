import { asset } from '../lib/asset';

export type MediaKind = 'screenshot' | 'illustration' | 'photo';

export interface MediaCredit {
  label: string;
  href: string;
}

export interface ProjectMedia {
  id: string;
  /** Path relative to /public, resolved through asset() at render time. */
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  kind: MediaKind;
  credit?: MediaCredit;
  /** Marks an intentionally-empty slot for a genuine asset to be supplied later. */
  placeholder?: boolean;
}

/** A single expandable technical explanation. */
export interface TechnicalDetail {
  title: string;
  paragraphs: string[];
}

/** One concrete, honest artifact that supports the claims above it. */
export interface EvidenceArtifact {
  title: string;
  lead: string;
  points: string[];
  note?: string;
}

export interface Project {
  id: string;
  index: string;
  name: string;
  category: string;
  kicker: string;
  title: string;
  tagline: string;
  summary: string;
  contribution: string[];
  outcome: string;
  /** Concrete programming languages. */
  languages: string[];
  /** Tools, platforms and infrastructure. */
  technologies: string[];
  /** Domains and areas of practice. */
  areas: string[];
  /**
   * A live product link, only where it exists and is appropriate to publish.
   * Omit (or set null) when there is no public destination — never render a
   * disabled or staging link.
   */
  external?: { label: string; href: string } | null;
  media: ProjectMedia[];
  /** Optional one-line override for the note beneath the media plate. */
  mediaNote?: string;
  technical?: TechnicalDetail[];
  evidence?: EvidenceArtifact;
  honestyNote: string;
  theme: 'beoflow' | 'dorsa' | 'enkaai';
}

const BEOFLOW_CREDIT: MediaCredit = {
  label: 'Image: Beoflow',
  href: 'https://beoflow.com/',
};

const DORSA_CREDIT: MediaCredit = {
  label: 'Image: Dorsa AI',
  href: 'https://www.dorsa.ai/',
};

/* ------------------------------------------------------------------ */
/* 001 · EnkaAI — the lead case study                                  */
/* ------------------------------------------------------------------ */

export const enkaai: Project = {
  id: 'enkaai',
  index: '01',
  name: 'EnkaAI',
  category: 'AI procurement & operations · Backend engineering',
  kicker: 'Featured project · 01',
  title: 'EnkaAI',
  tagline: 'Making fragmented operations easier to manage.',
  summary:
    'Procurement work scatters across spreadsheets, email, supplier documents, inventory systems and existing business software. EnkaAI is an AI-enabled procurement and operations platform that brings purchasing, supplier interactions and operational data into one controlled process — without asking an organisation to replace the systems it already runs.',
  contribution: [
    'Design and build backend services and APIs with Python, FastAPI, PostgreSQL and Docker, including data models for suppliers, purchase orders, invoices and operational exceptions.',
    'Implemented strict validation and normalization of imported operational data, with LLM-assisted extraction sitting behind deterministic business rules.',
    'Added human approval workflows and auditing for consequential actions.',
    'Wrote automated coverage for import correctness and idempotent processing.',
  ],
  outcome:
    'In development — a beta in the hands of testing customers, reached in about three months from the first idea. Every interface shown here is from the product’s prototype/beta build.',
  languages: ['Python'],
  technologies: ['FastAPI', 'PostgreSQL', 'Docker'],
  areas: [
    'Backend architecture',
    'API design',
    'Data validation & normalization',
    'AI-assisted extraction',
    'Human-in-the-loop approval',
    'Audit & traceability',
  ],
  external: null,
  media: [
    {
      id: 'command-center',
      src: asset('/media/enkaai/enkaai-command-center.webp'),
      width: 1440,
      height: 900,
      alt: 'EnkaAI Command Center: a morning briefing that states the routine work has already been handled, followed by the specific decisions — a delayed delivery, an invoice mismatch — that still need the operator.',
      caption:
        'Command Center — the operator’s morning view: routine work already handled, and the decisions that still need a person.',
      kind: 'screenshot',
    },
    {
      id: 'approvals',
      src: asset('/media/enkaai/enkaai-approvals.webp'),
      width: 1440,
      height: 900,
      alt: 'EnkaAI Approvals screen: a purchase order awaiting authorisation, showing EnkaAI’s recommendation with price, reliability and urgency reasoning, and Approve, Reject, Defer actions.',
      caption:
        'Approvals — consequential actions wait for a person, shown with the reasoning (price, reliability, urgency) behind each recommendation.',
      kind: 'screenshot',
    },
    {
      id: 'purchase-orders',
      src: asset('/media/enkaai/enkaai-purchase-orders.webp'),
      width: 1440,
      height: 900,
      alt: 'EnkaAI Purchase Orders list: orders across suppliers with amount and status — pending approval, confirmed, delayed and delivered.',
      caption:
        'Purchase orders — orders, deliveries and approvals tracked across suppliers in one list.',
      kind: 'screenshot',
    },
    {
      id: 'data-sources',
      src: asset('/media/enkaai/enkaai-data-sources.webp'),
      width: 1440,
      height: 900,
      alt: 'EnkaAI Data Sources screen: connected systems such as a point-of-sale/ERP feed, the agent roster, document intelligence and channels, with recent import activity.',
      caption:
        'Data sources — the systems and channels EnkaAI reads from, with recent import activity.',
      kind: 'screenshot',
    },
    {
      id: 'audit',
      src: asset('/media/enkaai/enkaai-audit.webp'),
      width: 1440,
      height: 900,
      alt: 'EnkaAI Audit trail: a timeline of a three-way match — invoice received, match completed, a KES 7,500 discrepancy identified, the supplier contacted and a reply received.',
      caption:
        'Audit — a traceable record of actions and decisions, here following one three-way-match discrepancy end to end.',
      kind: 'screenshot',
    },
  ],
  mediaNote:
    'EnkaAI interface — prototype/beta build with demo data (no customer information).',
  technical: [
    {
      title: 'Deterministic rules around AI extraction',
      paragraphs: [
        'The model proposes; the system decides. Extraction from supplier documents and messages is only ever a suggestion — it is validated against a schema and explicit business rules before it can affect a purchase order.',
        'That separation is the point: AI stays useful for messy, real-world inputs without letting a hallucination become a financial record.',
      ],
    },
    {
      title: 'Human approval for consequential actions',
      paragraphs: [
        'Actions that commit money or change supplier state do not execute automatically. They pass through an approval step, with the reasoning shown to the operator alongside the decision.',
        'Low-risk actions — follow-ups, reminders, tagging — stay automatic, so the queue reflects what actually needs a person rather than everything the system touches.',
      ],
    },
    {
      title: 'Every action is auditable',
      paragraphs: [
        'Each step in the loop — what was observed, what was recommended, what a person approved and what then executed — is written to a durable, append-only record.',
        'That record is what makes an AI-assisted process trustworthy in operations: any result can be traced back to the inputs and the decision that produced it, rather than to a model’s word alone.',
      ],
    },
  ],
  evidence: {
    title: 'Idempotent imports',
    lead: 'Import is where an operations system most easily duplicates its own data. EnkaAI treats every inbound record as an upsert keyed on a stable source identifier.',
    points: [
      'Re-running the same import updates existing rows instead of inserting duplicates.',
      'The same guarantee covers inbound supplier messages: a message is persisted before the webhook is acknowledged, so a retry is a no-op rather than a second record.',
      'Import correctness and idempotency are exercised by the backend test suite.',
    ],
    note: 'A simplified description of the approach — not a production trace or a live dataset.',
  },
  honestyNote:
    'EnkaAI is in development and shown as a beta. The screens above are from the product’s own prototype/beta build and use demo data, not a live customer environment. Brian is a part-time backend engineer on the platform; the interfaces reflect the product the team is building, not the work of one person alone.',
  theme: 'enkaai',
};

/* ------------------------------------------------------------------ */
/* 002 · Beoflow                                                       */
/* ------------------------------------------------------------------ */

export const beoflow: Project = {
  id: 'beoflow',
  index: '02',
  name: 'Beoflow',
  category: 'Sports technology · Backend engineering',
  kicker: 'Featured project · 02',
  title: 'Beoflow',
  tagline: 'Turning dense performance data into something a coach can act on.',
  summary:
    'Beoflow gives coaches an overview of how a whole squad is preparing for an event, and gives each athlete a clear picture of their own readiness, load and recovery. The hard part is not collecting the data — it is processing a stream of it fast enough, and reliably enough, to be trusted at the moment a decision is made.',
  contribution: [
    'Built and maintained backend services for the platform as part of a wider engineering team.',
    'Worked on asynchronous, time-series processing so performance data stays current under load.',
    'Integrated AI analytics into the pipeline to add value on top of raw measurements.',
    'Led a Rust rewrite of the per-athlete readiness recomputation, bringing processing from seconds to milliseconds.',
  ],
  outcome:
    'A path that once recomputed readiness in seconds now completes in milliseconds — fast enough to sit closer to real-time, without giving up correctness.',
  languages: ['Python', 'Rust'],
  technologies: [],
  areas: ['Asynchronous time-series processing', 'AI analytics'],
  external: { label: 'Visit Beoflow', href: 'https://beoflow.com/' },
  media: [
    {
      id: 'squad-dashboard',
      src: asset('/media/beoflow/squad-dashboard.webp'),
      width: 1024,
      height: 1536,
      alt: "Beoflow's coach interface showing a squad's event-readiness overview — every member's preparation for an event in one view.",
      caption: 'Coach squad overview — event readiness in a single view (screenshot published by Beoflow).',
      kind: 'screenshot',
      credit: BEOFLOW_CREDIT,
    },
    {
      id: 'athlete-phone-dashboard',
      src: asset('/media/beoflow/athlete-phone-dashboard.webp'),
      width: 589,
      height: 1280,
      alt:
        "Beoflow athlete app, 'My data': 37 days until the goal, readiness 74 against a seven-day average of 67, and last night's sleep of 6 h 37 min.",
      caption: 'Athlete app — “My data”: readiness, its seven-day average, and last night’s sleep.',
      kind: 'screenshot',
      credit: BEOFLOW_CREDIT,
    },
    {
      id: 'app-week',
      src: asset('/media/beoflow/app-week.webp'),
      width: 640,
      height: 1388,
      alt: "Beoflow athlete app, weekly activities: five sessions, 3.9 hours, 6 km and 17.2 tonnes over the week.",
      caption: 'Athlete app — the week at a glance: sessions, hours, distance and total load.',
      kind: 'screenshot',
      credit: BEOFLOW_CREDIT,
    },
    {
      id: 'app-load',
      src: asset('/media/beoflow/app-load.webp'),
      width: 640,
      height: 1388,
      alt: "Beoflow athlete app, 'Lens': hybrid load and balance with a combined ratio of 1.42.",
      caption: 'Athlete app — “Lens”: hybrid load and balance, combined ratio 1.42.',
      kind: 'screenshot',
      credit: BEOFLOW_CREDIT,
    },
    {
      id: 'app-done',
      src: asset('/media/beoflow/app-done.webp'),
      width: 640,
      height: 1388,
      alt: 'Beoflow athlete app, post-session summary: heart rate 135 bpm, cardio load 56.2 and strength load 59.2.',
      caption: 'Athlete app — post-session summary: heart rate, cardio load and strength load.',
      kind: 'screenshot',
      credit: BEOFLOW_CREDIT,
    },
    {
      id: 'coach-in-use',
      src: asset('/media/beoflow/coach-in-use.webp'),
      width: 1536,
      height: 1024,
      alt: 'A coach and an athlete at a table in a gym, with the Beoflow coach dashboard open on a laptop.',
      caption: 'In use — a coach and athlete reviewing the dashboard together (photo published by Beoflow).',
      kind: 'photo',
      credit: BEOFLOW_CREDIT,
    },
  ],
  technical: [
    {
      title: 'Asynchronous time-series processing',
      paragraphs: [
        'Performance data arrives continuously and is only useful if it is current when a coach looks at it. That pushes the work off the request-response path: data is ingested, queued, then processed by workers so a slow computation never blocks a user.',
        'Correctness under load matters as much as speed — a number that is fast but wrong is worse than one that is late.',
      ],
    },
    {
      title: 'A Rust optimization on the hot path',
      paragraphs: [
        'The per-athlete readiness recomputation — deriving readiness from raw sensor streams — was migrated to Rust, taking the work from seconds down to milliseconds.',
        'The gain is scoped deliberately: it refers to the processing work Brian led on that path, not to the product as a whole. The team adopted the change afterwards.',
      ],
    },
  ],
  honestyNote:
    'Brian worked as a backend engineer within a wider Beoflow team. The performance figure above refers to the specific processing work he led, not to the product as a whole. All images are published by Beoflow on beoflow.com.',
  theme: 'beoflow',
};

/* ------------------------------------------------------------------ */
/* 003 · Dorsa AI                                                      */
/* ------------------------------------------------------------------ */

export const dorsa: Project = {
  id: 'dorsa',
  index: '03',
  name: 'Dorsa AI',
  category: 'Healthcare technology · Backend leadership',
  kicker: 'Featured project · 03',
  title: 'Dorsa AI',
  tagline: 'Helping operating-room teams coordinate work that cannot wait.',
  summary:
    'Dorsa builds software for perioperative care — the time around surgery, where schedules shift, information is scattered, and coordination decides how a day goes. The work sits at the meeting point of backend services, AI and natural-language workflows, and cloud infrastructure that has to stay dependable.',
  contribution: [
    'Led backend engineering for the platform within a small team of backend, hardware and junior engineers.',
    'Owned the backend services and APIs (including multi-tenancy), the NLP and AI-enabled workflow orchestration, data processing and surgery-document ingestion, and deployments.',
    'Built and maintained the cloud-based services the product relies on, and contributed to the front-end web app and a Raspberry Pi device when needed.',
    'Contributed to operational improvements associated with roughly 15 minutes less turnover per procedure.',
  ],
  outcome:
    'Operational gains in a setting where small amounts of time, recovered consistently across a whole day of procedures, add up.',
  languages: ['Python'],
  technologies: ['Docker', 'AWS'],
  areas: ['Backend services & multi-tenancy', 'AI & NLP workflow orchestration', 'Document ingestion'],
  external: { label: 'Explore Dorsa AI', href: 'https://www.dorsa.ai/' },
  media: [
    {
      id: 'hub-spoke-illustration',
      src: asset('/media/dorsa/hub-spoke-illustration.png'),
      width: 445,
      height: 592,
      alt: "Dorsa's hub-and-spoke platform illustration — an intelligent hub with computer vision and smart sensors.",
      caption: 'Dorsa’s platform illustration: an intelligent hub with computer vision and smart sensors.',
      kind: 'illustration',
      credit: DORSA_CREDIT,
    },
    {
      id: 'hero-poster',
      src: asset('/media/dorsa/hero-poster.jpg'),
      width: 1280,
      height: 720,
      alt: 'Poster frame from Dorsa’s hero background film, published on dorsa.ai.',
      caption: 'Poster frame from Dorsa’s hero film (published by Dorsa AI).',
      kind: 'photo',
      credit: DORSA_CREDIT,
    },
    {
      id: 'og-card',
      src: asset('/media/dorsa/og.jpg'),
      width: 960,
      height: 540,
      alt: 'Dorsa AI social preview card.',
      caption: 'Dorsa AI social preview card.',
      kind: 'illustration',
      credit: DORSA_CREDIT,
    },
    {
      id: 'dorsa-placeholder',
      src: '',
      width: 1600,
      height: 1000,
      alt: '',
      caption: '',
      kind: 'screenshot',
      placeholder: true,
    },
  ],
  technical: [
    {
      title: 'Backend architecture for time-sensitive workflows',
      paragraphs: [
        'Perioperative care runs on a schedule that changes under pressure. The backend has to keep services, data and notifications consistent while a day is being reshaped in real time.',
        'That meant leading the design and maintenance of the services and APIs the product depends on — including multi-tenancy — and keeping them operable on cloud infrastructure.',
      ],
    },
    {
      title: 'AI & NLP workflow orchestration',
      paragraphs: [
        'A lot of the coordination work is language: messages, notes and status updates that a person would otherwise read and route by hand. The platform uses AI and NLP to help interpret and direct that work.',
        'The aim is assistive rather than autonomous — surfacing and routing information so clinical teams stay in control. The work included ingesting the surgery documents teams had to upload and processing them for downstream use.',
      ],
    },
  ],
  honestyNote:
    "Dorsa's public site does not publish a dashboard screenshot, so none is shown. The composition on this page is illustrative and built only from Dorsa's own published illustration, hero imagery and product-suite names. Brian was backend lead within a small team (backend, hardware and junior engineers); the ~15-minute figure is an internal estimate across partner hospitals over about a year, associated with the broader operational improvement and not attributed to him alone. See MEDIA-SOURCES.md for how to drop in a genuine screenshot.",
  theme: 'dorsa',
};

/** Featured projects, in the order they should appear. EnkaAI leads. */
export const projects: Project[] = [enkaai, beoflow, dorsa];
