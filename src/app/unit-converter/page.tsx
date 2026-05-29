/*
  ConvertDox — Unit Converter
  PUT IN: src/app/unit-converter/page.tsx
*/
'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

type Category = 'length'|'weight'|'temperature'|'area'|'speed'|'volume'

const CATEGORIES = {
  length: {
    icon:'📏', label:'Length',
    units: ['Millimetre','Centimetre','Metre','Kilometre','Inch','Foot','Yard','Mile','Nautical Mile'],
    toBase: { Millimetre:0.001,Centimetre:0.01,Metre:1,Kilometre:1000,Inch:0.0254,Foot:0.3048,Yard:0.9144,Mile:1609.344,'Nautical Mile':1852 },
  },
  weight: {
    icon:'⚖️', label:'Weight',
    units: ['Milligram','Gram','Kilogram','Tonne','Ounce','Pound','Stone'],
    toBase: { Milligram:0.000001,Gram:0.001,Kilogram:1,Tonne:1000,Ounce:0.0283495,Pound:0.453592,Stone:6.35029 },
  },
  temperature: {
    icon:'🌡️', label:'Temperature',
    units: ['Celsius','Fahrenheit','Kelvin'],
    toBase: null,
  },
  area: {
    icon:'📐', label:'Area',
    units: ['Square mm','Square cm','Square m','Square km','Square inch','Square foot','Acre','Hectare'],
    toBase: { 'Square mm':0.000001,'Square cm':0.0001,'Square m':1,'Square km':1000000,'Square inch':0.00064516,'Square foot':0.092903,'Acre':4046.86,'Hectare':10000 },
  },
  speed: {
    icon:'🚀', label:'Speed',
    units: ['m/s','km/h','mph','knots','ft/s'],
    toBase: { 'm/s':1,'km/h':0.277778,'mph':0.44704,'knots':0.514444,'ft/s':0.3048 },
  },
  volume: {
    icon:'🫙', label:'Volume',
    units: ['Millilitre','Litre','Cubic metre','Teaspoon','Tablespoon','Cup','Pint','Quart','Gallon'],
    toBase: { Millilitre:0.001,Litre:1,'Cubic metre':1000,Teaspoon:0.00492892,Tablespoon:0.0147868,Cup:0.236588,Pint:0.473176,Quart:0.946353,Gallon:3.78541 },
  },
}

const convertTemp = (val: number, from: string, to: string) => {
  let c = from === 'Celsius' ? val : from === 'Fahrenheit' ? (val-32)*5/9 : val - 273.15
  if (to === 'Celsius') return c
  if (to === 'Fahrenheit') return c*9/5 + 32
  return c + 273.15
}

export default function UnitConverterPage() {
  const [cat, setCat] = useState<Category>('length')
  const [fromUnit, setFromUnit] = useState('Metre')
  const [toUnit, setToUnit] = useState('Foot')
  const [inputVal, setInputVal] = useState('1')

  const currentCat = CATEGORIES[cat]

  const convert = (val: string, from: string, to: string) => {
    const num = parseFloat(val)
    if (isNaN(num)) return ''
    if (cat === 'temperature') {
      return convertTemp(num, from, to).toFixed(6).replace(/\.?0+$/, '')
    }
    const base = (currentCat.toBase as any)[from]
    const target = (currentCat.toBase as any)[to]
    if (!base || !target) return ''
    return ((num * base) / target).toFixed(8).replace(/\.?0+$/, '')
  }

  const result = convert(inputVal, fromUnit, toUnit)

  const switchCat = (newCat: Category) => {
    setCat(newCat)
    const units = CATEGORIES[newCat].units
    setFromUnit(units[0])
    setToUnit(units[1])
    setInputVal('1')
  }

  const swap = () => {
    const old = fromUnit
    setFromUnit(toUnit)
    setToUnit(old)
  }

  const selStyle = { width:'100%',padding:'12px 14px',border:'1.5px solid #e2e8f0',borderRadius:'11px',fontFamily:'inherit',fontSize:'14px',fontWeight:600,color:'#0F2A4A',outline:'none',background:'white',cursor:'pointer' }

  return (
    <div style={{ minHeight:'100vh',background:'#fff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <TrustStrip />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>📐</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>Unit Converter</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Convert length, weight, temperature, area, speed and volume instantly.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'680px',margin:'0 auto',padding:'36px 24px' }}>

        {/* Category tabs */}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'8px',marginBottom:'24px' }}>
          {(Object.entries(CATEGORIES) as [Category, typeof CATEGORIES.length][]).map(([key, val]) => (
            <button key={key} onClick={() => switchCat(key)}
              style={{ padding:'10px 8px',borderRadius:'12px',border:'2px solid',borderColor:cat===key?'#0F2A4A':'#e2e8f0',background:cat===key?'#0F2A4A':'white',color:cat===key?'white':'#64748b',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px' }}>
              <span>{val.icon}</span>{val.label}
            </button>
          ))}
        </div>

        {/* Converter card */}
        <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'28px',boxShadow:'0 8px 32px rgba(15,42,74,0.07)' }}>

          {/* From */}
          <div style={{ marginBottom:'12px' }}>
            <label style={{ display:'block',fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>From</label>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:'10px' }}>
              <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} style={selStyle}>
                {currentCat.units.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
              <input type="number" value={inputVal} onChange={e => setInputVal(e.target.value)}
                style={{ ...selStyle, fontSize:'20px', fontWeight:800 }}/>
            </div>
          </div>

          {/* Swap button */}
          <div style={{ textAlign:'center',margin:'12px 0' }}>
            <button onClick={swap} style={{ background:'#f1f5f9',border:'1.5px solid #e2e8f0',borderRadius:'999px',padding:'8px 20px',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer',color:'#0F2A4A' }}>
              ⇅ Swap
            </button>
          </div>

          {/* To */}
          <div style={{ marginBottom:'24px' }}>
            <label style={{ display:'block',fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>To</label>
            <select value={toUnit} onChange={e => setToUnit(e.target.value)} style={selStyle}>
              {currentCat.units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>

          {/* Result */}
          <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',borderRadius:'16px',padding:'24px',textAlign:'center' }}>
            <div style={{ fontSize:'13px',color:'rgba(255,255,255,0.5)',marginBottom:'8px' }}>
              {inputVal || '0'} {fromUnit} =
            </div>
            <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(28px,5vw,42px)',fontWeight:800,color:'#F48C42',lineHeight:1 }}>
              {result || '0'}
            </div>
            <div style={{ fontSize:'16px',color:'rgba(255,255,255,0.7)',marginTop:'8px',fontWeight:600 }}>{toUnit}</div>
          </div>
        </div>

        {/* All conversions at once */}
        {inputVal && parseFloat(inputVal) > 0 && (
          <div style={{ marginTop:'20px',background:'white',border:'1.5px solid #e2e8f0',borderRadius:'16px',padding:'20px' }}>
            <div style={{ fontSize:'13px',fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'12px' }}>
              {inputVal} {fromUnit} in all units
            </div>
            {currentCat.units.filter(u => u !== fromUnit).map(u => (
              <div key={u} style={{ display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f1f5f9',alignItems:'center' }}>
                <span style={{ fontSize:'14px',color:'#64748b' }}>{u}</span>
                <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'15px',fontWeight:700,color:'#0F2A4A' }}>
                  {convert(inputVal, fromUnit, u)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
