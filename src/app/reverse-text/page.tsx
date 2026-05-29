'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const flipMap: Record<string, string> = {
  'a':'ɐ','b':'q','c':'ɔ','d':'p','e':'ǝ','f':'ɟ','g':'ƃ','h':'ɥ',
  'i':'ᴉ','j':'ɾ','k':'ʞ','l':'l','m':'ɯ','n':'u','o':'o','p':'d',
  'q':'b','r':'ɹ','s':'s','t':'ʇ','u':'n','v':'ʌ','w':'ʍ','x':'x',
  'y':'ʎ','z':'z',' ':' ','!':'¡','?':'¿','.':'˙',',':'\'','A':'∀',
  'B':'q','C':'Ɔ','D':'p','E':'Ǝ','F':'Ⅎ','G':'פ','H':'H','I':'I',
  'J':'ɾ','K':'ʞ','L':'˥','M':'W','N':'N','O':'O','P':'Ԁ','Q':'Q',
  'R':'ɹ','S':'S','T':'┴','U':'∩','V':'Λ','W':'M','X':'X','Y':'⅄','Z':'Z'
}

type Mode = 'chars' | 'words' | 'lines' | 'flip' | 'mirror'

function transform(text: string, mode: Mode): string {
  switch (mode) {
    case 'chars': return text.split('').reverse().join('')
    case 'words': return text.split('\n').map(line => line.split(' ').reverse().join(' ')).join('\n')
    case 'lines': return text.split('\n').reverse().join('\n')
    case 'flip': return text.split('').map(c => flipMap[c] ?? c).join('').split('').reverse().join('')
    case 'mirror': return text
    default: return text
  }
}

export default function ReverseTextPage() {
  const [text, setText] = useState('')
  const [mode, setMode] = useState<Mode>('chars')
  const [copied, setCopied] = useState(false)

  const result = transform(text, mode)

  const copy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const modes: { id: Mode; label: string }[] = [
    { id: 'chars', label: 'Reverse Characters' },
    { id: 'words', label: 'Reverse Words' },
    { id: 'lines', label: 'Reverse Lines' },
    { id: 'flip', label: 'Flip Upside Down' },
    { id: 'mirror', label: 'Mirror' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🔄</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Reverse Text</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Reverse characters, words, lines, flip upside down, or mirror text</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Mode buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const, marginBottom: '20px' }}>
          {modes.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)}
              style={{ padding: '10px 18px', borderRadius: '10px', border: '1.5px solid', borderColor: mode === m.id ? '#E85D04' : '#e2e8f0', background: mode === m.id ? '#E85D04' : 'white', color: mode === m.id ? 'white' : '#0F2A4A', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
              {m.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px', display: 'block' }}>Input Text</label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical' as const, outline: 'none', boxSizing: 'border-box' as const, minHeight: '280px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px', display: 'block' }}>Result</label>
            <div
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1.5px solid #e2e8f0',
                borderRadius: '10px',
                fontSize: '14px',
                fontFamily: mode === 'mirror' ? 'inherit' : 'inherit',
                minHeight: '280px',
                background: '#f8fafc',
                whiteSpace: 'pre-wrap' as const,
                wordBreak: 'break-all' as const,
                direction: mode === 'mirror' ? 'rtl' : 'ltr',
                unicodeBidi: mode === 'mirror' ? 'bidi-override' : 'normal',
                color: '#0F2A4A',
                boxSizing: 'border-box' as const,
              } as React.CSSProperties}
            >
              {result || <span style={{ color: '#94a3b8' }}>Result will appear here...</span>}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '16px' }}>
          <button onClick={copy}
            style={{ background: copied ? '#16A34A' : '#E85D04', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            {copied ? '✓ Copied!' : 'Copy Result'}
          </button>
        </div>
      </div>
    </div>
  )
}
