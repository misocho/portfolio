import { useRef, useState } from 'react';
import { site } from '../data/site';
import { ArrowRight, ArrowUpRight } from './icons';

const ink = { stroke: 'var(--ink)' } as const;
const rust = { stroke: 'var(--rust)' } as const;
const monoLabel = { fill: 'var(--muted)', fontFamily: 'var(--font-mono)' } as const;
const inkLabel = { fill: 'var(--ink)', fontFamily: 'var(--font-mono)' } as const;

const nodes = [
  { y: 112, label: '01 · INGEST' },
  { y: 190, label: '02 · QUEUE' },
  { y: 268, label: '03 · PROCESS' },
  { y: 346, label: '04 · SERVE' },
];

const bars = [26, 40, 22, 52, 34, 60, 44, 30, 56, 38, 48, 28];

/**
 * Plain-language descriptions of the four stages. These are general backend
 * engineering explanations — they do not claim to describe every featured
 * project's implementation.
 */
const stages = [
  {
    id: 'ingest',
    label: '01 · Ingest',
    blurb: 'Validate inputs, normalize data, and handle unexpected formats.',
  },
  {
    id: 'queue',
    label: '02 · Queue',
    blurb: 'Decouple incoming requests from longer-running work and support reliable processing.',
  },
  {
    id: 'process',
    label: '03 · Process',
    blurb: 'Apply explicit business rules, perform asynchronous work, and handle failures safely.',
  },
  {
    id: 'serve',
    label: '04 · Serve',
    blurb: 'Expose useful results through APIs or interfaces and preserve traceability.',
  },
];

function HeroSchematic({ activeIndex }: { activeIndex: number }) {
  return (
    <svg
      viewBox="0 0 420 470"
      role="img"
      aria-label="A schematic of a data pipeline — ingest, queue, process and serve — feeding a small time-series chart. The selected stage is highlighted."
    >
      <defs>
        <pattern id="hero-grid" width="21" height="21" patternUnits="userSpaceOnUse">
          <path d="M21 0H0V21" fill="none" style={{ stroke: 'var(--dorsa-grid)' }} strokeWidth={0.75} />
        </pattern>
      </defs>

      <rect x="0" y="0" width="420" height="470" fill="url(#hero-grid)" />

      {/* corner registration marks */}
      {[
        [10, 10, 1, 1],
        [410, 10, -1, 1],
        [10, 460, 1, -1],
        [410, 460, -1, -1],
      ].map(([x, y, sx, sy], i) => (
        <g key={i} style={{ stroke: 'var(--border-strong)' }} strokeWidth={1}>
          <line x1={x} y1={y} x2={x + 12 * sx} y2={y} />
          <line x1={x} y1={y} x2={x} y2={y + 12 * sy} />
        </g>
      ))}

      <text x="24" y="34" fontSize="10" letterSpacing="1.6" style={monoLabel}>
        SYSTEM SKETCH — No. 1
      </text>
      <text x="396" y="34" fontSize="10" letterSpacing="1.6" textAnchor="end" style={inkLabel}>
        FIG. A
      </text>

      {/* pipeline spine */}
      <path
        d="M84 96 V372"
        fill="none"
        style={ink}
        strokeWidth={1.5}
        data-anim="draw"
      />

      {/* nodes */}
      {nodes.map((n, i) => {
        const isActive = i === activeIndex;
        return (
          <g key={n.label}>
            <rect
              x={76}
              y={n.y - 8}
              width={16}
              height={16}
              transform={`rotate(45 84 ${n.y})`}
              style={{
                stroke: isActive ? 'var(--rust)' : 'var(--forest)',
                fill: isActive ? 'var(--rust)' : 'var(--paper)',
              }}
              strokeWidth={isActive ? 2 : 1.5}
            />
            <text
              x="106"
              y={n.y + 4}
              fontSize="11"
              letterSpacing="0.6"
              style={{ fill: isActive ? 'var(--ink)' : 'var(--muted)', fontFamily: 'var(--font-mono)' }}
              fontWeight={isActive ? 600 : 400}
            >
              {n.label}
            </text>
          </g>
        );
      })}

      {/* dashed connector from PROCESS to chart panel */}
      <path
        d="M92 268 H150 V212 H196"
        fill="none"
        style={rust}
        strokeWidth={1.2}
        strokeDasharray="4 4"
        data-anim="draw"
      />

      {/* chart panel */}
      <g>
        <rect
          x="196"
          y="128"
          width="200"
          height="164"
          fill="var(--paper-raise)"
          style={{ stroke: 'var(--border-strong)' }}
          strokeWidth={1}
        />
        <text x="208" y="150" fontSize="9" letterSpacing="1.4" style={monoLabel}>
          THROUGHPUT / ms
        </text>

        {/* bars */}
        {bars.map((h, i) => {
          const x = 210 + i * 15;
          const base = 278;
          const hot = i >= 6;
          return (
            <rect
              key={i}
              x={x}
              y={base - h}
              width={8}
              height={h}
              rx={1}
              style={{ fill: hot ? 'var(--rust)' : 'var(--sage)' }}
              opacity={hot ? 0.9 : 0.75}
            />
          );
        })}

        {/* axes */}
        <line x1="206" y1="278" x2="392" y2="278" style={ink} strokeWidth={1} />
        <line x1="206" y1="168" x2="206" y2="278" style={ink} strokeWidth={1} />
      </g>

      {/* timeline under the spine */}
      <g style={{ stroke: 'var(--border-strong)' }} strokeWidth={1}>
        <line x1="60" y1="398" x2="360" y2="398" />
        {[60, 120, 180, 240, 300, 360].map((x) => (
          <line key={x} x1={x} y1="398" x2={x} y2="403" />
        ))}
      </g>
      <text x="360" y="420" fontSize="10" letterSpacing="1.2" textAnchor="end" style={monoLabel}>
        t →
      </text>

      {/* annotation bracket */}
      <g style={ink}>
        <path
          d="M24 350 H48 V346 M48 350 V354"
          fill="none"
          strokeWidth={1}
          style={{ stroke: 'var(--border-strong)' }}
        />
      </g>
      <text x="24" y="372" fontSize="10" letterSpacing="1.2" style={{ fill: 'var(--rust)', fontFamily: 'var(--font-mono)' }}>
        STREAM → PROCESS → SERVE
      </text>
    </svg>
  );
}

function SystemSketch() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (i: number) => {
    tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = stages.length - 1;
    let next = i;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      next = i === last ? 0 : i + 1;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      next = i === 0 ? last : i - 1;
    } else if (e.key === 'Home') {
      next = 0;
    } else if (e.key === 'End') {
      next = last;
    } else {
      return;
    }
    e.preventDefault();
    setActive(next);
    focusTab(next);
  };

  const current = stages[active];

  return (
    <div className="sketch">
      <HeroSchematic activeIndex={active} />

      <div className="sketch__panel">
        <div className="sketch__tabs" role="tablist" aria-label="System sketch stages">
          {stages.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`sketch-tab-${s.id}`}
              aria-selected={i === active}
              aria-controls="sketch-readout"
              tabIndex={i === active ? 0 : -1}
              className="sketch__tab"
              data-active={i === active}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div
          className="sketch__readout"
          id="sketch-readout"
          role="tabpanel"
          aria-labelledby={`sketch-tab-${current.id}`}
          tabIndex={0}
        >
          <p className="sketch__stage">
            <span className="sketch__dot" aria-hidden="true" />
            {current.label}
          </p>
          <p className="sketch__blurb">{current.blurb}</p>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div>
          <p className="hero__edition label">
            <span className="hero__edition-line" aria-hidden="true" />
            {site.edition}
          </p>
          <h1 className="hero__title">
            Notes from the <em>backend</em>.
          </h1>
          <p className="hero__byline">
            {site.name}
            <span className="hero__byline-place"> · {site.location}</span>
          </p>
          <p className="hero__role">
            Senior Backend Engineer · AI Systems · Distributed Systems · Python
          </p>
          <p className="hero__lede">
            Senior backend engineer with seven years across AI systems and distributed systems. I
            design and build services, APIs and data pipelines — asynchronous processing, strict
            validation and explicit business rules — for products in healthcare, sport and
            operations. What follows is an honest record of the work, the engineering decisions
            behind it, and the evidence behind each claim.
          </p>
          {site.availability && (
            <p className="hero__status">
              <span className="dot" aria-hidden="true" />
              {site.availability}
            </p>
          )}
          <div className="hero__actions">
            <a className="btn btn--primary" href="#work">
              Explore selected work
              <ArrowRight className="btn__arrow" width={14} height={14} />
            </a>
            <a className="btn btn--ghost" href="#cv">
              View CV
              <ArrowRight width={14} height={14} />
            </a>
          </div>
          <div className="hero__links">
            <a className="arrow-link" href={site.github}>
              GitHub
              <ArrowUpRight width={13} height={13} />
            </a>
            <a className="arrow-link" href={site.linkedin}>
              LinkedIn
              <ArrowUpRight width={13} height={13} />
            </a>
            <a className="arrow-link" href={`mailto:${site.email}`}>
              Email
              <ArrowUpRight width={13} height={13} />
            </a>
          </div>
          <div className="hero__ribbon" aria-label="Areas of focus">
            <span>Python</span>
            <span>Backend systems</span>
            <span>Time-series data</span>
            <span>AI workflows</span>
            <span>Rust</span>
          </div>
        </div>

        <div className="hero__figure" data-reveal>
          <SystemSketch />
        </div>
      </div>
    </section>
  );
}
