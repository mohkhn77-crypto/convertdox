'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

type Gender = 'M' | 'F'
type Unit = 'metric' | 'imperial'
type Activity = 'sedentary' | 'light' | 'moderate' | 'very' | 'extra'
type Goal = 'lose' | 'maintain' | 'gain' | 'cutting' | 'bulking'
type Split = 'balanced' | 'high-protein' | 'keto'

const ACTIVITY_MULT: Record<Activity, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, very: 1.725, extra: 1.9 }
const GOAL_ADJ: Record<Goal, number> = { lose: -500, maintain: 0, gain: 300, cutting: -300, bulking: 500 }
const SPLITS: Record<Split, { p: number; c: number; f: number }> = {
  'balanced': { p: 0.30, c: 0.40, f: 0.30 },
  'high-protein': { p: 0.40, c: 0.30, f: 0.30 },
  'keto': { p: 0.25, c: 0.05, f: 0.70 },
}

export default function MacroCalculatorPage() {
  const [unit, setUnit] = useState<Unit>('metric')
  const [gender, setGender] = useState<Gender>('M')
  const [age, setAge] = useState(30)
  const [weight, setWeight] = useState(75)
  const [heightCm, setHeightCm] = useState(180)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(11)
  const [activity, setActivity] = useState<Activity>('moderate')
  const [goal, setGoal] = useState<Goal>('maintain')
  const [split, setSplit] = useState<Split>('balanced')

  const result = useMemo(() => {
    const wKg = unit === 'metric' ? weight : weight * 0.453592
    const hCm = unit === 'metric' ? heightCm : (heightFt * 12 + heightIn) * 2.54
    const bmr = gender === 'M'
      ? 10 * wKg + 6.25 * hCm - 5 * age + 5
      : 10 * wKg + 6.25 * hCm - 5 * age - 161
    const tdee = bmr * ACTIVITY_MULT[activity]
    const target = tdee + GOAL_ADJ[goal]
    const s = SPLITS[split]
    const proteinCals = target * s.p
    const carbCals = target * s.c
    const fatCals = target * s.f
    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      target: Math.round(target),
      protein: Math.round(proteinCals / 4),
      carbs: Math.round(carbCals / 4),
      fat: Math.round(fatCals / 9),
    }
  }, [unit, gender, age, weight, heightCm, heightFt, heightIn, activity, goal, split])

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🥗</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Macro Calculator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Daily protein, carb, and fat targets by goal.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
            <button onClick={() => setUnit('metric')} style={{ padding: '8px 14px', background: unit === 'metric' ? '#0F2A4A' : 'white', color: unit === 'metric' ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Metric</button>
            <button onClick={() => setUnit('imperial')} style={{ padding: '8px 14px', background: unit === 'imperial' ? '#0F2A4A' : 'white', color: unit === 'imperial' ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Imperial</button>
            <div style={{ width: '1px', background: '#e2e8f0' }} />
            <button onClick={() => setGender('M')} style={{ padding: '8px 14px', background: gender === 'M' ? '#0F2A4A' : 'white', color: gender === 'M' ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Male</button>
            <button onClick={() => setGender('F')} style={{ padding: '8px 14px', background: gender === 'F' ? '#0F2A4A' : 'white', color: gender === 'F' ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Female</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Age</label>
              <input type="number" min={1} value={age} onChange={e => setAge(Math.max(1, Number(e.target.value) || 1))} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
              <input type="number" min={0} value={weight} onChange={e => setWeight(Math.max(0, Number(e.target.value) || 0))} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            {unit === 'metric' ? (
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Height (cm)</label>
                <input type="number" min={0} value={heightCm} onChange={e => setHeightCm(Math.max(0, Number(e.target.value) || 0))} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
            ) : (
              <>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Height (ft)</label>
                  <input type="number" min={0} value={heightFt} onChange={e => setHeightFt(Math.max(0, Number(e.target.value) || 0))} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Height (in)</label>
                  <input type="number" min={0} value={heightIn} onChange={e => setHeightIn(Math.max(0, Number(e.target.value) || 0))} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
              </>
            )}
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Activity level</label>
              <select value={activity} onChange={e => setActivity(e.target.value as Activity)} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', background: 'white' }}>
                <option value="sedentary">Sedentary (×1.2)</option>
                <option value="light">Lightly active (×1.375)</option>
                <option value="moderate">Moderately active (×1.55)</option>
                <option value="very">Very active (×1.725)</option>
                <option value="extra">Extra active (×1.9)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value as Goal)} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', background: 'white' }}>
                <option value="lose">Lose Weight (-500)</option>
                <option value="maintain">Maintain</option>
                <option value="gain">Gain Muscle (+300)</option>
                <option value="cutting">Cutting (-300)</option>
                <option value="bulking">Bulking (+500)</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', alignSelf: 'center', color: '#0F2A4A', fontWeight: 600 }}>Macro split:</span>
            {(['balanced','high-protein','keto'] as const).map(s => (
              <button key={s} onClick={() => setSplit(s)} style={{ padding: '8px 14px', background: split === s ? '#E85D04' : 'white', color: split === s ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600, fontSize: '13px', cursor: 'pointer', textTransform: 'capitalize' }}>{s.replace('-', ' ')}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '12px', marginTop: '20px' }}>
          {[
            { label: 'BMR', val: `${result.bmr} cal` },
            { label: 'TDEE', val: `${result.tdee} cal` },
            { label: 'Target calories', val: `${result.target} cal`, color: '#E85D04' },
          ].map(s => (
            <div key={s.label} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '22px', fontWeight: 800, color: s.color || '#0F2A4A' }}>{s.val}</div>
              <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '14px' }}>
          {[
            { label: 'Protein', val: result.protein, color: '#16A34A', bg: '#F0FDF4' },
            { label: 'Carbs', val: result.carbs, color: '#3B82F6', bg: '#EFF6FF' },
            { label: 'Fat', val: result.fat, color: '#E85D04', bg: '#FFF7ED' },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, border: `1.5px solid ${s.color}`, borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '32px', fontWeight: 800, color: s.color }}>{s.val}g</div>
              <div style={{ fontSize: '13px', color: s.color, marginTop: '4px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Per meal (4): {Math.round(s.val / 4)}g</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
