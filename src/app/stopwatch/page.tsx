/*
  ConvertDox — Stopwatch & Timer
  PUT IN: src/app/stopwatch/page.tsx
*/
'use client'
import { useState, useEffect, useRef } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const fmt = (ms: number) => {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  const cs = Math.floor((ms % 1000) / 10)
  if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(cs).padStart(2,'0')}`
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(cs).padStart(2,'0')}`
}

const fmtTimer = (ms: number) => {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}

export default function StopwatchPage() {
  const [activeTab, setActiveTab] = useState<'stopwatch'|'timer'>('stopwatch')

  // Stopwatch
  const [swRunning, setSwRunning] = useState(false)
  const [swTime, setSwTime] = useState(0)
  const [laps, setLaps] = useState<number[]>([])
  const swRef = useRef<NodeJS.Timeout|null>(null)
  const swStartRef = useRef(0)
  const swAccRef = useRef(0)

  // Timer
  const [timerHours, setTimerHours] = useState(0)
  const [timerMins, setTimerMins] = useState(5)
  const [timerSecs, setTimerSecs] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerRemaining, setTimerRemaining] = useState(0)
  const [timerFinished, setTimerFinished] = useState(false)
  const timerRef = useRef<NodeJS.Timeout|null>(null)

  // Stopwatch logic
  const swStart = () => {
    swStartRef.current = Date.now()
    swRef.current = setInterval(() => {
      setSwTime(swAccRef.current + Date.now() - swStartRef.current)
    }, 10)
    setSwRunning(true)
  }

  const swPause = () => {
    if (swRef.current) clearInterval(swRef.current)
    swAccRef.current += Date.now() - swStartRef.current
    setSwRunning(false)
  }

  const swReset = () => {
    if (swRef.current) clearInterval(swRef.current)
    setSwRunning(false)
    setSwTime(0)
    setLaps([])
    swAccRef.current = 0
  }

  const swLap = () => {
    setLaps(prev => [swTime, ...prev])
  }

  // Timer logic
  const timerTotal = (timerHours * 3600 + timerMins * 60 + timerSecs) * 1000

  const timerStart = () => {
    const remaining = timerRemaining > 0 ? timerRemaining : timerTotal
    if (remaining <= 0) return
    setTimerFinished(false)
    const endTime = Date.now() + remaining
    timerRef.current = setInterval(() => {
      const left = endTime - Date.now()
      if (left <= 0) {
        setTimerRemaining(0)
        setTimerRunning(false)
        setTimerFinished(true)
        if (timerRef.current) clearInterval(timerRef.current)
      } else {
        setTimerRemaining(left)
      }
    }, 100)
    setTimerRunning(true)
  }

  const timerPause = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setTimerRunning(false)
  }

  const timerReset = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setTimerRunning(false)
    setTimerRemaining(0)
    setTimerFinished(false)
  }

  useEffect(() => () => {
    if (swRef.current) clearInterval(swRef.current)
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  const timerDisplay = timerRemaining > 0 ? timerRemaining : timerTotal
  const timerPct = timerTotal > 0 ? (timerDisplay / timerTotal) * 100 : 100

  const numBtn = (val: number, set: (v:number)=>void, min: number, max: number) => (
    <div style={{ display:'flex',alignItems:'center',gap:'8px' }}>
      <button onClick={() => set(Math.max(min, val-1))} style={{ width:'32px',height:'32px',borderRadius:'50%',border:'1.5px solid #e2e8f0',background:'white',fontSize:'16px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}>−</button>
      <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'28px',fontWeight:800,color:'#0F2A4A',minWidth:'44px',textAlign:'center' }}>{String(val).padStart(2,'0')}</span>
      <button onClick={() => set(Math.min(max, val+1))} style={{ width:'32px',height:'32px',borderRadius:'50%',border:'1.5px solid #e2e8f0',background:'white',fontSize:'16px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}>+</button>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh',background:'#fff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <TrustStrip />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>⏱</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>Stopwatch & Timer</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Online stopwatch with laps and countdown timer. Free, accurate, no install needed.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'580px',margin:'0 auto',padding:'36px 24px' }}>

        {/* Tab */}
        <div style={{ display:'flex',background:'#f1f5f9',borderRadius:'12px',padding:'4px',marginBottom:'28px' }}>
          {([{id:'stopwatch',label:'⏱ Stopwatch'},{id:'timer',label:'⏳ Countdown Timer'}] as const).map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{ flex:1,padding:'10px',borderRadius:'9px',border:'none',background:activeTab===t.id?'white':'transparent',fontFamily:'inherit',fontSize:'14px',fontWeight:700,color:activeTab===t.id?'#0F2A4A':'#64748b',cursor:'pointer',boxShadow:activeTab===t.id?'0 2px 6px rgba(0,0,0,0.08)':'none',transition:'all 0.2s' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* STOPWATCH */}
        {activeTab === 'stopwatch' && (
          <div>
            <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',borderRadius:'24px',padding:'48px 24px',textAlign:'center',marginBottom:'20px',boxShadow:'0 12px 40px rgba(15,42,74,0.2)' }}>
              <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(42px,8vw,64px)',fontWeight:800,color:'white',letterSpacing:'2px',lineHeight:1 }}>
                {fmt(swTime)}
              </div>
              {laps.length > 0 && (
                <div style={{ fontSize:'13px',color:'rgba(255,255,255,0.4)',marginTop:'12px' }}>
                  Last lap: {fmt(laps[0])}
                </div>
              )}
            </div>

            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'20px' }}>
              <button onClick={swRunning ? swPause : swStart}
                style={{ padding:'16px',borderRadius:'14px',border:'none',background:swRunning?'#FEF2F2':'#E85D04',color:swRunning?'#DC2626':'white',fontFamily:'inherit',fontSize:'16px',fontWeight:700,cursor:'pointer' }}>
                {swRunning ? '⏸ Pause' : swTime > 0 ? '▶ Resume' : '▶ Start'}
              </button>
              <button onClick={swRunning ? swLap : swReset}
                style={{ padding:'16px',borderRadius:'14px',border:'1.5px solid #e2e8f0',background:'white',color:'#0F2A4A',fontFamily:'inherit',fontSize:'16px',fontWeight:700,cursor:'pointer' }}>
                {swRunning ? '🏁 Lap' : '↺ Reset'}
              </button>
            </div>

            {laps.length > 0 && (
              <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'16px',padding:'16px',maxHeight:'240px',overflow:'auto' }}>
                <div style={{ fontSize:'12px',fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'10px' }}>Laps</div>
                {laps.map((lap,i) => (
                  <div key={i} style={{ display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:i<laps.length-1?'1px solid #f1f5f9':'none' }}>
                    <span style={{ fontSize:'13px',color:'#64748b' }}>Lap {laps.length - i}</span>
                    <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'14px',fontWeight:700,color:'#0F2A4A' }}>{fmt(lap)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TIMER */}
        {activeTab === 'timer' && (
          <div>
            {/* Time input */}
            {!timerRunning && timerRemaining === 0 && (
              <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'24px',marginBottom:'20px',boxShadow:'0 4px 20px rgba(15,42,74,0.07)' }}>
                <div style={{ fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'16px',textAlign:'center' }}>Set Timer Duration</div>
                <div style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:'16px',flexWrap:'wrap' }}>
                  <div style={{ textAlign:'center' }}>
                    {numBtn(timerHours, setTimerHours, 0, 23)}
                    <div style={{ fontSize:'12px',color:'#94a3b8',marginTop:'4px' }}>Hours</div>
                  </div>
                  <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'32px',fontWeight:800,color:'#94a3b8',marginBottom:'16px' }}>:</span>
                  <div style={{ textAlign:'center' }}>
                    {numBtn(timerMins, setTimerMins, 0, 59)}
                    <div style={{ fontSize:'12px',color:'#94a3b8',marginTop:'4px' }}>Minutes</div>
                  </div>
                  <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'32px',fontWeight:800,color:'#94a3b8',marginBottom:'16px' }}>:</span>
                  <div style={{ textAlign:'center' }}>
                    {numBtn(timerSecs, setTimerSecs, 0, 59)}
                    <div style={{ fontSize:'12px',color:'#94a3b8',marginTop:'4px' }}>Seconds</div>
                  </div>
                </div>

                {/* Quick presets */}
                <div style={{ display:'flex',gap:'8px',flexWrap:'wrap',justifyContent:'center',marginTop:'16px' }}>
                  {[{label:'1 min',m:1,s:0},{label:'5 min',m:5,s:0},{label:'10 min',m:10,s:0},{label:'25 min',m:25,s:0},{label:'30 min',m:30,s:0},{label:'1 hour',m:0,s:0,h:1}].map(p => (
                    <button key={p.label} onClick={() => { setTimerHours(p.h||0); setTimerMins(p.m); setTimerSecs(p.s) }}
                      style={{ padding:'6px 14px',borderRadius:'8px',border:'1.5px solid #e2e8f0',background:'white',fontFamily:'inherit',fontSize:'13px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Timer display */}
            <div style={{ background:timerFinished?'linear-gradient(135deg,#16A34A,#15803d)':'linear-gradient(135deg,#0F2A4A,#1a3a5c)',borderRadius:'24px',padding:'48px 24px',textAlign:'center',marginBottom:'20px',position:'relative',overflow:'hidden',boxShadow:'0 12px 40px rgba(15,42,74,0.2)' }}>
              {/* Progress ring */}
              {timerTotal > 0 && !timerFinished && (
                <div style={{ position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none' }}>
                  <svg width="200" height="200" style={{ opacity:0.15 }}>
                    <circle cx="100" cy="100" r="90" fill="none" stroke="white" strokeWidth="8" strokeDasharray={`${2*Math.PI*90}`} strokeDashoffset={`${2*Math.PI*90*(1-timerPct/100)}`} strokeLinecap="round" transform="rotate(-90 100 100)"/>
                  </svg>
                </div>
              )}
              <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(42px,8vw,64px)',fontWeight:800,color:'white',letterSpacing:'2px',lineHeight:1,position:'relative' }}>
                {timerFinished ? '🎉 Done!' : fmtTimer(timerDisplay)}
              </div>
            </div>

            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px' }}>
              <button onClick={timerRunning ? timerPause : timerStart} disabled={timerTotal === 0 && timerRemaining === 0}
                style={{ padding:'16px',borderRadius:'14px',border:'none',background:timerRunning?'#FEF2F2':'#E85D04',color:timerRunning?'#DC2626':'white',fontFamily:'inherit',fontSize:'16px',fontWeight:700,cursor:'pointer',opacity:timerTotal===0&&timerRemaining===0?0.5:1 }}>
                {timerRunning ? '⏸ Pause' : timerRemaining > 0 ? '▶ Resume' : '▶ Start'}
              </button>
              <button onClick={timerReset}
                style={{ padding:'16px',borderRadius:'14px',border:'1.5px solid #e2e8f0',background:'white',color:'#0F2A4A',fontFamily:'inherit',fontSize:'16px',fontWeight:700,cursor:'pointer' }}>
                ↺ Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
