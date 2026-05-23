'use client'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

const OTHER_CATS = [
  { label: 'Text Tools', href: '/tools/text' },
  { label: 'Calculators', href: '/tools/calculators' },
  { label: 'Color Tools', href: '/tools/color' },
  { label: 'Security Tools', href: '/tools/security' },
  { label: 'QR Code Tools', href: '/tools/qr' },
  { label: 'Fun & Decision', href: '/tools/fun' },
] as const

const DEV_TOOLS = [
  {
    title: 'JSON Formatter',
    desc: 'Format, validate and minify JSON with syntax highlighting.',
    href: '/json-formatter',
    features: ['Pretty-print and minify JSON', 'Validate JSON syntax', 'Error highlighting'],
  },
  {
    title: 'Base64 Encoder/Decoder',
    desc: 'Encode text to Base64 or decode Base64 strings instantly.',
    href: '/base64-encoder',
    features: ['Encode and decode Base64', 'URL-safe Base64 option', 'Binary file support'],
  },
  {
    title: 'URL Encoder/Decoder',
    desc: 'Encode or decode URL strings and query parameters.',
    href: '/url-encoder',
    features: ['URL percent-encoding', 'Component encoding mode', 'Batch URL encoding'],
  },
  {
    title: 'CSV to JSON Converter',
    desc: 'Convert CSV spreadsheet data to JSON arrays.',
    href: '/csv-to-json',
    features: ['Auto-detect CSV headers', 'Nested JSON output option', 'Custom delimiter support'],
  },
  {
    title: 'UUID Generator',
    desc: 'Generate random UUID v4 identifiers instantly.',
    href: '/uuid-generator',
    features: ['RFC 4122 UUID v4', 'One-click copy', 'Multiple UUID generation'],
  },
  {
    title: 'JWT Decoder',
    desc: 'Decode and inspect JSON Web Tokens without a secret.',
    href: '/jwt-decoder',
    features: ['Header, payload, signature view', 'Expiry time display', 'Pretty JSON output'],
  },
  {
    title: 'Hash Generator',
    desc: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes.',
    href: '/hash-generator',
    features: ['MD5, SHA-1, SHA-256, SHA-512', 'Real-time hashing', 'One-click copy'],
  },
  {
    title: 'XML Formatter',
    desc: 'Format, validate and minify XML code.',
    href: '/xml-formatter',
    features: ['Pretty-print XML', 'Minify XML output', 'Syntax validation'],
  },
  {
    title: 'YAML ↔ JSON Converter',
    desc: 'Convert between YAML and JSON formats instantly.',
    href: '/yaml-to-json',
    features: ['YAML to JSON conversion', 'JSON to YAML conversion', 'Preserves data types'],
  },
  {
    title: 'JSON to CSV Converter',
    desc: 'Convert JSON arrays to CSV spreadsheets.',
    href: '/json-to-csv',
    features: ['Flatten nested JSON', 'Custom CSV delimiter', 'Download as .csv file'],
  },
  {
    title: 'SQL Formatter',
    desc: 'Format and beautify SQL queries with keyword highlighting.',
    href: '/sql-formatter',
    features: ['Multi-dialect SQL support', 'Keyword capitalisation', 'Indentation control'],
  },
  {
    title: 'Regex Tester',
    desc: 'Test and debug regular expressions with live match highlighting.',
    href: '/regex-tester',
    features: ['Live match highlighting', 'Capture group display', 'Global and multi-line flags'],
  },
  {
    title: 'HTML to Markdown',
    desc: 'Convert HTML code to clean Markdown format.',
    href: '/html-to-markdown',
    features: ['Preserves structure', 'Handles tables and lists', 'Code block detection'],
  },
  {
    title: 'Markdown to HTML',
    desc: 'Convert Markdown to HTML with live preview.',
    href: '/markdown-to-html',
    features: ['GitHub Flavored Markdown', 'Live HTML preview', 'Copy HTML output'],
  },
  {
    title: 'Slug Generator',
    desc: 'Convert any text to URL-friendly slugs.',
    href: '/slug-generator',
    features: ['Remove special characters', 'Custom separator', 'Lowercase output'],
  },
  {
    title: 'HTML Entity Encoder',
    desc: 'Encode and decode HTML entities.',
    href: '/html-entities',
    features: ['Encode special characters', 'Decode HTML entities', 'Named entity support'],
  },
  {
    title: 'Cron Expression Generator',
    desc: 'Build and explain cron job schedules visually.',
    href: '/cron-generator',
    features: ['Visual cron builder', 'Human-readable explanation', 'Common schedule presets'],
  },
  {
    title: 'Number Base Converter',
    desc: 'Convert numbers between binary, decimal, hex, and octal.',
    href: '/base-converter',
    features: ['Binary, decimal, hex, octal', 'Instant conversion', 'Large number support'],
  },
  {
    title: 'Timestamp Converter',
    desc: 'Convert Unix timestamps to human-readable dates and back.',
    href: '/timestamp-converter',
    features: ['Unix timestamp to date', 'Date to Unix timestamp', 'UTC and local time'],
  },
  {
    title: 'Text to Binary',
    desc: 'Convert text to binary code and back.',
    href: '/text-to-binary',
    features: ['ASCII to binary conversion', 'Binary to text decoding', 'Space-separated output'],
  },
  {
    title: 'Image to Base64',
    desc: 'Convert images to Base64 data URIs in your browser.',
    href: '/image-to-base64',
    features: ['PNG, JPG, GIF, WebP support', 'Data URI output', 'No upload to server'],
  },
  {
    title: 'UUID Bulk Generator',
    desc: 'Generate up to 1000 UUIDs at once.',
    href: '/uuid-bulk',
    features: ['Generate 1–1000 UUIDs', 'One-click copy all', 'Download as text file'],
  },
  {
    title: 'Markdown Cheatsheet',
    desc: 'Interactive Markdown reference with live editor.',
    href: '/markdown-cheatsheet',
    features: ['Full syntax reference', 'Live editor preview', 'Copy examples instantly'],
  },
  {
    title: 'Code Beautifier',
    desc: 'Format HTML, CSS, JavaScript, SQL, XML, and JSON.',
    href: '/code-beautifier',
    features: ['6 language support', 'Custom indentation', 'Minify option'],
  },
] as const

export default function DeveloperToolsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '80px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', padding: '5px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginBottom: '28px' }}>
            <span style={{ background: '#E85D04', borderRadius: '999px', padding: '1px 8px', fontWeight: 700, color: 'white', fontSize: '11px' }}>24 TOOLS</span>
            Developer Tools
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,5vw,52px)', fontWeight: 800, color: 'white', lineHeight: 1.15, letterSpacing: '-0.5px', margin: '0 0 18px' }}>
            Free Online <span style={{ color: '#F48C42' }}>Developer Tools</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,0.65)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
            JSON formatters, Base64 encoders, UUID generators, regex testers and more — all the tools developers use daily, free and instant.
          </p>
        </div>
      </div>

      <TrustStrip />

      {/* Tools grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#E85D04', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>Developer Tools</div>
          <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: '#0F2A4A', margin: '0 0 12px' }}>All Developer Tools</h2>
          <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>24 free tools for developers, engineers, and technical professionals.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '20px' }}>
          {DEV_TOOLS.map(tool => (
            <a key={tool.href} href={tool.href}
              style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '24px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 2px 8px rgba(15,42,74,0.04)' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>{tool.title}</div>
                <div style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.5' }}>{tool.desc}</div>
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 16px', listStyle: 'disc' }}>
                {tool.features.map(f => (
                  <li key={f} style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: '1.6' }}>{f}</li>
                ))}
              </ul>
              <div style={{ marginTop: 'auto', paddingTop: '4px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#E85D04', background: '#FFF7ED', padding: '5px 14px', borderRadius: '999px' }}>Use Tool →</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Other Categories */}
      <div style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '22px', fontWeight: 800, color: '#0F2A4A', marginBottom: '20px', textAlign: 'center' }}>Other Categories</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {OTHER_CATS.map(cat => (
              <a key={cat.href} href={cat.href}
                style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '10px 20px', textDecoration: 'none', fontSize: '14px', fontWeight: 600, color: '#0F2A4A' }}>
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
