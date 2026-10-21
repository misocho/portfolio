import { navItems } from '../data/nav';
import { site } from '../data/site';

/**
 * The first viewport: one flat orange field, the name set in two inks, and
 * one action. The masked line reveal is the page's signature motion.
 */
export function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero__top">
        <a className="hero__mark" href="#top" aria-label="Brian Misocho — back to top">
          BM
        </a>

        <nav className="hero__nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="hero__contact" href="#contact">
          Contact
        </a>
      </div>

      <div className="hero__stage">
        <h1 className="hero__name">
          <span className="visually-hidden">Brian Misocho Morang’a</span>
          <span className="hero__line" aria-hidden="true">
            <span className="hero__word">Brian</span>
          </span>
          <span className="hero__line hero__line--alt" aria-hidden="true">
            <span className="hero__word">Misocho</span>
          </span>
        </h1>

        <div className="hero__aside">
          <p className="hero__support">
            Senior backend engineer in Nairobi. I build the services, data pipelines and
            approval loops behind AI-enabled products.
          </p>
          <a className="hero__action" href="#work">
            See the work
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      <div className="hero__foot">
        <span>{site.location}</span>
        <span>{site.availability}</span>
        <span>Portfolio 2026</span>
      </div>
    </header>
  );
}
