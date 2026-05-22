'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&apos;/g, "'")
}

function stripHtml(html: string, keepBreaks: boolean, decodeEnts: boolean, collapseBlank: boolean): string {
  let text = html
  if (keepBreaks) {
    text = text.replace(/<br\s*\/?>/gi, '\n')
    text = text.replace(/<\/p>/gi, '\n')
    text = text.replace(/<\/div>/gi, '\n')
    text = text.replace(/<\/li>/gi, '\n')
    text = text.replace(/<p[^>]*>/gi, '')
    text = text.replace(/<div[^>]*>/gi, '')
    text = text.replace(/<li[^>]*>/gi, '')
  }
  text = text.replace(/<[^>]*>/g, '')
  if (decodeEnts) text = decodeEntities(text)
  if (collapseBlank) text = text.replace(/\n{3,}/g, '\n\n')
  return text.trim()
}

export default function StripHtmlPage() {
  const [input, setInput] = useState('')
  const [keepBreaks, setKeepBreaks] = useState(true)
  const [decodeEnts, setDecodeEnts] = useState(true)
  const [collapseBlank, setCollapseBlank] = useState(true)
  const [copied, setCopied] = useState(false)

  const result = stripHtml(input, keepBreaks, decodeEnts, collapseBlank)
  const reduction = input.length > 0 ? Math.round((1 - result.length / input.length) * 100) : 0

  const copy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const checkStyle = (checked: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '8px 12px', borderRadius: '8px', background: checked ? '#FFF7ED' : '#f8fafc', border: `1.5px solid ${checked ? '#E85D04' : '#e2e8f0'}`, fontSize: '13px', fontWeight: 600, color: checked ? '#E85D04' : '#64748b', userSelect: 'none' as const
  })

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>✂️</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Strip HTML Tags</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Extract clean plain text from HTML code instantly</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'Input characters', val: input.length },
            { label: 'Output characters', val: result.length },
            { label: 'Reduction', val: `${reduction}%` },
          ].map(s => (
            <div key={s.label} style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px', textAlign: 'center' as const }}>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F2A4A', fontFamily: "'Space Grotesk',system-ui,sans-serif" }}>{s.val.toLocaleString()}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Options */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' as const, marginBottom: '20px' }}>
          <label style={checkStyle(keepBreaks)}>
            <input type="checkbox" checked={keepBreaks} onChange={e => setKeepBreaks(e.target.checked)} style={{ display: 'none' }} />
            {keepBreaks ? '☑' : '☐'} Keep line breaks
          </label>
          <label style={checkStyle(decodeEnts)}>
            <input type="checkbox" checked={decodeEnts} onChange={e => setDecodeEnts(e.target.checked)} style={{ display: 'none' }} />
            {decodeEnts ? '☑' : '☐'} Decode HTML entities
          </label>
          <label style={checkStyle(collapseBlank)}>
            <input type="checkbox" checked={collapseBlank} onChange={e => setCollapseBlank(e.target.checked)} style={{ display: 'none' }} />
            {collapseBlank ? '☑' : '☐'} Collapse blank lines
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px', display: 'block' }}>HTML Input</label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={'<h1>Hello World</h1>\n<p>This is a <strong>test</strong> paragraph.</p>'}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'monospace', resize: 'vertical' as const, outline: 'none', boxSizing: 'border-box' as const, minHeight: '280px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px', display: 'block' }}>Plain Text Output</label>
            <textarea
              value={result}
              readOnly
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical' as const, outline: 'none', boxSizing: 'border-box' as const, minHeight: '280px', background: '#f8fafc' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '16px' }}>
          <button onClick={copy}
            style={{ background: copied ? '#16A34A' : '#E85D04', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            {copied ? '✓ Copied!' : 'Copy Clean Text'}
          </button>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
