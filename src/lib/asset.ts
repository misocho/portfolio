/**
 * Resolve a path in /public against Vite's configured base path, so the same
 * code works at a domain root or under a GitHub Pages project subpath.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}
