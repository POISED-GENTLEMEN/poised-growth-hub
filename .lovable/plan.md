## Issue

The "Shop Young-G" button links to:
`/collections/young-g-collection`

But the actual Shopify collection handle is:
`/collections/poised-young-gentlemen`

Shopify is likely 301-ing the wrong handle to the storefront homepage (or a fallback), which is why the button doesn't land on the intended collection.

## Fix

In `src/pages/Shop.tsx`, update the `SHOP_LINKS.youngG` entry to use the correct collection handle:

```ts
const SHOP_LINKS = {
  essence: shopifyUrl("/collections/essence-collection", "shop_bridge_essence"),
  youngG: shopifyUrl("/collections/poised-young-gentlemen", "shop_bridge_young_g"),
  bundles: shopifyUrl("/collections/bundles-subscribe-save", "shop_bridge_bundles"),
};
```

This one change updates every reference on `/shop/` that uses `SHOP_LINKS.youngG`:
- The "Shop Young-G" bridge card CTA
- The "Browse the full Young-G Collection" button below the individual product grid
- The closing-CTA "Young-G Collection" button

## Verification

- Also audit the other two collection handles while making the change:
  - Confirm `essence-collection` resolves (currently in use, appears working)
  - Confirm `bundles-subscribe-save` resolves
- If either 404s on the Shopify domain, correct it in the same edit.
- Grep the rest of the codebase for any other `young-g-collection` string (e.g., footer, header, other pages) and update those too so links are consistent site-wide.
- After the edit, click through the Young-G button in the preview and confirm it lands on the products grid at `poised-young-gentlemen`.

No styling, layout, or tracking changes — just correcting the destination handle.