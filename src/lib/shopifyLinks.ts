// Centralized Shopify outbound URL builder + GA4 click tracker.
// Swap SHOPIFY_BASE to a custom domain post-launch in one place.

import { trackEvent } from "@/lib/analytics";

export const SHOPIFY_BASE =
  "https://poised-growth-hub-rfqhl.myshopify.com";

/** Per-placement utm_content tag. Snake_case, matched to where the link sits. */
export type ShopPlacement =
  | "home_hero"
  | "home_programs"
  | "essence_hub"
  | "essence_product_card"
  | "young_g_card"
  | "young_g_product_card"
  | "scent_quiz_result"
  | "scent_quiz_cta"
  | "scent_quiz_product"
  | "shop_bridge"
  | "shop_bridge_essence"
  | "shop_bridge_young_g"
  | "shop_bridge_bundles"
  | "codex_cta"
  | "codex_related_product";

/**
 * Build a fully-qualified Shopify URL with our standard UTMs.
 * @param path  Either a path beginning with "/" (e.g. "/products/<handle>")
 *              or an absolute Shopify URL.
 * @param placement  Where the link is shown — drives utm_content.
 */
export function shopifyUrl(path: string, placement: ShopPlacement): string {
  const u = new URL(path.startsWith("http") ? path : SHOPIFY_BASE + path);
  u.searchParams.set("utm_source", "poisedgentlemen.com");
  u.searchParams.set("utm_medium", "referral");
  u.searchParams.set("utm_campaign", "shop_bridge");
  u.searchParams.set("utm_content", placement);
  return u.toString();
}

/**
 * Fire the GA4 `shop_click` event. Pass the same placement string as `section`
 * so GA4 and Shopify (`utm_content`) tell a consistent story.
 */
export function trackShopClick(placement: ShopPlacement, url: string) {
  trackEvent("shop_click", {
    event_category: "outbound",
    event_label: placement,
    section: placement,
    placement,
    destination: url,
    transport_type: "beacon",
  });
}
