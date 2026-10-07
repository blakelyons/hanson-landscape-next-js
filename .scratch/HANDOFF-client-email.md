# Handoff: help Blake write the "what we need from you" email to Hanson Landscape

Paste this file into Claude Co-work. Goal: draft one clear, friendly email from Blake Lyons (freelance web designer/developer) to the owner(s) of Hanson Landscape, listing what Blake needs from them to finish and launch the new hansonlandscape.com.

## Context
- Blake rebuilt hansonlandscape.com (old site: WordPress, last updated ~2017-2020) as a new Next.js site. Design and code are done; the site is in final QA. Launch is blocked mainly on content and confirmations only the client can provide.
- The client is a Chicagoland landscaping company: residential design/construction, commercial maintenance/enhancement/construction, and snow & ice management. Phone (630) 556-4120, info@hansonlandscape.com.
- The reader is a busy small-business owner, not technical. They have not seen a punch list yet. Assume they have seen the design mockups at some point.
- Tone: warm, direct, professional, not salesy. Short. No jargon (say "web address" not "canonical URL"; "photos" not "assets").
- Blake decides send timing and any deadline. Leave a `[DATE]` placeholder for the "please reply by" date; do not invent one.

## What to ask for (group these; keep each ask one line plus a clarifier)

### 1. Please confirm (quick yes/no, ~5 minutes)
- Business address to show on the site and Google (old records suggest "Hanson Landscape Inc, Big Rock, IL" — ask them to confirm the exact street address, or whether to show only the service area "Chicagoland").
- Business hours (office hours, plus winter/snow emergency availability if relevant).
- These statements on the About page are accurate: "started in 2001 with a single truck", "25+ years of craftsmanship", "500+ projects delivered", "100% satisfaction rating", "CAMME Award winner" / "3x CAMME award".
- Facebook / Instagram / LinkedIn / other social links to include (or confirm none).
- Who should receive website inquiries (name + email), and whether they want inquiries copied to a second person.

### 2. Please send (biggest item: real projects for the Portfolio)
- 6-12 favorite completed projects. For each: a project name or label (e.g. "Naperville backyard patio"), town, approximate year, residential or commercial, what Hanson did (design, patio, retaining wall, water feature, lighting, maintenance...), a sentence or two on the challenge and result, and 4-8 good photos (original files, not screenshots, ideally 2000px wide or larger).
- Optional: a short quote from the customer for each project.
- A few good photos for each service (design, construction, maintenance, enhancement, snow & ice). Crew/equipment/working shots are fine.
- Current logos (high resolution) for their partner and certification badges: Unilock, Belgard, Aquascape, Easy Pro Pond Products, Unique Lighting, ILCA, NFIB, and SIMA (Snow & Ice Management Association; the only version on the old site is an expired 2016 certificate). Ask them to confirm each brand still allows the logo to be displayed.

### 3. Please review and approve
- Footer "Our Mission" text. Current draft: "Outdoor spaces deserve the same care as the homes and buildings they surround. We design, build and maintain landscapes across Chicagoland, with hands-on attention from first sketch to year-round care."
- Privacy Policy draft (Blake will attach or link it). Suggest the owner skim it and, if they have a lawyer or insurance advisor, have them look at it.
- Testimonials: the 11 testimonials on the old site were carried over word for word. Ask if any should be removed, and whether they have newer ones.

### 4. One decision: the old blog
- The old site has about 30 posts, nearly all from 2013-2014 (seasonal checklists, mowing tips, award news, snow removal stats). Options for the client: (a) keep them all as an archive (already done, nothing needed), (b) keep a few and remove the rest, (c) have Blake refresh/replace some with current articles. Ask which they prefer. Default if no answer: keep as is.

### 5. Heads up: email setup (do not make this a big ask)
- Website contact-form submissions will arrive by email. Blake is testing with his own address; for launch he needs the answer to "who receives inquiries" (see section 1) and, later, access to add one DNS record for hansonlandscape.com so the emails come from their domain. Mention it briefly as "coming soon, I'll walk you through it", not as something to do now. (Do not ask them for passwords or DNS logins in this email.)

## Format guidance for the draft
- Subject line suggestion: "Hanson Landscape website: a few things I need from you before launch".
- Open with one sentence of good news (the new site is built and ready for final content), then say how long this should take (confirmations ~5 minutes; photos/projects can follow in a few days).
- Use short numbered or bulleted sections matching the four groups above, with the quick confirmations first so they can answer from their phone.
- Make replying easy: tell them they can answer in the email body, and photos can be sent by shared folder link (Google Drive/Dropbox/WeTransfer) rather than attachments.
- End with the `[DATE]` placeholder for a reply-by date and an offer to hop on a 15-minute call.
- Keep the whole email under ~400 words if possible; offer an optional longer "checklist" attachment/appendix for the project details instead of cramming them into the body.
- Produce two versions: (1) the email itself, (2) an optional one-page checklist (plain text or doc) the client can fill in per project.

## Do not
- Do not promise a launch date.
- Do not invent facts about the business, awards or projects. Use only the quoted statements above.
- Do not mention internal tooling (Next.js, Resend, Formstack, JSON-LD, etc.).
- Do not include Blake's phone/email signature details unless Blake supplies them; use `[SIGNATURE]`.

## Reference files in the repo (for Blake, not the client)
- `.scratch/NEXT-STEPS.md` — full launch checklist
- `.scratch/PAGES-CHECKLIST.md` — page migration status
- `src/content/projects.ts` — placeholder portfolio data awaiting real projects
