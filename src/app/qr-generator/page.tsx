/*
  ConvertDox — QR Code Generator
  PUT IN: src/app/qr-generator/page.tsx
  NEEDS: npm install qrcode @types/qrcode (already done)
*/
'use client'
import { useState, useEffect } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import SiteFooter from '@/components/SiteFooter'
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

  const getContent = () => {
    if (activeTab === 'wifi') return `WIFI:T:${wifiSec};S:${wifiSsid};P:${wifiPass};;`
    if (activeTab === 'email') return `mailto:${emailTo}?subject=${encodeURIComponent(emailSub)}`
    return text
  }

  useEffect(() => {
    const content = getContent()
    if (!content.trim()) { setQrUrl(''); return }
    QRCode.toDataURL(content, {
      width: size, margin: 2,
      color: { dark: color, light: bgColor },
      errorCorrectionLevel: 'H'
    }).then(setQrUrl).catch(() => setQrUrl(''))
  }, [text, activeTab, color, bgColor, size, wifiSsid, wifiPass, wifiSec, emailTo, emailSub])

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
                ? <img src={qrUrl} alt="QR Code" style={{ width:'100%',maxWidth:'240px',borderRadius:'10px',border:'1px solid #e2e8f0' }}/>
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
      <SiteFooter />
    </div>
  )
}
