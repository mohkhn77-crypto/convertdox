'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

interface AmortRow { month: number; emi: number; principal: number; interest: number; balance: number }

export default function LoanEMICalculatorPage() {
  const [principal, setPrincipal] = useState('500000')
  const [rate, setRate] = useState('10.5')
  const [tenure, setTenure] = useState('60')
  const [tenureUnit, setTenureUnit] = useState<'months' | 'years'>('months')
  const [showFull, setShowFull] = useState(false)

  const result = useMemo(() => {
    const P = parseFloat(principal)
    const annualRate = parseFloat(rate)
    const months = tenureUnit === 'years' ? parseFloat(tenure) * 12 : parseFloat(tenure)
    if (!P || !annualRate || !months || P <= 0 || annualRate <= 0 || months <= 0) return null
    const r = annualRate / 100 / 12
    const emi = P * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1)
    const totalPayment = emi * months
    const totalInterest = totalPayment - P
    const rows: AmortRow[] = []
    let balance = P
    for (let i = 1; i <= months; i++) {
      const intPart = balance * r
      const prinPart = emi - intPart
      balance -= prinPart
      rows.push({ month: i, emi, principal: prinPart, interest: intPart, balance: Math.max(0, balance) })
    }
    return { emi, totalPayment, totalInterest, rows, months }
  }, [principal, rate, tenure, tenureUnit])

  const fmt = (n: number) => '₹' + n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const pct = result ? (result.totalInterest / result.totalPayment * 100).toFixed(1) : '0'
  const prinPct = result ? (100 - parseFloat(pct)).toFixed(1) : '100'

  const inp = (label: string, value: string, set: (v: string) => void, ph: string, type = 'number') => (
    <div>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>{label}</label>
      <input type={type} value={value} onChange={e => set(e.target.value)} placeholder={ph}
        style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🏦</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Loan EMI Calculator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Calculate EMI, total interest, and full amortization schedule for any loan</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '900px', margin: '32px auto 0', padding: '0 20px 60px' }}>

        {/* Input Card */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F2A4A', margin: '0 0 20px' }}>Loan Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {inp('Loan Amount (₹)', principal, setPrincipal, '500000')}
            {inp('Interest Rate (% per annum)', rate, setRate, '10.5')}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>Loan Tenure</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="number" value={tenure} onChange={e => setTenure(e.target.value)} placeholder={tenureUnit === 'months' ? '60' : '5'}
                  style={{ flex: 1, padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '15px', fontFamily: 'inherit', outline: 'none' }} />
                <select value={tenureUnit} onChange={e => setTenureUnit(e.target.value as 'months' | 'years')}
                  style={{ padding: '12px 10px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', background: 'white' }}>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {result && (
          <>
            {/* Results */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: '#0F2A4A', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 600, marginBottom: '8px' }}>Monthly EMI</div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: '#F48C42' }}>{fmt(result.emi)}</div>
              </div>
              <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '24px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '8px' }}>Total Interest</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#dc2626' }}>{fmt(result.totalInterest)}</div>
              </div>
              <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '24px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '8px' }}>Total Payment</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#0F2A4A' }}>{fmt(result.totalPayment)}</div>
              </div>
            </div>

            {/* Breakdown bar */}
            <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '16px' }}>Payment Breakdown</div>
              <div style={{ display: 'flex', height: '20px', borderRadius: '10px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ width: `${prinPct}%`, background: '#0F2A4A' }} title={`Principal ${prinPct}%`} />
                <div style={{ width: `${pct}%`, background: '#E85D04' }} title={`Interest ${pct}%`} />
              </div>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#0F2A4A', fontWeight: 600 }}>
                  <span style={{ width: '12px', height: '12px', background: '#0F2A4A', borderRadius: '3px', display: 'inline-block' }} />
                  Principal ({prinPct}%)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#0F2A4A', fontWeight: 600 }}>
                  <span style={{ width: '12px', height: '12px', background: '#E85D04', borderRadius: '3px', display: 'inline-block' }} />
                  Interest ({pct}%)
                </span>
              </div>
            </div>

            {/* Amortization table */}
            <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F2A4A' }}>Amortization Schedule</div>
                <button onClick={() => setShowFull(!showFull)}
                  style={{ background: 'white', color: '#E85D04', border: '1.5px solid #E85D04', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {showFull ? 'Show Less' : `Show All ${result.months} Months`}
                </button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      {['Month', 'EMI', 'Principal', 'Interest', 'Balance'].map(h => (
                        <th key={h} style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#0F2A4A', borderBottom: '1.5px solid #e2e8f0', whiteSpace: 'nowrap' as const }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(showFull ? result.rows : result.rows.slice(0, 12)).map(row => (
                      <tr key={row.month} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '9px 12px', textAlign: 'right', color: '#64748b', fontWeight: 600 }}>{row.month}</td>
                        <td style={{ padding: '9px 12px', textAlign: 'right', color: '#0F2A4A' }}>{fmt(row.emi)}</td>
                        <td style={{ padding: '9px 12px', textAlign: 'right', color: '#16a34a' }}>{fmt(row.principal)}</td>
                        <td style={{ padding: '9px 12px', textAlign: 'right', color: '#dc2626' }}>{fmt(row.interest)}</td>
                        <td style={{ padding: '9px 12px', textAlign: 'right', color: '#0F2A4A', fontWeight: 600 }}>{fmt(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!showFull && result.months > 12 && (
                <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '13px', marginTop: '12px' }}>
                  Showing first 12 of {result.months} months
                </div>
              )}
            </div>
          </>
        )}

        {/* SEO Section */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F2A4A', marginBottom: '16px' }}>EMI Calculator — How It Works</h2>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            EMI (Equated Monthly Installment) is the fixed payment you make to a lender each month to repay a loan. It consists of both a principal component and an interest component. The formula used is: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is the principal, r is the monthly interest rate, and n is the number of months.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            In the early months of a loan, most of your EMI goes toward paying interest. As time passes, the principal component increases and the interest component decreases. This is clearly visible in the amortization schedule above. This is why prepaying a loan in the early years saves significantly more interest than prepaying later.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8 }}>
            Use this calculator to compare different loan scenarios — a shorter tenure means higher EMIs but lower total interest. A longer tenure reduces monthly burden but increases the total cost of borrowing. For home loans, a 1% difference in interest rate on a large principal can mean lakhs of rupees in extra payments over 20 years.
          </p>
        </div>
      </div>
    </div>
  )
}
