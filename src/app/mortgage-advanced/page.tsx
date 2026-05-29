'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

export default function MortgageAdvancedPage() {
  const [price, setPrice] = useState(450000)
  const [downPct, setDownPct] = useState(20)
  const [term, setTerm] = useState(30)
  const [rate, setRate] = useState(6.5)
  const [propTax, setPropTax] = useState(Math.round(450000 * 0.012))
  const [insurance, setInsurance] = useState(Math.round(450000 * 0.005))
  const [hoa, setHoa] = useState(0)

  const calc = useMemo(() => {
    const down = price * (downPct / 100)
    const loan = price - down
    const ltv = price > 0 ? (loan / price) * 100 : 0
    const pmiNeeded = ltv > 80
    const annualPMI = pmiNeeded ? loan * 0.005 : 0
    const monthlyPMI = annualPMI / 12
    const monthlyRate = rate / 100 / 12
    const n = term * 12
    let pi = 0
    if (loan > 0 && monthlyRate > 0) {
      pi = loan * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
    } else if (loan > 0) {
      pi = loan / n
    }
    const monthlyTax = propTax / 12
    const monthlyIns = insurance / 12
    const total = pi + monthlyTax + monthlyIns + monthlyPMI + hoa
    // amort first 12
    const amort: { month: number; principal: number; interest: number; balance: number; payment: number }[] = []
    let bal = loan
    for (let m = 1; m <= 12 && bal > 0; m++) {
      const interest = bal * monthlyRate
      const principal = Math.min(bal, pi - interest)
      bal -= principal
      amort.push({ month: m, principal, interest, balance: Math.max(0, bal), payment: pi })
    }
    const totalPayments = pi * n
    const totalInterest = totalPayments - loan
    return { loan, down, ltv, pmiNeeded, pi, monthlyTax, monthlyIns, monthlyPMI, total, amort, totalPayments, totalInterest }
  }, [price, downPct, term, rate, propTax, insurance, hoa])

  const segs = [
    { label: 'P&I', val: calc.pi, color: '#0F2A4A' },
    { label: 'Tax', val: calc.monthlyTax, color: '#3B82F6' },
    { label: 'Insurance', val: calc.monthlyIns, color: '#16A34A' },
    { label: 'PMI', val: calc.monthlyPMI, color: '#E85D04' },
    { label: 'HOA', val: hoa, color: '#9333EA' },
  ].filter(s => s.val > 0)
  const sum = segs.reduce((s, x) => s + x.val, 0) || 1
  let acc = 0
  const conicStops = segs.map(s => {
    const start = (acc / sum) * 360
    acc += s.val
    const end = (acc / sum) * 360
    return `${s.color} ${start}deg ${end}deg`
  }).join(', ')

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🏠</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Advanced Mortgage Calculator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Full PITI calculator with PMI and amortization.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '14px' }}>
          {[
            { l: 'Home price ($)', v: price, s: setPrice, min: 0 },
            { l: `Down payment (${downPct}%)`, v: downPct, s: setDownPct, min: 0, max: 100, range: true },
            { l: 'Loan term (years)', v: term, s: setTerm, options: [15, 20, 30] },
            { l: `Interest rate (${rate.toFixed(2)}%)`, v: rate, s: setRate, min: 0, max: 20, step: 0.05, range: true },
            { l: 'Property tax (annual $)', v: propTax, s: setPropTax, min: 0 },
            { l: 'Insurance (annual $)', v: insurance, s: setInsurance, min: 0 },
            { l: 'HOA (monthly $)', v: hoa, s: setHoa, min: 0 },
          ].map((f, i) => (
            <div key={i}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>{f.l}</label>
              {f.range ? (
                <input type="range" min={f.min} max={f.max} step={f.step ?? 1} value={f.v} onChange={e => f.s(Number(e.target.value))} style={{ width: '100%' }} />
              ) : f.options ? (
                <select value={f.v} onChange={e => f.s(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', background: 'white', color: '#0F2A4A' }}>
                  {f.options.map(o => <option key={o} value={o}>{o} years</option>)}
                </select>
              ) : (
                <input type="number" min={f.min ?? 0} value={f.v} onChange={e => f.s(Math.max(f.min ?? 0, Number(e.target.value) || 0))}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box', color: '#0F2A4A' }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px', marginTop: '20px', alignItems: 'start' }}>
          <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Monthly payment (PITI)</div>
            <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '42px', fontWeight: 800, color: '#0F2A4A', marginTop: '4px' }}>${Math.round(calc.total).toLocaleString()}</div>
            <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {segs.map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0F2A4A', fontWeight: 600 }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: s.color }} /> {s.label}
                  </span>
                  <span style={{ color: '#0F2A4A' }}>${Math.round(s.val).toLocaleString()}/mo</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '180px', height: '180px', borderRadius: '50%', background: `conic-gradient(${conicStops})` }} />
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '10px', textAlign: 'center' }}>Breakdown</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '12px', marginTop: '20px' }}>
          {[
            { label: 'Loan amount', val: `$${Math.round(calc.loan).toLocaleString()}` },
            { label: 'LTV ratio', val: `${calc.ltv.toFixed(1)}%` },
            { label: 'Total payments', val: `$${Math.round(calc.totalPayments).toLocaleString()}` },
            { label: 'Total interest', val: `$${Math.round(calc.totalInterest).toLocaleString()}` },
          ].map(s => (
            <div key={s.label} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '20px', fontWeight: 800, color: '#0F2A4A' }}>{s.val}</div>
              <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: '14px', fontWeight: 700, color: '#0F2A4A' }}>Amortization — first 12 months</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                <th style={{ padding: '10px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Month</th>
                <th style={{ padding: '10px', textAlign: 'right', fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Payment</th>
                <th style={{ padding: '10px', textAlign: 'right', fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Principal</th>
                <th style={{ padding: '10px', textAlign: 'right', fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Interest</th>
                <th style={{ padding: '10px', textAlign: 'right', fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Balance</th>
              </tr>
            </thead>
            <tbody>
              {calc.amort.map(r => (
                <tr key={r.month} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 10px', fontSize: '13px', color: '#0F2A4A' }}>{r.month}</td>
                  <td style={{ padding: '8px 10px', fontSize: '13px', color: '#0F2A4A', textAlign: 'right' }}>${Math.round(r.payment).toLocaleString()}</td>
                  <td style={{ padding: '8px 10px', fontSize: '13px', color: '#16A34A', textAlign: 'right' }}>${Math.round(r.principal).toLocaleString()}</td>
                  <td style={{ padding: '8px 10px', fontSize: '13px', color: '#DC2626', textAlign: 'right' }}>${Math.round(r.interest).toLocaleString()}</td>
                  <td style={{ padding: '8px 10px', fontSize: '13px', color: '#0F2A4A', textAlign: 'right' }}>${Math.round(r.balance).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
