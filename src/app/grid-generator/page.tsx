'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const PASTELS = ['#FEE2E2','#FED7AA','#FEF3C7','#DCFCE7','#DBEAFE','#E0E7FF','#F3E8FF','#FCE7F3','#CFFAFE']

export default function GridGeneratorPage() {
  const [cols, setCols] = useState(3)
  const [rows, setRows] = useState(2)
  const [colGap, setColGap] = useState(12)
  const [rowGap, setRowGap] = useState(12)
  const [autoRow, setAutoRow] = useState(100)
  const [copied, setCopied] = useState(false)

  const colsTemplate = useMemo(() => Array(cols).fill('1fr').join(' '), [cols])
  const rowsTemplate = useMemo(() => `repeat(${rows}, ${autoRow}px)`, [rows, autoRow])

  const css = useMemo(() => (
    `display: grid;\ngrid-template-columns: ${colsTemplate};\ngrid-template-rows: repeat(${rows}, ${autoRow}px);\ncolumn-gap: ${colGap}px;\nrow-gap: ${rowGap}px;`
  ), [colsTemplate, rows, autoRow, colGap, rowGap])

  const copy = () => {
    navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const setPreset = (p: 'blog' | 'sidebar' | 'product' | 'dashboard') => {
    if (p === 'blog') { setCols(3); setRows(2); setColGap(20); setRowGap(20); setAutoRow(150) }
    if (p === 'sidebar') { setCols(2); setRows(3); setColGap(16); setRowGap(12); setAutoRow(120) }
    if (p === 'product') { setCols(4); setRows(2); setColGap(12); setRowGap(12); setAutoRow(140) }
    if (p === 'dashboard') { setCols(4); setRows(3); setColGap(14); setRowGap(14); setAutoRow(110) }
  }

  const totalCells = cols * rows

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>⊞</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>CSS Grid Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Visual CSS Grid builder with live preview.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', alignSelf: 'center' }}>Presets:</span>
          <button onClick={() => setPreset('blog')} style={{ padding: '6px 12px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: '#C2410C', cursor: 'pointer', fontFamily: 'inherit' }}>3-column blog</button>
          <button onClick={() => setPreset('sidebar')} style={{ padding: '6px 12px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: '#C2410C', cursor: 'pointer', fontFamily: 'inherit' }}>2-column sidebar</button>
          <button onClick={() => setPreset('product')} style={{ padding: '6px 12px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: '#C2410C', cursor: 'pointer', fontFamily: 'inherit' }}>4-column product grid</button>
          <button onClick={() => setPreset('dashboard')} style={{ padding: '6px 12px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: '#C2410C', cursor: 'pointer', fontFamily: 'inherit' }}>Dashboard</button>
        </div>
        <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '14px' }}>
          {[
            { label: `Columns (${cols})`, val: cols, set: setCols, min: 1, max: 6 },
            { label: `Rows (${rows})`, val: rows, set: setRows, min: 1, max: 6 },
            { label: `Column gap (${colGap}px)`, val: colGap, set: setColGap, min: 0, max: 40 },
            { label: `Row gap (${rowGap}px)`, val: rowGap, set: setRowGap, min: 0, max: 40 },
            { label: `Row height (${autoRow}px)`, val: autoRow, set: setAutoRow, min: 50, max: 300 },
          ].map(f => (
            <div key={f.label}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>{f.label}</label>
              <input type="range" min={f.min} max={f.max} value={f.val} onChange={e => f.set(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Live preview</div>
          <div style={{
            display: 'grid', gridTemplateColumns: colsTemplate, gridTemplateRows: rowsTemplate,
            columnGap: `${colGap}px`, rowGap: `${rowGap}px`,
            border: '2px dashed #cbd5e1', background: '#f8fafc', borderRadius: '10px', padding: '12px',
          }}>
            {Array.from({ length: totalCells }).map((_, i) => (
              <div key={i} style={{
                background: PASTELS[i % PASTELS.length], borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '20px', color: '#0F2A4A',
              }}>{i + 1}</div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '20px', background: '#0F2A4A', borderRadius: '12px', padding: '20px', position: 'relative' }}>
          <button onClick={copy} style={{ position: 'absolute', top: '12px', right: '12px', padding: '6px 12px', background: copied ? '#16A34A' : '#E85D04', color: 'white', border: 'none', borderRadius: '6px', fontFamily: 'inherit', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>{copied ? '✓ Copied!' : '📋 Copy CSS'}</button>
          <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '13.5px', color: '#a5f3fc', whiteSpace: 'pre-wrap' }}>{css}</pre>
        </div>
      </div>
    </div>
  )
}
