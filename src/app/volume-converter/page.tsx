'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

const TO_ML: Record<string, number> = {
  ml: 1, l: 1000, m3: 1000000,
  tsp: 4.929, tbsp: 14.787, 'fl-oz-us': 29.574, cup: 236.588, 'pint-us': 473.176, 'quart-us': 946.353, 'gallon-us': 3785.41,
  'fl-oz-uk': 28.413, 'pint-uk': 568.261, 'gallon-uk': 4546.09,
}

const UNITS: { key: string; label: string }[] = [
  { key: 'ml', label: 'Milliliters (ml)' },
  { key: 'l', label: 'Liters (L)' },
  { key: 'm3', label: 'Cubic Meters (m³)' },
  { key: 'tsp', label: 'Teaspoons (tsp)' },
  { key: 'tbsp', label: 'Tablespoons (tbsp)' },
  { key: 'fl-oz-us', label: 'Fluid Oz US (fl oz)' },
  { key: 'cup', label: 'Cups (US)' },
  { key: 'pint-us', label: 'Pints US (pt)' },
  { key: 'quart-us', label: 'Quarts US (qt)' },
  { key: 'gallon-us', label: 'Gallons US (gal)' },
  { key: 'fl-oz-uk', label: 'Fluid Oz UK' },
  { key: 'pint-uk', label: 'Pints UK' },
  { key: 'gallon-uk', label: 'Gallons UK' },
]

const EXAMPLES = [
  { label: '1 cup', value: 1, unit: 'cup' },
  { label: '1 liter', value: 1, unit: 'l' },
  { label: '1 gallon (US)', value: 1, unit: 'gallon-us' },
]

export default function VolumeConverterPage() {
  const [value, setValue] = useState('1')
  const [unit, setUnit] = useState('l')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 1500)
    })
  }

  function convert(targetKey: string): string {
    const num = parseFloat(value)
    if (isNaN(num)) return '—'
    const ml = num * TO_ML[unit]
    const result = ml / TO_ML[targetKey]
    if (Math.abs(result) >= 1e9 || (Math.abs(result) < 1e-6 && result !== 0)) return result.toExponential(6)
    return parseFloat(result.toPrecision(8)).toString()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🧪</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Volume Converter</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Convert between all volume units including US and UK measurements</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Quick examples */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {EXAMPLES.map(ex => (
            <button key={ex.label} onClick={() => { setValue(String(ex.value)); setUnit(ex.unit) }}
              style={{ padding: '8px 16px', background: '#cffafe', border: '1.5px solid #67e8f9', borderRadius: '8px', fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, color: '#0e7490', cursor: 'pointer' }}>
              {ex.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
          <input
            type="number"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Enter value"
            style={{ flex: 2, padding: '14px 16px', border: '2px solid #e2e8f0', borderRadius: '12px', fontFamily: 'inherit', fontSize: '18px', outline: 'none', boxSizing: 'border-box' as const }}
          />
          <select
            value={unit}
            onChange={e => setUnit(e.target.value)}
            style={{ flex: 1, padding: '14px 16px', border: '2px solid #e2e8f0', borderRadius: '12px', fontFamily: 'inherit', fontSize: '13px', outline: 'none', background: 'white', cursor: 'pointer' }}
          >
            {UNITS.map(u => (
              <option key={u.key} value={u.key}>{u.label}</option>
            ))}
          </select>
        </div>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {UNITS.map(u => {
            const result = convert(u.key)
            const isSelf = u.key === unit
            return (
              <div key={u.key} style={{ background: isSelf ? '#0F2A4A' : 'white', border: `1.5px solid ${isSelf ? '#0F2A4A' : '#e2e8f0'}`, borderRadius: '12px', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: isSelf ? 'rgba(255,255,255,0.7)' : '#64748b' }}>{u.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '17px', fontWeight: 800, color: isSelf ? '#F48C42' : '#0F2A4A' }}>{result}</span>
                  <button onClick={() => copy(result, u.key)}
                    style={{ background: copiedKey === u.key ? '#dcfce7' : 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', fontWeight: 700, color: copiedKey === u.key ? '#16a34a' : isSelf ? 'white' : '#64748b', cursor: 'pointer' }}>
                    {copiedKey === u.key ? '✓' : 'Copy'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
