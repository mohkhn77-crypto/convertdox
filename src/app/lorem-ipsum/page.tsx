/*
  ConvertDox — Lorem Ipsum Generator
  PUT IN: src/app/lorem-ipsum/page.tsx
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

const WORDS = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat','duis','aute','irure','reprehenderit','voluptate','velit','esse','cillum','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident','sunt','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum','perspiciatis','unde','omnis','iste','natus','error','accusantium','doloremque','laudantium','totam','rem','aperiam','eaque','ipsa','quae','ab','illo','inventore','veritatis','quasi','architecto','beatae','vitae','dicta','explicabo']

const randWord = () => WORDS[Math.floor(Math.random() * WORDS.length)]
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const makeSentence = () => {
  const len = 8 + Math.floor(Math.random() * 10)
  const words = Array.from({ length: len }, randWord)
  return capitalize(words.join(' ')) + '.'
}

const makeParagraph = (startWithLorem: boolean, index: number) => {
  const sentenceCount = 4 + Math.floor(Math.random() * 4)
  const sentences = Array.from({ length: sentenceCount }, (_, i) => {
    if (startWithLorem && index === 0 && i === 0) return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    return makeSentence()
  })
  return sentences.join(' ')
}

export default function LoremIpsumPage() {
  const [type, setType] = useState<'paragraphs'|'sentences'|'words'>('paragraphs')
  const [amount, setAmount] = useState(3)
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    let result = ''
    if (type === 'paragraphs') {
      result = Array.from({ length: amount }, (_, i) => makeParagraph(startWithLorem, i)).join('\n\n')
    } else if (type === 'sentences') {
      const sentences = Array.from({ length: amount }, (_, i) => {
        if (startWithLorem && i === 0) return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        return makeSentence()
      })
      result = sentences.join(' ')
    } else {
      const words = Array.from({ length: amount }, (_, i) => {
        if (startWithLorem && i === 0) return 'Lorem'
        if (startWithLorem && i === 1) return 'ipsum'
        return randWord()
      })
      result = words.join(' ')
    }
    setOutput(result)
  }

  const copy = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const maxAmount = type === 'paragraphs' ? 20 : type === 'sentences' ? 50 : 200

  return (
    <div style={{ minHeight:'100vh',background:'#fff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NAV/>
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>📄</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>Lorem Ipsum Generator</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Generate placeholder text for your designs and mockups instantly.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'760px',margin:'0 auto',padding:'36px 24px' }}>
        <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'28px',boxShadow:'0 8px 32px rgba(15,42,74,0.07)',marginBottom:'20px' }}>

          {/* Type selector */}
          <div style={{ display:'flex',background:'#f1f5f9',borderRadius:'12px',padding:'4px',marginBottom:'22px' }}>
            {(['paragraphs','sentences','words'] as const).map(t => (
              <button key={t} onClick={() => { setType(t); setAmount(t==='paragraphs'?3:t==='sentences'?5:50) }}
                style={{ flex:1,padding:'9px',borderRadius:'9px',border:'none',background:type===t?'white':'transparent',fontFamily:'inherit',fontSize:'13.5px',fontWeight:700,color:type===t?'#0F2A4A':'#64748b',cursor:'pointer',boxShadow:type===t?'0 2px 6px rgba(0,0,0,0.08)':'none',textTransform:'capitalize',transition:'all 0.2s' }}>
                {t}
              </button>
            ))}
          </div>

          {/* Amount slider */}
          <div style={{ marginBottom:'20px' }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px' }}>
              <label style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A' }}>Number of {type}</label>
              <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'22px',fontWeight:800,color:'#E85D04' }}>{amount}</span>
            </div>
            <input type="range" min="1" max={maxAmount} value={amount} onChange={e=>setAmount(parseInt(e.target.value))}
              style={{ width:'100%',accentColor:'#E85D04',height:'6px',cursor:'pointer' }}/>
          </div>

          {/* Start with Lorem option */}
          <label style={{ display:'flex',alignItems:'center',gap:'10px',cursor:'pointer',marginBottom:'24px',padding:'12px 14px',background:'#f8fafc',borderRadius:'10px' }}>
            <div onClick={() => setStartWithLorem(!startWithLorem)} style={{ width:'22px',height:'22px',borderRadius:'6px',border:'2px solid',borderColor:startWithLorem?'#0F2A4A':'#cbd5e1',background:startWithLorem?'#0F2A4A':'white',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0 }}>
              {startWithLorem && <span style={{ color:'white',fontSize:'13px',fontWeight:700 }}>✓</span>}
            </div>
            <div>
              <div style={{ fontSize:'14px',fontWeight:600,color:'#0F2A4A' }}>Start with "Lorem ipsum"</div>
              <div style={{ fontSize:'12px',color:'#94a3b8' }}>Classic lorem ipsum opening</div>
            </div>
          </label>

          <button onClick={generate}
            style={{ width:'100%',background:'#E85D04',color:'white',border:'none',padding:'15px',borderRadius:'12px',fontFamily:'inherit',fontSize:'16px',fontWeight:800,cursor:'pointer',boxShadow:'0 4px 16px rgba(232,93,4,0.25)' }}>
            ✨ Generate Lorem Ipsum
          </button>
        </div>

        {/* Output */}
        {output && (
          <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'16px',overflow:'hidden',boxShadow:'0 4px 20px rgba(15,42,74,0.07)' }}>
            <div style={{ padding:'12px 16px',borderBottom:'1px solid #f1f5f9',background:'#fafafa',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
              <span style={{ fontSize:'13px',fontWeight:600,color:'#0F2A4A' }}>
                Generated text — {output.split(/\s+/).length} words
              </span>
              <button onClick={copy}
                style={{ background:copied?'#16A34A':'#f1f5f9',border:'none',borderRadius:'7px',padding:'6px 14px',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer',color:copied?'white':'#0F2A4A' }}>
                {copied ? '✓ Copied!' : '📋 Copy All'}
              </button>
            </div>
            <div style={{ padding:'20px',fontSize:'15px',lineHeight:'1.8',color:'#0F2A4A',whiteSpace:'pre-wrap' }}>
              {output}
            </div>
          </div>
        )}

        {/* FAQ */}
        <div style={{ marginTop:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',marginBottom:'14px' }}>FAQ</h2>
          {[
            { q:'What is Lorem Ipsum?', a:'Lorem ipsum is placeholder text used in design and publishing. It comes from a scrambled passage of Latin by Cicero, used since the 1500s.' },
            { q:'Why use Lorem Ipsum?', a:'It allows designers to focus on layout and visual design without being distracted by readable content.' },
            { q:'Is it free to use?', a:'Yes, completely free. Generate unlimited placeholder text.' },
          ].map((item,i) => (
            <details key={i} style={{ border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'14px 18px',marginBottom:'8px',background:'white' }}>
              <summary style={{ fontWeight:700,fontSize:'14px',color:'#0F2A4A',cursor:'pointer',listStyle:'none',display:'flex',justifyContent:'space-between' }}>{item.q}<span style={{ color:'#E85D04',fontSize:'20px',fontWeight:300 }}>+</span></summary>
              <p style={{ marginTop:'10px',fontSize:'14px',color:'#64748b',lineHeight:'1.7' }}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      <FOOTER/>
    </div>
  )
}
