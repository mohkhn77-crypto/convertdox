'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

export default function YesNoPickerPage() {
  const [result, setResult] = useState<'YES' | 'NO' | null>(null)
  const [flipping, setFlipping] = useState(false)
  const [counts, setCounts] = useState({ YES: 0, NO: 0 })
  const [history, setHistory] = useState<('YES' | 'NO')[]>([])

  function flip() {
    if (flipping) return
    setFlipping(true)
    setTimeout(() => {
      const r: 'YES' | 'NO' = Math.random() < 0.5 ? 'YES' : 'NO'
      setResult(r)
      setFlipping(false)
      setCounts(prev => ({ ...prev, [r]: prev[r] + 1 }))
      setHistory(prev => [r, ...prev].slice(0, 10))
    }, 600)
  }

  function reset() {
    setResult(null)
    setCounts({ YES: 0, NO: 0 })
    setHistory([])
  }

  const total = counts.YES + counts.NO
  const confidence = total > 0 ? Math.round((Math.max(counts.YES, counts.NO) / total) * 100) : 0

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🪙</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Yes No Picker</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Flip a coin and get an instant Yes or No answer</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Coin SVG */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
          <style>{`@keyframes coinFlip { 0%,100%{transform:rotateY(0deg)} 50%{transform:rotateY(180deg)} }`}</style>
          <svg
            width="200" height="200" viewBox="0 0 200 200"
            style={{ animation: flipping ? 'coinFlip 0.6s ease-in-out' : 'none', cursor: 'pointer' }}
            onClick={flip}
          >
            <circle cx="100" cy="100" r="90" fill={result === 'YES' ? '#16a34a' : result === 'NO' ? '#dc2626' : '#e2e8f0'} stroke={result === 'YES' ? '#15803d' : result === 'NO' ? '#b91c1c' : '#cbd5e1'} strokeWidth="4" />
            <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            {!flipping && (
              <text x="100" y="116" fontFamily="'Space Grotesk',Arial" fontSize="48" fontWeight="900" fill="white" textAnchor="middle">
                {result ?? '?'}
              </text>
            )}
            {flipping && (
              <text x="100" y="116" fontFamily="Arial" fontSize="24" fontWeight="700" fill="white" textAnchor="middle">...</text>
            )}
          </svg>
        </div>

        {/* Flip button */}
        <button
          onClick={flip}
          disabled={flipping}
          style={{ width: '100%', padding: '18px', background: '#E85D04', color: 'white', border: 'none', borderRadius: '14px', fontFamily: 'inherit', fontSize: '18px', fontWeight: 800, cursor: flipping ? 'not-allowed' : 'pointer', opacity: flipping ? 0.7 : 1, marginBottom: '24px' }}
        >
          {flipping ? 'Flipping...' : '🪙 Flip!'}
        </button>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {[
            { label: 'Yes', val: counts.YES, bg: '#dcfce7', color: '#15803d' },
            { label: 'No', val: counts.NO, bg: '#fee2e2', color: '#dc2626' },
            { label: 'Total', val: total, bg: '#f1f5f9', color: '#0F2A4A' },
            { label: 'Confidence', val: `${confidence}%`, bg: '#fef3c7', color: '#d97706' },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '22px', fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Last 10 Flips</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {history.map((r, i) => (
                <span key={i} style={{ background: r === 'YES' ? '#dcfce7' : '#fee2e2', color: r === 'YES' ? '#15803d' : '#dc2626', borderRadius: '6px', padding: '4px 12px', fontSize: '13px', fontWeight: 700 }}>{r}</span>
              ))}
            </div>
          </div>
        )}

        {/* Reset */}
        {total > 0 && (
          <button onClick={reset} style={{ width: '100%', padding: '12px', background: 'white', color: '#dc2626', border: '1.5px solid #fee2e2', borderRadius: '12px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
            Reset All Stats
          </button>
        )}
      </div>
      <SiteFooter />
    </div>
  )
}
