'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

export default function RetirementCalculatorPage() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retireAge, setRetireAge] = useState(65)
  const [lifeExp] = useState(85)
  const [savings, setSavings] = useState(25000)
  const [contrib, setContrib] = useState(6000)
  const [salary, setSalary] = useState(70000)
  const [matchPct, setMatchPct] = useState(3)
  const [matchUpTo, setMatchUpTo] = useState(6)
  const [retRate, setRetRate] = useState(7)
  const [annualExp, setAnnualExp] = useState(50000)
  const [ssMonthly, setSsMonthly] = useState(2000)

  const calc = useMemo(() => {
    const years = Math.max(0, retireAge - currentAge)
    const r = retRate / 100
    const employerMatch = Math.min(contrib, salary * (matchUpTo / 100)) * (matchPct / matchUpTo || 0)
    const annualTotal = contrib + employerMatch
    let bal = savings
    const projection: { age: number; balance: number }[] = []
    for (let i = 0; i < years; i++) {
      bal = bal * (1 + r) + annualTotal
      projection.push({ age: currentAge + i + 1, balance: Math.round(bal) })
    }
    const nestEgg = Math.round(bal)
    const monthlyFromSavings = (nestEgg * 0.04) / 12
    const monthlyIncome = monthlyFromSavings + ssMonthly
    const monthlyExp = annualExp / 12
    const surplus = monthlyIncome - monthlyExp
    let status: { label: string; color: string }
    if (surplus > 500) status = { label: 'Ahead', color: '#16A34A' }
    else if (surplus >= -200) status = { label: 'On Track', color: '#3B82F6' }
    else status = { label: 'Behind', color: '#DC2626' }
    return { years, nestEgg, monthlyFromSavings, monthlyIncome, monthlyExp, surplus, status, projection }
  }, [currentAge, retireAge, savings, contrib, salary, matchPct, matchUpTo, retRate, annualExp, ssMonthly])

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🏦</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Retirement Calculator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Project your nest egg and monthly retirement income.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '14px' }}>
          {[
            { l: 'Current age', v: currentAge, s: setCurrentAge },
            { l: 'Retirement age', v: retireAge, s: setRetireAge },
            { l: 'Life expectancy', v: lifeExp, s: () => {} },
            { l: 'Current savings ($)', v: savings, s: setSavings },
            { l: 'Annual salary ($)', v: salary, s: setSalary },
            { l: 'Annual contribution ($)', v: contrib, s: setContrib },
            { l: 'Employer match (%)', v: matchPct, s: setMatchPct },
            { l: 'Up to salary (%)', v: matchUpTo, s: setMatchUpTo },
            { l: 'Annual retirement expenses ($)', v: annualExp, s: setAnnualExp },
            { l: 'Social Security (monthly $)', v: ssMonthly, s: setSsMonthly },
          ].map((f, i) => (
            <div key={i}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>{f.l}</label>
              <input type="number" min={0} value={f.v} onChange={e => f.s(Math.max(0, Number(e.target.value) || 0))}
                style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box', color: '#0F2A4A' }} />
            </div>
          ))}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Expected return ({retRate}%)</label>
            <input type="range" min={4} max={10} step={0.1} value={retRate} onChange={e => setRetRate(Number(e.target.value))} style={{ width: '100%' }} />
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 200px', gap: '14px' }}>
          <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Nest egg at retirement</div>
            <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '42px', fontWeight: 800, color: '#0F2A4A', marginTop: '4px' }}>${calc.nestEgg.toLocaleString()}</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>After {calc.years} years of saving</div>
          </div>
          <div style={{ background: calc.status.color, color: 'white', borderRadius: '14px', padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.85 }}>Status</div>
            <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '26px', fontWeight: 800, marginTop: '4px' }}>{calc.status.label}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '12px', marginTop: '20px' }}>
          {[
            { label: 'Monthly from savings', val: `$${Math.round(calc.monthlyFromSavings).toLocaleString()}` },
            { label: 'Total monthly income', val: `$${Math.round(calc.monthlyIncome).toLocaleString()}` },
            { label: 'Monthly expenses', val: `$${Math.round(calc.monthlyExp).toLocaleString()}` },
            { label: 'Monthly surplus', val: `$${Math.round(calc.surplus).toLocaleString()}`, color: calc.surplus >= 0 ? '#16A34A' : '#DC2626' },
          ].map(s => (
            <div key={s.label} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '20px', fontWeight: 800, color: s.color || '#0F2A4A' }}>{s.val}</div>
              <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', maxHeight: '400px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#f8fafc' }}>
              <tr>
                <th style={{ padding: '10px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Age</th>
                <th style={{ padding: '10px', textAlign: 'right', fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Projected balance</th>
              </tr>
            </thead>
            <tbody>
              {calc.projection.map(r => (
                <tr key={r.age} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 10px', fontSize: '13px', color: '#0F2A4A' }}>{r.age}</td>
                  <td style={{ padding: '8px 10px', fontSize: '13px', color: '#0F2A4A', textAlign: 'right' }}>${r.balance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
