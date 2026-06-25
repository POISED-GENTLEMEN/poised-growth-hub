# Resolve Lovable Preview Token → Shopify Theme

Add a small Node script that takes a `go.to.lovable.app/?t=…` URL (or bare token) and prints which Shopify theme the preview is actually rendering, so theme mismatches can be debugged the same way as the existing per-product audit.

## What it does

1. Accept input as either a full URL or a raw token:
   - `node scripts/resolve-preview-token.mjs "https://go.to.lovable.app/?t=YjpkYjg2NTk..."`
   - `node scripts/resolve-preview-token.mjs YjpkYjg2NTk...`
2. Follow the redirect chain from `go.to.lovable.app` with `redirect: "manual"` in a loop, capturing every `Location` header. The Lovable shortener forwards to a Shopify storefront URL that carries Shopify's own theme-preview params (`preview_theme_id=…` and/or `_ab=0&_fd=0&_sc=1&preview_theme_id=…`).
3. From the final Shopify URL, extract `preview_theme_id` (the numeric Shopify theme ID).
4. Fetch that URL once with redirects followed and parse `Shopify.theme = {"name":"…","id":…,"role":"…"}` out of the returned HTML (same regex already used in `scripts/audit-product-themes.mjs`).
5. Print a report:
   - Original short URL / token
   - Full redirect chain (status + Location at each hop)
   - Resolved storefront URL
   - `preview_theme_id` from the URL
   - Theme `name`, `id`, and `role` parsed from `Shopify.theme`
   - A mismatch warning if the URL's `preview_theme_id` and the HTML's `Shopify.theme.id` disagree
6. Support `--json` for machine-readable output and exit non-zero on failure to resolve.

## Technical details

- File: `scripts/resolve-preview-token.mjs`, ESM, no new dependencies (uses global `fetch`).
- Reuse the `.env` loader pattern from `scripts/audit-product-themes.mjs` so `SHOPIFY_DOMAIN` defaults to `poised-growth-hub-rfqhl.myshopify.com` (used only to sanity-check the resolved host).
- Redirect handling: manual loop, max 10 hops, abort on non-3xx with no `Location`. Resolve relative `Location` values against the previous URL.
- Theme parsing regex: `/Shopify\.theme\s*=\s*(\{[^}]+\})/` then `JSON.parse`, with a fallback to the name-only regex already in the audit script.
- No changes to app code, edge functions, or the existing audit script. Pure additive devtool.

## Usage examples

```
node scripts/resolve-preview-token.mjs "https://go.to.lovable.app/?t=YjpkYjg2NTkuOTQ5NC41NDc0LjkzOWYuNDg4NDQxMWU5OGUy"
node scripts/resolve-preview-token.mjs --json YjpkYjg2NTk...
```

Sample (abridged) output:

```
Token:        YjpkYjg2NTk...
Hop 1: 302  https://go.to.lovable.app/?t=YjpkYjg2NTk...
        → https://poised-growth-hub-rfqhl.myshopify.com/?preview_theme_id=149...
Hop 2: 200  https://poised-growth-hub-rfqhl.myshopify.com/?preview_theme_id=149...
URL preview_theme_id: 149xxxxxxxxx
Shopify.theme:        { id: 149xxxxxxxxx, name: "Lovable Redirect", role: "unpublished" }
✅ IDs match — preview is rendering theme "Lovable Redirect" (149xxxxxxxxx)
```
