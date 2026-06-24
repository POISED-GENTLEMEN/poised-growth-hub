## Goal
Replace `WITH CHECK (true)` on the two public lead-capture tables with column-shape validation, as defense-in-depth against malformed/abusive anon inserts. No change to who can insert (still `anon, authenticated`); no change to SELECT/UPDATE/DELETE (still denied for non-service_role).

## Migration

Drop and recreate the INSERT policies on `public.contact_submissions` and `public.email_submissions` with stricter `WITH CHECK` predicates.

### `public.contact_submissions`

New INSERT policy `WITH CHECK`:
- `email` matches a basic email regex AND `length(email) BETWEEN 3 AND 255`
- `name` is non-empty after trim AND `length(name) <= 100`
- `segment` is non-empty AND `length(segment) <= 50`
- `phone IS NULL OR length(phone) <= 40`
- `details IS NULL OR jsonb_typeof(details) = 'object'`
- `pg_column_size(details) <= 8192` (cap JSON blob size)

### `public.email_submissions`

New INSERT policy `WITH CHECK`:
- `email` matches a basic email regex AND `length(email) BETWEEN 3 AND 255`
- `category` non-empty AND `length(category) <= 50`
- `first_name IS NULL OR length(first_name) <= 100`
- `source IS NULL OR length(source) <= 100`

Email regex used: `^[^@\s]+@[^@\s]+\.[^@\s]+$` (cheap shape check, not full RFC).

## Out of scope
- Rate limiting (RLS can't do this; would need an edge function or Cloudflare).
- Changing roles or any other policies.
- Touching `send-transactional-email` (already sanitizes inputs).

## After migration
- Re-run the Supabase linter; the two `SUPA_rls_policy_always_true` warnings should clear since `WITH CHECK` is no longer `true`.
- Update `@security-memory` to reflect the new hardened policies.

## Risk
If the regex or length caps reject a legitimate submission shape currently in use, inserts will start failing. Current callers (contact + newsletter forms) send standard fields well within these caps, so impact should be nil — but worth flagging.
