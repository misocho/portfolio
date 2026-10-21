import { useEffect, useRef, useState } from 'react';
import { navItems } from '../data/nav';

interface NavProps {
  activeId: string;
}

/**
 * A quiet sticky bar that only appears once the hero has left the viewport.
 * The hero carries its own navigation, so the bar is not needed on arrival.
 */
export function Nav({ activeId }: NavProps) {
  const [visible, setVisible] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => {
      setVisible(window.scrollY > window.innerHeight - 96);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    if (visible) {
      header.removeAttribute('inert');
      header.removeAttribute('aria-hidden');
    } else {
      header.setAttribute('inert', '');
      header.setAttribute('aria-hidden', 'true');
    }
  }, [visible]);

  return (
    <header className={`nav${visible ? ' nav--visible' : ''}`} ref={headerRef}>
      <div className="shell nav__inner">
        <a className="nav__mark" href="#top" aria-label="Brian Misocho — back to top">
          BM
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

        <a className="nav__cta" href="#contact">
          Contact
        </a>
      </div>
    </header>
  );
}
