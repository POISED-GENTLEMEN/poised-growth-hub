
## Status so far
Only the GA4 measurement ID (`G-YLZ1FQLC4C`) has been wired into `index.html` and confirmed firing. Everything below is still to do.

## 1. Head metadata infrastructure
- Install `react-helmet-async`, wrap app in `<HelmetProvider>` in `src/main.tsx`.
- Create `src/components/SEO.tsx` helper emitting: title, description, canonical, `og:title/description/url/type/image`, `twitter:card/title/description/image`, optional `noindex`, optional JSON-LD children. Enforces "Poised Gentlemen | [Topic]" format.
- Remove `<link rel="canonical">` from `index.html` (Helmet owns it per-route). Keep sitewide OG fallback for non-JS crawlers.
- Add a commented Search Console verification meta placeholder in `index.html`.

## 2. Per-page SEO application
Apply `<SEO>` (unique 50–60 char title, 140–160 char description, self-referencing canonical/og:url) to every public route:
`/`, `/about/`, `/programs/`, `/programs/partners/`, `/schools/`, `/schools/one-pager/`, `/mentorship-programs/`, `/shop/`, `/essence/`, `/codex/`, `/codex/:slug`, `/contact/`, `/for-moms-mentors/`, `/eq-assessment/`.

Mark `noindex` on: `/schools/one-pager/thank-you/`, `/thank-you/`, `/unsubscribe/`, `/404`, `/cart/`, `/checkout/`.

## 3. JSON-LD schema
- Sitewide in `index.html`: Organization + LocalBusiness (New Orleans, LA).
- `/schools/`, `/schools/one-pager/`, `/programs/`, `/programs/partners/`, `/mentorship-programs/`: `EducationalProgram` schema.
- `/codex/:slug`: `Article` schema (headline, author, datePublished, image, mainEntityOfPage).
- `/schools/` FAQ section: `FAQPage` schema reflecting the actual on-page Q&A.

## 4. Sitemap + robots
- Update `public/sitemap.xml` to enforce trailing slashes and add missing routes: `/about/`, `/contact/`, `/for-moms-mentors/`, `/eq-assessment/`, and one entry per Codex article slug from `src/lib/codexArticles.ts`. Remove any non-existent routes (e.g. `/shop/essence-collection` if it 404s).
- Leave `public/robots.txt` largely intact; verify `Sitemap:` directive matches canonical domain.

## 5. URL hygiene + client-side "301" redirect map
Lovable static hosting can't issue true 301s. Implement the equivalent client-side:
- Create `src/lib/redirects.ts` with a map of legacy → canonical paths.
- Add a `<RedirectGate>` mounted above routes in `src/App.tsx` that lowercases the pathname, appends a trailing slash to non-file paths, and applies the map via `<Navigate replace>`.
- Document this as a client-side substitute (with a code comment) and **flag any ambiguous legacy URLs to the user for confirmation** before they go in the map.

## 6. GA4 conversion events
- Add `src/lib/analytics.ts` exposing `trackEvent(name, params)` (uses `gtag` if present, else `dataLayer.push`).
- Wire named events:
  - `one_pager_download` — PDF download button click on the thank-you page.
  - `thank_you_view` — on `/schools/one-pager/thank-you/` (and any other TY route) page load.
  - `proposal_or_inquiry_submit` — on Contact form + Schools one-pager form successful submit.
  - `book_call_click` — helper ready, attaches via `[data-event="book_call_click"]` for any future calendar link.
  - `shop_click` — migrate existing inline handler in `Shop.tsx` to the helper for consistency.

## 7. Performance pass
- Audit `<img>` tags: ensure meaningful `alt`, add `loading="lazy"` + `decoding="async"` below the fold, leave LCP/hero images eager with `fetchpriority="high"`.
- Flag (don't auto-convert) bundled JPG/PNG assets that would benefit from WebP/AVIF — requires re-export.

## 8. Open Graph / brand consistency
- Covered by `<SEO>` in step 2; sitewide OG fallback stays in `index.html`.
- Grep for any stray "The Poised Gentlemen" and normalize to "Poised Gentlemen".

## Out of scope (explicit)
- WebP/AVIF conversion of bundled image assets (asset re-export needed).
- True server-side 301s (Lovable static hosting can't issue them; client-side `Navigate replace` is the substitute).
- Google Search Console domain verification — placeholder meta added; user pastes their token, or I can run the verification flow via the GSC connector if they want.

## Things I'll need to flag to the user mid-build
- Confirmation on any historical URL slugs whose new destination isn't obvious (for the redirect map).
- Whether to generate a branded `og:image` (currently using a generic Lovable placeholder).
