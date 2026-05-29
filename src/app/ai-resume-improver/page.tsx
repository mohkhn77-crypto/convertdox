'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

export default function ResumeImprover() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleSubmit() {
    if (text.trim().length < 20) { setError('Please enter at least 20 characters'); return }
    setLoading(true); setError(''); setResult('')
    try {
      const res = await fetch(`${BACKEND}/api/ai/resume-improve`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const data = await res.json() as { improved?: string; error?: string }
      if (!res.ok) throw new Error(data.error || 'Failed to improve resume')
      setResult(data.improved ?? '')
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
          <div style={{ width:'56px', height:'56px', background:'rgba(43,87,154,0.25)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>📄</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>AI Resume Improver</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Transform basic resume bullets into powerful, results-driven achievements.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'32px auto 0', padding:'0 24px 48px' }}>
        <div style={{ background:'white', padding:'32px', borderRadius:'16px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ background:'#EFF6FF', border:'1px solid #BFDBFE', borderRadius:'10px', padding:'12px 16px', marginBottom:'24px', fontSize:'13px', color:'#1E40AF' }}>
            💡 <strong>Tip:</strong> Paste your resume bullet points one per line. The AI will rewrite them to be more impactful with action verbs and quantifiable results.
          </div>

          <label style={{ display:'block', fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px' }}>Resume bullet points</label>
          <textarea
            value={text} onChange={e => { setText(e.target.value); setError('') }}
            placeholder={"Paste your resume bullet points here (one per line)...\n\nExamples:\n- Managed a team\n- Worked on sales\n- Helped with customer service"}
            style={{ width:'100%', minHeight:'220px', padding:'16px', border:'1.5px solid #e2e8f0', borderRadius:'10px', fontSize:'15px', fontFamily:'inherit', outline:'none', resize:'vertical', boxSizing:'border-box' as const }}
          />
          <div style={{ fontSize:'13px', color:'#94a3b8', marginTop:'4px' }}>{text.length.toLocaleString()} characters</div>

          <button onClick={handleSubmit} disabled={loading || text.trim().length < 20}
            style={{ marginTop:'24px', background: loading || text.trim().length < 20 ? '#cbd5e1' : '#E85D04', color:'white', border:'none', padding:'14px 32px', borderRadius:'10px', fontSize:'15px', fontWeight:700, cursor: loading || text.trim().length < 20 ? 'not-allowed' : 'pointer', fontFamily:'inherit' }}>
            {loading ? '⏳ Improving…' : '📄 Improve Resume'}
          </button>

          {error && <div style={{ marginTop:'20px', padding:'14px 18px', background:'#FEF2F2', border:'1.5px solid #FECACA', borderRadius:'10px', color:'#DC2626', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}

          {result && (
            <div style={{ marginTop:'24px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
                <h3 style={{ fontSize:'16px', fontWeight:700, color:'#0F2A4A', margin:0 }}>Improved Bullets</h3>
                <button onClick={copy} style={{ background:'white', border:'1.5px solid #e2e8f0', padding:'6px 14px', borderRadius:'8px', fontSize:'13px', cursor:'pointer', fontWeight:600, color: copied ? '#166534' : '#0F2A4A', fontFamily:'inherit' }}>
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
              <div style={{ padding:'20px', background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'10px', whiteSpace:'pre-wrap' as const, lineHeight:1.7, fontSize:'15px', color:'#166534' }}>
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
