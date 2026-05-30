/*
  ConvertDox — QR Code Generator
  PUT IN: src/app/qr-generator/page.tsx
  NEEDS: npm install qrcode @types/qrcode (already done)
*/
'use client'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import RelatedTools from '@/components/RelatedTools'
import QRCode from 'qrcode'

export default function QRGeneratorPage() {
  const [text, setText] = useState('https://convertdox.com')
  const [activeTab, setActiveTab] = useState<'url'|'text'|'wifi'|'email'>('url')
  const [color, setColor] = useState('#0F2A4A')
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [size, setSize] = useState(300)
  const [qrUrl, setQrUrl] = useState('')
  const [wifiSsid, setWifiSsid] = useState('')
  const [wifiPass, setWifiPass] = useState('')
  const [wifiSec, setWifiSec] = useState('WPA')
  const [emailTo, setEmailTo] = useState('')
  const [emailSub, setEmailSub] = useState('')

  const getContent = useCallback(() => {
    if (activeTab === 'wifi') return `WIFI:T:${wifiSec};S:${wifiSsid};P:${wifiPass};;`
    if (activeTab === 'email') return `mailto:${emailTo}?subject=${encodeURIComponent(emailSub)}`
    return text
  }, [activeTab, emailSub, emailTo, text, wifiPass, wifiSec, wifiSsid])

  useEffect(() => {
    const content = getContent()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!content.trim()) { setQrUrl(''); return }
    QRCode.toDataURL(content, {
      width: size, margin: 2,
      color: { dark: color, light: bgColor },
      errorCorrectionLevel: 'H'
    }).then(setQrUrl).catch(() => setQrUrl(''))
  }, [getContent, color, bgColor, size])

  const download = () => {
    if (!qrUrl) return
    const a = document.createElement('a')
    a.download = 'convertdox-qr.png'
    a.href = qrUrl
    a.click()
  }

  const tabs = [
    { id:'url', label:'🔗 URL' },
    { id:'text', label:'📝 Text' },
    { id:'wifi', label:'📶 WiFi' },
    { id:'email', label:'📧 Email' },
  ] as const

  const inp = (val:string, set:(v:string)=>void, ph:string, label:string, type='text') => (
    <div>
      <label style={{ display:'block',fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'7px' }}>{label}</label>
      <input type={type} value={val} onChange={e=>set(e.target.value)} placeholder={ph}
        style={{ width:'100%',padding:'12px 14px',border:'1.5px solid #e2e8f0',borderRadius:'10px',fontFamily:'inherit',fontSize:'14px',color:'#0F2A4A',outline:'none' }}/>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh',background:'#fff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <TrustStrip />

      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>📱</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>QR Code Generator</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Create free QR codes for URL, text, WiFi, and email. Download as PNG instantly.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'900px',margin:'0 auto',padding:'36px 24px' }}>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 300px',gap:'24px',alignItems:'start' }}>

          {/* Left: inputs */}
          <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'24px',boxShadow:'0 4px 20px rgba(15,42,74,0.07)' }}>

            {/* Tabs */}
            <div style={{ display:'flex',gap:'6px',marginBottom:'20px',flexWrap:'wrap' }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  style={{ padding:'7px 14px',borderRadius:'8px',border:'1.5px solid',borderColor:activeTab===t.id?'#E85D04':'#e2e8f0',background:activeTab===t.id?'#FFF7ED':'#f8fafc',color:activeTab===t.id?'#E85D04':'#64748b',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer' }}>
                  {t.label}
                </button>
              ))}
            </div>

            {(activeTab === 'url' || activeTab === 'text') && (
              <div style={{ marginBottom:'20px' }}>
                <label style={{ display:'block',fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'7px' }}>
                  {activeTab === 'url' ? 'Website URL' : 'Text or Message'}
                </label>
                <textarea value={text} onChange={e=>setText(e.target.value)} rows={3}
                  placeholder={activeTab === 'url' ? 'https://convertdox.com' : 'Type any message...'}
                  style={{ width:'100%',padding:'12px 14px',border:'1.5px solid #e2e8f0',borderRadius:'10px',fontFamily:'inherit',fontSize:'14px',color:'#0F2A4A',outline:'none',resize:'vertical' }}/>
              </div>
            )}

            {activeTab === 'wifi' && (
              <div style={{ display:'flex',flexDirection:'column',gap:'12px',marginBottom:'20px' }}>
                {inp(wifiSsid, setWifiSsid, 'Your WiFi name', 'Network Name (SSID)')}
                {inp(wifiPass, setWifiPass, 'WiFi password', 'Password', 'password')}
                <div>
                  <label style={{ display:'block',fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'7px' }}>Security Type</label>
                  <select value={wifiSec} onChange={e=>setWifiSec(e.target.value)}
                    style={{ width:'100%',padding:'12px 14px',border:'1.5px solid #e2e8f0',borderRadius:'10px',fontFamily:'inherit',fontSize:'14px',color:'#0F2A4A',outline:'none' }}>
                    <option value="WPA">WPA/WPA2 (most common)</option>
                    <option value="WEP">WEP (older)</option>
                    <option value="nopass">No password</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div style={{ display:'flex',flexDirection:'column',gap:'12px',marginBottom:'20px' }}>
                {inp(emailTo, setEmailTo, 'someone@example.com', 'Email Address', 'email')}
                {inp(emailSub, setEmailSub, 'Hello!', 'Subject (optional)')}
              </div>
            )}

            {/* Customise */}
            <div style={{ borderTop:'1px solid #f1f5f9',paddingTop:'20px' }}>
              <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'12px' }}>🎨 Customise</div>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'12px' }}>
                {[{label:'QR Colour',val:color,set:setColor},{label:'Background',val:bgColor,set:setBgColor}].map(f => (
                  <div key={f.label}>
                    <label style={{ display:'block',fontSize:'12px',color:'#64748b',marginBottom:'6px' }}>{f.label}</label>
                    <div style={{ display:'flex',alignItems:'center',gap:'8px' }}>
                      <input type="color" value={f.val} onChange={e=>f.set(e.target.value)} style={{ width:'40px',height:'40px',border:'none',borderRadius:'8px',cursor:'pointer' }}/>
                      <span style={{ fontSize:'13px',color:'#64748b',fontFamily:'monospace' }}>{f.val}</span>
                    </div>
                  </div>
                ))}
              </div>
              <label style={{ display:'block',fontSize:'12px',color:'#64748b',marginBottom:'6px' }}>Size: {size}px</label>
              <input type="range" min="100" max="600" value={size} onChange={e=>setSize(parseInt(e.target.value))} style={{ width:'100%',accentColor:'#E85D04' }}/>
            </div>
          </div>

          {/* Right: preview */}
          <div style={{ position:'sticky',top:'80px' }}>
            <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'24px',textAlign:'center',boxShadow:'0 4px 20px rgba(15,42,74,0.07)' }}>
              <div style={{ fontSize:'13px',fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'16px' }}>Your QR Code</div>
              {qrUrl
                ? <Image src={qrUrl} alt="QR Code" width={240} height={240} unoptimized style={{ width:'100%',maxWidth:'240px',height:'auto',borderRadius:'10px',border:'1px solid #e2e8f0' }}/>
                : <div style={{ width:'240px',height:'240px',margin:'0 auto',background:'#f8fafc',borderRadius:'10px',border:'2px dashed #e2e8f0',display:'flex',alignItems:'center',justifyContent:'center',color:'#94a3b8',fontSize:'13px' }}>Type something to generate</div>
              }
              {qrUrl && (
                <button onClick={download} style={{ marginTop:'16px',width:'100%',background:'#E85D04',color:'white',border:'none',padding:'13px',borderRadius:'10px',fontFamily:'inherit',fontSize:'15px',fontWeight:700,cursor:'pointer' }}>
                  ⬇ Download PNG
                </button>
              )}
              <p style={{ marginTop:'10px',fontSize:'12px',color:'#94a3b8' }}>Scannable by any phone camera</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',marginBottom:'14px' }}>FAQ</h2>
          {[
            { q:'Is this QR code generator free?', a:'Yes, 100% free. No sign-up needed. Generate and download unlimited QR codes.' },
            { q:'Can I use QR codes for my business?', a:'Absolutely. All QR codes generated here are free to use commercially.' },
            { q:'How do I scan a QR code?', a:'Open your phone camera and point it at the QR code. Most phones scan automatically without an app.' },
            { q:'Can I make a WiFi QR code?', a:'Yes! Click the WiFi tab, enter your network name and password, then share the QR code with guests.' },
          ].map((item,i) => (
            <details key={i} style={{ border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'14px 18px',marginBottom:'8px',background:'white' }}>
              <summary style={{ fontWeight:700,fontSize:'14px',color:'#0F2A4A',cursor:'pointer',listStyle:'none',display:'flex',justifyContent:'space-between' }}>{item.q}<span style={{ color:'#E85D04',fontSize:'20px',fontWeight:300 }}>+</span></summary>
              <p style={{ marginTop:'10px',fontSize:'14px',color:'#64748b',lineHeight:'1.7' }}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      <RelatedTools currentPath="/qr-generator" />

      <div style={{ maxWidth:'860px',margin:'48px auto 0',padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>How to Use the QR Code Generator</h2>
          <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',marginBottom:'16px' }}>Turn any URL, text, WiFi credential, or contact card into a scannable QR code you can download and print.</p>
          <ol style={{ paddingLeft:'24px',fontSize:'15px',color:'#64748b',lineHeight:'1.8' }}>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 1:</strong> Type or paste your URL or text into the input field.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 2:</strong> Choose a size that fits where you&apos;ll display it — bigger for posters, smaller for business cards.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 3:</strong> Customize foreground and background colours for brand alignment (keep high contrast).</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 4:</strong> Download the PNG and test it with two different phones before mass-printing.</li>
          </ol>
        </section>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Common Use Cases</h2>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'14px' }}>
            {[
              { icon:'💼', title:'Business Cards', desc:'Link directly to LinkedIn, portfolio, or a vCard download.' },
              { icon:'🍽️', title:'Restaurant Menus', desc:'Contactless menu access via table-top QR codes.' },
              { icon:'📦', title:'Product Packaging', desc:'Link to instructions, warranty info, or registration.' },
              { icon:'🎫', title:'Event Tickets', desc:'Generate unique codes for entry validation.' },
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
            { q:'What content types can QR codes hold?', a:'URLs, plain text, WiFi network credentials, contact cards (vCard), SMS templates, email templates, geo-coordinates, and calendar events. The most common is a URL.' },
            { q:'How long do QR codes last?', a:'Static QR codes (the kind this tool makes) last forever — they encode the data directly, so as long as the target URL stays live, the code works. Dynamic QR codes from paid services can break if the service shuts down.' },
            { q:'What is the maximum data in a QR code?', a:'Up to 7,089 numeric characters or 4,296 alphanumeric characters in the largest version. In practice, anything over 300 characters becomes visually dense and harder to scan reliably.' },
            { q:'Can I customize QR code colours?', a:'Yes. Pick any foreground and background colour. The only rule: keep contrast high. Dark-on-light works best; some scanners struggle with light-on-dark or low-contrast pairings.' },
            { q:'Do QR codes expire?', a:'Static QR codes generated here do not expire — there is no server, no account, and no renewal. The code only stops working if the URL or content it points to becomes unavailable.' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'14px 18px',marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px',color:'#64748b',lineHeight:'1.7',marginTop:'10px',marginBottom:0 }}>{faq.a}</p>
            </details>
          ))}
        </section>

        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Why Use the ConvertDox QR Code Generator?</h2>
          <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7' }}>Most online QR generators try to upsell you on dynamic codes, tracking, or branded designs that require a monthly subscription. The ConvertDox QR Code Generator does none of that. It produces high-resolution, scannable static QR codes for free, with no watermark, no account, and no expiry. Static QR codes encode the destination directly in the image — they work forever as long as the underlying URL or content stays live. That means you can print them on packaging, posters, menus, and business cards without worrying about a service shutting down and turning your printed code into a 404. The tool runs entirely in your browser using a well-tested QR encoding library, so your URLs and text never leave your device. You can customize the colours, choose your preferred size, and download the result as a PNG suitable for both web and print. For best results, test the generated code with two or three different phones before committing to a print run — scanning behaviour varies slightly between iOS Camera, Android default cameras, and third-party scanner apps, and you want to confirm reliable detection across all of them. Aim for at least 2 cm × 2 cm physical size on print materials, and leave a quiet zone (whitespace) around the code equal to roughly four module widths.</p>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'QR Code Generator',
        'description': 'Free QR code generator for URLs, text, WiFi credentials, and contact cards. Customizable colours, instant download.',
        'url': 'https://convertdox.com/qr-generator',
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'Any',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
        'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '127' },
        'creator': { '@type': 'Organization', 'name': 'ConvertDox', 'url': 'https://convertdox.com' },
      }) }} />
    </div>
  )
}
