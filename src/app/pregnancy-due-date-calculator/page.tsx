'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function fmtDate(d: Date) {
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

function fmtShort(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function PregnancyDueDatePage() {
  const [lmp, setLmp] = useState('')
  const [cycleLen, setCycleLen] = useState(28)

  const result = useMemo(() => {
    if (!lmp) return null
    const lmpDate = new Date(lmp)
    if (isNaN(lmpDate.getTime())) return null

    const ovulation = addDays(lmpDate, cycleLen - 14)
    const conception = ovulation
    const edd = addDays(lmpDate, 280 + (cycleLen - 28))
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const daysPregnant = Math.floor((today.getTime() - lmpDate.getTime()) / 86400000)
    const weekPregnant = Math.floor(daysPregnant / 7)
    const dayInWeek = daysPregnant % 7
    const daysToGo = Math.floor((edd.getTime() - today.getTime()) / 86400000)

    const trimester = weekPregnant < 14 ? '1st Trimester' : weekPregnant < 28 ? '2nd Trimester' : '3rd Trimester'
    const trimesterColor = weekPregnant < 14 ? '#E85D04' : weekPregnant < 28 ? '#16a34a' : '#7c3aed'

    const progressPct = Math.min(100, Math.max(0, Math.round(daysPregnant / 280 * 100)))

    const milestones = [
      { week: 6, label: 'Heartbeat detectable' },
      { week: 8, label: 'Prenatal checkup' },
      { week: 12, label: 'End of 1st trimester' },
      { week: 16, label: 'Gender may be visible' },
      { week: 20, label: 'Anatomy scan / halfway' },
      { week: 24, label: 'Viability milestone' },
      { week: 28, label: 'End of 2nd trimester' },
      { week: 36, label: 'Baby is full-term soon' },
      { week: 40, label: 'Due date' },
    ].map(m => ({
      ...m,
      date: fmtShort(addDays(lmpDate, m.week * 7)),
      passed: weekPregnant >= m.week,
    }))

    return { edd, conception, daysPregnant, weekPregnant, dayInWeek, daysToGo, trimester, trimesterColor, progressPct, milestones }
  }, [lmp, cycleLen])

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🤰</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Pregnancy Due Date Calculator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Calculate your EDD, current week, trimester, and key milestones</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '900px', margin: '32px auto 0', padding: '0 20px 60px' }}>

        {/* Input Card */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F2A4A', margin: '0 0 20px' }}>Enter Your Information</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>First Day of Last Menstrual Period (LMP)</label>
              <input type="date" value={lmp} onChange={e => setLmp(e.target.value)} max={new Date().toISOString().split('T')[0]}
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>
                Average Cycle Length: <span style={{ color: '#E85D04' }}>{cycleLen} days</span>
              </label>
              <input type="range" min={21} max={35} value={cycleLen} onChange={e => setCycleLen(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#E85D04', marginTop: '14px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                <span>21 days</span><span>28 days (avg)</span><span>35 days</span>
              </div>
            </div>
          </div>
        </div>

        {result ? (
          <>
            {/* Due date hero */}
            <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', borderRadius: '20px', padding: '32px', textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Estimated Due Date</div>
              <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(20px,3vw,28px)', fontWeight: 800, color: '#F48C42', marginBottom: '12px' }}>
                {fmtDate(result.edd)}
              </div>
              {result.daysPregnant >= 0 && result.weekPregnant <= 42 ? (
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px' }}>
                  Week <strong style={{ color: 'white' }}>{result.weekPregnant}</strong> + {result.dayInWeek} days
                  &nbsp;·&nbsp;
                  <strong style={{ color: result.trimesterColor }}>{result.trimester}</strong>
                  {result.daysToGo > 0 && <>&nbsp;·&nbsp;<strong style={{ color: 'white' }}>{result.daysToGo} days</strong> to go</>}
                  {result.daysToGo <= 0 && <>&nbsp;·&nbsp;<strong style={{ color: '#F48C42' }}>Due date reached!</strong></>}
                </div>
              ) : (
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Based on your LMP date</div>
              )}
            </div>

            {/* Progress bar */}
            {result.daysPregnant >= 0 && (
              <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '20px 24px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A' }}>Pregnancy Progress</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#E85D04' }}>{result.progressPct}%</span>
                </div>
                <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${result.progressPct}%`, height: '100%', background: 'linear-gradient(90deg,#E85D04,#F48C42)', borderRadius: '5px', transition: 'width 0.4s' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
                  <span>Week 1</span><span>Week 14 (2nd tri)</span><span>Week 28 (3rd tri)</span><span>Week 40</span>
                </div>
              </div>
            )}

            {/* Key dates */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              {[
                { label: 'Estimated Conception', value: fmtShort(result.conception), color: '#7c3aed' },
                { label: 'Estimated Due Date', value: fmtShort(result.edd), color: '#E85D04' },
                { label: 'Current Trimester', value: result.trimester, color: result.trimesterColor },
              ].map(item => (
                <div key={item.label} style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: item.color, marginBottom: '6px' }}>{item.value}</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>{item.label}</div>
                </div>
              ))}
            </div>

            {/* Milestones */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '16px' }}>Key Pregnancy Milestones</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {result.milestones.map((m, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 0', borderBottom: i < result.milestones.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: m.passed ? '#0F2A4A' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '14px' }}>{m.passed ? '✓' : '○'}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: m.passed ? '#0F2A4A' : '#94a3b8' }}>Week {m.week} — {m.label}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{m.date}</div>
                    </div>
                    {result.weekPregnant === m.week && (
                      <span style={{ background: '#E85D04', color: 'white', borderRadius: '20px', padding: '2px 10px', fontSize: '11px', fontWeight: 700 }}>Now</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '15px', padding: '40px' }}>
            Enter your LMP date above to calculate your due date and milestones
          </div>
        )}

        {/* Disclaimer */}
        <div style={{ background: '#FFF7ED', border: '1.5px solid #FED7AA', borderRadius: '12px', padding: '16px', marginTop: '24px', fontSize: '13px', color: '#92400E' }}>
          <strong>Medical Disclaimer:</strong> This calculator provides estimates based on standard pregnancy calculations. Always consult your healthcare provider for accurate prenatal care and due date confirmation.
        </div>

        {/* SEO Section */}
        <div style={{ marginTop: '40px', background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F2A4A', marginBottom: '16px' }}>How Is Your Due Date Calculated?</h2>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            The most common method for calculating your estimated due date (EDD) is Naegele&apos;s Rule, which adds 280 days (40 weeks) to the first day of your last menstrual period. This assumes a 28-day cycle with ovulation on day 14. Our calculator adjusts for cycle lengths between 21–35 days.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            Pregnancy is divided into three trimesters: the first trimester (weeks 1–13) when major organs develop, the second trimester (weeks 14–27) often called the &quot;honeymoon period&quot;, and the third trimester (weeks 28–40) when the baby gains weight rapidly. Only about 5% of babies are born exactly on their EDD.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8 }}>
            Key prenatal milestones include the first heartbeat detection around week 6, the anatomy scan at week 20, and the viability milestone at week 24. Full-term pregnancy is considered 37–42 weeks. Use this calculator as a guide, and always confirm your due date with your OB-GYN through ultrasound dating.
          </p>
        </div>
      </div>
    </div>
  )
}
