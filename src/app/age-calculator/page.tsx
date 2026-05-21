/*
  ConvertDox — Age Calculator
  PUT IN: src/app/age-calculator/page.tsx
  URL: localhost:3000/age-calculator
*/
'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import SiteFooter from '@/components/SiteFooter'

export default function AgeCalculatorPage() {
  const today = new Date()
  const [dob, setDob] = useState('')
  const [toDate, setToDate] = useState(today.toISOString().split('T')[0])

  const calcAge = () => {
    if (!dob) return null
    const birth = new Date(dob)
    const end   = new Date(toDate)
    if (birth > end) return null

    let years  = end.getFullYear() - birth.getFullYear()
    let months = end.getMonth()    - birth.getMonth()
    let days   = end.getDate()     - birth.getDate()

    if (days < 0) {
      months--
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0)
      days += prevMonth.getDate()
    }
    if (months < 0) { years--; months += 12 }

    const totalDays    = Math.floor((end.getTime()-birth.getTime())/(1000*60*60*24))
    const totalMonths  = years*12+months
    const totalWeeks   = Math.floor(totalDays/7)
    const totalHours   = totalDays*24
    const nextBirthday = new Date(end.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday < end) nextBirthday.setFullYear(nextBirthday.getFullYear()+1)
    const daysToNext   = Math.ceil((nextBirthday.getTime()-end.getTime())/(1000*60*60*24))
    const dayOfWeek    = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][birth.getDay()]
    const zodiac       = getZodiac(birth.getMonth()+1, birth.getDate())

    return { years, months, days, totalDays, totalMonths, totalWeeks, totalHours, daysToNext, dayOfWeek, zodiac }
  }

  const getZodiac = (m:number, d:number) => {
    if ((m===3&&d>=21)||(m===4&&d<=19)) return { sign:'♈ Aries', dates:'Mar 21 – Apr 19' }
    if ((m===4&&d>=20)||(m===5&&d<=20)) return { sign:'♉ Taurus', dates:'Apr 20 – May 20' }
    if ((m===5&&d>=21)||(m===6&&d<=20)) return { sign:'♊ Gemini', dates:'May 21 – Jun 20' }
    if ((m===6&&d>=21)||(m===7&&d<=22)) return { sign:'♋ Cancer', dates:'Jun 21 – Jul 22' }
    if ((m===7&&d>=23)||(m===8&&d<=22)) return { sign:'♌ Leo', dates:'Jul 23 – Aug 22' }
    if ((m===8&&d>=23)||(m===9&&d<=22)) return { sign:'♍ Virgo', dates:'Aug 23 – Sep 22' }
    if ((m===9&&d>=23)||(m===10&&d<=22)) return { sign:'♎ Libra', dates:'Sep 23 – Oct 22' }
    if ((m===10&&d>=23)||(m===11&&d<=21)) return { sign:'♏ Scorpio', dates:'Oct 23 – Nov 21' }
    if ((m===11&&d>=22)||(m===12&&d<=21)) return { sign:'♐ Sagittarius', dates:'Nov 22 – Dec 21' }
    if ((m===12&&d>=22)||(m===1&&d<=19)) return { sign:'♑ Capricorn', dates:'Dec 22 – Jan 19' }
    if ((m===1&&d>=20)||(m===2&&d<=18)) return { sign:'♒ Aquarius', dates:'Jan 20 – Feb 18' }
    return { sign:'♓ Pisces', dates:'Feb 19 – Mar 20' }
  }

  const r = calcAge()

  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <TrustStrip />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>🎂</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>Age Calculator</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Calculate your exact age in years, months, days, weeks, and hours.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'680px',margin:'0 auto',padding:'36px 24px' }}>

        {/* Inputs */}
        <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'28px',boxShadow:'0 8px 32px rgba(15,42,74,0.07)',marginBottom:'20px' }}>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px' }}>
            <div>
              <label style={{ display:'block',fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>🎂 Date of Birth</label>
              <input type="date" value={dob} onChange={e=>setDob(e.target.value)}
                style={{ width:'100%',padding:'13px 16px',border:'1.5px solid #e2e8f0',borderRadius:'11px',fontFamily:'inherit',fontSize:'15px',fontWeight:600,color:'#0F2A4A',outline:'none' }}/>
            </div>
            <div>
              <label style={{ display:'block',fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>📅 Age At Date</label>
              <input type="date" value={toDate} onChange={e=>setToDate(e.target.value)}
                style={{ width:'100%',padding:'13px 16px',border:'1.5px solid #e2e8f0',borderRadius:'11px',fontFamily:'inherit',fontSize:'15px',fontWeight:600,color:'#0F2A4A',outline:'none' }}/>
            </div>
          </div>
        </div>

        {/* Result */}
        {r ? (<>
          {/* Main age display */}
          <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',borderRadius:'20px',padding:'28px',textAlign:'center',marginBottom:'16px',boxShadow:'0 8px 32px rgba(15,42,74,0.2)' }}>
            <div style={{ fontSize:'13px',color:'rgba(255,255,255,0.5)',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'12px' }}>Your Age</div>
            <div style={{ display:'flex',justifyContent:'center',gap:'20px',flexWrap:'wrap' }}>
              {[{num:r.years,label:'Years'},{num:r.months,label:'Months'},{num:r.days,label:'Days'}].map(item=>(
                <div key={item.label} style={{ textAlign:'center' }}>
                  <div style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'clamp(36px,6vw,56px)',fontWeight:800,color:item.label==='Years'?'#F48C42':'white',lineHeight:1 }}>{item.num}</div>
                  <div style={{ fontSize:'13px',color:'rgba(255,255,255,0.5)',marginTop:'4px' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail stats */}
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'16px' }}>
            {[
              {icon:'📅',label:'Total Days',val:r.totalDays.toLocaleString(),bg:'#EFF6FF',color:'#1D4ED8'},
              {icon:'📆',label:'Total Weeks',val:r.totalWeeks.toLocaleString(),bg:'#F0FDF4',color:'#16A34A'},
              {icon:'🗓',label:'Total Months',val:r.totalMonths.toLocaleString(),bg:'#FFF7ED',color:'#C2410C'},
              {icon:'⏰',label:'Total Hours',val:r.totalHours.toLocaleString(),bg:'#FDF4FF',color:'#7C3AED'},
            ].map(s=>(
              <div key={s.label} style={{ background:s.bg,borderRadius:'14px',padding:'16px',display:'flex',alignItems:'center',gap:'12px' }}>
                <span style={{ fontSize:'24px' }}>{s.icon}</span>
                <div>
                  <div style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'22px',fontWeight:800,color:s.color,lineHeight:1 }}>{s.val}</div>
                  <div style={{ fontSize:'12px',color:'#64748b',marginTop:'3px' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Fun facts */}
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px' }}>
            <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'14px',padding:'16px' }}>
              <div style={{ fontSize:'12px',color:'#94a3b8',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>🎉 Next Birthday</div>
              <div style={{ fontSize:'18px',fontWeight:700,color:'#0F2A4A' }}>In {r.daysToNext} days</div>
            </div>
            <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'14px',padding:'16px' }}>
              <div style={{ fontSize:'12px',color:'#94a3b8',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>📅 Born on a</div>
              <div style={{ fontSize:'18px',fontWeight:700,color:'#0F2A4A' }}>{r.dayOfWeek}</div>
            </div>
            <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'14px',padding:'16px',gridColumn:'1/-1' }}>
              <div style={{ fontSize:'12px',color:'#94a3b8',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>⭐ Zodiac Sign</div>
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                <div style={{ fontSize:'20px',fontWeight:700,color:'#0F2A4A' }}>{r.zodiac.sign}</div>
                <div style={{ fontSize:'13px',color:'#64748b' }}>{r.zodiac.dates}</div>
              </div>
            </div>
          </div>
        </>) : (
          <div style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'48px',textAlign:'center' }}>
            <div style={{ fontSize:'48px',marginBottom:'12px' }}>🎂</div>
            <p style={{ color:'#94a3b8',fontSize:'14px' }}>Select your date of birth to calculate your exact age</p>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  )
}
