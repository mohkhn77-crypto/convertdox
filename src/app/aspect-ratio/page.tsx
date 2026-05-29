'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b) }

const PRESETS = [
  { label: '16:9', w: 1920, h: 1080 },
  { label: '4:3', w: 1024, h: 768 },
  { label: '1:1', w: 1080, h: 1080 },
  { label: '21:9', w: 2560, h: 1080 },
  { label: '9:16', w: 1080, h: 1920 },
  { label: '4:5', w: 1080, h: 1350 },
  { label: '3:2', w: 1500, h: 1000 },
]

const COMMON = [
  { name: '720p HD', w: 1280, h: 720 },
  { name: '1080p FHD', w: 1920, h: 1080 },
  { name: '1440p QHD', w: 2560, h: 1440 },
  { name: '4K UHD', w: 3840, h: 2160 },
  { name: '8K', w: 7680, h: 4320 },
  { name: 'iPhone 14', w: 1170, h: 2532 },
  { name: 'iPad (2022)', w: 2160, h: 1620 },
]

export default function AspectRatioPage() {
  const [width, setWidth] = useState('1920')
  const [height, setHeight] = useState('1080')
  const [locked, setLocked] = useState(false)

  const w = parseInt(width) || 0
  const h = parseInt(height) || 0
  const d = w > 0 && h > 0 ? gcd(w, h) : 1
  const ratioW = w > 0 && h > 0 ? w / d : 0
  const ratioH = w > 0 && h > 0 ? h / d : 0
  const mp = w > 0 && h > 0 ? (w * h / 1000000).toFixed(2) : '0'

  function handleWidth(val: string) {
    setWidth(val)
    if (locked && parseInt(val) > 0 && w > 0 && h > 0) {
      const newH = Math.round((parseInt(val) / w) * h)
      setHeight(String(newH))
    }
  }

  function handleHeight(val: string) {
    setHeight(val)
    if (locked && parseInt(val) > 0 && w > 0 && h > 0) {
      const newW = Math.round((parseInt(val) / h) * w)
      setWidth(String(newW))
    }
  }

  function applyPreset(pw: number, ph: number) {
    setWidth(String(pw))
    setHeight(String(ph))
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📐</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Aspect Ratio Calculator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Calculate ratios, scale dimensions, and explore resolutions</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Presets */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Quick Presets</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {PRESETS.map(p => (
              <button key={p.label} onClick={() => applyPreset(p.w, p.h)}
                style={{ padding: '8px 16px', background: '#dbeafe', border: '1.5px solid #93c5fd', borderRadius: '8px', fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, color: '#1d4ed8', cursor: 'pointer' }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          {/* Inputs */}
          <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '20px', padding: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>Width (px)</label>
              <input type="number" min="1" value={width} onChange={e => handleWidth(e.target.value)}
                style={{ width: '100%', padding: '13px 16px', border: '2px solid #e2e8f0', borderRadius: '12px', fontFamily: 'inherit', fontSize: '16px', outline: 'none', boxSizing: 'border-box' as const }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>Height (px)</label>
              <input type="number" min="1" value={height} onChange={e => handleHeight(e.target.value)}
                style={{ width: '100%', padding: '13px 16px', border: '2px solid #e2e8f0', borderRadius: '12px', fontFamily: 'inherit', fontSize: '16px', outline: 'none', boxSizing: 'border-box' as const }} />
            </div>
            <button onClick={() => setLocked(!locked)}
              style={{ width: '100%', padding: '12px', background: locked ? '#0F2A4A' : 'white', color: locked ? 'white' : '#64748b', border: '1.5px solid', borderColor: locked ? '#0F2A4A' : '#e2e8f0', borderRadius: '10px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
              {locked ? '🔒 Ratio Locked' : '🔓 Lock Ratio'}
            </button>
          </div>

          {/* Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: '#0F2A4A', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Aspect Ratio</div>
              <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '36px', fontWeight: 900, color: '#F48C42' }}>
                {w > 0 && h > 0 ? `${ratioW}:${ratioH}` : '—'}
              </div>
            </div>
            <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Megapixels</div>
              <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '24px', fontWeight: 800, color: '#0F2A4A' }}>{mp} MP</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Resolution</div>
              <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '20px', fontWeight: 800, color: '#0F2A4A' }}>{w} × {h}</div>
            </div>
          </div>
        </div>

        {/* Visual preview */}
        {w > 0 && h > 0 && (
          <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '14px' }}>Visual Preview</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                background: '#dbeafe',
                border: '2px solid #3b82f6',
                borderRadius: '4px',
                width: `${Math.min(300, 300 * (w / Math.max(w, h)))}px`,
                height: `${Math.min(200, 200 * (h / Math.max(w, h)))}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
                color: '#1d4ed8',
              }}>
                {ratioW}:{ratioH}
              </div>
            </div>
          </div>
        )}

        {/* Common resolutions */}
        <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', textTransform: 'uppercase', marginBottom: '14px' }}>Common Resolutions</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: '10px' }}>
            {COMMON.map(r => {
              const d2 = gcd(r.w, r.h)
              return (
                <button key={r.name} onClick={() => applyPreset(r.w, r.h)}
                  style={{ padding: '12px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: '#0F2A4A', marginBottom: '2px' }}>{r.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{r.w}×{r.h} ({r.w / d2}:{r.h / d2})</div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
