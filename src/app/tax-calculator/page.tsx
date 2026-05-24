'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

type Country = 'US' | 'UK' | 'CA' | 'AU'
type Filing = 'single' | 'mfj' | 'hoh'

interface Bracket { rate: number; upTo: number | null }

const US_BRACKETS: Record<Filing, Bracket[]> = {
  single: [
    { rate: 0.10, upTo: 11925 },
    { rate: 0.12, upTo: 48475 },
    { rate: 0.22, upTo: 103350 },
    { rate: 0.24, upTo: 197300 },
    { rate: 0.32, upTo: 250525 },
    { rate: 0.35, upTo: 626350 },
    { rate: 0.37, upTo: null },
  ],
  mfj: [
    { rate: 0.10, upTo: 23850 },
    { rate: 0.12, upTo: 96950 },
    { rate: 0.22, upTo: 206700 },
    { rate: 0.24, upTo: 394600 },
    { rate: 0.32, upTo: 501050 },
    { rate: 0.35, upTo: 751600 },
    { rate: 0.37, upTo: null },
  ],
  hoh: [
    { rate: 0.10, upTo: 17000 },
    { rate: 0.12, upTo: 64850 },
    { rate: 0.22, upTo: 103350 },
    { rate: 0.24, upTo: 197300 },
    { rate: 0.32, upTo: 250500 },
    { rate: 0.35, upTo: 626350 },
    { rate: 0.37, upTo: null },
  ],
}
const US_DEDUCTION: Record<Filing, number> = { single: 15000, mfj: 30000, hoh: 22500 }

const UK_BRACKETS: Bracket[] = [
  { rate: 0, upTo: 12570 },
  { rate: 0.20, upTo: 50270 },
  { rate: 0.40, upTo: 125140 },
  { rate: 0.45, upTo: null },
]

const CA_BRACKETS: Bracket[] = [
  { rate: 0.15, upTo: 55867 },
  { rate: 0.205, upTo: 111733 },
  { rate: 0.26, upTo: 173205 },
  { rate: 0.29, upTo: 246752 },
  { rate: 0.33, upTo: null },
]

const AU_BRACKETS: Bracket[] = [
  { rate: 0, upTo: 18200 },
  { rate: 0.19, upTo: 45000 },
  { rate: 0.325, upTo: 135000 },
  { rate: 0.37, upTo: 190000 },
  { rate: 0.45, upTo: null },
]

function computeTax(income: number, brackets: Bracket[]) {
  let remaining = income
  let prev = 0
  let total = 0
  const breakdown: { range: string; rate: number; tax: number }[] = []
  for (const b of brackets) {
    const top = b.upTo === null ? Infinity : b.upTo
    const slice = Math.min(remaining, top - prev)
    if (slice > 0) {
      const tax = slice * b.rate
      total += tax
      breakdown.push({ range: `${prev.toLocaleString()} – ${b.upTo === null ? '∞' : b.upTo.toLocaleString()}`, rate: b.rate, tax })
      remaining -= slice
    }
    prev = top
    if (remaining <= 0) break
  }
  return { total, breakdown }
}

export default function TaxCalculatorPage() {
  const [country, setCountry] = useState<Country>('US')
  const [income, setIncome] = useState(75000)
  const [filing, setFiling] = useState<Filing>('single')

  const result = useMemo(() => {
    if (country === 'US') {
      const taxable = Math.max(0, income - US_DEDUCTION[filing])
      const { total, breakdown } = computeTax(taxable, US_BRACKETS[filing])
      return { taxable, total, breakdown, currency: '$' }
    }
    if (country === 'UK') {
      const { total, breakdown } = computeTax(income, UK_BRACKETS)
      return { taxable: income, total, breakdown, currency: '£' }
    }
    if (country === 'CA') {
      const { total, breakdown } = computeTax(income, CA_BRACKETS)
      return { taxable: income, total, breakdown, currency: 'CA$' }
    }
    const { total, breakdown } = computeTax(income, AU_BRACKETS)
    return { taxable: income, total, breakdown, currency: 'A$' }
  }, [country, income, filing])

  const effective = income > 0 ? (result.total / income) * 100 : 0
  const takeHome = income - result.total

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>💰</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Tax Calculator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>US, UK, Canada and Australia income tax estimate.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(['US','UK','CA','AU'] as const).map(c => (
              <button key={c} onClick={() => setCountry(c)} style={{ padding: '8px 16px', background: country === c ? '#0F2A4A' : 'white', color: country === c ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                {c === 'US' ? '🇺🇸 US' : c === 'UK' ? '🇬🇧 UK' : c === 'CA' ? '🇨🇦 Canada' : '🇦🇺 Australia'}
              </button>
            ))}
          </div>
          <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Annual income ({result.currency})</label>
              <input type="number" min={0} value={income} onChange={e => setIncome(Math.max(0, Number(e.target.value) || 0))}
                style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '15px', boxSizing: 'border-box', color: '#0F2A4A' }} />
            </div>
            {country === 'US' && (
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Filing status</label>
                <select value={filing} onChange={e => setFiling(e.target.value as Filing)}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', background: 'white', color: '#0F2A4A' }}>
                  <option value="single">Single</option>
                  <option value="mfj">Married Filing Jointly</option>
                  <option value="hoh">Head of Household</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '12px', marginTop: '20px' }}>
          {[
            { label: 'Gross income', val: `${result.currency}${income.toLocaleString()}`, color: '#0F2A4A' },
            { label: 'Total tax', val: `${result.currency}${Math.round(result.total).toLocaleString()}`, color: '#DC2626' },
            { label: 'Effective rate', val: `${effective.toFixed(2)}%`, color: '#E85D04' },
            { label: 'Take-home', val: `${result.currency}${Math.round(takeHome).toLocaleString()}`, color: '#16A34A' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '22px', fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: '14px', fontWeight: 700, color: '#0F2A4A' }}>Bracket breakdown</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                <th style={{ padding: '10px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Range ({result.currency})</th>
                <th style={{ padding: '10px', textAlign: 'right', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Rate</th>
                <th style={{ padding: '10px', textAlign: 'right', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Tax</th>
              </tr>
            </thead>
            <tbody>
              {result.breakdown.map((b, i) => (
                <tr key={i} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px', fontSize: '13px', color: '#0F2A4A' }}>{b.range}</td>
                  <td style={{ padding: '10px', fontSize: '13px', color: '#0F2A4A', textAlign: 'right' }}>{(b.rate * 100).toFixed(1)}%</td>
                  <td style={{ padding: '10px', fontSize: '13px', color: '#0F2A4A', textAlign: 'right' }}>{result.currency}{Math.round(b.tax).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '20px', background: '#FFF7ED', border: '1.5px solid #FED7AA', borderRadius: '10px', padding: '12px 16px', fontSize: '13px', color: '#9A3412' }}>
          <strong>Disclaimer:</strong> Estimate only. Doesn&apos;t include state/provincial tax, FICA/NI, or all deductions. Consult a tax professional for advice.
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
