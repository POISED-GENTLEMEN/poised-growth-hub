#!/usr/bin/env node
/**
 * Audit every Shopify product's live Theme template.
 *
 * For each product handle returned by the Storefront API, fetches
 * `https://<shop>/products/<handle>?cb=<rand>` and inspects the HTML for the
 * `Shopify.theme` block. Any product still served by the "Lovable Redirect"
 * theme is flagged — those are the products whose per-product Theme template
 * override needs to be reset to `Default product` in Shopify admin.
 *
 * Usage:
 *   node scripts/audit-product-themes.mjs
 *   node scripts/audit-product-themes.mjs --json
 *
 * Env (optional overrides):
 *   SHOPIFY_DOMAIN           default: poised-growth-hub-rfqhl.myshopify.com
 *   SHOPIFY_STOREFRONT_TOKEN default: VITE_SHOPIFY_STOREFRONT_TOKEN from .env
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

const SHOP = process.env.SHOPIFY_DOMAIN || "poised-growth-hub-rfqhl.myshopify.com";
const TOKEN =
  process.env.SHOPIFY_STOREFRONT_TOKEN ||
  process.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const API = `https://${SHOP}/api/2025-07/graphql.json`;
const JSON_OUT = process.argv.includes("--json");

if (!TOKEN) {
  console.error("Missing SHOPIFY_STOREFRONT_TOKEN / VITE_SHOPIFY_STOREFRONT_TOKEN");
  process.exit(1);
}

async function fetchAllHandles() {
  const handles = [];
  let cursor = null;
  for (let page = 0; page < 20; page++) {
    const query = `
      query($cursor: String) {
        products(first: 100, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          edges { node { handle title } }
        }
      }`;
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN,
      },
      body: JSON.stringify({ query, variables: { cursor } }),
    });
    const json = await res.json();
    if (json.errors) throw new Error(JSON.stringify(json.errors));
    const { edges, pageInfo } = json.data.products;
    for (const e of edges) handles.push({ handle: e.node.handle, title: e.node.title });
    if (!pageInfo.hasNextPage) break;
    cursor = pageInfo.endCursor;
  }
  return handles;
}

function detectTheme(html) {
  // Shopify.theme = {"name":"Lovable Redirect","id":...,"role":"main"}
  const m = html.match(/Shopify\.theme\s*=\s*\{[^}]*"name"\s*:\s*"([^"]+)"/);
  if (m) return m[1];
  if (/Lovable Redirect/i.test(html)) return "Lovable Redirect";
  if (/"@type"\s*:\s*"Product"/.test(html)) return "(unknown — product JSON-LD present)";
  return "(unknown)";
}

async function probe({ handle, title }) {
  const url = `https://${SHOP}/products/${encodeURIComponent(handle)}?cb=${Math.random()
    .toString(36)
    .slice(2)}`;
  try {
    const res = await fetch(url, { redirect: "follow" });
    const html = await res.text();
    const theme = detectTheme(html);
    return { handle, title, status: res.status, theme, ok: theme !== "Lovable Redirect" };
  } catch (err) {
    return { handle, title, status: 0, theme: "(error)", ok: false, error: String(err) };
  }
}

async function pool(items, n, worker) {
  const out = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await worker(items[idx]);
      }
    })
  );
  return out;
}

(async () => {
  const handles = await fetchAllHandles();
  const results = await pool(handles, 6, probe);
  const flagged = results.filter((r) => !r.ok);

  if (JSON_OUT) {
    console.log(JSON.stringify({ total: results.length, flagged, results }, null, 2));
    process.exit(flagged.length ? 1 : 0);
  }

  console.log(`\nAudited ${results.length} products on ${SHOP}\n`);
  for (const r of results) {
    const mark = r.ok ? "✅" : "❌";
    console.log(`${mark}  [${r.theme}]  ${r.handle}`);
  }
  console.log("");
  if (flagged.length === 0) {
    console.log(`🎉 All ${results.length} products serve a non-redirect theme.`);
  } else {
    console.log(`⚠️  ${flagged.length} product(s) still on Lovable Redirect:\n`);
    for (const r of flagged) {
      console.log(`   • ${r.title}`);
      console.log(`     handle: ${r.handle}`);
      console.log(
        `     fix:    Shopify admin → Products → open → Theme template → Default product → Save\n`
      );
    }
    process.exit(1);
  }
})();
