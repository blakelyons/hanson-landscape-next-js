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

## Still open
- Header nav has no Blog link (design has none); footer + site map only
- Unused temp components (`temp-portfolio-bento.tsx`, `why-choose-us-section-temp.tsx`): not imported anywhere; "View Project" link left as `#`. Delete?

## Contact form open items
- Set FORMSTACK_API_KEY + FORMSTACK_CONTACT_FORM_ID; map field names (name, email, phone, service, message) to real Formstack field IDs in app/api/contact/route.ts
- "Attach File" uploads are dropped by the API route until Formstack has a file field
