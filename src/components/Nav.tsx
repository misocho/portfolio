import { useEffect, useRef, useState } from 'react';
import { navItems } from '../data/nav';
import { site } from '../data/site';
import { ArrowUpRight, Close, Menu } from './icons';

interface NavProps {
  activeId: string;
}

export function Nav({ activeId }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = drawerRef.current;
    if (open) {
      wasOpen.current = true;
      // `inert` removes the closed drawer from the tab order and the
      // accessibility tree without hiding a focused element (unlike
      // aria-hidden), which is what screen readers and browsers expect.
      el?.removeAttribute('inert');
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
      };
      document.addEventListener('keydown', onKey);
      // Move focus into the drawer for keyboard users.
      const first = el?.querySelector<HTMLElement>('a, button');
      first?.focus();
      return () => document.removeEventListener('keydown', onKey);
    }
    el?.setAttribute('inert', '');
    // Return focus to the toggle when the drawer closes.
    if (wasOpen.current) {
      wasOpen.current = false;
      menuBtnRef.current?.focus();
    }
  }, [open]);

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a
          className="nav__lockup"
          href="#top"
          aria-label={`Back to top — Field Notes by ${site.name}`}
        >
          <span className="nav__mark">Field Notes</span>
          <span className="nav__edition" aria-hidden="true">
            {site.name}
          </span>
        </a>

        <nav aria-label="Primary">
          <ul className="nav__links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  className="nav__link"
                  href={`#${item.id}`}
                  aria-current={activeId === item.id ? 'true' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {site.availability && (
            <span className="nav__status">
              <span className="nav__status-dot" aria-hidden="true" />
              {site.availability}
            </span>
          )}
          <button
            ref={menuBtnRef}
            type="button"
            className="nav__menu"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(true)}
          >
            <Menu width={14} height={14} />
            Menu
          </button>
        </div>
      </div>

      <div
        id="site-menu"
        className="nav__drawer"
        data-open={open ? 'true' : 'false'}
        ref={drawerRef}
      >
        <div className="nav__drawer-top">
          <span className="label">Field Notes — Contents</span>
          <button
            type="button"
            className="nav__menu"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <Close width={14} height={14} />
            Close
          </button>
        </div>
        <nav aria-label="Sections">
          <ul className="nav__drawer-list">
            {navItems.map((item, i) => (
              <li key={item.id}>
                <a
                  className="nav__drawer-link"
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav__drawer-foot">
          <a className="arrow-link" href={`mailto:${site.email}`} onClick={() => setOpen(false)}>
            {site.email}
            <ArrowUpRight width={13} height={13} />
          </a>
        </div>
      </div>
    </header>
  );
}
