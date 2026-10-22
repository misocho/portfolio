import { homeHref } from '../data/routes';
import { site } from '../data/site';
import { Footer } from './Contact';

/** Shared masthead for the standalone project and note pages. */
export function PageHeader() {
  return (
    <header className="page-top" id="top">
      <div className="shell page-top__inner">
        <a className="page-top__mark" href={homeHref()} aria-label="Brian Misocho — index">
          BM
        </a>

        <nav className="page-top__nav" aria-label="Secondary">
          <a href={homeHref('work')}>All work</a>
          <a href={homeHref('notes')}>Notes</a>
          <a href={homeHref('contact')}>Contact</a>
        </nav>
      </div>
    </header>
  );
}

interface PageCloseProps {
  nextLabel: string;
  nextTitle: string;
  nextHref: string;
}

/** The end of a standalone page: next link, contact, footer. */
export function PageClose({ nextLabel, nextTitle, nextHref }: PageCloseProps) {
  return (
    <section className="page-close section--black" aria-labelledby="page-close-title">
      <div className="shell page-close__inner">
        <a className="page-next" href={nextHref}>
          <span className="page-next__label">{nextLabel}</span>
          <span className="page-next__title">{nextTitle}</span>
          <span className="page-next__arrow" aria-hidden="true">
            →
          </span>
        </a>

        <div className="page-close__contact">
          <h2 className="page-close__title" id="page-close-title">
            Building something that has to hold up?
          </h2>
          <p>
            Tell me what you are building, what is getting in the way, and what a good outcome would
            look like.
          </p>
          <a className="page-close__email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>

        <Footer />
      </div>
    </section>
  );
}
