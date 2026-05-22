'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

interface Corners { tl: number; tr: number; br: number; bl: number }

const PRESETS: { name: string; value: string; corners: Corners }[] = [
  { name: 'Square', value: '0px', corners: { tl: 0, tr: 0, br: 0, bl: 0 } },
  { name: 'Rounded', value: '16px', corners: { tl: 16, tr: 16, br: 16, bl: 16 } },
  { name: 'Pill', value: '9999px', corners: { tl: 100, tr: 100, br: 100, bl: 100 } },
  { name: 'Circle', value: '50%', corners: { tl: 50, tr: 50, br: 50, bl: 50 } },
]

export default function BorderRadiusPage() {
  const [advanced, setAdvanced] = useState(false)
  const [simple, setSimple] = useState(16)
  const [corners, setCorners] = useState<Corners>({ tl: 16, tr: 16, br: 16, bl: 16 })
  const [leafMode, setLeafMode] = useState(false)
  const [copied, setCopied] = useState(false)

  const tl = advanced ? corners.tl : simple
  const tr = advanced ? corners.tr : simple
  const br = advanced ? corners.br : simple
  const bl = advanced ? corners.bl : simple

  const isUniform = tl === tr && tr === br && br === bl
  const radiusPx = isUniform && !leafMode ? `${tl}px` : leafMode ? '25% 75% 75% 25% / 25% 25% 75% 75%' : `${tl}px ${tr}px ${br}px ${bl}px`
  const radiusPct = isUniform && !leafMode ? `${tl}%` : leafMode ? '25% 75% 75% 25% / 25% 25% 75% 75%' : `${tl}% ${tr}% ${br}% ${bl}%`

  const cssPx = `border-radius: ${radiusPx};`
  const cssPct = leafMode ? '' : `border-radius: ${radiusPct};`

  const boxRadius = leafMode ? '25% 75% 75% 25% / 25% 25% 75% 75%' : radiusPx

  const applyPreset = (p: typeof PRESETS[0]) => {
    setLeafMode(false)
    setSimple(p.corners.tl)
    setCorners(p.corners)
  }

  const copy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>⬜</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>CSS Border Radius Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Visual border radius builder with live preview</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '28px', alignItems: 'start' }}>
          {/* Preview */}
          <div>
            <div style={{ background: '#f1f5f9', borderRadius: '16px', padding: '80px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '320px', marginBottom: '24px' }}>
              <div style={{ width: '200px', height: '200px', background: 'linear-gradient(135deg,#E85D04,#F48C42)', borderRadius: boxRadius, transition: 'border-radius 0.2s' }} />
            </div>

            {/* CSS Output */}
            <div style={{ background: '#0F2A4A', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
              <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', color: '#F48C42' }}>{cssPx}{cssPct ? '\n' + cssPct : ''}</pre>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => copy(cssPx)}
                style={{ background: copied ? '#16A34A' : '#E85D04', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                {copied ? '✓ Copied!' : 'Copy CSS (px)'}
              </button>
              {cssPct && (
                <button onClick={() => copy(cssPct)}
                  style={{ background: 'white', color: '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Copy CSS (%)
                </button>
              )}
            </div>
          </div>

          {/* Controls */}
          <div>
            {/* Mode toggle */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <button onClick={() => setAdvanced(false)}
                style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1.5px solid', borderColor: !advanced ? '#E85D04' : '#e2e8f0', background: !advanced ? '#E85D04' : 'white', color: !advanced ? 'white' : '#64748b', fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                Simple
              </button>
              <button onClick={() => setAdvanced(true)}
                style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1.5px solid', borderColor: advanced ? '#E85D04' : '#e2e8f0', background: advanced ? '#E85D04' : 'white', color: advanced ? 'white' : '#64748b', fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                Advanced
              </button>
            </div>

            {/* Presets */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px', display: 'block' }}>Presets</label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const }}>
                {PRESETS.map(p => (
                  <button key={p.name} onClick={() => applyPreset(p)}
                    style={{ padding: '8px 14px', borderRadius: '8px', border: '1.5px solid #e2e8f0', background: 'white', color: '#0F2A4A', fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    {p.name}
                  </button>
                ))}
                <button onClick={() => { setLeafMode(true); setAdvanced(false) }}
                  style={{ padding: '8px 14px', borderRadius: '8px', border: `1.5px solid ${leafMode ? '#E85D04' : '#e2e8f0'}`, background: leafMode ? '#FFF7ED' : 'white', color: leafMode ? '#E85D04' : '#0F2A4A', fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  Leaf
                </button>
              </div>
            </div>

            {!leafMode && (
              <>
                {!advanced ? (
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A' }}>All Corners</label>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#E85D04' }}>{simple}px</span>
                    </div>
                    <input type="range" min={0} max={100} value={simple}
                      onChange={e => { setSimple(Number(e.target.value)); setCorners({ tl: Number(e.target.value), tr: Number(e.target.value), br: Number(e.target.value), bl: Number(e.target.value) }) }}
                      style={{ width: '100%', accentColor: '#E85D04' }} />
                  </div>
                ) : (
                  (['tl', 'tr', 'br', 'bl'] as const).map(c => (
                    <div key={c} style={{ marginBottom: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A' }}>{{ tl: 'Top Left', tr: 'Top Right', br: 'Bottom Right', bl: 'Bottom Left' }[c]}</label>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#E85D04' }}>{corners[c]}px</span>
                      </div>
                      <input type="range" min={0} max={100} value={corners[c]}
                        onChange={e => setCorners(prev => ({ ...prev, [c]: Number(e.target.value) }))}
                        style={{ width: '100%', accentColor: '#E85D04' }} />
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
