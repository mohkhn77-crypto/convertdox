/*
  ConvertDox — BMI Calculator
  PUT IN: src/app/bmi-calculator/page.tsx
  URL: localhost:3000/bmi-calculator
*/
'use client'
import { useState } from 'react'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import RelatedTools from '@/components/RelatedTools'

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
      <NavBar />
      <TrustStrip />

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
      <RelatedTools currentPath="/bmi-calculator" />

      <div style={{ maxWidth:'860px',margin:'48px auto 0',padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>How to Use the BMI Calculator</h2>
          <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',marginBottom:'16px' }}>Get your BMI and category in seconds — metric, imperial, or mixed units. No sign-up.</p>
          <ol style={{ paddingLeft:'24px',fontSize:'15px',color:'#64748b',lineHeight:'1.8' }}>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 1:</strong> Choose your unit system — metric (kg / cm) or imperial (lbs / ft + in).</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 2:</strong> Enter your height.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 3:</strong> Enter your weight.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 4:</strong> Read your BMI value and the category it falls into.</li>
          </ol>
        </section>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Common Use Cases</h2>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'14px' }}>
            {[
              { icon:'🩺', title:'Health Checkups', desc:'Track BMI between annual physicals to spot trends.' },
              { icon:'🏃', title:'Fitness Tracking', desc:'Pair BMI with body-fat measurements for a fuller picture.' },
              { icon:'🏥', title:'Medical Screening', desc:'Common starting point in primary-care risk assessments.' },
              { icon:'📋', title:'Insurance Forms', desc:'Quick reference for life or health insurance applications.' },
            ].map(c => (
              <div key={c.title} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'16px' }}>
                <div style={{ fontSize:'24px',marginBottom:'8px' }}>{c.icon}</div>
                <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'4px' }}>{c.title}</div>
                <div style={{ fontSize:'13px',color:'#64748b',lineHeight:'1.6' }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'Is BMI accurate for athletes?', a:'Often not. Muscle weighs more than fat, so resistance-trained athletes commonly land in the overweight range despite low body-fat percentages. Pair BMI with a body composition test if you train heavily.' },
            { q:'What BMI is considered healthy?', a:'For most adults, 18.5 to 24.9 is classified as healthy. In adults over 65, slightly higher BMIs (up to about 27) are associated with the best longevity outcomes.' },
            { q:'Should I use metric or imperial?', a:'Whichever you\'re more comfortable measuring in. The numerical BMI is identical between the two — the conversion factor is built in.' },
            { q:'How often should I check BMI?', a:'Every few months is plenty if you\'re a healthy weight. If you\'re actively trying to gain or lose, weekly checks are sufficient — daily fluctuations are mostly water and digestion.' },
            { q:'Can BMI be misleading?', a:'Yes. It doesn\'t distinguish muscle from fat, doesn\'t account for fat distribution (visceral vs subcutaneous), and varies in clinical meaning across ages and ethnicities. Treat it as one signal, not a verdict.' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'14px 18px',marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px',color:'#64748b',lineHeight:'1.7',marginTop:'10px',marginBottom:0 }}>{faq.a}</p>
            </details>
          ))}
        </section>

        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Why Use the ConvertDox BMI Calculator?</h2>
          <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7' }}>BMI is the most widely cited health metric in the world and the most-misunderstood. The ConvertDox BMI Calculator gives you the number quickly and — importantly — pairs it with the category and a clear interpretation, so you don&apos;t leave wondering what 24.7 actually means. The calculator supports both metric (kilograms and centimetres) and imperial (pounds and feet/inches) units, and you can mix and match if you happen to know your weight in kilos but your height in feet. The math is identical between the two: BMI = weight in kilograms divided by height in metres squared, with a 703 conversion factor when inputs are in pounds and inches. Because the calculation runs in your browser, your weight and height are never sent over the network — relevant if you&apos;d rather not see your stats logged in a third-party analytics dashboard. The tool deliberately includes context around the result rather than just spitting a number: the category (underweight / normal / overweight / obese), what the category is generally taken to mean, and a reminder that BMI has known limitations for athletes, the elderly, pregnant women, and people of different ethnic backgrounds. For a deeper look at the formula and the alternatives, our companion <Link href="/blog/how-to-calculate-bmi-accurately" style={{ color:'#E85D04',fontWeight:600 }}>BMI guide</Link> walks through everything in detail.</p>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'BMI Calculator',
        'description': 'Free BMI calculator with metric and imperial units. Instant body mass index calculation with category and healthy range.',
        'url': 'https://convertdox.com/bmi-calculator',
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'Any',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
        'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '127' },
        'creator': { '@type': 'Organization', 'name': 'ConvertDox', 'url': 'https://convertdox.com' },
      }) }} />
    </div>
  )
}
