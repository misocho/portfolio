import { education, experience } from '../data/experience';
import { SectionMasthead } from './SectionMasthead';

export function AboutExperience() {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionMasthead
          num="03"
          label="About & experience"
          title="Mostly backend, always about the people using it."
        />

        <div className="grid-about">
          <div data-reveal>
            <p className="about-lede">
              I have spent most of my career on the backend — the layer where correctness,
              speed and clarity all have to hold at once.
            </p>
          </div>

          <div data-reveal>
            <p className="about-body">
              I studied mathematics with computing at Kisii University, and I have worked
              across small and larger teams in healthcare, sports technology and enterprise
              software. Most of what I do is making distributed, data-heavy systems behave
              predictably: processing streams of data in time, wiring services together, and
              keeping the whole thing understandable to whoever inherits it next.
            </p>
            <p className="about-body">
              More recently that has meant working with AI-enabled workflows — models that
              help people read, route and act on information, without taking the decisions
              out of human hands.
            </p>

            <h3 className="project__subhead">Experience</h3>
            <div className="timeline">
              {experience.map((item) => (
                <div className="timeline__row" key={`${item.org}-${item.dates}`}>
                  <span className="timeline__dates">{item.dates}</span>
                  <span className="timeline__role">
                    {item.role} <span className="timeline__org">· {item.org}</span>
                  </span>
                  {item.desc && <p className="timeline__desc">{item.desc}</p>}
                </div>
              ))}
            </div>

            <h3 className="project__subhead">Education</h3>
            <div className="timeline">
              {education.map((item) => (
                <div className="timeline__row" key={item.qualification}>
                  <span className="timeline__dates">{item.dates}</span>
                  <span className="timeline__role">
                    {item.qualification} <span className="timeline__org">· {item.org}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
