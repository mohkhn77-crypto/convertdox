/*
  ConvertDox — Text Case Converter
  PUT IN: src/app/text-case-converter/page.tsx
  URL: localhost:3000/text-case-converter
*/
'use client'
import { useState } from 'react'

const NAV = () => (
  <nav style={{ position:'sticky',top:0,zIndex:100,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',borderBottom:'1px solid #e2e8f0',boxShadow:'0 1px 8px rgba(15,42,74,0.06)' }}>
    <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'0 24px',height:'62px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
      <a href="/" style={{ textDecoration:'none',display:'flex',alignItems:'center',gap:'9px' }}>
        <div style={{ width:'44px',height:'44px',background:'#0F2A4A',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}><svg width="28" height="28" viewBox="0 0 44 44" fill="none"><rect x="6" y="10" width="13" height="17" rx="2" fill="white" opacity="0.95"/><rect x="7" y="14" width="7" height="1.5" rx="0.75" fill="#0F2A4A" opacity="0.35"/><rect x="7" y="17" width="5" height="1.5" rx="0.75" fill="#0F2A4A" opacity="0.35"/><rect x="7" y="20" width="6" height="1.5" rx="0.75" fill="#0F2A4A" opacity="0.35"/><rect x="25" y="17" width="13" height="17" rx="2" fill="#E85D04"/><rect x="26" y="21" width="7" height="1.5" rx="0.75" fill="white" opacity="0.5"/><rect x="26" y="24" width="5" height="1.5" rx="0.75" fill="white" opacity="0.5"/><rect x="26" y="27" width="6" height="1.5" rx="0.75" fill="white" opacity="0.5"/><path d="M20 22h4M21 20l3 2-3 2" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
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

export default function TextCaseConverterPage() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState('')

  const convert = {
    upper:     (t:string) => t.toUpperCase(),
    lower:     (t:string) => t.toLowerCase(),
    title:     (t:string) => t.toLowerCase().replace(/(?:^|\s)\S/g,c=>c.toUpperCase()),
    sentence:  (t:string) => t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g,c=>c.toUpperCase()),
    camel:     (t:string) => t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g,(_,c)=>c.toUpperCase()),
    snake:     (t:string) => t.toLowerCase().trim().replace(/\s+/g,'_').replace(/[^a-z0-9_]/g,''),
    kebab:     (t:string) => t.toLowerCase().trim().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,''),
    alternate: (t:string) => t.split('').map((c,i)=>i%2===0?c.toLowerCase():c.toUpperCase()).join(''),
  }

  const cases = [
    { id:'upper',     icon:'🔠', label:'UPPER CASE',       example:'HELLO WORLD',   desc:'ALL CAPS · for headings and emphasis' },
    { id:'lower',     icon:'🔡', label:'lower case',       example:'hello world',   desc:'all lowercase · for code and URLs' },
    { id:'title',     icon:'📖', label:'Title Case',       example:'Hello World',   desc:'Each Word Capitalised · for titles' },
    { id:'sentence',  icon:'📝', label:'Sentence case',    example:'Hello world.',  desc:'Normal punctuation · for paragraphs' },
    { id:'camel',     icon:'🐪', label:'camelCase',         example:'helloWorld',    desc:'JavaScript variables & functions' },
    { id:'snake',     icon:'🐍', label:'snake_case',        example:'hello_world',   desc:'Python and database column names' },
    { id:'kebab',     icon:'🍢', label:'kebab-case',        example:'hello-world',   desc:'URLs, CSS classes, file names' },
    { id:'alternate', icon:'〰', label:'aLtErNaTe',         example:'hElLo WoRlD',  desc:'Fun alternating uppercase/lowercase' },
  ] as const

  const copyResult = (id:string, result:string) => {
    navigator.clipboard.writeText(result)
    setCopied(id); setTimeout(()=>setCopied(''),2000)
  }

  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NAV/>
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>🔤</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>Text Case Converter</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Convert text to 8 different cases instantly — UPPER, lower, Title, camelCase, snake_case and more.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'900px',margin:'0 auto',padding:'36px 24px' }}>

        {/* Input */}
        <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'16px',overflow:'hidden',marginBottom:'24px',boxShadow:'0 4px 20px rgba(15,42,74,0.07)' }}>
          <div style={{ padding:'10px 16px',borderBottom:'1px solid #f1f5f9',background:'#fafafa',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
            <span style={{ fontSize:'13.5px',fontWeight:700,color:'#0F2A4A' }}>Your Text</span>
            <button onClick={()=>setText('')} style={{ background:'#FEF2F2',border:'1px solid #FECACA',color:'#DC2626',padding:'5px 12px',borderRadius:'7px',fontFamily:'inherit',fontSize:'12.5px',fontWeight:600,cursor:'pointer' }}>🗑 Clear</button>
          </div>
          <textarea value={text} onChange={e=>setText(e.target.value)}
            placeholder="Type or paste your text here... All 8 cases update instantly below."
            style={{ width:'100%',minHeight:'120px',padding:'18px 20px',border:'none',outline:'none',resize:'vertical',fontFamily:'inherit',fontSize:'15px',color:'#0F2A4A',lineHeight:'1.7',background:'transparent' }}/>
        </div>

        {/* Results grid */}
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px' }}>
          {cases.map(c=>{
            const result = text ? convert[c.id](text) : c.example
            const isCopied = copied===c.id
            return (
              <div key={c.id} style={{ background:'white',border:'2px solid',borderColor:isCopied?'#0F2A4A':'#e2e8f0',borderRadius:'14px',padding:'16px',transition:'all 0.2s',boxShadow:isCopied?'0 4px 16px rgba(15,42,74,0.12)':'0 2px 8px rgba(15,42,74,0.04)' }}>
                <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px' }}>
                  <div style={{ display:'flex',alignItems:'center',gap:'8px' }}>
                    <span style={{ fontSize:'18px' }}>{c.icon}</span>
                    <span style={{ fontSize:'13.5px',fontWeight:700,color:'#0F2A4A' }}>{c.label}</span>
                  </div>
                  <button onClick={()=>copyResult(c.id,result)} style={{ background:isCopied?'#0F2A4A':'#f1f5f9',border:'none',borderRadius:'7px',padding:'5px 12px',fontSize:'12px',fontWeight:600,cursor:'pointer',color:isCopied?'white':'#0F2A4A',transition:'all 0.15s' }}>
                    {isCopied?'✓ Copied':'Copy'}
                  </button>
                </div>
                <div style={{ background:'#f8fafc',borderRadius:'9px',padding:'11px 13px',fontFamily:'monospace',fontSize:'13.5px',color:!text?'#94a3b8':'#0F2A4A',wordBreak:'break-all',minHeight:'42px',border:'1px solid #f1f5f9' }}>
                  {result}
                </div>
                <div style={{ fontSize:'12px',color:'#94a3b8',marginTop:'6px' }}>{c.desc}</div>
              </div>
            )
          })}
        </div>
      </div>
      <FOOTER/>
    </div>
  )
}
