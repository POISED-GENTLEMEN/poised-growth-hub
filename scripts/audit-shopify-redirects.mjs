#!/usr/bin/env node
/**
 * Audit non-product Shopify URLs to verify each redirects to poisedgentlemen.com.
 *
 * The "Lovable Redirect" theme on the Shopify store should bounce every
 * non-product, non-checkout page to its Lovable equivalent. This script probes
 * a representative set of URLs and reports whether each currently redirects,
 * still renders a Shopify page (needs fixing), or 404s (fine).
 *
 * It also spot-checks that /products/<handle> and /checkout continue to serve
 * a 200 — those MUST NOT be redirected or purchases break.
 *
 * Usage:
 *   node scripts/audit-shopify-redirects.mjs
 *   node scripts/audit-shopify-redirects.mjs --json
 *
 * Related: scripts/audit-product-themes.mjs (verifies product theme).
 */

const SHOP = process.env.SHOPIFY_DOMAIN || "poised-growth-hub-rfqhl.myshopify.com";
const LOVABLE_ORIGIN = "https://poisedgentlemen.com";
const JSON_OUT = process.argv.includes("--json");

// Non-product URLs — expected to redirect to poisedgentlemen.com/<path>
const REDIRECT_TARGETS = [
  { path: "/", expect: "/" },
  { path: "/pages/codex", expect: "/codex/" },
  { path: "/pages/essence", expect: "/essence/" },
  { path: "/pages/schools", expect: "/schools/" },
  { path: "/pages/about", expect: "/about/" },
  { path: "/pages/contact", expect: "/contact/" },
  { path: "/collections/all", expect: "/shop/" },
  { path: "/collections/essence", expect: "/shop/" },
  { path: "/collections/young-g", expect: "/shop/" },
  { path: "/blogs/news", expect: "/codex/" },
  { path: "/search?q=cologne", expect: "/" },
];

// URLs that MUST keep serving Shopify (redirecting these breaks checkout).
const KEEP_ALIVE = [
  { path: "/products/blue-harmony-inspired-by-bleu-de-chanel", type: "product" },
  { path: "/checkout", type: "checkout" },
  { path: "/cart", type: "cart" },
];

async function probe(path) {
  const url = `https://${SHOP}${path}${path.includes("?") ? "&" : "?"}cb=${Math.random()
    .toString(36)
    .slice(2)}`;
  try {
    // manual redirect so we can inspect Location header
    const res = await fetch(url, { redirect: "manual" });
    const location = res.headers.get("location");
    let bodyHint = "";
    if (!location && (res.status === 200 || res.status === 202)) {
      const html = await res.text();
      // detect meta-refresh / JS redirect from the Liquid snippet
      const meta = html.match(/http-equiv=["']refresh["'][^>]*url=([^"'>\s]+)/i);
      const js = html.match(/location\.replace\(["']([^"']+)["']\)/i);
      const inferred = meta?.[1] || js?.[1] || null;
      if (inferred) return { status: res.status, redirectTo: inferred, method: "meta/js" };
      bodyHint = /Shopify\.theme/.test(html) ? "shopify-theme" : "unknown";
    }
    return { status: res.status, redirectTo: location, method: location ? "http" : bodyHint };
  } catch (err) {
    return { status: 0, redirectTo: null, error: String(err) };
  }
}

function normalize(u) {
  try {
    const url = new URL(u, `https://${SHOP}`);
    return { origin: url.origin, pathname: url.pathname };
  } catch {
    return { origin: "", pathname: u || "" };
  }
}

async function auditRedirects() {
  const out = [];
  for (const { path, expect } of REDIRECT_TARGETS) {
    const r = await probe(path);
    const to = r.redirectTo ? normalize(r.redirectTo) : null;
    const ok =
      to &&
      to.origin === LOVABLE_ORIGIN &&
      (expect === "/" ? to.pathname === "/" : to.pathname.startsWith(expect));
    out.push({ path, expect, ...r, ok });
  }
  return out;
}

async function auditKeepAlive() {
  const out = [];
  const ALLOWED_HOSTS = new Set([SHOP, "shop.app", "checkout.shopify.com"]);
  for (const { path, type } of KEEP_ALIVE) {
    const r = await probe(path);
    const to = r.redirectTo ? normalize(r.redirectTo) : null;
    const host = to ? to.origin.replace(/^https?:\/\//, "") : "";
    const redirectedAway = to && host && !ALLOWED_HOSTS.has(host);
    const ok = !redirectedAway && (r.status === 200 || r.status === 302 || r.status === 303);
    out.push({ path, type, ...r, ok });
  }
  return out;
}

(async () => {
  console.log(`\nAuditing redirects on ${SHOP} → ${LOVABLE_ORIGIN}\n`);
  const redirects = await auditRedirects();
  const keepAlive = await auditKeepAlive();

  if (JSON_OUT) {
    console.log(JSON.stringify({ redirects, keepAlive }, null, 2));
    process.exit(redirects.every((r) => r.ok) && keepAlive.every((r) => r.ok) ? 0 : 1);
  }

  console.log("── Non-product URLs (should redirect to Lovable) ──");
  for (const r of redirects) {
    const mark = r.ok ? "✅" : "❌";
    const dest = r.redirectTo || "(no redirect)";
    console.log(
      `${mark}  [${String(r.status).padStart(3)} ${r.method || "-"}]  ${r.path}\n     → ${dest}`
    );
  }

  console.log("\n── Must keep serving Shopify (checkout / product / cart) ──");
  for (const r of keepAlive) {
    const mark = r.ok ? "✅" : "❌";
    const dest = r.redirectTo ? ` → ${r.redirectTo}` : "";
    console.log(`${mark}  [${String(r.status).padStart(3)}]  ${r.path}${dest}`);
  }

  const failed =
    redirects.filter((r) => !r.ok).length + keepAlive.filter((r) => !r.ok).length;
  console.log("");
  if (failed === 0) {
    console.log("🎉 All URLs behave as expected.");
  } else {
    console.log(`⚠️  ${failed} URL(s) need attention. Update layout/theme.liquid in the`);
    console.log("   Lovable Redirect theme (Shopify admin → Online Store → Themes → Edit code).");
    process.exit(1);
  }
})();
