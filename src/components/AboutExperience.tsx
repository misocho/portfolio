import { education, experience } from '../data/experience';
import { hasLink, site } from '../data/site';
import { asset } from '../lib/asset';
import { SectionMasthead } from './SectionMasthead';

export function AboutExperience() {
  return (
    <section className="section section--white" id="about">
      <div className="shell">
        <SectionMasthead title="About" reveal={false} />

        <div className="about">
          <p className="about__lede">
            I have spent most of my career on the backend, where correctness, speed and clarity
            all have to hold at once.
          </p>

          <div className="about__body">
            <p>
              I studied <mark>mathematics with computing at Kisii University</mark>, and I have
              worked across small and larger teams in{' '}
              <mark>healthcare, sports technology and enterprise software</mark>. Most of what I
              do is making distributed, data-heavy systems behave predictably: processing streams
              of data in time, wiring services together, and keeping the whole thing
              understandable to whoever inherits it next.
            </p>
            <p>
              More recently that has meant working with <mark>AI-enabled workflows</mark> — models
              that help people read, route and act on information, without taking the decisions
              out of human hands.
            </p>
            <p className="about__closing">
              <a href="#contact">
                If there is a backend that needs steadying, I would like to hear about it
                <span className="about__closing-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </p>
          </div>
        </div>

        <div className="experience">
          <h3 className="experience__title">Experience</h3>
          <ol className="experience__list">
            {experience.map((item) => (
              <li className="experience__row" key={`${item.org}-${item.dates}`}>
                <span className="experience__dates">{item.dates}</span>
                <span className="experience__role">
                  {item.role}
                  <span className="experience__org"> · {item.org}</span>
                </span>
                {item.desc && <p className="experience__desc">{item.desc}</p>}
              </li>
            ))}
          </ol>
        </div>

        <div className="education">
          <h3 className="education__title">Education</h3>
          <ul className="education__list">
            {education.map((item) => (
              <li className="education__row" key={item.qualification}>
                <span className="education__dates">{item.dates}</span>
                <span className="education__qual">
                  {item.qualification}
                  <span className="education__org"> · {item.org}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="about__actions">
          {hasLink(site.resume) && (
            <>
              <a href={asset(site.resume)} download>
                Download CV (PDF) ↓
              </a>
              <a href={asset('/resume.html')} target="_blank" rel="noreferrer noopener">
                Print version
              </a>
            </>
          )}
          <a href={`mailto:${site.email}`}>Email</a>
          {hasLink(site.linkedin) && (
            <a href={site.linkedin} target="_blank" rel="noreferrer noopener">
              LinkedIn ↗
            </a>
          )}
          {hasLink(site.github) && (
            <a href={site.github} target="_blank" rel="noreferrer noopener">
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
