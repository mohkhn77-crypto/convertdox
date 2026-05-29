'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

const LANGUAGES = ['English','Spanish','French','German','Italian','Portuguese','Russian','Chinese','Japanese','Korean','Arabic','Hindi','Dutch','Polish','Turkish','Vietnamese','Thai','Indonesian','Swedish','Danish','Norwegian','Finnish','Greek','Czech','Romanian','Hungarian','Hebrew','Ukrainian','Malay','Tagalog']

export default function AITranslator() {
  const [text, setText] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('Spanish')
  const [sourceLanguage, setSourceLanguage] = useState('auto')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleSubmit() {
    if (text.trim().length < 2) { setError('Please enter text to translate'); return }
    setLoading(true); setError(''); setResult('')
    try {
      const res = await fetch(`${BACKEND}/api/ai/translate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLanguage, sourceLanguage }),
      })
      const data = await res.json() as { translated?: string; error?: string }
      if (!res.ok) throw new Error(data.error || 'Translation failed')
      setResult(data.translated ?? '')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally { setLoading(false) }
  }

  function copy() { navigator.clipboard.writeText(result).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }) }

  const selStyle = { width:'100%', padding:'10px 14px', border:'1.5px solid #e2e8f0', borderRadius:'10px', fontSize:'14px', fontFamily:'inherit', background:'white', outline:'none', boxSizing:'border-box' as const }

  return (
    <div style={{ minHeight:'100vh', background:'#f8fafc', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'860px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(6,182,212,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>🌐</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>AI Translator</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Translate text between 30+ languages instantly.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'32px auto 0', padding:'0 24px 48px' }}>
        <div style={{ background:'white', padding:'32px', borderRadius:'16px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'20px' }}>
            <div>
              <label style={{ display:'block', fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px' }}>From</label>
              <select value={sourceLanguage} onChange={e => setSourceLanguage(e.target.value)} style={selStyle}>
                <option value="auto">Auto-detect</option>
                {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display:'block', fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px' }}>To</label>
              <select value={targetLanguage} onChange={e => setTargetLanguage(e.target.value)} style={selStyle}>
                {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <label style={{ display:'block', fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px' }}>Text to translate</label>
          <textarea value={text} onChange={e => { setText(e.target.value); setError('') }}
            placeholder="Enter text to translate..."
            style={{ width:'100%', minHeight:'180px', padding:'16px', border:'1.5px solid #e2e8f0', borderRadius:'10px', fontSize:'15px', fontFamily:'inherit', outline:'none', resize:'vertical', boxSizing:'border-box' as const }}
          />
          <div style={{ fontSize:'13px', color:'#94a3b8', marginTop:'4px' }}>{text.length.toLocaleString()} characters</div>

          <button onClick={handleSubmit} disabled={loading || text.trim().length < 2}
            style={{ marginTop:'24px', background: loading || text.trim().length < 2 ? '#cbd5e1' : '#E85D04', color:'white', border:'none', padding:'14px 32px', borderRadius:'10px', fontSize:'15px', fontWeight:700, cursor: loading || text.trim().length < 2 ? 'not-allowed' : 'pointer', fontFamily:'inherit' }}>
            {loading ? '⏳ Translating…' : '🌐 Translate'}
          </button>

          {error && <div style={{ marginTop:'20px', padding:'14px 18px', background:'#FEF2F2', border:'1.5px solid #FECACA', borderRadius:'10px', color:'#DC2626', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}

          {result && (
            <div style={{ marginTop:'24px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
                <h3 style={{ fontSize:'16px', fontWeight:700, color:'#0F2A4A', margin:0 }}>Translation — {targetLanguage}</h3>
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
