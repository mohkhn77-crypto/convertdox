'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

const STYLES = [
  { name: 'Spaced', sep: ' ', transform: (s: string) => s },
  { name: 'Underscored', sep: '_', transform: (s: string) => s },
  { name: 'Dotted', sep: '.', transform: (s: string) => s },
  { name: 'Dashed', sep: '-', transform: (s: string) => s },
  { name: 'Wide uppercase', sep: '  ', transform: (s: string) => s.toUpperCase() },
]

export default function LetterSpacingPage() {
  const [input, setInput] = useState('hello')
  const [customSep, setCustomSep] = useState('•')
  const [copied, setCopied] = useState<string | null>(null)

  const apply = (sep: string, t: (s: string) => string) => t(input).split('').join(sep)

  const copy = (label: string, value: string) => {
    navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>↔️</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Letter Spacing Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Great for Instagram bios and social media accents.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type your text..."
          style={{ width: '100%', padding: '16px 18px', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '18px', fontFamily: 'inherit', color: '#0F2A4A', outline: 'none', boxSizing: 'border-box' }} />
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {STYLES.map(s => {
            const result = apply(s.sep, s.transform)
            return (
              <div key={s.name} style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.name}</span>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>{result.length} chars</span>
                </div>
                <div style={{ fontSize: '24px', color: '#0F2A4A', fontWeight: 600, padding: '12px', background: '#f8fafc', borderRadius: '8px', minHeight: '32px', wordBreak: 'break-word' }}>{result || '—'}</div>
                <button onClick={() => copy(s.name, result)} style={{ marginTop: '10px', padding: '8px 16px', background: copied === s.name ? '#16A34A' : '#0F2A4A', color: 'white', border: 'none', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                  {copied === s.name ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
            )
          })}
          <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Custom separator</span>
              <input value={customSep} onChange={e => setCustomSep(e.target.value)} maxLength={4}
                style={{ width: '70px', padding: '5px 10px', border: '1.5px solid #e2e8f0', borderRadius: '6px', fontFamily: 'inherit', fontSize: '14px', textAlign: 'center' }} />
            </div>
            <div style={{ fontSize: '24px', color: '#0F2A4A', fontWeight: 600, padding: '12px', background: '#f8fafc', borderRadius: '8px', minHeight: '32px', wordBreak: 'break-word' }}>{input.split('').join(customSep) || '—'}</div>
            <button onClick={() => copy('custom', input.split('').join(customSep))} style={{ marginTop: '10px', padding: '8px 16px', background: copied === 'custom' ? '#16A34A' : '#0F2A4A', color: 'white', border: 'none', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
              {copied === 'custom' ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
