'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

type Freq = 'hourly' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly'

const FREQUENCIES: { key: Freq; label: string }[] = [
  { key: 'hourly', label: 'Hourly' },
  { key: 'daily', label: 'Daily' },
  { key: 'weekly', label: 'Weekly' },
  { key: 'biweekly', label: 'Bi-weekly' },
  { key: 'monthly', label: 'Monthly' },
  { key: 'yearly', label: 'Yearly' },
]

function toAnnual(amount: number, freq: Freq): number {
  switch (freq) {
    case 'hourly': return amount * 8 * 5 * 52
    case 'daily': return amount * 5 * 52
    case 'weekly': return amount * 52
    case 'biweekly': return amount * 26
    case 'monthly': return amount * 12
    case 'yearly': return amount
  }
}

export default function SalaryCalculatorPage() {
  const [amount, setAmount] = useState('50000')
  const [freq, setFreq] = useState<Freq>('yearly')
  const [result, setResult] = useState<Record<Freq, number> | null>(null)

  function calculate() {
    const val = parseFloat(amount)
    if (!val || val <= 0) return
    const annual = toAnnual(val, freq)
    setResult({
      hourly: annual / (8 * 5 * 52),
      daily: annual / (5 * 52),
      weekly: annual / 52,
      biweekly: annual / 26,
      monthly: annual / 12,
      yearly: annual,
    })
  }

  const fmt = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>💼</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Salary Calculator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Convert hourly ↔ annual salary across all time periods</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Salary Amount</div>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Frequency</div>
            <select value={freq} onChange={e => setFreq(e.target.value as Freq)}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', background: 'white', boxSizing: 'border-box' as const }}>
              {FREQUENCIES.map(f => <option key={f.key} value={f.key}>{f.label}</option>)}
            </select>
          </div>
        </div>
        <button onClick={calculate}
          style={{ background: '#E85D04', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          Convert Salary
        </button>

        {result && (
          <div style={{ marginTop: '32px' }}>
            <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden' }}>
              <div style={{ background: '#0F2A4A', padding: '12px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Period</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Amount</div>
              </div>
              {FREQUENCIES.map((f, i) => (
                <div key={f.key} style={{ padding: '14px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: i % 2 === 0 ? 'white' : '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 600, color: '#0F2A4A' }}>{f.label}</div>
                  <div style={{ fontWeight: 700, color: '#E85D04', fontFamily: "'Space Grotesk',sans-serif", fontSize: '16px' }}>{fmt(result[f.key])}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
              Assumptions: 8 hrs/day, 5 days/week, 52 weeks/year
            </div>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  )
}
