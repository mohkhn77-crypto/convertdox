/*
  ConvertDox — Homepage
  PUT IN: src/app/page.tsx
  REPLACE the entire existing file with this code
*/
'use client'
import { useState } from 'react'

const TOOLS = [
  // Text Tools
  { icon:'📝', title:'Word Counter',          desc:'Count words, chars & reading time',    href:'/word-counter',            cat:'text',    searches:'500K' },
  { icon:'🔤', title:'Text Case Converter',   desc:'UPPER, lower, Title, camelCase',       href:'/text-case-converter',     cat:'text',    searches:'800K' },
  // Calculators
  { icon:'🍽', title:'Tip Calculator',        desc:'Split bills and calculate tips',        href:'/tip-calculator',          cat:'calc',    searches:'1.5M' },
  { icon:'⚖️', title:'BMI Calculator',        desc:'Body mass index — metric & imperial',  href:'/bmi-calculator',          cat:'calc',    searches:'3M'   },
  { icon:'%',  title:'Percentage Calculator', desc:'5 types of percentage calculations',   href:'/percentage-calculator',   cat:'calc',    searches:'2M'   },
  { icon:'🎂', title:'Age Calculator',        desc:'Exact age + zodiac sign + next birthday', href:'/age-calculator',       cat:'calc',    searches:'1M'   },
  { icon:'🏷', title:'Discount Calculator',   desc:'Find sale price and savings instantly', href:'/discount-calculator',    cat:'calc',    searches:'800K' },
  // Security
  { icon:'🔑', title:'Password Generator',    desc:'Cryptographically secure passwords',   href:'/password-generator',      cat:'security','800K' },
]

const CATEGORIES = [
  { id:'all',      label:'🔥 All Tools',     color:'#E85D04' },
  { id:'text',     label:'✍ Text Tools',     color:'#0F2A4A' },
  { id:'calc',     label:'🔢 Calculators',   color:'#0F2A4A' },
  { id:'security', label:'🔒 Security',      color:'#0F2A4A' },
  { id:'pdf',      label:'📄 PDF Tools',     color:'#0F2A4A' },
  { id:'image',    label:'🖼 Image Tools',   color:'#0F2A4A' },
  { id:'ai',       label:'🤖 AI Tools',      color:'#0F2A4A' },
  { id:'dev',      label:'💻 Developer',     color:'#0F2A4A' },
  { id:'qr',       label:'📱 QR & Barcode',  color:'#0F2A4A' },
]

const COMING_SOON = [
  { icon:'📱', title:'QR Code Generator',    desc:'URL, WiFi, email QR codes',    searches:'2M'   },
  { icon:'🎨', title:'HEX ↔ RGB Converter',  desc:'Color code converter',          searches:'800K' },
  { icon:'{ }',title:'JSON Formatter',        desc:'Format & validate JSON',        searches:'600K' },
  { icon:'📄', title:'Lorem Ipsum Generator', desc:'Placeholder text generator',    searches:'500K' },
  { icon:'🎲', title:'Random Number Gen',     desc:'Random numbers with ranges',    searches:'2M'   },
  { icon:'📄', title:'PDF to Word',           desc:'Convert PDF to editable Word',  searches:'5M'   },
  { icon:'🖼', title:'Image Compressor',      desc:'Reduce image size instantly',   searches:'3M'   },
  { icon:'✂️', title:'Background Remover',    desc:'AI removes backgrounds',        searches:'4M'   },
]

export default function HomePage() {
  const [activeCat, setActiveCat] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = TOOLS.filter(t => {
    const matchCat  = activeCat === 'all' || t.cat === activeCat
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
                        t.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={{ minHeight:'100vh', background:'#ffffff', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>

      {/* ── Navbar ───────────────────────────────────────────── */}
      <nav style={{ position:'sticky',top:0,zIndex:100,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',borderBottom:'1px solid #e2e8f0',boxShadow:'0 1px 8px rgba(15,42,74,0.06)' }}>
        <div style={{ maxWidth:'1200px',margin:'0 auto',padding:'0 24px',height:'62px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'20px' }}>
          {/* Logo */}
          <a href="/" style={{ textDecoration:'none',display:'flex',alignItems:'center',gap:'9px',flexShrink:0 }}>
            <div style={{ width:'34px',height:'34px',background:'linear-gradient(135deg,#E85D04,#F48C42)',borderRadius:'9px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'17px',boxShadow:'0 2px 8px rgba(232,93,4,0.3)' }}>📄</div>
            <span style={{ fontFamily:'Space Grotesk', system-ui, sans-serif,fontSize:'19px',fontWeight:800,color:'#0F2A4A' }}>Convert<span style={{ color:'#E85D04' }}>Dox</span></span>
          </a>
          {/* Nav links */}
          <div style={{ display:'flex',gap:'2px',flex:1,justifyContent:'center',flexWrap:'wrap' }}>
            {['PDF Tools','Image Tools','AI Tools','Calculators','Text Tools','Dev Tools'].map(item=>(
              <a key={item} href="#tools" style={{ padding:'6px 12px',borderRadius:'7px',fontSize:'13px',fontWeight:500,color:'#64748b',textDecoration:'none' }}>{item}</a>
            ))}
          </div>
          {/* Buttons */}
          <div style={{ display:'flex',gap:'8px',flexShrink:0 }}>
            <button style={{ background:'none',border:'1.5px solid #e2e8f0',padding:'7px 16px',borderRadius:'8px',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer',color:'#0F2A4A' }}>Sign In</button>
            <button style={{ background:'#E85D04',border:'none',padding:'7px 18px',borderRadius:'8px',fontFamily:'inherit',fontSize:'13px',fontWeight:700,cursor:'pointer',color:'white',boxShadow:'0 2px 8px rgba(232,93,4,0.25)' }}>Go Pro 🚀</button>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div style={{ background:'linear-gradient(135deg,#0F2A4A 0%,#1a3a5c 100%)',padding:'72px 24px 64px',textAlign:'center',position:'relative',overflow:'hidden' }}>
        {/* Background decoration */}
        <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse at 30% 50%,rgba(232,93,4,0.1) 0%,transparent 60%),radial-gradient(ellipse at 70% 30%,rgba(91,141,184,0.1) 0%,transparent 60%)',pointerEvents:'none' }}/>

        <div style={{ maxWidth:'800px',margin:'0 auto',position:'relative' }}>
          {/* Badge */}
          <div style={{ display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'999px',padding:'4px 16px',fontSize:'13px',color:'rgba(255,255,255,0.85)',marginBottom:'24px' }}>
            <span style={{ background:'#E85D04',borderRadius:'999px',padding:'1px 8px',fontWeight:700,color:'white',fontSize:'11px' }}>FREE</span>
            200+ Online Tools — No Sign-up Required
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily:'Space Grotesk', system-ui, sans-serif,fontSize:'clamp(32px,5vw,58px)',fontWeight:800,color:'white',lineHeight:1.15,letterSpacing:'-0.5px',marginBottom:'18px' }}>
            Every Online Tool<br/>
            You Need —{' '}
            <span style={{ color:'#F48C42' }}>In One Place</span>
          </h1>

          <p style={{ fontSize:'clamp(15px,2vw,18px)',color:'rgba(255,255,255,0.7)',maxWidth:'560px',margin:'0 auto 40px',lineHeight:1.7 }}>
            PDF, Image, AI, Calculators, Text, QR Code, Developer tools and 200+ more.
            Free. Fast. No installation needed.
          </p>

          {/* Search bar */}
          <div style={{ maxWidth:'520px',margin:'0 auto 36px',position:'relative' }}>
            <span style={{ position:'absolute',left:'16px',top:'50%',transform:'translateY(-50%)',fontSize:'18px',opacity:0.5 }}>🔍</span>
            <input
              type="text"
              value={search}
              onChange={e=>setSearch(e.target.value)}
              placeholder="Search tools — PDF to Word, BMI Calculator, QR Code..."
              style={{ width:'100%',padding:'16px 20px 16px 48px',borderRadius:'14px',border:'1px solid rgba(255,255,255,0.2)',background:'rgba(255,255,255,0.12)',fontFamily:'inherit',fontSize:'15px',color:'white',outline:'none',backdropFilter:'blur(8px)',transition:'all 0.2s' }}
            />
          </div>

          {/* Quick links */}
          <div style={{ display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'8px' }}>
            {[{label:'📝 Word Counter',href:'/word-counter'},{label:'⚖️ BMI Calculator',href:'/bmi-calculator'},{label:'🍽 Tip Calculator',href:'/tip-calculator'},{label:'🔑 Password Generator',href:'/password-generator'},{label:'% Percentage Calc',href:'/percentage-calculator'},{label:'🎂 Age Calculator',href:'/age-calculator'}].map(item=>(
              <a key={item.href} href={item.href} style={{ background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'999px',padding:'7px 16px',fontSize:'13px',color:'rgba(255,255,255,0.9)',textDecoration:'none',transition:'all 0.2s',backdropFilter:'blur(4px)' }}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats bar ────────────────────────────────────────── */}
      <div style={{ background:'#0a1f38',padding:'16px 24px' }}>
        <div style={{ maxWidth:'1200px',margin:'0 auto',display:'flex',justifyContent:'center',gap:'48px',flexWrap:'wrap' }}>
          {[{num:'200+',label:'Free Tools'},{num:'0',label:'Sign-up Required'},{num:'100%',label:'Free to Use'},{num:'∞',label:'No Limits'}].map(s=>(
            <div key={s.label} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'Space Grotesk', system-ui, sans-serif,fontSize:'22px',fontWeight:800,color:'#F48C42' }}>{s.num}</div>
              <div style={{ fontSize:'12px',color:'rgba(255,255,255,0.5)',marginTop:'2px',textTransform:'uppercase',letterSpacing:'0.5px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tools Section ────────────────────────────────────── */}
      <div id="tools" style={{ maxWidth:'1200px',margin:'0 auto',padding:'56px 24px' }}>

        {/* Section header */}
        <div style={{ marginBottom:'32px' }}>
          <div style={{ fontSize:'12.5px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'6px' }}>All Categories</div>
          <h2 style={{ fontFamily:'Space Grotesk', system-ui, sans-serif,fontSize:'clamp(24px,3vw,34px)',fontWeight:800,color:'#0F2A4A',margin:'0 0 8px',letterSpacing:'-0.3px' }}>Free Online Tools</h2>
          <p style={{ fontSize:'15px',color:'#64748b',margin:0 }}>Everything you need in one place. No installation. Works instantly in your browser.</p>
        </div>

        {/* Category tabs */}
        <div style={{ display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'28px' }}>
          {CATEGORIES.map(cat=>(
            <button key={cat.id} onClick={()=>setActiveCat(cat.id)} style={{ padding:'8px 16px',borderRadius:'999px',border:'1.5px solid',borderColor:activeCat===cat.id?'#0F2A4A':'#e2e8f0',background:activeCat===cat.id?'#0F2A4A':'white',color:activeCat===cat.id?'white':'#64748b',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer',transition:'all 0.15s',whiteSpace:'nowrap' }}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tool grid */}
        {filtered.length > 0 ? (
          <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'14px',marginBottom:'16px' }}>
            {filtered.map(tool=>(
              <a key={tool.href} href={tool.href} style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'16px',padding:'20px',textDecoration:'none',display:'flex',flexDirection:'column',gap:'10px',transition:'all 0.2s',boxShadow:'0 2px 8px rgba(15,42,74,0.04)',cursor:'pointer' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='#E85D04';(e.currentTarget as HTMLElement).style.transform='translateY(-3px)';(e.currentTarget as HTMLElement).style.boxShadow='0 8px 24px rgba(15,42,74,0.1)'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='#e2e8f0';(e.currentTarget as HTMLElement).style.transform='translateY(0)';(e.currentTarget as HTMLElement).style.boxShadow='0 2px 8px rgba(15,42,74,0.04)'}}>
                <div style={{ width:'44px',height:'44px',background:'#FFF7ED',borderRadius:'11px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',flexShrink:0 }}>{tool.icon}</div>
                <div>
                  <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'4px' }}>{tool.title}</div>
                  <div style={{ fontSize:'12.5px',color:'#94a3b8',lineHeight:'1.4' }}>{tool.desc}</div>
                </div>
                <div style={{ marginTop:'auto',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
                  <span style={{ fontSize:'11.5px',fontWeight:600,color:'#E85D04',background:'#FFF7ED',padding:'3px 10px',borderRadius:'999px' }}>Open Tool →</span>
                  <span style={{ fontSize:'11px',color:'#cbd5e1' }}>{tool.searches}/mo</span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div style={{ textAlign:'center',padding:'48px 24px',color:'#94a3b8' }}>
            <div style={{ fontSize:'36px',marginBottom:'10px' }}>🔍</div>
            <p>No tools found for "{search}" — try a different search</p>
          </div>
        )}

        {/* Coming Soon */}
        <div style={{ marginTop:'48px' }}>
          <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px' }}>
            <h2 style={{ fontFamily:'Space Grotesk', system-ui, sans-serif,fontSize:'22px',fontWeight:800,color:'#0F2A4A',margin:0 }}>Coming Soon</h2>
            <span style={{ background:'#FFF7ED',border:'1.5px solid #FED7AA',color:'#C2410C',fontSize:'12px',fontWeight:700,padding:'3px 10px',borderRadius:'999px' }}>Building now</span>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'14px' }}>
            {COMING_SOON.map(tool=>(
              <div key={tool.title} style={{ background:'#f8fafc',border:'1.5px dashed #e2e8f0',borderRadius:'16px',padding:'20px',opacity:0.7 }}>
                <div style={{ width:'44px',height:'44px',background:'#f1f5f9',borderRadius:'11px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',marginBottom:'10px' }}>{tool.icon}</div>
                <div style={{ fontSize:'14px',fontWeight:700,color:'#94a3b8',marginBottom:'4px' }}>{tool.title}</div>
                <div style={{ fontSize:'12px',color:'#cbd5e1' }}>{tool.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Why ConvertDox ───────────────────────────────────── */}
      <div style={{ background:'#f8fafc',padding:'56px 24px',borderTop:'1px solid #e2e8f0' }}>
        <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
          <div style={{ textAlign:'center',marginBottom:'40px' }}>
            <h2 style={{ fontFamily:'Space Grotesk', system-ui, sans-serif,fontSize:'clamp(22px,3vw,32px)',fontWeight:800,color:'#0F2A4A',marginBottom:'10px' }}>Why ConvertDox?</h2>
            <p style={{ fontSize:'16px',color:'#64748b' }}>Built for speed, privacy, and simplicity</p>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px' }}>
            {[
              { icon:'⚡',title:'Instant Results',     desc:'All tools work in real time — no waiting, no loading screens. Results appear as you type.' },
              { icon:'🔒',title:'100% Private',         desc:'Your files and text stay in your browser. Nothing is uploaded to any server unless required.' },
              { icon:'🆓',title:'Always Free',          desc:'Core tools are free forever. No credit card, no sign-up, no hidden fees ever.' },
              { icon:'📱',title:'Works Everywhere',     desc:'Fully responsive — works perfectly on phone, tablet, and desktop.' },
              { icon:'⚙️',title:'200+ Tools',           desc:'PDF, Image, AI, Text, Calculators, QR, Security tools — all in one place.' },
              { icon:'🚀',title:'No Installation',      desc:'Open your browser, use the tool. That\'s it. No apps to download or install.' },
            ].map(f=>(
              <div key={f.title} style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'16px',padding:'24px',boxShadow:'0 2px 8px rgba(15,42,74,0.04)' }}>
                <div style={{ fontSize:'28px',marginBottom:'12px' }}>{f.icon}</div>
                <div style={{ fontSize:'15px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>{f.title}</div>
                <div style={{ fontSize:'13.5px',color:'#64748b',lineHeight:'1.6' }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer style={{ background:'#0F2A4A',padding:'48px 24px 28px' }}>
        <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
          <div style={{ display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:'40px',marginBottom:'40px' }}>
            <div>
              <div style={{ display:'flex',alignItems:'center',gap:'8px',marginBottom:'14px' }}>
                <div style={{ width:'30px',height:'30px',background:'#E85D04',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'15px' }}>📄</div>
                <span style={{ fontFamily:'Space Grotesk', system-ui, sans-serif,fontSize:'18px',fontWeight:800,color:'white' }}>Convert<span style={{ color:'#F48C42' }}>Dox</span></span>
              </div>
              <p style={{ fontSize:'13.5px',color:'rgba(255,255,255,0.45)',lineHeight:'1.7',maxWidth:'260px',margin:0 }}>Every online tool you need in one place. Free, fast, and private. Built for everyone.</p>
            </div>
            {[
              { title:'Tools', links:['Word Counter','BMI Calculator','Tip Calculator','Password Generator','Age Calculator','Percentage Calc'] },
              { title:'Categories', links:['PDF Tools','Image Tools','AI Tools','Calculators','Text Tools','Dev Tools'] },
              { title:'Company', links:['About','Privacy Policy','Terms of Use','Contact','Blog'] },
            ].map(col=>(
              <div key={col.title}>
                <div style={{ fontSize:'12px',fontWeight:700,color:'rgba(255,255,255,0.5)',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'14px' }}>{col.title}</div>
                {col.links.map(link=>(
                  <a key={link} href="#" style={{ display:'block',fontSize:'13.5px',color:'rgba(255,255,255,0.45)',textDecoration:'none',marginBottom:'8px' }}>{link}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px' }}>
            <p style={{ fontSize:'13px',color:'rgba(255,255,255,0.3)',margin:0 }}>© 2025 ConvertDox — Every Online Tool You Need</p>
            <div style={{ display:'flex',gap:'20px' }}>
              {['Privacy','Terms','Contact'].map(l=><a key={l} href="#" style={{ fontSize:'13px',color:'rgba(255,255,255,0.3)',textDecoration:'none' }}>{l}</a>)}
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
