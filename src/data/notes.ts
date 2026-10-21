export interface EngineeringNote {
  id: string;
  title: string;
  paragraphs: string[];
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
  },
  {
    id: 'processing-speed',
    title: 'Making processing faster without breaking correctness',
    paragraphs: [
      'Speed only counts if the answer is still right. When I have taken a slow path and made it fast — as with the Rust work on a time-series pipeline at Beoflow — the discipline was to pin down correctness first, with tests that described the expected results, and only then change how the work was done.',
      'That ordering matters, because it turns “it feels faster” into “it is faster and it still produces the same answers on the same inputs.”',
    ],
  },
  {
    id: 'understandable-apis',
    title: 'Designing APIs and data models that stay understandable',
    paragraphs: [
      'A data model is a promise about how the system will behave later. The clearest systems I have worked on were the ones where the shape of the data said something true about the domain, so that a new engineer could reason about edge cases without being told.',
      'I prefer models and interfaces that make the common case obvious and the unusual case expressible, rather than clever structures that only make sense to the person who wrote them.',
    ],
  },
  {
    id: 'ai-where-it-helps',
    title: 'Using AI where it adds value',
    paragraphs: [
      'In healthcare and operations settings, AI is most useful when it reduces the work of reading and coordinating — extracting structure from messy text, drafting, routing, surfacing what matters. It is least useful when it is asked to make a decision that someone will later have to defend.',
      'So I aim to place models where they assist a person, keep business-critical decisions explicit and auditable, and give the humans in the loop something they can check rather than something they must trust blindly.',
    ],
  },
];
