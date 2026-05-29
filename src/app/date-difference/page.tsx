'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

function businessDays(start: Date, end: Date) {
  let count = 0
  const cur = new Date(start)
  while (cur <= end) {
    const day = cur.getDay()
    if (day !== 0 && day !== 6) count++
    cur.setDate(cur.getDate() + 1)
  }
  return count
}

export default function DateDifferencePage() {
  const [startDate, setStartDate] = useState('2025-01-01')
  const [endDate, setEndDate] = useState('2026-05-22')
  const [result, setResult] = useState<{
    totalDays: number; weeks: number; approxMonths: number; approxYears: number;
    years: number; months: number; days: number; bizDays: number
  } | null>(null)

  function calculate() {
    const s = new Date(startDate)
    const e = new Date(endDate)
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return
    const [start, end] = s <= e ? [s, e] : [e, s]
    const totalMs = end.getTime() - start.getTime()
    const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24))
    const weeks = Math.floor(totalDays / 7)
    const approxMonths = Math.floor(totalDays / 30.44)
    const approxYears = Math.floor(totalDays / 365.25)

    // Exact breakdown
    let years = end.getFullYear() - start.getFullYear()
    let months = end.getMonth() - start.getMonth()
    let days = end.getDate() - start.getDate()
    if (days < 0) {
      months--
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0)
      days += prevMonth.getDate()
    }
    if (months < 0) { years--; months += 12 }

    const bizDays = businessDays(start, end)
    setResult({ totalDays, weeks, approxMonths, approxYears, years, months, days, bizDays })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📅</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Date Difference Calculator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Find the exact number of days, weeks, months between two dates</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Start Date</div>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>End Date</div>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
        </div>
        <button onClick={calculate}
          style={{ background: '#E85D04', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          Calculate Difference
        </button>

        {result && (
          <div style={{ marginTop: '32px' }}>
            <div style={{ background: '#0F2A4A', borderRadius: '14px', padding: '24px', marginBottom: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>Exact Breakdown</div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(18px,3vw,28px)', fontWeight: 800, color: 'white' }}>
                {result.years > 0 && <span>{result.years} year{result.years !== 1 ? 's' : ''}, </span>}
                {result.months > 0 && <span>{result.months} month{result.months !== 1 ? 's' : ''}, </span>}
                <span>{result.days} day{result.days !== 1 ? 's' : ''}</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '12px' }}>
              {[
                { label: 'Total Days', val: result.totalDays.toLocaleString() },
                { label: 'Weeks', val: result.weeks.toLocaleString() },
                { label: 'Months (approx)', val: result.approxMonths.toLocaleString() },
                { label: 'Years (approx)', val: result.approxYears.toLocaleString() },
                { label: 'Business Days', val: result.bizDays.toLocaleString() },
              ].map(item => (
                <div key={item.label} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>{item.label}</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#E85D04', fontFamily: "'Space Grotesk',sans-serif" }}>{item.val}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
