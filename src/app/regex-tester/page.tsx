'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import RelatedTools from '@/components/RelatedTools'
import TrustStrip from '@/components/TrustStrip'

const CHEAT_SHEET = [
  { pattern: '.', desc: 'Any character except newline' },
  { pattern: '\\d', desc: 'Digit [0-9]' },
  { pattern: '\\w', desc: 'Word char [a-zA-Z0-9_]' },
  { pattern: '\\s', desc: 'Whitespace' },
  { pattern: '^', desc: 'Start of string' },
  { pattern: '$', desc: 'End of string' },
  { pattern: '*', desc: '0 or more' },
  { pattern: '+', desc: '1 or more' },
  { pattern: '?', desc: '0 or 1 (optional)' },
  { pattern: '{n,m}', desc: 'Between n and m times' },
  { pattern: '[abc]', desc: 'Character class' },
  { pattern: '(abc)', desc: 'Capture group' },
  { pattern: 'a|b', desc: 'a or b' },
  { pattern: '\\b', desc: 'Word boundary' },
]

const SAMPLE_TEXT = `Hello World! My email is john@example.com and jane.doe@company.org
Phone: (555) 123-4567 or +1-800-555-0100
Visit https://www.example.com or http://test.org
Date: 2024-01-15 and 2023-12-31
IP: 192.168.1.100`

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')
  const [flags, setFlags] = useState('g')
  const [testStr, setTestStr] = useState(SAMPLE_TEXT)
  const [showCheat, setShowCheat] = useState(false)

  const toggleFlag = (f: string) => {
    setFlags(prev => prev.includes(f) ? prev.replace(f, '') : prev + f)
  }

  let regex: RegExp | null = null
  let regexError = ''
  let matches: RegExpMatchArray[] = []

  try {
    if (pattern) {
      regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
      const allMatches = [...testStr.matchAll(regex)]
      matches = allMatches
    }
  } catch (e) {
    regexError = e instanceof Error ? e.message : 'Invalid regex'
  }

  // Build highlighted text
  function buildHighlighted() {
    if (!regex || regexError || !pattern) return [{ text: testStr, match: false }]
    const parts: { text: string; match: boolean }[] = []
    let lastIdx = 0
    const gRegex = new RegExp(pattern, 'g' + flags.replace('g', ''))
    let m: RegExpExecArray | null
    gRegex.lastIndex = 0
    while ((m = gRegex.exec(testStr)) !== null) {
      if (m.index > lastIdx) parts.push({ text: testStr.slice(lastIdx, m.index), match: false })
      parts.push({ text: m[0], match: true })
      lastIdx = m.index + m[0].length
      if (m[0].length === 0) { gRegex.lastIndex++; continue }
    }
    if (lastIdx < testStr.length) parts.push({ text: testStr.slice(lastIdx), match: false })
    return parts
  }

  const parts = buildHighlighted()

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🔍</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Regex Tester</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Test and debug regular expressions with real-time match highlighting</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Pattern input */}
        <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'stretch', marginBottom: '12px' }}>
            <div style={{ background: '#0F2A4A', color: 'rgba(255,255,255,0.5)', padding: '10px 14px', borderRadius: '8px 0 0 8px', fontSize: '16px', fontFamily: 'monospace', display: 'flex', alignItems: 'center' }}>/</div>
            <input value={pattern} onChange={e => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: 0, fontSize: '15px', fontFamily: 'monospace', outline: 'none', background: 'white' }} />
            <div style={{ background: '#0F2A4A', color: 'rgba(255,255,255,0.5)', padding: '10px 8px', fontSize: '16px', fontFamily: 'monospace', display: 'flex', alignItems: 'center' }}>/</div>
            <input value={flags} onChange={e => setFlags(e.target.value)}
              placeholder="flags"
              style={{ width: '60px', padding: '10px 10px', border: '1.5px solid #e2e8f0', borderRadius: '0 8px 8px 0', fontSize: '15px', fontFamily: 'monospace', outline: 'none', background: 'white' }} />
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[['g', 'Global'], ['i', 'Case insensitive'], ['m', 'Multiline'], ['s', 'Dot all']].map(([f, label]) => (
              <button key={f} onClick={() => toggleFlag(f)}
                style={{ padding: '4px 12px', borderRadius: '6px', border: '1.5px solid', borderColor: flags.includes(f) ? '#E85D04' : '#e2e8f0', background: flags.includes(f) ? '#FFF7ED' : 'white', color: flags.includes(f) ? '#E85D04' : '#64748b', fontFamily: 'monospace', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}>
                {f} — {label}
              </button>
            ))}
          </div>
        </div>

        {regexError && (
          <div style={{ background: '#FEE2E2', border: '1.5px solid #DC2626', borderRadius: '10px', padding: '10px 14px', marginBottom: '12px', color: '#DC2626', fontSize: '13px' }}>
            {regexError}
          </div>
        )}

        {/* Stats */}
        {!regexError && pattern && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: '6px', padding: '4px 12px', fontSize: '13px', fontWeight: 700, color: '#15803D' }}>
              {matches.length} match{matches.length !== 1 ? 'es' : ''}
            </span>
            {matches.length > 0 && matches[0].length > 1 && (
              <span style={{ background: '#EDE9FE', border: '1px solid #7C3AED', borderRadius: '6px', padding: '4px 12px', fontSize: '13px', fontWeight: 700, color: '#5B21B6' }}>
                {matches[0].length - 1} capture group{matches[0].length > 2 ? 's' : ''}
              </span>
            )}
          </div>
        )}

        {/* Test string with highlights */}
        <div style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 700, color: '#0F2A4A' }}>Test String</div>
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <textarea value={testStr} onChange={e => setTestStr(e.target.value)} rows={8}
            style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'monospace', resize: 'vertical', outline: 'none', boxSizing: 'border-box' as const, background: 'transparent', position: 'relative', zIndex: 1, color: '#0F2A4A' }} />
        </div>

        {/* Match preview */}
        {!regexError && pattern && matches.length > 0 && (
          <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '10px' }}>Match Preview</div>
            <div style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {parts.map((p, i) => (
                p.match
                  ? <mark key={i} style={{ background: '#FEF3C7', borderRadius: '3px', padding: '1px 2px', color: '#92400E', fontWeight: 600 }}>{p.text}</mark>
                  : <span key={i}>{p.text}</span>
              ))}
            </div>
          </div>
        )}

        {/* Captured groups */}
        {!regexError && matches.length > 0 && matches[0].length > 1 && (
          <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '10px' }}>Captured Groups (first match)</div>
            {matches[0].slice(1).map((g, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', padding: '6px 0', borderBottom: '1px solid #e2e8f0', fontSize: '13px' }}>
                <span style={{ color: '#7C3AED', fontWeight: 700, fontFamily: 'monospace' }}>Group {i + 1}</span>
                <span style={{ fontFamily: 'monospace', color: '#0F2A4A' }}>{g ?? '(no match)'}</span>
              </div>
            ))}
          </div>
        )}

        {/* Cheat sheet */}
        <button onClick={() => setShowCheat(s => !s)}
          style={{ background: 'white', color: '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '10px 18px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          {showCheat ? 'Hide' : 'Show'} Regex Cheat Sheet
        </button>
        {showCheat && (
          <div style={{ marginTop: '12px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '8px' }}>
              {CHEAT_SHEET.map(({ pattern: p, desc }) => (
                <div key={p} style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '6px 8px', background: 'white', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <code style={{ color: '#E85D04', fontWeight: 700, fontSize: '14px', minWidth: '60px' }}>{p}</code>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <RelatedTools currentPath="/regex-tester" />
    </div>
  )
}
