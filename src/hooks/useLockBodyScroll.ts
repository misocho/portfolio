import { useEffect } from 'react';

/** Locks page scroll while a modal/dialog is open, preserving scrollbar width. */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const { body } = document;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;

    body.classList.add('is-locked');
    body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      body.classList.remove('is-locked');
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [locked]);
}
