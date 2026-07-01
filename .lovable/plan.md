## Audit result (just ran)

**Non-product URLs — redirecting, but to the wrong Lovable paths:**
| Shopify URL | Redirects to (current) | Should be |
|---|---|---|
| `/` | `poisedgentlemen.com/` | ✅ correct |
| `/pages/codex` | `/pages/codex` | `/codex/` |
| `/pages/about` | `/pages/about` | `/about/` |
| `/pages/contact` | `/pages/contact` | `/contact/` |
| `/collections/all` | `/collections/all` | `/shop/` |
| `/search?q=cologne` | `/search` | `/` |

**Still 404 on Shopify (harmless but no redirect):** `/pages/essence`, `/pages/schools`, `/collections/essence`, `/collections/young-g`, `/blogs/news`

**Critical — must NOT redirect but currently do:**
- `/products/blue-harmony-...` → being redirected to Lovable ❌ (breaks product page)
- `/cart` → being redirected to Lovable ❌ (breaks cart)
- `/checkout` → correctly stays on Shopify ✅

## Root cause

The Liquid snippet currently pasted at the top of `layout/theme.liquid` is doing a **naive origin swap** (`https://poisedgentlemen.com{{ request.path }}`) and has no exclusion for `/products/*` or `/cart`. It needs:
1. An explicit path-mapping table.
2. A guard that skips `/products/*`, `/cart*`, `/checkout*`, `/apps/*`, `/tools/*`, `/policies/*`.

## Fix — new Liquid snippet to paste

Replace the existing snippet at the very top of `layout/theme.liquid` (in the **published** theme) with:

```liquid
{%- liquid
  assign p = request.path | downcase
  assign skip = false
  if p contains '/products/' or p contains '/cart' or p contains '/checkout' or p contains '/apps/' or p contains '/tools/' or p contains '/policies/' or p contains '/account'
    assign skip = true
  endif
-%}
{%- unless skip -%}
{%- capture target -%}
  {%- case p -%}
    {%- when '/' -%}https://poisedgentlemen.com/
    {%- when '/pages/codex' -%}https://poisedgentlemen.com/codex/
    {%- when '/pages/essence' -%}https://poisedgentlemen.com/essence/
    {%- when '/pages/schools' -%}https://poisedgentlemen.com/schools/
    {%- when '/pages/about' -%}https://poisedgentlemen.com/about/
    {%- when '/pages/contact' -%}https://poisedgentlemen.com/contact/
    {%- when '/collections/all' -%}https://poisedgentlemen.com/shop/
    {%- when '/collections/essence' -%}https://poisedgentlemen.com/shop/
    {%- when '/collections/young-g' -%}https://poisedgentlemen.com/shop/
    {%- when '/blogs/news' -%}https://poisedgentlemen.com/codex/
    {%- else -%}https://poisedgentlemen.com/
  {%- endcase -%}
{%- endcapture -%}
<!doctype html><html><head>
<meta http-equiv="refresh" content="0;url={{ target | strip }}">
<script>location.replace({{ target | strip | json }})</script>
</head><body></body></html>
{%- break -%}
{%- endunless -%}
```

Key differences from what's live now:
- Explicit `{% case %}` mapping so every non-product URL lands on its real Lovable route.
- `skip` guard so `/products/*`, `/cart`, `/checkout`, `/apps/*` are left untouched.
- Fallback (`else`) sends unknown Shopify pages to the Lovable homepage.

## Steps

1. You paste the snippet above into `layout/theme.liquid` in the published Shopify theme, replacing the current redirect block.
2. Save.
3. I re-run `node scripts/audit-shopify-redirects.mjs` — expected: all 11 non-product URLs ✅ and product/cart/checkout stay ✅.
