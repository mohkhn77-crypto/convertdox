'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

interface MetaResult { text: string; label: string }

function getColor(len: number): { bg: string; text: string; label: string } {
  if (len >= 120 && len <= 160) return { bg: '#F0FDF4', text: '#166534', label: '✅ Ideal length' }
  if ((len >= 90 && len < 120) || (len > 160 && len <= 180)) return { bg: '#FFFBEB', text: '#92400E', label: '⚠️ Acceptable' }
  return { bg: '#FEF2F2', text: '#991B1B', label: '❌ Too short or too long' }
}

function truncate(s: string, max: number) {
  return s.length > max ? s.slice(0, max - 3) + '...' : s
}

function generate(title: string, keyword: string, extras: string, desc: string): MetaResult[] {
  const kw = keyword.trim() || title.trim() || 'your topic'
  const d = desc.trim() || 'Get everything you need to know'
  const ex = extras.trim() ? extras.trim().split(',').slice(0, 2).map(s => s.trim()).join(', ') : ''
  const exPart = ex ? ` including ${ex}` : ''
  const cta = ['Get started today!', 'Try it free.', 'Learn more now.', 'Start for free.'][Math.floor(Math.random() * 4)]

  const v1 = truncate(`${d}${exPart}. Discover everything about ${kw}. ${cta}`, 165)
  const v2 = truncate(`Discover ${kw} with our free tool. ${d}${exPart}. ${cta}`, 165)
  const v3 = truncate(`Looking for ${kw}? ${d}${exPart ? ` covering ${ex}` : ''}. ${cta}`, 165)

  return [
    { text: v1, label: 'Variation 1 — Descriptive' },
    { text: v2, label: 'Variation 2 — Discovery' },
    { text: v3, label: 'Variation 3 — Question Hook' },
  ]
}

export default function MetaDescriptionGeneratorPage() {
  const [pageTitle, setPageTitle] = useState('')
  const [mainKeyword, setMainKeyword] = useState('')
  const [additionalKeywords, setAdditionalKeywords] = useState('')
  const [briefDescription, setBriefDescription] = useState('')
  const [results, setResults] = useState<MetaResult[]>([])
  const [copied, setCopied] = useState<number | null>(null)

  function handleGenerate() {
    if (!pageTitle.trim() && !mainKeyword.trim() && !briefDescription.trim()) return
    setResults(generate(pageTitle, mainKeyword, additionalKeywords, briefDescription))
    setCopied(null)
  }

  function copy(text: string, i: number) {
    navigator.clipboard.writeText(text)
    setCopied(i)
    setTimeout(() => setCopied(null), 2000)
  }

  const inp = (label: string, value: string, set: (v: string) => void, ph: string) => (
    <div>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>{label}</label>
      <input value={value} onChange={e => set(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleGenerate()} placeholder={ph}
        style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🔍</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Meta Description Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Generate 3 optimized meta description variations for your page — free SEO tool</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '900px', margin: '32px auto 0', padding: '0 20px 60px' }}>

        {/* Input */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F2A4A', margin: '0 0 20px' }}>Page Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            {inp('Page Title', pageTitle, setPageTitle, 'Free Online PDF Converter')}
            {inp('Main Keyword', mainKeyword, setMainKeyword, 'PDF converter')}
            {inp('Additional Keywords (comma-separated)', additionalKeywords, setAdditionalKeywords, 'convert PDF, PDF to Word, free')}
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>Brief Description of Your Page</label>
            <textarea value={briefDescription} onChange={e => setBriefDescription(e.target.value)}
              placeholder="Describe what your page offers — the main benefit or feature for visitors..."
              style={{ width: '100%', minHeight: '80px', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }} />
          </div>
          <button onClick={handleGenerate}
            style={{ marginTop: '16px', background: '#E85D04', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
            ✨ Generate Meta Descriptions
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
            {results.map((r, i) => {
              const len = r.text.length
              const { bg, text: textColor, label } = getColor(len)
              return (
                <div key={i} style={{ background: 'white', borderRadius: '14px', padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b' }}>{r.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ background: bg, color: textColor, borderRadius: '20px', padding: '3px 12px', fontSize: '12px', fontWeight: 700 }}>
                        {len} chars · {label}
                      </span>
                      <button onClick={() => copy(r.text, i)}
                        style={{ background: copied === i ? '#16A34A' : '#0F2A4A', color: 'white', border: 'none', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                        {copied === i ? '✓ Copied!' : '📋 Copy'}
                      </button>
                    </div>
                  </div>
                  {/* Character bar */}
                  <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', marginBottom: '12px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(100, len / 1.6)}%`, height: '100%', background: textColor, borderRadius: '2px', transition: 'width 0.3s' }} />
                  </div>
                  <p style={{ fontSize: '15px', color: '#1e293b', lineHeight: 1.7, margin: 0 }}>{r.text}</p>
                  {/* SERP preview */}
                  <div style={{ marginTop: '14px', background: '#f8fafc', borderRadius: '8px', padding: '12px 14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>SERP Preview</div>
                    <div style={{ fontSize: '18px', color: '#1a0dab', fontWeight: 400, marginBottom: '2px', lineHeight: 1.2 }}>{pageTitle || 'Page Title'}</div>
                    <div style={{ fontSize: '13px', color: '#006621', marginBottom: '4px' }}>https://yoursite.com/page-url</div>
                    <div style={{ fontSize: '13px', color: '#4d5156', lineHeight: 1.5 }}>{r.text}</div>
                  </div>
                </div>
              )
            })}
            <button onClick={handleGenerate}
              style={{ background: 'white', color: '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              🔄 Regenerate Variations
            </button>
          </div>
        )}

        {/* Length guide */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '40px' }}>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F2A4A', marginBottom: '14px' }}>Meta Description Length Guide</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { range: '120–160 characters', color: '#16a34a', bg: '#F0FDF4', label: 'Ideal', desc: 'Fully visible in Google search results on most devices' },
              { range: '90–119 or 161–180 characters', color: '#d97706', bg: '#FFFBEB', label: 'Acceptable', desc: 'May be truncated on mobile or cause minor SEO impact' },
              { range: 'Under 90 or over 180 characters', color: '#dc2626', bg: '#FEF2F2', label: 'Avoid', desc: 'Too short loses opportunity; too long gets cut by Google' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: item.bg, borderRadius: '10px', padding: '12px 14px' }}>
                <span style={{ color: item.color, fontWeight: 800, fontSize: '14px', minWidth: '60px' }}>{item.label}</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A' }}>{item.range}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Section */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F2A4A', marginBottom: '16px' }}>Meta Description Generator — Write Better SEO Snippets</h2>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            A meta description is the short snippet of text that appears under your page title in Google search results. While it&apos;s not a direct ranking factor, a well-written meta description significantly improves your click-through rate (CTR) — which does influence rankings over time.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            The ideal meta description is between 120–160 characters. It should include your primary keyword naturally, clearly describe what the page offers, and include a call-to-action such as &quot;Learn more,&quot; &quot;Get started,&quot; or &quot;Try it free.&quot; Every page on your site — especially landing pages, blog posts, and product pages — should have a unique meta description.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            Our generator produces three different framing styles: a descriptive approach that leads with your page&apos;s core benefit, a discovery frame that positions the content as something users will find valuable, and a question-hook opener that mirrors the user&apos;s intent. Testing different variations can improve your organic CTR by 10–30%.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8 }}>
            All generation happens locally in your browser. No data is sent to any server. ConvertDox is 100% free with no signup required.
          </p>
        </div>
      </div>
    </div>
  )
}
