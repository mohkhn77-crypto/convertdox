/*
  ConvertDox — Random Number Generator
  PUT IN: src/app/random-number-generator/page.tsx
*/
'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

export default function RandomNumberPage() {
  const [min, setMin] = useState('1')
  const [max, setMax] = useState('100')
  const [count, setCount] = useState(1)
  const [noDupes, setNoDupes] = useState(false)
  const [results, setResults] = useState<number[]>([])
  const [history, setHistory] = useState<number[][]>([])
  const [copied, setCopied] = useState(false)
  const generate = () => {
    const lo = parseInt(min) || 0
    const hi = parseInt(max) || 100
    if (lo >= hi) return
    if (noDupes && count > (hi - lo + 1)) return


    const nums: number[] = []
    const used = new Set<number>()
    while (nums.length < count) {
      const n = Math.floor(Math.random() * (hi - lo + 1)) + lo
      if (!noDupes || !used.has(n)) { nums.push(n); used.add(n) }
    }
    setResults(nums)
    setHistory(prev => [nums, ...prev.slice(0, 9)])
  }

  const copy = () => {
    navigator.clipboard.writeText(results.join(', '))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const inp = (label: string, val: string, set: (v:string)=>void, ph: string) => (
    <div>
      <label style={{ display:'block',fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>{label}</label>
      <input type="number" value={val} onChange={e=>set(e.target.value)} placeholder={ph}
        style={{ width:'100%',padding:'14px 16px',border:'1.5px solid #e2e8f0',borderRadius:'12px',fontFamily:'inherit',fontSize:'18px',fontWeight:700,color:'#0F2A4A',outline:'none',textAlign:'center' }}/>
    </div>
  )

  const presets = [
    { label:'1–6 (Dice)', min:'1', max:'6', count:1 },
    { label:'1–10', min:'1', max:'10', count:1 },
    { label:'1–100', min:'1', max:'100', count:1 },
    { label:'Lottery (6 from 49)', min:'1', max:'49', count:6 },
    { label:'1–1000', min:'1', max:'1000', count:1 },
    { label:'Coin (0 or 1)', min:'0', max:'1', count:1 },
  ]

  return (
    <div style={{ minHeight:'100vh',background:'#fff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <TrustStrip />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>🎲</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>Random Number Generator</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Generate truly random numbers in any range. Single or multiple, no duplicates option.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'680px',margin:'0 auto',padding:'36px 24px' }}>

        {/* Quick presets */}
        <div style={{ marginBottom:'24px' }}>
          <div style={{ fontSize:'13px',fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'10px' }}>Quick presets</div>
          <div style={{ display:'flex',gap:'8px',flexWrap:'wrap' }}>
            {presets.map(p => (
              <button key={p.label} onClick={() => { setMin(p.min); setMax(p.max); setCount(p.count) }}
                style={{ padding:'7px 14px',borderRadius:'8px',border:'1.5px solid #e2e8f0',background:'white',fontFamily:'inherit',fontSize:'13px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'28px',boxShadow:'0 8px 32px rgba(15,42,74,0.07)',marginBottom:'20px' }}>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'20px' }}>
            {inp('Minimum', min, setMin, '1')}
            {inp('Maximum', max, setMax, '100')}
          </div>

          <div style={{ marginBottom:'20px' }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px' }}>
              <label style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A' }}>How many numbers?</label>
              <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:800,color:'#E85D04' }}>{count}</span>
            </div>
            <input type="range" min="1" max="20" value={count} onChange={e=>setCount(parseInt(e.target.value))}
              style={{ width:'100%',accentColor:'#E85D04',height:'6px',cursor:'pointer' }}/>
            <div style={{ display:'flex',justifyContent:'space-between',fontSize:'11.5px',color:'#94a3b8',marginTop:'4px' }}>
              <span>1</span><span>20</span>
            </div>
          </div>

          <label style={{ display:'flex',alignItems:'center',gap:'10px',cursor:'pointer',marginBottom:'24px',padding:'10px 14px',background:'#f8fafc',borderRadius:'10px' }}>
            <div onClick={() => setNoDupes(!noDupes)} style={{ width:'22px',height:'22px',borderRadius:'6px',border:'2px solid',borderColor:noDupes?'#0F2A4A':'#cbd5e1',background:noDupes?'#0F2A4A':'white',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0 }}>
              {noDupes && <span style={{ color:'white',fontSize:'13px',fontWeight:700 }}>✓</span>}
            </div>
            <span style={{ fontSize:'14px',fontWeight:600,color:'#0F2A4A' }}>No duplicates</span>
          </label>

          <button onClick={generate}
            style={{ width:'100%',background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',color:'white',border:'none',padding:'16px',borderRadius:'14px',fontFamily:'inherit',fontSize:'16px',fontWeight:800,cursor:'pointer',transition:'all 0.2s' }}>
            🎲 Generate {count > 1 ? `${count} Numbers` : 'Random Number'}
          </button>
        </div>

        {/* Result */}
        {results.length > 0 && (
          <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',borderRadius:'20px',padding:'28px',textAlign:'center',marginBottom:'20px',transition:'all 0.3s' }}>
            <div style={{ fontSize:'13px',color:'rgba(255,255,255,0.5)',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'10px' }}>
              {results.length === 1 ? 'Your Random Number' : `Your ${results.length} Random Numbers`}
            </div>
            {results.length === 1 ? (
              <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(48px,8vw,80px)',fontWeight:800,color:'#F48C42',lineHeight:1 }}>
                {results[0]}
              </div>
            ) : (
              <div style={{ display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'10px',marginBottom:'10px' }}>
                {results.map((n,i) => (
                  <div key={i} style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'28px',fontWeight:800,color:'#F48C42',background:'rgba(255,255,255,0.1)',borderRadius:'10px',padding:'8px 16px' }}>{n}</div>
                ))}
              </div>
            )}
            <button onClick={copy} style={{ marginTop:'14px',background:copied?'#16A34A':'rgba(255,255,255,0.15)',border:'none',borderRadius:'8px',padding:'8px 18px',color:'white',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer' }}>
              {copied ? '✓ Copied!' : '📋 Copy All'}
            </button>
          </div>
        )}

        {/* History */}
        {history.length > 1 && (
          <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'16px',padding:'20px' }}>
            <div style={{ fontSize:'12px',fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'12px' }}>Recent Results</div>
            {history.slice(1).map((nums,i) => (
              <div key={i} onClick={() => navigator.clipboard.writeText(nums.join(', '))}
                style={{ padding:'8px 12px',borderRadius:'8px',cursor:'pointer',background:'#f8fafc',marginBottom:'6px',fontFamily:'monospace',fontSize:'13px',color:'#64748b',display:'flex',justifyContent:'space-between' }}>
                <span>{nums.join(', ')}</span>
                <span style={{ fontSize:'11px',color:'#94a3b8' }}>click to copy</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
