'use client'
import Link from 'next/link'
import RelatedTools from '@/components/RelatedTools'
import { useState, useEffect } from 'react'

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
      <Link href="/" style={{ textDecoration:'none',display:'flex',alignItems:'center',gap:'9px' }}>
        <Logo/>
        <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'30px',fontWeight:800,color:'#0F2A4A' }}>Convert<span style={{ color:'#E85D04' }}>Dox</span></span>
      </Link>
      <Link href="/" style={{ fontSize:'13px',color:'#64748b',textDecoration:'none',fontWeight:500 }}>← All Tools</Link>
    </div>
  </nav>
)

const FOOTER = () => (
  <footer style={{ background:'#0F2A4A',marginTop:'60px',padding:'28px 24px' }}>
    <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px' }}>
      <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'16px',fontWeight:800,color:'white' }}>Convert<span style={{ color:'#F48C42' }}>Dox</span></span>
      <p style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',margin:0 }}>© 2025 ConvertDox — Every Online Tool You Need</p>
      <div style={{ display:'flex',gap:'16px' }}>{['Privacy','Terms','All Tools'].map(l=><a key={l} href={l==='All Tools'?'/':'/legal'} style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',textDecoration:'none' }}>{l}</a>)}</div>
    </div>
  </footer>
)

function fallbackUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return fallbackUUID()
}

function formatUUID(uuid: string, uppercase: boolean, hyphens: boolean): string {
  let result = uuid
  if (!hyphens) result = result.replace(/-/g, '')
  if (uppercase) result = result.toUpperCase()
  return result
}

export default function UuidGeneratorPage() {
  const [uuids, setUuids] = useState<string[]>([])
  const [quantity, setQuantity] = useState(1)
  const [uppercase, setUppercase] = useState(false)
  const [hyphens, setHyphens] = useState(true)
  const [copiedIndex, setCopiedIndex] = useState<number|null>(null)
  const [copiedAll, setCopiedAll] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUuids([generateUUID()])
  }, [])

  const handleGenerate = () => {
    const newUuids = Array.from({ length: quantity }, generateUUID)
    setUuids(newUuids)
  }

  const displayedUuids = uuids.map(u => formatUUID(u, uppercase, hyphens))

  const handleCopyOne = (idx: number) => {
    navigator.clipboard.writeText(displayedUuids[idx])
    setCopiedIndex(idx)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleCopyAll = () => {
    navigator.clipboard.writeText(displayedUuids.join('\n'))
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([displayedUuids.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'uuids.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NAV />

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>
            🆔
          </div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>UUID Generator</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Generate cryptographically random UUID v4 identifiers instantly</p>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'16px 24px 0' }}>
        <div style={{ background:'#F0FDF4',border:'1.5px solid #BBF7D0',borderRadius:'12px',padding:'12px 16px',display:'flex',alignItems:'center',gap:'14px',flexWrap:'wrap',justifyContent:'center' }}>
          {[{icon:'🔒',text:'No files stored'},{icon:'🛡',text:'HTTPS encrypted'},{icon:'⚡',text:'Works in your browser'},{icon:'🆓',text:'100% free, no signup'}].map(item=>(
            <span key={item.text} style={{ fontSize:'13px',color:'#166534',fontWeight:600,display:'flex',alignItems:'center',gap:'6px' }}>
              <span style={{ fontSize:'16px' }}>{item.icon}</span>{item.text}
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'32px 24px' }}>

        {/* Controls */}
        <div style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'14px',padding:'24px',marginBottom:'24px' }}>
          <div style={{ display:'flex',flexWrap:'wrap',gap:'24px',alignItems:'flex-end' }}>

            {/* Quantity slider */}
            <div style={{ flex:'1',minWidth:'200px' }}>
              <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'8px' }}>
                Quantity: {quantity}
              </div>
              <input type="range" min={1} max={50} value={quantity} onChange={e=>setQuantity(parseInt(e.target.value))}
                style={{ width:'100%',accentColor:'#E85D04',cursor:'pointer',height:'6px' }}/>
              <div style={{ display:'flex',justifyContent:'space-between',fontSize:'11px',color:'#94a3b8',marginTop:'4px' }}>
                <span>1</span><span>50</span>
              </div>
            </div>

            {/* Format toggles */}
            <div>
              <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'8px' }}>Case</div>
              <div style={{ display:'flex',borderRadius:'8px',border:'1.5px solid #e2e8f0',overflow:'hidden' }}>
                <button onClick={()=>setUppercase(false)} style={{ padding:'8px 14px',border:'none',background:!uppercase?'#0F2A4A':'white',color:!uppercase?'white':'#64748b',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer' }}>lowercase</button>
                <button onClick={()=>setUppercase(true)} style={{ padding:'8px 14px',border:'none',background:uppercase?'#0F2A4A':'white',color:uppercase?'white':'#64748b',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer' }}>UPPERCASE</button>
              </div>
            </div>

            <div>
              <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'8px' }}>Hyphens</div>
              <div style={{ display:'flex',borderRadius:'8px',border:'1.5px solid #e2e8f0',overflow:'hidden' }}>
                <button onClick={()=>setHyphens(true)} style={{ padding:'8px 14px',border:'none',background:hyphens?'#0F2A4A':'white',color:hyphens?'white':'#64748b',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer' }}>With hyphens</button>
                <button onClick={()=>setHyphens(false)} style={{ padding:'8px 14px',border:'none',background:!hyphens?'#0F2A4A':'white',color:!hyphens?'white':'#64748b',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer' }}>Without</button>
              </div>
            </div>

            {/* Generate button */}
            <button onClick={handleGenerate}
              style={{ background:'#E85D04',color:'white',border:'none',borderRadius:'10px',padding:'12px 28px',fontFamily:'inherit',fontSize:'16px',fontWeight:700,cursor:'pointer',flexShrink:0 }}>
              ⚡ Generate UUID{quantity > 1 ? 's' : ''}
            </button>
          </div>
        </div>

        {/* UUID list */}
        {displayedUuids.length > 0 && (
          <div style={{ marginBottom:'24px' }}>
            <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px' }}>
              <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1px' }}>
                Generated UUID{displayedUuids.length > 1 ? 's' : ''}
              </div>
              <div style={{ display:'flex',gap:'8px' }}>
                <button onClick={handleCopyAll}
                  style={{ background: copiedAll ? '#16A34A' : 'white',color: copiedAll ? 'white' : '#0F2A4A',border:'1.5px solid #e2e8f0',borderRadius:'8px',padding:'7px 16px',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer' }}>
                  {copiedAll ? '✓ Copied All!' : '📋 Copy All'}
                </button>
                <button onClick={handleDownload}
                  style={{ background:'white',color:'#0F2A4A',border:'1.5px solid #e2e8f0',borderRadius:'8px',padding:'7px 16px',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer' }}>
                  ↓ Download .txt
                </button>
              </div>
            </div>
            <div style={{ display:'flex',flexDirection:'column',gap:'8px' }}>
              {displayedUuids.map((uuid, idx) => (
                <div key={idx} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px' }}>
                  <code style={{ fontFamily:'monospace',fontSize:'15px',color:'#0F2A4A',letterSpacing:'0.5px',wordBreak:'break-all' }}>{uuid}</code>
                  <button onClick={()=>handleCopyOne(idx)}
                    style={{ background: copiedIndex===idx ? '#16A34A' : '#E85D04',color:'white',border:'none',borderRadius:'7px',padding:'6px 14px',fontFamily:'inherit',fontSize:'12px',fontWeight:700,cursor:'pointer',flexShrink:0 }}>
                    {copiedIndex===idx ? '✓' : '📋'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Format display */}
        <div style={{ background:'#EDE9FE',border:'1.5px solid #C4B5FD',borderRadius:'12px',padding:'14px 18px',marginBottom:'32px' }}>
          <div style={{ fontSize:'12px',fontWeight:700,color:'#5B21B6',marginBottom:'6px' }}>UUID v4 Format</div>
          <code style={{ fontFamily:'monospace',fontSize:'14px',color:'#4C1D95',letterSpacing:'1px' }}>
            xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
          </code>
          <div style={{ fontSize:'12px',color:'#6D28D9',marginTop:'6px' }}>32 hex digits · 4 hyphens · version 4 (random) · 122 bits of entropy</div>
        </div>

        {/* Info cards */}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'16px' }}>
          {[
            { title:'What is a UUID?', body:'A UUID (Universally Unique Identifier) is a 128-bit label used to uniquely identify information in computer systems. UUID v4 uses random generation for maximum uniqueness.' },
            { title:'Use Cases', body:'Database primary keys · Session IDs · File names · API keys · Distributed systems · Request tracking · Feature flags · Transaction IDs' },
            { title:'Cryptographically Random', body:'This tool uses the Web Crypto API (crypto.randomUUID) for cryptographically secure random generation — the same standard used by browsers and servers.' },
          ].map(card => (
            <div key={card.title} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'14px',padding:'20px' }}>
              <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>{card.title}</div>
              <div style={{ fontSize:'13px',color:'#64748b',lineHeight:1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

      </div>

      <RelatedTools currentPath="/uuid-generator" />
      <FOOTER />
    </div>
  )
}
