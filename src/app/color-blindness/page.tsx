'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

type Mat = [[number, number, number], [number, number, number], [number, number, number]]

function applyMatrix(r: number, g: number, b: number, m: Mat): [number, number, number] {
  return [
    Math.min(255, Math.max(0, Math.round(m[0][0] * r + m[0][1] * g + m[0][2] * b))),
    Math.min(255, Math.max(0, Math.round(m[1][0] * r + m[1][1] * g + m[1][2] * b))),
    Math.min(255, Math.max(0, Math.round(m[2][0] * r + m[2][1] * g + m[2][2] * b))),
  ]
}

const matrices: Record<string, Mat> = {
  'Protanopia':    [[0.567, 0.433, 0], [0.558, 0.442, 0], [0, 0.242, 0.758]],
  'Deuteranopia':  [[0.625, 0.375, 0], [0.7, 0.3, 0], [0, 0.3, 0.7]],
  'Tritanopia':    [[0.95, 0.05, 0], [0, 0.433, 0.567], [0, 0.475, 0.525]],
  'Protanomaly':   [[0.817, 0.183, 0], [0.333, 0.667, 0], [0, 0.125, 0.875]],
  'Deuteranomaly': [[0.8, 0.2, 0], [0.258, 0.742, 0], [0, 0.142, 0.858]],
  'Tritanomaly':   [[0.967, 0.033, 0], [0, 0.733, 0.267], [0, 0.183, 0.817]],
  'Achromatopsia': [[0.299, 0.587, 0.114], [0.299, 0.587, 0.114], [0.299, 0.587, 0.114]],
  'Achromatomaly': [[0.618, 0.320, 0.062], [0.163, 0.775, 0.062], [0.163, 0.320, 0.516]],
}

const DESCRIPTIONS: Record<string, string> = {
  'Protanopia': 'Red-blind: Cannot perceive red light (1% of males)',
  'Deuteranopia': 'Green-blind: Cannot perceive green light (1% of males)',
  'Tritanopia': 'Blue-blind: Cannot perceive blue light (rare, <0.01%)',
  'Protanomaly': 'Red-weak: Reduced sensitivity to red light (1% of males)',
  'Deuteranomaly': 'Green-weak: Reduced sensitivity to green (5% of males)',
  'Tritanomaly': 'Blue-weak: Reduced sensitivity to blue (very rare)',
  'Achromatopsia': 'Total color blindness: Sees only shades of grey (rare)',
  'Achromatomaly': 'Partial color blindness: Very reduced color perception',
}

function hexToRgb(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)]
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
}

export default function ColorBlindnessPage() {
  const [color, setColor] = useState('#E85D04')
  const [copied, setCopied] = useState<string | null>(null)

  const [r, g, b] = hexToRgb(color)

  const simulations = Object.entries(matrices).map(([name, mat]) => {
    const [r2, g2, b2] = applyMatrix(r, g, b, mat)
    return { name, hex: rgbToHex(r2, g2, b2) }
  })

  const copy = (hex: string) => {
    navigator.clipboard.writeText(hex.toUpperCase())
    setCopied(hex)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>👁️</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Color Blindness Simulator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Test how your colors look to people with color vision deficiencies</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Color picker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' as const }}>
          <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A' }}>Select Color</label>
          <input type="color" value={color} onChange={e => setColor(e.target.value)}
            style={{ width: '56px', height: '56px', border: '1.5px solid #e2e8f0', borderRadius: '12px', cursor: 'pointer', padding: '2px' }} />
          <div style={{ width: '120px', height: '56px', background: color, borderRadius: '12px', border: '1.5px solid #e2e8f0' }} />
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'monospace', color: '#0F2A4A' }}>{color.toUpperCase()}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>rgb({r}, {g}, {b})</div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#16A34A' }}>Original Color</div>
          </div>
        </div>

        {/* Simulations grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '16px' }}>
          {simulations.map(({ name, hex }) => (
            <div key={name} style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => copy(hex)}>
              <div style={{ height: '80px', background: hex, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {copied === hex && <span style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '999px', padding: '4px 12px', fontSize: '12px', fontWeight: 700 }}>✓ Copied!</span>}
              </div>
              <div style={{ padding: '14px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '4px' }}>{name}</div>
                <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#E85D04', fontWeight: 600, marginBottom: '6px' }}>{hex.toUpperCase()}</div>
                <div style={{ fontSize: '11.5px', color: '#64748b', lineHeight: 1.4 }}>{DESCRIPTIONS[name]}</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '16px' }}>Click any swatch to copy its HEX value</p>
      </div>

      <SiteFooter />
    </div>
  )
}
