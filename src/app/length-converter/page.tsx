'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const TO_METERS: Record<string, number> = {
  mm: 0.001, cm: 0.01, m: 1, km: 1000,
  inch: 0.0254, foot: 0.3048, yard: 0.9144, mile: 1609.344, nmi: 1852,
}

const UNITS: { key: string; label: string }[] = [
  { key: 'mm', label: 'Millimeters (mm)' },
  { key: 'cm', label: 'Centimeters (cm)' },
  { key: 'm', label: 'Meters (m)' },
  { key: 'km', label: 'Kilometers (km)' },
  { key: 'inch', label: 'Inches (in)' },
  { key: 'foot', label: 'Feet (ft)' },
  { key: 'yard', label: 'Yards (yd)' },
  { key: 'mile', label: 'Miles (mi)' },
  { key: 'nmi', label: 'Nautical Miles (nmi)' },
]

const EXAMPLES = [
  { label: '1 meter', value: 1, unit: 'm' },
  { label: '1 foot', value: 1, unit: 'foot' },
  { label: '1 mile', value: 1, unit: 'mile' },
  { label: '1 km', value: 1, unit: 'km' },
]

export default function LengthConverterPage() {
  const [value, setValue] = useState('1')
  const [unit, setUnit] = useState('m')
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
    const meters = num * TO_METERS[unit]
    const result = meters / TO_METERS[targetKey]
    if (Math.abs(result) >= 1e10 || (Math.abs(result) < 1e-6 && result !== 0)) return result.toExponential(6)
    return parseFloat(result.toPrecision(10)).toString()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📏</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Length Converter</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Convert between all length units instantly</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Quick examples */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {EXAMPLES.map(ex => (
            <button key={ex.label} onClick={() => { setValue(String(ex.value)); setUnit(ex.unit) }}
              style={{ padding: '8px 16px', background: '#fff7ed', border: '1.5px solid #fed7aa', borderRadius: '8px', fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, color: '#c2410c', cursor: 'pointer' }}>
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
            style={{ flex: 1, padding: '14px 16px', border: '2px solid #e2e8f0', borderRadius: '12px', fontFamily: 'inherit', fontSize: '15px', outline: 'none', background: 'white', cursor: 'pointer' }}
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
              <div key={u.key} style={{ background: isSelf ? '#0F2A4A' : 'white', border: `1.5px solid ${isSelf ? '#0F2A4A' : '#e2e8f0'}`, borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: isSelf ? 'rgba(255,255,255,0.7)' : '#64748b' }}>{u.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '18px', fontWeight: 800, color: isSelf ? '#F48C42' : '#0F2A4A' }}>{result}</span>
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
    </div>
  )
}
