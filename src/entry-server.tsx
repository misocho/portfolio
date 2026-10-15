import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';

import { App } from './App';

/**
 * Build-time server entry.
 *
 * Rendered once by scripts/prerender.mjs so the shipped HTML already contains
 * the portfolio's content. Without this the initial HTML is an empty #root and
 * non-JS readers (crawlers, link unfurlers, text extractors) see nothing.
 *
 * The client then hydrates this markup — see src/main.tsx.
 */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
