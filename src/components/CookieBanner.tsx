/*
  ConvertDox — Cookie Consent Banner
  PUT IN: src/components/CookieBanner.tsx
  
  Then add to src/app/layout.tsx:
  import CookieBanner from '@/components/CookieBanner'
  And put <CookieBanner /> inside the <body> tag.
  
  REQUIRED for GDPR compliance and Google AdSense.
*/
'use client'
import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [prefs, setPrefs] = useState({ analytics: true, advertising: true })

  useEffect(() => {
    const consent = localStorage.getItem('convertdox-cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  const acceptAll = () => {
    localStorage.setItem('convertdox-cookie-consent', JSON.stringify({ analytics:true, advertising:true, timestamp: Date.now() }))
    setVisible(false)
  }

  const acceptSelected = () => {
    localStorage.setItem('convertdox-cookie-consent', JSON.stringify({ ...prefs, timestamp: Date.now() }))
    setVisible(false)
  }

  const rejectAll = () => {
    localStorage.setItem('convertdox-cookie-consent', JSON.stringify({ analytics:false, advertising:false, timestamp: Date.now() }))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{ position:'fixed',bottom:0,left:0,right:0,zIndex:9999,padding:'0 16px 16px',pointerEvents:'none' }}>
      <div style={{ maxWidth:'860px',margin:'0 auto',background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',boxShadow:'0 -4px 40px rgba(15,42,74,0.15)',padding:'20px 24px',pointerEvents:'all' }}>

        {!showDetails ? (
          /* Simple view */
          <div style={{ display:'flex',alignItems:'center',gap:'20px',flexWrap:'wrap' }}>
            <div style={{ flex:1,minWidth:'200px' }}>
              <div style={{ display:'flex',alignItems:'center',gap:'8px',marginBottom:'4px' }}>
                <span style={{ fontSize:'20px' }}>🍪</span>
                <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'15px',fontWeight:700,color:'#0F2A4A' }}>We use cookies</span>
              </div>
              <p style={{ fontSize:'13px',color:'#64748b',margin:0,lineHeight:'1.5' }}>
                We use cookies for analytics and personalised ads. Your uploaded files are never stored.{' '}
                <a href="/legal#privacy" style={{ color:'#E85D04',fontWeight:600 }}>Privacy Policy</a>
              </p>
            </div>
            <div style={{ display:'flex',gap:'8px',flexShrink:0,flexWrap:'wrap' }}>
              <button onClick={() => setShowDetails(true)}
                style={{ padding:'9px 16px',borderRadius:'9px',border:'1.5px solid #e2e8f0',background:'white',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer',color:'#64748b',whiteSpace:'nowrap' }}>
                Manage Preferences
              </button>
              <button onClick={rejectAll}
                style={{ padding:'9px 16px',borderRadius:'9px',border:'1.5px solid #e2e8f0',background:'white',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer',color:'#64748b',whiteSpace:'nowrap' }}>
                Reject All
              </button>
              <button onClick={acceptAll}
                style={{ padding:'9px 20px',borderRadius:'9px',border:'none',background:'#0F2A4A',fontFamily:'inherit',fontSize:'13px',fontWeight:700,cursor:'pointer',color:'white',whiteSpace:'nowrap' }}>
                Accept All
              </button>
            </div>
          </div>
        ) : (
          /* Detailed view */
          <div>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px' }}>
              <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'16px',fontWeight:700,color:'#0F2A4A' }}>🍪 Cookie Preferences</span>
              <button onClick={() => setShowDetails(false)} style={{ background:'none',border:'none',fontSize:'18px',cursor:'pointer',color:'#94a3b8' }}>✕</button>
            </div>

            <div style={{ display:'flex',flexDirection:'column',gap:'10px',marginBottom:'16px' }}>
              {/* Essential — always on */}
              <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',background:'#f8fafc',borderRadius:'10px',padding:'12px 14px' }}>
                <div>
                  <div style={{ fontSize:'14px',fontWeight:600,color:'#0F2A4A' }}>Essential Cookies</div>
                  <div style={{ fontSize:'12px',color:'#94a3b8' }}>Required for the website to function. Cannot be disabled.</div>
                </div>
                <div style={{ background:'#16A34A',borderRadius:'999px',padding:'4px 12px',fontSize:'12px',fontWeight:600,color:'white',flexShrink:0 }}>Always On</div>
              </div>

              {/* Analytics */}
              <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',background:'#f8fafc',borderRadius:'10px',padding:'12px 14px' }}>
                <div>
                  <div style={{ fontSize:'14px',fontWeight:600,color:'#0F2A4A' }}>Analytics Cookies</div>
                  <div style={{ fontSize:'12px',color:'#94a3b8' }}>Google Analytics — helps us understand how you use our tools.</div>
                </div>
                <label style={{ display:'flex',alignItems:'center',cursor:'pointer',flexShrink:0 }}>
                  <div onClick={() => setPrefs(p => ({...p, analytics:!p.analytics}))}
                    style={{ width:'44px',height:'24px',borderRadius:'999px',background:prefs.analytics?'#0F2A4A':'#cbd5e1',position:'relative',transition:'background 0.2s',cursor:'pointer' }}>
                    <div style={{ position:'absolute',top:'3px',left:prefs.analytics?'22px':'3px',width:'18px',height:'18px',borderRadius:'50%',background:'white',transition:'left 0.2s',boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }}/>
                  </div>
                </label>
              </div>

              {/* Advertising */}
              <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',background:'#f8fafc',borderRadius:'10px',padding:'12px 14px' }}>
                <div>
                  <div style={{ fontSize:'14px',fontWeight:600,color:'#0F2A4A' }}>Advertising Cookies</div>
                  <div style={{ fontSize:'12px',color:'#94a3b8' }}>Google AdSense — used to show relevant advertisements.</div>
                </div>
                <label style={{ display:'flex',alignItems:'center',cursor:'pointer',flexShrink:0 }}>
                  <div onClick={() => setPrefs(p => ({...p, advertising:!p.advertising}))}
                    style={{ width:'44px',height:'24px',borderRadius:'999px',background:prefs.advertising?'#0F2A4A':'#cbd5e1',position:'relative',transition:'background 0.2s',cursor:'pointer' }}>
                    <div style={{ position:'absolute',top:'3px',left:prefs.advertising?'22px':'3px',width:'18px',height:'18px',borderRadius:'50%',background:'white',transition:'left 0.2s',boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }}/>
                  </div>
                </label>
              </div>
            </div>

            <div style={{ display:'flex',gap:'8px',justifyContent:'flex-end' }}>
              <button onClick={rejectAll} style={{ padding:'9px 16px',borderRadius:'9px',border:'1.5px solid #e2e8f0',background:'white',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer',color:'#64748b' }}>Reject All</button>
              <button onClick={acceptSelected} style={{ padding:'9px 20px',borderRadius:'9px',border:'none',background:'#0F2A4A',fontFamily:'inherit',fontSize:'13px',fontWeight:700,cursor:'pointer',color:'white' }}>Save Preferences</button>
              <button onClick={acceptAll} style={{ padding:'9px 20px',borderRadius:'9px',border:'none',background:'#E85D04',fontFamily:'inherit',fontSize:'13px',fontWeight:700,cursor:'pointer',color:'white' }}>Accept All</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
