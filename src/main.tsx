import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

// Fonts (self-hosted via @fontsource, no external requests)
import '@fontsource/newsreader/400.css';
import '@fontsource/newsreader/500.css';
import '@fontsource/newsreader/600.css';
import '@fontsource/newsreader/400-italic.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';

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
