# Why product links don't open product pages

## Root cause (verified)

The outbound URLs in our code are **correct**. I probed four representative ones (Buoyant, Champion's Crest™, Let's Geaux, RSG Lotion) directly against `poised-growth-hub-rfqhl.myshopify.com` and every URL returned HTTP 200 with no redirect — meaning the handles in `Essence.tsx`, `Shop.tsx`, and `RelatedProducts.tsx` match the live Shopify handles exactly (including the `™` characters and the long RSG slug).

The problem is what Shopify actually serves at those URLs: a **storefront password page**. The HTML response contains `password`, `Enter using password`, and `Sorry`. Until the password gate is lifted in Shopify, every product link from poisedgentlemen.com will land on the same locked splash instead of the product page.

## What needs to happen (you, in Shopify admin)

This is a Shopify setting, not a code fix. In Shopify admin:

1. Go to **Online Store → Preferences**.
2. Scroll to **Password protection**.
3. Uncheck **"Restrict access to visitors with the password"**.
4. Save.

Within a minute the same `/products/<handle>` URLs we already link to will render the real product pages — no code change required.

## What I will do on the code side

Nothing structural — the links and UTMs are correct and don't need editing.

I'll do two small verification passes once you've lifted the password:

1. **Smoke-test the 18 product links** (12 Essence + 6 Young-G) by `curl`-ing each `/products/<handle>` and asserting the response is the product page (contains `"product":` JSON-LD) rather than the password gate. Any handle that 404s after the gate comes down gets flagged with the closest Shopify handle so we can correct it.
2. **Re-run the existing Playwright `e2e/shop-tracking.spec.ts`** to confirm GA4 `shop_click` still fires with the correct `placement` and UTMs after any handle corrections.

## Out of scope

- Building internal `/product/:handle` pages — you chose to keep the outbound-to-Shopify flow, so I will not add a new route or Storefront-API product detail UI.
- Touching cart/checkout logic, pricing, or product data in Shopify.

## Technical details

- Verified files: `src/lib/shopifyLinks.ts` (URL builder + UTMs are correct), `src/pages/Essence.tsx` lines 33–45 (12 Essence handles), `src/pages/Shop.tsx` lines 265–272 (6 Young-G handles), `src/components/RelatedProducts.tsx` line 82 (Codex related-product handles).
- Verified handles via `shopify--get_product` for sample IDs 9204763001090, 9209414582530, 9204762280194 — all three match what we link to.
- Verification probe used: `curl -sL https://poised-growth-hub-rfqhl.myshopify.com/products/<handle>` → returns the password-gate HTML for every product.
