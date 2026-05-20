/*
  ConvertDox — JSON Formatter & Validator
  PUT IN: src/app/json-formatter/page.tsx
*/
'use client'
import { useState } from 'react'

const Logo = () => (
  <div style={{ width:'44px',height:'44px',background:'#0F2A4A',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="6" y="10" width="13" height="17" rx="2" fill="white" opacity="0.95"/>
      <rect x="25" y="17" width="13" height="17" rx="2" fill="#E85D04"/>
      <polygon points="20,20 24,22 20,24" fill="white"/>
    </svg>
  </div>
)
const NAV = () => (
  <nav style={{ position:'sticky',top:0,zIndex:100,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',borderBottom:'1px solid #e2e8f0',boxShadow:'0 1px 8px rgba(15,42,74,0.06)' }}>
    <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'0 24px',height:'62px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
      <a href="/" style={{ textDecoration:'none',display:'flex',alignItems:'center',gap:'9px' }}>
        <Logo/>
        <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'30px',fontWeight:800,color:'#0F2A4A' }}>Convert<span style={{ color:'#E85D04' }}>Dox</span></span>
      </a>
      <a href="/" style={{ fontSize:'13px',color:'#64748b',textDecoration:'none',fontWeight:500 }}>← All Tools</a>
    </div>
  </nav>
)
const FOOTER = () => (
  <footer style={{ background:'#0F2A4A',marginTop:'60px',padding:'28px 24px' }}>
    <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px' }}>
      <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'16px',fontWeight:800,color:'white' }}>Convert<span style={{ color:'#F48C42' }}>Dox</span></span>
      <p style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',margin:0 }}>© 2025 ConvertDox</p>
      <div style={{ display:'flex',gap:'16px' }}>{['Privacy','Terms','All Tools'].map(l=><a key={l} href="#" style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',textDecoration:'none' }}>{l}</a>)}</div>
    </div>
  </footer>
)

export default function JSONFormatterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState({ keys:0, strings:0, numbers:0, arrays:0, objects:0 })

  const format = () => {
    if (!input.trim()) { setError('Please paste some JSON first'); return }
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, indent)
      setOutput(formatted)
      setError('')
      // Count stats
      const str = JSON.stringify(parsed)
      setStats({
        keys: (str.match(/(?<=")\w+(?=":\s*)/g) || []).length,
        strings: (str.match(/"[^"]*"(?=\s*[,}\]])/g) || []).length,
        numbers: (str.match(/:\s*-?\d+\.?\d*/g) || []).length,
        arrays: (str.match(/\[/g) || []).length,
        objects: (str.match(/\{/g) || []).length,
      })
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }

  const minify = () => {
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (e: any) {
      setError(e.message)
    }
  }

  const copy = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clear = () => { setInput(''); setOutput(''); setError('') }

  return (
    <div style={{ minHeight:'100vh',background:'#fff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NAV/>
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>{'{ }'}</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>JSON Formatter</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Format, validate and minify JSON instantly. Paste messy JSON and get it clean.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'36px 24px' }}>

        {/* Controls */}
        <div style={{ display:'flex',gap:'10px',alignItems:'center',marginBottom:'20px',flexWrap:'wrap' }}>
          <div style={{ display:'flex',alignItems:'center',gap:'8px' }}>
            <label style={{ fontSize:'13.5px',fontWeight:600,color:'#0F2A4A' }}>Indent:</label>
            {[2,4].map(n => (
              <button key={n} onClick={() => setIndent(n)}
                style={{ padding:'6px 14px',borderRadius:'8px',border:'1.5px solid',borderColor:indent===n?'#0F2A4A':'#e2e8f0',background:indent===n?'#0F2A4A':'white',color:indent===n?'white':'#64748b',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer' }}>
                {n} spaces
              </button>
            ))}
          </div>
          <button onClick={format} style={{ background:'#0F2A4A',color:'white',border:'none',padding:'8px 20px',borderRadius:'8px',fontFamily:'inherit',fontSize:'13.5px',fontWeight:700,cursor:'pointer' }}>
            ✨ Format JSON
          </button>
          <button onClick={minify} style={{ background:'#f1f5f9',color:'#0F2A4A',border:'1px solid #e2e8f0',padding:'8px 20px',borderRadius:'8px',fontFamily:'inherit',fontSize:'13.5px',fontWeight:700,cursor:'pointer' }}>
            🗜 Minify
          </button>
          <button onClick={clear} style={{ background:'#FEF2F2',color:'#DC2626',border:'1px solid #FECACA',padding:'8px 20px',borderRadius:'8px',fontFamily:'inherit',fontSize:'13.5px',fontWeight:700,cursor:'pointer' }}>
            🗑 Clear
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background:'#FEF2F2',border:'1.5px solid #FECACA',borderRadius:'10px',padding:'12px 16px',marginBottom:'16px',display:'flex',alignItems:'center',gap:'8px' }}>
            <span style={{ fontSize:'18px' }}>❌</span>
            <span style={{ fontSize:'13.5px',color:'#DC2626',fontWeight:600 }}>Invalid JSON: {error}</span>
          </div>
        )}

        {/* Stats */}
        {output && !error && (
          <div style={{ display:'flex',gap:'8px',marginBottom:'16px',flexWrap:'wrap' }}>
            {[
              { label:'Keys', val:stats.keys, color:'#1D4ED8', bg:'#EFF6FF' },
              { label:'Strings', val:stats.strings, color:'#16A34A', bg:'#F0FDF4' },
              { label:'Numbers', val:stats.numbers, color:'#C2410C', bg:'#FFF7ED' },
              { label:'Arrays', val:stats.arrays, color:'#7C3AED', bg:'#FDF4FF' },
              { label:'Objects', val:stats.objects, color:'#0F2A4A', bg:'#f8fafc' },
            ].map(s => (
              <div key={s.label} style={{ background:s.bg,borderRadius:'8px',padding:'6px 14px',textAlign:'center' }}>
                <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'16px',fontWeight:800,color:s.color,marginRight:'6px' }}>{s.val}</span>
                <span style={{ fontSize:'12px',color:'#64748b' }}>{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Two panes */}
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px' }}>
          <div>
            <div style={{ fontSize:'13px',fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'8px' }}>Input — Paste your JSON here</div>
            <textarea value={input} onChange={e=>setInput(e.target.value)}
              placeholder={'{\n  "name": "ConvertDox",\n  "free": true,\n  "tools": 200\n}'}
              style={{ width:'100%',minHeight:'360px',padding:'16px',border:'1.5px solid #e2e8f0',borderRadius:'14px',fontFamily:'monospace',fontSize:'13px',color:'#0F2A4A',outline:'none',resize:'vertical',lineHeight:'1.7',background:'#fafafa' }}/>
          </div>
          <div>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px' }}>
              <div style={{ fontSize:'13px',fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px' }}>Output — Formatted JSON</div>
              {output && (
                <button onClick={copy} style={{ background:copied?'#16A34A':'#f1f5f9',border:'none',borderRadius:'7px',padding:'5px 12px',fontFamily:'inherit',fontSize:'12px',fontWeight:600,cursor:'pointer',color:copied?'white':'#0F2A4A' }}>
                  {copied ? '✓ Copied' : '📋 Copy'}
                </button>
              )}
            </div>
            <div style={{ minHeight:'360px',padding:'16px',border:'1.5px solid',borderColor:error?'#FECACA':output?'#BBF7D0':'#e2e8f0',borderRadius:'14px',fontFamily:'monospace',fontSize:'13px',color:'#0F2A4A',lineHeight:'1.7',background:output?'#F0FDF4':'#fafafa',whiteSpace:'pre-wrap',wordBreak:'break-all',overflow:'auto' }}>
              {output || <span style={{ color:'#94a3b8' }}>Formatted JSON will appear here...</span>}
            </div>
          </div>
        </div>
      </div>
      <FOOTER/>
    </div>
  )
}
