import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

// Fonts (self-hosted via @fontsource, no external requests).
// Latin subset only: the content is English, and every non-ASCII glyph used
// (— U+2014, ’ U+2019, é U+00E9) sits inside the latin range (U+0000–00FF,
// U+2000–206F). Importing the bare weight css pulls in cyrillic, greek and
// vietnamese subsets the page never renders.
import '@fontsource/big-shoulders-display/latin-600';
import '@fontsource/big-shoulders-display/latin-700';
import '@fontsource/public-sans/latin-400';
import '@fontsource/public-sans/latin-500';
import '@fontsource/public-sans/latin-600';
import '@fontsource/public-sans/latin-700';

import './styles/index.css';
import { App } from './App';
import { initAnalytics } from './lib/analytics';

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The production build pre-renders App into #root (see scripts/prerender.mjs),
// so hydrate that markup to keep it and attach interactivity. When #root is
// empty (e.g. the dev server, where no prerender runs) fall back to a client
// render instead.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

// No-op unless VITE_UMAMI_WEBSITE_ID is configured.
initAnalytics();
