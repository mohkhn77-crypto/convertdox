'use client'
import Link from 'next/link'
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

const ROMAN_MAP: [number, string][] = [
  [1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],
  [100,'C'],[90,'XC'],[50,'L'],[40,'XL'],
  [10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']
]

function toRoman(n: number): { result: string, breakdown: string } {
  let num = n, result = ''
  const parts: string[] = []
  for (const [val, sym] of ROMAN_MAP) {
    while (num >= val) { result += sym; parts.push(`${sym} (${val})`); num -= val }
  }
  return { result, breakdown: parts.join(' + ') + ' = ' + result }
}

function fromRoman(s: string): number {
  const map: Record<string,number> = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000}
  const upper = s.toUpperCase().trim()
  if (!upper) return -1
  let total = 0
  for (let i = 0; i < upper.length; i++) {
    const cur = map[upper[i]], next = map[upper[i+1]]
    if (cur === undefined) return -1
    total += next > cur ? -cur : cur
  }
  return total
}

const EXAMPLES = [
  {n:4,r:'IV'},{n:9,r:'IX'},{n:14,r:'XIV'},{n:40,r:'XL'},
  {n:90,r:'XC'},{n:400,r:'CD'},{n:900,r:'CM'},{n:1000,r:'M'},
  {n:1999,r:'MCMXCIX'},{n:2024,r:'MMXXIV'},
]

const REF_TABLE = [
  {sym:'I',val:1},{sym:'V',val:5},{sym:'X',val:10},{sym:'L',val:50},
  {sym:'C',val:100},{sym:'D',val:500},{sym:'M',val:1000},
]

export default function RomanNumeralsPage() {
  const [mode, setMode] = useState<'toRoman'|'fromRoman'>('toRoman')
  const [numInput, setNumInput] = useState('')
  const [romanInput, setRomanInput] = useState('')
  const [copied, setCopied] = useState(false)

  // Number → Roman
  const numVal = parseInt(numInput, 10)
  const numValid = !isNaN(numVal) && numVal >= 1 && numVal <= 3999
  const romanResult = numInput && !isNaN(numVal) ? (numValid ? toRoman(numVal) : null) : null

  // Roman → Number
  const arabicResult = romanInput.trim() ? fromRoman(romanInput) : null
  const arabicValid = arabicResult !== null && arabicResult > 0

  const resultText = mode === 'toRoman'
    ? (romanResult?.result ?? '')
    : (arabicValid ? String(arabicResult) : '')

  const handleCopy = () => {
    if (!resultText) return
    navigator.clipboard.writeText(resultText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExample = (ex: { n: number, r: string }) => {
    if (mode === 'toRoman') setNumInput(String(ex.n))
    else setRomanInput(ex.r)
  }

  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NAV />

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>
            🏛
          </div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>Roman Numeral Converter</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Convert numbers to Roman numerals and back — instantly</p>
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

        {/* Mode toggle */}
        <div style={{ display:'inline-flex',borderRadius:'12px',border:'1.5px solid #e2e8f0',overflow:'hidden',marginBottom:'28px' }}>
          {[{id:'toRoman' as const,label:'Number → Roman'},{id:'fromRoman' as const,label:'Roman → Number'}].map(m=>(
            <button key={m.id} onClick={()=>setMode(m.id)}
              style={{ padding:'11px 24px',border:'none',background:mode===m.id?'#0F2A4A':'white',color:mode===m.id?'white':'#64748b',fontFamily:'inherit',fontSize:'14px',fontWeight:700,cursor:'pointer',transition:'all 0.15s' }}>
              {m.label}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',alignItems:'start',marginBottom:'24px' }}>
          <div>
            <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'8px' }}>
              {mode === 'toRoman' ? 'Enter a Number (1–3999)' : 'Enter Roman Numeral'}
            </div>
            {mode === 'toRoman' ? (
              <input
                type="number"
                value={numInput}
                onChange={e=>setNumInput(e.target.value)}
                placeholder="e.g. 2024"
                min={1} max={3999}
                style={{ border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'12px 16px',fontFamily:'inherit',fontSize:'28px',fontWeight:700,outline:'none',width:'100%',boxSizing:'border-box',color:'#0F2A4A' }}
              />
            ) : (
              <input
                type="text"
                value={romanInput}
                onChange={e=>setRomanInput(e.target.value.toUpperCase())}
                placeholder="e.g. MMXXIV"
                style={{ border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'12px 16px',fontFamily:'inherit',fontSize:'28px',fontWeight:700,outline:'none',width:'100%',boxSizing:'border-box',color:'#0F2A4A',letterSpacing:'2px' }}
              />
            )}
            {/* Error states */}
            {mode === 'toRoman' && numInput && !isNaN(numVal) && !numValid && (
              <div style={{ marginTop:'8px',fontSize:'13px',color:'#DC2626',fontWeight:600 }}>Range: 1–3999</div>
            )}
            {mode === 'fromRoman' && romanInput && !arabicValid && (
              <div style={{ marginTop:'8px',fontSize:'13px',color:'#DC2626',fontWeight:600 }}>Invalid Roman numeral</div>
            )}
          </div>

          {/* Result */}
          <div>
            <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'8px' }}>Result</div>
            <div style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'14px',padding:'20px',minHeight:'80px' }}>
              {resultText ? (
                <>
                  <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,4vw,48px)',fontWeight:800,color:'#0F2A4A',letterSpacing:'2px',marginBottom:'8px' }}>
                    {resultText}
                  </div>
                  {mode === 'toRoman' && romanResult?.breakdown && (
                    <div style={{ fontSize:'13px',color:'#64748b',fontFamily:'monospace',wordBreak:'break-word' }}>
                      {romanResult.breakdown}
                    </div>
                  )}
                  <button onClick={handleCopy} style={{ marginTop:'12px',background: copied ? '#16A34A' : '#E85D04',color:'white',border:'none',borderRadius:'8px',padding:'8px 18px',fontFamily:'inherit',fontSize:'13px',fontWeight:700,cursor:'pointer' }}>
                    {copied ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </>
              ) : (
                <div style={{ color:'#cbd5e1',fontSize:'14px' }}>Result will appear here...</div>
              )}
            </div>
          </div>
        </div>

        {/* Quick examples */}
        <div style={{ marginBottom:'32px' }}>
          <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'10px' }}>Quick Examples</div>
          <div style={{ display:'flex',flexWrap:'wrap',gap:'8px' }}>
            {EXAMPLES.map(ex=>(
              <button key={ex.n} onClick={()=>handleExample(ex)}
                style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'8px',padding:'8px 14px',fontFamily:'inherit',fontSize:'13px',fontWeight:600,color:'#0F2A4A',cursor:'pointer',display:'flex',gap:'6px',alignItems:'center' }}>
                <span style={{ color:'#64748b' }}>{ex.n}</span>
                <span style={{ color:'#E85D04' }}>→</span>
                <span style={{ fontFamily:'monospace',letterSpacing:'1px' }}>{ex.r}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reference table */}
        <div style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'14px',padding:'20px' }}>
          <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'14px' }}>Roman Numeral Reference</div>
          <div style={{ display:'flex',flexWrap:'wrap',gap:'10px' }}>
            {REF_TABLE.map(r=>(
              <div key={r.sym} style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'12px 18px',textAlign:'center',minWidth:'70px' }}>
                <div style={{ fontFamily:'serif',fontSize:'24px',fontWeight:700,color:'#0F2A4A',letterSpacing:'1px' }}>{r.sym}</div>
                <div style={{ fontSize:'13px',fontWeight:600,color:'#E85D04',marginTop:'4px' }}>{r.val.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <FOOTER />
    </div>
  )
}
