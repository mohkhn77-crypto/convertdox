'use client'
import { useState, useEffect, useRef } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

type Mode = 'work' | 'short' | 'long'

const MODES: { key: Mode; label: string; secs: number; color: string }[] = [
  { key: 'work', label: 'Work', secs: 25 * 60, color: '#E85D04' },
  { key: 'short', label: 'Short Break', secs: 5 * 60, color: '#16A34A' },
  { key: 'long', label: 'Long Break', secs: 15 * 60, color: '#0284C7' },
]

function beep() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 880
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8)
    osc.start()
    osc.stop(ctx.currentTime + 0.8)
  } catch { /* ignore */ }
}

export default function PomodoroTimerPage() {
  const [mode, setMode] = useState<Mode>('work')
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const currentMode = MODES.find(m => m.key === mode)!
  const total = currentMode.secs
  const pct = ((total - timeLeft) / total) * 100

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const secs = String(timeLeft % 60).padStart(2, '0')

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            beep()
            setRunning(false)
            if (mode === 'work') {
              setSessions(s => {
                const next = s + 1
                if (next % 4 === 0) {
                  setMode('long')
                  setTimeLeft(15 * 60)
                } else {
                  setMode('short')
                  setTimeLeft(5 * 60)
                }
                return next
              })
            } else {
              setMode('work')
              setTimeLeft(25 * 60)
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, mode])

  function switchMode(m: Mode) {
    setRunning(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
    setMode(m)
    setTimeLeft(MODES.find(x => x.key === m)!.secs)
  }

  function reset() {
    setRunning(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
    setTimeLeft(currentMode.secs)
  }

  // SVG circle
  const r = 100
  const circumference = 2 * Math.PI * r
  const strokeDashoffset = circumference - (pct / 100) * circumference

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🍅</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Pomodoro Timer</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Focus timer with work and break intervals to boost productivity</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 24px', textAlign: 'center' }}>

        {/* Mode selector */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '40px' }}>
          {MODES.map(m => (
            <button key={m.key} onClick={() => switchMode(m.key)}
              style={{ padding: '10px 18px', borderRadius: '10px', border: '1.5px solid', borderColor: mode === m.key ? m.color : '#e2e8f0', background: mode === m.key ? m.color : 'white', color: mode === m.key ? 'white' : '#64748b', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
              {m.label}
            </button>
          ))}
        </div>

        {/* Circular timer */}
        <div style={{ position: 'relative', width: '260px', height: '260px', margin: '0 auto 40px' }}>
          <svg width="260" height="260" viewBox="0 0 260 260" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="130" cy="130" r={r} fill="none" stroke="#e2e8f0" strokeWidth="12" />
            <circle cx="130" cy="130" r={r} fill="none" stroke={currentMode.color} strokeWidth="12"
              strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
              strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
          </svg>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '56px', fontWeight: 800, color: '#0F2A4A', lineHeight: 1 }}>
              {mins}:{secs}
            </div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', fontWeight: 600 }}>{currentMode.label}</div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '32px' }}>
          <button onClick={() => setRunning(r => !r)}
            style={{ background: currentMode.color, color: 'white', border: 'none', padding: '14px 40px', borderRadius: '12px', fontSize: '17px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', minWidth: '140px' }}>
            {running ? 'Pause' : 'Start'}
          </button>
          <button onClick={reset}
            style={{ background: 'white', color: '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '14px 24px', borderRadius: '12px', fontSize: '17px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Reset
          </button>
        </div>

        {/* Session counter */}
        <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '10px' }}>Pomodoros Completed</div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {Array.from({ length: Math.max(sessions, 4) }, (_, i) => (
              <div key={i} style={{ width: '28px', height: '28px', borderRadius: '50%', background: i < sessions ? '#E85D04' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                {i < sessions ? '🍅' : ''}
              </div>
            ))}
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>Every 4 pomodoros → Long Break</div>
        </div>
      </div>
    </div>
  )
}
