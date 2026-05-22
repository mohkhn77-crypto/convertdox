'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

function relativeTime(ms: number): string {
  const diff = ms - Date.now()
  const abs = Math.abs(diff)
  const future = diff > 0
  if (abs < 60000) return future ? 'in a few seconds' : 'just now'
  if (abs < 3600000) return (future ? 'in ' : '') + Math.round(abs / 60000) + ' minutes' + (future ? '' : ' ago')
  if (abs < 86400000) return (future ? 'in ' : '') + Math.round(abs / 3600000) + ' hours' + (future ? '' : ' ago')
  if (abs < 2592000000) return (future ? 'in ' : '') + Math.round(abs / 86400000) + ' days' + (future ? '' : ' ago')
  return (future ? 'in ' : '') + Math.round(abs / 2592000000) + ' months' + (future ? '' : ' ago')
}

function weekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const dayNum = date.getUTCDay() || 7
  date.setUTCDate(date.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

function dayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0)
  return Math.floor((d.getTime() - start.getTime()) / 86400000)
}

export default function TimestampConverterPage() {
  const [tsInput, setTsInput] = useState('')
  const [dtInput, setDtInput] = useState('')
  const [useMs, setUseMs] = useState(false)
  const [copied, setCopied] = useState('')

  const tsMs: number | null = (() => {
    if (tsInput.trim()) {
      const n = Number(tsInput.trim())
      if (!isNaN(n)) return useMs ? n : n * 1000
    }
    if (dtInput) {
      const d = new Date(dtInput)
      if (!isNaN(d.getTime())) return d.getTime()
    }
    return null
  })()

  const date = tsMs !== null ? new Date(tsMs) : null

  function setNow() {
    const now = Date.now()
    setTsInput(useMs ? String(now) : String(Math.floor(now / 1000)))
    setDtInput('')
  }

  function handleTs(val: string) {
    setTsInput(val)
    setDtInput('')
  }

  function handleDt(val: string) {
    setDtInput(val)
    const d = new Date(val)
    if (!isNaN(d.getTime())) {
      setTsInput(useMs ? String(d.getTime()) : String(Math.floor(d.getTime() / 1000)))
    } else {
      setTsInput('')
    }
  }

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 1500)
  }

  const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

  const formats = date ? [
    { label: 'Unix Timestamp (s)', value: String(Math.floor(date.getTime() / 1000)) },
    { label: 'Unix Timestamp (ms)', value: String(date.getTime()) },
    { label: 'ISO 8601', value: date.toISOString() },
    { label: 'UTC String', value: date.toUTCString() },
    { label: 'Local String', value: date.toLocaleString() },
    { label: 'Relative', value: relativeTime(date.getTime()) },
    { label: 'Day of Week', value: DAYS[date.getDay()] },
    { label: 'Week of Year', value: `Week ${weekNumber(date)}` },
    { label: 'Day of Year', value: `Day ${dayOfYear(date)}` },
  ] : []

  return (
    <div style={{ minHeight:'100vh', background:'#fff', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>🕐</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>Timestamp Converter</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Convert Unix timestamps to human-readable dates and back</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth:'900px', margin:'0 auto', padding:'32px 24px' }}>
        <div style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'16px', padding:'24px', marginBottom:'24px' }}>
          <div style={{ display:'flex', gap:'8px', marginBottom:'16px', flexWrap:'wrap' as const }}>
            <button onClick={setNow} style={{ padding:'10px 20px', borderRadius:'10px', border:'none', background:'#E85D04', color:'white', fontFamily:'inherit', fontSize:'14px', fontWeight:700, cursor:'pointer' }}>⏱ Use Current Time</button>
            <label style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'14px', fontWeight:600, color:'#64748b', cursor:'pointer' }}>
              <input type="checkbox" checked={useMs} onChange={e => setUseMs(e.target.checked)} />
              Milliseconds mode
            </label>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
            <div>
              <label style={{ fontSize:'13px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px', display:'block' }}>Unix Timestamp ({useMs ? 'ms' : 's'})</label>
              <input value={tsInput} onChange={e => handleTs(e.target.value)} placeholder={useMs ? '1716364800000' : '1716364800'}
                style={{ width:'100%', padding:'12px 16px', border:'1.5px solid #e2e8f0', borderRadius:'10px', fontSize:'16px', fontFamily:'monospace', outline:'none', boxSizing:'border-box' as const }} />
            </div>
            <div>
              <label style={{ fontSize:'13px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px', display:'block' }}>Human-Readable Date</label>
              <input type="datetime-local" value={dtInput} onChange={e => handleDt(e.target.value)}
                style={{ width:'100%', padding:'12px 16px', border:'1.5px solid #e2e8f0', borderRadius:'10px', fontSize:'15px', fontFamily:'inherit', outline:'none', boxSizing:'border-box' as const }} />
            </div>
          </div>
        </div>

        {formats.length > 0 && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'12px' }}>
            {formats.map(({ label, value }) => (
              <div key={label} style={{ background:'white', border:'1.5px solid #e2e8f0', borderRadius:'14px', padding:'16px' }}>
                <div style={{ fontSize:'12px', fontWeight:700, color:'#64748b', textTransform:'uppercase' as const, letterSpacing:'0.5px', marginBottom:'6px' }}>{label}</div>
                <div style={{ fontFamily:'monospace', fontSize:'14px', color:'#0F2A4A', fontWeight:600, wordBreak:'break-all' as const, marginBottom:'8px' }}>{value}</div>
                <button onClick={() => copy(value, label)}
                  style={{ fontSize:'12px', fontWeight:600, color:copied===label?'#16A34A':'#E85D04', background:'transparent', border:'none', cursor:'pointer', padding:0, fontFamily:'inherit' }}>
                  {copied === label ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  )
}
