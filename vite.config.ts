import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The base path matters for GitHub Pages.
//  - Project site (https://<user>.github.io/<repo>/) -> base must be '/<repo>/'
//  - User/org site (https://<user>.github.io/)        -> base must be '/'
// Set VITE_BASE in the deploy environment, or change the fallback below.
// See README.md ("What you must supply").
const base = process.env.VITE_BASE ?? '/portfolio/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
  },
})
