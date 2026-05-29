'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

const inp = { width:'100%', padding:'12px 14px', border:'1.5px solid #e2e8f0', borderRadius:'10px', fontSize:'14px', fontFamily:'inherit', outline:'none', boxSizing:'border-box' as const }

export default function EmailWriter() {
  const [purpose, setPurpose] = useState('')
  const [recipient, setRecipient] = useState('')
  const [tone, setTone] = useState('professional')
  const [context, setContext] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleSubmit() {
    if (purpose.trim().length < 10) { setError("Please describe the email's purpose (at least 10 characters)"); return }
    setLoading(true); setError(''); setResult('')
    try {
      const res = await fetch(`${BACKEND}/api/ai/email`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ purpose, recipient, tone, context }),
      })
      const data = await res.json() as { email?: string; error?: string }
      if (!res.ok) throw new Error(data.error || 'Failed to write email')
      setResult(data.email ?? '')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally { setLoading(false) }
  }

  function copy() { navigator.clipboard.writeText(result).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }) }

  return (
    <div style={{ minHeight:'100vh', background:'#f8fafc', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'860px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(245,158,11,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>✉</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>AI Email Writer</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Write professional emails for any purpose in seconds.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'32px auto 0', padding:'0 24px 48px' }}>
        <div style={{ background:'white', padding:'32px', borderRadius:'16px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ marginBottom:'20px' }}>
            <label style={{ display:'block', fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px' }}>What is this email about? <span style={{ color:'#E85D04' }}>*</span></label>
            <textarea value={purpose} onChange={e => setPurpose(e.target.value)}
              placeholder="e.g. Requesting a meeting to discuss Q3 project progress..."
              style={{ ...inp, minHeight:'100px', resize:'vertical' }} />
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'20px' }}>
            <div>
              <label style={{ display:'block', fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px' }}>Recipient <span style={{ color:'#94a3b8', fontWeight:400 }}>(optional)</span></label>
              <input type="text" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="e.g. my manager, a client, HR" style={inp} />
            </div>
            <div>
              <label style={{ display:'block', fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px' }}>Tone</label>
              <select value={tone} onChange={e => setTone(e.target.value)}
                style={{ ...inp, background:'white', cursor:'pointer' }}>
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="friendly">Friendly</option>
                <option value="formal">Formal</option>
                <option value="apologetic">Apologetic</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom:'24px' }}>
            <label style={{ display:'block', fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px' }}>Additional context <span style={{ color:'#94a3b8', fontWeight:400 }}>(optional)</span></label>
            <textarea value={context} onChange={e => setContext(e.target.value)}
              placeholder="Any other details, deadlines, or background information..."
              style={{ ...inp, minHeight:'100px', resize:'vertical' }} />
          </div>

          <button onClick={handleSubmit} disabled={loading || purpose.trim().length < 10}
            style={{ background: loading || purpose.trim().length < 10 ? '#cbd5e1' : '#E85D04', color:'white', border:'none', padding:'14px 32px', borderRadius:'10px', fontSize:'15px', fontWeight:700, cursor: loading || purpose.trim().length < 10 ? 'not-allowed' : 'pointer', fontFamily:'inherit' }}>
            {loading ? '⏳ Writing…' : '✉ Write Email'}
          </button>

          {error && <div style={{ marginTop:'20px', padding:'14px 18px', background:'#FEF2F2', border:'1.5px solid #FECACA', borderRadius:'10px', color:'#DC2626', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}

          {result && (
            <div style={{ marginTop:'24px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
                <h3 style={{ fontSize:'16px', fontWeight:700, color:'#0F2A4A', margin:0 }}>Your Email</h3>
                <button onClick={copy} style={{ background:'white', border:'1.5px solid #e2e8f0', padding:'6px 14px', borderRadius:'8px', fontSize:'13px', cursor:'pointer', fontWeight:600, color: copied ? '#166534' : '#0F2A4A', fontFamily:'inherit' }}>
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
              <div style={{ padding:'24px', background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'10px', whiteSpace:'pre-wrap' as const, lineHeight:1.8, fontSize:'15px', color:'#334155' }}>
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
