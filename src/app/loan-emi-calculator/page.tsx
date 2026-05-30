'use client'
import { useMemo, useState } from 'react'

export default function LoanEMICalculator() {
  const [loanAmount, setLoanAmount] = useState(100000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(5)

  const calculation = useMemo(() => {
    const principal = loanAmount
    const monthlyRate = interestRate / 12 / 100
    const months = tenure * 12

    if (principal <= 0 || monthlyRate <= 0 || months <= 0) {
      return { emi: '0.00', totalInterest: '0.00', totalPayment: '0.00' }
    }

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    const totalPayment = emi * months
    const totalInterest = totalPayment - principal

    return {
      emi: emi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2)
    }
  }, [loanAmount, interestRate, tenure])

  const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none' }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F2A4A', marginBottom: '8px' }}>Loan EMI Calculator</h1>
        <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '32px' }}>Calculate monthly installments for any loan instantly. Free, accurate, no signup.</p>

        <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0F2A4A', marginBottom: '8px' }}>Loan Amount ($)</label>
            <input type="number" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} style={inputStyle} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0F2A4A', marginBottom: '8px' }}>Interest Rate (% per year)</label>
            <input type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} style={inputStyle} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0F2A4A', marginBottom: '8px' }}>Loan Tenure (years)</label>
            <input type="number" value={tenure} onChange={e => setTenure(Number(e.target.value))} style={inputStyle} />
          </div>

          <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1.5px solid #e2e8f0' }}>
              <span style={{ color: '#64748b', fontWeight: 600 }}>Monthly EMI:</span>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#E85D04' }}>${calculation.emi}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1.5px solid #e2e8f0' }}>
              <span style={{ color: '#64748b', fontWeight: 600 }}>Total Interest:</span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#0F2A4A' }}>${calculation.totalInterest}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
              <span style={{ color: '#64748b', fontWeight: 600 }}>Total Payment:</span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#0F2A4A' }}>${calculation.totalPayment}</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '48px', background: 'white', padding: '32px', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0F2A4A', marginBottom: '16px' }}>About EMI Calculator</h2>
          <p style={{ color: '#334155', lineHeight: 1.7 }}>Calculate Equated Monthly Installments (EMI) for any loan instantly. Useful for personal loans, home loans, car loans, education loans, and business loans. Just enter the loan amount, interest rate, and tenure to see your monthly payment and total interest. Uses the standard EMI formula trusted by banks worldwide.</p>
        </div>
      </div>
    </div>
  )
}
