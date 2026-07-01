## Goal

Every URL on `poised-growth-hub-rfqhl.myshopify.com` that is **not** a `/products/*` page or `/checkout*` should 301-redirect to the matching page on `https://poisedgentlemen.com`. Product pages and checkout must continue to serve normally (Shopify checkout can't be redirected or purchases break).

## Why this can't be a code change in this repo

The pages you compared (`/pages/codex` etc.) are rendered by a **Shopify theme (Liquid)**, which lives in the Shopify admin — not in this React codebase. To change what those pages serve, we edit the "Lovable Redirect" theme in Shopify. This repo only holds a helper script; the theme edit itself has to be pasted into Shopify admin (I'll give you the exact snippet and where to paste it).

## What I will do in this repo

1. **Add `scripts/audit-shopify-redirects.mjs`** — a read-only probe that hits a representative set of non-product URLs and reports, for each one, whether it currently:
   - 301-redirects to `poisedgentlemen.com/<matching-path>` ✅
   - Renders a Shopify page (still needs redirecting) ❌
   - Returns 404 (fine — nothing to do)

   URLs probed:
   ```text
   /                       /pages/codex           /pages/essence
   /pages/schools          /pages/about           /pages/contact
   /collections/all        /collections/essence   /collections/young-g
   /blogs/news             /blogs/news/<one-article>
   /account                /search?q=cologne
   ```
   Plus a spot-check that `/products/<handle>` and `/checkout` still 200 (must NOT be redirected).

2. **Extend `scripts/audit-product-themes.mjs` docs header** with a one-line pointer to the new redirect audit script (so future audits find both).

## What you paste into Shopify admin

I'll give you a Liquid snippet to drop at the very top of `layout/theme.liquid` in the **Lovable Redirect** theme. It maps common Shopify URL patterns to the Lovable equivalents and 301s everything else to the homepage. Sketch:

```liquid
{%- comment -%} Redirect all non-product traffic to poisedgentlemen.com {%- endcomment -%}
{%- assign lovable_root = 'https://poisedgentlemen.com' -%}
{%- assign path = request.path -%}
{%- unless path contains '/products/'
        or path contains '/cart'
        or path contains '/checkout'
        or path contains '/account'
        or path contains '/policies/' -%}
  {%- case template -%}
    {%- when 'page.codex'      -%}{%- assign target = '/codex/'     -%}
    {%- when 'page.essence'    -%}{%- assign target = '/essence/'   -%}
    {%- when 'page.schools'    -%}{%- assign target = '/schools/'   -%}
    {%- when 'page.about'      -%}{%- assign target = '/about/'     -%}
    {%- when 'page.contact'    -%}{%- assign target = '/contact/'   -%}
    {%- when 'article'         -%}{%- assign target = '/codex/' | append: article.handle | append: '/' -%}
    {%- when 'blog'            -%}{%- assign target = '/codex/'     -%}
    {%- when 'collection'      -%}{%- assign target = '/shop/'      -%}
    {%- else                   -%}{%- assign target = '/'           -%}
  {%- endcase -%}
  <script>window.location.replace({{ lovable_root | append: target | json }});</script>
  <meta http-equiv="refresh" content="0;url={{ lovable_root | append: target }}">
{%- endunless -%}
```

Exact steps (I'll spell these out in chat when the plan is approved):
- Shopify admin → Online Store → Themes → **Lovable Redirect** → Actions → Edit code → `layout/theme.liquid` → paste snippet at the top → Save.

## How we verify

After you paste and save the snippet, run:

```bash
node scripts/audit-shopify-redirects.mjs
```

Every non-product URL should print ✅ (301 → poisedgentlemen.com/…), product/checkout URLs should print ✅ 200. Any ❌ tells us which template mapping to add.

## Out of scope

- No changes to `/products/*` URLs, checkout, cart, or the Storefront API.
- No changes to the React app.
- No visual rebuild of the Shopify theme — we're hiding it, not restyling it.
