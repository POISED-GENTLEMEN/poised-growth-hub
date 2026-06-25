import { test, expect, type Page } from "@playwright/test";

/**
 * Verifies every Essence + Young-G product card fires exactly one GA4
 * `shop_click` event with the correct placement / section / event_label,
 * and that the outbound Shopify URL carries the full UTM set.
 *
 * Captures GA4 events by wrapping `window.dataLayer.push` (real gtag.js
 * routes every event through dataLayer, so this stays accurate even after
 * Google's script overwrites our `gtag` shim).
 */

const SHOPIFY_HOST = "poised-growth-hub-rfqhl.myshopify.com";

const EXPECTED_UTM = {
  utm_source: "poisedgentlemen.com",
  utm_medium: "referral",
  utm_campaign: "shop_bridge",
} as const;

type Card = { name: string; handle: string };

const ESSENCE: Card[] = [
  { name: "Buoyant", handle: "buoyant-inspired-by-giorgio-armani" },
  { name: "Admiral's Odyssey", handle: "admirals-odyssey-inspired-by-nautica-voyage" },
  { name: "Vigaros", handle: "vigaros-inspired-by-versace-eros" },
  { name: "Urban Wisdom", handle: "urban-wisdom-inspired-by-coach-for-men" },
  { name: "Poised Sauvage", handle: "poised-sauvage-inspired-by-dior-sauvage" },
  { name: "Light Breeze", handle: "light-breeze-inspired-by-dolce-gabbana-light-blue" },
  { name: "L.Y. Creed", handle: "l-y-creed-inspired-by-creed-aventus" },
  { name: "Blue Harmony", handle: "blue-harmony-inspired-by-bleu-de-chanel" },
  { name: "First Impression", handle: "first-impression-inspired-by-bleu-de-chanel" },
  { name: "JSP (James Saint Patrick)", handle: "james-saint-patrick-jsp-inspired-by-yves-saint-laurent" },
  { name: "Fighting Trim", handle: "fighting-trim-inspired-by-chrome-azzaro" },
  { name: "Seven Figures", handle: "seven-figures-inspired-by-paco-rabanne-1-million" },
];

const YOUNG_G: Card[] = [
  { name: "Champion's Crest", handle: "champion-s-crest\u2122-youth-cologne-balm-victory-fueled-freshness" },
  { name: "Common Ground", handle: "common-ground\u2122-unisex-youth-cologne-balm-shared-freshness" },
  { name: "Legacy Drive", handle: "legacy-drive\u2122-youth-cologne-balm-clean-ambition" },
  { name: "Let's Geaux", handle: "lets-geaux" },
  { name: "Hydra Infusion Body Wash", handle: "hydra-infusion" },
  { name: "Ready Set Go (RSG) Lotion", handle: "ready-set-go-rsg-lotion-everyday-hydration-for-all-generations-rsg-lotion" },
];

const INIT_SCRIPT = `
window.__shopClickEvents = [];
window.__openedUrls = [];
window.dataLayer = window.dataLayer || [];
const _origPush = window.dataLayer.push.bind(window.dataLayer);
window.dataLayer.push = function() {
  for (const arg of arguments) {
    // gtag('event', 'shop_click', {...}) ends up as arrayLike {0,1,2,length:3}
    const isEvent =
      arg && typeof arg === 'object' &&
      (arg[0] === 'event' || arg['0'] === 'event') &&
      (arg[1] === 'shop_click' || arg['1'] === 'shop_click');
    if (isEvent) {
      const params = arg[2] !== undefined ? arg[2] : arg['2'];
      window.__shopClickEvents.push(params || {});
    }
  }
  return _origPush.apply(window.dataLayer, arguments);
};
window.gtag = function() { window.dataLayer.push(Array.from(arguments)); };
window.open = function(url) { window.__openedUrls.push(String(url)); return null; };
document.addEventListener('click', function(e) {
  const target = e.target;
  if (!target || !(target instanceof Element)) return;
  const a = target.closest('a[target="_blank"]');
  if (a) {
    window.__openedUrls.push(a.href);
    e.preventDefault();
  }
}, true);
`;

async function resetCapture(page: Page) {
  await page.evaluate(() => {
    (window as unknown as { __shopClickEvents: unknown[] }).__shopClickEvents = [];
    (window as unknown as { __openedUrls: string[] }).__openedUrls = [];
  });
}

async function assertCard(page: Page, card: Card, placement: string) {
  await resetCapture(page);
  const button = page.getByLabel(`Shop ${card.name} on Shopify`, { exact: true });
  await expect(button, `card not found: ${card.name}`).toHaveCount(1);
  await button.scrollIntoViewIfNeeded();
  await button.click();
  // Let synthetic React onClick + dataLayer push flush.
  await page.waitForFunction(
    () =>
      (window as unknown as { __shopClickEvents: unknown[] }).__shopClickEvents.length > 0 &&
      (window as unknown as { __openedUrls: string[] }).__openedUrls.length > 0,
    null,
    { timeout: 2000 },
  );

  const events = await page.evaluate(
    () => (window as unknown as { __shopClickEvents: Record<string, unknown>[] }).__shopClickEvents,
  );
  const urls = await page.evaluate(
    () => (window as unknown as { __openedUrls: string[] }).__openedUrls,
  );

  expect(events, `shop_click events for ${card.name}`).toHaveLength(1);
  const params = events[0];
  expect(params.placement, `${card.name}.placement`).toBe(placement);
  expect(params.section, `${card.name}.section`).toBe(placement);
  expect(params.event_label, `${card.name}.event_label`).toBe(placement);
  expect(params.event_category, `${card.name}.event_category`).toBe("outbound");

  expect(urls, `outbound urls for ${card.name}`).toHaveLength(1);
  const url = new URL(urls[0]);
  expect(url.host, `${card.name}.host`).toBe(SHOPIFY_HOST);
  expect(decodeURIComponent(url.pathname), `${card.name}.path`).toBe(`/products/${card.handle}`);
  for (const [key, value] of Object.entries(EXPECTED_UTM)) {
    expect(url.searchParams.get(key), `${card.name}.${key}`).toBe(value);
  }
  expect(url.searchParams.get("utm_content"), `${card.name}.utm_content`).toBe(placement);
}

test.describe("Shop tracking — GA4 + UTMs", () => {
  test.beforeEach(async ({ context }) => {
    await context.addInitScript(INIT_SCRIPT);
  });

  test("every Essence product card fires shop_click with essence_product_card UTMs", async ({ page }) => {
    await page.goto("/essence/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector('[aria-label="Shop Buoyant on Shopify"]');
    for (const card of ESSENCE) {
      await assertCard(page, card, "essence_product_card");
    }
  });

  test("every Young-G product card fires shop_click with young_g_product_card UTMs", async ({ page }) => {
    await page.goto("/shop#young-g-products", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("#young-g-products");
    for (const card of YOUNG_G) {
      await assertCard(page, card, "young_g_product_card");
    }
  });
});
