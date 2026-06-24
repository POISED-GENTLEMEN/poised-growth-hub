# Add Cloudflare Turnstile CAPTCHA

Gate the two public form submissions (Contact, Schools One-Pager) behind a Cloudflare Turnstile challenge so automated bots can't submit them.

## What you'll do once
1. Create a Turnstile site at https://dash.cloudflare.com/?to=/:account/turnstile (Widget mode: **Managed**, domains: `poisedgentlemen.com` + `lovable.app`).
2. Paste the **Site Key** in chat (public, goes in code).
3. When prompted, paste the **Secret Key** into the secure secret prompt — it will be stored as `TURNSTILE_SECRET_KEY` for backend verification only.

## What I'll build

### Frontend
- Add a tiny `<TurnstileWidget />` component (loads the Cloudflare script once, renders the widget, returns a token via callback).
- Drop it into `src/pages/Contact.tsx` above the submit button.
- Drop it into `src/pages/SchoolsOnePager.tsx` above the submit button.
- Submit button stays disabled until a token is present. Token resets after submit (success or error) so re-submits get a fresh challenge.
- Store the site key in `src/lib/turnstile.ts` as a public constant (safe to commit).

### Backend
- New edge function `verify-turnstile` (verify_jwt = false) that:
  - Accepts `{ token, remoteip? }`.
  - Calls `https://challenges.cloudflare.com/turnstile/v0/siteverify` with `TURNSTILE_SECRET_KEY`.
  - Returns `{ ok: true }` or `{ ok: false, error }`.
- Update `send-transactional-email` (`supabase/functions/send-transactional-email/index.ts`):
  - For non-service_role callers, require a `captchaToken` in the body.
  - Verify it inline (same siteverify call) before any send work.
  - Reject with 403 if missing/invalid. Service-role calls skip this.
- `Contact.tsx` and `SchoolsOnePager.tsx` pass the token through:
  - In `supabase.functions.invoke("send-transactional-email", { body: { ..., captchaToken } })`.
  - For the Contact direct DB insert path (`contact_submissions`) and the One-Pager `email_submissions` insert, call `verify-turnstile` first; abort the insert if it fails.

### Out of scope
- No DB schema changes.
- No RLS changes (RLS already restricts these tables; CAPTCHA is an additional spam gate).
- No changes to other public endpoints (preview-email, unsubscribe, suppression) — those aren't user-submitted forms.

## Technical details

- Script: `https://challenges.cloudflare.com/turnstile/v0/api.js` (loaded async, deduped).
- Widget render: `window.turnstile.render(el, { sitekey, callback, 'expired-callback', 'error-callback', theme: 'light' })`.
- Token TTL is ~300s; we verify on the server immediately on submit, so expiry is rare. If it expires, the widget auto-resets and the user clicks again.
- Verification call (server):
  ```
  POST https://challenges.cloudflare.com/turnstile/v0/siteverify
  body: secret=<TURNSTILE_SECRET_KEY>&response=<token>
  ```
- Failure handling: on `success: false`, return 403 with `error-codes` for logging; surface a generic "Verification failed, please try again" in the UI.
- Reset: call `window.turnstile.reset(widgetId)` after a submission attempt resolves.

## Files touched
- New: `src/components/TurnstileWidget.tsx`
- New: `src/lib/turnstile.ts` (site key constant)
- New: `supabase/functions/verify-turnstile/index.ts`
- Edit: `src/pages/Contact.tsx`
- Edit: `src/pages/SchoolsOnePager.tsx`
- Edit: `supabase/functions/send-transactional-email/index.ts`

## After approval
I'll ask for the **Site Key** in chat and trigger the secure prompt for `TURNSTILE_SECRET_KEY`. Once both are in, I'll ship the code and the edge functions deploy automatically.
