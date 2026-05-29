'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

interface Shadow {
  h: number; v: number; blur: number; spread: number
  color: string; opacity: number; inset: boolean
}

const DEFAULT: Shadow = { h: 4, v: 4, blur: 10, spread: 0, color: '#000000', opacity: 25, inset: false }

const PRESETS: { name: string; shadow: Shadow }[] = [
  { name: 'Subtle', shadow: { h: 0, v: 2, blur: 8, spread: 0, color: '#000000', opacity: 10, inset: false } },
  { name: 'Elevated', shadow: { h: 0, v: 8, blur: 24, spread: -4, color: '#000000', opacity: 25, inset: false } },
  { name: 'Deep', shadow: { h: 0, v: 20, blur: 60, spread: -10, color: '#000000', opacity: 40, inset: false } },
  { name: 'Inset', shadow: { h: 0, v: 2, blur: 8, spread: 0, color: '#000000', opacity: 20, inset: true } },
]

function hexToRgb(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)]
}

function shadowToCss(s: Shadow): string {
  const [r, g, b] = hexToRgb(s.color)
  return `${s.inset ? 'inset ' : ''}${s.h}px ${s.v}px ${s.blur}px ${s.spread}px rgba(${r},${g},${b},${(s.opacity / 100).toFixed(2)})`
}

export default function BoxShadowPage() {
  const [shadows, setShadows] = useState<Shadow[]>([{ ...DEFAULT }])
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)

  const s = shadows[active] ?? DEFAULT

  function update(field: keyof Shadow, val: number | string | boolean) {
    setShadows(prev => prev.map((sh, i) => i === active ? { ...sh, [field]: val } : sh))
  }

  function addShadow() {
    setShadows(prev => [...prev, { ...DEFAULT }])
    setActive(shadows.length)
  }

  function removeShadow(i: number) {
    setShadows(prev => prev.filter((_, idx) => idx !== i))
    setActive(Math.max(0, active - 1))
  }

  function applyPreset(preset: Shadow) {
    setShadows(prev => prev.map((sh, i) => i === active ? { ...preset } : sh))
  }

  const css = `box-shadow: ${shadows.map(shadowToCss).join(',\n             ')};`

  const copy = () => {
    navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const SliderRow = ({ label, field, min, max }: { label: string; field: keyof Shadow; min: number; max: number }) => (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A' }}>{label}</label>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#E85D04', minWidth: '40px', textAlign: 'right' as const }}>{s[field] as number}px</span>
      </div>
      <input type="range" min={min} max={max} value={s[field] as number}
        onChange={e => update(field, Number(e.target.value))}
        style={{ width: '100%', accentColor: '#E85D04' }} />
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🖼️</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>CSS Box Shadow Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Visual box shadow builder with live preview</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '28px', alignItems: 'start' }}>
          {/* Preview + CSS */}
          <div>
            {/* Preview */}
            <div style={{ background: '#f1f5f9', borderRadius: '16px', padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', minHeight: '280px' }}>
              <div style={{ width: '200px', height: '200px', background: 'white', borderRadius: '12px', boxShadow: shadows.map(shadowToCss).join(', ') }} />
            </div>

            {/* CSS Output */}
            <div style={{ background: '#0F2A4A', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
              <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#F48C42', whiteSpace: 'pre-wrap' as const }}>{css}</pre>
            </div>

            <button onClick={copy}
              style={{ background: copied ? '#16A34A' : '#E85D04', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              {copied ? '✓ Copied!' : 'Copy CSS'}
            </button>
          </div>

          {/* Controls */}
          <div>
            {/* Shadow tabs */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' as const }}>
              {shadows.map((_, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <button onClick={() => setActive(i)}
                    style={{ padding: '6px 12px', borderRadius: '8px', border: '1.5px solid', borderColor: active === i ? '#E85D04' : '#e2e8f0', background: active === i ? '#E85D04' : 'white', color: active === i ? 'white' : '#64748b', fontFamily: 'inherit', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                    Shadow {i + 1}
                  </button>
                  {shadows.length > 1 && (
                    <button onClick={() => removeShadow(i)} style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '14px', padding: '0 4px' }}>×</button>
                  )}
                </div>
              ))}
              <button onClick={addShadow}
                style={{ padding: '6px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0', background: 'white', color: '#0F2A4A', fontFamily: 'inherit', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                + Add
              </button>
            </div>

            {/* Presets */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' as const }}>
              {PRESETS.map(p => (
                <button key={p.name} onClick={() => applyPreset(p.shadow)}
                  style={{ padding: '6px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0', background: 'white', color: '#0F2A4A', fontFamily: 'inherit', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                  {p.name}
                </button>
              ))}
            </div>

            <SliderRow label="H-Offset" field="h" min={-100} max={100} />
            <SliderRow label="V-Offset" field="v" min={-100} max={100} />
            <SliderRow label="Blur" field="blur" min={0} max={100} />
            <SliderRow label="Spread" field="spread" min={-50} max={50} />

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px', display: 'block' }}>Color</label>
              <input type="color" value={s.color} onChange={e => update('color', e.target.value)}
                style={{ width: '48px', height: '36px', border: '1.5px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', padding: '2px' }} />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A' }}>Opacity</label>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#E85D04' }}>{s.opacity}%</span>
              </div>
              <input type="range" min={0} max={100} value={s.opacity} onChange={e => update('opacity', Number(e.target.value))}
                style={{ width: '100%', accentColor: '#E85D04' }} />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '10px 12px', borderRadius: '8px', border: `1.5px solid ${s.inset ? '#E85D04' : '#e2e8f0'}`, background: s.inset ? '#FFF7ED' : '#f8fafc' }}>
              <input type="checkbox" checked={s.inset} onChange={e => update('inset', e.target.checked)} />
              <span style={{ fontSize: '14px', fontWeight: 600, color: s.inset ? '#E85D04' : '#64748b' }}>Inset shadow</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
