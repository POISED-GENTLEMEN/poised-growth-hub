## Pre-publish verification (DONE — all green)

Pulled real handles from Shopify for every essence product + the 3 collections referenced by the bridge, then ran the HEAD-check 200-gate.

### Slug → Shopify handle table (12 products)

| # | essenceProducts.slug | Shopify handle | HEAD |
|---|---|---|---|
| 1  | buoyant-inspired-by-giorgio-armani | buoyant-inspired-by-giorgio-armani | 200 |
| 2  | vigaros-inspired-by-versace-eros | vigaros-inspired-by-versace-eros | 200 |
| 3  | light-breeze-inspired-by-dolce-gabbana-light-blue | light-breeze-inspired-by-dolce-gabbana-light-blue | 200 |
| 4  | blue-harmony-inspired-by-bleu-de-chanel | blue-harmony-inspired-by-bleu-de-chanel | 200 |
| 5  | urban-wisdom-inspired-by-coach-for-men | urban-wisdom-inspired-by-coach-for-men | 200 |
| 6  | fighting-trim-inspired-by-chrome-azzaro | fighting-trim-inspired-by-chrome-azzaro | 200 |
| 7  | first-impression-inspired-by-bleu-de-chanel | first-impression-inspired-by-bleu-de-chanel | 200 |
| 8  | james-saint-patrick-jsp-inspired-by-yves-saint-laurent | james-saint-patrick-jsp-inspired-by-yves-saint-laurent | 200 |
| 9  | poised-sauvage-inspired-by-dior-sauvage | poised-sauvage-inspired-by-dior-sauvage | 200 |
| 10 | seven-figures-inspired-by-paco-rabanne-1-million | seven-figures-inspired-by-paco-rabanne-1-million | 200 |
| 11 | l-y-creed-inspired-by-creed-aventus | l-y-creed-inspired-by-creed-aventus | 200 |
| 12 | admirals-odyssey-inspired-by-nautica-voyage | admirals-odyssey-inspired-by-nautica-voyage | 200 |

### Collection URLs (3)

| Bridge CTA | Collection URL | HEAD |
|---|---|---|
| Essence | /collections/essence-collection | 200 |
| Young-G | /collections/young-g-collection | 200 |
| Bundles | /collections/bundles-subscribe-save | 200 |

**Result: 15/15 = 200. Zero remap required. Zero fallbacks triggered.** The earlier worry that titles ("Buoyant Men's Cologne Balm — Aquatic…") would produce different handles was unfounded — handles were authored manually in Shopify to match our slugs exactly. No Bleu de Chanel `-1` collision either: `blue-harmony-inspired-by-bleu-de-chanel` and `first-impression-inspired-by-bleu-de-chanel` are distinct, both live.

Note: a parallel handle `poised-young-gentlemen` (Young-G Essence Collection) also exists and returns 200. Not used by the bridge — keeping `young-g-collection` as planned.

---

## Implementation (unchanged from prior approval)

### 1. New helper — `src/lib/shopifyLinks.ts`
```ts
export const SHOPIFY_BASE = "https://poised-growth-hub-rfqhl.myshopify.com";
export function shopifyUrl(path: string, placement: string): string {
  const u = new URL(path.startsWith("http") ? path : SHOPIFY_BASE + path);
  u.searchParams.set("utm_source", "poisedgentlemen.com");
  u.searchParams.set("utm_medium", "referral");
  u.searchParams.set("utm_campaign", "shop_bridge");
  u.searchParams.set("utm_content", placement);
  return u.toString();
}
```
Centralized base — swap to custom domain post-launch in one line.

### 2. Delete on-site commerce
Files removed: `src/pages/Cart.tsx`, `src/pages/Checkout.tsx`, `src/pages/ThankYou.tsx`, `src/pages/ProductDetail.tsx`, `src/pages/EssenceCollection.tsx`, `src/contexts/ShopContext.tsx`. Remove `<ShopProvider>` from `App.tsx` and the cart icon from `Header.tsx`.

### 3. Redirect map (in `src/lib/redirects.ts` / `RedirectGate`)
All of `/cart`, `/checkout`, `/thank-you`, `/products/*`, `/shop/essence-collection` → `/shop/` (301-equivalent via `navigate(..., { replace: true })`).

### 4. Re-home Scent Quiz onto `/shop/`
- `ScentQuiz.tsx` already imports from `@/data/essenceProducts` directly — no `ShopProvider` dependency, no logic changes needed.
- Mount it inside `Shop.tsx` at anchor `#scent-quiz`; preserve `#essence-collection` anchor (header still links to it).
- Quiz result CTAs use `shopifyUrl("/products/<slug>", "scent_quiz_result")`; the "retake / browse all" CTA uses `utm_content=scent_quiz_cta`.
- Backward-compat: `?quiz=1` auto-opens the quiz.

### 5. Rewire outbound links with placements
| Location | utm_content |
|---|---|
| Home hero shop CTA | `home_hero` |
| Home programs section CTAs | `home_programs` |
| `/essence/` hub CTAs | `essence_hub` |
| Young-G card CTA | `young_g_card` |
| Scent quiz result product link | `scent_quiz_result` |
| Scent quiz secondary CTA | `scent_quiz_cta` |
| `/shop/` bridge tiles (Essence/Young-G/Bundles) | `shop_bridge` |
| Codex `RelatedProducts` tiles | `codex_related_product` |
| Codex inline CTA | `codex_cta` |

### 6. GA4 — keep `shop_click` firing alongside UTMs
`trackShopClick(section, url)` continues to fire on every outbound click. **Pass the same `placement` value as the `section` param** so GA4's `section` and Shopify's `utm_content` always match.

### 7. `RelatedProducts.tsx` refactor
Drop `useShop`; read from `@/data/essenceProducts` directly; outbound links use `shopifyUrl("/products/" + product.slug, "codex_related_product")`.

### 8. SEO housekeeping
- Remove deleted routes from `public/sitemap.xml` and `public/llms.txt`.
- Confirm `/shop/` remains in sitemap with trailing slash.

---

## Verification before publish

1. `tsgo` clean, build passes, no remaining references to `ShopContext`/`useShop`.
2. Manual: visit `/cart`, `/checkout`, `/thank-you`, `/products/buoyant-inspired-by-giorgio-armani`, `/shop/essence-collection` → each redirects to `/shop/`.
3. Open `/shop/#scent-quiz` and `/shop/?quiz=1` → quiz mounts and runs.
4. Header link to `/shop#essence-collection` scrolls to the bridge's Essence section.
5. Complete a quiz pass → result CTA opens a Shopify PDP. Re-run the HEAD-check on every URL the quiz can emit (all 12 PDPs already verified 200 above).
6. DevTools Network: outbound clicks carry all four UTMs with the right `utm_content`. GA4 DebugView: `shop_click` fires with matching `section` param.
7. Re-run the 15-URL HEAD gate one more time immediately before publish; abort if any non-200 appears.

## Fallback rule (recorded; not triggered this round)
If any single PDP returns non-200 at the pre-publish re-check, that product's CTA falls back to its collection URL (Essence balms → `/collections/essence-collection`, Young-G items → `/collections/young-g-collection`) and the fallback is logged. Today: **0 fallbacks**.
