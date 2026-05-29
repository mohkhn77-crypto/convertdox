'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

type ColorMode = 'any' | 'pastel' | 'vibrant' | 'dark' | 'earth'

interface ColorInfo {
  hex: string
  rgb: string
  hsl: string
  h: number
  s: number
  l: number
}

function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100, ln = l / 100
  const a = sn * Math.min(ln, 1 - ln)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${r}, ${g}, ${b})`
}

function generateColor(mode: ColorMode): ColorInfo {
  let h: number, s: number, l: number
  if (mode === 'pastel') {
    h = Math.random() * 360; s = 30 + Math.random() * 30; l = 75 + Math.random() * 15
  } else if (mode === 'vibrant') {
    h = Math.random() * 360; s = 80 + Math.random() * 20; l = 45 + Math.random() * 20
  } else if (mode === 'dark') {
    h = Math.random() * 360; s = 40 + Math.random() * 40; l = 15 + Math.random() * 20
  } else if (mode === 'earth') {
    const useGreen = Math.random() > 0.5
    h = useGreen ? 80 + Math.random() * 60 : 10 + Math.random() * 40
    s = 20 + Math.random() * 30; l = 30 + Math.random() * 25
  } else {
    h = Math.random() * 360; s = Math.random() * 100; l = Math.random() * 100
  }
  h = Math.round(h); s = Math.round(s); l = Math.round(l)
  const hex = hslToHex(h, s, l)
  return { hex, rgb: hexToRgb(hex), hsl: `hsl(${h}, ${s}%, ${l}%)`, h, s, l }
}

export default function RandomColorPage() {
  const [mode, setMode] = useState<ColorMode>('any')
  const [mainColor, setMainColor] = useState<ColorInfo>(generateColor('any'))
  const [palette, setPalette] = useState<(ColorInfo | null)[]>([null, null, null, null, null])
  const [locked, setLocked] = useState<boolean[]>([false, false, false, false, false])
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 1500)
    })
  }

  function newColor() {
    setMainColor(generateColor(mode))
  }

  function generatePalette() {
    setPalette(prev => prev.map((c, i) => locked[i] ? c : generateColor(mode)))
  }

  function toggleLock(i: number) {
    setLocked(prev => prev.map((l, idx) => idx === i ? !l : l))
  }

  const MODES: { id: ColorMode; label: string }[] = [
    { id: 'any', label: 'Any' },
    { id: 'pastel', label: 'Pastel' },
    { id: 'vibrant', label: 'Vibrant' },
    { id: 'dark', label: 'Dark' },
    { id: 'earth', label: 'Earth' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🎨</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Random Color Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Generate beautiful random colors in multiple modes</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Mode selector */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {MODES.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)}
              style={{ padding: '9px 20px', borderRadius: '999px', border: '2px solid', borderColor: mode === m.id ? '#0F2A4A' : '#e2e8f0', background: mode === m.id ? '#0F2A4A' : 'white', color: mode === m.id ? 'white' : '#64748b', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
              {m.label}
            </button>
          ))}
        </div>

        {/* Main color card */}
        <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '24px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <div style={{ background: mainColor.hex, height: '200px' }} />
          <div style={{ background: 'white', padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            {[
              { label: 'HEX', value: mainColor.hex, key: 'hex-main' },
              { label: 'RGB', value: mainColor.rgb, key: 'rgb-main' },
              { label: 'HSL', value: mainColor.hsl, key: 'hsl-main' },
            ].map(item => (
              <div key={item.label} onClick={() => copy(item.value, item.key)} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '12px', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: copiedKey === item.key ? '#16a34a' : '#0F2A4A', fontFamily: 'monospace' }}>
                  {copiedKey === item.key ? 'Copied!' : item.value}
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: 'white', padding: '0 20px 20px', display: 'flex', gap: '10px' }}>
            <button onClick={newColor} style={{ flex: 1, padding: '14px', background: '#E85D04', color: 'white', border: 'none', borderRadius: '12px', fontFamily: 'inherit', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
              🎨 New Color
            </button>
          </div>
        </div>

        {/* Palette */}
        <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '20px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '18px', fontWeight: 700, color: '#0F2A4A', margin: 0 }}>Color Palette</h2>
            <button onClick={generatePalette} style={{ padding: '10px 20px', background: '#0F2A4A', color: 'white', border: 'none', borderRadius: '10px', fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
              Generate 5
            </button>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {palette.map((color, i) => (
              <div key={i} style={{ flex: 1, position: 'relative' }}>
                <div style={{ background: color ? color.hex : '#f1f5f9', height: '80px', borderRadius: '10px', border: '1.5px solid #e2e8f0' }} />
                <button
                  onClick={() => toggleLock(i)}
                  style={{ position: 'absolute', top: '4px', right: '4px', background: locked[i] ? '#0F2A4A' : 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '6px', padding: '3px 5px', fontSize: '12px', cursor: 'pointer' }}
                >
                  {locked[i] ? '🔒' : '🔓'}
                </button>
                {color && (
                  <div onClick={() => copy(color.hex, `pal-${i}`)} style={{ marginTop: '6px', textAlign: 'center', fontSize: '11px', fontFamily: 'monospace', color: copiedKey === `pal-${i}` ? '#16a34a' : '#64748b', cursor: 'pointer', fontWeight: 700 }}>
                    {copiedKey === `pal-${i}` ? 'Copied!' : color.hex}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Click any hex value to copy. Lock colors before regenerating to keep them.</p>
        </div>
      </div>
    </div>
  )
}
