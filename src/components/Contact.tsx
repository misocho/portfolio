import { hasLink, site } from '../data/site';
import { asset } from '../lib/asset';
import { ArrowUpRight, GitHub, LinkedIn, Mail } from './icons';

export function Contact() {
  const links = [
    hasLink(site.github) && { label: 'GitHub', href: site.github, Icon: GitHub },
    hasLink(site.linkedin) && { label: 'LinkedIn', href: site.linkedin, Icon: LinkedIn },
  ].filter(Boolean) as { label: string; href: string; Icon: typeof GitHub }[];

  return (
    <div className="container">
      <h2 className="contact__title">
        If there is a backend that needs steadying, I would like to hear about it.
      </h2>
      <p className="contact__lede">
        The clearest way to start is a message. Tell me what you are building, what is getting
        in the way, and what a good outcome would look like.
      </p>

      <div className="contact__actions">
        <a className="contact__email" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        {links.map(({ label, href, Icon }) => (
          <a
            key={label}
            className="btn btn--light"
            href={href}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Icon width={14} height={14} />
            {label}
          </a>
        ))}
        {hasLink(site.resume) && (
          <a className="btn btn--light" href={asset(site.resume)} target="_blank" rel="noreferrer noopener">
            <ArrowUpRight width={14} height={14} />
            Résumé
          </a>
        )}
      </div>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__meta">
            <span>{site.name}</span>
            <span>{site.role}</span>
            <span>{site.edition}</span>
          </div>
          <div className="footer__links">
            <a href={`mailto:${site.email}`}>
              <Mail width={13} height={13} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '0.4rem' }} />
              Email
            </a>
            <a className="back-to-top" href="#top">
              Back to top
              <ArrowUpRight width={13} height={13} />
            </a>
          </div>
        </div>

        <p className="sources-line">
          <strong>Credits.</strong> Beoflow and Dorsa AI product imagery is published by those
          products and used here for illustration and reference. Where genuine imagery is not
          public, this site says so rather than inventing it — see <span className="mono">MEDIA-SOURCES.md</span> in the repository.
        </p>

        <div className="footer__closing">
          <span>© {year} {site.name}</span>
          <span>Built with React, TypeScript &amp; Vite</span>
        </div>
      </div>
    </footer>
  );
}
