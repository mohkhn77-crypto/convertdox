'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const COMPOUNDS = [
  { label: 'Annually', n: 1 },
  { label: 'Semi-annually', n: 2 },
  { label: 'Quarterly', n: 4 },
  { label: 'Monthly', n: 12 },
  { label: 'Daily', n: 365 },
]

interface YearRow { year: number; amount: number; interest: number }

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState('10000')
  const [rate, setRate] = useState('7')
  const [years, setYears] = useState('10')
  const [compound, setCompound] = useState(12)
  const [result, setResult] = useState<{ final: number; interest: number; returnPct: number; rows: YearRow[] } | null>(null)

  function calculate() {
    const P = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const t = parseInt(years)
    const n = compound
    if (!P || !r || !t) return
    const rows: YearRow[] = []
    for (let y = 1; y <= Math.min(t, 30); y++) {
      const amount = P * Math.pow(1 + r / n, n * y)
      rows.push({ year: y, amount, interest: amount - P })
    }
    const final = P * Math.pow(1 + r / n, n * t)
    const interest = final - P
    const returnPct = (interest / P) * 100
    setResult({ final, interest, returnPct, rows })
  }

  const fmt = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📈</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Compound Interest Calculator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Calculate investment growth with year-by-year breakdown</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px', marginBottom: '20px' }}>
          {[
            { label: 'Principal ($)', val: principal, set: setPrincipal },
            { label: 'Annual Rate (%)', val: rate, set: setRate },
            { label: 'Years', val: years, set: setYears },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>{label}</div>
              <input type="number" value={val} onChange={e => set(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
            </div>
          ))}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Compound Frequency</div>
            <select value={compound} onChange={e => setCompound(parseInt(e.target.value))}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', background: 'white', boxSizing: 'border-box' as const }}>
              {COMPOUNDS.map(c => <option key={c.n} value={c.n}>{c.label}</option>)}
            </select>
          </div>
        </div>
        <button onClick={calculate}
          style={{ background: '#E85D04', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          Calculate
        </button>

        {result && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px', marginTop: '32px' }}>
              {[
                { label: 'Final Amount', val: fmt(result.final), color: '#16A34A' },
                { label: 'Total Interest', val: fmt(result.interest), color: '#E85D04' },
                { label: 'Total Return', val: result.returnPct.toFixed(2) + '%', color: '#7C3AED' },
              ].map(item => (
                <div key={item.label} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>{item.label}</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: item.color, fontFamily: "'Space Grotesk',sans-serif" }}>{item.val}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '28px', overflowX: 'auto' }}>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '17px', fontWeight: 700, color: '#0F2A4A', marginBottom: '12px' }}>Year-by-Year Growth</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: '#0F2A4A' }}>
                    {['Year', 'Total Amount', 'Interest Earned'].map(h => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: 'right', color: 'white', fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row, i) => (
                    <tr key={row.year} style={{ background: i % 2 === 0 ? '#f8fafc' : 'white' }}>
                      <td style={{ padding: '8px 16px', textAlign: 'right', fontWeight: 600, color: '#0F2A4A' }}>{row.year}</td>
                      <td style={{ padding: '8px 16px', textAlign: 'right', color: '#16A34A', fontWeight: 600 }}>{fmt(row.amount)}</td>
                      <td style={{ padding: '8px 16px', textAlign: 'right', color: '#E85D04' }}>{fmt(row.interest)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
