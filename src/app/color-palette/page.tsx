'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, Math.round(l * 100)]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  const h = max === r ? ((g - b) / d + (g < b ? 6 : 0)) / 6
    : max === g ? ((b - r) / d + 2) / 6
    : ((r - g) / d + 4) / 6
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hslToHex(h: number, s: number, l: number): string {
  const sl = s / 100, ll = l / 100
  const c = (1 - Math.abs(2 * ll - 1)) * sl
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = ll - c / 2
  let r = 0, g = 0, b = 0
  if (h < 60) { r = c; g = x }
  else if (h < 120) { r = x; g = c }
  else if (h < 180) { g = c; b = x }
  else if (h < 240) { g = x; b = c }
  else if (h < 300) { r = x; b = c }
  else { r = c; b = x }
  return '#' + [r + m, g + m, b + m].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('')
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const hex = hslToHex(h, s, l)
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)]
}

type PaletteMode = 'monochromatic' | 'analogous' | 'complementary' | 'triadic' | 'tetradic'

function generatePalette(hex: string, mode: PaletteMode): string[] {
  const [h, s, l] = hexToHsl(hex)
  let colors: string[] = []
  switch (mode) {
    case 'monochromatic':
      colors = [10, 30, 50, 70, 90].map(ll => hslToHex(h, s, ll))
      break
    case 'analogous':
      colors = [h - 30, h - 15, h, h + 15, h + 30].map(hh => hslToHex(((hh % 360) + 360) % 360, s, l))
      break
    case 'complementary': {
      const base = [hslToHex(h, s, 30), hslToHex(h, s, 50), hslToHex(h, s, 70)]
      const comp = [hslToHex((h + 180) % 360, s, 30), hslToHex((h + 180) % 360, s, 70)]
      colors = [...base, ...comp]
      break
    }
    case 'triadic': {
      const t1 = [hslToHex(h, s, l), hslToHex(h, s, Math.min(l + 20, 90))]
      const t2 = [hslToHex((h + 120) % 360, s, l), hslToHex((h + 120) % 360, s, Math.min(l + 20, 90))]
      const t3 = [hslToHex((h + 240) % 360, s, l)]
      colors = [...t1, ...t2, ...t3]
      break
    }
    case 'tetradic': {
      colors = [h, h + 90, h + 180, h + 270].map(hh => hslToHex(hh % 360, s, l))
      colors.push(hslToHex(h, s, Math.min(l + 25, 90)))
      break
    }
  }
  return colors.slice(0, 5)
}

export default function ColorPalettePage() {
  const [baseColor, setBaseColor] = useState('#E85D04')
  const [mode, setMode] = useState<PaletteMode>('monochromatic')
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const palette = generatePalette(baseColor, mode)

  const randomColor = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    setBaseColor('#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join(''))
  }

  const copySwatch = (hex: string, i: number) => {
    navigator.clipboard.writeText(hex)
    setCopiedIdx(i)
    setTimeout(() => setCopiedIdx(null), 1500)
  }

  const exportCSS = () => {
    const css = ':root {\n' + palette.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n') + '\n}'
    const a = document.createElement('a')
    a.href = 'data:text/css;charset=utf-8,' + encodeURIComponent(css)
    a.download = 'palette.css'
    a.click()
  }

  const exportJSON = () => {
    const json = JSON.stringify(palette.reduce((obj, c, i) => ({ ...obj, [`color${i + 1}`]: c }), {}), null, 2)
    const a = document.createElement('a')
    a.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(json)
    a.download = 'palette.json'
    a.click()
  }

  const modes: PaletteMode[] = ['monochromatic', 'analogous', 'complementary', 'triadic', 'tetradic']

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🎨</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Color Palette Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Generate beautiful palettes from any base color</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Controls */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' as const, alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A' }}>Base Color</label>
            <input type="color" value={baseColor} onChange={e => setBaseColor(e.target.value)}
              style={{ width: '48px', height: '48px', border: '1.5px solid #e2e8f0', borderRadius: '10px', cursor: 'pointer', padding: '2px' }} />
            <span style={{ fontSize: '14px', fontFamily: 'monospace', color: '#0F2A4A', fontWeight: 700 }}>{baseColor.toUpperCase()}</span>
          </div>
          <button onClick={randomColor}
            style={{ background: 'white', color: '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            🎲 Random Color
          </button>
        </div>

        {/* Mode selector */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const, marginBottom: '28px' }}>
          {modes.map(m => (
            <button key={m} onClick={() => setMode(m)}
              style={{ padding: '10px 18px', borderRadius: '10px', border: '1.5px solid', borderColor: mode === m ? '#E85D04' : '#e2e8f0', background: mode === m ? '#E85D04' : 'white', color: mode === m ? 'white' : '#0F2A4A', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' as const }}>
              {m}
            </button>
          ))}
        </div>

        {/* Palette swatches */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '16px', marginBottom: '28px' }}>
          {palette.map((hex, i) => {
            const [h, s, l] = hexToHsl(hex)
            const [r, g, b] = hslToRgb(h, s, l)
            return (
              <div key={i} style={{ borderRadius: '16px', overflow: 'hidden', border: '1.5px solid #e2e8f0', cursor: 'pointer' }} onClick={() => copySwatch(hex, i)}>
                <div style={{ height: '120px', background: hex, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {copiedIdx === i && <span style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '999px', padding: '4px 12px', fontSize: '12px', fontWeight: 700 }}>✓ Copied!</span>}
                </div>
                <div style={{ padding: '12px', background: 'white' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'monospace', color: '#0F2A4A', marginBottom: '4px' }}>{hex.toUpperCase()}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>rgb({r},{g},{b})</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>hsl({h},{s}%,{l}%)</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Export buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' as const }}>
          <button onClick={exportCSS}
            style={{ background: '#E85D04', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Export CSS Variables
          </button>
          <button onClick={exportJSON}
            style={{ background: 'white', color: '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            Export JSON
          </button>
        </div>
        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>Click any swatch to copy its HEX value</p>
      </div>
    </div>
  )
}
