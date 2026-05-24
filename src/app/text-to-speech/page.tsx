'use client'
import { useState, useEffect, useRef } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

export default function TextToSpeechPage() {
  const [text, setText] = useState('Hello, welcome to ConvertDox! This is a text to speech demo.')
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [voiceIdx, setVoiceIdx] = useState(0)
  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)
  const [volume, setVolume] = useState(1)
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    const load = () => {
      const v = window.speechSynthesis.getVoices()
      if (v.length) setVoices(v)
    }
    load()
    window.speechSynthesis.onvoiceschanged = load
    return () => { window.speechSynthesis.onvoiceschanged = null }
  }, [])

  const play = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    if (voices[voiceIdx]) u.voice = voices[voiceIdx]
    u.rate = rate
    u.pitch = pitch
    u.volume = volume
    u.onend = () => { setPlaying(false); setPaused(false) }
    u.onerror = () => { setPlaying(false); setPaused(false) }
    utterRef.current = u
    window.speechSynthesis.speak(u)
    setPlaying(true)
    setPaused(false)
  }

  const pause = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    if (paused) {
      window.speechSynthesis.resume()
      setPaused(false)
    } else {
      window.speechSynthesis.pause()
      setPaused(true)
    }
  }

  const stop = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    setPlaying(false)
    setPaused(false)
  }

  const samples = [
    'The quick brown fox jumps over the lazy dog.',
    'Hello, welcome to ConvertDox!',
    'To be or not to be, that is the question.',
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🔊</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Text to Speech</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Convert text to spoken audio using your browser.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Type or paste text to speak..."
          style={{ width: '100%', minHeight: '160px', padding: '16px', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '15px', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', outline: 'none', color: '#0F2A4A', lineHeight: 1.6 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>{text.length} characters</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            {samples.map((s, i) => (
              <button key={i} onClick={() => setText(s)} style={{ padding: '6px 10px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', fontSize: '11px', fontWeight: 600, color: '#C2410C', cursor: 'pointer', fontFamily: 'inherit' }}>Sample {i + 1}</button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '20px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Voice ({voices.length} available)</label>
            <select value={voiceIdx} onChange={e => setVoiceIdx(Number(e.target.value))}
              style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '13px', color: '#0F2A4A', background: 'white' }}>
              {voices.length === 0 && <option>Loading voices...</option>}
              {voices.map((v, i) => <option key={i} value={i}>{v.name} ({v.lang})</option>)}
            </select>
          </div>
          {[
            { label: `Rate (${rate.toFixed(1)})`, val: rate, set: setRate, min: 0.5, max: 2, step: 0.1 },
            { label: `Pitch (${pitch.toFixed(1)})`, val: pitch, set: setPitch, min: 0, max: 2, step: 0.1 },
            { label: `Volume (${volume.toFixed(1)})`, val: volume, set: setVolume, min: 0, max: 1, step: 0.1 },
          ].map(s => (
            <div key={s.label}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>{s.label}</label>
              <input type="range" min={s.min} max={s.max} step={s.step} value={s.val} onChange={e => s.set(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={play} disabled={!text} style={{ padding: '12px 24px', background: '#16A34A', color: 'white', border: 'none', borderRadius: '10px', fontFamily: 'inherit', fontWeight: 700, fontSize: '14px', cursor: text ? 'pointer' : 'not-allowed', opacity: text ? 1 : 0.5 }}>▶ Play</button>
          <button onClick={pause} disabled={!playing} style={{ padding: '12px 24px', background: '#E85D04', color: 'white', border: 'none', borderRadius: '10px', fontFamily: 'inherit', fontWeight: 700, fontSize: '14px', cursor: playing ? 'pointer' : 'not-allowed', opacity: playing ? 1 : 0.5 }}>{paused ? '▶ Resume' : '⏸ Pause'}</button>
          <button onClick={stop} disabled={!playing} style={{ padding: '12px 24px', background: '#DC2626', color: 'white', border: 'none', borderRadius: '10px', fontFamily: 'inherit', fontWeight: 700, fontSize: '14px', cursor: playing ? 'pointer' : 'not-allowed', opacity: playing ? 1 : 0.5 }}>⏹ Stop</button>
        </div>

        <div style={{ marginTop: '20px', background: '#FFF7ED', border: '1.5px solid #FED7AA', borderRadius: '10px', padding: '12px 16px', fontSize: '13px', color: '#9A3412' }}>
          <strong>Note:</strong> Browser playback only — no audio file download. Available voices depend on your operating system.
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
