'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

type Gender = 'M' | 'F'
type Method = 'navy' | 'bmi'
type Unit = 'imperial' | 'metric'

function category(bf: number, g: Gender): { label: string; color: string } {
  if (g === 'M') {
    if (bf < 3) return { label: 'Essential', color: '#3B82F6' }
    if (bf <= 13) return { label: 'Athletes', color: '#16A34A' }
    if (bf <= 17) return { label: 'Fitness', color: '#22C55E' }
    if (bf <= 24) return { label: 'Acceptable', color: '#F59E0B' }
    return { label: 'Obese', color: '#DC2626' }
  }
  if (bf < 12) return { label: 'Essential', color: '#3B82F6' }
  if (bf <= 20) return { label: 'Athletes', color: '#16A34A' }
  if (bf <= 24) return { label: 'Fitness', color: '#22C55E' }
  if (bf <= 31) return { label: 'Acceptable', color: '#F59E0B' }
  return { label: 'Obese', color: '#DC2626' }
}

export default function BodyFatCalculatorPage() {
  const [gender, setGender] = useState<Gender>('M')
  const [method, setMethod] = useState<Method>('navy')
  const [unit, setUnit] = useState<Unit>('imperial')
  const [age, setAge] = useState(30)
  const [height, setHeight] = useState(70)
  const [weight, setWeight] = useState(180)
  const [neck, setNeck] = useState(15)
  const [waist, setWaist] = useState(34)
  const [hip, setHip] = useState(38)

  const bodyFat = useMemo(() => {
    const heightCm = unit === 'imperial' ? height * 2.54 : height
    const neckCm = unit === 'imperial' ? neck * 2.54 : neck
    const waistCm = unit === 'imperial' ? waist * 2.54 : waist
    const hipCm = unit === 'imperial' ? hip * 2.54 : hip
    const weightKg = unit === 'imperial' ? weight * 0.453592 : weight
    if (method === 'navy') {
      if (gender === 'M') {
        const diff = waistCm - neckCm
        if (diff <= 0 || heightCm <= 0) return 0
        return Math.max(0, 86.010 * Math.log10(diff) - 70.041 * Math.log10(heightCm) + 36.76)
      } else {
        const sum = waistCm + hipCm - neckCm
        if (sum <= 0 || heightCm <= 0) return 0
        return Math.max(0, 163.205 * Math.log10(sum) - 97.684 * Math.log10(heightCm) - 78.387)
      }
    }
    if (heightCm <= 0) return 0
    const bmi = weightKg / Math.pow(heightCm / 100, 2)
    const factor = gender === 'M' ? 1 : 0
    return Math.max(0, 1.20 * bmi + 0.23 * age - 10.8 * factor - 5.4)
  }, [gender, method, unit, age, height, weight, neck, waist, hip])

  const cat = category(bodyFat, gender)
  const fatMass = ((bodyFat / 100) * (unit === 'imperial' ? weight : weight)).toFixed(1)
  const leanMass = ((1 - bodyFat / 100) * (unit === 'imperial' ? weight : weight)).toFixed(1)
  const w = unit === 'imperial' ? 'lbs' : 'kg'

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>💪</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Body Fat Calculator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>US Navy method or BMI-based estimate.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
            <button onClick={() => setGender('M')} style={{ padding: '8px 16px', background: gender === 'M' ? '#0F2A4A' : 'white', color: gender === 'M' ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Male</button>
            <button onClick={() => setGender('F')} style={{ padding: '8px 16px', background: gender === 'F' ? '#0F2A4A' : 'white', color: gender === 'F' ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Female</button>
            <div style={{ width: '1px', background: '#e2e8f0' }} />
            <button onClick={() => setMethod('navy')} style={{ padding: '8px 16px', background: method === 'navy' ? '#E85D04' : 'white', color: method === 'navy' ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>US Navy</button>
            <button onClick={() => setMethod('bmi')} style={{ padding: '8px 16px', background: method === 'bmi' ? '#E85D04' : 'white', color: method === 'bmi' ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>BMI-based</button>
            <div style={{ width: '1px', background: '#e2e8f0' }} />
            <button onClick={() => setUnit('imperial')} style={{ padding: '8px 16px', background: unit === 'imperial' ? '#0F2A4A' : 'white', color: unit === 'imperial' ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Imperial</button>
            <button onClick={() => setUnit('metric')} style={{ padding: '8px 16px', background: unit === 'metric' ? '#0F2A4A' : 'white', color: unit === 'metric' ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Metric</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Age</label>
              <input type="number" min={1} value={age} onChange={e => setAge(Math.max(1, Number(e.target.value) || 1))} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box', color: '#0F2A4A' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Height ({unit === 'imperial' ? 'in' : 'cm'})</label>
              <input type="number" min={0} value={height} onChange={e => setHeight(Math.max(0, Number(e.target.value) || 0))} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box', color: '#0F2A4A' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Weight ({w})</label>
              <input type="number" min={0} value={weight} onChange={e => setWeight(Math.max(0, Number(e.target.value) || 0))} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box', color: '#0F2A4A' }} />
            </div>
            {method === 'navy' && (
              <>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Neck ({unit === 'imperial' ? 'in' : 'cm'})</label>
                  <input type="number" min={0} value={neck} onChange={e => setNeck(Math.max(0, Number(e.target.value) || 0))} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box', color: '#0F2A4A' }} />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Waist ({unit === 'imperial' ? 'in' : 'cm'})</label>
                  <input type="number" min={0} value={waist} onChange={e => setWaist(Math.max(0, Number(e.target.value) || 0))} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box', color: '#0F2A4A' }} />
                </div>
                {gender === 'F' && (
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Hip ({unit === 'imperial' ? 'in' : 'cm'})</label>
                    <input type="number" min={0} value={hip} onChange={e => setHip(Math.max(0, Number(e.target.value) || 0))} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box', color: '#0F2A4A' }} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div style={{ marginTop: '20px', background: '#fff', border: `2px solid ${cat.color}`, borderRadius: '14px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Body fat percentage</div>
          <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '56px', fontWeight: 800, color: cat.color, lineHeight: 1 }}>{bodyFat.toFixed(1)}%</div>
          <div style={{ fontSize: '15px', color: cat.color, fontWeight: 700, marginTop: '6px' }}>{cat.label}</div>
          <div style={{ marginTop: '16px', height: '14px', background: '#f1f5f9', borderRadius: '7px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ width: `${Math.min(100, bodyFat * 2)}%`, height: '100%', background: `linear-gradient(90deg, #3B82F6, #16A34A, #F59E0B, #DC2626)` }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '12px', marginTop: '14px' }}>
          <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '22px', fontWeight: 800, color: '#0F2A4A' }}>{fatMass} {w}</div>
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Fat mass</div>
          </div>
          <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '22px', fontWeight: 800, color: '#0F2A4A' }}>{leanMass} {w}</div>
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Lean mass</div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
