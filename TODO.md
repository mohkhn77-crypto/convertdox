# ConvertDox — Project Tracker

Last updated: June 2026

---

## 🔴 P1 — This Week (Critical)

### Visibility & SEO
- [ ] Add Blog link to navigation header
- [ ] Add Blog link to footer
- [ ] Update OG image (replace "85+" with "196+" or remove count)
- [ ] Request indexing in Search Console for top 10 URLs
- [ ] Submit to AlternativeTo (as iLovePDF alternative)
- [ ] Submit to BetaList

### Content
- [ ] Publish blog post #2 (Compress PDF guide)
- [ ] Update homepage to show latest blog posts

---

## 🟡 P2 — This Month

### Marketing
- [ ] Build Reddit comment karma (50+ comments in r/SideProject etc.)
- [ ] Post on Indie Hackers (Show IH section)
- [ ] Submit to SaaSHub, StartupBase, StackShare
- [ ] Schedule Product Hunt launch (1-2 weeks out)
- [ ] Set up Twitter account for ConvertDox

### Content
- [ ] Write blog post #3 (Merge PDFs guide — 80K monthly searches)
- [ ] Write blog post #4 (AI Writing Tools comparison)
- [ ] Write blog post #5 (Image compression guide)

### Site Improvements
- [ ] Add "Related Tools" section to all 196 tool pages
- [ ] Verify support@convertdox.com is shown on Contact/About/Footer
- [ ] Update Privacy Policy with current date
- [ ] Update Terms of Service with current date

---

## 🟢 P3 — When Time Allows

### Features (Building)
- [ ] PDF Editor — fix worker loading issue
- [ ] PDF Editor — Phase 3 (Delete Pages + Extract Pages)
- [ ] PDF Editor — Phase 4 (Reorder + Rotate + Merge + Page Counter)
- [ ] Dark theme — apply to /preview-dark route (Burgundy Variant A)
- [ ] Dark theme — rollout to homepage if approved

### Tools Roadmap
- [ ] PDF to Excel — integrate Python+Tabula OR paid API (when traffic justifies)
- [ ] Audio conversion tools (FFmpeg integration)
- [ ] Video conversion tools (FFmpeg integration)
- [ ] Background remover (remove.bg API or self-hosted rembg)

### Business
- [ ] AdSense — wait for approval decision
- [ ] If approved: implement ads.txt + ad placements
- [ ] If rejected: address feedback and reapply
- [ ] Plan Pro tier ($3-5/month) for premium features
- [ ] LLC formation when revenue hits $500/month

---

## ✅ Completed

### Infrastructure
- [x] Built 196 free tools
- [x] Frontend deployed to Vercel (Next.js 16)
- [x] Backend deployed to Railway (Express + Docker)
- [x] Domain configured at convertdox.com
- [x] Apex domain switch (was www, now apex)
- [x] Email setup: support@convertdox.com via Zoho Free
- [x] Cloudflare DNS configured with SPF, DKIM, MX records
- [x] Privacy Policy and Terms of Service pages
- [x] Google Search Console verified
- [x] Sitemap submitted (204 URLs)
- [x] Custom favicon
- [x] Google Analytics setup (verify if missing)

### Features
- [x] PDF to Word conversion (LibreOffice fix)
- [x] PDF to Excel — "Coming Soon" honest message
- [x] 196 working tools across PDF, Image, AI, Calculators, Documents, Developer
- [x] Backend cleanup utility (auto-delete files after 1 hour)
- [x] Reusable PDF Editor component built (Phase 1+2, worker fix pending)
- [x] Backend endpoints for PDF editor (6 endpoints)
- [x] Sessions with 1-hour auto-cleanup

### Content
- [x] Blog infrastructure (MDX-based at /blog)
- [x] Blog post #1 published: HEIC to JPG guide
- [x] Sitemap auto-includes blog posts

### Bug Fixes
- [x] LibreOffice format filters installed
- [x] OPENAI_API_KEY restored to Railway
- [x] Vercel apex domain switch
- [x] Zoho Email DNS configured (MX, SPF, DKIM)
- [x] Fixed website downtime from Zoho auto-config
- [x] PDF Editor worker fix attempts (Phase 1 backend done)

---

## 🐛 Known Issues

### Currently Broken
- [ ] PDF Editor: pdf.worker.min.mjs loading SyntaxError ("Cannot use 'import.meta' outside a module")
- [ ] PDF to Excel: Honest "Coming Soon" but not actually working
- [ ] Safari users may see DNS caching issue (resolved by browser restart)

### Pending Investigation
- [ ] Some tools may have minor UI bugs on mobile
- [ ] OG image still shows "85" — needs regeneration

### Recently Resolved
- [x] PDF to Word — fixed with `--infilter="writer_pdf_import"` flag
- [x] Email working — Zoho configured successfully
- [x] Website downtime — DNS records restored
- [x] AdSense application — submitted for review

---

## 📊 Metrics Dashboard

### Current State (as of June 2026)
- **Indexed pages:** 9/204 (4.4%)
- **Blog posts published:** 1
- **Backlinks:** 0
- **Monthly visitors:** Very low (~10-30/month estimate)
- **Email setup:** support@convertdox.com (Zoho)
- **AdSense:** Pending review
- **Infrastructure cost:** ~$11/month total

### 30-Day Targets
- **Indexed pages:** 50+
- **Blog posts:** 5
- **Backlinks:** 10-15
- **Monthly visitors:** 500-1500
- **AdSense:** Approved or final feedback
- **Domain authority:** 8-15

---

## 💡 Ideas / Future

- Add user testimonials section once we have some
- Build a "Tools Comparison" feature (vs iLovePDF, SmallPDF)
- Add keyboard shortcuts for power users
- API access for developers
- Browser extension for one-click tools
- Mobile app version
- Whitelabel option for businesses
- More AI tools as OpenAI gets cheaper

---

## 📝 Notes

### Tech Stack Reminders
- Frontend: Next.js 16 + TypeScript + inline styles on Vercel
- Backend: Node.js + Express + TypeScript + Docker on Railway
- DNS: Cloudflare (apex primary)
- Email: Zoho Free
- Brand: Navy #0F2A4A, Orange #E85D04

### Workflow Patterns
- Diagnose BEFORE fixing (always check what's actually broken)
- Use Claude Code for complex multi-file changes
- Use Codex for boilerplate/repetitive tasks
- Use manual VS Code for tiny edits
- Save key conversation summaries for context

### Don't Forget
- ALL tool pages need "Related Tools" section (saved in Claude memory)
- LibreOffice PDF conversions need `--infilter="writer_pdf_import"` flag
- For Vercel + Cloudflare: keep ALL records as "DNS only" (gray cloud)
- Custom favicon at /public/favicon.ico (delete src/app/favicon.ico if conflicts)

---

## Background Remover (bg-remove) — future improvement

Current state: working, using @imgly/background-removal (client-side, runs in the
browser, free, private — nothing uploaded). Output is a transparent PNG.

Limitation: browser-based model quality is good for clear subject/simple background,
but weaker on fine details (hair wisps, busy backgrounds) vs. paid services.

Future options to explore when revenue allows or quality becomes a priority:
- AI/API-based removal (e.g. remove.bg, Photoroom, Cloudinary) — higher quality but
  costs per image; only viable once the tool generates revenue.
- Self-hosted rembg (Python service) — free per image but needs separate service +
  more RAM than the current Node/Railway setup.
- Newer/larger client-side models if @imgly or alternatives improve.

Related: this tool also feeds the Passport Photo Editor's planned Phase 3
(replace busy background with passport-compliant white/grey background).

Build notes (so we don't re-debug): the library is browser-only. It MUST be
dynamically imported inside the handler, AND listed in serverExternalPackages in
next.config.ts (alongside pdfjs-dist), or Vercel's build fails with "Module not found".