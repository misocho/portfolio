import { useState } from 'react';
import { hasLink, site } from '../data/site';
import { asset } from '../lib/asset';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [localPart, domain] = site.email.split('@');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section className="section--black" id="contact">
      <div className="shell contact">
        <div className="contact__inner">
          <h2 className="contact__email">
            <a href={`mailto:${site.email}`}>
              {localPart}@<wbr />
              {domain}
            </a>
          </h2>

          <div className="contact__row">
            <p className="contact__lede">
              Tell me what you are building, what is getting in the way, and what a good outcome
              would look like.
            </p>
            <button type="button" className="contact__copy" onClick={copyEmail}>
              {copied ? 'Copied' : 'Copy email'}
              <span className="visually-hidden" aria-live="polite">
                {copied ? 'Email address copied to clipboard' : ''}
              </span>
            </button>
          </div>

          <div className="contact__links">
            {hasLink(site.github) && (
              <a href={site.github} target="_blank" rel="noreferrer noopener">
                GitHub ↗
              </a>
            )}
            {hasLink(site.linkedin) && (
              <a href={site.linkedin} target="_blank" rel="noreferrer noopener">
                LinkedIn ↗
              </a>
            )}
            {hasLink(site.resume) && (
              <>
                <a href={asset(site.resume)} download>
                  CV (PDF) ↓
                </a>
                <a href={asset('/resume.html')} target="_blank" rel="noreferrer noopener">
                  Print version
                </a>
              </>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__row">
        <span>
          © {year} {site.name}
        </span>
        <span>{site.location}</span>
        <span>
          {hasLink(site.source) && (
            <a href={site.source} target="_blank" rel="noreferrer noopener">
              Source ↗
            </a>
          )}
        </span>
        <a href="#top">Back to top ↑</a>
      </div>

      <p className="footer__credits">
        <strong>Credits.</strong> Beoflow and Dorsa AI product imagery is published by those
        products and used here for reference. Where genuine imagery is not public, this site says
        so rather than inventing it — see MEDIA-SOURCES.md in the repository. Built with React,
        TypeScript and Vite.
      </p>
    </footer>
  );
}
