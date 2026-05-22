'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

const BASES = [
  { label: 'Binary', base: 2, prefix: '0b', chars: '0-1' },
  { label: 'Octal', base: 8, prefix: '0o', chars: '0-7' },
  { label: 'Decimal', base: 10, prefix: '', chars: '0-9' },
  { label: 'Hexadecimal', base: 16, prefix: '0x', chars: '0-9 A-F' },
  { label: 'Base 32', base: 32, prefix: '', chars: '0-9 A-V' },
  { label: 'Base 36', base: 36, prefix: '', chars: '0-9 A-Z' },
]

const EXAMPLES = [42, 255, 1024, 65535]

export default function BaseConverterPage() {
  const [input, setInput] = useState('42')
  const [fromBase, setFromBase] = useState(10)
  const [copied, setCopied] = useState('')
  const [error, setError] = useState('')

  function convert(val: string, from: number): number | null {
    if (!val.trim()) return null
    const n = parseInt(val.trim(), from)
    return isNaN(n) ? null : n
  }

  const decimal = convert(input, fromBase)
  const isValid = decimal !== null

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 1500)
  }

  function handleInput(val: string) {
    setInput(val)
    const n = convert(val, fromBase)
    setError(val && n === null ? `Invalid input for base ${fromBase}` : '')
  }

  return (
    <div style={{ minHeight:'100vh', background:'#fff', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>🔢</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>Number Base Converter</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Convert between binary, octal, decimal, hex and more</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth:'900px', margin:'0 auto', padding:'32px 24px' }}>
        <div style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'16px', padding:'24px', marginBottom:'24px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:'16px', alignItems:'end', marginBottom:'16px' }}>
            <div>
              <label style={{ fontSize:'13px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px', display:'block' }}>Enter Number</label>
              <input value={input} onChange={e => handleInput(e.target.value)}
                style={{ width:'100%', padding:'12px 16px', border:`1.5px solid ${error?'#EF4444':'#e2e8f0'}`, borderRadius:'10px', fontSize:'18px', fontFamily:'monospace', fontWeight:700, outline:'none', boxSizing:'border-box' as const }} />
              {error && <div style={{ color:'#EF4444', fontSize:'12px', marginTop:'4px' }}>{error}</div>}
            </div>
            <div>
              <label style={{ fontSize:'13px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px', display:'block' }}>Input Base</label>
              <select value={fromBase} onChange={e => { setFromBase(Number(e.target.value)); setInput(''); setError('') }}
                style={{ padding:'12px 16px', border:'1.5px solid #e2e8f0', borderRadius:'10px', fontSize:'15px', fontFamily:'inherit', outline:'none', background:'white', cursor:'pointer' }}>
                {BASES.map(b => <option key={b.base} value={b.base}>{b.label} (base {b.base})</option>)}
              </select>
            </div>
          </div>

          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
            {EXAMPLES.map(ex => (
              <button key={ex} onClick={() => { setFromBase(10); setInput(String(ex)); setError('') }}
                style={{ padding:'6px 14px', borderRadius:'8px', border:'1.5px solid #e2e8f0', background:'white', color:'#64748b', fontFamily:'monospace', fontSize:'13px', fontWeight:600, cursor:'pointer' }}>
                {ex}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'12px' }}>
          {BASES.map(({ label, base, prefix }) => {
            const result = isValid ? decimal!.toString(base).toUpperCase() : '—'
            const displayVal = isValid ? `${prefix}${result}` : '—'
            const isCurrent = base === fromBase
            return (
              <div key={base} style={{ background:isCurrent?'#EFF6FF':'white', border:`1.5px solid ${isCurrent?'#3B82F6':'#e2e8f0'}`, borderRadius:'14px', padding:'16px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' }}>
                  <div style={{ fontSize:'12px', fontWeight:700, color:isCurrent?'#2563EB':'#64748b', textTransform:'uppercase' as const, letterSpacing:'0.5px' }}>{label} (base {base})</div>
                  {isCurrent && <span style={{ fontSize:'11px', background:'#DBEAFE', color:'#1D4ED8', padding:'2px 8px', borderRadius:'999px', fontWeight:700 }}>Input</span>}
                </div>
                <div style={{ fontFamily:'monospace', fontSize:'20px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px', wordBreak:'break-all' as const }}>{displayVal}</div>
                <button onClick={() => copy(result, label)} disabled={!isValid}
                  style={{ fontSize:'12px', fontWeight:600, color:copied===label?'#16A34A':'#E85D04', background:'transparent', border:'none', cursor:'pointer', padding:0, fontFamily:'inherit' }}>
                  {copied === label ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
