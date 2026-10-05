Status: reference

# Links still to wire

## Wired
- Nav dropdown/mobile drawer: hubs + all 6 service pages; Contact Us -> /contact
- Footer: About, Portfolio, hub headings, all 6 services, email mailto
- Homepage: service cards, View Our Work, Start Your Project, hub buttons, CTA section (quote -> /contact, call -> tel), process "Get In Touch"
- Service pages: quote button -> /contact?service={slug} (preselects dropdown); hubs -> /contact

## Wired (pages pass)
- Testimonials, Careers, Privacy Policy, Site Map: header nav + footer

## Wired (final pass)
- Why Choose Us "Discover More" -> /about
- Homepage consultation form now uses ContactForm (-> /api/contact)
- Homepage testimonials now use the real ones
- Footer Blog link

## Wired
- Blog: sub-nav under About (desktop hover dropdown with About Us + Blog; mobile indented link). Also footer + site map.
- Temp components deleted.

## Still open
- Nothing link-related.

## Contact form (email via Resend; Formstack dropped)
- Done: /api/contact validates, honeypot, rate limit, attachments (10 MB, pdf/jpg/png/webp/heic/doc/docx), emails CONTACT_TO_EMAIL with Reply-To = visitor
- TODO to go live: create Resend account (use blake@blakelyons.com), set RESEND_API_KEY in .env.local / server env
- TODO at launch: verify hansonlandscape.com in Resend, set CONTACT_FROM_EMAIL to e.g. website@hansonlandscape.com, set CONTACT_TO_EMAIL to Hanson's inbox
- Optional: Cloudflare Turnstile if spam appears
