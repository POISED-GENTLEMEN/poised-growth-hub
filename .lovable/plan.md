# Verify GA4 click events on Essence + Young-G product cards

## Goal
Confirm every product card on `/essence/` (12) and `/shop` (6) fires a GA4 `shop_click` event with the right `placement` and that the outbound URL carries the expected UTMs.

## Approach — automated Playwright sweep against the live preview

Run a single headless Playwright script that:

1. **Stubs GA4** before any page script runs: injects `window.dataLayer = []` and a `window.gtag` shim that pushes every call into `dataLayer`. The existing `trackEvent` helper in `src/lib/analytics.ts` will hit this shim instead of the real GA endpoint.
2. **Intercepts outbound navigations** so we capture the `href` without actually opening a new tab. Override `window.open` to record URL + return null, and add `preventDefault` on `click` for `a[target="_blank"]` after recording `event.currentTarget.href`.
3. **Visits `/essence/`**, finds every `Shop <name>` button by `aria-label="Shop <name> on Shopify"`, clicks it, then asserts:
   - A `gtag('event', 'shop_click', {...})` call landed in `dataLayer` with `placement === "essence_product_card"` and `section === "essence_product_card"`.
   - The captured `href` host is `poised-growth-hub-rfqhl.myshopify.com`, path is `/products/<expected-handle>`, and query string contains `utm_source=poisedgentlemen.com`, `utm_medium=referral`, `utm_campaign=shop_bridge`, `utm_content=essence_product_card`.
4. **Visits `/shop#young-g-products`**, repeats the same assertion loop for the 6 Young-G cards with `placement === "young_g_product_card"` and `utm_content=young_g_product_card`.
5. **Prints a pass/fail table** (one row per card) and exits non-zero if any row fails. Screenshots the section once per page for visual confirmation.

## Expected URL list (handles to assert against)

Essence (12): `buoyant-inspired-by-giorgio-armani`, `admirals-odyssey-inspired-by-nautica-voyage`, `vigaros-inspired-by-versace-eros`, `urban-wisdom-inspired-by-coach-for-men`, `poised-sauvage-inspired-by-dior-sauvage`, `light-breeze-inspired-by-dolce-gabbana-light-blue`, `l-y-creed-inspired-by-creed-aventus`, `blue-harmony-inspired-by-bleu-de-chanel`, `first-impression-inspired-by-bleu-de-chanel`, `james-saint-patrick-jsp-inspired-by-yves-saint-laurent`, `fighting-trim-inspired-by-chrome-azzaro`, `seven-figures-inspired-by-paco-rabanne-1-million`.

Young-G (6): `champion-s-crest™-...`, `common-ground™-...`, `legacy-drive™-...`, `lets-geaux`, `hydra-infusion`, `ready-set-go-rsg-lotion-...`. The `™` characters will URL-encode to `%E2%84%A2` — the assertion will decode the path before comparing.

## What I will NOT do

- Hit GA4 / Google's collection endpoint. The shim is the verification target; if `gtag` is invoked correctly here, GA4 receives it in production.
- Modify any product / tracking code (read-only verification).
- Touch the real Shopify store.

## Pass criteria

- 18 / 18 cards fire exactly one `shop_click` event with correct placement.
- 18 / 18 captured URLs match expected handle + full UTM set.
- No console errors during the run.

If any row fails I'll report the specific card, expected vs. actual, and propose a fix in a follow-up.
