/*
  ConvertDox — Contact Page
  PUT IN: src/app/contact/page.tsx
  URL: convertdox.com/contact
*/
'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'general', message:'' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return
    setSending(true)
    // In production connect this to your email service (Resend, EmailJS, etc.)
    await new Promise(r => setTimeout(r, 1200))
    setSent(true)
    setSending(false)
  }

  const inputStyle = { width:'100%',padding:'13px 16px',border:'1.5px solid #e2e8f0',borderRadius:'11px',fontFamily:'inherit',fontSize:'15px',color:'#0F2A4A',outline:'none',transition:'border-color 0.15s',boxSizing:'border-box' as const }

  return (
    <div style={{ minHeight:'100vh',background:'#fff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px',textAlign:'center' }}>
        <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(28px,4vw,44px)',fontWeight:800,color:'white',margin:'0 0 12px' }}>Contact Us</h1>
        <p style={{ fontSize:'16px',color:'rgba(255,255,255,0.65)',maxWidth:'480px',margin:'0 auto' }}>We typically respond within 24–48 hours. For urgent matters, please use the correct email below.</p>
      </div>

      <div style={{ maxWidth:'1000px',margin:'0 auto',padding:'40px 24px' }}>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1.2fr',gap:'32px',alignItems:'start' }}>

          {/* Left: contact info */}
          <div>
            <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'22px',fontWeight:800,color:'#0F2A4A',marginBottom:'20px' }}>Get in Touch</h2>

            {[
              { icon:'📧', title:'General Inquiries', email:'info@convertdox.com', desc:'Questions about tools, features, or partnerships' },
              { icon:'⚖️', title:'Legal & DMCA', email:'legal@convertdox.com', desc:'Copyright claims, DMCA notices, legal matters' },
              { icon:'🐛', title:'Bug Reports', email:'info@convertdox.com', desc:'Found a bug or technical issue?' },
              { icon:'🤝', title:'Business & Partnerships', email:'info@convertdox.com', desc:'Sponsorships, partnerships, press inquiries' },
            ].map(c => (
              <div key={c.title} style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'14px',padding:'16px 18px',marginBottom:'12px',display:'flex',gap:'14px',alignItems:'flex-start',boxShadow:'0 2px 8px rgba(15,42,74,0.04)' }}>
                <div style={{ width:'40px',height:'40px',background:'#FFF7ED',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'2px' }}>{c.title}</div>
                  <a href={`mailto:${c.email}`} style={{ fontSize:'13.5px',color:'#E85D04',fontWeight:600,textDecoration:'none' }}>{c.email}</a>
                  <div style={{ fontSize:'12.5px',color:'#94a3b8',marginTop:'2px' }}>{c.desc}</div>
                </div>
              </div>
            ))}

            {/* Response times */}
            <div style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'14px',padding:'18px',marginTop:'8px' }}>
              <div style={{ fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'10px' }}>⏱ Response Times</div>
              {[
                { type:'General questions', time:'Within 24–48 hours' },
                { type:'Bug reports', time:'Within 24 hours' },
                { type:'DMCA / Legal', time:'Within 48 hours' },
                { type:'Security issues', time:'Within 48 hours' },
              ].map(r => (
                <div key={r.type} style={{ display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid #f1f5f9',fontSize:'13px' }}>
                  <span style={{ color:'#64748b' }}>{r.type}</span>
                  <span style={{ fontWeight:600,color:'#0F2A4A' }}>{r.time}</span>
                </div>
              ))}
            </div>

            {/* FAQ links */}
            <div style={{ background:'#EFF6FF',border:'1.5px solid #BFDBFE',borderRadius:'14px',padding:'16px 18px',marginTop:'12px' }}>
              <div style={{ fontSize:'13.5px',fontWeight:700,color:'#1D4ED8',marginBottom:'8px' }}>💡 Common Questions</div>
              {['How do I report a bug?','Are my files stored after conversion?','How do I request an account deletion?','Where is my data processed?'].map(q => (
                <div key={q} style={{ fontSize:'13px',color:'#1D4ED8',padding:'4px 0',cursor:'pointer' }}>→ {q}</div>
              ))}
            </div>
          </div>

          {/* Right: contact form */}
          <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'28px',boxShadow:'0 8px 32px rgba(15,42,74,0.07)' }}>
            {sent ? (
              <div style={{ textAlign:'center',padding:'40px 20px' }}>
                <div style={{ fontSize:'56px',marginBottom:'16px' }}>✅</div>
                <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'24px',fontWeight:800,color:'#0F2A4A',marginBottom:'10px' }}>Message Sent!</h2>
                <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7' }}>Thank you for reaching out. We'll get back to you within 24–48 hours at <strong>{form.email}</strong></p>
                <button onClick={() => { setSent(false); setForm({ name:'',email:'',subject:'general',message:'' }) }}
                  style={{ marginTop:'20px',background:'#E85D04',color:'white',border:'none',padding:'12px 28px',borderRadius:'10px',fontFamily:'inherit',fontSize:'14px',fontWeight:700,cursor:'pointer' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'22px',fontWeight:800,color:'#0F2A4A',marginBottom:'20px' }}>Send a Message</h2>

                <div style={{ display:'flex',flexDirection:'column',gap:'14px' }}>
                  <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px' }}>
                    <div>
                      <label style={{ display:'block',fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'6px' }}>Your Name *</label>
                      <input type="text" value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Mohammad Khan" style={inputStyle}/>
                    </div>
                    <div>
                      <label style={{ display:'block',fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'6px' }}>Email Address *</label>
                      <input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} placeholder="you@example.com" style={inputStyle}/>
                    </div>
                  </div>

                  <div>
                    <label style={{ display:'block',fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'6px' }}>Subject</label>
                    <select value={form.subject} onChange={e => setForm({...form,subject:e.target.value})} style={inputStyle}>
                      <option value="general">General Question</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="legal">Legal / DMCA</option>
                      <option value="business">Business / Partnership</option>
                      <option value="security">Security Issue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display:'block',fontSize:'13.5px',fontWeight:700,color:'#0F2A4A',marginBottom:'6px' }}>Message *</label>
                    <textarea value={form.message} onChange={e => setForm({...form,message:e.target.value})}
                      placeholder="Describe your question or issue in detail. For bug reports, please include the tool name and what happened."
                      rows={6}
                      style={{ ...inputStyle, resize:'vertical', lineHeight:'1.6' }}/>
                  </div>

                  <div style={{ background:'#f8fafc',borderRadius:'10px',padding:'12px 14px',fontSize:'12.5px',color:'#64748b',display:'flex',gap:'8px',alignItems:'flex-start' }}>
                    <span>🔒</span>
                    <span>Your message is transmitted securely. We do not share your contact information with third parties. See our <a href="/legal#privacy" style={{ color:'#E85D04' }}>Privacy Policy</a>.</span>
                  </div>

                  <button onClick={handleSubmit} disabled={sending || !form.name || !form.email || !form.message}
                    style={{ background: sending || !form.name || !form.email || !form.message ? '#94a3b8' : '#E85D04', color:'white',border:'none',padding:'15px',borderRadius:'12px',fontFamily:'inherit',fontSize:'16px',fontWeight:700,cursor: sending ? 'wait' : 'pointer',transition:'all 0.15s' }}>
                    {sending ? 'Sending...' : '📨 Send Message'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
