import { cv } from '../data/cv';
import { hasLink, site } from '../data/site';
import { asset } from '../lib/asset';
import { SectionMasthead } from './SectionMasthead';
import { Download, GitHub, LinkedIn, Mail } from './icons';

/**
 * Cv — the on-site, read-only presentation of the CV.
 *
 * Every value here comes from src/data/cv.json (via cv.ts), the same source
 * the generated print document (public/resume.html) and the downloadable PDF
 * are built from. This keeps the website and the paperwork in step.
 */
export function Cv() {
  return (
    <section className="section" id="cv">
      <div className="container">
        <SectionMasthead
          num="05"
          label="Curriculum vitae"
          title="The full record."
          deck="The complete CV — every role, the detail behind it, and a copy to take with you."
          minor
        />

        <div className="cv" data-reveal>
          {hasLink(site.resume) && (
            <div className="cv__actions">
              <a className="btn btn--primary" href={asset(site.resume)} download>
                <Download width={14} height={14} />
                Download PDF
              </a>
            </div>
          )}

          <ul className="cv__contact">
            <li>{cv.location}</li>
            <li>
              <a href={`mailto:${cv.email}`}>
                <Mail width={13} height={13} />
                {cv.email}
              </a>
            </li>
            <li>
              <a href={`tel:${cv.phone.replace(/[^+\d]/g, '')}`}>{cv.phone}</a>
            </li>
            {hasLink(cv.github) && (
              <li>
                <a href={cv.github} target="_blank" rel="noreferrer noopener">
                  <GitHub width={13} height={13} />
                  GitHub
                </a>
              </li>
            )}
            {hasLink(cv.linkedin) && (
              <li>
                <a href={cv.linkedin} target="_blank" rel="noreferrer noopener">
                  <LinkedIn width={13} height={13} />
                  LinkedIn
                </a>
              </li>
            )}
          </ul>

          <p className="cv__summary">{cv.summary}</p>

          <div className="cv__block">
            <h3 className="cv__block-title">Experience</h3>
            <div className="cv__roles">
              {cv.roles.map((role) => (
                <article className="cv__role" key={`${role.org}-${role.period}`}>
                  <div className="cv__role-head">
                    <div>
                      <h4 className="cv__role-org">{role.org}</h4>
                      <p className="cv__role-title">
                        {role.title} <span className="cv__role-loc">· {role.location}</span>
                      </p>
                    </div>
                    <p className="cv__role-when">{role.period}</p>
                  </div>
                  {role.intro && <p className="cv__role-intro">{role.intro}</p>}
                  {role.bullets.length > 0 && (
                    <ul className="cv__role-list">
                      {role.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>

          <div className="cv__block">
            <h3 className="cv__block-title">Skills</h3>
            <div className="skills">
              {cv.skills.map((group) => (
                <div className="skills__group" key={group.title}>
                  <h3 className="skills__group-title">{group.title}</h3>
                  <ul className="skills__list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="cv__block">
            <h3 className="cv__block-title">Education</h3>
            <div className="cv__edu">
              {cv.education.map((item) => (
                <div className="cv__edu-row" key={item.qualification}>
                  <div>
                    <h4 className="cv__edu-org">{item.org}</h4>
                    <p className="cv__edu-qual">{item.qualification}</p>
                  </div>
                  <p className="cv__edu-when">{item.period}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
