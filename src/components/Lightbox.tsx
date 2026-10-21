import { useEffect, useRef } from 'react';
import type { Project, ProjectMedia } from '../data/projects';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { ArrowUpRight, ChevronLeft, ChevronRight, Close } from './icons';

interface LightboxProps {
  project: Project;
  media: ProjectMedia[];
  index: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}

const BADGE_LABEL: Record<ProjectMedia['kind'], string> = {
  screenshot: 'Screenshot',
  illustration: 'Illustration',
  photo: 'Photograph',
};

export function Lightbox({ project, media, index, onNavigate, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const handlers = useRef({ onNavigate, onClose });

  handlers.current = { onNavigate, onClose };

  const count = media.length;
  const currentIndex = ((index % count) + count) % count;
  const current = media[currentIndex];

  // Keep the latest index available to the (mount-only) key handler.
  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;

  useLockBodyScroll(true);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    // Mark every branch outside the dialog inert as we walk up to #root, so
    // the background leaves the tab order and the accessibility tree while
    // the modal is open.
    const inertNodes: Element[] = [];
    let node: Element | null = dialogRef.current;
    while (node?.parentElement) {
      const parent = node.parentElement;
      for (const child of Array.from(parent.children)) {
        if (child !== node) {
          child.setAttribute('inert', '');
          inertNodes.push(child);
        }
      }
      if (parent.id === 'root' || parent === document.body) break;
      node = parent;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      const h = handlers.current;
      if (e.key === 'Escape') {
        e.stopPropagation();
        h.onClose();
        return;
      }
      if (e.key === 'ArrowRight') {
        h.onNavigate(currentIndexRef.current + 1);
        return;
      }
      if (e.key === 'ArrowLeft') {
        h.onNavigate(currentIndexRef.current - 1);
        return;
      }
      if (e.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const list = Array.from(focusables);
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      inertNodes.forEach((el) => el.removeAttribute('inert'));
      previouslyFocused?.focus?.();
    };
  }, []);

  if (!current) return null;

  return (
    <div
      className="lightbox"
      data-state="open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      ref={dialogRef}
      tabIndex={-1}
    >
      <div className="lightbox__top">
        <p className="lightbox__title" id="lightbox-title">
          {project.name} — image {currentIndex + 1} of {count}
        </p>
        <button type="button" className="lightbox__close" onClick={onClose}>
          <Close width={14} height={14} />
          Close
        </button>
      </div>

      <div className="lightbox__body">
        <div className="lightbox__stage">
          {count > 1 && (
            <button
              type="button"
              className="lightbox__nav lightbox__nav--prev"
              onClick={() => onNavigate(currentIndex - 1)}
              aria-label="Previous image"
            >
              <ChevronLeft width={20} height={20} />
            </button>
          )}

          <figure className="lightbox__figure" key={current.id}>
            <div className="lightbox__img-wrap">
              <img
                src={current.src}
                width={current.width}
                height={current.height}
                alt={current.alt}
              />
            </div>
            <figcaption className="lightbox__caption">
              <span className="lightbox__badge">{BADGE_LABEL[current.kind]}</span>
              <span>{current.caption}</span>
              {current.credit && (
                <a
                  className="lightbox__ext"
                  href={current.credit.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {current.credit.label}
                  <ArrowUpRight width={12} height={12} />
                </a>
              )}
            </figcaption>
          </figure>

          {count > 1 && (
            <button
              type="button"
              className="lightbox__nav lightbox__nav--next"
              onClick={() => onNavigate(currentIndex + 1)}
              aria-label="Next image"
            >
              <ChevronRight width={20} height={20} />
            </button>
          )}
        </div>

        <aside className="lightbox__side">
          <h3>{project.name}</h3>
          <p>{project.tagline}</p>

          <div className="lightbox__block">
            <h4>What I built</h4>
            <ul>
              {project.contribution.slice(0, 3).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {project.external && (
            <a
              className="lightbox__ext"
              href={project.external.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              {project.external.label}
              <ArrowUpRight width={13} height={13} />
            </a>
          )}

          <p className="lightbox__disclaimer">{project.honestyNote}</p>
        </aside>
      </div>

      {count > 1 && (
        <div className="lightbox__thumbs" role="group" aria-label="Images">
          {media.map((m, i) => (
            <button
              type="button"
              key={m.id}
              className="lightbox__thumb"
              aria-current={i === currentIndex ? 'true' : undefined}
              aria-label={`Show image ${i + 1}: ${m.caption}`}
              onClick={() => onNavigate(i)}
            >
              <img src={m.src} alt="" width={m.width} height={m.height} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
