'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

type DistUnit = 'mi' | 'km'
type EffUnit = 'mpg' | 'l100'

export default function FuelCostPage() {
  const [distance, setDistance] = useState(300)
  const [distUnit, setDistUnit] = useState<DistUnit>('mi')
  const [roundTrip, setRoundTrip] = useState(false)
  const [efficiency, setEfficiency] = useState(25)
  const [effUnit, setEffUnit] = useState<EffUnit>('mpg')
  const [price, setPrice] = useState(3.50)
  const [passengers, setPassengers] = useState(1)
  const [currency, setCurrency] = useState('$')

  const calc = useMemo(() => {
    const totalDist = distance * (roundTrip ? 2 : 1)
    const distMi = distUnit === 'mi' ? totalDist : totalDist / 1.60934
    const distKm = distUnit === 'km' ? totalDist : totalDist * 1.60934
    let fuelGallons = 0
    let fuelLiters = 0
    if (effUnit === 'mpg') {
      if (efficiency > 0) {
        fuelGallons = distMi / efficiency
        fuelLiters = fuelGallons * 3.78541
      }
    } else {
      if (efficiency > 0) {
        fuelLiters = (distKm * efficiency) / 100
        fuelGallons = fuelLiters / 3.78541
      }
    }
    // Price unit matches efficiency type
    const totalCost = effUnit === 'mpg' ? fuelGallons * price : fuelLiters * price
    const perMi = distMi > 0 ? totalCost / distMi : 0
    const perKm = distKm > 0 ? totalCost / distKm : 0
    const perPerson = Math.max(1, passengers)
    return { totalDist, distMi, distKm, fuelGallons, fuelLiters, totalCost, perMi, perKm, perPersonCost: totalCost / perPerson }
  }, [distance, distUnit, roundTrip, efficiency, effUnit, price, passengers])

  const presets = [
    { label: 'LA → SF (380 mi)', d: 380, u: 'mi' as const },
    { label: 'London → Edinburgh (410 mi)', d: 410, u: 'mi' as const },
    { label: 'Sydney → Melbourne (878 km)', d: 878, u: 'km' as const },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>⛽</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Fuel Cost Calculator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Estimate trip fuel cost and per-person share.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Distance</label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <input type="number" min={0} value={distance} onChange={e => setDistance(Math.max(0, Number(e.target.value) || 0))} style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box' }} />
              <select value={distUnit} onChange={e => setDistUnit(e.target.value as DistUnit)} style={{ padding: '10px 8px', border: '1.5px solid #e2e8f0', borderRadius: '8px', background: 'white', fontFamily: 'inherit', fontSize: '13px' }}>
                <option value="mi">miles</option>
                <option value="km">km</option>
              </select>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#0F2A4A', cursor: 'pointer', marginTop: '8px' }}>
              <input type="checkbox" checked={roundTrip} onChange={e => setRoundTrip(e.target.checked)} /> Round trip (×2)
            </label>
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Fuel efficiency</label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <input type="number" min={0} step={0.1} value={efficiency} onChange={e => setEfficiency(Math.max(0, Number(e.target.value) || 0))} style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box' }} />
              <select value={effUnit} onChange={e => setEffUnit(e.target.value as EffUnit)} style={{ padding: '10px 8px', border: '1.5px solid #e2e8f0', borderRadius: '8px', background: 'white', fontFamily: 'inherit', fontSize: '13px' }}>
                <option value="mpg">MPG</option>
                <option value="l100">L/100km</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Fuel price ({currency}/{effUnit === 'mpg' ? 'gal' : 'L'})</label>
            <input type="number" min={0} step={0.01} value={price} onChange={e => setPrice(Math.max(0, Number(e.target.value) || 0))} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Passengers</label>
            <input type="number" min={1} value={passengers} onChange={e => setPassengers(Math.max(1, Number(e.target.value) || 1))} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Currency symbol</label>
            <input value={currency} onChange={e => setCurrency(e.target.value)} maxLength={5} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', alignSelf: 'center' }}>Presets:</span>
          {presets.map(p => (
            <button key={p.label} onClick={() => { setDistance(p.d); setDistUnit(p.u) }} style={{ padding: '6px 12px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: '#C2410C', cursor: 'pointer', fontFamily: 'inherit' }}>{p.label}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '12px', marginTop: '20px' }}>
          {[
            { label: 'Total cost', val: `${currency}${calc.totalCost.toFixed(2)}`, color: '#DC2626' },
            { label: 'Per person', val: `${currency}${calc.perPersonCost.toFixed(2)}`, color: '#E85D04' },
            { label: 'Fuel needed', val: `${calc.fuelGallons.toFixed(2)} gal / ${calc.fuelLiters.toFixed(2)} L` },
            { label: 'Cost / mile', val: `${currency}${calc.perMi.toFixed(3)}` },
            { label: 'Cost / km', val: `${currency}${calc.perKm.toFixed(3)}` },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '20px', fontWeight: 800, color: s.color || '#0F2A4A' }}>{s.val}</div>
              <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
