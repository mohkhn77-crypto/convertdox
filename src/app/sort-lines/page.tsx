'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

type SortMode = 'az' | 'za' | 'len-asc' | 'len-desc' | 'random'

export default function SortLinesPage() {
  const [input, setInput] = useState('')
  const [sortMode, setSortMode] = useState<SortMode>('az')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [numericSort, setNumericSort] = useState(false)
  const [removeDups, setRemoveDups] = useState(false)
  const [copied, setCopied] = useState(false)

  function sort(text: string): string[] {
    let lines = text.split('\n')
    if (removeDups) {
      const seen = new Set<string>()
      lines = lines.filter(l => {
        const k = caseSensitive ? l : l.toLowerCase()
        if (seen.has(k)) return false
        seen.add(k)
        return true
      })
    }
    if (sortMode === 'random') {
      for (let i = lines.length - 1; i > 0; i--) {
        // eslint-disable-next-line react-hooks/purity
        const j = Math.floor(Math.random() * (i + 1));
        [lines[i], lines[j]] = [lines[j], lines[i]]
      }
      return lines
    }
    lines.sort((a, b) => {
      if (sortMode === 'len-asc') return a.length - b.length
      if (sortMode === 'len-desc') return b.length - a.length
      if (numericSort) {
        const na = parseFloat(a), nb = parseFloat(b)
        if (!isNaN(na) && !isNaN(nb)) return sortMode === 'az' ? na - nb : nb - na
      }
      const ca = caseSensitive ? a : a.toLowerCase()
      const cb = caseSensitive ? b : b.toLowerCase()
      return sortMode === 'az' ? ca.localeCompare(cb) : cb.localeCompare(ca)
    })
    return lines
  }

  const result = input.trim() ? sort(input) : []
  const inputCount = input ? input.split('\n').length : 0
  const outputCount = result.length

  const copy = () => {
    navigator.clipboard.writeText(result.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const modes: { id: SortMode; label: string }[] = [
    { id: 'az', label: 'A–Z' },
    { id: 'za', label: 'Z–A' },
    { id: 'len-asc', label: 'Length ↑' },
    { id: 'len-desc', label: 'Length ↓' },
    { id: 'random', label: 'Random Shuffle' },
  ]

  const checkStyle = (checked: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '8px 12px', borderRadius: '8px', background: checked ? '#FFF7ED' : '#f8fafc', border: `1.5px solid ${checked ? '#E85D04' : '#e2e8f0'}`, fontSize: '14px', fontWeight: 600, color: checked ? '#E85D04' : '#64748b', userSelect: 'none' as const
  })

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🔤</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Sort Lines</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Sort lines alphabetically, by length, or shuffle randomly</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Sort mode */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const, marginBottom: '16px' }}>
          {modes.map(m => (
            <button key={m.id} onClick={() => setSortMode(m.id)}
              style={{ padding: '10px 18px', borderRadius: '10px', border: '1.5px solid', borderColor: sortMode === m.id ? '#E85D04' : '#e2e8f0', background: sortMode === m.id ? '#E85D04' : 'white', color: sortMode === m.id ? 'white' : '#0F2A4A', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
              {m.label}
            </button>
          ))}
        </div>

        {/* Options */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' as const, marginBottom: '20px' }}>
          <label style={checkStyle(caseSensitive)}>
            <input type="checkbox" checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)} style={{ display: 'none' }} />
            {caseSensitive ? '☑' : '☐'} Case sensitive
          </label>
          <label style={checkStyle(numericSort)}>
            <input type="checkbox" checked={numericSort} onChange={e => setNumericSort(e.target.checked)} style={{ display: 'none' }} />
            {numericSort ? '☑' : '☐'} Numeric sort (1, 2, 10…)
          </label>
          <label style={checkStyle(removeDups)}>
            <input type="checkbox" checked={removeDups} onChange={e => setRemoveDups(e.target.checked)} style={{ display: 'none' }} />
            {removeDups ? '☑' : '☐'} Remove duplicates
          </label>
        </div>

        {/* Line counts */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' as const }}>
          <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '10px 18px', fontSize: '14px', fontWeight: 600, color: '#0F2A4A' }}>Input: {inputCount} lines</div>
          <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '10px 18px', fontSize: '14px', fontWeight: 600, color: '#E85D04' }}>Output: {outputCount} lines</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px', display: 'block' }}>Input</label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={'banana\napple\ncherry\ndate'}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'monospace', resize: 'vertical' as const, outline: 'none', boxSizing: 'border-box' as const, minHeight: '280px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px', display: 'block' }}>Sorted Result</label>
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
    </div>
  )
}
