'use client'
import { useState, useEffect, useRef } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

interface SpeechRecognitionLike {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: ((e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null
  onend: (() => void) | null
  onerror: ((e: { error: string }) => void) | null
  start: () => void
  stop: () => void
}

type SRConstructor = new () => SpeechRecognitionLike

const LANGS = [
  { code: 'en-US', label: 'English (US)' },
  { code: 'en-GB', label: 'English (UK)' },
  { code: 'es-ES', label: 'Spanish' },
  { code: 'fr-FR', label: 'French' },
  { code: 'de-DE', label: 'German' },
  { code: 'it-IT', label: 'Italian' },
  { code: 'pt-BR', label: 'Portuguese (BR)' },
  { code: 'ja-JP', label: 'Japanese' },
  { code: 'zh-CN', label: 'Chinese (Simplified)' },
]

export default function SpeechToTextPage() {
  const [supported, setSupported] = useState<boolean | null>(null)
  const [recording, setRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interim, setInterim] = useState('')
  const [lang, setLang] = useState('en-US')
  const [continuous, setContinuous] = useState(true)
  const [copied, setCopied] = useState(false)
  const recRef = useRef<SpeechRecognitionLike | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const w = window as unknown as { SpeechRecognition?: SRConstructor; webkitSpeechRecognition?: SRConstructor }
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition
    setSupported(!!SR)
  }, [])

  const start = () => {
    if (typeof window === 'undefined') return
    const w = window as unknown as { SpeechRecognition?: SRConstructor; webkitSpeechRecognition?: SRConstructor }
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition
    if (!SR) return
    const rec = new SR()
    rec.continuous = continuous
    rec.interimResults = true
    rec.lang = lang
    rec.onresult = (e) => {
      let int = ''
      let fin = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i]
        const txt = res[0].transcript
        if (res.isFinal) fin += txt
        else int += txt
      }
      if (fin) setTranscript(t => t + fin + ' ')
      setInterim(int)
    }
    rec.onend = () => {
      setRecording(false)
      setInterim('')
    }
    rec.onerror = () => {
      setRecording(false)
      setInterim('')
    }
    rec.start()
    recRef.current = rec
    setRecording(true)
  }

  const stop = () => {
    recRef.current?.stop()
    setRecording(false)
  }

  const copy = () => {
    navigator.clipboard.writeText(transcript)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🎤</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Speech to Text</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Live voice transcription in your browser.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        {supported === false && (
          <div style={{ background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: '12px', padding: '20px', color: '#991B1B', marginBottom: '20px' }}>
            <strong>Not supported in this browser.</strong> Please use Chrome, Edge, or Safari for speech recognition.
          </div>
        )}
        {supported !== false && (
          <>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A' }}>Language:</label>
              <select value={lang} onChange={e => setLang(e.target.value)}
                style={{ padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '13px', background: 'white', color: '#0F2A4A' }}>
                {LANGS.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
              </select>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#0F2A4A', cursor: 'pointer' }}>
                <input type="checkbox" checked={continuous} onChange={e => setContinuous(e.target.checked)} /> Continuous mode
              </label>
            </div>
            <button onClick={recording ? stop : start} style={{
              padding: '14px 28px', background: recording ? '#DC2626' : '#16A34A', color: 'white', border: 'none', borderRadius: '12px', fontFamily: 'inherit', fontWeight: 700, fontSize: '15px', cursor: 'pointer', boxShadow: recording ? '0 0 0 4px rgba(220,38,38,0.2)' : 'none',
            }}>
              {recording ? '⏹ Stop recording' : '🎤 Start recording'}
            </button>
            <div style={{ marginTop: '20px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A' }}>Transcript</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={copy} disabled={!transcript} style={{ padding: '5px 12px', background: copied ? '#16A34A' : 'white', color: copied ? 'white' : '#64748b', border: '1px solid', borderColor: copied ? '#16A34A' : '#e2e8f0', borderRadius: '7px', fontSize: '12px', fontWeight: 600, fontFamily: 'inherit', cursor: transcript ? 'pointer' : 'not-allowed', opacity: transcript ? 1 : 0.5 }}>{copied ? '✓ Copied' : '📋 Copy'}</button>
                  <button onClick={() => { setTranscript(''); setInterim('') }} style={{ padding: '5px 12px', background: 'white', color: '#DC2626', border: '1px solid #e2e8f0', borderRadius: '7px', fontSize: '12px', fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>🗑 Clear</button>
                </div>
              </div>
              <textarea value={transcript} onChange={e => setTranscript(e.target.value)} placeholder="Your transcription will appear here..."
                style={{ width: '100%', minHeight: '220px', padding: '16px', border: 'none', resize: 'vertical', fontFamily: 'inherit', fontSize: '15px', color: '#0F2A4A', outline: 'none', lineHeight: 1.6, boxSizing: 'border-box' }} />
              {interim && (
                <div style={{ padding: '10px 16px', borderTop: '1px solid #f1f5f9', fontSize: '14px', color: '#94a3b8', fontStyle: 'italic' }}>{interim}</div>
              )}
            </div>
            <div style={{ marginTop: '14px', background: '#FFF7ED', border: '1.5px solid #FED7AA', borderRadius: '10px', padding: '12px 16px', fontSize: '13px', color: '#9A3412' }}>
              <strong>Tip:</strong> Works best in Chrome and Edge. You&apos;ll be prompted to allow microphone access.
            </div>
          </>
        )}
      </div>
      <SiteFooter />
    </div>
  )
}
