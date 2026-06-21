'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


// ─── Logo ────────────────────────────────────────────────────────────────────
const Logo = () => (
  <div style={{ width: '40px', height: '40px', background: '#0F2A4A', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <svg width="26" height="26" viewBox="0 0 44 44" fill="none">
      <rect x="6" y="10" width="13" height="17" rx="2" fill="white" opacity="0.95" />
      <rect x="25" y="17" width="13" height="17" rx="2" fill="#E85D04" />
      <polygon points="20,20 24,22 20,24" fill="white" />
    </svg>
  </div>
)

// ─── Mega Menu Data ───────────────────────────────────────────────────────────
interface Tool { name: string; href: string }
interface Group { title: string; tools: Tool[] }
interface Category { label: string; groups: Group[] }
type MegaMenu = Record<string, Category>

const MEGA_MENU: MegaMenu = {
  pdf: {
    label: 'PDF Tools',
    groups: [
      { title: 'Organize PDF', tools: [
        { name: 'Merge PDF', href: '/merge-pdf' },
        { name: 'Split PDF', href: '/split-pdf' },
        { name: 'Delete Pages', href: '/pdf-delete-pages' },
        { name: 'Extract Pages', href: '/pdf-extract-pages' },
        { name: 'Reorder Pages', href: '/pdf-reorder-pages' },
        { name: 'PDF Page Counter', href: '/pdf-page-counter' },
      ]},
      { title: 'Optimize PDF', tools: [
        { name: 'Compress PDF', href: '/compress-pdf' },
        { name: 'PDF OCR', href: '/pdf-ocr' },
        { name: 'PDF to PDF/A', href: '/pdf-to-pdfa' },
        { name: 'PDF Info', href: '/pdf-info' },
      ]},
      { title: 'Convert to PDF', tools: [
        { name: 'JPG to PDF', href: '/jpg-to-pdf' },
        { name: 'PNG to PDF', href: '/png-to-pdf' },
        { name: 'Word to PDF', href: '/word-to-pdf' },
        { name: 'Excel to PDF', href: '/excel-to-pdf' },
        { name: 'PowerPoint to PDF', href: '/ppt-to-pdf' },
        { name: 'HTML to PDF', href: '/html-to-pdf' },
      ]},
      { title: 'Convert from PDF', tools: [
        { name: 'PDF to JPG', href: '/pdf-to-jpg' },
        { name: 'PDF to PNG', href: '/pdf-to-png' },
        { name: 'PDF to Word', href: '/pdf-to-word' },
        { name: 'PDF to Excel', href: '/pdf-to-excel' },
        { name: 'PDF to PowerPoint', href: '/pdf-to-ppt' },
        { name: 'PDF to Text', href: '/pdf-to-text' },
      ]},
      { title: 'Edit PDF', tools: [
        { name: 'PDF Editor', href: '/pdf-editor' },
        { name: 'Rotate PDF', href: '/rotate-pdf' },
        { name: 'Page Numbers', href: '/pdf-page-numbers' },
        { name: 'Header & Footer', href: '/pdf-header-footer' },
        { name: 'Annotate PDF', href: '/pdf-annotate' },
      ]},
      { title: 'PDF Security', tools: [
        { name: 'Unlock PDF', href: '/unlock-pdf' },
        { name: 'Protect PDF', href: '/protect-pdf' },
        { name: 'Sign PDF', href: '/pdf-sign' },
      ]},
    ],
  },

  image: {
    label: 'Image Tools',
    groups: [
      { title: 'Optimize Images', tools: [
        { name: 'Compress Image', href: '/compress-image' },
        { name: 'Batch Compress', href: '/compress-images-batch' },
        { name: 'Strip EXIF', href: '/exif-stripper' },
      ]},
      { title: 'Resize & Crop', tools: [
        { name: 'Resize Image', href: '/resize-image' },
        { name: 'Crop Image', href: '/image-crop' },
        { name: 'Batch Resize', href: '/resize-images-batch' },
        { name: 'Aspect Ratio', href: '/aspect-ratio' },
      ]},
      { title: 'Convert Images', tools: [
        { name: 'HEIC to JPG', href: '/heic-to-jpg' },
        { name: 'WebP to JPG', href: '/webp-to-jpg' },
        { name: 'SVG to PNG', href: '/svg-to-png' },
        { name: 'Convert Format', href: '/image-convert' },
        { name: 'Batch Convert', href: '/convert-images-batch' },
        { name: 'Image to ICO', href: '/image-to-ico' },
      ]},
      { title: 'Edit Images', tools: [
        { name: 'Merge Images', href: '/merge-images' },
        { name: 'Rotate Image', href: '/rotate-image' },
        { name: 'Flip Image', href: '/flip-image' },
        { name: 'Grayscale', href: '/grayscale-image' },
        { name: 'Blur Image', href: '/blur-image' },
        { name: 'Watermark Image', href: '/watermark-image' },
        { name: 'Image Colors', href: '/image-color-picker' },
      ]},
      { title: 'Special Tools', tools: [
        { name: 'Background Remover', href: '/bg-remove' },
        { name: 'Passport Photo', href: '/passport-photo' },
        { name: 'Image to Text (OCR)', href: '/image-to-text' },
        { name: 'Video to Text', href: '/video-to-text' },
        { name: 'Favicon Generator', href: '/favicon-generator' },
        { name: 'Social Media Crops', href: '/social-media-crops' },
        { name: 'YouTube Thumbnail', href: '/youtube-thumbnail' },
      ]},
    ],
  },

  ai: {
    label: 'AI Tools',
    groups: [
      { title: 'Writing Assistants', tools: [
        { name: 'AI Summarizer', href: '/ai-summarizer' },
        { name: 'AI Paraphraser', href: '/ai-paraphraser' },
        { name: 'AI Grammar Checker', href: '/ai-grammar' },
        { name: 'AI Tone Changer', href: '/ai-tone-changer' },
      ]},
      { title: 'Career Tools', tools: [
        { name: 'AI Resume Improver', href: '/ai-resume-improver' },
        { name: 'AI Cover Letter', href: '/ai-cover-letter' },
        { name: 'AI Email Writer', href: '/ai-email-writer' },
      ]},
      { title: 'Translation', tools: [
        { name: 'AI Translator', href: '/ai-translator' },
      ]},
    ],
  },

  documents: {
    label: 'Documents',
    groups: [
      { title: 'Business Documents', tools: [
        { name: 'Invoice Generator', href: '/invoice-generator' },
        { name: 'Receipt Generator', href: '/receipt-generator' },
        { name: 'Purchase Order', href: '/purchase-order-generator' },
        { name: 'Price Quote', href: '/price-quote-generator' },
        { name: 'Letterhead', href: '/letterhead-generator' },
      ]},
      { title: 'Career & Brand', tools: [
        { name: 'Resume Builder', href: '/resume-builder' },
        { name: 'Business Card', href: '/business-card-generator' },
        { name: 'Logo Maker', href: '/logo-maker' },
        { name: 'Quote Generator', href: '/quote-generator' },
      ]},
    ],
  },

  calculators: {
    label: 'Calculators',
    groups: [
      { title: 'Financial', tools: [
        { name: 'Investment Calculator', href: '/investment-calculator' },
        { name: 'Zakat Calculator', href: '/zakat-calculator' },
        { name: 'Tax Calculator', href: '/tax-calculator' },
        { name: 'Salary Calculator', href: '/salary-calculator' },
        { name: 'Tip Calculator', href: '/tip-calculator' },
      ]},
      { title: 'Health & Fitness', tools: [
        { name: 'BMI Calculator', href: '/bmi-calculator' },
        { name: 'Body Fat', href: '/body-fat-calculator' },
        { name: 'Calorie Calculator', href: '/calorie-calculator' },
        { name: 'Macro Calculator', href: '/macro-calculator' },
        { name: 'Water Intake', href: '/water-intake' },
        { name: 'Pregnancy Calculator', href: '/pregnancy-due-date-calculator' },
      ]},
      { title: 'Math & Utility', tools: [
        { name: 'Percentage', href: '/percentage-calculator' },
        { name: 'Age Calculator', href: '/age-calculator' },
        { name: 'GPA Calculator', href: '/gpa-calculator' },
        { name: 'Fuel Cost', href: '/fuel-cost' },
        { name: 'Discount Calculator', href: '/discount-calculator' },
        { name: 'Bitrate', href: '/bitrate-calculator' },
      ]},
    ],
  },

  developer: {
    label: 'Developer',
    groups: [
      { title: 'Data Formats', tools: [
        { name: 'JSON Formatter', href: '/json-formatter' },
        { name: 'XML Formatter', href: '/xml-formatter' },
        { name: 'SQL Formatter', href: '/sql-formatter' },
        { name: 'YAML to JSON', href: '/yaml-to-json' },
        { name: 'CSV to JSON', href: '/csv-to-json' },
        { name: 'JSON to CSV', href: '/json-to-csv' },
      ]},
      { title: 'Encoding', tools: [
        { name: 'Base64 Encoder', href: '/base64-encoder' },
        { name: 'URL Encoder', href: '/url-encoder' },
        { name: 'HTML Entities', href: '/html-entities' },
        { name: 'JWT Decoder', href: '/jwt-decoder' },
        { name: 'Hash Generator', href: '/hash-generator' },
      ]},
      { title: 'CSS Tools', tools: [
        { name: 'CSS Gradient', href: '/css-gradient' },
        { name: 'Flexbox Generator', href: '/flexbox-generator' },
        { name: 'Grid Generator', href: '/grid-generator' },
        { name: 'Animation', href: '/animation-generator' },
      ]},
      { title: 'Web Tools', tools: [
        { name: 'Regex Tester', href: '/regex-tester' },
        { name: 'Cron Generator', href: '/cron-generator' },
        { name: 'HTML to Markdown', href: '/html-to-markdown' },
        { name: 'Code Beautifier', href: '/code-beautifier' },
      ]},
      { title: 'SEO & Generators', tools: [
        { name: 'Meta Description', href: '/meta-description-generator' },
        { name: 'Slug Generator', href: '/slug-generator' },
        { name: 'UUID Generator', href: '/uuid-generator' },
        { name: 'Color Picker', href: '/hex-rgb-converter' },
      ]},
    ],
  },

  text: {
    label: 'Text Tools',
    groups: [
      { title: 'Count & Analyze', tools: [
        { name: 'Word Counter', href: '/word-counter' },
        { name: 'Detailed Word Counter', href: '/detailed-word-counter' },
        { name: 'Character Counter', href: '/character-counter' },
        { name: 'Sentence Counter', href: '/sentence-counter' },
        { name: 'Word Frequency', href: '/word-frequency' },
      ]},
      { title: 'Transform Text', tools: [
        { name: 'Case Converter', href: '/text-case-converter' },
        { name: 'Reverse Text', href: '/reverse-text' },
        { name: 'Sort Lines', href: '/sort-lines' },
        { name: 'Remove Duplicates', href: '/remove-duplicates' },
        { name: 'Find & Replace', href: '/find-replace' },
        { name: 'Strip HTML', href: '/strip-html' },
      ]},
      { title: 'Generators', tools: [
        { name: 'Lorem Ipsum', href: '/lorem-ipsum' },
        { name: 'Markdown Editor', href: '/markdown-editor' },
        { name: 'Text Diff', href: '/text-diff' },
        { name: 'ASCII Art', href: '/ascii-art' },
      ]},
    ],
  },

  utilities: {
    label: 'Utilities',
    groups: [
      { title: 'Generators', tools: [
        { name: 'QR Generator', href: '/qr-generator' },
        { name: 'QR Reader', href: '/qr-reader' },
        { name: 'Password Generator', href: '/password-generator' },
        { name: 'PIN Generator', href: '/pin-generator' },
        { name: 'Username Generator', href: '/username-generator' },
        { name: 'Random Number', href: '/random-number-generator' },
      ]},
      { title: 'Converters', tools: [
        { name: 'Unit Converter', href: '/unit-converter' },
        { name: 'Length', href: '/length-converter' },
        { name: 'Weight', href: '/weight-converter' },
        { name: 'Temperature', href: '/temperature-converter' },
        { name: 'Timezone', href: '/timezone-converter' },
      ]},
      { title: 'Time & Productivity', tools: [
        { name: 'Stopwatch', href: '/stopwatch' },
        { name: 'Pomodoro Timer', href: '/pomodoro-timer' },
        { name: 'Date Difference', href: '/date-difference' },
        { name: 'Coin Flip', href: '/coin-flip' },
      ]},
    ],
  },
}

// Flatten all tools for search
const ALL_TOOLS: { name: string; href: string; category: string }[] =
  Object.values(MEGA_MENU).flatMap(cat =>
    cat.groups.flatMap(g => g.tools.map(t => ({ ...t, category: cat.label })))
  )

// ─── Component ────────────────────────────────────────────────────────────────
export default function NavBar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<typeof ALL_TOOLS>([])
  const [showSearch, setShowSearch] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()

  // Search
  useEffect(() => {
    if (searchQuery.length < 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchResults([])
      return
    }
    const q = searchQuery.toLowerCase()
    setSearchResults(
      ALL_TOOLS.filter(t =>
        t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
      ).slice(0, 8)
    )
  }, [searchQuery])

  // Click outside closes search
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function openMenu(key: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveMenu(key)
  }
  function scheduleClose() {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120)
  }
  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  function handleSelectTool(href: string) {
    setSearchQuery('')
    setShowSearch(false)
    setMobileOpen(false)
    setActiveMenu(null)
    router.push(href)
  }

  const category = activeMenu ? MEGA_MENU[activeMenu] : null
  const cols = category ? Math.min(category.groups.length, 4) : 3

  return (
    <>
      <style>{`
        .cdx-desktop { display: flex; }
        .cdx-mobile-toggle { display: none; }
        .cdx-search-w { width: 260px; }
        @media (max-width: 1100px) {
          .cdx-desktop { display: none !important; }
          .cdx-mobile-toggle { display: flex !important; }
          .cdx-search-w { width: 180px; }
        }
        @media (max-width: 560px) {
          .cdx-search-w { width: 140px; }
        }
      `}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 200, background: 'white', borderBottom: '1.5px solid #e2e8f0', boxShadow: '0 1px 4px rgba(15,42,74,0.05)', fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif' }}>

        {/* ── Top Bar ── */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px', height: '64px', display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '9px', flexShrink: 0 }}>
            <Logo />
            <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '21px', fontWeight: 800, color: '#0F2A4A', letterSpacing: '-0.5px' }}>
              Convert<span style={{ color: '#E85D04' }}>Dox</span>
            </span>
          </Link>

          {/* Desktop category buttons */}
          <div className="cdx-desktop" style={{ alignItems: 'center', gap: '0', flex: 1, justifyContent: 'center' }}>
            {Object.entries(MEGA_MENU).map(([key, cat]) => (
              <button
                key={key}
                onMouseEnter={() => openMenu(key)}
                onMouseLeave={scheduleClose}
                style={{
                  padding: '20px 12px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: activeMenu === key ? '#E85D04' : '#334155',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  fontFamily: 'inherit',
                  borderBottom: activeMenu === key ? '2px solid #E85D04' : '2px solid transparent',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s',
                }}>
                {cat.label}
                <svg width="10" height="7" viewBox="0 0 10 7" style={{ opacity: 0.5 }}>
                  <path d="M1 1.5L5 5.5L9 1.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            ))}
          </div>

          {/* Right side: search + blog + dark mode + mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>

            {/* Search */}
            <div ref={searchRef} className="cdx-search-w" style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search 200+ tools…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearch(true)}
                style={{
                  width: '100%',
                  padding: '8px 14px 8px 34px',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  outline: 'none',
                  background: '#f8fafc',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#0F2A4A')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
              />
              <svg width="15" height="15" viewBox="0 0 15 15" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }}>
                <circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>

              {/* Search dropdown */}
              {showSearch && searchQuery.length >= 2 && (
                <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 8px 32px rgba(15,42,74,0.12)', zIndex: 300, overflow: 'hidden' }}>
                  {searchResults.length > 0 ? (
                    searchResults.map(tool => (
                      <button
                        key={tool.href}
                        onMouseDown={() => handleSelectTool(tool.href)}
                        style={{ width: '100%', padding: '11px 14px', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', borderBottom: '1px solid #f8fafc' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A' }}>{tool.name}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{tool.category}</div>
                      </button>
                    ))
                  ) : (
                    <div style={{ padding: '14px', fontSize: '13px', color: '#94a3b8', textAlign: 'center' }}>
                      No tools found for &quot;{searchQuery}&quot;
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Blog link (desktop only) */}
            <Link href="/blog" className="cdx-desktop" style={{ fontSize: '13px', fontWeight: 500, color: '#64748b', textDecoration: 'none', whiteSpace: 'nowrap' }}>Blog</Link>

            {/* Mobile hamburger */}
            <button
              className="cdx-mobile-toggle"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px', color: '#0F2A4A', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 22 22">
                {mobileOpen ? (
                  <path d="M4 4L18 18M4 18L18 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                ) : (
                  <>
                    <line x1="2" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="2" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mega Dropdown Panel ── */}
        {category && (
          <div
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              background: 'white',
              borderTop: '1px solid #f1f5f9',
              borderBottom: '1.5px solid #e2e8f0',
              boxShadow: '0 12px 40px rgba(15,42,74,0.10)',
              zIndex: 190,
              animation: 'cdxFadeIn 0.12s ease',
            }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '28px 20px', display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '28px' }}>
              {category.groups.map(group => (
                <div key={group.title}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#E85D04', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1.5px solid #f8fafc' }}>
                    {group.title}
                  </div>
                  {group.tools.map(tool => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setActiveMenu(null)}
                      style={{ display: 'block', padding: '5px 8px', fontSize: '13px', color: '#334155', textDecoration: 'none', borderRadius: '6px', fontWeight: 500, lineHeight: 1.5, transition: 'background 0.1s, color 0.1s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#FFF7ED'; e.currentTarget.style.color = '#E85D04' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#334155' }}
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <div style={{ background: 'white', borderTop: '1.5px solid #e2e8f0', maxHeight: '80vh', overflowY: 'auto', padding: '8px 20px 24px' }}>
            {Object.entries(MEGA_MENU).map(([key, cat]) => (
              <details key={key} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <summary style={{ fontSize: '14px', fontWeight: 700, color: '#0F2A4A', padding: '13px 0', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {cat.label}
                  <svg width="12" height="8" viewBox="0 0 12 8" style={{ opacity: 0.4 }}>
                    <path d="M1 1.5L6 6.5L11 1.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </summary>
                <div style={{ paddingLeft: '12px', paddingBottom: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                  {cat.groups.map(group => (
                    <div key={group.title} style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#E85D04', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', marginTop: '8px' }}>
                        {group.title}
                      </div>
                      {group.tools.map(tool => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={() => setMobileOpen(false)}
                          style={{ display: 'block', padding: '6px 0', fontSize: '13px', color: '#334155', textDecoration: 'none', fontWeight: 500 }}
                        >
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </details>
            ))}

            {/* Mobile footer links */}
            <div style={{ display: 'flex', gap: '16px', paddingTop: '16px', flexWrap: 'wrap' }}>
              {[
                { label: 'All Tools', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map(l => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                  style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', textDecoration: 'none' }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Keyframe for dropdown fade */}
      <style>{`@keyframes cdxFadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </>
  )
}
