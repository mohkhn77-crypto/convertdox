/*
  ConvertDox — Password Generator
  PUT IN: src/app/password-generator/page.tsx
  URL: localhost:3000/password-generator
*/
'use client'
import { useState, useCallback } from 'react'

const NAV = () => (
  <nav style={{ position:'sticky',top:0,zIndex:100,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',borderBottom:'1px solid #e2e8f0',boxShadow:'0 1px 8px rgba(15,42,74,0.06)' }}>
    <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'0 24px',height:'62px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
      <a href="/" style={{ textDecoration:'none',display:'flex',alignItems:'center',gap:'9px' }}>
        <div style={{ width:'44px',height:'44px',background:'#0F2A4A',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}><svg width="28" height="28" viewBox="0 0 44 44" fill="none"><rect x="6" y="10" width="13" height="17" rx="2" fill="white" opacity="0.95"/><rect x="7" y="14" width="7" height="1.5" rx="0.75" fill="#0F2A4A" opacity="0.35"/><rect x="7" y="17" width="5" height="1.5" rx="0.75" fill="#0F2A4A" opacity="0.35"/><rect x="7" y="20" width="6" height="1.5" rx="0.75" fill="#0F2A4A" opacity="0.35"/><rect x="25" y="17" width="13" height="17" rx="2" fill="#E85D04"/><rect x="26" y="21" width="7" height="1.5" rx="0.75" fill="white" opacity="0.5"/><rect x="26" y="24" width="5" height="1.5" rx="0.75" fill="white" opacity="0.5"/><rect x="26" y="27" width="6" height="1.5" rx="0.75" fill="white" opacity="0.5"/><path d="M20 22h4M21 20l3 2-3 2" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <span style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'22px',fontWeight:800,color:'#0F2A4A' }}>Convert<span style={{ color:'#E85D04' }}>Dox</span></span>
      </a>
      <a href="/" style={{ fontSize:'13px',color:'#64748b',textDecoration:'none',fontWeight:500 }}>← All Tools</a>
    </div>
  </nav>
)
const FOOTER = () => (
  <footer style={{ background:'#0F2A4A',marginTop:'60px',padding:'28px 24px' }}>
    <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px' }}>
      <span style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'16px',fontWeight:800,color:'white' }}>Convert<span style={{ color:'#F48C42' }}>Dox</span></span>
      <p style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',margin:0 }}>© 2025 ConvertDox</p>
      <div style={{ display:'flex',gap:'16px' }}>{['Privacy','Terms','All Tools'].map(l=><a key={l} href="#" style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',textDecoration:'none' }}>{l}</a>)}</div>
    </div>
  </footer>
)

function Check({ checked, onChange, label }: { checked:boolean; onChange:(v:boolean)=>void; label:string }) {
  return (
    <label style={{ display:'flex',alignItems:'center',gap:'10px',cursor:'pointer',padding:'10px 14px',background:checked?'#EFF6FF':'#f8fafc',border:'1.5px solid',borderColor:checked?'#BFDBFE':'#e2e8f0',borderRadius:'10px',transition:'all 0.15s' }}>
      <div onClick={()=>onChange(!checked)} style={{ width:'22px',height:'22px',borderRadius:'6px',border:'2px solid',borderColor:checked?'#0F2A4A':'#cbd5e1',background:checked?'#0F2A4A':'white',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0,transition:'all 0.15s' }}>
        {checked&&<span style={{ color:'white',fontSize:'13px',fontWeight:700 }}>✓</span>}
      </div>
      <span style={{ fontSize:'14px',fontWeight:600,color:'#0F2A4A' }}>{label}</span>
    </label>
  )
}

export default function PasswordGeneratorPage() {
  const [length, setLength]           = useState(16)
  const [useUpper, setUseUpper]       = useState(true)
  const [useLower, setUseLower]       = useState(true)
  const [useNumbers, setUseNumbers]   = useState(true)
  const [useSymbols, setUseSymbols]   = useState(true)
  const [noSimilar, setNoSimilar]     = useState(false)
  const [password, setPassword]       = useState('')
  const [copied, setCopied]           = useState(false)
  const [history, setHistory]         = useState<string[]>([])

  const generate = useCallback(() => {
    let chars = ''
    if (useUpper)   chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (useLower)   chars += 'abcdefghijklmnopqrstuvwxyz'
    if (useNumbers) chars += '0123456789'
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    if (noSimilar)  chars = chars.replace(/[0OoIl1]/g,'')
    if (!chars)     chars = 'abcdefghijklmnopqrstuvwxyz'
    const arr = new Uint32Array(length)
    crypto.getRandomValues(arr)
    const pwd = Array.from(arr).map(n=>chars[n%chars.length]).join('')
    setPassword(pwd)
    setHistory(prev=>[pwd,...prev.slice(0,4)])
  }, [length,useUpper,useLower,useNumbers,useSymbols,noSimilar])

  const strength = Math.min(5,[length>=8,length>=12,length>=16,useUpper&&useLower,useNumbers,useSymbols].filter(Boolean).length)
  const strLabels = ['Very Weak','Weak','Fair','Good','Strong','Very Strong']
  const strColors = ['#DC2626','#F97316','#EAB308','#22C55E','#16A34A','#0D9488']

  const copy = () => {
    if (!password) return
    navigator.clipboard.writeText(password)
    setCopied(true); setTimeout(()=>setCopied(false),2000)
  }

  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NAV/>
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>🔑</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>Password Generator</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Generate secure, cryptographically random passwords instantly. Nothing leaves your browser.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'680px',margin:'0 auto',padding:'36px 24px' }}>

        {/* Password display */}
        <div style={{ background:'#0F2A4A',borderRadius:'16px',padding:'20px 24px',marginBottom:'20px',display:'flex',alignItems:'center',gap:'16px',boxShadow:'0 8px 32px rgba(15,42,74,0.25)' }}>
          <div style={{ fontFamily:'monospace',fontSize:'18px',color:password?'#7DD3FC':'rgba(255,255,255,0.25)',letterSpacing:'1.5px',flex:1,wordBreak:'break-all',lineHeight:'1.5' }}>
            {password||'Click Generate to create a password'}
          </div>
          <button onClick={copy} style={{ background:copied?'#16A34A':'rgba(255,255,255,0.15)',border:'none',borderRadius:'10px',padding:'10px 14px',color:'white',fontFamily:'inherit',fontSize:'13px',fontWeight:700,cursor:'pointer',flexShrink:0,transition:'all 0.15s',whiteSpace:'nowrap' }}>
            {copied?'✓ Copied':'📋 Copy'}
          </button>
        </div>

        {/* Strength meter */}
        {password && (
          <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'14px 18px',marginBottom:'20px',display:'flex',alignItems:'center',gap:'14px' }}>
            <span style={{ fontSize:'13px',fontWeight:700,color:'#0F2A4A',flexShrink:0 }}>Strength:</span>
            <div style={{ flex:1,height:'8px',background:'#e2e8f0',borderRadius:'999px',overflow:'hidden' }}>
              <div style={{ height:'100%',width:`${(strength/5)*100}%`,background:strColors[strength],borderRadius:'999px',transition:'all 0.3s' }}/>
            </div>
            <span style={{ fontSize:'13px',fontWeight:700,color:strColors[strength],flexShrink:0 }}>{strLabels[strength]}</span>
          </div>
        )}

        {/* Controls */}
        <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'28px',boxShadow:'0 8px 32px rgba(15,42,74,0.07)',marginBottom:'20px' }}>

          {/* Length */}
          <div style={{ marginBottom:'24px' }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px' }}>
              <label style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A' }}>Password Length</label>
              <div style={{ background:'#0F2A4A',color:'white',borderRadius:'8px',padding:'4px 12px',fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'18px',fontWeight:800 }}>{length}</div>
            </div>
            <input type="range" min="4" max="64" value={length} onChange={e=>setLength(parseInt(e.target.value))} style={{ width:'100%',accentColor:'#E85D04',height:'6px',cursor:'pointer' }}/>
            <div style={{ display:'flex',justifyContent:'space-between',fontSize:'11.5px',color:'#94a3b8',marginTop:'5px' }}>
              <span>4 — too short</span><span style={{ color:'#16A34A',fontWeight:600 }}>16–20 recommended</span><span>64 — maximum</span>
            </div>
          </div>

          {/* Checkboxes */}
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px' }}>
            <Check checked={useUpper}   onChange={setUseUpper}   label="Uppercase A-Z"/>
            <Check checked={useLower}   onChange={setUseLower}   label="Lowercase a-z"/>
            <Check checked={useNumbers} onChange={setUseNumbers} label="Numbers 0-9"/>
            <Check checked={useSymbols} onChange={setUseSymbols} label="Symbols !@#$"/>
            <div style={{ gridColumn:'1/-1' }}>
              <Check checked={noSimilar} onChange={setNoSimilar} label="Exclude similar characters (0, O, I, l, 1)"/>
            </div>
          </div>
        </div>

        {/* Generate button */}
        <button onClick={generate} style={{ width:'100%',background:'linear-gradient(135deg,#E85D04,#F48C42)',color:'white',border:'none',padding:'16px',borderRadius:'14px',fontFamily:'inherit',fontSize:'16px',fontWeight:800,cursor:'pointer',boxShadow:'0 6px 24px rgba(232,93,4,0.3)',transition:'all 0.15s',letterSpacing:'0.3px' }}>
          🔄 Generate Secure Password
        </button>

        {/* Security notice */}
        <div style={{ marginTop:'14px',background:'#F0FDF4',border:'1.5px solid #BBF7D0',borderRadius:'12px',padding:'12px 16px',display:'flex',alignItems:'flex-start',gap:'10px' }}>
          <span style={{ fontSize:'18px',flexShrink:0 }}>🔒</span>
          <p style={{ fontSize:'12.5px',color:'#166534',lineHeight:'1.6',margin:0 }}>Uses <strong>crypto.getRandomValues()</strong> — the most secure browser API available. Passwords are generated locally and never leave your device.</p>
        </div>

        {/* History */}
        {history.length>1&&(
          <div style={{ marginTop:'24px',background:'white',border:'1.5px solid #e2e8f0',borderRadius:'16px',padding:'20px' }}>
            <div style={{ fontSize:'12px',fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'10px' }}>Recently Generated (click to copy)</div>
            {history.slice(1).map((p,i)=>(
              <div key={i} onClick={()=>navigator.clipboard.writeText(p)} style={{ fontFamily:'monospace',fontSize:'13px',color:'#64748b',padding:'8px 12px',borderRadius:'8px',cursor:'pointer',background:'#f8fafc',marginBottom:'6px',letterSpacing:'0.5px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',border:'1px solid #f1f5f9' }}>
                {p}
              </div>
            ))}
          </div>
        )}
      </div>
      <FOOTER/>
    </div>
  )
}
