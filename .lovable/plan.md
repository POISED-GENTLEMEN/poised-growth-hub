## Plan: Fix audit script, then re-run and report ❌ URLs

**Problem:** `scripts/audit-shopify-redirects.mjs` currently fails with `SyntaxError: Unexpected token '}'` because lines 106–110 are a stray duplicate of the tail of `auditKeepAlive()` left over from a prior edit. Nothing in the audit has actually run since that break was introduced, so I can't yet tell you which URLs are ❌.

**Steps**
1. Delete the duplicated block (lines 106–110) in `scripts/audit-shopify-redirects.mjs`. No other logic changes.
2. Run `node scripts/audit-shopify-redirects.mjs`.
3. Report back the ❌ rows from both sections:
   - Non-product URLs that still render Shopify (redirect missing/wrong).
   - Keep-alive URLs (`/products/...`, `/checkout`, `/cart`) if any were incorrectly redirected away from Shopify.
4. For each failing non-product URL, note what it currently returns (status + destination) so you know exactly which mappings to add to the Liquid snippet in the Lovable Redirect theme.

**No other files touched.** This is a read-only audit apart from the one-line-range cleanup needed to make the script parse.