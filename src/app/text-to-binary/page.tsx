'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

type Format = 'spaced' | 'nospace' | 'prefix'
type Mode = 'encode' | 'decode'

function textToBinary(text: string, fmt: Format): string {
  const bytes = text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0'))
  if (fmt === 'spaced') return bytes.join(' ')
  if (fmt === 'nospace') return bytes.join('')
  return bytes.map(b => '0b' + b).join(' ')
}

function binaryToText(binary: string): string {
  const cleaned = binary.trim().replace(/0b/g, '').replace(/[^01\s]/g, '')
  const chunks = cleaned.includes(' ') ? cleaned.split(/\s+/) : cleaned.match(/.{1,8}/g) ?? []
  return chunks.map(b => String.fromCharCode(parseInt(b, 2))).join('')
}

export default function TextToBinaryPage() {
  const [mode, setMode] = useState<Mode>('encode')
  const [input, setInput] = useState('')
  const [format, setFormat] = useState<Format>('spaced')
  const [copied, setCopied] = useState('')

  const output = mode === 'encode' ? textToBinary(input, format) : binaryToText(input)

  const asciiCodes = mode === 'encode' && input
    ? input.split('').map(c => c.charCodeAt(0)).join(', ')
    : ''

  const hexCodes = mode === 'encode' && input
    ? input.split('').map(c => c.charCodeAt(0).toString(16).toUpperCase().padStart(2,'0')).join(' ')
    : ''

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 1500)
  }

  const FORMATS: { id: Format; label: string }[] = [
    { id: 'spaced', label: 'Space-separated (01001000 01101001)' },
    { id: 'nospace', label: 'No spaces (0100100001101001)' },
    { id: 'prefix', label: 'With 0b prefix (0b01001000 0b01101001)' },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'#fff', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', fontFamily:'monospace', fontWeight:800, color:'white' }}>01</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>Text to Binary Converter</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Convert text to binary code and binary back to text</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'32px 24px' }}>
        <div style={{ display:'flex', gap:'8px', marginBottom:'20px' }}>
          {(['encode','decode'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setInput('') }}
              style={{ padding:'10px 24px', borderRadius:'10px', border:'1.5px solid', borderColor:mode===m?'#0F2A4A':'#e2e8f0', background:mode===m?'#0F2A4A':'white', color:mode===m?'white':'#64748b', fontFamily:'inherit', fontSize:'14px', fontWeight:700, cursor:'pointer' }}>
              {m === 'encode' ? 'Text → Binary' : 'Binary → Text'}
            </button>
          ))}
        </div>

        {mode === 'encode' && (
          <div style={{ marginBottom:'16px' }}>
            <div style={{ fontSize:'13px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px' }}>Output Format</div>
            <div style={{ display:'flex', flexDirection:'column' as const, gap:'6px' }}>
              {FORMATS.map(f => (
                <label key={f.id} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'14px', color:'#374151', cursor:'pointer' }}>
                  <input type="radio" name="fmt" checked={format===f.id} onChange={() => setFormat(f.id)} />
                  {f.label}
                </label>
              ))}
            </div>
          </div>
        )}

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px' }}>
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' }}>
              <span style={{ fontSize:'13px', fontWeight:700, color:'#0F2A4A' }}>{mode==='encode'?'Text Input':'Binary Input'}</span>
              <button onClick={() => setInput('Hello')}
                style={{ fontSize:'12px', fontWeight:600, color:'#E85D04', background:'transparent', border:'none', cursor:'pointer', fontFamily:'inherit' }}>Try "Hello"</button>
            </div>
            <textarea value={input} onChange={e => setInput(e.target.value)}
              placeholder={mode==='encode' ? 'Enter text to convert...' : 'Enter binary code (e.g. 01001000 01101001)'}
              style={{ width:'100%', padding:'12px 16px', border:'1.5px solid #e2e8f0', borderRadius:'10px', fontSize:'14px', fontFamily:'monospace', resize:'vertical' as const, outline:'none', boxSizing:'border-box' as const, minHeight:'200px' }} />
          </div>
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' }}>
              <span style={{ fontSize:'13px', fontWeight:700, color:'#0F2A4A' }}>{mode==='encode'?'Binary Output':'Text Output'}</span>
              <button onClick={() => copy(output, 'output')} disabled={!output}
                style={{ fontSize:'12px', fontWeight:600, color:copied==='output'?'#16A34A':'#E85D04', background:'transparent', border:'none', cursor:'pointer', fontFamily:'inherit' }}>
                {copied==='output'?'✓ Copied!':'📋 Copy'}
              </button>
            </div>
            <div style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'12px 16px', minHeight:'200px', fontFamily:'monospace', fontSize:'13px', color:'#374151', wordBreak:'break-all' as const, lineHeight:'1.8' }}>
              {output || <span style={{ color:'#94a3b8' }}>Output appears here</span>}
            </div>
          </div>
        </div>

        {mode === 'encode' && input && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
            <div style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'12px', padding:'16px' }}>
              <div style={{ fontSize:'12px', fontWeight:700, color:'#64748b', textTransform:'uppercase' as const, marginBottom:'8px' }}>ASCII Codes</div>
              <div style={{ fontFamily:'monospace', fontSize:'13px', color:'#0F2A4A', wordBreak:'break-all' as const }}>{asciiCodes}</div>
            </div>
            <div style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'12px', padding:'16px' }}>
              <div style={{ fontSize:'12px', fontWeight:700, color:'#64748b', textTransform:'uppercase' as const, marginBottom:'8px' }}>Hexadecimal</div>
              <div style={{ fontFamily:'monospace', fontSize:'13px', color:'#0F2A4A', wordBreak:'break-all' as const }}>{hexCodes}</div>
            </div>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  )
}
