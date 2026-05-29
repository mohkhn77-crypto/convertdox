'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

export default function InvestmentCalculatorPage() {
  const [initial, setInitial] = useState(10000)
  const [monthly, setMonthly] = useState(500)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(10)

  const result = useMemo(() => {
    const monthlyRate = rate / 100 / 12
    const months = years * 12
    const yearly: { year: number; balance: number; invested: number; earnings: number }[] = []
    let balance = initial
    let invested = initial
    for (let m = 1; m <= months; m++) {
      balance = balance * (1 + monthlyRate) + monthly
      invested += monthly
      if (m % 12 === 0) {
        yearly.push({
          year: m / 12,
          balance: Math.round(balance),
          invested: Math.round(invested),
          earnings: Math.round(balance - invested),
        })
      }
    }
    return {
      future: Math.round(balance),
      invested: Math.round(invested),
      earnings: Math.round(balance - invested),
      roi: invested > 0 ? (((balance - invested) / invested) * 100).toFixed(1) : '0',
      yearly,
    }
  }, [initial, monthly, rate, years])

  const max = Math.max(result.invested, result.earnings, 1)

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📈</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Investment Calculator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Project the growth of your investments over time.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Initial investment ($)</label>
            <input type="number" min={0} value={initial} onChange={e => setInitial(Math.max(0, Number(e.target.value) || 0))}
              style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box', color: '#0F2A4A' }} />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Monthly contribution ($)</label>
            <input type="number" min={0} value={monthly} onChange={e => setMonthly(Math.max(0, Number(e.target.value) || 0))}
              style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box', color: '#0F2A4A' }} />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Annual return ({rate.toFixed(1)}%)</label>
            <input type="range" min={1} max={20} step={0.1} value={rate} onChange={e => setRate(Number(e.target.value))} style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Years ({years})</label>
            <input type="range" min={1} max={40} value={years} onChange={e => setYears(Number(e.target.value))} style={{ width: '100%' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', alignSelf: 'center' }}>Presets:</span>
          {[{ l: 'Conservative (4%)', r: 4 }, { l: 'Moderate (7%)', r: 7 }, { l: 'Aggressive (10%)', r: 10 }].map(p => (
            <button key={p.l} onClick={() => setRate(p.r)} style={{ padding: '6px 12px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: '#C2410C', cursor: 'pointer', fontFamily: 'inherit' }}>{p.l}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '12px', marginTop: '20px' }}>
          {[
            { label: 'Future value', val: `$${result.future.toLocaleString()}`, color: '#16A34A' },
            { label: 'Total invested', val: `$${result.invested.toLocaleString()}`, color: '#0F2A4A' },
            { label: 'Total earnings', val: `$${result.earnings.toLocaleString()}`, color: '#E85D04' },
            { label: 'ROI', val: `${result.roi}%`, color: '#0F2A4A' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '22px', fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '10px' }}>Invested vs Earnings</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontSize: '12px', color: '#0F2A4A', fontWeight: 600 }}>Total invested</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>${result.invested.toLocaleString()}</span>
              </div>
              <div style={{ height: '14px', background: '#f1f5f9', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: `${(result.invested / max) * 100}%`, height: '100%', background: '#0F2A4A' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontSize: '12px', color: '#E85D04', fontWeight: 600 }}>Total earnings</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>${result.earnings.toLocaleString()}</span>
              </div>
              <div style={{ height: '14px', background: '#f1f5f9', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: `${(result.earnings / max) * 100}%`, height: '100%', background: '#E85D04' }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '10px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Year</th>
                <th style={{ padding: '10px', textAlign: 'right', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Balance</th>
                <th style={{ padding: '10px', textAlign: 'right', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Invested</th>
                <th style={{ padding: '10px', textAlign: 'right', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Earnings</th>
              </tr>
            </thead>
            <tbody>
              {result.yearly.map(r => (
                <tr key={r.year} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 10px', fontSize: '13px', color: '#0F2A4A' }}>{r.year}</td>
                  <td style={{ padding: '8px 10px', fontSize: '13px', color: '#0F2A4A', textAlign: 'right' }}>${r.balance.toLocaleString()}</td>
                  <td style={{ padding: '8px 10px', fontSize: '13px', color: '#64748b', textAlign: 'right' }}>${r.invested.toLocaleString()}</td>
                  <td style={{ padding: '8px 10px', fontSize: '13px', color: '#16A34A', textAlign: 'right' }}>${r.earnings.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
