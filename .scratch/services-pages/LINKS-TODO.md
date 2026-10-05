Status: reference

# Links still to wire

## Wired
- Nav dropdown/mobile drawer: hubs + all 6 service pages; Contact Us -> /contact
- Footer: About, Portfolio, hub headings, all 6 services, email mailto
- Homepage: service cards, View Our Work, Start Your Project, hub buttons, CTA section (quote -> /contact, call -> tel), process "Get In Touch"
- Service pages: quote button -> /contact?service={slug} (preselects dropdown); hubs -> /contact

## Wired (pages pass)
- Testimonials, Careers, Privacy Policy, Site Map: header nav + footer

## Still open
- Why Choose Us "Discover More" (decide target, likely /about)
- Homepage "temp-portfolio-bento" "View Project" (temp component)
- Homepage ConsultationSection form: not wired to /api/contact; reuse ContactForm or link to /contact
- Homepage testimonials still use placeholder "Sarah M." x3; swap for CLIENT_TESTIMONIALS (and fix testimonials-section tests)

## Contact form open items
- Set FORMSTACK_API_KEY + FORMSTACK_CONTACT_FORM_ID; map field names (name, email, phone, service, message) to real Formstack field IDs in app/api/contact/route.ts
- "Attach File" uploads are dropped by the API route until Formstack has a file field
