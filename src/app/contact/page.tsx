'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Question', message: '' })
  const [sent, setSent] = useState(false)

  const inp: React.CSSProperties = {
    width: '100%', padding: '13px 16px', border: '1.5px solid #e2e8f0', borderRadius: '11px',
    fontFamily: 'inherit', fontSize: '15px', color: '#0F2A4A', outline: 'none',
    transition: 'border-color 0.15s', boxSizing: 'border-box', background: 'white',
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      '',
      'Message:',
      form.message,
    ].join('\r\n')
    window.location.href = `mailto:support@convertdox.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const disabled = !form.name || !form.email || !form.subject || !form.message

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: 'white', margin: '0 0 12px' }}>Contact Us</h1>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', maxWidth: '480px', margin: '0 auto' }}>
          We typically respond within 24–48 hours.
        </p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.3fr)', gap: '32px', alignItems: 'start' }}>

          {/* Left: contact info */}
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '22px', fontWeight: 800, color: '#0F2A4A', marginBottom: '20px' }}>Get in Touch</h2>

            {[
              { icon: '📧', title: 'General Inquiries', desc: 'Questions about tools, features, or partnerships' },
              { icon: '⚖️', title: 'Legal & DMCA', desc: 'Copyright claims, DMCA notices, legal matters' },
              { icon: '🐛', title: 'Bug Reports', desc: 'Found a bug or technical issue?' },
              { icon: '🤝', title: 'Business & Partnerships', desc: 'Sponsorships, partnerships, press inquiries' },
            ].map(c => (
              <div key={c.title} style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '16px 18px', marginBottom: '12px', display: 'flex', gap: '14px', alignItems: 'flex-start', boxShadow: '0 2px 8px rgba(15,42,74,0.04)' }}>
                <div style={{ width: '40px', height: '40px', background: '#FFF7ED', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '2px' }}>{c.title}</div>
                  <a href="mailto:support@convertdox.com" style={{ fontSize: '13.5px', color: '#E85D04', fontWeight: 600, textDecoration: 'none' }}>support@convertdox.com</a>
                  <div style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '2px' }}>{c.desc}</div>
                </div>
              </div>
            ))}

            <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '18px', marginTop: '8px' }}>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F2A4A', marginBottom: '10px' }}>⏱ Response Times</div>
              {[
                { type: 'General questions', time: 'Within 24–48 hours' },
                { type: 'Bug reports', time: 'Within 24 hours' },
                { type: 'DMCA / Legal', time: 'Within 48 hours' },
                { type: 'Security issues', time: 'Within 48 hours' },
              ].map(r => (
                <div key={r.type} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}>
                  <span style={{ color: '#64748b' }}>{r.type}</span>
                  <span style={{ fontWeight: 600, color: '#0F2A4A' }}>{r.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '20px', padding: '28px', boxShadow: '0 8px 32px rgba(15,42,74,0.07)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '56px', marginBottom: '16px' }}>✅</div>
                <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '24px', fontWeight: 800, color: '#0F2A4A', marginBottom: '10px' }}>Email Ready to Send</h2>
                <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.7', marginBottom: '20px' }}>
                  Your email client should have opened with your message. If not, email us directly:
                </p>
                <a href="mailto:support@convertdox.com"
                  style={{ display: 'inline-block', background: '#E85D04', color: 'white', padding: '14px 32px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '15px' }}>
                  support@convertdox.com
                </a>
                <div style={{ marginTop: '24px' }}>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: 'General Question', message: '' }) }}
                    style={{ background: 'white', border: '1.5px solid #e2e8f0', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: '#0F2A4A', fontWeight: 600, fontFamily: 'inherit' }}>
                    ← Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '22px', fontWeight: 800, color: '#0F2A4A', margin: '0 0 20px' }}>Send a Message</h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>Your Name <span style={{ color: '#E85D04' }}>*</span></label>
                    <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" style={inp} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>Email Address <span style={{ color: '#E85D04' }}>*</span></label>
                    <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" style={inp} />
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>Subject <span style={{ color: '#E85D04' }}>*</span></label>
                  <select required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} style={inp}>
                    <option value="General Question">General Question</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Tool Not Working">Tool Not Working</option>
                    <option value="Privacy / Data Question">Privacy / Data Question</option>
                    <option value="DMCA / Copyright">DMCA / Copyright</option>
                    <option value="Partnership Inquiry">Partnership Inquiry</option>
                    <option value="Business Inquiry">Business Inquiry</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>Message <span style={{ color: '#E85D04' }}>*</span></label>
                  <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your question or issue in detail..."
                    rows={6}
                    style={{ ...inp, resize: 'vertical', lineHeight: '1.6' }} />
                </div>

                <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 14px', fontSize: '12.5px', color: '#64748b', display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <span>🔒</span>
                  <span>Your message will open your email client addressed to <strong>support@convertdox.com</strong>. We do not share your contact information. See our <a href="/privacy-policy" style={{ color: '#E85D04' }}>Privacy Policy</a>.</span>
                </div>

                <button type="submit" disabled={disabled}
                  style={{ width: '100%', background: disabled ? '#94a3b8' : '#E85D04', color: 'white', border: 'none', padding: '15px', borderRadius: '12px', fontFamily: 'inherit', fontSize: '16px', fontWeight: 700, cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all 0.15s' }}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
