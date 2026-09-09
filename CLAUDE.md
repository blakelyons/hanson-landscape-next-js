@AGENTS.md

## Agent skills

### Issue tracker

Local markdown under `.scratch/` — one directory per feature. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`) — unchanged from skill defaults. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — one `CONTEXT.md` + `docs/adr/` at this repo's root (created lazily, not upfront). See `docs/agents/domain.md`.

## Visual testing

Blake does visual/browser testing himself (dev server, scrolling, devtools) to save tokens. Don't launch Chrome/browser tools to verify UI or animation changes unless he explicitly asks for it — implement, run typecheck/lint/tests, and hand off for him to check visually.

## Tailwind classes

Always use Tailwind's canonical spacing-scale class over an arbitrary `[px]` value when one exists (e.g. `h-28.5` not `h-[114px]`, `top-3.25` not `top-[13px]`). This is what the `tailwindcss(suggestCanonicalClasses)` editor hint is flagging — treat it as a required fix, not a suggestion. Only fall back to `[px]` when no canonical class matches (e.g. `rounded-[39px]`, which isn't on the radius scale).
