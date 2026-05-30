'use client'
import { useState, useEffect } from 'react'
import NavBar from '@/components/NavBar'
import RelatedTools from '@/components/RelatedTools'
import TrustStrip from '@/components/TrustStrip'

const COMMON_TZ = [
  'UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Toronto', 'America/Vancouver', 'America/Sao_Paulo', 'America/Mexico_City',
  'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Rome', 'Europe/Madrid',
  'Europe/Amsterdam', 'Europe/Zurich', 'Europe/Stockholm', 'Europe/Moscow',
  'Asia/Dubai', 'Asia/Kolkata', 'Asia/Dhaka', 'Asia/Bangkok', 'Asia/Singapore',
  'Asia/Hong_Kong', 'Asia/Shanghai', 'Asia/Tokyo', 'Asia/Seoul',
  'Australia/Sydney', 'Australia/Melbourne', 'Australia/Perth',
  'Pacific/Auckland', 'Pacific/Honolulu',
  'Africa/Cairo', 'Africa/Lagos', 'Africa/Johannesburg',
]

function formatInTZ(date: Date, tz: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      timeZoneName: 'short',
    }).format(date)
  } catch {
    return 'Invalid timezone'
  }
}

function getOffset(tz: string) {
  try {
    const date = new Date()
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }))
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone: tz }))
    const diff = (tzDate.getTime() - utcDate.getTime()) / 60000
    const sign = diff >= 0 ? '+' : '-'
    const abs = Math.abs(diff)
    const h = Math.floor(abs / 60).toString().padStart(2, '0')
    const m = (abs % 60).toString().padStart(2, '0')
    return `UTC${sign}${h}:${m}`
  } catch {
    return ''
  }
}

export default function TimezoneConverterPage() {
  const [dateStr, setDateStr] = useState('')
  const [timeStr, setTimeStr] = useState('')
  const [fromTZ, setFromTZ] = useState('America/New_York')
  const [toTZ, setToTZ] = useState('Europe/London')
  const [converted, setConverted] = useState('')
  const [nowFrom, setNowFrom] = useState('')
  const [nowTo, setNowTo] = useState('')

  function updateNow(ftz: string, ttz: string) {
    const now = new Date()
    setNowFrom(formatInTZ(now, ftz))
    setNowTo(formatInTZ(now, ttz))
  }

  useEffect(() => {
    const now = new Date()
    const y = now.getFullYear()
    const m = String(now.getMonth() + 1).padStart(2, '0')
    const d = String(now.getDate()).padStart(2, '0')
    const hh = String(now.getHours()).padStart(2, '0')
    const mm = String(now.getMinutes()).padStart(2, '0')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDateStr(`${y}-${m}-${d}`)
    setTimeStr(`${hh}:${mm}`)
    updateNow(fromTZ, toTZ)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const id = setInterval(() => updateNow(fromTZ, toTZ), 1000)
    return () => clearInterval(id)
  }, [fromTZ, toTZ])

  function convert() {
    if (!dateStr || !timeStr) return
    try {
      const localISO = `${dateStr}T${timeStr}:00`
      const fromDate = new Date(new Date(localISO).toLocaleString('en-US', { timeZone: fromTZ }))
      const diff = new Date(localISO).getTime() - fromDate.getTime()
      const inputDate = new Date(new Date(localISO).getTime() + diff)
      setConverted(formatInTZ(inputDate, toTZ))
    } catch {
      setConverted('Error converting time')
    }
  }

  const selectStyle = { width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', background: 'white', boxSizing: 'border-box' as const }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🌍</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Time Zone Converter</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Convert times between any time zones around the world</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Live clocks */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>Current time in {fromTZ}</div>
            <div style={{ fontSize: '14px', color: '#0F2A4A', fontWeight: 600 }}>{nowFrom}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>{getOffset(fromTZ)}</div>
          </div>
          <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>Current time in {toTZ}</div>
            <div style={{ fontSize: '14px', color: '#0F2A4A', fontWeight: 600 }}>{nowTo}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>{getOffset(toTZ)}</div>
          </div>
        </div>

        {/* Converter */}
        <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '24px' }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '17px', fontWeight: 700, color: '#0F2A4A', margin: '0 0 20px' }}>Convert a Specific Time</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Date</div>
              <input type="date" value={dateStr} onChange={e => setDateStr(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Time</div>
              <input type="time" value={timeStr} onChange={e => setTimeStr(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>From Timezone</div>
              <select value={fromTZ} onChange={e => setFromTZ(e.target.value)} style={selectStyle}>
                {COMMON_TZ.map(tz => <option key={tz} value={tz}>{tz}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>To Timezone</div>
              <select value={toTZ} onChange={e => setToTZ(e.target.value)} style={selectStyle}>
                {COMMON_TZ.map(tz => <option key={tz} value={tz}>{tz}</option>)}
              </select>
            </div>
          </div>
          <button onClick={convert}
            style={{ background: '#E85D04', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Convert Time
          </button>
          {converted && (
            <div style={{ marginTop: '16px', background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>Converted time in {toTZ}</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#0F2A4A' }}>{converted}</div>
            </div>
          )}
        </div>
      </div>
      <RelatedTools currentPath="/timezone-converter" />
    </div>
  )
}
