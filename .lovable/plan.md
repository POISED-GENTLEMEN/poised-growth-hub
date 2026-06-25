## Goal
Find every misrouted button/link on the site, fix the unambiguous ones in-place, and flag the judgment calls for you before touching them.

## Step 1 — Full link audit
Scan every `<Link to=...>`, `<a href=...>`, `navigate(...)`, and `window.location` call across `src/pages` and `src/components`. For each, record:
- File + line
- Visible label
- Current destination
- Route status: ✅ resolves, 🔁 hits a redirect (still works), ❌ 404, ⚠️ resolves but likely wrong target

Cross-reference against `src/App.tsx` routes and `src/lib/redirects.ts`.

## Step 2 — Auto-fix the obvious breaks
Confirmed dead/wrong destinations found so far (will fix without asking):

| File | Link | Problem | Fix |
|---|---|---|---|
| `src/components/Footer.tsx:109` | `/faq` | No route, 404 | Remove link, or point at `/contact/#faq` if a FAQ block exists there |
| `src/components/Footer.tsx:124` | `/accessibility` | No route, 404 | Remove link, or point at `/legal/#accessibility` |
| `src/pages/Index.tsx:131,277,419` | `/proposal` | Works via redirect, but causes a flash + extra hop | Point directly at `/schools/#proposal-form` |
| `src/pages/Index.tsx:196` | `/project-power` | Same — redirects | Point directly at `/schools/#project-power` |
| `src/pages/Playbook.tsx:332`, `src/pages/PYG.tsx:78` | `/request-proposal` | Same — redirects | Point directly at `/schools/#proposal-form` |
| `src/pages/Resources.tsx:169` | `/codex/poised-modern-masculinity` | Verify slug exists in `codexArticleSlugs`; if not, fall back to `/codex/` | Repoint to valid slug |
| Hero "Get the Parent Playbook" button | `#parent-playbook` | Verify anchor id exists on `ParentPlaybookSection` | Add id if missing |

Will also confirm `/codex/teen-grooming-routine/`, `/codex/how-to-build-discipline/`, `/codex/modern-masculinity/` (used on `Essence.tsx`) exist in `codexArticleSlugs`. Any that don't → repoint to `/codex/`.

## Step 3 — Flag, don't fix
Anything where the *right* destination is a judgment call — e.g. a CTA whose label says "Shop X" but goes to a generic `/shop` instead of the specific product, or a "Learn more" that could equally point at two pages — will be reported with my recommendation, not auto-changed.

## Step 4 — Report
Single summary with three lists:
1. **Fixed** — file, link, before → after
2. **Needs your call** — file, link, current target, my recommended target, why ambiguous
3. **Verified correct** — count only, not the full list

## Technical notes
- No new routes added in this pass (would be a separate task if you want pages for `/faq`, `/accessibility`, etc.).
- `RedirectGate` already absorbs legacy paths, so removing redirect hops is a polish fix, not a functional one — included because you mentioned buttons going to "wrong places" which often means the redirect flash.
- No brand-voice or styling changes.