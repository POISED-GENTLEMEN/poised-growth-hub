// Legacy → canonical path map. Lovable static hosting cannot issue true 301s;
// this map is applied client-side via <RedirectGate /> using <Navigate replace>,
// which is the closest available substitute (search engines treat a 200 + meta
// canonical + permanent client redirect as a strong consolidation signal).
//
// Keys MUST be lowercase, without trailing slash. Values are canonical paths
// (with trailing slash to match the locked URL structure).
export const REDIRECT_MAP: Record<string, string> = {
  // Legacy / renamed routes
  "/resources": "/codex/",
  "/blog": "/codex/",
  "/articles": "/codex/",
  "/partners": "/programs/partners/",
  "/program-partners": "/programs/partners/",
  "/schools-one-pager": "/schools/one-pager/",
  "/one-pager": "/schools/one-pager/",
  "/mentorship": "/mentorship-programs/",
  "/mentors": "/for-moms-mentors/",
  "/moms": "/for-moms-mentors/",
  "/eq": "/eq-assessment/",
  "/assessment": "/eq-assessment/",
  "/essence-collection": "/essence/",
  "/shop/essence": "/essence/",
  "/store": "/shop/",
  "/cologne": "/essence/",
  "/young-g": "/shop/",

  // Removed on-site commerce — Shopify is the store of record now.
  "/cart": "/shop/",
  "/checkout": "/shop/",
  "/thank-you": "/shop/",
  "/shop/essence-collection": "/shop/",
};

// Path prefixes that always redirect to a single canonical path, regardless of
// what comes after the prefix (e.g. /products/<anything> → /shop/).
const PREFIX_REDIRECTS: Array<{ prefix: string; target: string }> = [
  { prefix: "/products/", target: "/shop/" },
];

// Paths that should NEVER be normalized (assets, API-style routes).
const PRESERVE_AS_IS = /\.[a-z0-9]{2,5}$/i;

export interface NormalizeResult {
  changed: boolean;
  path: string;
}

/**
 * Enforces: lowercase pathname, single trailing slash on non-file paths,
 * and the explicit redirect map above.
 */
export function normalizePath(rawPath: string): NormalizeResult {
  if (!rawPath) return { changed: false, path: "/" };

  let path = rawPath;

  // Lowercase
  const lower = path.toLowerCase();
  if (lower !== path) path = lower;

  // Strip duplicate slashes
  path = path.replace(/\/{2,}/g, "/");

  // Apply explicit redirect map (match without trailing slash)
  const noTrail = path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
  if (REDIRECT_MAP[noTrail]) {
    return { changed: true, path: REDIRECT_MAP[noTrail] };
  }

  // Prefix redirects (e.g. all /products/* → /shop/)
  for (const { prefix, target } of PREFIX_REDIRECTS) {
    if (path === prefix.slice(0, -1) || path.startsWith(prefix)) {
      return { changed: true, path: target };
    }
  }

  // Enforce trailing slash on non-file paths
  if (path !== "/" && !path.endsWith("/") && !PRESERVE_AS_IS.test(path)) {
    path = `${path}/`;
  }

  return { changed: path !== rawPath, path };
}
