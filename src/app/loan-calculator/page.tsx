'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import RelatedTools from '@/components/RelatedTools'
import TrustStrip from '@/components/TrustStrip'

interface AmortRow {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

export default function LoanCalculatorPage() {
  const [amount, setAmount] = useState('250000')
  const [rate, setRate] = useState('6.5')
  const [term, setTerm] = useState('30')
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number; rows: AmortRow[] } | null>(null)

  function calculate() {
    const P = parseFloat(amount)
    const annualRate = parseFloat(rate)
    const years = parseFloat(term)
    if (!P || !annualRate || !years || P <= 0 || annualRate <= 0 || years <= 0) return
    const r = annualRate / 100 / 12
    const n = years * 12
    const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const total = M * n
    const interest = total - P
    const rows: AmortRow[] = []
    let balance = P
    for (let i = 1; i <= Math.min(12, n); i++) {
      const intPart = balance * r
      const prinPart = M - intPart
      balance -= prinPart
      rows.push({ month: i, payment: M, principal: prinPart, interest: intPart, balance: Math.max(0, balance) })
    }
    setResult({ monthly: M, total, interest, rows })
  }

  const fmt = (n: number) => '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🏠</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Loan Calculator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Calculate monthly payments, total cost, and amortization schedule</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '16px', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Loan Amount ($)</div>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Annual Interest Rate (%)</div>
            <input type="number" value={rate} onChange={e => setRate(e.target.value)} step="0.1"
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Loan Term (years)</div>
            <input type="number" value={term} onChange={e => setTerm(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
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
                { label: 'Monthly Payment', val: fmt(result.monthly) },
                { label: 'Total Payment', val: fmt(result.total) },
                { label: 'Total Interest', val: fmt(result.interest) },
              ].map(item => (
                <div key={item.label} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>{item.label}</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#E85D04', fontFamily: "'Space Grotesk',sans-serif" }}>{item.val}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '32px' }}>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '18px', fontWeight: 700, color: '#0F2A4A', marginBottom: '12px' }}>Amortization Schedule (First 12 Months)</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ background: '#0F2A4A', color: 'white' }}>
                      {['Month', 'Payment', 'Principal', 'Interest', 'Balance'].map(h => (
                        <th key={h} style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row, i) => (
                      <tr key={row.month} style={{ background: i % 2 === 0 ? '#f8fafc' : 'white' }}>
                        <td style={{ padding: '9px 14px', textAlign: 'right', color: '#0F2A4A', fontWeight: 600 }}>{row.month}</td>
                        <td style={{ padding: '9px 14px', textAlign: 'right' }}>{fmt(row.payment)}</td>
                        <td style={{ padding: '9px 14px', textAlign: 'right', color: '#16A34A' }}>{fmt(row.principal)}</td>
                        <td style={{ padding: '9px 14px', textAlign: 'right', color: '#E85D04' }}>{fmt(row.interest)}</td>
                        <td style={{ padding: '9px 14px', textAlign: 'right' }}>{fmt(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
      <RelatedTools currentPath="/loan-calculator" />
      <SiteFooter />
    </div>
  )
}
