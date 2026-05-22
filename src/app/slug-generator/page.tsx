'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

function generateSlug(text: string, separator: string, maxLen: number): string {
  let slug = text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-_]/g, '') // Remove special chars
    .replace(/[\s-_]+/g, separator) // Replace spaces/hyphens/underscores with separator
    .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '') // Trim separators

  if (maxLen > 0 && slug.length > maxLen) {
    slug = slug.slice(0, maxLen).replace(new RegExp(`${separator}+$`), '')
  }
  return slug
}

const EXAMPLES = [
  'Hello World',
  'My Blog Post Title',
  'The Best 10 Tools in 2024!',
  'Crème brûlée recipe',
  'C++ Programming Guide',
]

export default function SlugGeneratorPage() {
  const [input, setInput] = useState('My Amazing Blog Post Title!')
  const [separator, setSeparator] = useState('-')
  const [maxLen, setMaxLen] = useState(0)
  const [copied, setCopied] = useState(false)

  const slug = generateSlug(input, separator, maxLen)

  function copy() {
    navigator.clipboard.writeText(slug)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🔗</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Slug Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Convert text to URL-friendly slugs instantly</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 700, color: '#0F2A4A' }}>Input Text</div>
        <input value={input} onChange={e => setInput(e.target.value)}
          placeholder="Enter your title or phrase..."
          style={{ width: '100%', padding: '14px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '16px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const, marginBottom: '16px' }} />

        {/* Options */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>Separator</div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[['- (Hyphen)', '-'], ['_ (Underscore)', '_']].map(([label, val]) => (
                <button key={val} onClick={() => setSeparator(val)}
                  style={{ padding: '8px 14px', borderRadius: '8px', border: '1.5px solid', borderColor: separator === val ? '#E85D04' : '#e2e8f0', background: separator === val ? '#FFF7ED' : 'white', color: separator === val ? '#E85D04' : '#64748b', fontFamily: 'monospace', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>Max Length (0 = no limit)</div>
            <input type="number" value={maxLen || ''} onChange={e => setMaxLen(parseInt(e.target.value) || 0)}
              placeholder="0"
              style={{ width: '100px', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
        </div>

        {/* Output */}
        <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Generated Slug</div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>{slug.length} chars</span>
              <button onClick={copy}
                style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', background: copied ? '#16A34A' : 'white', color: copied ? 'white' : '#64748b', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '18px', fontWeight: 700, color: '#E85D04', wordBreak: 'break-all' }}>
            {slug || <span style={{ color: '#94a3b8', fontSize: '15px', fontWeight: 400 }}>Enter text above...</span>}
          </div>
        </div>

        {/* Examples */}
        <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '10px' }}>Quick Examples</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {EXAMPLES.map(ex => (
              <div key={ex} style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '13px', cursor: 'pointer', padding: '6px 8px', borderRadius: '6px', background: 'white', border: '1px solid #e2e8f0' }}
                onClick={() => setInput(ex)}>
                <span style={{ color: '#64748b', flex: 1 }}>{ex}</span>
                <span style={{ color: '#94a3b8' }}>→</span>
                <span style={{ fontFamily: 'monospace', color: '#E85D04', fontWeight: 600 }}>{generateSlug(ex, separator, maxLen)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
