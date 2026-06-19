'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import RelatedTools from '@/components/RelatedTools'
import TrustStrip from '@/components/TrustStrip'
import ToolPageSEO from '@/components/ToolPageSEO'

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
      <ToolPageSEO
        toolName="Loan Calculator"
        whatIs="A loan calculator estimates your monthly payment on a loan based on three things: the amount you borrow (the principal), the interest rate, and the length of the loan (the term). It also shows the total amount you'll pay over the life of the loan and how much of that is interest. This helps you understand the real cost of borrowing before you commit, and compare how different rates or terms change what you'll pay each month."
        whatIsExtended="Loan payments work through amortization: each monthly payment covers some interest and some principal. Early on, more of your payment goes toward interest; over time, more goes toward paying down the balance. The ConvertDox Loan Calculator does this math instantly so you can see the monthly payment and total interest for any combination of amount, rate, and term. This is an estimate for planning purposes — your actual loan terms come from your lender, and you should review the full agreement before borrowing."
        howToUse={[
          'Enter the loan amount you want to borrow (the principal)',
          'Enter the annual interest rate offered',
          'Enter the loan term — the number of years or months to repay',
          'The calculator shows your estimated monthly payment',
          'Review the total cost and total interest over the life of the loan',
          'Adjust the figures to compare different scenarios',
        ]}
        useCases={[
          { title: 'Comparing Loan Offers', description: 'See how different interest rates or terms change your monthly payment and total cost so you can compare offers.' },
          { title: 'Budgeting', description: 'Find out whether an estimated monthly payment fits comfortably within your budget before applying.' },
          { title: 'Car Loans', description: 'Estimate payments on an auto loan to understand the real monthly cost of a vehicle.' },
          { title: 'Personal Loans', description: 'Work out what a personal loan would cost each month and in total interest.' },
          { title: 'Understanding Interest', description: 'See how much of your total payment is interest versus principal over the loan\'s life.' },
          { title: 'Planning Ahead', description: 'Model different loan amounts to decide how much is sensible to borrow.' },
        ]}
        tips={[
          'A longer term lowers the monthly payment but increases the total interest you pay',
          'Even a small difference in interest rate can mean a large difference over the full term',
          'The total cost — not just the monthly payment — is the real measure of an affordable loan',
          'Check whether the rate quoted is the APR, which includes fees, for a true comparison',
          'Use the calculator to test "what if I borrow less" scenarios before committing',
          'This is an estimate; your lender\'s official figures and agreement are what count',
        ]}
        faqs={[
          { question: 'Is the loan calculator free?', answer: 'Yes, completely free with no signup and no usage limits.' },
          { question: 'How is the monthly payment calculated?', answer: 'It uses the standard amortization formula based on the principal, interest rate, and term. Each payment covers interest plus a portion of the principal, with the mix shifting toward principal over time.' },
          { question: 'Does a longer loan term cost more?', answer: 'Usually yes. A longer term reduces the monthly payment but means you pay interest for longer, increasing the total amount paid over the life of the loan.' },
          { question: 'Is this financial advice?', answer: 'No. This tool provides estimates for planning and educational purposes only. For decisions about borrowing, review your lender\'s official terms and consider speaking with a qualified financial professional.' },
          { question: 'Is my data stored?', answer: 'No. All calculations happen in your browser. Nothing you enter is uploaded or saved.' },
          { question: 'What\'s the difference between interest rate and APR?', answer: 'The interest rate is the cost of borrowing the principal. APR (annual percentage rate) includes the interest rate plus certain fees, giving a fuller picture of the loan\'s cost for comparison.' },
        ]}
        relatedTools={[
          { name: 'Mortgage Calculator', slug: 'mortgage-advanced', description: 'Estimate mortgage payments' },
          { name: 'Compound Interest', slug: 'compound-interest', description: 'Calculate compound interest growth' },
          { name: 'Loan EMI Calculator', slug: 'loan-emi-calculator', description: 'Calculate equated monthly instalments' },
          { name: 'Percentage Calculator', slug: 'percentage-calculator', description: 'Work out percentages' },
          { name: 'Investment Calculator', slug: 'investment-calculator', description: 'Project investment growth' },
        ]}
      />
    </div>
  )
}
