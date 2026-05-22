'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

interface Pair { find: string; replace: string }

export default function FindReplacePage() {
  const [text, setText] = useState('')
  const [pairs, setPairs] = useState<Pair[]>([{ find: '', replace: '' }])
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [wholeWord, setWholeWord] = useState(false)
  const [regexMode, setRegexMode] = useState(false)
  const [copied, setCopied] = useState(false)

  function getResult(): { text: string; count: number } {
    let result = text
    let totalCount = 0
    for (const pair of pairs) {
      if (!pair.find) continue
      try {
        let pattern: RegExp
        if (regexMode) {
          pattern = new RegExp(pair.find, caseSensitive ? 'g' : 'gi')
        } else {
          let escaped = pair.find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          if (wholeWord) escaped = `\\b${escaped}\\b`
          pattern = new RegExp(escaped, caseSensitive ? 'g' : 'gi')
        }
        const matches = result.match(pattern)
        if (matches) totalCount += matches.length
        result = result.replace(pattern, pair.replace)
      } catch { /* invalid regex */ }
    }
    return { text: result, count: totalCount }
  }

  const { text: previewText, count: matchCount } = getResult()

  function apply() {
    setText(previewText)
  }

  function addPair() {
    setPairs(p => [...p, { find: '', replace: '' }])
  }

  function updatePair(i: number, field: keyof Pair, val: string) {
    setPairs(p => p.map((pair, idx) => idx === i ? { ...pair, [field]: val } : pair))
  }

  function removePair(i: number) {
    setPairs(p => p.filter((_, idx) => idx !== i))
  }

  const copy = () => {
    navigator.clipboard.writeText(previewText)
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
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🔎</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Find & Replace</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Multi-pattern find and replace with regex support</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px', alignItems: 'start' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px', display: 'block' }}>Text</label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste your text here..."
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical' as const, outline: 'none', boxSizing: 'border-box' as const, minHeight: '200px' }}
            />

            {/* Preview */}
            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A' }}>Preview</label>
                {matchCount > 0 && (
                  <span style={{ background: '#E85D04', color: 'white', borderRadius: '999px', padding: '2px 10px', fontSize: '12px', fontWeight: 700 }}>{matchCount} match{matchCount !== 1 ? 'es' : ''}</span>
                )}
              </div>
              <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '12px 16px', minHeight: '120px', fontSize: '14px', fontFamily: 'inherit', whiteSpace: 'pre-wrap' as const, wordBreak: 'break-word' as const, color: '#0F2A4A' }}>
                {previewText || <span style={{ color: '#94a3b8' }}>Preview will appear here...</span>}
              </div>
            </div>

            <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
              <button onClick={apply} style={{ background: '#E85D04', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Apply</button>
              <button onClick={() => setText('')} style={{ background: 'white', color: '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Reset</button>
              <button onClick={copy} style={{ background: copied ? '#16A34A' : 'white', color: copied ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                {copied ? '✓ Copied!' : 'Copy Result'}
              </button>
            </div>
          </div>

          <div>
            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px', marginBottom: '16px' }}>
              <label style={checkStyle(caseSensitive)}>
                <input type="checkbox" checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)} style={{ display: 'none' }} />
                {caseSensitive ? '☑' : '☐'} Case sensitive
              </label>
              <label style={checkStyle(wholeWord)}>
                <input type="checkbox" checked={wholeWord} onChange={e => setWholeWord(e.target.checked)} style={{ display: 'none' }} />
                {wholeWord ? '☑' : '☐'} Whole word only
              </label>
              <label style={checkStyle(regexMode)}>
                <input type="checkbox" checked={regexMode} onChange={e => setRegexMode(e.target.checked)} style={{ display: 'none' }} />
                {regexMode ? '☑' : '☐'} Regex mode
              </label>
            </div>

            {/* Pairs */}
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px', display: 'block' }}>Find / Replace Pairs</label>
            {pairs.map((pair, i) => (
              <div key={i} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '12px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Pair {i + 1}</span>
                  {pairs.length > 1 && (
                    <button onClick={() => removePair(i)} style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Remove</button>
                  )}
                </div>
                <input
                  value={pair.find}
                  onChange={e => updatePair(i, 'find', e.target.value)}
                  placeholder="Find..."
                  style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' as const, marginBottom: '6px' }}
                />
                <input
                  value={pair.replace}
                  onChange={e => updatePair(i, 'replace', e.target.value)}
                  placeholder="Replace with..."
                  style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' as const }}
                />
              </div>
            ))}
            <button onClick={addPair} style={{ background: 'white', color: '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
              + Add Pair
            </button>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
