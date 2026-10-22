export interface EngineeringNote {
  id: string;
  title: string;
  /** Short version shown in the home-page folds. */
  paragraphs: string[];
  /** Full note, used by the standalone /notes/ route. */
  body: string[];
  /** A project that puts the principle into practice, where one exists. */
  relatedProject?: string;
}

/**
 * Short, first-person notes on how Brian approaches engineering.
 * Deliberately principle-level: no invented metrics, dates or links.
 */
export const notes: EngineeringNote[] = [
  {
    id: 'async-reliability',
    title: 'Making asynchronous systems reliable',
    paragraphs: [
      'Async work is where a lot of real systems quietly go wrong. When data arrives from several places and has to be processed in order, the interesting problems are not about throughput — they are about what happens when a message is late, duplicated, or arrives after you thought the window had closed.',
      'The approach that has served me is to make the state of every unit of work explicit and inspectable, so a failure is a description of what went wrong rather than a gap you discover later.',
    ],
    body: [
      'Async work is where a lot of real systems quietly go wrong. When data arrives from several places and has to be processed in order, the interesting problems are not about throughput — they are about what happens when a message is late, duplicated, or arrives after you thought the window had closed.',
      'The approach that has served me is to make the state of every unit of work explicit and inspectable, so a failure is a description of what went wrong rather than a gap you discover later.',
      'In practice, I start with the unit of work: what is the smallest thing that must happen exactly once, and what identifies it? If a retry cannot tell whether the previous attempt succeeded, the design is not finished.',
      'At EnkaAI, inbound supplier messages are persisted before the webhook is acknowledged, so a retry is a no-op rather than a second record. The same discipline applies to imports: upsert on a stable source identifier instead of assuming a message arrives once.',
      'The result is a system whose failure modes are legible. When something is late or duplicated, there is a record to inspect rather than a mystery to reconstruct from logs.',
    ],
    relatedProject: 'enkaai',
  },
  {
    id: 'processing-speed',
    title: 'Making processing faster without breaking correctness',
    paragraphs: [
      'Speed only counts if the answer is still right. When I have taken a slow path and made it fast — as with the Rust work on a time-series pipeline at Beoflow — the discipline was to pin down correctness first, with tests that described the expected results, and only then change how the work was done.',
      'That ordering matters, because it turns “it feels faster” into “it is faster and it still produces the same answers on the same inputs.”',
    ],
    body: [
      'Speed only counts if the answer is still right. When I have taken a slow path and made it fast — as with the Rust work on a time-series pipeline at Beoflow — the discipline was to pin down correctness first, with tests that described the expected results, and only then change how the work was done.',
      'That ordering matters, because it turns “it feels faster” into “it is faster and it still produces the same answers on the same inputs.”',
      'The first step is a set of tests that describe the current answers on representative inputs. Only then is it safe to change the implementation: the tests become the contract the faster version has to keep.',
      'At Beoflow, the hot path was per-athlete readiness recomputation. Moving it to Rust took the work from seconds to milliseconds, but the number is only meaningful alongside its scope: one path, not the whole platform.',
      'I am suspicious of optimization work that cannot name what it is allowed to change. A clear boundary, a correctness suite and a before/after measurement are what turn a rewrite into an improvement rather than a new source of bugs.',
    ],
    relatedProject: 'beoflow',
  },
  {
    id: 'understandable-apis',
    title: 'Designing APIs and data models that stay understandable',
    paragraphs: [
      'A data model is a promise about how the system will behave later. The clearest systems I have worked on were the ones where the shape of the data said something true about the domain, so that a new engineer could reason about edge cases without being told.',
      'I prefer models and interfaces that make the common case obvious and the unusual case expressible, rather than clever structures that only make sense to the person who wrote them.',
    ],
    body: [
      'A data model is a promise about how the system will behave later. The clearest systems I have worked on were the ones where the shape of the data said something true about the domain, so that a new engineer could reason about edge cases without being told.',
      'I prefer models and interfaces that make the common case obvious and the unusual case expressible, rather than clever structures that only make sense to the person who wrote them.',
      'Multi-tenancy is a good test of that. If tenant identity can be forgotten at one call site, the model is not doing enough work; it should be difficult to write a query that crosses tenants without noticing.',
      'I try to make invalid states hard to represent: explicit transitions for records that have a lifecycle, types that carry meaning, and names taken from the domain rather than from the database schema.',
      'At EnkaAI, that meant models for suppliers, purchase orders, invoices and operational exceptions that could support validation and approval without a tangle of special cases. At Dorsa, it meant backend services where tenancy and workflow state were part of the structure, not an afterthought.',
    ],
    relatedProject: 'enkaai',
  },
  {
    id: 'ai-where-it-helps',
    title: 'Using AI where it adds value',
    paragraphs: [
      'In healthcare and operations settings, AI is most useful when it reduces the work of reading and coordinating — extracting structure from messy text, drafting, routing, surfacing what matters. It is least useful when it is asked to make a decision that someone will later have to defend.',
      'So I aim to place models where they assist a person, keep business-critical decisions explicit and auditable, and give the humans in the loop something they can check rather than something they must trust blindly.',
    ],
    body: [
      'In healthcare and operations settings, AI is most useful when it reduces the work of reading and coordinating — extracting structure from messy text, drafting, routing, surfacing what matters. It is least useful when it is asked to make a decision that someone will later have to defend.',
      'So I aim to place models where they assist a person, keep business-critical decisions explicit and auditable, and give the humans in the loop something they can check rather than something they must trust blindly.',
      'The useful split is between reading and deciding. Extracting a supplier, an amount or a delivery date from a document is a reading problem; approving a payment is a decision problem. The first can be automated with checks. The second should stay with a person who can be accountable for it.',
      'At EnkaAI, the model proposes and the system validates against a schema and explicit business rules; consequential actions pass through approval and are written to an audit trail. At Dorsa, the work was in workflow orchestration around NLP and document ingestion, not in letting a model run the operating room.',
      'That boundary is also good product design. It gives the people using the system something they can inspect, correct and explain, which matters more than a demo that looks autonomous.',
    ],
    relatedProject: 'enkaai',
  },
];
