'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const ACTIVITY = [
  { label: 'Sedentary (little or no exercise)', mult: 1.2 },
  { label: 'Lightly active (1-3 days/week)', mult: 1.375 },
  { label: 'Moderately active (3-5 days/week)', mult: 1.55 },
  { label: 'Very active (6-7 days/week)', mult: 1.725 },
  { label: 'Super active (very hard exercise)', mult: 1.9 },
]

export default function CalorieCalculatorPage() {
  const [age, setAge] = useState('30')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [height, setHeight] = useState('175')
  const [heightFt, setHeightFt] = useState('5')
  const [heightIn, setHeightIn] = useState('9')
  const [weight, setWeight] = useState('75')
  const [activity, setActivity] = useState(1.55)
  const [result, setResult] = useState<{ bmr: number; tdee: number; loss: number; gain: number } | null>(null)

  function calculate() {
    const a = parseInt(age)
    let wKg = parseFloat(weight)
    let hCm = parseFloat(height)

    if (unit === 'imperial') {
      wKg = wKg * 0.453592
      hCm = (parseInt(heightFt) * 12 + parseFloat(heightIn)) * 2.54
    }

    if (!a || !wKg || !hCm) return

    let bmr: number
    if (gender === 'male') {
      bmr = 10 * wKg + 6.25 * hCm - 5 * a + 5
    } else {
      bmr = 10 * wKg + 6.25 * hCm - 5 * a - 161
    }

    const tdee = bmr * activity
    setResult({ bmr, tdee, loss: tdee - 500, gain: tdee + 500 })
  }

  const fmtCal = (n: number) => Math.round(n).toLocaleString() + ' cal'

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🔥</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Calorie Calculator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Calculate BMR and daily calorie needs using Mifflin-St Jeor formula</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Unit toggle */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {(['metric', 'imperial'] as const).map(u => (
            <button key={u} onClick={() => setUnit(u)}
              style={{ padding: '8px 18px', borderRadius: '8px', border: '1.5px solid', borderColor: unit === u ? '#0F2A4A' : '#e2e8f0', background: unit === u ? '#0F2A4A' : 'white', color: unit === u ? 'white' : '#64748b', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
              {u}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '16px', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Age (years)</div>
            <input type="number" value={age} onChange={e => setAge(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Gender</div>
            <select value={gender} onChange={e => setGender(e.target.value as 'male' | 'female')}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', background: 'white', boxSizing: 'border-box' as const }}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {unit === 'metric' ? (
            <>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Height (cm)</div>
                <input type="number" value={height} onChange={e => setHeight(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Weight (kg)</div>
                <input type="number" value={weight} onChange={e => setWeight(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
              </div>
            </>
          ) : (
            <>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Height</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="number" value={heightFt} onChange={e => setHeightFt(e.target.value)} placeholder="ft"
                    style={{ width: '50%', padding: '12px 10px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
                  <input type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)} placeholder="in"
                    style={{ width: '50%', padding: '12px 10px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
                </div>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Weight (lbs)</div>
                <input type="number" value={weight} onChange={e => setWeight(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
              </div>
            </>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Activity Level</div>
          <select value={activity} onChange={e => setActivity(parseFloat(e.target.value))}
            style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', background: 'white', boxSizing: 'border-box' as const }}>
            {ACTIVITY.map(a => <option key={a.mult} value={a.mult}>{a.label}</option>)}
          </select>
        </div>

        <button onClick={calculate}
          style={{ background: '#E85D04', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          Calculate Calories
        </button>

        {result && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '14px', marginTop: '32px' }}>
            {[
              { label: 'BMR (Basal Metabolic Rate)', val: fmtCal(result.bmr), desc: 'Calories burned at rest', color: '#7C3AED' },
              { label: 'TDEE (Maintenance)', val: fmtCal(result.tdee), desc: 'Calories to maintain weight', color: '#0284C7' },
              { label: 'Weight Loss', val: fmtCal(result.loss), desc: '500 cal deficit per day', color: '#16A34A' },
              { label: 'Weight Gain', val: fmtCal(result.gain), desc: '500 cal surplus per day', color: '#E85D04' },
            ].map(item => (
              <div key={item.label} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '18px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', lineHeight: '1.4' }}>{item.label}</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: item.color, fontFamily: "'Space Grotesk',sans-serif", marginBottom: '4px' }}>{item.val}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
