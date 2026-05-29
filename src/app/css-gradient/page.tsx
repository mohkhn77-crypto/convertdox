/*
  ConvertDox — CSS Gradient Generator
  PUT IN: src/app/css-gradient/page.tsx
*/
'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import RelatedTools from '@/components/RelatedTools'

const PRESETS = [
  { name:'Sunset', c1:'#ff6b6b', c2:'#feca57' },
  { name:'Ocean', c1:'#0F2A4A', c2:'#00b4d8' },
  { name:'Forest', c1:'#134e5e', c2:'#71b280' },
  { name:'Fire', c1:'#E85D04', c2:'#f9c74f' },
  { name:'Purple', c1:'#7c3aed', c2:'#c4b5fd' },
  { name:'Pink', c1:'#ec4899', c2:'#f9a8d4' },
  { name:'Midnight', c1:'#0f0c29', c2:'#302b63' },
  { name:'Mint', c1:'#0F2A4A', c2:'#52c234' },
]

export default function CSSGradientPage() {
  const [type, setType] = useState<'linear'|'radial'>('linear')
  const [angle, setAngle] = useState(135)
  const [color1, setColor1] = useState('#0F2A4A')
  const [color2, setColor2] = useState('#E85D04')
  const [color3, setColor3] = useState('')
  const [use3Colors, setUse3Colors] = useState(false)
  const [copied, setCopied] = useState(false)

  const gradientCSS = type === 'linear'
    ? `linear-gradient(${angle}deg, ${color1}, ${use3Colors && color3 ? `${color2}, ${color3}` : color2})`
    : `radial-gradient(circle, ${color1}, ${use3Colors && color3 ? `${color2}, ${color3}` : color2})`

  const fullCSS = `background: ${gradientCSS};`

  const copy = () => {
    navigator.clipboard.writeText(fullCSS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ minHeight:'100vh',background:'#fff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <TrustStrip />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>🌈</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>CSS Gradient Generator</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Create beautiful CSS gradients visually and copy the code instantly.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'900px',margin:'0 auto',padding:'36px 24px' }}>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 340px',gap:'24px',alignItems:'start' }}>

          {/* Controls */}
          <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'24px',boxShadow:'0 4px 20px rgba(15,42,74,0.07)' }}>

            {/* Type */}
            <div style={{ marginBottom:'20px' }}>
              <label style={{ display:'block',fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>Gradient Type</label>
              <div style={{ display:'flex',background:'#f1f5f9',borderRadius:'10px',padding:'3px' }}>
                {(['linear','radial'] as const).map(t => (
                  <button key={t} onClick={() => setType(t)}
                    style={{ flex:1,padding:'8px',borderRadius:'8px',border:'none',background:type===t?'white':'transparent',fontFamily:'inherit',fontSize:'13.5px',fontWeight:700,color:type===t?'#0F2A4A':'#64748b',cursor:'pointer',textTransform:'capitalize',boxShadow:type===t?'0 2px 6px rgba(0,0,0,0.08)':'none' }}>
                    {t === 'linear' ? '↗ Linear' : '◎ Radial'}
                  </button>
                ))}
              </div>
            </div>

            {/* Angle (linear only) */}
            {type === 'linear' && (
              <div style={{ marginBottom:'20px' }}>
                <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px' }}>
                  <label style={{ fontSize:'13.5px',fontWeight:700,color:'#0F2A4A' }}>Direction</label>
                  <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'18px',fontWeight:800,color:'#E85D04' }}>{angle}°</span>
                </div>
                <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(parseInt(e.target.value))}
                  style={{ width:'100%',accentColor:'#E85D04',height:'6px',cursor:'pointer' }}/>
                <div style={{ display:'flex',justifyContent:'space-between',fontSize:'11px',color:'#94a3b8',marginTop:'4px' }}>
                  <span>0° (↑)</span><span>90° (→)</span><span>180° (↓)</span><span>270° (←)</span><span>360°</span>
                </div>
              </div>
            )}

            {/* Colors */}
            <div style={{ marginBottom:'16px' }}>
              <label style={{ display:'block',fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'10px' }}>Colours</label>
              <div style={{ display:'flex',flexDirection:'column',gap:'10px' }}>
                {[{label:'Start Colour',val:color1,set:setColor1},{label:'End Colour',val:color2,set:setColor2}].map(c => (
                  <div key={c.label} style={{ display:'flex',alignItems:'center',gap:'10px' }}>
                    <input type="color" value={c.val} onChange={e => c.set(e.target.value)}
                      style={{ width:'44px',height:'44px',border:'none',borderRadius:'8px',cursor:'pointer',flexShrink:0 }}/>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:'12px',color:'#64748b',marginBottom:'3px' }}>{c.label}</div>
                      <input type="text" value={c.val} onChange={e => c.set(e.target.value)}
                        style={{ width:'100%',padding:'7px 10px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontFamily:'monospace',fontSize:'13px',color:'#0F2A4A',outline:'none' }}/>
                    </div>
                  </div>
                ))}

                {use3Colors && (
                  <div style={{ display:'flex',alignItems:'center',gap:'10px' }}>
                    <input type="color" value={color3||'#ffffff'} onChange={e => setColor3(e.target.value)}
                      style={{ width:'44px',height:'44px',border:'none',borderRadius:'8px',cursor:'pointer',flexShrink:0 }}/>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:'12px',color:'#64748b',marginBottom:'3px' }}>Middle Colour</div>
                      <input type="text" value={color3} onChange={e => setColor3(e.target.value)}
                        style={{ width:'100%',padding:'7px 10px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontFamily:'monospace',fontSize:'13px',color:'#0F2A4A',outline:'none' }}/>
                    </div>
                  </div>
                )}
              </div>

              <button onClick={() => setUse3Colors(!use3Colors)}
                style={{ marginTop:'10px',background:'#f1f5f9',border:'1.5px solid #e2e8f0',borderRadius:'8px',padding:'7px 14px',fontFamily:'inherit',fontSize:'12.5px',fontWeight:600,cursor:'pointer',color:'#0F2A4A' }}>
                {use3Colors ? '− Remove middle colour' : '+ Add middle colour'}
              </button>
            </div>

            {/* Presets */}
            <div>
              <label style={{ display:'block',fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'10px' }}>Presets</label>
              <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'6px' }}>
                {PRESETS.map(p => (
                  <button key={p.name} onClick={() => { setColor1(p.c1); setColor2(p.c2); setUse3Colors(false) }}
                    style={{ height:'36px',borderRadius:'8px',border:'2px solid transparent',cursor:'pointer',background:`linear-gradient(135deg, ${p.c1}, ${p.c2})`,position:'relative',overflow:'hidden',transition:'all 0.15s' }}
                    title={p.name}>
                    <span style={{ position:'absolute',bottom:'2px',left:0,right:0,textAlign:'center',fontSize:'9px',color:'white',fontWeight:700,textShadow:'0 1px 2px rgba(0,0,0,0.5)' }}>{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div style={{ position:'sticky',top:'80px' }}>
            {/* Gradient preview */}
            <div style={{ height:'200px',borderRadius:'16px',marginBottom:'16px',boxShadow:'0 8px 32px rgba(0,0,0,0.15)',background:gradientCSS,transition:'background 0.2s' }}/>

            {/* CSS code */}
            <div style={{ background:'#0F2A4A',borderRadius:'14px',padding:'16px',marginBottom:'12px' }}>
              <div style={{ fontSize:'11px',color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'8px' }}>CSS Code</div>
              <div style={{ fontFamily:'monospace',fontSize:'12.5px',color:'#7DD3FC',lineHeight:'1.6',wordBreak:'break-all' }}>
                {fullCSS}
              </div>
            </div>

            <button onClick={copy}
              style={{ width:'100%',background:copied?'#16A34A':'#E85D04',color:'white',border:'none',padding:'13px',borderRadius:'12px',fontFamily:'inherit',fontSize:'15px',fontWeight:700,cursor:'pointer',transition:'all 0.15s' }}>
              {copied ? '✓ Copied to Clipboard!' : '📋 Copy CSS Code'}
            </button>

            {/* Also show as individual properties */}
            <div style={{ marginTop:'12px',background:'white',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'14px' }}>
              <div style={{ fontSize:'12px',fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'8px' }}>Also valid as</div>
              <div style={{ fontFamily:'monospace',fontSize:'12px',color:'#64748b',lineHeight:'1.8' }}>
                <div>background-image: {gradientCSS};</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedTools currentPath="/css-gradient" />
    </div>
  )
}
