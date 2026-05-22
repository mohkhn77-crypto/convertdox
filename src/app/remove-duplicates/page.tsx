'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

export default function RemoveDuplicatesPage() {
  const [input, setInput] = useState('')
  const [caseInsensitive, setCaseInsensitive] = useState(false)
  const [trimWhitespace, setTrimWhitespace] = useState(true)
  const [removeEmpty, setRemoveEmpty] = useState(false)
  const [keepLast, setKeepLast] = useState(false)
  const [sortMode, setSortMode] = useState<'order' | 'az' | 'za'>('order')
  const [copied, setCopied] = useState(false)

  function process(text: string) {
    let lines = text.split('\n')
    if (trimWhitespace) lines = lines.map(l => l.trim())
    if (removeEmpty) lines = lines.filter(l => l.length > 0)
    const seen = new Set<string>()
    let unique: string[]
    if (!keepLast) {
      unique = lines.filter(l => {
        const key = caseInsensitive ? l.toLowerCase() : l
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
    } else {
      const reversed = [...lines].reverse()
      const uniq = reversed.filter(l => {
        const key = caseInsensitive ? l.toLowerCase() : l
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
      unique = uniq.reverse()
    }
    if (sortMode === 'az') unique.sort((a, b) => a.localeCompare(b))
    if (sortMode === 'za') unique.sort((a, b) => b.localeCompare(a))
    return unique
  }

  const inputLines = input.split('\n').length
  const result = process(input)
  const outputLines = result.length
  const dupsRemoved = inputLines - outputLines

  const copy = () => {
    navigator.clipboard.writeText(result.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const checkStyle = (checked: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '8px 12px', borderRadius: '8px', background: checked ? '#FFF7ED' : '#f8fafc', border: `1.5px solid ${checked ? '#E85D04' : '#e2e8f0'}`, fontSize: '14px', fontWeight: 600, color: checked ? '#E85D04' : '#64748b', userSelect: 'none' as const
  })

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🗑️</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Remove Duplicate Lines</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Remove duplicate lines from any text with advanced options</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Options */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' as const, marginBottom: '20px' }}>
          <label style={checkStyle(caseInsensitive)}>
            <input type="checkbox" checked={caseInsensitive} onChange={e => setCaseInsensitive(e.target.checked)} style={{ display: 'none' }} />
            {caseInsensitive ? '☑' : '☐'} Case-insensitive
          </label>
          <label style={checkStyle(trimWhitespace)}>
            <input type="checkbox" checked={trimWhitespace} onChange={e => setTrimWhitespace(e.target.checked)} style={{ display: 'none' }} />
            {trimWhitespace ? '☑' : '☐'} Trim whitespace
          </label>
          <label style={checkStyle(removeEmpty)}>
            <input type="checkbox" checked={removeEmpty} onChange={e => setRemoveEmpty(e.target.checked)} style={{ display: 'none' }} />
            {removeEmpty ? '☑' : '☐'} Remove empty lines
          </label>
          <label style={checkStyle(keepLast)}>
            <input type="checkbox" checked={keepLast} onChange={e => setKeepLast(e.target.checked)} style={{ display: 'none' }} />
            {keepLast ? '☑' : '☐'} Keep last occurrence
          </label>
        </div>

        {/* Sort */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {(['order', 'az', 'za'] as const).map(s => (
            <button key={s} onClick={() => setSortMode(s)}
              style={{ padding: '8px 16px', borderRadius: '8px', border: '1.5px solid', borderColor: sortMode === s ? '#0F2A4A' : '#e2e8f0', background: sortMode === s ? '#0F2A4A' : 'white', color: sortMode === s ? 'white' : '#64748b', fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
              {s === 'order' ? 'Keep Order' : s === 'az' ? 'A–Z' : 'Z–A'}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'Original lines', val: inputLines },
            { label: 'Duplicates removed', val: Math.max(0, dupsRemoved) },
            { label: 'Unique lines', val: outputLines },
          ].map(s => (
            <div key={s.label} style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px', textAlign: 'center' as const }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#0F2A4A', fontFamily: "'Space Grotesk',system-ui,sans-serif" }}>{s.val}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px', display: 'block' }}>Input (one item per line)</label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={'apple\nbanana\napple\norange\nbanana'}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'monospace', resize: 'vertical' as const, outline: 'none', boxSizing: 'border-box' as const, minHeight: '280px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px', display: 'block' }}>Result</label>
            <textarea
              value={result.join('\n')}
              readOnly
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'monospace', resize: 'vertical' as const, outline: 'none', boxSizing: 'border-box' as const, minHeight: '280px', background: '#f8fafc' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '16px' }}>
          <button onClick={copy}
            style={{ background: copied ? '#16A34A' : '#E85D04', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            {copied ? '✓ Copied!' : 'Copy Result'}
          </button>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
