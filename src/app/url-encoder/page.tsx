/*
  ConvertDox — URL Encoder / Decoder
  PUT IN: src/app/url-encoder/page.tsx
*/
'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import RelatedTools from '@/components/RelatedTools'

export default function URLEncoderPage() {
  const [mode, setMode] = useState<'encode'|'decode'>('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copiedOut, setCopiedOut] = useState(false)

  const process = (val: string, m: 'encode'|'decode') => {
    setInput(val)
    if (!val.trim()) { setOutput(''); setError(''); return }
    try {
      if (m === 'encode') {
        setOutput(encodeURIComponent(val))
      } else {
        setOutput(decodeURIComponent(val))
      }
      setError('')
    } catch {
      setError('Invalid URL encoding — check your input')
      setOutput('')
    }
  }

  const switchMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode'
    setMode(newMode)
    if (output) {
      process(output, newMode)
    }
  }

  const copy = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopiedOut(true)
    setTimeout(() => setCopiedOut(false), 2000)
  }

  const examples = [
    { label:'Space → %20', input:'hello world' },
    { label:'Email address', input:'user@example.com' },
    { label:'Full URL', input:'https://example.com/search?q=hello world&lang=en' },
    { label:'Special chars', input:'Price: $10.99 (50% off!)' },
  ]

  return (
    <div style={{ minHeight:'100vh',background:'#fff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <TrustStrip />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>🔗</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>URL Encoder / Decoder</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Encode URLs for safe transmission or decode encoded URLs back to readable text.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'800px',margin:'0 auto',padding:'36px 24px' }}>

        {/* Mode toggle */}
        <div style={{ display:'flex',background:'#f1f5f9',borderRadius:'12px',padding:'4px',marginBottom:'24px' }}>
          {(['encode','decode'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); process(input, m) }}
              style={{ flex:1,padding:'10px',borderRadius:'9px',border:'none',background:mode===m?'white':'transparent',fontFamily:'inherit',fontSize:'14px',fontWeight:700,color:mode===m?'#0F2A4A':'#64748b',cursor:'pointer',boxShadow:mode===m?'0 2px 6px rgba(0,0,0,0.08)':'none',textTransform:'capitalize',transition:'all 0.2s' }}>
              {m === 'encode' ? '🔒 Encode URL' : '🔓 Decode URL'}
            </button>
          ))}
        </div>

        {/* Quick examples */}
        <div style={{ marginBottom:'20px' }}>
          <div style={{ fontSize:'13px',fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'8px' }}>Quick examples</div>
          <div style={{ display:'flex',gap:'8px',flexWrap:'wrap' }}>
            {examples.map(ex => (
              <button key={ex.label} onClick={() => process(ex.input, mode)}
                style={{ padding:'6px 14px',borderRadius:'8px',border:'1.5px solid #e2e8f0',background:'white',fontFamily:'inherit',fontSize:'12.5px',fontWeight:500,color:'#0F2A4A',cursor:'pointer' }}>
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main card */}
        <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'24px',boxShadow:'0 4px 20px rgba(15,42,74,0.07)' }}>

          {/* Input */}
          <div style={{ marginBottom:'16px' }}>
            <label style={{ display:'block',fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>
              {mode === 'encode' ? 'Plain Text / URL to Encode' : 'Encoded URL to Decode'}
            </label>
            <textarea value={input} onChange={e => process(e.target.value, mode)}
              placeholder={mode === 'encode' ? 'https://example.com/search?q=hello world' : 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world'}
              rows={4}
              style={{ width:'100%',padding:'14px 16px',border:'1.5px solid #e2e8f0',borderRadius:'12px',fontFamily:'monospace',fontSize:'14px',color:'#0F2A4A',outline:'none',resize:'vertical',lineHeight:'1.6' }}/>
          </div>

          {/* Switch button */}
          <div style={{ textAlign:'center',marginBottom:'16px' }}>
            <button onClick={switchMode}
              style={{ background:'#f1f5f9',border:'1.5px solid #e2e8f0',borderRadius:'999px',padding:'8px 20px',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer',color:'#0F2A4A' }}>
              ⇄ Swap Input & Output
            </button>
          </div>

          {/* Output */}
          <div>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px' }}>
              <label style={{ fontSize:'13.5px',fontWeight:700,color:'#0F2A4A' }}>
                {mode === 'encode' ? 'Encoded URL' : 'Decoded Text'}
              </label>
              {output && (
                <button onClick={copy}
                  style={{ background:copiedOut?'#16A34A':'#f1f5f9',border:'none',borderRadius:'7px',padding:'5px 14px',fontFamily:'inherit',fontSize:'12.5px',fontWeight:600,cursor:'pointer',color:copiedOut?'white':'#0F2A4A' }}>
                  {copiedOut ? '✓ Copied!' : '📋 Copy'}
                </button>
              )}
            </div>
            {error ? (
              <div style={{ padding:'14px 16px',background:'#FEF2F2',border:'1.5px solid #FECACA',borderRadius:'12px',color:'#DC2626',fontSize:'14px',fontWeight:500 }}>
                ❌ {error}
              </div>
            ) : (
              <div style={{ padding:'14px 16px',background:output?'#F0FDF4':'#f8fafc',border:'1.5px solid',borderColor:output?'#BBF7D0':'#e2e8f0',borderRadius:'12px',fontFamily:'monospace',fontSize:'14px',color:'#0F2A4A',minHeight:'80px',wordBreak:'break-all',lineHeight:'1.6',whiteSpace:'pre-wrap' }}>
                {output || <span style={{ color:'#94a3b8' }}>Result appears here...</span>}
              </div>
            )}
          </div>
        </div>

        {/* What gets encoded table */}
        <div style={{ marginTop:'32px',background:'white',border:'1.5px solid #e2e8f0',borderRadius:'16px',padding:'20px' }}>
          <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'16px',fontWeight:700,color:'#0F2A4A',marginBottom:'14px' }}>Common URL Encodings</h3>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px' }}>
            {[['Space',' ','%20'],['!',' !','%21'],['#','#','%23'],['$','$','%24'],['&','&','%26'],['@','@','%40'],['/',' /','%2F'],['?','?','%3F'],['=',' =','%3D'],['+',' +','%2B'],['[',' [','%5B'],[']',' ]','%5D']].map(([name,char,enc]) => (
              <div key={name} style={{ background:'#f8fafc',borderRadius:'8px',padding:'8px 12px',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                <span style={{ fontFamily:'monospace',fontSize:'13px',color:'#64748b' }}>{char}</span>
                <span style={{ fontSize:'11px',color:'#94a3b8' }}>→</span>
                <span style={{ fontFamily:'monospace',fontSize:'13px',fontWeight:700,color:'#0F2A4A' }}>{enc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop:'36px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',marginBottom:'14px' }}>FAQ</h2>
          {[
            { q:'What is URL encoding?', a:'URL encoding converts characters that are not allowed in URLs into a format that can be transmitted. For example, a space becomes %20.' },
            { q:'When do I need to encode a URL?', a:'When passing data in query strings, when including special characters in URLs, or when working with APIs that require encoded parameters.' },
            { q:'What is the difference between encodeURI and encodeURIComponent?', a:'encodeURIComponent encodes all special characters including /, ?, # and &. Use it for individual parameter values. encodeURI only encodes characters not allowed in a full URL.' },
          ].map((item,i) => (
            <details key={i} style={{ border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'14px 18px',marginBottom:'8px',background:'white' }}>
              <summary style={{ fontWeight:700,fontSize:'14px',color:'#0F2A4A',cursor:'pointer',listStyle:'none',display:'flex',justifyContent:'space-between' }}>{item.q}<span style={{ color:'#E85D04',fontSize:'20px',fontWeight:300 }}>+</span></summary>
              <p style={{ marginTop:'10px',fontSize:'14px',color:'#64748b',lineHeight:'1.7' }}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      <RelatedTools currentPath="/url-encoder" />
    </div>
  )
}
