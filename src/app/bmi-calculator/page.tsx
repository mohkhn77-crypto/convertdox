/*
  ConvertDox — BMI Calculator
  PUT IN: src/app/bmi-calculator/page.tsx
  URL: localhost:3000/bmi-calculator
*/
'use client'
import { useState } from 'react'

const NAV = () => (
  <nav style={{ position:'sticky',top:0,zIndex:100,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',borderBottom:'1px solid #e2e8f0',boxShadow:'0 1px 8px rgba(15,42,74,0.06)' }}>
    <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'0 24px',height:'62px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
      <a href="/" style={{ textDecoration:'none',display:'flex',alignItems:'center',gap:'9px' }}>
        <div style={{ width:'44px',height:'44px',background:'#0F2A4A',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}><svg width='28' height='28' viewBox='0 0 44 44' fill='none'><rect x='6' y='10' width='13' height='17' rx='2' fill='white' opacity='0.95'/><rect x='25' y='17' width='13' height='17' rx='2' fill='#E85D04'/><path d='M20 22h4M21 20l3 2-3 2' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/></svg></div>
        <span style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'30px',fontWeight:800,color:'#0F2A4A' }}>Convert<span style={{ color:'#E85D04' }}>Dox</span></span>
      </a>
      <a href="/" style={{ fontSize:'13px',color:'#64748b',textDecoration:'none',fontWeight:500 }}>← All Tools</a>
    </div>
  </nav>
)
const FOOTER = () => (
  <footer style={{ background:'#0F2A4A',marginTop:'60px',padding:'28px 24px' }}>
    <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px' }}>
      <span style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'16px',fontWeight:800,color:'white' }}>Convert<span style={{ color:'#F48C42' }}>Dox</span></span>
      <p style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',margin:0 }}>© 2025 ConvertDox — Every Online Tool You Need</p>
      <div style={{ display:'flex',gap:'16px' }}>{['Privacy','Terms','All Tools'].map(l=><a key={l} href="#" style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',textDecoration:'none' }}>{l}</a>)}</div>
    </div>
  </footer>
)

export default function BMICalculatorPage() {
  const [unit, setUnit] = useState<'metric'|'imperial'>('metric')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState<'male'|'female'>('male')

  const calcBMI = () => {
    const w = parseFloat(weight)
    if (!w||w<=0) return null
    if (unit==='metric') {
      const h = parseFloat(height)/100
      if (!h||h<=0) return null
      return w/(h*h)
    }
    const totalIn = (parseFloat(heightFt)||0)*12+(parseFloat(heightIn)||0)
    if (!totalIn) return null
    return (w/(totalIn*totalIn))*703
  }

  const bmi = calcBMI()
  const bmiR = bmi ? Math.round(bmi*10)/10 : null

  const getInfo = (b: number) => {
    if (b<18.5) return { label:'Underweight', color:'#3B82F6', bg:'#EFF6FF', border:'#BFDBFE', tip:'Consider consulting a doctor about healthy weight gain strategies.' }
    if (b<25)   return { label:'Normal Weight', color:'#16A34A', bg:'#F0FDF4', border:'#BBF7D0', tip:'Great! Maintain your healthy weight with balanced diet and regular exercise.' }
    if (b<30)   return { label:'Overweight', color:'#D97706', bg:'#FFFBEB', border:'#FDE68A', tip:'Consider a balanced diet and increased physical activity.' }
    return              { label:'Obese', color:'#DC2626', bg:'#FEF2F2', border:'#FECACA', tip:'Please consult a healthcare provider for personalized guidance.' }
  }

  const info = bmiR ? getInfo(bmiR) : null

  // Needle position for gauge (18.5=left, 40=right)
  const gaugePos = bmiR ? Math.min(Math.max(((bmiR-10)/35)*100, 0), 100) : 0

  const inputStyle = { width:'100%',padding:'13px 16px',border:'1.5px solid #e2e8f0',borderRadius:'11px',fontFamily:'inherit',fontSize:'16px',fontWeight:600,color:'#0F2A4A',outline:'none',background:'white' }

  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NAV/>

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>⚖️</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>BMI Calculator</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Calculate your Body Mass Index instantly. Supports metric and imperial units.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'720px',margin:'0 auto',padding:'36px 24px' }}>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',alignItems:'start' }}>

          {/* LEFT: Inputs */}
          <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'28px',boxShadow:'0 8px 32px rgba(15,42,74,0.07)' }}>

            {/* Unit toggle */}
            <div style={{ display:'flex',background:'#f1f5f9',borderRadius:'12px',padding:'4px',marginBottom:'22px' }}>
              {(['metric','imperial'] as const).map(u=>(
                <button key={u} onClick={()=>setUnit(u)} style={{ flex:1,padding:'9px',borderRadius:'9px',border:'none',background:unit===u?'white':'transparent',fontFamily:'inherit',fontSize:'13.5px',fontWeight:700,color:unit===u?'#0F2A4A':'#64748b',cursor:'pointer',boxShadow:unit===u?'0 2px 6px rgba(0,0,0,0.08)':'none',transition:'all 0.2s' }}>
                  {u==='metric'?'🌍 Metric':'🇺🇸 Imperial'}
                </button>
              ))}
            </div>

            {/* Gender */}
            <div style={{ marginBottom:'18px' }}>
              <label style={{ display:'block',fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>Gender</label>
              <div style={{ display:'flex',gap:'8px' }}>
                {(['male','female'] as const).map(g=>(
                  <button key={g} onClick={()=>setGender(g)} style={{ flex:1,padding:'10px',borderRadius:'10px',border:'2px solid',borderColor:gender===g?'#0F2A4A':'#e2e8f0',background:gender===g?'#0F2A4A':'white',color:gender===g?'white':'#64748b',fontFamily:'inherit',fontSize:'14px',fontWeight:600,cursor:'pointer' }}>
                    {g==='male'?'👨 Male':'👩 Female'}
                  </button>
                ))}
              </div>
            </div>

            {/* Age */}
            <div style={{ marginBottom:'18px' }}>
              <label style={{ display:'block',fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>Age (optional)</label>
              <input type="number" value={age} onChange={e=>setAge(e.target.value)} placeholder="e.g. 28" style={inputStyle}/>
            </div>

            {/* Weight */}
            <div style={{ marginBottom:'18px' }}>
              <label style={{ display:'block',fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>Weight ({unit==='metric'?'kg':'lbs'})</label>
              <input type="number" value={weight} onChange={e=>setWeight(e.target.value)} placeholder={unit==='metric'?'e.g. 70':'e.g. 154'} style={inputStyle}/>
            </div>

            {/* Height */}
            <div>
              <label style={{ display:'block',fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>Height ({unit==='metric'?'cm':'ft & in'})</label>
              {unit==='metric'
                ? <input type="number" value={height} onChange={e=>setHeight(e.target.value)} placeholder="e.g. 175" style={inputStyle}/>
                : <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px' }}>
                    <input type="number" value={heightFt} onChange={e=>setHeightFt(e.target.value)} placeholder="Feet" style={inputStyle}/>
                    <input type="number" value={heightIn} onChange={e=>setHeightIn(e.target.value)} placeholder="Inches" style={inputStyle}/>
                  </div>
              }
            </div>
          </div>

          {/* RIGHT: Result */}
          <div>
            {bmiR && info ? (
              <div style={{ background:info.bg,border:`2px solid ${info.border}`,borderRadius:'20px',padding:'24px',textAlign:'center' }}>
                <div style={{ fontSize:'13px',fontWeight:700,color:info.color,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'8px' }}>Your BMI</div>
                <div style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'64px',fontWeight:800,color:info.color,lineHeight:1 }}>{bmiR}</div>
                <div style={{ fontSize:'18px',fontWeight:700,color:info.color,marginTop:'10px',marginBottom:'16px' }}>{info.label}</div>

                {/* Gauge bar */}
                <div style={{ background:'white',borderRadius:'8px',padding:'12px',marginBottom:'14px' }}>
                  <div style={{ position:'relative',height:'10px',borderRadius:'999px',background:'linear-gradient(to right,#3B82F6 0%,#16A34A 37%,#D97706 63%,#DC2626 100%)',marginBottom:'6px' }}>
                    <div style={{ position:'absolute',top:'-3px',left:`${gaugePos}%`,transform:'translateX(-50%)',width:'16px',height:'16px',borderRadius:'50%',background:'white',border:`3px solid ${info.color}`,boxShadow:'0 2px 6px rgba(0,0,0,0.2)',transition:'left 0.3s' }}/>
                  </div>
                  <div style={{ display:'flex',justifyContent:'space-between',fontSize:'10px',color:'#94a3b8' }}>
                    <span>Under</span><span>Normal</span><span>Over</span><span>Obese</span>
                  </div>
                </div>

                <p style={{ fontSize:'13px',color:info.color,lineHeight:'1.6',margin:'0 0 14px',fontStyle:'italic' }}>{info.tip}</p>
                <p style={{ fontSize:'11.5px',color:'#94a3b8',margin:0 }}>Healthy range: 18.5 – 24.9 · BMI is a screening tool only</p>
              </div>
            ) : (
              <div style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'40px 24px',textAlign:'center' }}>
                <div style={{ fontSize:'48px',marginBottom:'12px' }}>⚖️</div>
                <p style={{ fontSize:'14px',color:'#94a3b8',lineHeight:'1.6' }}>Enter your weight and height on the left to see your BMI result here.</p>
              </div>
            )}

            {/* BMI Scale reference */}
            <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'14px',padding:'16px',marginTop:'14px' }}>
              <div style={{ fontSize:'12px',fontWeight:700,color:'#0F2A4A',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'10px' }}>BMI Scale</div>
              {[{r:'Below 18.5',l:'Underweight',c:'#3B82F6'},{r:'18.5 – 24.9',l:'Normal weight',c:'#16A34A'},{r:'25 – 29.9',l:'Overweight',c:'#D97706'},{r:'30 and above',l:'Obese',c:'#DC2626'}].map(s=>(
                <div key={s.l} style={{ display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid #f1f5f9' }}>
                  <span style={{ fontSize:'13px',fontWeight:600,color:s.c }}>{s.l}</span>
                  <span style={{ fontSize:'13px',color:'#64748b' }}>{s.r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',marginBottom:'14px' }}>FAQ</h2>
          {[{q:'What is a healthy BMI?',a:'A BMI between 18.5 and 24.9 is considered normal weight for most adults.'},{q:'Is BMI accurate?',a:'BMI is a useful screening tool but has limitations — it doesn\'t account for muscle mass, bone density, or body fat distribution. Always consult a doctor for medical advice.'},{q:'How is BMI calculated?',a:'BMI = weight(kg) ÷ height(m)². In imperial: BMI = (weight(lbs) ÷ height(in)²) × 703.'}].map((item,i)=>(
            <details key={i} style={{ border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'14px 18px',marginBottom:'8px',background:'white' }}>
              <summary style={{ fontWeight:700,fontSize:'14px',color:'#0F2A4A',cursor:'pointer',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center' }}>{item.q}<span style={{ color:'#E85D04',fontSize:'20px',fontWeight:300 }}>+</span></summary>
              <p style={{ marginTop:'10px',fontSize:'14px',color:'#64748b',lineHeight:'1.7' }}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      <FOOTER/>
    </div>
  )
}
