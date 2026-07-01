## What the browser test actually shows

I re-ran the audit as a headless browser, following every hop (HTTP, meta-refresh, JS `location.replace`, and Lovable's client-side `RedirectGate`) until the page finished loading. Result:

**Non-product URLs — all land on a valid Lovable page.** The previous script's ❌s were false positives; it was reading only the first `Location` header (which points at `poisedgentlemen.com/pages/codex`), not the final URL after Lovable's `RedirectGate` normalizes it to `/codex/`.

| Shopify URL | Final URL in browser | Verdict |
|---|---|---|
| `/` | `/` | ✅ |
| `/pages/codex` | `/codex/` | ✅ |
| `/pages/essence` | `/essence/` | ✅ |
| `/pages/schools` | `/schools/` | ✅ |
| `/pages/about` | `/about/` | ✅ |
| `/pages/contact` | (timeout — retry, likely fine) | ⚠️ retest |
| `/collections/all` | `/shop/all/` | ✅ |
| `/collections/essence` | `/essence/` | ✅ |
| `/collections/young-g` | `/shop/` | ✅ |
| `/blogs/news` | `/codex/news/` | ✅ |
| `/search?q=cologne` | `/search/?q=cologne` | ✅ |

**Real issue found — /products/* and /cart:** Shopify redirects both to poisedgentlemen.com, and Lovable's `RedirectGate` funnels them to `/shop/`. Your own storefront checkout is unaffected (it uses the Storefront API → `shop.app` / `/checkouts/*`, and `/checkout` stays on Shopify ✅). But any external link/email/ad that points at `myshopify.com/products/<handle>` or `myshopify.com/cart` now dead-ends at `/shop/`.

## Plan

1. **Rewrite `scripts/audit-shopify-redirects.mjs`** as a Playwright-based check that:
   - Navigates each URL in a real browser, waits for load + a short settle, and reads `page.url()`.
   - Passes when the final URL is on `poisedgentlemen.com` **and** the pathname starts with the expected Lovable route (case-insensitive, trailing-slash tolerant, query preserved for `/search`).
   - Prints the final URL and page title so failures are self-diagnosing.
   - Retries once on network timeout before flagging.
   - Keep the JSON output mode for CI.

2. **Keep-alive checks — decide based on your call:**
   - For `/products/<handle>` and `/cart` on `myshopify.com`, the new audit will fail (they currently land on `/shop/`).
   - If you consider that acceptable (your live checkout uses `shop.app` and works), I'll mark these as informational warnings, not failures.
   - If you want them fixed, the Liquid snippet in `.lovable/plan.md` already has the `skip` guard for `/products/`, `/cart`, `/checkout` — it just needs to actually be the live version in the published theme. I'll surface that in the audit output as an actionable message rather than a generic ❌.

3. **Delete `.lovable/plan.md`** once the audit script is updated (its snippet lives on in the audit's help text so it's still discoverable).

4. **Run the new audit** and paste the clean output.

## Technical notes

- Playwright is already available in the sandbox; no new deps.
- Script stays under `scripts/` and runnable via `node scripts/audit-shopify-redirects.mjs` — I'll shell out to `python3` (already installed with Playwright) or port to `playwright` npm if you prefer pure Node. Default: Python subprocess, since that matches how in-browser checks are already run in this repo.
- No changes to app code, redirects.ts, or the Liquid snippet unless you ask.
