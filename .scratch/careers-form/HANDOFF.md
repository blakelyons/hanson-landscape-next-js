Status: ready-for-agent

# Careers application form + SparkPost mail sender

Handoff for Claude Code. Repo: `hanson-landscape-static-html` (Next.js 16, App Router, Tailwind, Vitest).

## Read first

- `AGENTS.md`: this is a newer Next.js than your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing route handlers or server code.
- `CLAUDE.md`: use canonical Tailwind scale classes (not `[px]`), follow `CONTEXT.md` vocabulary, run typecheck/lint/tests, and **do not launch a browser to verify UI**. Blake tests visually himself.
- Existing pattern to mirror: `src/components/contact/contact-form.tsx`, `src/app/api/contact/route.ts`, `src/lib/contact-email.ts`, `src/lib/contact-email.test.ts`.

## Goal

1. Add a careers application form to `/careers` that emails the submission (with an optional resume) to a **separate** hiring inbox.
2. Move email sending from Resend to **SparkPost** (Blake's existing account), behind one shared mailer used by both the contact form and the careers form.

## Decisions already made (do not re-ask)

- Provider: SparkPost. Contact form and careers form each have their own recipient address.
- Resume upload is **optional**. No "position of interest" dropdown.
- Same spam protections as the contact form: honeypot field, per-IP rate limit, attachment validation.

## Assumptions to confirm with Blake before merging (do not block coding on them)

- The SparkPost account belongs to Global Power Construction, a separate company with the same owners as Hanson. Confirm Hanson is OK sending through it, and whether to use a SparkPost subaccount so Hanson's sending reputation and logs stay separate.
- `hansonlandscape.com` must be verified as a sending domain in that account (Blake does this; see "Blake's manual steps").
- Verify the SparkPost request shape against current SparkPost docs before finalizing. The company is now under Bird, and endpoint/auth details may have changed. As I understand it: `POST {API_URL}/api/v1/transmissions`, `Authorization: <api key>` (no `Bearer`), JSON body with `recipients`, `content.from`, `content.subject`, `content.text`, `content.html`, `content.reply_to`, and `content.attachments[] = { name, type, data(base64) }`. US base URL is `https://api.sparkpost.com`, EU is `https://api.eu.sparkpost.com`. Also confirm the total transmission size limit leaves room for a 10 MB attachment after base64 (about 13.4 MB).

## Part A: shared mailer (SparkPost)

- Create `src/lib/send-email.ts` exporting `sendEmail({ to, from, replyTo, subject, text, html, attachments })`. Move the logic out of `src/app/api/contact/route.ts` (`sendEmail` and the `Attachment` type).
- Implement it against the SparkPost Transmissions API. Mark the transmission transactional.
- Keep the existing dev behavior: with no API key and `NODE_ENV !== "production"`, log what would be sent and return. In production with no key, throw.
- Extract the in-memory rate limiter from the contact route into `src/lib/rate-limit.ts` (take a key and limits, return boolean) so both routes reuse it. Each route keeps its own bucket. Keep the existing limits (5 per 10 minutes).
- Refactor `/api/contact` to use the shared pieces. Behavior must not change.
- Remove the Resend-specific code and comments.

Env vars (server-only, never `NEXT_PUBLIC_`):

| Var | Purpose |
| --- | --- |
| `SPARKPOST_API_KEY` | Key with transmissions-write permission only |
| `SPARKPOST_API_URL` | Optional; defaults to the US base URL |
| `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Existing, unchanged |
| `CAREERS_TO_EMAIL` | New: hiring inbox |
| `CAREERS_FROM_EMAIL` | New: optional, falls back to `CONTACT_FROM_EMAIL` |

Update `.env.example` (remove the Resend block and comments) and leave `.env.local` untouched.

## Part B: careers form

Files to add (names are suggestions; match local conventions):

- `src/components/careers/careers-form.tsx`: client component modeled on `ContactForm` (same status states, success/error messaging, honeypot, `FIELD_CLASS` styling, `InputText`/`Textarea`/`Label` from `src/components/ui/form-elements.tsx`). Reuse shared pieces where it is cheap, but do not over-abstract `ContactForm`.
- `src/app/api/careers/route.ts`: POST, multipart or JSON, same flow as the contact route: rate limit, honeypot (silent success), validate, check attachment, build email, send, return `{ ok: true }` or `{ error }`.
- `src/lib/careers-email.ts` plus `src/lib/careers-email.test.ts`: pure validation and email-building helpers, mirroring `contact-email.ts` and its tests (valid, missing fields, over-length, bad email, header injection in subject, HTML escaping, attachment type and size).

Fields:

| Field | Required | Notes |
| --- | --- | --- |
| Name | yes | max 100 chars |
| Email | yes | same pattern as contact |
| Phone | no | max 40 chars |
| Message | yes | "Tell us about yourself and what you're looking for", max 5,000 chars |
| Resume | no | pdf, doc, docx only; 10 MB max (reuse `MAX_ATTACHMENT_BYTES`; do not reuse the contact form's wider image allow-list) |

Email: subject like `New employment inquiry: <name>` (strip CR/LF, cap 200). Send to `CAREERS_TO_EMAIL`, `reply_to` the applicant. Escape all user input in the HTML body. Include "Resume attached: yes/no" in the body.

Page changes in `src/app/careers/page.tsx`:

- Keep the hero, the "We don't post open positions online" copy, and the metadata (update the description to mention applying online).
- Replace the "How to apply" box with the form in the same card style. Keep the phone number as a secondary option; drop the "Email Your Resume" mailto button.
- Success copy: "Thanks, we received your application." plus a one-line follow-up message (confirm wording with Blake).
- Do not change the `/career-oppurtonities` redirect in `next.config.ts`.

## Docs and housekeeping

- `src/app/privacy-policy/page.tsx`: it currently names Resend. Update to the real provider and add a sentence that job applications (including resumes) are emailed to Hanson and used only for hiring. Flag as draft pending client/legal review.
- Update `README.md`, `DEPLOYMENT.md` env sections, `.scratch/NEXT-STEPS.md` section 5, and `.scratch/services-pages/LINKS-TODO.md` to say SparkPost instead of Resend.
- Tests: add the new unit tests; keep all 71 existing tests passing. Run typecheck, lint, `npm test`, and `npm run build:local`.

## Acceptance criteria

- Contact form still works end to end through the shared mailer, delivered to `CONTACT_TO_EMAIL`.
- Careers form delivers to `CAREERS_TO_EMAIL` with and without a resume; disallowed file types and files over 10 MB are rejected with a clear message.
- Honeypot and rate limiting work on both routes.
- No provider API key is ever exposed to the client bundle.
- Dev with no key logs the email instead of sending.
- No Resend references remain in code, env example, or docs.

## Blake's manual steps (not for Claude Code)

1. In SparkPost, add and verify `hansonlandscape.com` as a sending domain. SparkPost will give you DNS records to add at **GoDaddy** (DKIM TXT, and possibly a bounce/tracking CNAME).
2. **SPF gotcha:** if `hansonlandscape.com` already has an SPF TXT record (likely, if `info@` mail runs on Google Workspace or Microsoft 365), do **not** add a second one. Merge SparkPost's include into the existing record. Two SPF records break SPF for the domain.
3. Create an API key with transmissions-write only; set it in the droplet's env, not in the repo.
4. Set `CONTACT_TO_EMAIL`, `CAREERS_TO_EMAIL`, and the From addresses (for example `website@hansonlandscape.com`) in the server env.
5. Send a real test submission from each form, confirm delivery, and check spam placement.
6. Get the client's real hiring address for `CAREERS_TO_EMAIL`.
