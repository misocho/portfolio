import { projects } from '../data/projects';
import { SectionMasthead } from './SectionMasthead';

const rows = [
  {
    id: 'enkaai',
    product: 'EnkaAI',
    work: 'Backend services, import validation, approval workflows and audit.',
    evidence: 'A 32-test idempotency suite; a beta with testing customers.',
  },
  {
    id: 'beoflow',
    product: 'Beoflow',
    work: 'Asynchronous time-series processing; a Rust path for readiness.',
    evidence: 'Readiness recomputation from seconds to milliseconds — an internal result.',
  },
  {
    id: 'dorsa',
    product: 'Dorsa AI',
    work: 'Multi-tenant backend, AI/NLP workflow orchestration and document ingestion.',
    evidence: 'No public artifact; the scope of the work and an internal ~15-minute turnover estimate.',
  },
];

export function Evidence() {
  return (
    <section className="section section--white" id="proof">
      <div className="shell">
        <SectionMasthead
          title="The evidence"
          note="What I built, and what can actually be checked. The caveats are part of the record."
        />

        <table className="evidence__table">
          <caption className="visually-hidden">
            What was built and what can be checked for each featured product
          </caption>
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">The work</th>
              <th scope="col">What can be checked</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <th scope="row">
                  <a href={`#${row.id}`}>{row.product}</a>
                </th>
                <td data-label="The work">{row.work}</td>
                <td data-label="What can be checked">{row.evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="evidence__notes">
          <h3>Notes on the record</h3>
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                <strong>{project.name}.</strong> {project.honestyNote}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
