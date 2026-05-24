'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

const STOP_WORDS = new Set([
  'the','a','an','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','must','shall','to','of','in','for','on','with','at','by','from','or','and','but','if','as','it','its','this','that','these','those',
])

type SortKey = 'freq-desc' | 'freq-asc' | 'alpha-asc' | 'alpha-desc'

export default function WordFrequencyPage() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog. The dog barked. The fox ran away.')
  const [excludeStop, setExcludeStop] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey>('freq-desc')

  const data = useMemo(() => {
    const words = text.toLowerCase().match(/[a-z']+/g) || []
    const filtered = excludeStop ? words.filter(w => !STOP_WORDS.has(w)) : words
    const map: Record<string, number> = {}
    filtered.forEach(w => { map[w] = (map[w] || 0) + 1 })
    let entries = Object.entries(map)
    switch (sortKey) {
      case 'freq-desc': entries.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])); break
      case 'freq-asc': entries.sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0])); break
      case 'alpha-asc': entries.sort((a, b) => a[0].localeCompare(b[0])); break
      case 'alpha-desc': entries.sort((a, b) => b[0].localeCompare(a[0])); break
    }
    const total = filtered.length
    const unique = entries.length
    const avgLen = total > 0 ? (filtered.reduce((s, w) => s + w.length, 0) / total).toFixed(1) : '0'
    return { entries, total, unique, avgLen }
  }, [text, excludeStop, sortKey])

  const top20 = useMemo(() => {
    return [...data.entries].sort((a, b) => b[1] - a[1]).slice(0, 20)
  }, [data.entries])

  const maxCount = top20[0]?.[1] || 1

  const downloadCSV = () => {
    const csv = 'rank,word,count,percentage\n' + data.entries.map((e, i) =>
      `${i + 1},${e[0]},${e[1]},${data.total > 0 ? ((e[1] / data.total) * 100).toFixed(2) : '0'}`
    ).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'word-frequency.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const sortBtn = (key: SortKey, label: string) => (
    <button onClick={() => setSortKey(key)} style={{
      padding: '6px 10px', borderRadius: '7px', border: '1.5px solid', borderColor: sortKey === key ? '#E85D04' : '#e2e8f0',
      background: sortKey === key ? '#FFF7ED' : 'white', color: sortKey === key ? '#C2410C' : '#64748b', fontFamily: 'inherit', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
    }}>{label}</button>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📊</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Word Frequency Counter</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Count word occurrences and visualise the most-used words.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your text here..."
          style={{ width: '100%', minHeight: '180px', padding: '16px', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '15px', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', outline: 'none', color: '#0F2A4A', lineHeight: 1.6 }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '12px', marginTop: '20px' }}>
          {[
            { label: 'Total words', val: data.total },
            { label: 'Unique words', val: data.unique },
            { label: 'Avg length', val: `${data.avgLen}` },
          ].map(s => (
            <div key={s.label} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '26px', fontWeight: 800, color: '#0F2A4A' }}>{s.val}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#0F2A4A', cursor: 'pointer' }}>
            <input type="checkbox" checked={excludeStop} onChange={e => setExcludeStop(e.target.checked)} /> Exclude stop words
          </label>
          <div style={{ width: '1px', height: '24px', background: '#e2e8f0' }} />
          {sortBtn('freq-desc', 'Freq ↓')}
          {sortBtn('freq-asc', 'Freq ↑')}
          {sortBtn('alpha-asc', 'A–Z')}
          {sortBtn('alpha-desc', 'Z–A')}
          <button onClick={downloadCSV} disabled={data.entries.length === 0} style={{
            marginLeft: 'auto', padding: '8px 14px', background: '#0F2A4A', color: 'white', border: 'none', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600, fontSize: '13px', cursor: data.entries.length === 0 ? 'not-allowed' : 'pointer', opacity: data.entries.length === 0 ? 0.5 : 1,
          }}>⬇ Download CSV</button>
        </div>

        {top20.length > 0 && (
          <div style={{ marginTop: '24px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
            <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '18px', fontWeight: 700, color: '#0F2A4A', margin: '0 0 14px' }}>Top 20 most frequent words</h2>
            {top20.map(([w, c]) => (
              <div key={w} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A' }}>{w}</span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>{c}</span>
                </div>
                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(c / maxCount) * 100}%`, background: '#E85D04', borderRadius: '999px' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {data.entries.length > 0 && (
          <div style={{ marginTop: '24px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>#</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Word</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Count</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>%</th>
                </tr>
              </thead>
              <tbody>
                {data.entries.slice(0, 200).map(([w, c], i) => (
                  <tr key={w} style={{ borderTop: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px 12px', fontSize: '13px', color: '#94a3b8' }}>{i + 1}</td>
                    <td style={{ padding: '10px 12px', fontSize: '13px', color: '#0F2A4A', fontWeight: 600 }}>{w}</td>
                    <td style={{ padding: '10px 12px', fontSize: '13px', color: '#0F2A4A', textAlign: 'right' }}>{c}</td>
                    <td style={{ padding: '10px 12px', fontSize: '13px', color: '#64748b', textAlign: 'right' }}>{data.total > 0 ? ((c / data.total) * 100).toFixed(1) : '0'}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  )
}
