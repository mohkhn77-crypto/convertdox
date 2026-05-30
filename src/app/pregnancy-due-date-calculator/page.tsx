'use client'
import { useMemo, useState } from 'react'

export default function PregnancyCalculator() {
  const [method, setMethod] = useState('lmp')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const result = useMemo(() => {
    if (!date) return null

    const inputDate = new Date(date)
    const dueDate = new Date(inputDate)

    if (method === 'lmp') {
      dueDate.setDate(dueDate.getDate() + 280)
    } else {
      dueDate.setDate(dueDate.getDate() + 266)
    }

    const today = new Date()
    const daysSinceLMP = method === 'lmp'
      ? Math.floor((today.getTime() - inputDate.getTime()) / (1000 * 60 * 60 * 24))
      : Math.floor((today.getTime() - inputDate.getTime()) / (1000 * 60 * 60 * 24)) + 14

    const weeks = Math.floor(daysSinceLMP / 7)
    const days = daysSinceLMP % 7

    let trimester = '1st'
    if (weeks >= 13 && weeks < 27) trimester = '2nd'
    else if (weeks >= 27) trimester = '3rd'

    const daysRemaining = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    return {
      dueDate: dueDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      currentWeek: weeks >= 0 ? weeks : 0,
      currentDay: days >= 0 ? days : 0,
      trimester,
      daysRemaining: daysRemaining > 0 ? daysRemaining : 0
    }
  }, [date, method])

  const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none' }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F2A4A', marginBottom: '8px' }}>Pregnancy Due Date Calculator</h1>
        <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '32px' }}>Calculate your estimated due date and current pregnancy week.</p>

        <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0F2A4A', marginBottom: '8px' }}>Calculation Method</label>
            <select value={method} onChange={e => setMethod(e.target.value)} style={inputStyle}>
              <option value="lmp">Last Menstrual Period (LMP)</option>
              <option value="conception">Conception Date</option>
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0F2A4A', marginBottom: '8px' }}>
              {method === 'lmp' ? 'First Day of Last Period' : 'Conception Date'}
            </label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />
          </div>

          {result && (
            <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1.5px solid #e2e8f0' }}>
                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px', fontWeight: 600 }}>Estimated Due Date</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#E85D04' }}>{result.dueDate}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                <div style={{ textAlign: 'center', padding: '12px', background: 'white', borderRadius: '8px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F2A4A' }}>{result.currentWeek}w {result.currentDay}d</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', fontWeight: 600 }}>Current Week</div>
                </div>
                <div style={{ textAlign: 'center', padding: '12px', background: 'white', borderRadius: '8px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F2A4A' }}>{result.trimester}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', fontWeight: 600 }}>Trimester</div>
                </div>
                <div style={{ textAlign: 'center', padding: '12px', background: 'white', borderRadius: '8px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F2A4A' }}>{result.daysRemaining}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', fontWeight: 600 }}>Days Remaining</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: '48px', background: 'white', padding: '32px', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0F2A4A', marginBottom: '16px' }}>About This Calculator</h2>
          <p style={{ color: '#334155', lineHeight: 1.7 }}>Calculate your estimated pregnancy due date using either Last Menstrual Period (LMP) or Conception Date. This calculator estimates a 40-week pregnancy from LMP or 38 weeks from conception. Results are estimates only - consult your healthcare provider for personalized care.</p>
          <p style={{ color: '#334155', lineHeight: 1.7, marginTop: '12px', fontStyle: 'italic', fontSize: '14px' }}>
            <strong>Disclaimer:</strong> This tool provides estimates only and should not replace professional medical advice.
          </p>
        </div>
      </div>
    </div>
  )
}
