# CONVERTDOX — COMPLETE PROJECT CONTEXT FOR CODEX

You are helping build ConvertDox, an online tools SaaS platform with 184+ free tools. Use this document as the source of truth for all coding decisions. When in doubt, follow these patterns exactly.

═══════════════════════════════════════════════════════════════
SECTION 1 — PROJECT OVERVIEW
═══════════════════════════════════════════════════════════════

NAME: ConvertDox
DOMAIN: convertdox.com
TAGLINE: "Every Online Tool You Need"
TYPE: Free online tools platform (PDF, image, AI, calculators, documents, developer tools)
LAUNCHED: 2026
USER MODEL: Free for everyone, no signup required, no accounts
MONETIZATION: Google AdSense (pending approval), future Pro tier planned

CURRENT STATS:
- Total tools: 184+
- Categories: 8 (PDF, Image, AI, Documents, Calculators, Developer, Text, Utility)
- Stack: Next.js 14 + TypeScript + Tailwind (frontend), Node.js + Express + TypeScript (backend)
- Hosting: Vercel (frontend), Railway Docker (backend)
- DNS: Cloudflare

═══════════════════════════════════════════════════════════════
SECTION 2 — REPOSITORY STRUCTURE
═══════════════════════════════════════════════════════════════

TWO SEPARATE REPOS:

1. FRONTEND: ~/Desktop/convertdox
   GitHub: github.com/mohkhn77-crypto/convertdox
   Deploy: Auto-deploys to Vercel on push to main
   
2. BACKEND: ~/Desktop/convertdox-backend
   GitHub: github.com/mohkhn77-crypto/convertdox-backend
   Deploy: Auto-deploys to Railway on push to main

ALWAYS check `pwd` before running git commands — easy to confuse the two.

FRONTEND FILE STRUCTURE:
~/Desktop/convertdox/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with Nav + Footer
│   │   ├── page.tsx                # Homepage with TOOLS array
│   │   ├── [tool-name]/
│   │   │   ├── page.tsx            # Each tool gets a folder
│   │   │   └── layout.tsx          # For 'use client' tools needing metadata
│   │   ├── all-tools/page.tsx      # Tool directory
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms-of-service/page.tsx
│   │   ├── cookie-policy/page.tsx
│   │   └── disclaimer/page.tsx
│   ├── components/
│   │   ├── Nav.tsx                 # Top navigation with dropdowns
│   │   ├── Footer.tsx              # Site-wide footer
│   │   ├── LegalPage.tsx           # Reusable legal page renderer
│   │   ├── LegalNoticeHigh.tsx     # High-risk tool warnings
│   │   ├── LegalNoticeMedium.tsx   # Medium-risk tool warnings
│   │   ├── LegalFooter.tsx         # Footer for legal pages
│   │   └── CookieBanner.tsx        # Cookie consent banner
│   └── data/
│       ├── privacy-policy.html     # Legal HTML content
│       ├── terms-of-service.html
│       ├── cookie-policy.html
│       └── disclaimer.html
├── public/
│   ├── logo.png                    # 512x512 main logo
│   ├── favicon.ico
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── apple-icon.png
│   ├── og-image.png                # Social sharing image
│   ├── manifest.json
│   ├── sitemap.xml
│   └── robots.txt
└── package.json

BACKEND FILE STRUCTURE:
~/Desktop/convertdox-backend/
├── src/
│   ├── index.ts                    # Main Express server
│   ├── routes/
│   │   ├── pdf.ts                  # PDF endpoints
│   │   ├── image.ts                # Image endpoints
│   │   ├── ai.ts                   # AI endpoints (OpenAI)
│   │   ├── documents.ts            # Document generators
│   │   ├── ocr.ts                  # OCR endpoints
│   │   ├── specialty.ts            # Specialty tools
│   │   └── utility.ts              # Utility tools
│   └── utils/
│       ├── cleanup.ts              # File cleanup utility
│       └── files.ts                # File handling helpers
├── tmp/                            # Auto-cleaned every 30 min
├── Dockerfile
└── package.json

═══════════════════════════════════════════════════════════════
SECTION 3 — BRAND & DESIGN SYSTEM
═══════════════════════════════════════════════════════════════

COLORS (USE THESE EXACTLY — NEVER DEVIATE):
- Navy (primary):       #0F2A4A      Used for: headings, text, dark surfaces
- Navy Light:           #1a3a5c      Used for: secondary navy elements
- Orange (accent):      #E85D04      Used for: CTAs, buttons, links, brand highlights
- Orange Light:         #F48C42      Used for: hover states, secondary accents
- Orange Hover:         #D14F00      Used for: button hover state
- White:                #FFFFFF
- Background Light:     #f8fafc      Used for: page backgrounds
- Background Card:      #FFFFFF      Used for: card backgrounds
- Border Light:         #e2e8f0      Used for: subtle borders
- Text Primary:         #0F2A4A
- Text Secondary:       #64748b      Used for: descriptions, captions
- Text Body:            #334155      Used for: paragraph body text
- Error:                #DC2626      Background: #FEF2F2, Border: #FECACA
- Success:              #166534      Background: #F0FDF4, Border: #BBF7D0
- Info:                 #1E40AF      Background: #EFF6FF, Border: #BFDBFE

TYPOGRAPHY:
- Primary font: System font stack
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif
- Font weights used: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)
- Letter spacing: Default, except headings can use 0.5px for caps

FONT SIZES (standard scale):
- H1: 36-48px, weight 800
- H2: 24-32px, weight 700
- H3: 18-22px, weight 700
- H4: 16-18px, weight 700
- Body: 15-16px, weight 400-500
- Small: 13-14px
- Tiny: 11-12px

SPACING:
- Use multiples of 4: 4, 8, 12, 16, 20, 24, 32, 40, 48, 60, 80, 100
- Page padding: 40px 20px
- Section gap: 32-48px
- Card padding: 24-40px

BORDER RADIUS:
- Buttons: 10px
- Cards: 12-16px
- Inputs: 8-10px
- Pills/badges: 999px
- Large cards: 16-20px

SHADOWS:
- Card subtle: 0 1px 3px rgba(0,0,0,0.05)
- Card hover: 0 4px 20px rgba(15,42,74,0.08)
- Button: none (use color difference instead)

LOGO:
- Visual: Two overlapping rounded rectangles (white doc + orange doc)
- Container: Navy rounded square
- Text logo: "Convert" in navy/white + "Dox" in orange
- File: /public/logo.png (512x512)

═══════════════════════════════════════════════════════════════
SECTION 4 — CODE PATTERNS & CONVENTIONS
═══════════════════════════════════════════════════════════════

TYPESCRIPT RULES:
- ALWAYS use TypeScript, never plain JavaScript
- Use `error: unknown` in catch blocks, NEVER `error: any`
- Define interfaces for objects with 3+ properties
- Use type imports: `import type { Metadata } from 'next'`
- Strict mode is enabled

ERROR HANDLING PATTERN:
```typescript
try {
  // operation
} catch (error: unknown) {
  const msg = error instanceof Error ? error.message : 'Unknown error'
  console.error('[context] Error:', msg)
  // handle or return error
}
```

CLIENT VS SERVER COMPONENTS:
- Static pages → Server components (no 'use client')
- Pages with forms/state/onClick → Client components ('use client')
- Pages needing BOTH metadata AND state → Use layout.tsx for metadata
- Always export metadata from server components

REACT/JSX PATTERNS:
- Functional components only, no classes
- Use named exports for components: `export default function Name() {}`
- Use TypeScript interfaces for props
- Always type useState: `useState<string>('')` or `useState<number>(0)`
- camelCase for SVG attributes (not kebab-case): viewBox not view-box

STYLING APPROACH:
- USE INLINE STYLES with brand colors (matches existing pattern)
- Style objects can be extracted as constants for reuse
- Use Tailwind only when explicitly added (mostly avoid)
- NO CSS modules, NO styled-components

EXAMPLE INLINE STYLE PATTERN:
```tsx
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  border: '1.5px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '14px',
  fontFamily: 'inherit',
  outline: 'none'
}

<input style={inputStyle} />
```

═══════════════════════════════════════════════════════════════
SECTION 5 — STANDARD TOOL PAGE TEMPLATE
═══════════════════════════════════════════════════════════════

Every new tool page should follow this exact structure:

```tsx
'use client'  // Only if interactive
import { useState } from 'react'

export default function ToolName() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  async function handleProcess() {
    if (!input) {
      setError('Please enter input')
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/[category]/[endpoint]`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
      })
      
      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.error || 'Failed')
      }
      
      const data = await res.json()
      setResult(data.result)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F2A4A', marginBottom: '8px' }}>
            Tool Name
          </h1>
          <p style={{ fontSize: '16px', color: '#64748b' }}>
            Tool description.
          </p>
        </div>
        
        {/* Main form */}
        <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          
          {/* Input fields go here */}
          
          {error && (
            <div style={{ marginTop: '16px', padding: '12px', background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: '8px', color: '#DC2626' }}>
              {error}
            </div>
          )}
          
          <button 
            onClick={handleProcess} 
            disabled={loading} 
            style={{ 
              width: '100%', 
              marginTop: '24px', 
              background: loading ? '#94a3b8' : '#E85D04', 
              color: 'white', 
              border: 'none', 
              padding: '16px', 
              borderRadius: '10px', 
              fontSize: '16px', 
              fontWeight: 700, 
              cursor: loading ? 'not-allowed' : 'pointer' 
            }}
          >
            {loading ? 'Processing...' : 'Action Button'}
          </button>
          
          {result && (
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>
                Result
              </h3>
              <div style={{ padding: '20px', background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: '10px' }}>
                {result}
              </div>
            </div>
          )}
        </div>
        
        {/* SEO content section */}
        <div style={{ marginTop: '48px', background: 'white', padding: '32px', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0F2A4A', marginBottom: '16px' }}>
            About This Tool
          </h2>
          <p style={{ color: '#334155', lineHeight: 1.7 }}>
            SEO content describing tool, use cases, benefits...
          </p>
        </div>
        
      </div>
    </div>
  )
}
```

═══════════════════════════════════════════════════════════════
SECTION 6 — SEO METADATA PATTERN
═══════════════════════════════════════════════════════════════

FOR SERVER COMPONENT PAGES (page.tsx at top):
```tsx
export const metadata = {
  title: 'Tool Name - Free Online [Action] | ConvertDox',
  description: 'Brief 150-char description with main keywords.',
  keywords: 'keyword1, keyword2, keyword3, keyword4, keyword5',
  alternates: { canonical: 'https://convertdox.com/tool-url' },
  robots: { index: true, follow: true }
}
```

FOR CLIENT COMPONENT PAGES (create layout.tsx):
```tsx
// File: src/app/tool-name/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tool Name - Free Online [Action] | ConvertDox',
  description: 'Brief 150-char description with main keywords.',
  keywords: 'keyword1, keyword2, keyword3, keyword4, keyword5',
  alternates: { canonical: 'https://convertdox.com/tool-url' },
  robots: { index: true, follow: true }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

SEO RULES:
- Title under 60 chars
- Description under 160 chars
- 5-8 keywords, comma-separated
- Always include "ConvertDox" in title
- Always include "Free" or "Online" in title
- Always set canonical URL
- Always set robots: index, follow

═══════════════════════════════════════════════════════════════
SECTION 7 — BACKEND API CONVENTIONS
═══════════════════════════════════════════════════════════════

BASE URL: https://convertdox-backend-production.up.railway.app
ENV VAR: NEXT_PUBLIC_BACKEND_URL (set in Vercel)

ENDPOINT STRUCTURE:
- POST /api/pdf/[action]          # PDF tools
- POST /api/image/[action]        # Image tools
- POST /api/ai/[action]           # AI tools (rate limited 20/day per IP)
- POST /api/documents/[action]    # Document generators
- POST /api/ocr/[action]          # OCR tools
- POST /api/specialty/[action]    # Specialty tools
- POST /api/utility/[action]      # Utility tools

REQUEST PATTERN:
- File uploads: multipart/form-data
- Data: application/json
- Always POST (never GET for processing)

RESPONSE PATTERN:
- Success: 200 with JSON body or file stream
- Error: 4xx/5xx with { error: 'message' }

FILE HANDLING:
- All uploaded files go to /tmp/
- Auto-deleted within 1 hour
- Periodic cleanup every 30 min
- Use cleanupFiles() utility from src/utils/cleanup.ts

OPENAI CONFIG (for AI tools):
- Model: gpt-4o-mini
- Max tokens: 500-2000 depending on tool
- Temperature: 0.7
- Rate limit: 20 requests/day per IP (express-rate-limit)
- API key in Railway env: OPENAI_API_KEY

═══════════════════════════════════════════════════════════════
SECTION 8 — TOOLS ARRAY ON HOMEPAGE
═══════════════════════════════════════════════════════════════

Located in: src/app/page.tsx

When adding a new tool, ADD an entry to the TOOLS array with this structure:

```tsx
{
  iconType: 'category',     // pdf, image, ai, document, calculator, developer, etc.
  title: 'Tool Name',
  desc: 'Brief one-line description',
  href: '/tool-url',
  cat: 'Category Name'      // PDF, Image, AI, Documents, Calculators, Developer
}
```

Categories used:
- PDF
- Image
- AI
- Documents
- Calculators
- Developer
- Text
- OCR
- Specialty
- Utility

═══════════════════════════════════════════════════════════════
SECTION 9 — SITEMAP MAINTENANCE
═══════════════════════════════════════════════════════════════

File: public/sitemap.xml

When adding ANY new page, add an entry:

```xml
<url>
  <loc>https://convertdox.com/tool-url</loc>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

Priority values:
- Homepage: 1.0
- Top-level pages (about, contact, all-tools): 0.9
- Tools: 0.8
- Legal pages: 0.5
- Blog posts: 0.7

═══════════════════════════════════════════════════════════════
SECTION 10 — CONTACT INFO (USE EVERYWHERE)
═══════════════════════════════════════════════════════════════

CONSISTENT CONTACT INFO (use these exact values):
- Business name: ConvertDox
- Email: support@convertdox.com
- Phone: (DO NOT INCLUDE — was removed for privacy)
- Address: (DO NOT INCLUDE — was removed for privacy)
- Location reference (if needed): "New Jersey, United States"
- Contact form: convertdox.com/contact

NEVER use:
- Personal email (mohkh.n77@gmail.com)
- Personal phone numbers
- Personal addresses
- Specific city/zip codes

═══════════════════════════════════════════════════════════════
SECTION 11 — LEGAL DOCUMENT REFERENCES
═══════════════════════════════════════════════════════════════

All 4 legal pages exist and work:
- /privacy-policy   (HTML in src/data/privacy-policy.html)
- /terms-of-service (HTML in src/data/terms-of-service.html)
- /cookie-policy    (HTML in src/data/cookie-policy.html)
- /disclaimer       (HTML in src/data/disclaimer.html)

Pattern: HTML files load via LegalPage component
DO NOT modify legal HTML files without explicit instruction
DO NOT add personal info to legal pages

═══════════════════════════════════════════════════════════════
SECTION 12 — DEPLOYMENT WORKFLOW
═══════════════════════════════════════════════════════════════

ALWAYS RUN BEFORE PUSHING:
```bash
npm run build
```

Fix all TypeScript errors before pushing.

FRONTEND DEPLOY:
```bash
cd ~/Desktop/convertdox
git add .
git commit -m "feat: descriptive message"
git push
```
Vercel auto-deploys in ~60 seconds.

BACKEND DEPLOY:
```bash
cd ~/Desktop/convertdox-backend
git add .
git commit -m "feat: descriptive message"
git push
```
Railway auto-deploys in 5-10 minutes.

COMMIT MESSAGE FORMAT:
- feat: new feature
- fix: bug fix
- docs: documentation
- style: formatting/UI changes
- refactor: code restructure
- perf: performance improvement

═══════════════════════════════════════════════════════════════
SECTION 13 — WHAT NOT TO DO
═══════════════════════════════════════════════════════════════

NEVER:
- Use `any` type in TypeScript (use `unknown`)
- Use kebab-case for SVG attributes (use camelCase)
- Hardcode API keys (use env vars)
- Modify legal HTML files without instruction
- Add personal contact info anywhere
- Use colors outside the brand palette
- Add user accounts/authentication (not needed yet)
- Add Stripe/payment (not yet)
- Add database (not needed currently)
- Store files permanently
- Skip the cleanup utility for file operations
- Mix server and client patterns incorrectly
- Remove existing tools without instruction
- Change brand colors
- Use Tailwind classes that don't exist (inline styles only)

═══════════════════════════════════════════════════════════════
SECTION 14 — COMMON TASKS QUICK REFERENCE
═══════════════════════════════════════════════════════════════

TASK: Add a new tool page
1. Create src/app/[tool-name]/page.tsx with template above
2. If 'use client', also create src/app/[tool-name]/layout.tsx with metadata
3. Add entry to TOOLS array in src/app/page.tsx
4. Add URL to public/sitemap.xml
5. If needed, add backend endpoint in correct route file
6. Build, commit, push

TASK: Add a backend endpoint
1. Open src/routes/[category].ts
2. Add new router.post() handler
3. Use existing patterns (error handling, cleanup, response format)
4. Build, commit, push

TASK: Update a tool's metadata
1. Find src/app/[tool-name]/page.tsx
2. If 'use client', update src/app/[tool-name]/layout.tsx instead
3. Update title, description, keywords
4. Keep canonical URL accurate
5. Commit and push

TASK: Add to a category dropdown in nav
1. Open src/components/Nav.tsx
2. Find the dropdown array for that category
3. Add: { name: 'Tool Name', href: '/tool-url' }
4. Commit and push

═══════════════════════════════════════════════════════════════
SECTION 15 — CURRENT STATE & PENDING WORK
═══════════════════════════════════════════════════════════════

DONE:
- 184+ tools live
- Backend + frontend infrastructure
- 4 legal pages with proper contact info
- Contact form (mailto-based)
- 8 AI tools with rate limiting
- SEO metadata on most pages
- Logo and favicons
- Organization schema (JSON-LD)
- Footer with legal links
- Sitemap submitted to Google
- Cookie consent banner

PENDING:
- AdSense approval (reapply after polish)
- Test all tools manually
- Fix any 404 pages found
- Add blog posts (5 planned)
- Increase organic traffic
- Product Hunt launch

DO NOT BUILD WITHOUT EXPLICIT INSTRUCTION:
- New tools beyond current 184
- User authentication
- Payment system
- Database integration
- New external service integrations

═══════════════════════════════════════════════════════════════
END OF BRIEFING
═══════════════════════════════════════════════════════════════

When working on tasks:
1. Match existing patterns in codebase
2. Use exact brand colors specified
3. Follow code conventions in Section 4
4. Always run npm run build before push
5. Update sitemap when adding pages
6. Keep contact info consistent (Section 10)
7. Ask if uncertain rather than guess
