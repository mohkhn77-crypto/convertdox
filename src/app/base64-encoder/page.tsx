/*
  ConvertDox — Base64 Encoder / Decoder
  PUT IN: src/app/base64-encoder/page.tsx
*/
'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import SiteFooter from '@/components/SiteFooter'
import RelatedTools from '@/components/RelatedTools'

export default function Base64Page() {
  const [mode, setMode] = useState<'encode'|'decode'>('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copiedIn, setCopiedIn] = useState(false)
  const [copiedOut, setCopiedOut] = useState(false)

  const encode = (val: string) => {
    try {
      const result = btoa(unescape(encodeURIComponent(val)))
      setOutput(result)
      setError('')
    } catch {
      setError('Could not encode this text')
    }
  }

  const decode = (val: string) => {
    try {
      const result = decodeURIComponent(escape(atob(val)))
      setOutput(result)
      setError('')
    } catch {
      setError('Invalid Base64 string — check your input')
    }
  }

  const handleInput = (val: string) => {
    setInput(val)
    if (!val.trim()) { setOutput(''); setError(''); return }
    if (mode === 'encode') encode(val)
    else decode(val)
  }

  const switchMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode'
    setMode(newMode)
    if (output) {
      setInput(output)
      if (newMode === 'encode') encode(output)
      else decode(output)
    }
    setOutput('')
  }

  const copy = (text: string, setCopied: (v:boolean)=>void) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const inputLabel = mode === 'encode' ? 'Plain Text' : 'Base64 String'
  const outputLabel = mode === 'encode' ? 'Base64 Encoded' : 'Decoded Text'

  return (
    <div style={{ minHeight:'100vh',background:'#fff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <TrustStrip />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>🔐</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>Base64 Encoder / Decoder</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Encode text to Base64 or decode Base64 back to plain text. Instant, free, private.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'900px',margin:'0 auto',padding:'36px 24px' }}>

        {/* Mode toggle */}
        <div style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:'16px',marginBottom:'28px' }}>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'18px',fontWeight:700,color:mode==='encode'?'#0F2A4A':'#94a3b8' }}>Plain Text</div>
          <button onClick={switchMode}
            style={{ background:'#0F2A4A',border:'none',borderRadius:'999px',padding:'10px 20px',cursor:'pointer',display:'flex',alignItems:'center',gap:'8px',color:'white',fontFamily:'inherit',fontSize:'14px',fontWeight:600 }}>
            ⇄ Switch
          </button>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'18px',fontWeight:700,color:mode==='decode'?'#0F2A4A':'#94a3b8' }}>Base64</div>
        </div>

        {/* Mode badge */}
        <div style={{ textAlign:'center',marginBottom:'24px' }}>
          <span style={{ background:mode==='encode'?'#EFF6FF':'#FFF7ED',color:mode==='encode'?'#1D4ED8':'#C2410C',fontSize:'13px',fontWeight:700,padding:'4px 16px',borderRadius:'999px',border:'1.5px solid',borderColor:mode==='encode'?'#BFDBFE':'#FED7AA' }}>
            {mode === 'encode' ? '→ Encoding plain text to Base64' : '→ Decoding Base64 to plain text'}
          </span>
        </div>

        {/* Two panes */}
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px' }}>
          <div>
            <div style={{ display:'flex',justifyContent:'space-between',marginBottom:'8px' }}>
              <span style={{ fontSize:'13px',fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px' }}>{inputLabel}</span>
              <button onClick={() => copy(input, setCopiedIn)}
                style={{ background:copiedIn?'#16A34A':'#f1f5f9',border:'none',borderRadius:'6px',padding:'3px 10px',fontFamily:'inherit',fontSize:'12px',fontWeight:600,cursor:'pointer',color:copiedIn?'white':'#0F2A4A' }}>
                {copiedIn ? '✓' : 'Copy'}
              </button>
            </div>
            <textarea value={input} onChange={e=>handleInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Type or paste text to encode...' : 'Paste Base64 string to decode...'}
              style={{ width:'100%',minHeight:'280px',padding:'16px',border:'1.5px solid #e2e8f0',borderRadius:'14px',fontFamily:'monospace',fontSize:'13.5px',color:'#0F2A4A',outline:'none',resize:'vertical',lineHeight:'1.7',background:'#fafafa' }}/>
            {input && (
              <div style={{ marginTop:'6px',fontSize:'12px',color:'#94a3b8' }}>
                {input.length} characters
              </div>
            )}
          </div>

          <div>
            <div style={{ display:'flex',justifyContent:'space-between',marginBottom:'8px' }}>
              <span style={{ fontSize:'13px',fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px' }}>{outputLabel}</span>
              {output && (
                <button onClick={() => copy(output, setCopiedOut)}
                  style={{ background:copiedOut?'#16A34A':'#f1f5f9',border:'none',borderRadius:'6px',padding:'3px 10px',fontFamily:'inherit',fontSize:'12px',fontWeight:600,cursor:'pointer',color:copiedOut?'white':'#0F2A4A' }}>
                  {copiedOut ? '✓ Copied' : 'Copy'}
                </button>
              )}
            </div>
            {error ? (
              <div style={{ minHeight:'280px',padding:'16px',border:'1.5px solid #FECACA',borderRadius:'14px',background:'#FEF2F2',display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center' }}>
                <div>
                  <div style={{ fontSize:'32px',marginBottom:'10px' }}>❌</div>
                  <div style={{ fontSize:'14px',fontWeight:600,color:'#DC2626' }}>{error}</div>
                </div>
              </div>
            ) : (
              <div style={{ minHeight:'280px',padding:'16px',border:'1.5px solid',borderColor:output?'#BBF7D0':'#e2e8f0',borderRadius:'14px',fontFamily:'monospace',fontSize:'13.5px',color:'#0F2A4A',lineHeight:'1.7',background:output?'#F0FDF4':'#fafafa',whiteSpace:'pre-wrap',wordBreak:'break-all',overflow:'auto' }}>
                {output || <span style={{ color:'#94a3b8' }}>Result will appear here...</span>}
              </div>
            )}
            {output && !error && (
              <div style={{ marginTop:'6px',fontSize:'12px',color:'#94a3b8' }}>
                {output.length} characters
              </div>
            )}
          </div>
        </div>

        {/* Privacy notice */}
        <div style={{ marginTop:'16px',background:'#F0FDF4',border:'1.5px solid #BBF7D0',borderRadius:'10px',padding:'12px 16px',display:'flex',alignItems:'center',gap:'8px' }}>
          <span style={{ fontSize:'18px' }}>🔒</span>
          <p style={{ fontSize:'12.5px',color:'#166534',margin:0 }}>All encoding and decoding happens entirely in your browser. Nothing is sent to any server.</p>
        </div>

        {/* FAQ */}
        <div style={{ marginTop:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',marginBottom:'14px' }}>FAQ</h2>
          {[
            { q:'What is Base64?', a:'Base64 is a way to encode binary data as ASCII text. It\'s commonly used to encode images, files, and data for transmission over text-based systems like email or APIs.' },
            { q:'Is Base64 encryption?', a:'No. Base64 is encoding, not encryption. It is easily reversible and provides no security. Never use it to protect sensitive data.' },
            { q:'What is Base64 used for?', a:'Common uses include encoding images in CSS/HTML, storing binary data in JSON, and transmitting data in URLs or email attachments.' },
          ].map((item,i) => (
            <details key={i} style={{ border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'14px 18px',marginBottom:'8px',background:'white' }}>
              <summary style={{ fontWeight:700,fontSize:'14px',color:'#0F2A4A',cursor:'pointer',listStyle:'none',display:'flex',justifyContent:'space-between' }}>{item.q}<span style={{ color:'#E85D04',fontSize:'20px',fontWeight:300 }}>+</span></summary>
              <p style={{ marginTop:'10px',fontSize:'14px',color:'#64748b',lineHeight:'1.7' }}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      <RelatedTools currentPath="/base64-encoder" />
      <SiteFooter />
    </div>
  )
}
