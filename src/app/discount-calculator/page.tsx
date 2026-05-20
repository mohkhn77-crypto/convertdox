/*
  ================================================================
  ConvertDox — Discount Calculator
  PUT IN: src/app/discount-calculator/page.tsx
  ================================================================
*/
'use client'
import { useState } from 'react'

const NAV = () => (
  <nav style={{ position:'sticky',top:0,zIndex:100,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',borderBottom:'1px solid #e2e8f0',boxShadow:'0 1px 8px rgba(15,42,74,0.06)' }}>
    <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'0 24px',height:'62px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
      <a href="/" style={{ textDecoration:'none',display:'flex',alignItems:'center',gap:'9px' }}>
        <div style={{ width:'44px',height:'44px',background:'#0F2A4A',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}><svg width="28" height="28" viewBox="0 0 44 44" fill="none"><rect x="6" y="10" width="13" height="17" rx="2" fill="white" opacity="0.95"/><rect x="7" y="14" width="7" height="1.5" rx="0.75" fill="#0F2A4A" opacity="0.35"/><rect x="7" y="17" width="5" height="1.5" rx="0.75" fill="#0F2A4A" opacity="0.35"/><rect x="7" y="20" width="6" height="1.5" rx="0.75" fill="#0F2A4A" opacity="0.35"/><rect x="25" y="17" width="13" height="17" rx="2" fill="#E85D04"/><rect x="26" y="21" width="7" height="1.5" rx="0.75" fill="white" opacity="0.5"/><rect x="26" y="24" width="5" height="1.5" rx="0.75" fill="white" opacity="0.5"/><rect x="26" y="27" width="6" height="1.5" rx="0.75" fill="white" opacity="0.5"/><path d="M20 22h4M21 20l3 2-3 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
        <span style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'30px',fontWeight:800,color:'#0F2A4A' }}>Convert<span style={{ color:'#E85D04' }}>Dox</span></span>
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

export default function DiscountCalculatorPage() {
  const [original, setOriginal] = useState('')
  const [discount, setDiscount] = useState('')
  const [mode, setMode]         = useState<'pct'|'fixed'>('pct')

  const orig = parseFloat(original)||0
  const disc = parseFloat(discount)||0
  const savings    = mode==='pct' ? orig*(disc/100) : disc
  const finalPrice = Math.max(0, orig-savings)
  const pctSaved   = orig>0 ? (savings/orig)*100 : 0

  const presets = [5,10,15,20,25,30,40,50,60,70]

  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NAV/>
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>🏷</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>Discount Calculator</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Find the sale price, savings amount, and percentage saved instantly.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'600px',margin:'0 auto',padding:'36px 24px' }}>
        <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'32px',boxShadow:'0 8px 32px rgba(15,42,74,0.08)' }}>

          {/* Mode toggle */}
          <div style={{ display:'flex',background:'#f1f5f9',borderRadius:'12px',padding:'4px',marginBottom:'24px' }}>
            {(['pct','fixed'] as const).map(m=>(
              <button key={m} onClick={()=>setMode(m)} style={{ flex:1,padding:'9px',borderRadius:'9px',border:'none',background:mode===m?'white':'transparent',fontFamily:'inherit',fontSize:'14px',fontWeight:700,color:mode===m?'#0F2A4A':'#64748b',cursor:'pointer',boxShadow:mode===m?'0 2px 6px rgba(0,0,0,0.08)':'none',transition:'all 0.2s' }}>
                {m==='pct'?'% Percentage Discount':'$ Fixed Amount Off'}
              </button>
            ))}
          </div>

          {/* Original price */}
          <div style={{ marginBottom:'20px' }}>
            <label style={{ display:'block',fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>Original Price ($)</label>
            <input type="number" value={original} onChange={e=>setOriginal(e.target.value)} placeholder="e.g. 120.00"
              style={{ width:'100%',padding:'14px 16px',border:'1.5px solid #e2e8f0',borderRadius:'12px',fontFamily:'inherit',fontSize:'20px',fontWeight:700,color:'#0F2A4A',outline:'none' }}/>
          </div>

          {/* Discount */}
          <div style={{ marginBottom:'24px' }}>
            <label style={{ display:'block',fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>{mode==='pct'?'Discount Percentage (%)':'Discount Amount ($)'}</label>
            {mode==='pct' && (
              <div style={{ display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'10px' }}>
                {presets.map(p=>(
                  <button key={p} onClick={()=>setDiscount(p.toString())} style={{ padding:'7px 12px',borderRadius:'8px',border:'1.5px solid',borderColor:discount===p.toString()?'#E85D04':'#e2e8f0',background:discount===p.toString()?'#FFF7ED':'white',color:discount===p.toString()?'#E85D04':'#64748b',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer' }}>
                    {p}%
                  </button>
                ))}
              </div>
            )}
            <input type="number" value={discount} onChange={e=>setDiscount(e.target.value)} placeholder={mode==='pct'?'e.g. 25':'e.g. 30.00'}
              style={{ width:'100%',padding:'14px 16px',border:'1.5px solid #e2e8f0',borderRadius:'12px',fontFamily:'inherit',fontSize:'20px',fontWeight:700,color:'#0F2A4A',outline:'none' }}/>
          </div>

          <div style={{ borderTop:'2px dashed #e2e8f0',margin:'0 0 24px' }}/>

          {/* Results */}
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px' }}>
            <div style={{ background:'#FEF2F2',border:'2px solid #FECACA',borderRadius:'14px',padding:'18px',textAlign:'center' }}>
              <div style={{ fontSize:'12.5px',color:'#DC2626',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>You Save</div>
              <div style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'30px',fontWeight:800,color:'#DC2626' }}>${savings.toFixed(2)}</div>
            </div>
            <div style={{ background:'#F0FDF4',border:'2px solid #BBF7D0',borderRadius:'14px',padding:'18px',textAlign:'center' }}>
              <div style={{ fontSize:'12.5px',color:'#16A34A',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>% Saved</div>
              <div style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'30px',fontWeight:800,color:'#16A34A' }}>{pctSaved.toFixed(1)}%</div>
            </div>
            <div style={{ gridColumn:'1/-1',background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',borderRadius:'14px',padding:'20px',textAlign:'center' }}>
              <div style={{ fontSize:'13px',color:'rgba(255,255,255,0.6)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>Final Price</div>
              <div style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'44px',fontWeight:800,color:'#F48C42' }}>${finalPrice.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
      <FOOTER/>
    </div>
  )
}


/*
  ================================================================
  ConvertDox — Random Number Generator
  PUT IN: src/app/random-number-generator/page.tsx
  ================================================================
*/
// 'use client'
// import { useState } from 'react'
// export default function RandomNumberPage() {
//   const [min, setMin] = useState('1')
//   const [max, setMax] = useState('100')
//   const [count, setCount] = useState(1)
//   const [results, setResults] = useState<number[]>([])
//   const [noDupes, setNoDupes] = useState(false)
//
//   const generate = () => {
//     const lo = parseInt(min), hi = parseInt(max)
//     if (lo >= hi) return
//     if (noDupes && count > (hi - lo + 1)) return
//     const nums: number[] = []
//     const used = new Set<number>()
//     while (nums.length < count) {
//       const n = Math.floor(Math.random() * (hi - lo + 1)) + lo
//       if (!noDupes || !used.has(n)) { nums.push(n); used.add(n) }
//     }
//     setResults(nums)
//   }
//   // ... full UI — ask Claude to expand
// }


/*
  ================================================================
  ConvertDox — Lorem Ipsum Generator
  PUT IN: src/app/lorem-ipsum/page.tsx
  ================================================================
*/
// 'use client'
// import { useState } from 'react'
// const WORDS = ['lorem','ipsum','dolor','sit','amet','consectetur',
//   'adipiscing','elit','sed','do','eiusmod','tempor','incididunt',
//   'ut','labore','et','dolore','magna','aliqua','enim','ad','minim',
//   'veniam','quis','nostrud','exercitation','ullamco','laboris','nisi',
//   'aliquip','ex','ea','commodo','consequat','duis','aute','irure',
//   'reprehenderit','voluptate','velit','esse','cillum','fugiat','nulla',
//   'pariatur','excepteur','sint','occaecat','cupidatat','non','proident',
//   'sunt','culpa','qui','officia','deserunt','mollit','anim','id','est']
//
// export default function LoremIpsumPage() {
//   const [type, setType] = useState<'paragraphs'|'words'|'sentences'>('paragraphs')
//   const [amount, setAmount] = useState(3)
//   const [startWithLorem, setStartWithLorem] = useState(true)
//   const [output, setOutput] = useState('')
//
//   const generate = () => {
//     // Build lorem ipsum text based on type + amount
//     // Ask Claude for full implementation
//   }
//   // ... full UI
// }
