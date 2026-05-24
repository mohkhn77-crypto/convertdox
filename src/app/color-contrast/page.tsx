'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '').trim()
  if (h.length === 3) h = h.split('').map(c => c + c).join('')
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return [0, 0, 0]
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

function luminance(r: number, g: number, b: number): number {
  const f = (c: number) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

export default function ColorContrastPage() {
  const [fg, setFg] = useState('#0F2A4A')
  const [bg, setBg] = useState('#FFFFFF')

  const ratio = useMemo(() => {
    const [r1, g1, b1] = hexToRgb(fg)
    const [r2, g2, b2] = hexToRgb(bg)
    const l1 = luminance(r1, g1, b1)
    const l2 = luminance(r2, g2, b2)
    const light = Math.max(l1, l2)
    const dark = Math.min(l1, l2)
    return (light + 0.05) / (dark + 0.05)
  }, [fg, bg])

  const checks = [
    { label: 'AA Normal', threshold: 4.5, desc: 'Body text (under 18pt)' },
    { label: 'AA Large', threshold: 3.0, desc: 'Large text (18pt+)' },
    { label: 'AAA Normal', threshold: 7.0, desc: 'Enhanced body text' },
    { label: 'AAA Large', threshold: 4.5, desc: 'Enhanced large text' },
  ]

  const swap = () => { const t = fg; setFg(bg); setBg(t) }
  const failingAA = ratio < 4.5
  const suggestion = failingAA ? 'Try darkening the foreground or lightening the background.' : null

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>♿</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Color Contrast Checker</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>WCAG AA &amp; AAA accessibility contrast ratio checker.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '14px', alignItems: 'end' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Foreground</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input type="color" value={fg} onChange={e => setFg(e.target.value.toUpperCase())} style={{ width: '48px', height: '44px', border: '1.5px solid #e2e8f0', borderRadius: '8px', padding: '2px', cursor: 'pointer', background: 'white' }} />
                <input value={fg} onChange={e => setFg(e.target.value)} style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'monospace', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
            </div>
            <button onClick={swap} style={{ padding: '10px 14px', background: '#0F2A4A', color: 'white', border: 'none', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 700, fontSize: '13px', cursor: 'pointer', height: '44px' }}>⇄</button>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Background</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input type="color" value={bg} onChange={e => setBg(e.target.value.toUpperCase())} style={{ width: '48px', height: '44px', border: '1.5px solid #e2e8f0', borderRadius: '8px', padding: '2px', cursor: 'pointer', background: 'white' }} />
                <input value={bg} onChange={e => setBg(e.target.value)} style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'monospace', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Contrast ratio</div>
          <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '52px', fontWeight: 800, color: '#0F2A4A', lineHeight: 1 }}>{ratio.toFixed(2)}:1</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '12px', marginTop: '14px' }}>
          {checks.map(c => {
            const pass = ratio >= c.threshold
            return (
              <div key={c.label} style={{ background: pass ? '#F0FDF4' : '#FEF2F2', border: `2px solid ${pass ? '#16A34A' : '#DC2626'}`, borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: pass ? '#16A34A' : '#DC2626' }}>{pass ? '✓ Pass' : '✗ Fail'}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginTop: '4px' }}>{c.label}</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{c.threshold}:1 — {c.desc}</div>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: '20px', background: bg, border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '32px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: fg, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Sample text preview</div>
          <div style={{ color: fg, fontSize: '14px', fontWeight: 400, marginBottom: '10px' }}>14px regular — The quick brown fox jumps over the lazy dog.</div>
          <div style={{ color: fg, fontSize: '18px', fontWeight: 400, marginBottom: '10px' }}>18px regular — The quick brown fox jumps over the lazy dog.</div>
          <div style={{ color: fg, fontSize: '24px', fontWeight: 700 }}>24px bold — The quick brown fox jumps over the lazy dog.</div>
        </div>

        {suggestion && (
          <div style={{ marginTop: '14px', background: '#FFF7ED', border: '1.5px solid #FED7AA', borderRadius: '10px', padding: '12px 16px', fontSize: '13px', color: '#9A3412' }}>
            <strong>Suggestion:</strong> {suggestion}
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  )
}
