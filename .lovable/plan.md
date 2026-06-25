## Routing-only update — replace all outbound Shopify product links

No design, copy, layout, or analytics changes. Every link keeps `target="_blank" rel="noopener noreferrer"` and continues to flow through `shopifyUrl()` (preserves UTMs + GA4 tracking).

### 1. Essence Collection — `src/pages/Essence.tsx`
All 12 handles in the `scents[]` array already match the URLs you provided. **No change needed**, but I will verify each one byte-for-byte during the pass and report.

### 2. Young-G Collection — `src/pages/Shop.tsx`
Replace the current 6-tile inline array with **only the 4 cologne tiles** using the new clean handles. The 2 skincare tiles (Hydra Infusion, RSG Lotion) will be removed because they are not in the list you provided.

| Card | Old handle | New handle |
|---|---|---|
| Let's Geaux | `lets-geaux` | `lets-geaux` (unchanged) |
| Champion's Crest | `champion-s-crest™-youth-cologne-balm-victory-fueled-freshness` | `champions-crest` |
| Legacy Drive | `legacy-drive™-youth-cologne-balm-clean-ambition` | `legacy-drive` |
| Common Ground | `common-ground™-unisex-youth-cologne-balm-shared-freshness` | `common-ground` |
| Hydra Infusion Body Wash | `hydra-infusion` | **REMOVED** |
| Ready Set Go (RSG) Lotion | `ready-set-go-rsg-lotion-…-rsg-lotion` | **REMOVED** |

### 3. Codex book product URL
You provided one Codex URL: `…/products/the-poised-gentlemen-codex-paperback-founding-circle-edition`. **I need to know where to wire it** — the current Codex surface uses Shopify checkout via variant IDs in `src/components/BookSalesSection.tsx`, not an outbound product-page URL. Three options:

- **A.** Add it as a "View on Shopify" secondary link under the existing Buy buttons in `BookSalesSection.tsx`.
- **B.** Replace the `RelatedProducts` widget content on Codex article pages so each article links to this Codex book instead of three Essence scents.
- **C.** Both A and B.

I'll wait for your pick before touching Codex.

### 4. Cleanup of stale/placeholder links
- `src/components/RelatedLinks.tsx:112` — hardcoded absolute Essence-collection URL with inline UTMs. Refactor to use `shopifyUrl("/collections/essence-collection", "essence_hub")` so the helper stays the single source of truth. Same destination, no visible change.

### 5. Verification
After edits I will:
- Re-grep the repo for `™`, `myshopify`, and `/products/` to confirm no stale or placeholder handles remain.
- Run `scripts/audit-product-themes.mjs` against the 4 Young-G handles + Codex book handle to confirm the new URLs resolve on the storefront.
- Return a complete before/after table for every product link on the site and an explicit "no .lovable or placeholder destinations remain" confirmation.

### Files touched
- `src/pages/Shop.tsx` (Young-G array)
- `src/components/RelatedLinks.tsx` (refactor only)
- *(Codex location TBD per your answer above)*

**Please confirm option A, B, or C for the Codex book link and I'll execute the full pass in one go.**
