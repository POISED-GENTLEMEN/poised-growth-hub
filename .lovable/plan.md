# Add Direct Product Links to Shopify

Today every "Shop" button goes to a Shopify **collection** page. We'll add product-level links so users can land directly on the product they want, while checkout stays on Shopify (no embedded cart, no API sync).

## Scope

Three surfaces, all outbound (`target="_blank"`, GA4 tracked via existing `trackShopClick`):

### 1. Essence product grid (`/essence/`)
Add a 12-card grid of the Essence Collection scents under the hero. Each card = name, short scent family, "Shop on Shopify →" button linking to `https://poised-growth-hub-rfqhl.myshopify.com/products/<handle>` with UTMs.

Products to link (all 12, vendor "The Poised Gentlemen", "Cologne Balm" in title):
- Admiral's Odyssey, Blue Harmony, Buoyant, Fighting Trim, First Impression, Hydra Sauvage, JSP, L.Y. Creed, Light Breeze, Poised Sauvage, Seven Figures, Urban Wisdom, Vigaros (Note: 13 found — confirm canonical 12 during build by checking the Essence collection in Shopify.)

### 2. Young-G product grid (`/shop`, under the Young-G bridge card, OR new `/young-g/` hub — see Open Question)
4 cards for the youth line:
- Champion's Crest, Common Ground, Legacy Drive, Let's Geaux
- Plus: Fresh Start Body Wash, Hydra Infusion, RSG Lotion (the kit components)

### 3. Scent Quiz result
Today the quiz CTA points at the Essence collection. Update the result screen so the recommended scent's CTA points at that **specific product** page. Quiz already knows which scent it picked; we just need a `scentId → productHandle` map.

## Technical details

- New file `src/lib/shopifyProducts.ts` exports a typed map: `{ slug, title, handle, family, image }[]` for Essence + Young-G. Handles come from the Shopify Admin API during build (one lookup pass) and are committed as static data — no runtime API calls, no Storefront token wiring.
- Extend `shopifyUrl()` placements: add `"essence_product_card"`, `"young_g_product_card"`, `"scent_quiz_product"`.
- Reuse the existing `BridgeCard` styling for visual consistency; add a slimmer `ProductCard` variant for the grids.
- Product images: pull image URLs from Shopify during the same build-time lookup, store the CDN URLs in the map (no asset copies into the repo).
- No new routes. No Storefront API. No cart. No checkout code.
- Keep all existing collection-level buttons as a secondary "Browse the full collection" link below each grid.

## Out of scope

- Live inventory/pricing display (would require Storefront API)
- On-site cart or checkout
- Pulling product descriptions onto the site (keep editorial copy)
- Removing or restyling the existing bridge cards on `/shop`

## Open question to resolve at build time

Where should the **Young-G product grid** live?
- **A.** Inline on `/shop` under the Young-G bridge card (fast, single page)
- **B.** New `/young-g/` hub page mirroring the `/essence/` pattern (consistent, more work)

I'll default to **A** unless you say otherwise.

## Verification

- Click each new product CTA → opens correct Shopify product page in new tab with UTMs
- Scent Quiz result → recommended scent's "Shop" button opens that specific product
- GA4 `shop_click` events fire with new placement labels
- `npx tsgo --noEmit` passes
