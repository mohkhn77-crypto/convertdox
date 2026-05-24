'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

export default function PalindromeCheckerPage() {
  const [text, setText] = useState('A man a plan a canal Panama')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [ignoreNonAlnum, setIgnoreNonAlnum] = useState(true)

  const { isPal, cleaned, reversed, matchPct } = useMemo(() => {
    let c = text
    if (!caseSensitive) c = c.toLowerCase()
    if (ignoreNonAlnum) c = c.replace(/[^a-zA-Z0-9]/g, '')
    const r = c.split('').reverse().join('')
    const isPalindrome = c.length > 0 && c === r
    let matches = 0
    const n = c.length
    for (let i = 0; i < Math.floor(n / 2); i++) {
      if (c[i] === c[n - 1 - i]) matches++
    }
    const total = Math.floor(n / 2)
    const pct = total === 0 ? (n === 1 ? 100 : 0) : Math.round((matches / total) * 100)
    return { isPal: isPalindrome, cleaned: c, reversed: r, matchPct: pct }
  }, [text, caseSensitive, ignoreNonAlnum])

  const examples = ['racecar', 'A man a plan a canal Panama', 'Was it a car or a cat I saw', 'never odd or even', 'hello world']

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🔄</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Palindrome Checker</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Check if text reads the same forwards and backwards.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Type or paste text..."
            style={{ width: '100%', minHeight: '110px', padding: '14px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '16px', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', outline: 'none', color: '#0F2A4A' }} />
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
            {examples.map(ex => (
              <button key={ex} onClick={() => setText(ex)} style={{ padding: '6px 10px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: '#C2410C', cursor: 'pointer', fontFamily: 'inherit' }}>{ex}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '20px', marginTop: '14px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#0F2A4A', cursor: 'pointer' }}>
              <input type="checkbox" checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)} /> Case sensitive
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#0F2A4A', cursor: 'pointer' }}>
              <input type="checkbox" checked={ignoreNonAlnum} onChange={e => setIgnoreNonAlnum(e.target.checked)} /> Ignore spaces &amp; punctuation
            </label>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          <div style={{ background: isPal ? '#F0FDF4' : '#FEF2F2', border: '2px solid', borderColor: isPal ? '#16A34A' : '#DC2626', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '64px', fontWeight: 800, color: isPal ? '#16A34A' : '#DC2626', fontFamily: "'Space Grotesk',system-ui,sans-serif", lineHeight: 1 }}>{isPal ? 'YES' : 'NO'}</div>
            <div style={{ fontSize: '15px', color: isPal ? '#166534' : '#991B1B', marginTop: '8px', fontWeight: 600 }}>{isPal ? 'This is a palindrome!' : 'Not a palindrome'}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '12px' }}>
            {[
              { label: 'Length', val: text.length },
              { label: 'Cleaned length', val: cleaned.length },
              { label: 'Match %', val: `${matchPct}%` },
            ].map(s => (
              <div key={s.label} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '24px', fontWeight: 800, color: '#0F2A4A' }}>{s.val}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px' }}>Cleaned</div>
            <div style={{ fontFamily: 'monospace', fontSize: '16px', color: '#0F2A4A', wordBreak: 'break-all' }}>{cleaned || '—'}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', marginTop: '14px', marginBottom: '8px' }}>Reversed</div>
            <div style={{ fontFamily: 'monospace', fontSize: '16px', color: '#0F2A4A', wordBreak: 'break-all' }}>{reversed || '—'}</div>
          </div>

          {cleaned.length > 0 && cleaned.length <= 60 && (
            <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '10px' }}>Character comparison</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {cleaned.split('').map((ch, i) => {
                  const mirror = cleaned[cleaned.length - 1 - i]
                  const match = ch === mirror
                  return (
                    <div key={i} style={{ width: '28px', height: '34px', borderRadius: '6px', background: match ? '#DCFCE7' : '#FEE2E2', color: match ? '#166534' : '#991B1B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontWeight: 700, fontSize: '15px' }}>{ch}</div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
