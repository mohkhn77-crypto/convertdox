'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

type Unit = 'lbs' | 'kg'
type Activity = 'sedentary' | 'light' | 'active' | 'very'
type Climate = 'cool' | 'moderate' | 'hot'

export default function WaterIntakePage() {
  const [unit, setUnit] = useState<Unit>('lbs')
  const [weight, setWeight] = useState(160)
  const [activity, setActivity] = useState<Activity>('light')
  const [climate, setClimate] = useState<Climate>('moderate')
  const [pregnant, setPregnant] = useState(false)
  const [breastfeeding, setBreastfeeding] = useState(false)

  const calc = useMemo(() => {
    const kg = unit === 'lbs' ? weight * 0.453592 : weight
    let liters = 0.033 * kg
    if (activity === 'active') liters += 0.35
    if (activity === 'very') liters += 0.7
    if (climate === 'hot') liters += 0.35
    if (pregnant) liters += 0.3
    if (breastfeeding) liters += 0.7
    const oz = liters * 33.814
    const glasses = oz / 8
    const bottles = (liters * 1000) / 500
    const hourly = liters / 14
    const hourlyOz = oz / 14
    return { liters, oz, glasses, bottles, hourly, hourlyOz }
  }, [unit, weight, activity, climate, pregnant, breastfeeding])

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>💧</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Water Intake Calculator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Daily hydration needs based on weight, activity, and climate.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
            <button onClick={() => setUnit('lbs')} style={{ padding: '8px 14px', background: unit === 'lbs' ? '#0F2A4A' : 'white', color: unit === 'lbs' ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>lbs</button>
            <button onClick={() => setUnit('kg')} style={{ padding: '8px 14px', background: unit === 'kg' ? '#0F2A4A' : 'white', color: unit === 'kg' ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>kg</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Weight ({unit})</label>
              <input type="number" min={0} value={weight} onChange={e => setWeight(Math.max(0, Number(e.target.value) || 0))} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Activity level</label>
              <select value={activity} onChange={e => setActivity(e.target.value as Activity)} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', background: 'white' }}>
                <option value="sedentary">Sedentary</option>
                <option value="light">Lightly active</option>
                <option value="active">Active</option>
                <option value="very">Very active</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Climate</label>
              <select value={climate} onChange={e => setClimate(e.target.value as Climate)} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', background: 'white' }}>
                <option value="cool">Cool</option>
                <option value="moderate">Moderate</option>
                <option value="hot">Hot / Humid</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '20px', marginTop: '14px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#0F2A4A', cursor: 'pointer' }}>
              <input type="checkbox" checked={pregnant} onChange={e => setPregnant(e.target.checked)} /> Pregnant
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#0F2A4A', cursor: 'pointer' }}>
              <input type="checkbox" checked={breastfeeding} onChange={e => setBreastfeeding(e.target.checked)} /> Breastfeeding
            </label>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '12px', marginTop: '20px' }}>
          {[
            { label: 'Liters/day', val: calc.liters.toFixed(2) },
            { label: 'Ounces/day', val: calc.oz.toFixed(1) },
            { label: 'Glasses (8 oz)', val: calc.glasses.toFixed(1) },
            { label: 'Bottles (500 ml)', val: calc.bottles.toFixed(1) },
          ].map(s => (
            <div key={s.label} style={{ background: '#EFF6FF', border: '1.5px solid #BFDBFE', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '28px', fontWeight: 800, color: '#1D4ED8' }}>{s.val}</div>
              <div style={{ fontSize: '11.5px', color: '#1E40AF', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '16px', fontWeight: 700, color: '#0F2A4A', margin: '0 0 14px' }}>Hourly schedule (spread over 14 waking hours)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: '8px' }}>
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#1E40AF', fontWeight: 600 }}>Hour {i + 1}</div>
                <div style={{ fontSize: '14px', color: '#1D4ED8', fontWeight: 700, marginTop: '2px' }}>{calc.hourlyOz.toFixed(1)} oz</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '20px', background: '#FFF7ED', border: '1.5px solid #FED7AA', borderRadius: '12px', padding: '16px 20px' }}>
          <h3 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '14px', fontWeight: 700, color: '#9A3412', margin: '0 0 8px' }}>Hydration tips</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#9A3412', lineHeight: 1.7 }}>
            <li>Start your morning with a glass of water before coffee.</li>
            <li>Keep a refillable bottle on your desk — visible water gets sipped.</li>
            <li>Drink a glass before each meal to aid digestion and reduce overeating.</li>
            <li>Pale yellow urine is a sign you&apos;re well hydrated.</li>
          </ul>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
