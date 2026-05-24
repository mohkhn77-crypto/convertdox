'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

type Dir = 'row' | 'column' | 'row-reverse' | 'column-reverse'
type Justify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
type Align = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'
type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse'

export default function FlexboxGeneratorPage() {
  const [dir, setDir] = useState<Dir>('row')
  const [justify, setJustify] = useState<Justify>('flex-start')
  const [align, setAlign] = useState<Align>('stretch')
  const [wrap, setWrap] = useState<Wrap>('nowrap')
  const [gap, setGap] = useState(8)
  const [items, setItems] = useState(3)
  const [copied, setCopied] = useState(false)

  const css = useMemo(() => (
    `display: flex;\nflex-direction: ${dir};\njustify-content: ${justify};\nalign-items: ${align};\nflex-wrap: ${wrap};\ngap: ${gap}px;`
  ), [dir, justify, align, wrap, gap])

  const copy = () => {
    navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const setPreset = (p: 'center' | 'navbar' | 'grid') => {
    if (p === 'center') { setDir('row'); setJustify('center'); setAlign('center'); setWrap('nowrap'); setGap(8) }
    if (p === 'navbar') { setDir('row'); setJustify('space-between'); setAlign('center'); setWrap('nowrap'); setGap(12) }
    if (p === 'grid') { setDir('row'); setJustify('flex-start'); setAlign('stretch'); setWrap('wrap'); setGap(12) }
  }

  const colors = ['#0F2A4A', '#E85D04', '#16A34A', '#3B82F6', '#9333EA', '#DC2626', '#0891B2', '#F59E0B']

  const btnGroup = <T extends string>(opts: readonly T[], val: T, set: (v: T) => void) => (
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {opts.map(o => (
        <button key={o} onClick={() => set(o)} style={{
          padding: '6px 10px', background: val === o ? '#E85D04' : 'white', color: val === o ? 'white' : '#0F2A4A',
          border: '1.5px solid #e2e8f0', borderRadius: '6px', fontFamily: 'inherit', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer',
        }}>{o}</button>
      ))}
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📐</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>CSS Flexbox Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Visual flexbox layout builder with live preview.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', alignSelf: 'center' }}>Presets:</span>
          <button onClick={() => setPreset('center')} style={{ padding: '6px 12px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: '#C2410C', cursor: 'pointer', fontFamily: 'inherit' }}>Centered content</button>
          <button onClick={() => setPreset('navbar')} style={{ padding: '6px 12px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: '#C2410C', cursor: 'pointer', fontFamily: 'inherit' }}>Space-between navbar</button>
          <button onClick={() => setPreset('grid')} style={{ padding: '6px 12px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: '#C2410C', cursor: 'pointer', fontFamily: 'inherit' }}>Card grid wrap</button>
        </div>
        <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>flex-direction</label>
            {btnGroup(['row','column','row-reverse','column-reverse'] as const, dir, setDir)}
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>justify-content</label>
            {btnGroup(['flex-start','center','flex-end','space-between','space-around','space-evenly'] as const, justify, setJustify)}
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>align-items</label>
            {btnGroup(['flex-start','center','flex-end','stretch','baseline'] as const, align, setAlign)}
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>flex-wrap</label>
            {btnGroup(['nowrap','wrap','wrap-reverse'] as const, wrap, setWrap)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>gap ({gap}px)</label>
              <input type="range" min={0} max={40} value={gap} onChange={e => setGap(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>items ({items})</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => setItems(Math.max(1, items - 1))} style={{ padding: '4px 12px', background: '#0F2A4A', color: 'white', border: 'none', borderRadius: '6px', fontFamily: 'inherit', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>−</button>
                <button onClick={() => setItems(Math.min(8, items + 1))} style={{ padding: '4px 12px', background: '#E85D04', color: 'white', border: 'none', borderRadius: '6px', fontFamily: 'inherit', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>+</button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Live preview</div>
          <div style={{
            display: 'flex', flexDirection: dir, justifyContent: justify, alignItems: align, flexWrap: wrap, gap: `${gap}px`,
            border: '2px dashed #cbd5e1', background: '#f8fafc', borderRadius: '10px', padding: '16px', minHeight: '220px',
          }}>
            {Array.from({ length: items }).map((_, i) => (
              <div key={i} style={{
                background: colors[i % colors.length], color: 'white',
                padding: '20px 24px', borderRadius: '8px', fontWeight: 700, fontSize: '16px',
                minWidth: '60px', textAlign: 'center',
              }}>{i + 1}</div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '20px', background: '#0F2A4A', borderRadius: '12px', padding: '20px', position: 'relative' }}>
          <button onClick={copy} style={{ position: 'absolute', top: '12px', right: '12px', padding: '6px 12px', background: copied ? '#16A34A' : '#E85D04', color: 'white', border: 'none', borderRadius: '6px', fontFamily: 'inherit', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>{copied ? '✓ Copied!' : '📋 Copy CSS'}</button>
          <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '13.5px', color: '#a5f3fc', whiteSpace: 'pre-wrap' }}>{css}</pre>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
