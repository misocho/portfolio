/**
 * Analytics — Umami Cloud (https://cloud.umami.is), cookieless and
 * privacy-friendly.
 *
 * The tracker script is injected only when VITE_UMAMI_WEBSITE_ID is set, so
 * the site ships no third-party script — and makes no analytics request —
 * until an ID is configured. Page views are tracked automatically by Umami;
 * this module adds the outbound-link and file-download events that Umami does
 * not collect on its own.
 */

declare global {
  interface Window {
    umami?: {
      track: (name?: string, data?: Record<string, unknown>) => void;
    };
  }
}

const WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID;
const SCRIPT_SRC = import.meta.env.VITE_UMAMI_SRC || 'https://cloud.umami.is/script.js';

const DOWNLOAD_RE = /\.(pdf|zip|docx?|xlsx?|pptx?|csv|txt|png|jpe?g|webp|svg|mp4)$/i;

let started = false;

export function initAnalytics(): void {
  if (started || typeof document === 'undefined' || !WEBSITE_ID) return;
  started = true;

  const script = document.createElement('script');
  script.defer = true;
  script.src = SCRIPT_SRC;
  script.setAttribute('data-website-id', WEBSITE_ID);
  document.head.appendChild(script);

  // Delegated so it covers links rendered at any point (projects, CV, contact).
  document.addEventListener('click', onClick, true);
}

function onClick(event: MouseEvent): void {
  const anchor = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
  if (!anchor) return;

  const href = anchor.getAttribute('href');
  if (!href) return;

  if (anchor.hasAttribute('download') || DOWNLOAD_RE.test(href)) {
    track('download', { file: fileName(href) });
    return;
  }

  try {
    const url = new URL(href, window.location.href);
    if (url.host && url.host !== window.location.host) {
      track('outbound', { host: url.host, href: url.href });
    }
  } catch {
    /* relative or malformed href — not an outbound link */
  }
}

function track(name: string, data?: Record<string, unknown>): void {
  window.umami?.track(name, data);
}

function fileName(href: string): string {
  try {
    return new URL(href, window.location.href).pathname.split('/').pop() || href;
  } catch {
    return href;
  }
}
