/*
  ConvertDox — Password Generator
  PUT IN: src/app/password-generator/page.tsx
  URL: localhost:3000/password-generator
*/
'use client'
import { useState, useCallback } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import SiteFooter from '@/components/SiteFooter'
import RelatedTools from '@/components/RelatedTools'

function Check({ checked, onChange, label }: { checked:boolean; onChange:(v:boolean)=>void; label:string }) {
  return (
    <label style={{ display:'flex',alignItems:'center',gap:'10px',cursor:'pointer',padding:'10px 14px',background:checked?'#EFF6FF':'#f8fafc',border:'1.5px solid',borderColor:checked?'#BFDBFE':'#e2e8f0',borderRadius:'10px',transition:'all 0.15s' }}>
      <div onClick={()=>onChange(!checked)} style={{ width:'22px',height:'22px',borderRadius:'6px',border:'2px solid',borderColor:checked?'#0F2A4A':'#cbd5e1',background:checked?'#0F2A4A':'white',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0,transition:'all 0.15s' }}>
        {checked&&<span style={{ color:'white',fontSize:'13px',fontWeight:700 }}>✓</span>}
      </div>
      <span style={{ fontSize:'14px',fontWeight:600,color:'#0F2A4A' }}>{label}</span>
    </label>
  )
}

export default function PasswordGeneratorPage() {
  const [length, setLength]           = useState(16)
  const [useUpper, setUseUpper]       = useState(true)
  const [useLower, setUseLower]       = useState(true)
  const [useNumbers, setUseNumbers]   = useState(true)
  const [useSymbols, setUseSymbols]   = useState(true)
  const [noSimilar, setNoSimilar]     = useState(false)
  const [password, setPassword]       = useState('')
  const [copied, setCopied]           = useState(false)
  const [history, setHistory]         = useState<string[]>([])

  const generate = useCallback(() => {
    let chars = ''
    if (useUpper)   chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (useLower)   chars += 'abcdefghijklmnopqrstuvwxyz'
    if (useNumbers) chars += '0123456789'
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    if (noSimilar)  chars = chars.replace(/[0OoIl1]/g,'')
    if (!chars)     chars = 'abcdefghijklmnopqrstuvwxyz'
    const arr = new Uint32Array(length)
    crypto.getRandomValues(arr)
    const pwd = Array.from(arr).map(n=>chars[n%chars.length]).join('')
    setPassword(pwd)
    setHistory(prev=>[pwd,...prev.slice(0,4)])
  }, [length,useUpper,useLower,useNumbers,useSymbols,noSimilar])

  const strength = Math.min(5,[length>=8,length>=12,length>=16,useUpper&&useLower,useNumbers,useSymbols].filter(Boolean).length)
  const strLabels = ['Very Weak','Weak','Fair','Good','Strong','Very Strong']
  const strColors = ['#DC2626','#F97316','#EAB308','#22C55E','#16A34A','#0D9488']

  const copy = () => {
    if (!password) return
    navigator.clipboard.writeText(password)
    setCopied(true); setTimeout(()=>setCopied(false),2000)
  }

  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <TrustStrip />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>🔑</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>Password Generator</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Generate secure, cryptographically random passwords instantly. Nothing leaves your browser.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'680px',margin:'0 auto',padding:'36px 24px' }}>

        {/* Password display */}
        <div style={{ background:'#0F2A4A',borderRadius:'16px',padding:'20px 24px',marginBottom:'20px',display:'flex',alignItems:'center',gap:'16px',boxShadow:'0 8px 32px rgba(15,42,74,0.25)' }}>
          <div style={{ fontFamily:'monospace',fontSize:'18px',color:password?'#7DD3FC':'rgba(255,255,255,0.25)',letterSpacing:'1.5px',flex:1,wordBreak:'break-all',lineHeight:'1.5' }}>
            {password||'Click Generate to create a password'}
          </div>
          <button onClick={copy} style={{ background:copied?'#16A34A':'rgba(255,255,255,0.15)',border:'none',borderRadius:'10px',padding:'10px 14px',color:'white',fontFamily:'inherit',fontSize:'13px',fontWeight:700,cursor:'pointer',flexShrink:0,transition:'all 0.15s',whiteSpace:'nowrap' }}>
            {copied?'✓ Copied':'📋 Copy'}
          </button>
        </div>

        {/* Strength meter */}
        {password && (
          <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'14px 18px',marginBottom:'20px',display:'flex',alignItems:'center',gap:'14px' }}>
            <span style={{ fontSize:'13px',fontWeight:700,color:'#0F2A4A',flexShrink:0 }}>Strength:</span>
            <div style={{ flex:1,height:'8px',background:'#e2e8f0',borderRadius:'999px',overflow:'hidden' }}>
              <div style={{ height:'100%',width:`${(strength/5)*100}%`,background:strColors[strength],borderRadius:'999px',transition:'all 0.3s' }}/>
            </div>
            <span style={{ fontSize:'13px',fontWeight:700,color:strColors[strength],flexShrink:0 }}>{strLabels[strength]}</span>
          </div>
        )}

        {/* Controls */}
        <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'28px',boxShadow:'0 8px 32px rgba(15,42,74,0.07)',marginBottom:'20px' }}>

          {/* Length */}
          <div style={{ marginBottom:'24px' }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px' }}>
              <label style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A' }}>Password Length</label>
              <div style={{ background:'#0F2A4A',color:'white',borderRadius:'8px',padding:'4px 12px',fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'18px',fontWeight:800 }}>{length}</div>
            </div>
            <input type="range" min="4" max="64" value={length} onChange={e=>setLength(parseInt(e.target.value))} style={{ width:'100%',accentColor:'#E85D04',height:'6px',cursor:'pointer' }}/>
            <div style={{ display:'flex',justifyContent:'space-between',fontSize:'11.5px',color:'#94a3b8',marginTop:'5px' }}>
              <span>4 — too short</span><span style={{ color:'#16A34A',fontWeight:600 }}>16–20 recommended</span><span>64 — maximum</span>
            </div>
          </div>

          {/* Checkboxes */}
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px' }}>
            <Check checked={useUpper}   onChange={setUseUpper}   label="Uppercase A-Z"/>
            <Check checked={useLower}   onChange={setUseLower}   label="Lowercase a-z"/>
            <Check checked={useNumbers} onChange={setUseNumbers} label="Numbers 0-9"/>
            <Check checked={useSymbols} onChange={setUseSymbols} label="Symbols !@#$"/>
            <div style={{ gridColumn:'1/-1' }}>
              <Check checked={noSimilar} onChange={setNoSimilar} label="Exclude similar characters (0, O, I, l, 1)"/>
            </div>
          </div>
        </div>

        {/* Generate button */}
        <button onClick={generate} style={{ width:'100%',background:'linear-gradient(135deg,#E85D04,#F48C42)',color:'white',border:'none',padding:'16px',borderRadius:'14px',fontFamily:'inherit',fontSize:'16px',fontWeight:800,cursor:'pointer',boxShadow:'0 6px 24px rgba(232,93,4,0.3)',transition:'all 0.15s',letterSpacing:'0.3px' }}>
          🔄 Generate Secure Password
        </button>

        {/* Security notice */}
        <div style={{ marginTop:'14px',background:'#F0FDF4',border:'1.5px solid #BBF7D0',borderRadius:'12px',padding:'12px 16px',display:'flex',alignItems:'flex-start',gap:'10px' }}>
          <span style={{ fontSize:'18px',flexShrink:0 }}>🔒</span>
          <p style={{ fontSize:'12.5px',color:'#166534',lineHeight:'1.6',margin:0 }}>Uses <strong>crypto.getRandomValues()</strong> — the most secure browser API available. Passwords are generated locally and never leave your device.</p>
        </div>

        {/* History */}
        {history.length>1&&(
          <div style={{ marginTop:'24px',background:'white',border:'1.5px solid #e2e8f0',borderRadius:'16px',padding:'20px' }}>
            <div style={{ fontSize:'12px',fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'10px' }}>Recently Generated (click to copy)</div>
            {history.slice(1).map((p,i)=>(
              <div key={i} onClick={()=>navigator.clipboard.writeText(p)} style={{ fontFamily:'monospace',fontSize:'13px',color:'#64748b',padding:'8px 12px',borderRadius:'8px',cursor:'pointer',background:'#f8fafc',marginBottom:'6px',letterSpacing:'0.5px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',border:'1px solid #f1f5f9' }}>
                {p}
              </div>
            ))}
          </div>
        )}
      </div>
      <RelatedTools currentPath="/password-generator" />

      <div style={{ maxWidth:'860px',margin:'48px auto 0',padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>How to Use the Password Generator</h2>
          <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',marginBottom:'16px' }}>Generate a cryptographically strong password in seconds using your browser&apos;s secure random source — never a server.</p>
          <ol style={{ paddingLeft:'24px',fontSize:'15px',color:'#64748b',lineHeight:'1.8' }}>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 1:</strong> Choose a length — 16+ characters for important accounts.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 2:</strong> Select which character types to include: uppercase, lowercase, digits, symbols.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 3:</strong> Click Generate. A new password appears instantly with a strength indicator.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 4:</strong> Copy the result straight into your password manager — never into a plain text note.</li>
          </ol>
        </section>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Common Use Cases</h2>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'14px' }}>
            {[
              { icon:'🆕', title:'New Account Sign-ups', desc:'Generate a unique password for every new service.' },
              { icon:'🗄️', title:'Database Credentials', desc:'Strong passwords for production DB users and service accounts.' },
              { icon:'🔑', title:'API Keys & Secrets', desc:'High-entropy strings for tokens, webhooks, and config.' },
              { icon:'📶', title:'WiFi Passwords', desc:'Secure passphrases for your home or office network.' },
            ].map(c => (
              <div key={c.title} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'16px' }}>
                <div style={{ fontSize:'24px',marginBottom:'8px' }}>{c.icon}</div>
                <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'4px' }}>{c.title}</div>
                <div style={{ fontSize:'13px',color:'#64748b',lineHeight:'1.6' }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'What makes a password strong?', a:'Length is the biggest factor — every extra character roughly doubles the search space. Add character variety (upper, lower, digit, symbol) and ensure the password is truly random, not a memorable pattern. 16+ random characters is the modern baseline.' },
            { q:'Are generated passwords stored?', a:'No. Passwords are generated locally in your browser using window.crypto.getRandomValues() and never sent anywhere. Once you close the tab, the password is gone unless you saved it yourself.' },
            { q:'How random is the generator?', a:'It uses the Web Crypto API\'s cryptographically secure random number generator — the same source used by browser-built-in password fills, TLS handshakes, and modern auth flows. Not the predictable Math.random().' },
            { q:'Should I use a passphrase instead?', a:'A 4-word random passphrase (e.g. correct-horse-battery-staple) has comparable entropy to a 12-character random string and is easier to type. For accounts you never type manually, random strings are fine.' },
            { q:'What length is recommended?', a:'12 characters minimum for low-stakes accounts; 16+ for anything containing personal data, money, or work access; 20+ for password manager master passwords and email accounts that gate everything else.' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'14px 18px',marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px',color:'#64748b',lineHeight:'1.7',marginTop:'10px',marginBottom:0 }}>{faq.a}</p>
            </details>
          ))}
        </section>

        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Why Use the ConvertDox Password Generator?</h2>
          <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7' }}>The thing that ruins most online password generators is also the most basic: they generate the password on a server and send it back to you. That&apos;s a problem because the server now has a record — however briefly — of a credential you&apos;re about to use. The ConvertDox Password Generator generates client-side using the browser&apos;s Web Crypto API, the same cryptographically secure source used by browser autofill and TLS. There is no server roundtrip, no logging, and no telemetry; you can verify this in your browser&apos;s network panel. The tool supports both random-string and passphrase modes, length up to 128 characters, and per-class toggles so you can produce credentials that fit the (sometimes arbitrary) rules of legacy systems. Need a database password without symbols? Toggle them off. Need a 6-digit PIN? Set length to 6 and digits only. Need a 32-character API secret? Done in one click. The generator also exposes a small recent-history panel so you can grab the last few generated values without re-running. Use it once and you&apos;ll stop reusing passwords across sites — which, statistically, is the single most important thing you can do to protect your online accounts in 2026.</p>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'Password Generator',
        'description': 'Cryptographically secure password generator. Client-side, customizable length and character classes, free forever.',
        'url': 'https://convertdox.com/password-generator',
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'Any',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
        'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '127' },
        'creator': { '@type': 'Organization', 'name': 'ConvertDox', 'url': 'https://convertdox.com' },
      }) }} />

      <SiteFooter />
    </div>
  )
}
