#!/usr/bin/env node
/**
 * Resolve a go.to.lovable.app ?t= preview token to the underlying Shopify
 * theme it renders.
 *
 * Follows the redirect chain manually, extracts `preview_theme_id` from the
 * resolved Shopify URL, then fetches that URL and parses the inline
 * `Shopify.theme = {...}` block to confirm theme id / name / role.
 *
 * Usage:
 *   node scripts/resolve-preview-token.mjs "https://go.to.lovable.app/?t=<token>"
 *   node scripts/resolve-preview-token.mjs <token>
 *   node scripts/resolve-preview-token.mjs --json <token>
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadDotEnv() {
  try {
    const raw = readFileSync(resolve(__dirname, "../.env"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/i);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {}
}
loadDotEnv();

const EXPECTED_SHOP =
  process.env.SHOPIFY_DOMAIN || "poised-growth-hub-rfqhl.myshopify.com";

const args = process.argv.slice(2);
const JSON_OUT = args.includes("--json");
const rest = args.filter((a) => a !== "--json");
const input = rest[0];

if (!input) {
  console.error(
    'Usage: node scripts/resolve-preview-token.mjs [--json] "<go.to.lovable.app URL | token>"'
  );
  process.exit(2);
}

function toStartUrl(raw) {
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://go.to.lovable.app/?t=${encodeURIComponent(raw)}`;
}

function extractToken(url) {
  try {
    const u = new URL(url);
    return u.searchParams.get("t");
  } catch {
    return null;
  }
}

async function followRedirects(startUrl, maxHops = 10) {
  const hops = [];
  let current = startUrl;
  for (let i = 0; i < maxHops; i++) {
    const res = await fetch(current, { redirect: "manual" });
    const status = res.status;
    const location = res.headers.get("location");
    hops.push({ status, url: current, location });
    if (status >= 300 && status < 400 && location) {
      current = new URL(location, current).toString();
      continue;
    }
    return { hops, finalUrl: current, finalStatus: status };
  }
  throw new Error(`Exceeded ${maxHops} redirect hops`);
}

function detectTheme(html) {
  const m = html.match(/Shopify\.theme\s*=\s*(\{[^}]+\})/);
  if (m) {
    try {
      return JSON.parse(m[1]);
    } catch {}
  }
  const nm = html.match(/Shopify\.theme\s*=\s*\{[^}]*"name"\s*:\s*"([^"]+)"/);
  if (nm) return { name: nm[1], id: null, role: null };
  return null;
}

(async () => {
  const startUrl = toStartUrl(input);
  const startToken = extractToken(startUrl);

  const { hops, finalUrl, finalStatus } = await followRedirects(startUrl);

  let urlThemeId = null;
  try {
    urlThemeId = new URL(finalUrl).searchParams.get("preview_theme_id");
  } catch {}

  // Fetch the resolved page (follow remaining redirects normally) and parse the theme block.
  const pageRes = await fetch(finalUrl, { redirect: "follow" });
  const html = await pageRes.text();
  const theme = detectTheme(html);

  const idsMatch =
    urlThemeId && theme && theme.id != null
      ? String(theme.id) === String(urlThemeId)
      : null;

  const report = {
    input,
    token: startToken,
    startUrl,
    expectedShop: EXPECTED_SHOP,
    hops,
    finalUrl,
    finalStatus,
    previewThemeIdFromUrl: urlThemeId,
    shopifyTheme: theme,
    idsMatch,
  };

  if (JSON_OUT) {
    console.log(JSON.stringify(report, null, 2));
    process.exit(theme ? 0 : 1);
  }

  console.log("");
  console.log(`Input:    ${input}`);
  if (startToken) console.log(`Token:    ${startToken}`);
  console.log("");
  console.log("Redirect chain:");
  hops.forEach((h, i) => {
    console.log(`  Hop ${i + 1}: ${h.status}  ${h.url}`);
    if (h.location) console.log(`           → ${h.location}`);
  });
  console.log("");
  console.log(`Resolved URL:          ${finalUrl}  (status ${finalStatus})`);
  console.log(`URL preview_theme_id:  ${urlThemeId ?? "(none)"}`);
  if (theme) {
    console.log(
      `Shopify.theme:         id=${theme.id ?? "?"}  name="${theme.name ?? "?"}"  role=${theme.role ?? "?"}`
    );
  } else {
    console.log(`Shopify.theme:         (not found in HTML)`);
  }

  try {
    const host = new URL(finalUrl).host;
    if (host !== EXPECTED_SHOP) {
      console.log(
        `\n⚠️  Resolved host ${host} does not match expected ${EXPECTED_SHOP}`
      );
    }
  } catch {}

  if (idsMatch === true) {
    console.log(
      `\n✅ IDs match — preview is rendering theme "${theme.name}" (${theme.id})`
    );
  } else if (idsMatch === false) {
    console.log(
      `\n❌ Mismatch — URL says ${urlThemeId} but page rendered theme id ${theme.id} ("${theme.name}")`
    );
    process.exit(1);
  } else if (!theme) {
    console.log(`\n⚠️  Could not parse Shopify.theme from the resolved page.`);
    process.exit(1);
  }
})().catch((err) => {
  console.error("Failed:", err.message || err);
  process.exit(1);
});
