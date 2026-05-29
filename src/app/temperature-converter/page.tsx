'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

function toCelsius(val: number, unit: string): number {
  if (unit === 'C') return val
  if (unit === 'F') return (val - 32) * 5 / 9
  if (unit === 'K') return val - 273.15
  if (unit === 'R') return (val - 491.67) * 5 / 9
  if (unit === 'Re') return val * 5 / 4
  return val
}

function fromCelsius(c: number, unit: string): number {
  if (unit === 'C') return c
  if (unit === 'F') return c * 9 / 5 + 32
  if (unit === 'K') return c + 273.15
  if (unit === 'R') return (c + 273.15) * 9 / 5
  if (unit === 'Re') return c * 4 / 5
  return c
}

const UNITS = [
  { key: 'C', label: 'Celsius (°C)' },
  { key: 'F', label: 'Fahrenheit (°F)' },
  { key: 'K', label: 'Kelvin (K)' },
  { key: 'R', label: 'Rankine (°R)' },
  { key: 'Re', label: 'Réaumur (°Ré)' },
]

const PRESETS = [
  { label: 'Absolute zero', c: -273.15 },
  { label: 'Water freezes', c: 0 },
  { label: 'Room temp', c: 20 },
  { label: 'Body temp', c: 37 },
  { label: 'Water boils', c: 100 },
]

export default function TemperatureConverterPage() {
  const [value, setValue] = useState('0')
  const [unit, setUnit] = useState('C')

  const celsius = toCelsius(parseFloat(value) || 0, unit)

  function convert(targetUnit: string): string {
    const num = parseFloat(value)
    if (isNaN(num)) return '—'
    const c = toCelsius(num, unit)
    const result = fromCelsius(c, targetUnit)
    return parseFloat(result.toFixed(6)).toString()
  }

  function applyPreset(c: number) {
    setUnit('C')
    setValue(String(c))
  }

  // Color indicator
  const clampedC = Math.max(-50, Math.min(120, celsius))
  const t = (clampedC + 50) / 170 // 0-1
  const barColor = `hsl(${Math.round(240 - t * 240)}, 80%, 50%)`
  const barWidth = `${t * 100}%`

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🌡️</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Temperature Converter</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Convert between Celsius, Fahrenheit, Kelvin, and more</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Presets */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {PRESETS.map(p => (
            <button key={p.label} onClick={() => applyPreset(p.c)}
              style={{ padding: '8px 14px', background: '#fee2e2', border: '1.5px solid #fca5a5', borderRadius: '8px', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, color: '#dc2626', cursor: 'pointer' }}>
              {p.label} ({p.c}°C)
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="number"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Enter temperature"
            style={{ flex: 2, padding: '14px 16px', border: '2px solid #e2e8f0', borderRadius: '12px', fontFamily: 'inherit', fontSize: '18px', outline: 'none', boxSizing: 'border-box' as const }}
          />
          <select
            value={unit}
            onChange={e => setUnit(e.target.value)}
            style={{ flex: 1, padding: '14px 16px', border: '2px solid #e2e8f0', borderRadius: '12px', fontFamily: 'inherit', fontSize: '14px', outline: 'none', background: 'white', cursor: 'pointer' }}
          >
            {UNITS.map(u => (
              <option key={u.key} value={u.key}>{u.label}</option>
            ))}
          </select>
        </div>

        {/* Temperature bar */}
        <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
            <span>Cold (-50°C)</span>
            <span style={{ fontWeight: 700, color: barColor }}>{celsius.toFixed(1)}°C</span>
            <span>Hot (120°C)</span>
          </div>
          <div style={{ background: '#f1f5f9', borderRadius: '999px', height: '12px', overflow: 'hidden' }}>
            <div style={{ background: barColor, width: barWidth, height: '100%', borderRadius: '999px', transition: 'width 0.3s, background 0.3s' }} />
          </div>
        </div>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {UNITS.map(u => {
            const result = convert(u.key)
            const isSelf = u.key === unit
            return (
              <div key={u.key} style={{ background: isSelf ? '#0F2A4A' : 'white', border: `1.5px solid ${isSelf ? '#0F2A4A' : '#e2e8f0'}`, borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: isSelf ? 'rgba(255,255,255,0.7)' : '#64748b' }}>{u.label}</span>
                <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '20px', fontWeight: 800, color: isSelf ? '#F48C42' : '#0F2A4A' }}>{result}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
