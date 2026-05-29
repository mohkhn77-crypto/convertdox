'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const BIG: Record<string, string[]> = {
  ' ': ['    ','    ','    ','    ','    ','    '],
  'A': ['  /\\  ',' /  \\ ','/ /\\ \\','/_/\\_\\',' |  | ',' |  | '],
  'B': ['|__  ','|  ) ','|_) ','|  ) ','|__/ ','      '],
  'C': [' __ ','/ _|','| |_','| _|','\\__/','    '],
  'D': ['|)  ','| ) ','|  \\','|  /','|_/ ','     '],
  'E': ['|__ ','|_  ','|   ','|   ','|__ ','    '],
  'F': ['|_ ','|_ ','|  ','|  ','|  ','   '],
  'G': [' __ ','/ _ ','| (_)','|  _','\\__ ','    '],
  'H': ['| |','| |','|_|','| |','| |','   '],
  'I': ['|','|','|','|','|',' '],
  'J': ['  |',' _|',' | ',' | ','\\__|','    '],
  'K': ['| / ','|/  ','|\\ ','| \\ ','|  \\','    '],
  'L': ['|   ','|   ','|   ','|   ','|___','    '],
  'M': ['|\\ /|','| V |','|   |','|   |','|   |','     '],
  'N': ['|\\ |','| \\|','|  |','|  |','|  |','    '],
  'O': [' ___ ','/ _ \\','| | |','| |_|','\\___/','     '],
  'P': ['|__  ','|  ) ','|__/ ','|    ','|    ','     '],
  'Q': [' ___ ','/ _ \\','| | |','| |_|','\\__X ','    X'],
  'R': ['|__  ','|  ) ','|_/  ','| \\  ','|  \\ ','     '],
  'S': [' ___ ','/ __|','\\__ \\','___/ ','\\___/','     '],
  'T': ['_|_','  |','  |','  |','  |','   '],
  'U': ['| |','| |','| |','| |','|_|','   '],
  'V': ['\\   /','\\   /','\\   /',' \\ / ','  V  ','     '],
  'W': ['\\   /','\\   /','\\   /','\\|V|/','  W  ','     '],
  'X': ['\\ / ','_X_','/X\\','/  \\','     '],
  'Y': ['\\  /','\\/ ','  | ','  | ','  | ','    '],
  'Z': ['___','  /','_/ ','  \\','___\\','    '],
  '0': [' 0 ','/ \\','|0|','\\0/','   ','   '],
  '1': ['|1','| ','| ','| ','   ','   '],
  '2': [' 2 ','  )','_/ ','2__','   ','   '],
  '3': ['3_ ','_) ','3  ','_) ','   ','   '],
  '4': ['|\\4 ','| 4 ','|__|','   4','    ','    '],
  '5': ['5__','5_ ','  )','5_/','   ','   '],
  '6': [' 6_','6  ','6_ ','\\6/','   ','   '],
  '7': ['___','  /','7/ ','7  ','   ','   '],
  '8': [' 8 ','(8)','(8)','(8)','   ','   '],
  '9': [' 9 ','(_9','  |','  9','   ','   '],
}

const SMALL: Record<string, string[]> = {
  ' ': ['  ','  ','  '],
  'A': ['/\\','/_\\','   '],
  'B': ['|_)','|_)','   '],
  'C': ['/_ ','\\_ ','   '],
  'D': ['|\\ ','|_/','   '],
  'E': ['|_ ','|_ ','   '],
  'F': ['|_ ','|  ','   '],
  'G': ['(- ','(_/','   '],
  'H': ['|_|','| |','   '],
  'I': ['|','|','  '],
  'J': [' |',' J','  '],
  'K': ['|/','|\\','  '],
  'L': ['|  ','|__','   '],
  'M': ['|\\/|','|  |','    '],
  'N': ['|\\ ','| \\','   '],
  'O': ['(_)','(_)','   '],
  'P': ['|_)','|  ','   '],
  'Q': ['(_)','(_X','   '],
  'R': ['|_)','| \\','   '],
  'S': ['(_ ','_) ','   '],
  'T': ['-|- ','  | ','    '],
  'U': ['| |','|_|','   '],
  'V': ['\\  /','\\/ ','   '],
  'W': ['\\/\\/','  W ','    '],
  'X': ['\\/ ','/ \\','   '],
  'Y': ['\\/ ','|  ','   '],
  'Z': ['_/ ','/_  ','   '],
  '0': ['0 ','0 ','  '],
  '1': ['1 ','1 ','  '],
  '2': ['2)','2_','  '],
  '3': ['3)','3)','  '],
  '4': ['|4','_4','  '],
  '5': ['5_','5)','  '],
  '6': ['6_','6)','  '],
  '7': ['7 ','/  ','  '],
  '8': ['8)','8)','  '],
  '9': ['9)','_9','  '],
}

function renderAscii(text: string, font: Record<string, string[]>): string {
  const chars = text.toUpperCase().split('').map(c => font[c] ?? font[' '] ?? ['   ', '   ', '   '])
  const height = Math.max(...chars.map(c => c.length))
  const rows = Array.from({ length: height }, (_, i) =>
    chars.map(c => c[i] ?? ' '.repeat((c[0] ?? '').length)).join('')
  )
  return rows.join('\n')
}

const FONTS: { id: string; label: string; font: Record<string, string[]> }[] = [
  { id: 'big', label: 'Big', font: BIG },
  { id: 'small', label: 'Small', font: SMALL },
]

export default function AsciiArtPage() {
  const [text, setText] = useState('HELLO')
  const [fontId, setFontId] = useState('big')
  const [copied, setCopied] = useState(false)

  const currentFont = FONTS.find(f => f.id === fontId)?.font ?? BIG
  const output = text.trim() ? renderAscii(text.slice(0, 15), currentFont) : ''

  function copy() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function download() {
    const blob = new Blob([output], { type: 'text/plain' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'ascii-art.txt'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🎨</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>ASCII Art Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Convert text to ASCII art in multiple font styles</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', marginBottom: '24px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>
              Your Text <span style={{ color: '#94a3b8', fontWeight: 400 }}>(max 15 characters)</span>
            </label>
            <input
              type="text"
              value={text}
              onChange={e => setText(e.target.value.slice(0, 15))}
              placeholder="Type something..."
              style={{ width: '100%', padding: '14px 16px', border: '2px solid #e2e8f0', borderRadius: '12px', fontFamily: 'inherit', fontSize: '18px', outline: 'none', boxSizing: 'border-box' as const }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Font</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {FONTS.map(f => (
                <button key={f.id} onClick={() => setFontId(f.id)}
                  style={{ padding: '14px 20px', borderRadius: '12px', border: '2px solid', borderColor: fontId === f.id ? '#0F2A4A' : '#e2e8f0', background: fontId === f.id ? '#0F2A4A' : 'white', color: fontId === f.id ? 'white' : '#64748b', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        {output && (
          <div style={{ background: '#0F2A4A', borderRadius: '16px', padding: '28px', marginBottom: '16px', overflowX: 'auto' }}>
            <pre style={{ fontFamily: 'monospace', fontSize: '14px', color: '#F48C42', margin: 0, lineHeight: '1.4', whiteSpace: 'pre' }}>{output}</pre>
          </div>
        )}

        {/* Actions */}
        {output && (
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={copy} style={{ flex: 1, padding: '14px', background: copied ? '#dcfce7' : '#E85D04', color: copied ? '#16a34a' : 'white', border: 'none', borderRadius: '12px', fontFamily: 'inherit', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
              {copied ? '✅ Copied!' : '📋 Copy ASCII Art'}
            </button>
            <button onClick={download} style={{ flex: 1, padding: '14px', background: 'white', color: '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontFamily: 'inherit', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
              ⬇️ Download .txt
            </button>
          </div>
        )}

        {/* Info */}
        <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px', marginTop: '24px' }}>
          <div style={{ fontWeight: 700, color: '#0F2A4A', marginBottom: '8px', fontSize: '14px' }}>Tips</div>
          <ul style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
            <li>Supports A-Z and 0-9</li>
            <li>Maximum 15 characters per line for readability</li>
            <li>Best viewed in a monospace font</li>
            <li>Download as .txt to preserve the formatting</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
