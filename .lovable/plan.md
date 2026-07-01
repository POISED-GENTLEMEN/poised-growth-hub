## Problem

The three CTA buttons on `/shop/` don't fit their labels. My previous attempt allowed text to wrap, which fixed the overflow but created ugly two-line buttons of uneven heights and broke the polished look.

Root cause: the labels are simply too long for a 3-column layout at this viewport. Wrapping is a band-aid; shortening the labels + letting them scale is the real fix.

## Fix

In `src/pages/Shop.tsx`, `BridgeCard` component:

1. **Revert the wrapping hack** — remove `whitespace-normal`, `h-auto`, `min-h-[52px]`, `py-3`, and the responsive text-size juggling I added last turn. Restore the clean single-line `size="lg"` button.
2. **Shorten the three CTA labels** so they fit on one line at all viewports ≥ md:
   - `"Shop the Essence Collection"` → `"Shop Essence"`
   - `"Shop the Young-G Collection"` → `"Shop Young-G"`
   - `"Shop Bundles + Subscribe & Save"` → `"Shop Bundles"`
3. Keep the existing `ExternalLink` icon and all tracking/analytics attributes unchanged.

The card headings ("The Essence Collection", "The Young-G Collection", "Bundles + Subscribe & Save") already tell the user what they're buying — the button just needs to say "go."

No other files change. No routing, tracking, or Shopify links change.
