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

const ONES = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine',
  'Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen']
const TENS = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety']

function threeDigits(n: number, uk: boolean): string {
  if (n === 0) return ''
  if (n < 20) return ONES[n]
  if (n < 100) return TENS[Math.floor(n/10)] + (n%10 ? '-'+ONES[n%10] : '')
  const rest = n % 100
  const hundred = ONES[Math.floor(n/100)] + ' Hundred'
  if (rest === 0) return hundred
  return hundred + (uk ? ' and ' : ' ') + (rest < 20 ? ONES[rest] : TENS[Math.floor(rest/10)] + (rest%10 ? '-'+ONES[rest%10] : ''))
}

function numberToWords(n: number, uk: boolean): string {
  if (n === 0) return 'Zero'
  const negative = n < 0
  const abs = Math.abs(n)
  const SCALE = ['','Thousand','Million','Billion']
  const groups: string[] = []
  let temp = abs
  while (temp > 0) {
    groups.push(threeDigits(temp % 1000, uk))
    temp = Math.floor(temp / 1000)
  }
  const parts = groups.map((g,i) => g ? g + (SCALE[i] ? ' '+SCALE[i] : '') : '').filter(Boolean).reverse()
  return (negative ? 'Negative ' : '') + parts.join(', ')
}

function convertInput(raw: string, uk: boolean, caseMode: 'title'|'lower'|'upper'): string {
  if (!raw && raw !== '0') return ''
  const trimmed = raw.trim()
  if (trimmed === '' || trimmed === '-') return ''

  // Handle decimal
  const parts = trimmed.split('.')
  if (parts.length > 2) return 'Invalid number'

  const intStr = parts[0]
  const intVal = parseInt(intStr, 10)
  if (isNaN(intVal)) return 'Invalid number'
  if (intVal > 999999999999 || intVal < -999999999999) return 'Number out of range (max ±999,999,999,999)'

  let result = numberToWords(intVal, uk)

  if (parts.length === 2) {
    const decimals = parts[1]
    if (decimals.length > 0) {
      const decWords = decimals.split('').map(d => ONES[parseInt(d)] || 'Zero').join(' ')
      result += ' Point ' + decWords
    }
  }

  if (caseMode === 'lower') return result.toLowerCase()
  if (caseMode === 'upper') return result.toUpperCase()
  return result // Title Case (already Title Case from logic)
}

export default function NumberToWordsPage() {
  const [input, setInput] = useState('')
  const [uk, setUk] = useState(false)
  const [caseMode, setCaseMode] = useState<'title'|'lower'|'upper'>('title')
  const [copied, setCopied] = useState(false)

  const result = convertInput(input, uk, caseMode)

  const handleCopy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const loadExample = (val: string) => setInput(val)

  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NAV />

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>
            🔢
          </div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>Number to Words Converter</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Convert any number into written English words instantly</p>
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

        {/* Options row */}
        <div style={{ display:'flex',flexWrap:'wrap',gap:'16px',marginBottom:'24px',alignItems:'center' }}>
          {/* UK English toggle */}
          <label style={{ display:'flex',alignItems:'center',gap:'8px',cursor:'pointer',fontSize:'14px',fontWeight:600,color:'#0F2A4A' }}>
            <input type="checkbox" checked={uk} onChange={e=>setUk(e.target.checked)}
              style={{ width:'16px',height:'16px',cursor:'pointer',accentColor:'#E85D04' }}/>
            UK English (adds &ldquo;and&rdquo; after hundreds)
          </label>

          {/* Case toggle */}
          <div style={{ display:'flex',gap:'6px' }}>
            {(['title','lower','upper'] as const).map(mode => (
              <button key={mode} onClick={()=>setCaseMode(mode)}
                style={{ padding:'7px 14px',borderRadius:'8px',border:'1.5px solid',borderColor:caseMode===mode?'#0F2A4A':'#e2e8f0',background:caseMode===mode?'#0F2A4A':'white',color:caseMode===mode?'white':'#64748b',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer' }}>
                {mode === 'title' ? 'Title Case' : mode === 'lower' ? 'lowercase' : 'UPPERCASE'}
              </button>
            ))}
          </div>
        </div>

        {/* Examples */}
        <div style={{ display:'flex',flexWrap:'wrap',gap:'8px',marginBottom:'20px',alignItems:'center' }}>
          <span style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1px' }}>Examples:</span>
          {[['100','100'],['1000','1,000'],['1234567','1,234,567'],['1000000000','1,000,000,000'],['3.14','3.14'],['−42','-42']].map(([val,label])=>(
            <button key={val} onClick={()=>loadExample(val.replace('−','-'))}
              style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'8px',padding:'6px 12px',fontFamily:'inherit',fontSize:'13px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>
              {label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{ marginBottom:'20px' }}>
          <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'8px' }}>Enter a Number</div>
          <input
            type="text"
            value={input}
            onChange={e=>setInput(e.target.value)}
            placeholder="e.g. 1234567 or -99.5"
            style={{ border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'12px 16px',fontFamily:'inherit',fontSize:'24px',fontWeight:700,outline:'none',width:'100%',boxSizing:'border-box',color:'#0F2A4A' }}
          />
        </div>

        {/* Output */}
        {result && (
          <div style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'14px',padding:'20px',marginBottom:'20px' }}>
            <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'12px' }}>Result</div>
            <div style={{ fontSize:'clamp(16px,2.5vw,22px)',fontWeight:700,color:'#0F2A4A',lineHeight:1.5,marginBottom:'16px',wordBreak:'break-word' }}>
              {result}
            </div>
            <button onClick={handleCopy}
              style={{ background: copied ? '#16A34A' : '#E85D04',color:'white',border:'none',borderRadius:'10px',padding:'11px 22px',fontFamily:'inherit',fontSize:'14px',fontWeight:700,cursor:'pointer' }}>
              {copied ? '✓ Copied!' : '📋 Copy to Clipboard'}
            </button>
          </div>
        )}

        {!result && input && (
          <div style={{ background:'#FEF2F2',border:'1.5px solid #FECACA',borderRadius:'14px',padding:'16px 20px',color:'#DC2626',fontSize:'14px',fontWeight:600 }}>
            Invalid input — enter a number between -999,999,999,999 and 999,999,999,999
          </div>
        )}

        {/* Info section */}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'16px',marginTop:'40px' }}>
          {[
            { title:'Supported Range', body:'Numbers from -999,999,999,999 to 999,999,999,999 (negative billions to positive billions).' },
            { title:'Decimal Support', body:'Enter decimals like 3.14 and each digit after the point is spelled individually: "Three Point One Four".' },
            { title:'UK English', body:'Enables "and" after hundreds per British convention: "One Hundred and Twenty-Three" instead of "One Hundred Twenty-Three".' },
          ].map(card => (
            <div key={card.title} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'14px',padding:'20px' }}>
              <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>{card.title}</div>
              <div style={{ fontSize:'13px',color:'#64748b',lineHeight:1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

      </div>

      <FOOTER />
    </div>
  )
}
