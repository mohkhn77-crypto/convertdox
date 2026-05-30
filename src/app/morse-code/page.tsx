'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const MORSE: Record<string, string> = {
  'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....','I':'..','J':'.---',
  'K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-',
  'U':'..-','V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..',
  '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',
  '.':'.-.-.-',',':'--..--','?':'..--..','!':'-.-.--',':':'---...','@':'.--.-.','&':'.-...',' ':'/'
}

const MORSE_REVERSE: Record<string, string> = Object.fromEntries(Object.entries(MORSE).map(([k,v]) => [v, k]))

function textToMorse(text: string): string {
  return text.toUpperCase().split('').map(c => MORSE[c] ?? '').filter(Boolean).join(' ')
}

function morseToText(morse: string): string {
  return morse.split('   ').map(word =>
    word.split(' ').map(code => code === '/' ? ' ' : (MORSE_REVERSE[code] ?? '?')).join('')
  ).join(' ')
}

export default function MorseCodePage() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [input, setInput] = useState('')
  const [playing, setPlaying] = useState(false)
  const stopRef = useRef(false)

  const output = mode === 'encode' ? textToMorse(input) : morseToText(input)

  async function playMorse() {
    const morseStr = mode === 'encode' ? output : input
    if (!morseStr || playing) return
    setPlaying(true)
    stopRef.current = false
    const ctx = new AudioContext()
    const dotMs = 80, dashMs = 240, gapMs = 80, letterGapMs = 240, wordGapMs = 560
    const beep = (dur: number) => new Promise<void>(res => {
      if (stopRef.current) { res(); return }
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination)
      osc.frequency.value = 600
      osc.start()
      gain.gain.setValueAtTime(0.4, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur / 1000)
      osc.stop(ctx.currentTime + dur / 1000)
      setTimeout(res, dur + gapMs)
    })
    const pause = (ms: number) => new Promise<void>(res => setTimeout(res, ms))
    const tokens = morseStr.split(' ')
    for (const token of tokens) {
      if (stopRef.current) break
      if (token === '/') { await pause(wordGapMs); continue }
      for (let i = 0; i < token.length; i++) {
        if (stopRef.current) break
        if (token[i] === '.') await beep(dotMs)
        else if (token[i] === '-') await beep(dashMs)
      }
      await pause(letterGapMs)
    }
    ctx.close()
    setPlaying(false)
  }

  function stopMorse() { stopRef.current = true; setPlaying(false) }

  const CHART = Object.entries(MORSE).filter(([k]) => k !== ' ')

  return (
    <div style={{ minHeight:'100vh', background:'#fff', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>📡</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>Morse Code Translator</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Translate text ↔ Morse code with audio playback</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'32px 24px' }}>
        <div style={{ display:'flex', gap:'8px', marginBottom:'24px' }}>
          {(['encode','decode'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setInput('') }}
              style={{ padding:'10px 24px', borderRadius:'10px', border:'1.5px solid', borderColor:mode===m?'#0F2A4A':'#e2e8f0', background:mode===m?'#0F2A4A':'white', color:mode===m?'white':'#64748b', fontFamily:'inherit', fontSize:'14px', fontWeight:700, cursor:'pointer' }}>
              {m === 'encode' ? 'Text → Morse' : 'Morse → Text'}
            </button>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px' }}>
          <div>
            <div style={{ fontSize:'13px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px' }}>{mode==='encode'?'Text Input':'Morse Input'}</div>
            <textarea value={input} onChange={e => setInput(e.target.value)}
              placeholder={mode==='encode' ? 'Type your text here...' : 'Enter Morse code (· −, use space between letters, / between words)'}
              style={{ width:'100%', padding:'12px 16px', border:'1.5px solid #e2e8f0', borderRadius:'10px', fontSize:'14px', fontFamily:'monospace', resize:'vertical' as const, outline:'none', boxSizing:'border-box' as const, minHeight:'200px' }} />
          </div>
          <div>
            <div style={{ fontSize:'13px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px' }}>{mode==='encode'?'Morse Output':'Text Output'}</div>
            <div style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'12px 16px', minHeight:'200px', fontFamily:'monospace', fontSize:'14px', color:'#374151', wordBreak:'break-all', lineHeight:'1.8' }}>
              {output || <span style={{ color:'#94a3b8' }}>Output will appear here</span>}
            </div>
          </div>
        </div>

        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'32px' }}>
          <button onClick={() => setInput('SOS')} style={{ padding:'8px 16px', borderRadius:'8px', border:'1.5px solid #e2e8f0', background:'white', color:'#64748b', fontFamily:'inherit', fontSize:'13px', fontWeight:600, cursor:'pointer' }}>Try &quot;SOS&quot;</button>
          <button onClick={() => setInput('HELLO WORLD')} style={{ padding:'8px 16px', borderRadius:'8px', border:'1.5px solid #e2e8f0', background:'white', color:'#64748b', fontFamily:'inherit', fontSize:'13px', fontWeight:600, cursor:'pointer' }}>Try &quot;HELLO WORLD&quot;</button>
          <button onClick={() => { if (output) navigator.clipboard.writeText(output) }}
            style={{ padding:'8px 16px', borderRadius:'8px', border:'1.5px solid #e2e8f0', background:'white', color:'#64748b', fontFamily:'inherit', fontSize:'13px', fontWeight:600, cursor:'pointer' }}>📋 Copy Output</button>
          {!playing
            ? <button onClick={playMorse} disabled={!output}
                style={{ padding:'8px 20px', borderRadius:'8px', border:'none', background:'#E85D04', color:'white', fontFamily:'inherit', fontSize:'13px', fontWeight:700, cursor:'pointer' }}>▶ Play Audio</button>
            : <button onClick={stopMorse}
                style={{ padding:'8px 20px', borderRadius:'8px', border:'none', background:'#DC2626', color:'white', fontFamily:'inherit', fontSize:'13px', fontWeight:700, cursor:'pointer' }}>⏹ Stop</button>
          }
        </div>

        <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'20px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Morse Code Reference</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(80px,1fr))', gap:'8px' }}>
          {CHART.map(([char, code]) => (
            <div key={char} style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'8px', padding:'8px', textAlign:'center' as const }}>
              <div style={{ fontSize:'16px', fontWeight:700, color:'#0F2A4A' }}>{char}</div>
              <div style={{ fontSize:'12px', fontFamily:'monospace', color:'#E85D04', marginTop:'2px' }}>{code}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
