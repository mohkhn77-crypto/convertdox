'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import RelatedTools from '@/components/RelatedTools'
import TrustStrip from '@/components/TrustStrip'

function b64urlDecode(str: string): string {
  try {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4)
    return atob(padded)
  } catch {
    return ''
  }
}

function syntaxHighlight(json: string): string {
  return json
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
      let cls = 'color:#16A34A'
      if (/^"/.test(match)) {
        if (/:$/.test(match)) cls = 'color:#E85D04;font-weight:600'
        else cls = 'color:#16A34A'
      } else if (/true|false/.test(match)) {
        cls = 'color:#7C3AED'
      } else if (/null/.test(match)) {
        cls = 'color:#94a3b8'
      } else {
        cls = 'color:#0284C7'
      }
      return `<span style="${cls}">${match}</span>`
    })
}

const SAMPLE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

export default function JWTDecoderPage() {
  const [token, setToken] = useState(SAMPLE_JWT)
  const [copied, setCopied] = useState<string | null>(null)

  function decode() {
    const parts = token.trim().split('.')
    if (parts.length !== 3) return null
    try {
      const header = JSON.parse(b64urlDecode(parts[0]))
      const payload = JSON.parse(b64urlDecode(parts[1]))
      const sig = parts[2]
      const exp = payload.exp ? new Date(payload.exp * 1000) : null
      const expired = exp ? exp < new Date() : null
      return { header, payload, sig, exp, expired }
    } catch {
      return null
    }
  }

  const decoded = decode()

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const JsonBlock = ({ obj, label, keyName }: { obj: object; label: string; keyName: string }) => (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>{label}</div>
        <button onClick={() => copy(JSON.stringify(obj, null, 2), keyName)}
          style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', background: copied === keyName ? '#16A34A' : 'white', color: copied === keyName ? 'white' : '#64748b', cursor: 'pointer', fontFamily: 'inherit' }}>
          {copied === keyName ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre style={{ background: '#0F2A4A', borderRadius: '10px', padding: '16px', margin: 0, overflowX: 'auto', fontSize: '13px', lineHeight: '1.6' }}
        dangerouslySetInnerHTML={{ __html: syntaxHighlight(JSON.stringify(obj, null, 2)) }} />
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🔐</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>JWT Decoder</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Decode and inspect JSON Web Tokens instantly</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 700, color: '#0F2A4A' }}>JWT Token</div>
        <textarea value={token} onChange={e => setToken(e.target.value)} rows={4}
          placeholder="Paste your JWT token here..."
          style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontFamily: 'monospace', resize: 'vertical', outline: 'none', boxSizing: 'border-box' as const, wordBreak: 'break-all' }} />

        {/* Token parts visualization */}
        {token.trim().split('.').length === 3 && (
          <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', marginTop: '12px', fontSize: '12px', fontFamily: 'monospace', wordBreak: 'break-all', flexWrap: 'wrap' }}>
            {token.trim().split('.').map((part, i) => (
              <span key={i} style={{ padding: '3px 6px', borderRadius: '4px', background: [' #FEF3C7', '#DCFCE7', '#EDE9FE'][i], color: ['#D97706', '#15803D', '#5B21B6'][i], fontWeight: 600 }}>
                {part}
              </span>
            ))}
          </div>
        )}

        {decoded ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(400px,1fr))', gap: '20px' }}>
            <div>
              <JsonBlock obj={decoded.header} label="Header" keyName="header" />
              <JsonBlock obj={decoded.payload} label="Payload" keyName="payload" />
            </div>
            <div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Signature</div>
                <div style={{ background: '#0F2A4A', borderRadius: '10px', padding: '16px', fontFamily: 'monospace', fontSize: '13px', color: '#94a3b8', wordBreak: 'break-all' }}>{decoded.sig}</div>
              </div>
              {decoded.exp && (
                <div style={{ background: decoded.expired ? '#FEE2E2' : '#DCFCE7', border: `1.5px solid ${decoded.expired ? '#DC2626' : '#16A34A'}`, borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: decoded.expired ? '#DC2626' : '#15803D', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {decoded.expired ? 'Token Expired' : 'Token Valid'}
                  </div>
                  <div style={{ fontSize: '14px', color: decoded.expired ? '#DC2626' : '#15803D' }}>
                    Expires: {decoded.exp.toLocaleString()}
                  </div>
                </div>
              )}
              <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F2A4A', marginBottom: '10px' }}>Token Info</div>
                {[
                  { key: 'Algorithm', val: decoded.header.alg as string || 'Unknown' },
                  { key: 'Type', val: decoded.header.typ as string || 'JWT' },
                  { key: 'Subject', val: (decoded.payload.sub as string) || '—' },
                  { key: 'Issuer', val: (decoded.payload.iss as string) || '—' },
                ].map(item => (
                  <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e2e8f0', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>{item.key}</span>
                    <span style={{ fontWeight: 600, color: '#0F2A4A' }}>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : token.trim() ? (
          <div style={{ background: '#FEE2E2', border: '1.5px solid #DC2626', borderRadius: '10px', padding: '14px', color: '#DC2626', fontSize: '14px', fontWeight: 600 }}>
            Invalid JWT token. A valid JWT has 3 parts separated by dots.
          </div>
        ) : null}
      </div>
      <RelatedTools currentPath="/jwt-decoder" />
    </div>
  )
}
