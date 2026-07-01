#!/usr/bin/env node
/**
 * Browser-based audit of the Shopify → Lovable redirect chain.
 *
 * Unlike an HTTP-header check, this drives a headless Chromium so it follows
 * every hop the user's browser would: 3xx redirects, meta-refresh, JS
 * `location.replace`, AND Lovable's client-side <RedirectGate>. The final
 * URL after `networkidle` + a short settle is what the user actually sees,
 * and that's what we assert against.
 *
 * Pass criteria: final URL is on poisedgentlemen.com AND its pathname starts
 * with the expected Lovable route (case-insensitive, trailing-slash tolerant).
 *
 * /products/<handle> and /cart on myshopify.com are audited as INFO only —
 * live checkout uses the Storefront API (→ shop.app / /checkouts/*), which
 * is verified separately.
 *
 * Usage:
 *   node scripts/audit-shopify-redirects.mjs
 *   node scripts/audit-shopify-redirects.mjs --json
 *
 * Requires Playwright's Python bindings (pre-installed in the sandbox).
 * Related: scripts/audit-product-themes.mjs (verifies product theme).
 */

import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const JSON_OUT = process.argv.includes("--json");
const SHOP = process.env.SHOPIFY_DOMAIN || "poised-growth-hub-rfqhl.myshopify.com";
const LOVABLE = "https://poisedgentlemen.com";

const REDIRECTS = [
  { path: "/", expect: "/" },
  { path: "/pages/codex", expect: "/codex/" },
  { path: "/pages/essence", expect: "/essence/" },
  { path: "/pages/schools", expect: "/schools/" },
  { path: "/pages/about", expect: "/about/" },
  { path: "/pages/contact", expect: "/contact/" },
  { path: "/collections/all", expect: "/shop/" },
  { path: "/collections/essence", expect: "/essence/" },
  { path: "/collections/young-g", expect: "/shop/" },
  { path: "/blogs/news", expect: "/codex/" },
  { path: "/search?q=cologne", expect: "/search/" },
];

// Informational only — live checkout uses shop.app via Storefront API.
const INFO = [
  { path: "/products/blue-harmony-inspired-by-bleu-de-chanel", kind: "product" },
  { path: "/cart", kind: "cart" },
  { path: "/checkout", kind: "checkout", mustStayOnShopify: true },
];

const py = `
import asyncio, json, sys
from playwright.async_api import async_playwright

SHOP = ${JSON.stringify(`https://${SHOP}`)}
CASES = json.loads(${JSON.stringify(JSON.stringify({ REDIRECTS, INFO }))})

async def visit(ctx, path, retries=1):
    last_err = None
    for attempt in range(retries + 1):
        page = await ctx.new_page()
        try:
            await page.goto(SHOP + path, wait_until="load", timeout=25000)
            try:
                await page.wait_for_load_state("networkidle", timeout=8000)
            except Exception:
                pass
            await page.wait_for_timeout(1200)
            return {"final": page.url, "title": await page.title(), "error": None}
        except Exception as e:
            last_err = str(e).splitlines()[0]
        finally:
            await page.close()
    return {"final": None, "title": "", "error": last_err}

async def main():
    results = {"redirects": [], "info": []}
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True)
        ctx = await b.new_context(viewport={"width": 1280, "height": 1800})
        for c in CASES["REDIRECTS"]:
            r = await visit(ctx, c["path"])
            results["redirects"].append({**c, **r})
        for c in CASES["INFO"]:
            r = await visit(ctx, c["path"])
            results["info"].append({**c, **r})
        await b.close()
    print(json.dumps(results))

asyncio.run(main())
`;

const dir = mkdtempSync(join(tmpdir(), "shopify-audit-"));
const pyPath = join(dir, "run.py");
writeFileSync(pyPath, py);

const result = await new Promise((resolve, reject) => {
  const proc = spawn("python3", [pyPath], { stdio: ["ignore", "pipe", "pipe"] });
  let out = "", err = "";
  proc.stdout.on("data", (d) => (out += d));
  proc.stderr.on("data", (d) => (err += d));
  proc.on("close", (code) => {
    if (code !== 0) return reject(new Error(`playwright exited ${code}\n${err}`));
    try { resolve(JSON.parse(out.trim().split("\n").pop())); }
    catch (e) { reject(new Error(`bad JSON from playwright:\n${out}\n---\n${err}`)); }
  });
});

function pathnameOf(u) {
  try { const x = new URL(u); return { origin: x.origin, pathname: x.pathname.toLowerCase() }; }
  catch { return { origin: "", pathname: "" }; }
}

function passes(final, expect) {
  if (!final) return false;
  const { origin, pathname } = pathnameOf(final);
  if (origin !== LOVABLE) return false;
  const wanted = expect.toLowerCase().replace(/\/+$/, "");
  const got = pathname.replace(/\/+$/, "");
  if (wanted === "") return got === "";
  return got === wanted || got.startsWith(wanted + "/");
}

const evaluated = {
  redirects: result.redirects.map((r) => ({ ...r, ok: passes(r.final, r.expect) })),
  info: result.info.map((r) => {
    if (r.mustStayOnShopify) {
      const { origin } = pathnameOf(r.final || "");
      const shopifyOrigins = new Set([
        `https://${SHOP}`, "https://shop.app", "https://checkout.shopify.com",
      ]);
      return { ...r, ok: shopifyOrigins.has(origin) };
    }
    return { ...r, ok: null };
  }),
};

if (JSON_OUT) {
  console.log(JSON.stringify(evaluated, null, 2));
  const failed = evaluated.redirects.filter((r) => !r.ok).length
    + evaluated.info.filter((r) => r.ok === false).length;
  process.exit(failed === 0 ? 0 : 1);
}

console.log(`\nBrowser-audit of ${SHOP} → ${LOVABLE}\n`);
console.log("── Non-product URLs (final rendered URL must be a Lovable route) ──");
for (const r of evaluated.redirects) {
  const mark = r.ok ? "✅" : "❌";
  console.log(`${mark}  ${r.path}   →   ${r.final || "(no load: " + r.error + ")"}`);
  if (!r.ok) console.log(`     expected pathname to start with: ${r.expect}`);
}

console.log("\n── Informational (live checkout uses Storefront API → shop.app) ──");
for (const r of evaluated.info) {
  const mark = r.mustStayOnShopify ? (r.ok ? "✅" : "❌") : "ℹ️ ";
  console.log(`${mark}  [${r.kind}]  ${r.path}   →   ${r.final || "(err)"}`);
}

const failed = evaluated.redirects.filter((r) => !r.ok).length
  + evaluated.info.filter((r) => r.ok === false).length;

console.log("");
if (failed === 0) {
  console.log("🎉 All redirects land on the expected Lovable route.");
} else {
  console.log(`⚠️  ${failed} URL(s) need attention.`);
  process.exit(1);
}
