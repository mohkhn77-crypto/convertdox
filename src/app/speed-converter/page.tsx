'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

const TO_MS: Record<string, number> = {
  mph: 0.44704, 'km/h': 0.27778, 'm/s': 1, knots: 0.514444, mach: 340.29, 'ft/s': 0.3048,
}

const UNITS: { key: string; label: string }[] = [
  { key: 'mph', label: 'Miles per hour (mph)' },
  { key: 'km/h', label: 'Kilometers per hour (km/h)' },
  { key: 'm/s', label: 'Meters per second (m/s)' },
  { key: 'knots', label: 'Knots (kn)' },
  { key: 'mach', label: 'Mach (speed of sound)' },
  { key: 'ft/s', label: 'Feet per second (ft/s)' },
]

const PRESETS = [
  { label: 'Walking', kmh: 5 },
  { label: 'Running', kmh: 12 },
  { label: 'Car highway', kmh: 100 },
  { label: 'Speed of sound', kmh: 1235 },
  { label: 'Speed of light', kmh: 1079252849 },
]

export default function SpeedConverterPage() {
  const [value, setValue] = useState('100')
  const [unit, setUnit] = useState('km/h')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [paceKm, setPaceKm] = useState('')

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 1500)
    })
  }

  function convert(targetKey: string): string {
    const num = parseFloat(value)
    if (isNaN(num)) return '—'
    const ms = num * TO_MS[unit]
    const result = ms / TO_MS[targetKey]
    if (Math.abs(result) >= 1e10 || (Math.abs(result) < 1e-8 && result !== 0)) return result.toExponential(6)
    return parseFloat(result.toPrecision(8)).toString()
  }

  function applyPreset(kmh: number) {
    setValue(String(kmh))
    setUnit('km/h')
  }

  // Pace converter: min/km to min/mile and vice versa
  const paceKmNum = parseFloat(paceKm)
  const paceMile = !isNaN(paceKmNum) && paceKmNum > 0 ? paceKmNum * 1.60934 : null
  const paceMileMin = paceMile ? Math.floor(paceMile) : null
  const paceMileSec = paceMile ? Math.round((paceMile - Math.floor(paceMile)) * 60) : null

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🚀</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Speed Converter</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Convert between mph, km/h, knots, mach and more</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Presets */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {PRESETS.map(p => (
            <button key={p.label} onClick={() => applyPreset(p.kmh)}
              style={{ padding: '8px 14px', background: '#fee2e2', border: '1.5px solid #fca5a5', borderRadius: '8px', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, color: '#dc2626', cursor: 'pointer' }}>
              {p.label} ({p.kmh.toLocaleString()} km/h)
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
          <input
            type="number"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Enter speed"
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
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

        {/* Runner pace converter */}
        <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
          <h3 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '16px', fontWeight: 700, color: '#0F2A4A', margin: '0 0 16px' }}>🏃 Runner Pace Converter</h3>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>Pace (min/km)</label>
              <input
                type="number"
                value={paceKm}
                onChange={e => setPaceKm(e.target.value)}
                placeholder="e.g. 5.5"
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontFamily: 'inherit', fontSize: '15px', outline: 'none', boxSizing: 'border-box' as const }}
              />
            </div>
            {paceMile !== null && (
              <div style={{ flex: 1, background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '10px', padding: '12px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#15803d', marginBottom: '4px' }}>min/mile</div>
                <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '20px', fontWeight: 800, color: '#15803d' }}>
                  {paceMileMin}:{String(paceMileSec).padStart(2, '0')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
