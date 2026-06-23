# Plan — Cross-link cleanup (internal links only)

Scope: internal navigation only. Shopify outbound URLs/UTMs in `RelatedLinks` (essence variant) and `RelatedProducts`, plus ScentQuiz and EQ Assessment, are untouched.

## 1. Honor `showSchoolsLink` in `RelatedLinks` (codex-article variant)

`src/components/RelatedLinks.tsx`, `buildLinks(variant="codex-article")`:

Replace the current either/or branch with independent flag checks so both can render when both are true:

```
links = [ relatedCodexArticle ]
if (article.showEssenceLink) links.push(EssenceCard)
if (article.showSchoolsLink) links.push(SchoolsCard)
// keep emphasis: Essence emphasized when present, else Schools emphasized
```

Behavior:
- `showSchoolsLink: true` only → Schools card (current fallback, now driven by the flag instead of `!showEssenceLink`).
- `showEssenceLink: true` only → Essence card (unchanged).
- Both true (e.g. `four-pillars-of-character`) → both cards.
- Both false → just the related Codex article.

No change to the Essence Shopify URL or its UTM string.

## 2. Wire `RelatedLinks` into blog `ArticleDetail`

`src/pages/ArticleDetail.tsx`:
- Import `RelatedLinks`.
- After the existing `<RelatedProducts articleSlug={slug} />` block, render `<RelatedLinks variant="essence" />`.
  - Rationale: blog posts don't map to a Codex slug, so `codex-article` variant doesn't apply. The `essence` variant gives readers the Shop collection + 3 grooming/mindset Codex articles — the most relevant cross-links for blog readers and consistent with existing site IA. (Shop card here already uses the verified outbound URL — untouched.)
- Keep `RelatedProducts` above it; layout: products grid → related links section → back-to-codex button.

## 3. Remove dead export

`src/data/essenceProducts.ts`: delete the `getRelatedProducts` function (line ~511) and any helper used only by it. Confirm no remaining importers (grep already shows none).

## Verification

- `tsgo` typecheck clean.
- Spot-check routes: `/codex/four-pillars-of-character/` (both cards), `/codex/modern-masculinity/` (Essence only), `/codex/what-is-emotional-intelligence-for-men/` (Schools only), a blog article under `/blog/<slug>` (RelatedLinks now visible).
- Confirm ScentQuiz (`/shop#scent-quiz`) and EQ Assessment (`/eq-assessment`) render and run — no files in those paths touched.
- Confirm Shopify outbound URL in `RelatedLinks.tsx` essence variant byte-identical to current.
