'use client'
import { useState } from 'react'
import Script from 'next/script'
import NavBar from '@/components/NavBar'

const ToolIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactElement> = {
    'word-counter': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5"/>
        <text x="20" y="32" fontFamily="Arial" fontSize="10" fontWeight="700" fill="#1D4ED8" textAnchor="middle">123</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#3B82F6"/>
        <text x="33" y="26" fontFamily="Arial" fontSize="12" fontWeight="700" fill="white" textAnchor="middle">W</text>
      </svg>
    ),
    'text-case': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5"/>
        <text x="20" y="32" fontFamily="Arial" fontSize="10" fontWeight="700" fill="#B91C1C" textAnchor="middle">aB</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#EF4444"/>
        <text x="33" y="26" fontFamily="Arial" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">Aa</text>
      </svg>
    ),
    'lorem': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#F3F4F6" stroke="#6B7280" strokeWidth="1.5"/>
        <rect x="11" y="16" width="18" height="2" rx="1" fill="#6B7280"/>
        <rect x="11" y="22" width="14" height="2" rx="1" fill="#6B7280"/>
        <rect x="11" y="28" width="16" height="2" rx="1" fill="#6B7280"/>
        <rect x="11" y="34" width="12" height="2" rx="1" fill="#6B7280"/>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#6B7280"/>
        <text x="33" y="26" fontFamily="Arial" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">Aa</text>
      </svg>
    ),
    'markdown': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1.5"/>
        <text x="20" y="32" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#4338CA" textAnchor="middle">.md</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#6366F1"/>
        <text x="33" y="26" fontFamily="Arial" fontSize="11" fontWeight="700" fill="white" textAnchor="middle">M</text>
      </svg>
    ),
    'tip': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1.5"/>
        <text x="26" y="34" fontFamily="Arial" fontSize="22" fontWeight="700" fill="#DB2777" textAnchor="middle">$</text>
      </svg>
    ),
    'bmi': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5"/>
        <circle cx="26" cy="20" r="4" fill="#F59E0B"/>
        <path d="M22 28h8M22 32h6M22 36h7" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    'percentage': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#CFFAFE" stroke="#0891B2" strokeWidth="1.5"/>
        <text x="26" y="33" fontFamily="Arial" fontSize="22" fontWeight="700" fill="#0E7490" textAnchor="middle">%</text>
      </svg>
    ),
    'age': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5"/>
        <rect x="14" y="18" width="24" height="20" rx="2" fill="white" stroke="#EA580C" strokeWidth="1.5"/>
        <rect x="14" y="18" width="24" height="6" rx="2" fill="#EA580C"/>
        <rect x="18" y="14" width="2" height="6" rx="1" fill="#EA580C"/>
        <rect x="32" y="14" width="2" height="6" rx="1" fill="#EA580C"/>
        <text x="26" y="35" fontFamily="Arial" fontSize="8" fontWeight="700" fill="#EA580C" textAnchor="middle">AGE</text>
      </svg>
    ),
    'discount': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FECACA" stroke="#DC2626" strokeWidth="1.5"/>
        <path d="M14 14L38 38M18 17a3 3 0 100-6 3 3 0 000 6zM34 41a3 3 0 100-6 3 3 0 000 6z" fill="none" stroke="#DC2626" strokeWidth="2"/>
        <text x="26" y="42" fontFamily="Arial" fontSize="8" fontWeight="700" fill="#DC2626" textAnchor="middle">%OFF</text>
      </svg>
    ),
    'unit': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5"/>
        <path d="M14 28h24M14 28l4-4M14 28l4 4M38 28l-4-4M38 28l-4 4" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="20" y="22" fontFamily="Arial" fontSize="8" fontWeight="700" fill="#2563EB" textAnchor="middle">cm</text>
        <text x="32" y="22" fontFamily="Arial" fontSize="8" fontWeight="700" fill="#2563EB" textAnchor="middle">in</text>
      </svg>
    ),
    'password': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#F3E8FF" stroke="#9333EA" strokeWidth="1.5"/>
        <path d="M22 22a4 4 0 118 0v4h-8v-4z" fill="none" stroke="#9333EA" strokeWidth="2" strokeLinejoin="round"/>
        <rect x="18" y="26" width="16" height="12" rx="2" fill="#9333EA"/>
        <circle cx="26" cy="32" r="2" fill="white"/>
      </svg>
    ),
    'qr': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="1.5"/>
        <rect x="14" y="14" width="8" height="8" rx="1" fill="#0EA5E9"/>
        <rect x="30" y="14" width="8" height="8" rx="1" fill="#0EA5E9"/>
        <rect x="14" y="30" width="8" height="8" rx="1" fill="#0EA5E9"/>
        <rect x="26" y="26" width="3" height="3" fill="#0EA5E9"/>
        <rect x="32" y="32" width="3" height="3" fill="#0EA5E9"/>
        <rect x="26" y="32" width="3" height="3" fill="#0EA5E9"/>
        <rect x="32" y="26" width="3" height="3" fill="#0EA5E9"/>
      </svg>
    ),
    'hex-rgb': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5"/>
        <circle cx="14" cy="20" r="2" fill="#DC2626"/>
        <circle cx="20" cy="20" r="2" fill="#16A34A"/>
        <circle cx="26" cy="20" r="2" fill="#2563EB"/>
        <text x="20" y="34" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#7F1D1D" textAnchor="middle">RGB</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#DC2626"/>
        <text x="33" y="26" fontFamily="monospace" fontSize="9" fontWeight="700" fill="white" textAnchor="middle">HEX</text>
      </svg>
    ),
    'css-gradient': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7"/>
            <stop offset="100%" stopColor="#EC4899"/>
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="36" height="36" rx="6" fill="url(#grad1)"/>
        <text x="26" y="32" fontFamily="Arial" fontSize="14" fontWeight="700" fill="white" textAnchor="middle">CSS</text>
      </svg>
    ),
    'json': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5"/>
        <text x="20" y="32" fontFamily="monospace" fontSize="12" fontWeight="700" fill="#15803D" textAnchor="middle">{'{}'}</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#16A34A"/>
        <text x="33" y="27" fontFamily="monospace" fontSize="12" fontWeight="700" fill="white" textAnchor="middle">{'{}'}</text>
      </svg>
    ),
    'base64': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="6" y="10" width="28" height="34" rx="4" fill="#FFEDD5" stroke="#EA580C" strokeWidth="1.5"/>
        <text x="20" y="32" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#C2410C" textAnchor="middle">abc</text>
        <rect x="20" y="6" width="26" height="32" rx="4" fill="#EA580C"/>
        <text x="33" y="26" fontFamily="monospace" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">b64</text>
      </svg>
    ),
    'url-encoder': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#CCFBF1" stroke="#0D9488" strokeWidth="1.5"/>
        <path d="M18 26a6 6 0 016-6h4M30 26a6 6 0 01-6 6h-4M22 26h8" stroke="#0D9488" strokeWidth="2" strokeLinecap="round"/>
        <text x="26" y="40" fontFamily="Arial" fontSize="7" fontWeight="700" fill="#0D9488" textAnchor="middle">URL</text>
      </svg>
    ),
    'random': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FAE8FF" stroke="#A855F7" strokeWidth="1.5"/>
        <circle cx="18" cy="20" r="2" fill="#A855F7"/>
        <circle cx="26" cy="26" r="2" fill="#A855F7"/>
        <circle cx="34" cy="32" r="2" fill="#A855F7"/>
        <circle cx="34" cy="20" r="2" fill="#A855F7"/>
        <circle cx="18" cy="32" r="2" fill="#A855F7"/>
        <text x="26" y="43" fontFamily="Arial" fontSize="8" fontWeight="700" fill="#A855F7" textAnchor="middle">RND</text>
      </svg>
    ),
    'coin-flip': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.5"/>
        <circle cx="26" cy="26" r="11" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.5"/>
        <text x="26" y="31" fontFamily="Arial" fontSize="14" fontWeight="700" fill="white" textAnchor="middle">$</text>
      </svg>
    ),
    'stopwatch': (
      <svg width="48" height="48" viewBox="0 0 52 52">
        <rect x="8" y="8" width="36" height="36" rx="6" fill="#F1F5F9" stroke="#475569" strokeWidth="1.5"/>
        <circle cx="26" cy="28" r="11" fill="white" stroke="#475569" strokeWidth="2"/>
        <path d="M26 22v6l4 2" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
        <rect x="23" y="13" width="6" height="3" rx="1" fill="#475569"/>
      </svg>
    ),
  }
  return icons[type] ?? icons['word-counter']
}

const TOOLS = [
  // Text
  { iconType:'word-counter',    title:'Word Counter',            desc:'Count words, chars & reading time',       href:'/word-counter',              cat:'text' },
  { iconType:'text-case',       title:'Text Case Converter',     desc:'UPPER, lower, Title, camelCase & more',   href:'/text-case-converter',       cat:'text' },
  { iconType:'lorem',           title:'Lorem Ipsum Generator',   desc:'Placeholder text for designs',            href:'/lorem-ipsum',               cat:'text' },
  { iconType:'markdown',        title:'Markdown Editor',         desc:'Write and preview Markdown live',         href:'/markdown-editor',           cat:'text' },
  // Calculators
  { iconType:'tip',             title:'Tip Calculator',          desc:'Split bills and calculate tips',          href:'/tip-calculator',            cat:'calc' },
  { iconType:'bmi',             title:'BMI Calculator',          desc:'Body mass index — metric & imperial',     href:'/bmi-calculator',            cat:'calc' },
  { iconType:'percentage',      title:'Percentage Calculator',   desc:'5 types of percentage calculations',      href:'/percentage-calculator',     cat:'calc' },
  { iconType:'age',             title:'Age Calculator',          desc:'Exact age + zodiac + next birthday',      href:'/age-calculator',            cat:'calc' },
  { iconType:'discount',        title:'Discount Calculator',     desc:'Find sale price and savings instantly',   href:'/discount-calculator',       cat:'calc' },
  { iconType:'unit',            title:'Unit Converter',          desc:'Length, weight, temperature & more',      href:'/unit-converter',            cat:'calc' },
  // Security
  { iconType:'password',        title:'Password Generator',      desc:'Cryptographically secure passwords',      href:'/password-generator',        cat:'security' },
  // QR
  { iconType:'qr',              title:'QR Code Generator',       desc:'URL, WiFi, email QR codes — free',        href:'/qr-generator',              cat:'qr' },
  // Colour
  { iconType:'hex-rgb',         title:'HEX ↔ RGB Converter',     desc:'Convert between colour code formats',     href:'/hex-rgb-converter',         cat:'color' },
  { iconType:'css-gradient',    title:'CSS Gradient Generator',  desc:'Build beautiful CSS gradients visually',  href:'/css-gradient',              cat:'color' },
  // Developer
  { iconType:'json',            title:'JSON Formatter',          desc:'Format, validate and minify JSON',        href:'/json-formatter',            cat:'dev' },
  { iconType:'base64',          title:'Base64 Encoder/Decoder',  desc:'Encode text or decode Base64 strings',    href:'/base64-encoder',            cat:'dev' },
  { iconType:'url-encoder',     title:'URL Encoder/Decoder',     desc:'Encode or decode URL strings',            href:'/url-encoder',               cat:'dev' },
  // Fun
  { iconType:'random',          title:'Random Number Generator', desc:'Random numbers in any range',             href:'/random-number-generator',   cat:'fun' },
  { iconType:'coin-flip',       title:'Coin Flip & Dice Roller', desc:'Flip coins, roll any dice',               href:'/coin-flip',                 cat:'fun' },
  { iconType:'stopwatch',       title:'Stopwatch & Timer',       desc:'Online stopwatch + countdown timer',      href:'/stopwatch',                 cat:'fun' },
]

const COMING = [
  { icon:'📄', title:'PDF to Word',         desc:'Convert PDF to editable Word' },
  { icon:'🖼', title:'Image Compressor',    desc:'Reduce image size instantly' },
  { icon:'✂️', title:'Background Remover',  desc:'AI removes image backgrounds' },
  { icon:'📊', title:'CSV to JSON',         desc:'Convert spreadsheet data' },
  { icon:'🌐', title:'IP Address Lookup',   desc:'Find IP location info' },
  { icon:'📧', title:'Email Validator',     desc:'Validate email addresses' },
  { icon:'🔑', title:'MD5 Hash Generator',  desc:'Generate MD5 hashes instantly' },
  { icon:'📋', title:'HTML Formatter',      desc:'Beautify HTML code' },
]

const CATS = [
  { id:'all',      label:'🔥 All Tools' },
  { id:'text',     label:'✍ Text' },
  { id:'calc',     label:'🔢 Calculators' },
  { id:'security', label:'🔒 Security' },
  { id:'dev',      label:'💻 Developer' },
  { id:'color',    label:'🎨 Colour' },
  { id:'qr',       label:'📱 QR Code' },
  { id:'fun',      label:'🎲 Fun & Random' },
]

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': 'ConvertDox',
  'url': 'https://convertdox.com',
  'description': 'Free online tools — PDF, Image, AI, Calculator, Text, QR and more.',
  'potentialAction': {
    '@type': 'SearchAction',
    'target': 'https://convertdox.com/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function HomePage() {
  const [activeCat, setActiveCat] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = TOOLS.filter(t => {
    const matchCat = activeCat === 'all' || t.cat === activeCat
    const matchSearch = search === '' ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={{ minHeight:'100vh',background:'#fff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",maxWidth:'100%',overflowX:'hidden' }}>

      <Script id="json-ld-website" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <NavBar />

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'80px 24px 64px',textAlign:'center' }}>
        <div style={{ maxWidth:'760px',margin:'0 auto' }}>
          <div style={{ display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'999px',padding:'5px 16px',fontSize:'13px',color:'rgba(255,255,255,0.85)',marginBottom:'28px' }}>
            <span style={{ background:'#E85D04',borderRadius:'999px',padding:'1px 8px',fontWeight:700,color:'white',fontSize:'11px' }}>FREE</span>
            20 Tools Live — 200+ Coming Soon
          </div>
          <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,5vw,56px)',fontWeight:800,color:'white',lineHeight:1.15,letterSpacing:'-0.5px',margin:'0 0 18px' }}>
            Every Online Tool<br/>You Need —{' '}
            <span style={{ color:'#F48C42' }}>In One Place</span>
          </h1>
          <p style={{ fontSize:'clamp(15px,2vw,18px)',color:'rgba(255,255,255,0.65)',maxWidth:'540px',margin:'0 auto 40px',lineHeight:1.7 }}>
            PDF, Image, AI, Calculators, Text, QR Code and 200+ more tools. Free. Fast. No installation.
          </p>
          <div style={{ maxWidth:'500px',margin:'0 auto 36px',position:'relative' }}>
            <span style={{ position:'absolute',left:'16px',top:'50%',transform:'translateY(-50%)',fontSize:'18px',pointerEvents:'none' }}>🔍</span>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search 20+ tools — QR Code, BMI, Unit Converter..."
              style={{ width:'100%',padding:'15px 20px 15px 48px',borderRadius:'14px',border:'1px solid rgba(255,255,255,0.25)',background:'rgba(255,255,255,0.12)',fontFamily:'inherit',fontSize:'15px',color:'white',outline:'none',boxSizing:'border-box' }}/>
          </div>
          <div style={{ display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'8px' }}>
            {[{label:'📝 Word Counter',href:'/word-counter'},{label:'⚖️ BMI Calculator',href:'/bmi-calculator'},{label:'📱 QR Generator',href:'/qr-generator'},{label:'⏱ Stopwatch',href:'/stopwatch'},{label:'📐 Unit Converter',href:'/unit-converter'},{label:'🌈 CSS Gradient',href:'/css-gradient'}].map(item => (
              <a key={item.href} href={item.href} style={{ background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'999px',padding:'7px 16px',fontSize:'13px',color:'rgba(255,255,255,0.9)',textDecoration:'none',whiteSpace:'nowrap' }}>{item.label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background:'#0a1f38',padding:'16px 24px' }}>
        <div style={{ maxWidth:'1200px',margin:'0 auto',display:'flex',justifyContent:'center',gap:'48px',flexWrap:'wrap' }}>
          {[{num:'20',label:'Tools Live'},{num:'200+',label:'Coming Soon'},{num:'100%',label:'Free to Use'},{num:'0',label:'Sign-up Needed'}].map(s => (
            <div key={s.label} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'22px',fontWeight:800,color:'#F48C42' }}>{s.num}</div>
              <div style={{ fontSize:'11.5px',color:'rgba(255,255,255,0.45)',marginTop:'2px',textTransform:'uppercase',letterSpacing:'0.5px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why ConvertDox - moved here, right after stats */}
      <div style={{ background:'#ffffff',padding:'56px 24px',borderBottom:'1px solid #e2e8f0' }}>
        <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
          <div style={{ textAlign:'center',marginBottom:'48px' }}>
            <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1.5px',marginBottom:'10px' }}>Why ConvertDox</div>
            <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(28px,4vw,42px)',fontWeight:800,color:'#0F2A4A',margin:'0 0 14px',letterSpacing:'-0.5px' }}>
              Built for everyone — fast, free, secure
            </h2>
            <p style={{ fontSize:'17px',color:'#64748b',maxWidth:'620px',margin:'0 auto',lineHeight:'1.7' }}>
              ConvertDox brings together 200+ professional tools in one platform —
              designed with privacy, speed, and simplicity at its core.
            </p>
          </div>

          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'32px' }}>

            <div style={{ textAlign:'center',padding:'8px' }}>
              <div style={{ width:'72px',height:'72px',background:'#0F2A4A',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px' }}>
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                  <path d="M16 20l8-6 8 6v8a2 2 0 01-2 2H18a2 2 0 01-2-2v-8z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                  <circle cx="24" cy="24" r="2" fill="#F48C42"/>
                </svg>
              </div>
              <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',margin:'0 0 12px' }}>200+ Tools Available</h3>
              <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',margin:0,padding:'0 8px' }}>
                From PDF conversion and image editing to calculators, text utilities,
                and developer tools — we support more categories than any other free
                platform available online.
              </p>
            </div>

            <div style={{ textAlign:'center',padding:'8px' }}>
              <div style={{ width:'72px',height:'72px',background:'#0F2A4A',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px' }}>
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                  <path d="M22 14l-6 12h6l-2 8 8-12h-6l2-8z" fill="#F48C42"/>
                </svg>
              </div>
              <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',margin:'0 0 12px' }}>Fast and Easy</h3>
              <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',margin:0,padding:'0 8px' }}>
                Just open your tool, paste your text or drop your file, and get instant
                results. Most tools work in real time — no loading screens, no waiting,
                no friction whatsoever.
              </p>
            </div>

            <div style={{ textAlign:'center',padding:'8px' }}>
              <div style={{ width:'72px',height:'72px',background:'#0F2A4A',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px' }}>
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                  <path d="M16 28a4 4 0 014-4 6 6 0 0112 0h.5a3.5 3.5 0 010 7h-12.5a4 4 0 01-4-3z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M24 18v4M22 20l2-2 2 2" stroke="#F48C42" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',margin:'0 0 12px' }}>Works in the Cloud</h3>
              <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',margin:0,padding:'0 8px' }}>
                Everything runs in your browser. No software to download, no apps to
                install, no system resources consumed. Open any tool and start using
                it immediately.
              </p>
            </div>

            <div style={{ textAlign:'center',padding:'8px' }}>
              <div style={{ width:'72px',height:'72px',background:'#0F2A4A',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px' }}>
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="6" fill="none" stroke="white" strokeWidth="2"/>
                  <path d="M24 14v3M24 31v3M14 24h3M31 24h3M17 17l2 2M29 29l2 2M17 31l2-2M29 19l2-2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="24" cy="24" r="2" fill="#F48C42"/>
                </svg>
              </div>
              <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',margin:'0 0 12px' }}>Custom Settings</h3>
              <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',margin:0,padding:'0 8px' }}>
                Most tools support advanced customisation options. Adjust QR code
                colours, choose password complexity, customise conversions — fine-tune
                every result to your exact needs.
              </p>
            </div>

            <div style={{ textAlign:'center',padding:'8px' }}>
              <div style={{ width:'72px',height:'72px',background:'#0F2A4A',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px' }}>
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                  <path d="M24 12l9 4v8c0 6-4 11-9 12-5-1-9-6-9-12v-8l9-4z" fill="none" stroke="#F48C42" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M20 24l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',margin:'0 0 12px' }}>Security Guaranteed</h3>
              <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',margin:0,padding:'0 8px' }}>
                Your files and data are processed securely and deleted instantly after
                use. We never store, share, or sell your information — your privacy
                is fully protected. <a href="/legal" style={{ color:'#E85D04',fontWeight:600,textDecoration:'none' }}>Read more about security</a>.
              </p>
            </div>

            <div style={{ textAlign:'center',padding:'8px' }}>
              <div style={{ width:'72px',height:'72px',background:'#0F2A4A',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px' }}>
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                  <rect x="12" y="14" width="18" height="13" rx="1.5" fill="none" stroke="white" strokeWidth="2"/>
                  <rect x="32" y="18" width="8" height="16" rx="1.5" fill="none" stroke="white" strokeWidth="2"/>
                  <circle cx="36" cy="31" r="1" fill="#F48C42"/>
                </svg>
              </div>
              <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',margin:'0 0 12px' }}>All Devices Supported</h3>
              <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',margin:0,padding:'0 8px' }}>
                ConvertDox is fully browser-based and works seamlessly on every device
                — desktop, laptop, tablet, and mobile. Access any tool from anywhere,
                on any platform.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Tools grid */}
      <div id="tools" style={{ maxWidth:'1200px',margin:'0 auto',padding:'56px 24px' }}>
        <div style={{ marginBottom:'28px' }}>
          <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'6px' }}>All Categories</div>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,34px)',fontWeight:800,color:'#0F2A4A',margin:'0 0 8px' }}>Free Online Tools</h2>
          <p style={{ fontSize:'15px',color:'#64748b',margin:0 }}>20 tools live. No installation. Works instantly in your browser.</p>
        </div>
        <div style={{ display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'28px' }}>
          {CATS.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)}
              style={{ padding:'8px 16px',borderRadius:'999px',border:'1.5px solid',borderColor:activeCat===cat.id?'#0F2A4A':'#e2e8f0',background:activeCat===cat.id?'#0F2A4A':'white',color:activeCat===cat.id?'white':'#64748b',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer',whiteSpace:'nowrap' }}>
              {cat.label}
            </button>
          ))}
        </div>
        {filtered.length > 0 ? (
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'14px',marginBottom:'14px' }}>
            {filtered.map(tool => (
              <a key={tool.href} href={tool.href}
                style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'16px',padding:'20px',textDecoration:'none',display:'flex',flexDirection:'column',gap:'12px',boxShadow:'0 2px 8px rgba(15,42,74,0.04)' }}>
                <div style={{ marginBottom:'4px' }}><ToolIcon type={tool.iconType} /></div>
                <div>
                  <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'4px' }}>{tool.title}</div>
                  <div style={{ fontSize:'12.5px',color:'#94a3b8',lineHeight:'1.4' }}>{tool.desc}</div>
                </div>
                <div style={{ marginTop:'auto' }}>
                  <span style={{ fontSize:'12px',fontWeight:600,color:'#E85D04',background:'#FFF7ED',padding:'4px 12px',borderRadius:'999px' }}>Open Tool →</span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div style={{ textAlign:'center',padding:'48px',color:'#94a3b8' }}>
            <div style={{ fontSize:'36px',marginBottom:'10px' }}>🔍</div>
            <p>No tools found for &ldquo;{search}&rdquo;</p>
          </div>
        )}

        {/* Security badges */}
        <div style={{ background:'white',padding:'40px 0',borderTop:'1px solid #e2e8f0',borderBottom:'1px solid #e2e8f0',marginTop:'48px' }}>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'10px' }}>Trusted & Secure</div>
            <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'24px',fontWeight:800,color:'#0F2A4A',marginBottom:'24px' }}>Your data stays private</h2>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'14px' }}>
              {[
                { icon:'🔒', title:'SSL Encrypted', desc:'TLS 1.3 transfer' },
                { icon:'🛡', title:'No Storage', desc:'Auto-delete policy' },
                { icon:'🚫', title:'No Tracking', desc:'Privacy first' },
                { icon:'✅', title:'GDPR Ready', desc:'Compliant practices' },
                { icon:'⚡', title:'Cloudflare', desc:'Enterprise security' },
                { icon:'🆓', title:'Always Free', desc:'No hidden fees' },
              ].map(b => (
                <div key={b.title} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'16px 12px',textAlign:'center' }}>
                  <div style={{ fontSize:'28px',marginBottom:'6px' }}>{b.icon}</div>
                  <div style={{ fontSize:'13px',fontWeight:700,color:'#0F2A4A' }}>{b.title}</div>
                  <div style={{ fontSize:'11.5px',color:'#94a3b8',marginTop:'2px' }}>{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coming soon */}
        <div style={{ marginTop:'48px' }}>
          <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px' }}>
            <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'22px',fontWeight:800,color:'#0F2A4A',margin:0 }}>Coming Soon</h2>
            <span style={{ background:'#FFF7ED',border:'1.5px solid #FED7AA',color:'#C2410C',fontSize:'12px',fontWeight:700,padding:'3px 10px',borderRadius:'999px' }}>Building now</span>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'14px' }}>
            {COMING.map(tool => (
              <div key={tool.title} style={{ background:'#f8fafc',border:'1.5px dashed #e2e8f0',borderRadius:'16px',padding:'20px' }}>
                <div style={{ width:'44px',height:'44px',background:'#f1f5f9',borderRadius:'11px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',marginBottom:'10px' }}>{tool.icon}</div>
                <div style={{ fontSize:'14px',fontWeight:700,color:'#94a3b8',marginBottom:'4px' }}>{tool.title}</div>
                <div style={{ fontSize:'12px',color:'#cbd5e1' }}>{tool.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer style={{ background:'#0F2A4A',padding:'48px 24px 28px' }}>
        <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'40px',marginBottom:'40px' }}>
            <div>
              <div style={{ display:'flex',alignItems:'center',gap:'8px',marginBottom:'14px' }}>
                <div style={{ width:'30px',height:'30px',background:'#E85D04',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'15px' }}>📄</div>
                <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'18px',fontWeight:800,color:'white' }}>Convert<span style={{ color:'#F48C42' }}>Dox</span></span>
              </div>
              <p style={{ fontSize:'13.5px',color:'rgba(255,255,255,0.4)',lineHeight:'1.7',maxWidth:'260px',margin:0 }}>Every online tool you need in one place. Free, fast, and private.</p>
            </div>
            {[
              {title:'Tools',links:[{label:'Word Counter',href:'/word-counter'},{label:'QR Generator',href:'/qr-generator'},{label:'Unit Converter',href:'/unit-converter'},{label:'CSS Gradient',href:'/css-gradient'},{label:'Stopwatch',href:'/stopwatch'}]},
              {title:'Categories',links:[{label:'PDF Tools',href:'/#tools'},{label:'Image Tools',href:'/#tools'},{label:'AI Tools',href:'/#tools'},{label:'Calculators',href:'/#tools'},{label:'Developer Tools',href:'/#tools'}]},
              {title:'Company',links:[{label:'About',href:'/about'},{label:'Privacy Policy',href:'/legal'},{label:'Terms of Use',href:'/legal'},{label:'Contact',href:'/contact'}]},
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize:'12px',fontWeight:700,color:'rgba(255,255,255,0.45)',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'14px' }}>{col.title}</div>
                {col.links.map(link => (
                  <a key={link.label} href={link.href} style={{ display:'block',fontSize:'13.5px',color:'rgba(255,255,255,0.4)',textDecoration:'none',marginBottom:'8px' }}>{link.label}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px' }}>
            <p style={{ fontSize:'13px',color:'rgba(255,255,255,0.3)',margin:0 }}>© 2025 ConvertDox — Every Online Tool You Need</p>
            <div style={{ display:'flex',gap:'20px' }}>
              {[{label:'Privacy',href:'/legal'},{label:'Terms',href:'/legal'},{label:'Contact',href:'/contact'}].map(l => (
                <a key={l.label} href={l.href} style={{ fontSize:'13px',color:'rgba(255,255,255,0.3)',textDecoration:'none' }}>{l.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
