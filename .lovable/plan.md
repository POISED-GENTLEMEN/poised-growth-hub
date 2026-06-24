# Patch high-severity dependency advisories

Three transitive vulnerabilities flagged by the supply-chain scanner. Fix by bumping the direct parents to versions that pull in patched transitives.

## Changes

1. **@supabase/supabase-js** — bump from `2.81.1` to latest `2.x` (pulls in patched `ws` ≥ 8.17.1, addressing GHSA-96hv-2xvq-fx4p).
2. **react-router-dom** — bump from `6.30.1` to latest `6.x` patch (pulls in patched `@remix-run/router`, addressing GHSA-2w69-qvjg-hvjx). Stay on v6 to avoid the v7 breaking changes across the routing in `src/App.tsx` and `src/lib/redirects.ts`.
3. **recharts** — bump from `2.15.4` to the latest `2.x` that no longer depends on vulnerable `lodash` (addressing GHSA-r5fr-rjxr-66jc). If no `2.x` release drops the bad lodash, fall back to adding an `overrides` entry in `package.json` forcing `lodash` ≥ 4.17.21 patched line.

## Steps

1. Run `bun add @supabase/supabase-js@latest react-router-dom@^6 recharts@latest` (single command, lockfile updates auto-restart dev server).
2. Re-run `code--dependency_scan` to confirm the three advisories clear.
3. Smoke-check the preview: home route renders, a Codex article route resolves (router), Supabase client still imports, any Recharts usage still mounts (`src/components/ui/chart.tsx`).
4. Call `security--manage_security_finding` → `mark_as_fixed` for `vulnerable_dependencies_high` with a note listing the new versions.

## Out of scope

- No code changes in `src/`. All three upgrades are within the current major, so no API migration is expected.
- No `react-router-dom` v7 migration.
- No security-memory update (this is a fix, not an accepted risk).

## Risk

Low. All bumps stay within the current major. If `recharts` lacks a clean lodash-patched release on v2, the `overrides` fallback is a one-line `package.json` change with no source impact.
