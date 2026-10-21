import { enkaai } from '../data/projects';
import { Disclosure } from './Disclosure';
import { SectionMasthead } from './SectionMasthead';

const stages = [
  {
    name: 'Observe',
    note: 'Operational data, documents and messages arrive from the systems already in use.',
  },
  {
    name: 'Reason',
    note: 'Extraction runs against a schema and explicit constraints. The model proposes; the rules decide.',
  },
  {
    name: 'Recommend',
    note: 'The system prepares an action with the reasoning a person needs to judge it.',
  },
  {
    name: 'Execute',
    note: 'Consequential actions wait at an approval gateway. Low-risk work stays automatic.',
  },
  {
    name: 'Verify',
    note: 'Every step is written to a durable audit trail, so a result can be traced back.',
  },
];

export function InsideTheBuild() {
  const approval = enkaai.media.find((m) => m.id === 'approvals') ?? enkaai.media[0];

  return (
    <section className="section section--sage" id="workshop">
      <div className="shell">
        <SectionMasthead title="The governed loop" note="The model suggests. The rules decide." />

        <div className="loop">
          <div className="loop__intro" data-reveal>
            <p>
              EnkaAI is built so AI helps with the messy parts — reading documents and supplier
              messages — without ever holding the pen on a decision that costs money. Extraction
              is a suggestion; explicit business rules decide.
            </p>
            <p>
              The loop below is the shape of that: observe, reason under constraints, recommend,
              execute only with approval, then verify.
            </p>
            <p className="loop__status">Beta — in development with testing customers.</p>
          </div>

          <div className="loop__words" data-reveal>
            <figure className="loop__specimen">
              <p className="loop__word" aria-hidden="true">
                <span>Extract</span>
              </p>
              <figcaption className="loop__caption">The model suggests</figcaption>
            </figure>
            <figure className="loop__specimen">
              <p className="loop__word" aria-hidden="true">
                <span>Decide</span>
              </p>
              <figcaption className="loop__caption">The rules decide</figcaption>
            </figure>
          </div>
        </div>

        <ol className="loop__stages">
          {stages.map((stage) => (
            <li className="loop__stage" key={stage.name} data-reveal>
              <span className="loop__stage-name">{stage.name}</span>
              <span className="loop__stage-note">{stage.note}</span>
            </li>
          ))}
        </ol>

        <div className="loop__evidence">
          <figure className="loop__figure" data-reveal>
            <img
              src={approval.src}
              alt={approval.alt}
              width={approval.width}
              height={approval.height}
              loading="lazy"
              decoding="async"
            />
            <figcaption>{approval.caption}</figcaption>
          </figure>
          <div className="loop__evidence-text" data-reveal>
            <h3>What the gate looks like</h3>
            <p>
              A recommendation is shown with the price, reliability and urgency behind it, then
              waits for a person to approve, reject or defer. The model supplies the reading; the
              operator supplies the decision.
            </p>
          </div>
        </div>

        <Disclosure
          label="EnkaAI technical notes"
          items={enkaai.technical?.map((item, i) => ({
            id: `enkaai-loop-${i}`,
            title: item.title,
            paragraphs: item.paragraphs,
          })) ?? []}
        />
      </div>
    </section>
  );
}
