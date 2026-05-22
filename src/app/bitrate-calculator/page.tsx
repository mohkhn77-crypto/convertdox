'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

const PRESETS = [
  { label: 'MP3 128kbps', bitrate: 128 },
  { label: 'MP3 320kbps', bitrate: 320 },
  { label: 'Spotify HQ 320kbps', bitrate: 320 },
  { label: 'YouTube HD 4000kbps', bitrate: 4000 },
  { label: '4K Video 25000kbps', bitrate: 25000 },
]

export default function BitrateCalculatorPage() {
  const [bitrate, setBitrate] = useState('')
  const [duration, setDuration] = useState('')
  const [fileSize, setFileSize] = useState('')
  const [result, setResult] = useState<{ field: string; value: string } | null>(null)
  const [error, setError] = useState('')

  function calculate() {
    setError('')
    setResult(null)
    const b = bitrate ? parseFloat(bitrate) : null
    const d = duration ? parseFloat(duration) * 60 : null // minutes to seconds
    const s = fileSize ? parseFloat(fileSize) : null

    const filled = [b, d, s].filter(v => v !== null).length
    if (filled !== 2) {
      setError('Fill in exactly two fields and leave one empty to calculate.')
      return
    }

    if (!b && d !== null && s !== null) {
      const calc = (s * 8 * 1024) / d
      setResult({ field: 'Bitrate', value: `${calc.toFixed(2)} kbps` })
    } else if (!d && b !== null && s !== null) {
      const calc = (s * 8 * 1024) / b
      setResult({ field: 'Duration', value: `${(calc / 60).toFixed(2)} minutes (${Math.round(calc)} seconds)` })
    } else if (!s && b !== null && d !== null) {
      const calc = (b * d) / 8 / 1024
      setResult({ field: 'File Size', value: `${calc.toFixed(4)} MB` })
    }
  }

  function applyPreset(b: number) {
    setBitrate(String(b))
  }

  function clear() {
    setBitrate('')
    setDuration('')
    setFileSize('')
    setResult(null)
    setError('')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📻</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Bitrate Calculator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Calculate bitrate, file size, or duration — fill any two fields</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Presets */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Quick Presets</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {PRESETS.map(p => (
              <button key={p.label} onClick={() => applyPreset(p.bitrate)}
                style={{ padding: '8px 14px', background: '#fff7ed', border: '1.5px solid #fed7aa', borderRadius: '8px', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, color: '#c2410c', cursor: 'pointer' }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '20px', padding: '28px', marginBottom: '20px' }}>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 20px' }}>Fill in two fields and leave the third empty, then click Calculate.</p>

          {[
            { label: 'Bitrate (kbps)', value: bitrate, onChange: setBitrate, placeholder: 'e.g. 320' },
            { label: 'Duration (minutes)', value: duration, onChange: setDuration, placeholder: 'e.g. 3.5' },
            { label: 'File Size (MB)', value: fileSize, onChange: setFileSize, placeholder: 'e.g. 7.5' },
          ].map(field => (
            <div key={field.label} style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>{field.label}</label>
              <input
                type="number"
                min="0"
                step="any"
                value={field.value}
                onChange={e => { field.onChange(e.target.value); setResult(null); setError('') }}
                placeholder={field.placeholder}
                style={{ width: '100%', padding: '13px 16px', border: '2px solid #e2e8f0', borderRadius: '12px', fontFamily: 'inherit', fontSize: '15px', outline: 'none', boxSizing: 'border-box' as const }}
              />
            </div>
          ))}

          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <button onClick={calculate} style={{ flex: 2, padding: '15px', background: '#E85D04', color: 'white', border: 'none', borderRadius: '12px', fontFamily: 'inherit', fontSize: '16px', fontWeight: 800, cursor: 'pointer' }}>
              Calculate
            </button>
            <button onClick={clear} style={{ flex: 1, padding: '15px', background: 'white', color: '#64748b', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontFamily: 'inherit', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
              Clear
            </button>
          </div>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', border: '1.5px solid #fca5a5', borderRadius: '12px', padding: '14px', color: '#dc2626', fontWeight: 600, fontSize: '14px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        {result && (
          <div style={{ background: '#0F2A4A', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{result.field}</div>
            <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '32px', fontWeight: 800, color: '#F48C42' }}>{result.value}</div>
          </div>
        )}

        {/* Formulas */}
        <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px', marginTop: '24px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '12px' }}>Formulas Used</div>
          <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#64748b', lineHeight: '2' }}>
            <div>File Size (MB) = bitrate(kbps) × duration(s) / 8 / 1024</div>
            <div>Duration (s) = size(MB) × 8 × 1024 / bitrate(kbps)</div>
            <div>Bitrate (kbps) = size(MB) × 8 × 1024 / duration(s)</div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
