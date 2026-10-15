const mono = { fontFamily: 'var(--font-mono)' } as const;

const loopStages = ['Observe', 'Reason', 'Recommend', 'Execute', 'Verify'];

/**
 * The real governing loop from EnkaAI's backend: observe → reason (behind a
 * constraint gate) → recommend → execute (behind an approval gateway) → verify,
 * with every step audited. Drawn from the product's own documented rules.
 */
function GovernedLoop() {
  const y = 150;
  const xs = [52, 136, 220, 304, 388];

  return (
    <svg
      viewBox="0 0 440 300"
      role="img"
      aria-label="The EnkaAI governed loop: observe, reason, recommend, execute and verify. A constraint gate runs before scoring, an approval gateway runs before any consequential action, and every step is written to an audit trail."
    >
      <defs>
        <pattern id="loop-grid" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M22 0H0V22" fill="none" style={{ stroke: 'var(--dorsa-grid)' }} strokeWidth={0.75} />
        </pattern>
        <marker id="loop-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6" fill="none" style={{ stroke: 'var(--ink)' }} strokeWidth={1} />
        </marker>
      </defs>

      <rect x="0" y="0" width="440" height="300" fill="url(#loop-grid)" />

      <text x="16" y="26" fontSize="10" letterSpacing="1.6" style={{ ...mono, fill: 'var(--ink)' }}>
        GOVERNED LOOP
      </text>
      <text x="424" y="26" fontSize="9" letterSpacing="1.4" textAnchor="end" style={{ ...mono, fill: 'var(--rust-text)' }}>
        FIG. B
      </text>

      {/* connector line */}
      <line x1={xs[0]} y1={y} x2={xs[4]} y2={y} style={{ stroke: 'var(--ink)' }} strokeWidth={1.4} markerEnd="url(#loop-arrow)" />

      {/* nodes */}
      {xs.map((x, i) => (
        <g key={loopStages[i]}>
          <circle
            cx={x}
            cy={y}
            r="15"
            fill="var(--paper)"
            style={{ stroke: i === 3 ? 'var(--rust)' : 'var(--forest)' }}
            strokeWidth={i === 3 ? 2 : 1.5}
          />
          <text x={x} y={y + 4} fontSize="11" textAnchor="middle" style={{ ...mono, fill: 'var(--ink)' }}>
            {String(i + 1).padStart(2, '0')}
          </text>
          <text x={x} y={y + 34} fontSize="9.5" textAnchor="middle" style={{ ...mono, fill: 'var(--muted)' }}>
            {loopStages[i].toUpperCase()}
          </text>
        </g>
      ))}

      {/* constraint gate — before scoring */}
      <line
        x1={(xs[0] + xs[1]) / 2}
        y1={y - 30}
        x2={(xs[0] + xs[1]) / 2}
        y2={y - 16}
        style={{ stroke: 'var(--rust)' }}
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <text x={(xs[0] + xs[1]) / 2} y={y - 38} fontSize="8.5" textAnchor="middle" style={{ ...mono, fill: 'var(--rust-text)' }}>
        CONSTRAINT GATE
      </text>

      {/* approval gateway — before consequential execution */}
      <line
        x1={(xs[2] + xs[3]) / 2}
        y1={y - 30}
        x2={(xs[2] + xs[3]) / 2}
        y2={y - 16}
        style={{ stroke: 'var(--rust)' }}
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <text x={(xs[2] + xs[3]) / 2} y={y - 38} fontSize="8.5" textAnchor="middle" style={{ ...mono, fill: 'var(--rust-text)' }}>
        APPROVAL GATEWAY
      </text>

      {/* annotations */}
      <text x="16" y="228" fontSize="9.5" style={{ ...mono, fill: 'var(--muted)' }}>
        Engines own the math — the model only narrates.
      </text>
      <text x="16" y="248" fontSize="9.5" style={{ ...mono, fill: 'var(--muted)' }}>
        No consequential action executes without a person.
      </text>
      <text x="16" y="268" fontSize="9.5" style={{ ...mono, fill: 'var(--muted)' }}>
        Every step is written to a durable audit trail.
      </text>
    </svg>
  );
}

export function InsideTheBuild() {
  return (
    <section className="section section--tight" id="workshop">
      <div className="container">
        <div className="workshop">
          <div data-reveal>
            <span className="workshop__stamp">Inside the build</span>
            <h2 className="workshop__title">How EnkaAI keeps AI accountable.</h2>
            <p className="project__body">
              EnkaAI is built so AI helps with the messy parts — reading documents and supplier
              messages — without ever holding the pen on a decision that costs money. Extraction
              is a suggestion; explicit business rules decide. Anything consequential waits for a
              person, and every step is written down.
            </p>
            <p className="project__body">
              The loop below is the shape of that: observe, reason under constraints, recommend,
              execute only with approval, then verify. It is the part of the system least visible
              in a screenshot, and the part that matters most in operations.
            </p>
            <p className="workshop__status">
              <span className="dot" aria-hidden="true" />
              Beta — in development with testing customers.
            </p>
          </div>

          <figure className="workshop__figure" data-reveal>
            <GovernedLoop />
          </figure>
        </div>
      </div>
    </section>
  );
}
