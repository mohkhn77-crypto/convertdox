'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

export default function UuidBulkPage() {
  const [count, setCount] = useState(10)
  const [uppercase, setUppercase] = useState(false)
  const [hyphens, setHyphens] = useState(true)
  const [braces, setBraces] = useState(false)
  const [uuids, setUuids] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  function formatUuid(raw: string): string {
    let u = raw
    if (!hyphens) u = u.replace(/-/g, '')
    if (uppercase) u = u.toUpperCase()
    if (braces) u = `{${u}}`
    return u
  }

  function generate() {
    const result: string[] = []
    for (let i = 0; i < count; i++) {
      result.push(formatUuid(crypto.randomUUID()))
    }
    setUuids(result)
  }

  function copyAll() {
    navigator.clipboard.writeText(uuids.join('\n')).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function download(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/plain' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = filename
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🆔</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>UUID Bulk Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Generate up to 1000 UUIDs at once with formatting options</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '20px', padding: '28px', marginBottom: '24px' }}>

          {/* Count */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ fontSize: '14px', fontWeight: 700, color: '#0F2A4A' }}>Count</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="number" min="1" max="1000" value={count} onChange={e => setCount(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))}
                  style={{ width: '80px', padding: '8px 10px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '15px', fontWeight: 700, textAlign: 'center', boxSizing: 'border-box' as const }} />
              </div>
            </div>
            <input type="range" min="1" max="1000" value={count} onChange={e => setCount(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#E85D04', cursor: 'pointer' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
              <span>1</span><span>1000</span>
            </div>
          </div>

          {/* Options */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            {[
              { label: 'UPPERCASE', value: uppercase, onChange: setUppercase },
              { label: 'With hyphens', value: hyphens, onChange: setHyphens },
              { label: 'Braces {}', value: braces, onChange: setBraces },
            ].map(opt => (
              <button key={opt.label} onClick={() => opt.onChange(!opt.value)}
                style={{ padding: '12px', border: '2px solid', borderColor: opt.value ? '#0F2A4A' : '#e2e8f0', borderRadius: '10px', background: opt.value ? '#0F2A4A' : 'white', color: opt.value ? 'white' : '#64748b', fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                {opt.value ? '✓ ' : ''}{opt.label}
              </button>
            ))}
          </div>

          <button onClick={generate} style={{ width: '100%', padding: '16px', background: '#E85D04', color: 'white', border: 'none', borderRadius: '12px', fontFamily: 'inherit', fontSize: '16px', fontWeight: 800, cursor: 'pointer' }}>
            🔑 Generate {count} UUID{count > 1 ? 's' : ''}
          </button>
        </div>

        {uuids.length > 0 && (
          <div>
            {/* Stats */}
            <div style={{ background: '#0F2A4A', borderRadius: '12px', padding: '14px 20px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>{uuids.length} UUIDs generated</span>
              <span style={{ fontFamily: 'monospace', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>v4 (random)</span>
            </div>

            {/* Textarea */}
            <textarea
              readOnly
              value={uuids.join('\n')}
              rows={Math.min(15, uuids.length + 1)}
              style={{ width: '100%', padding: '16px', border: '1.5px solid #e2e8f0', borderRadius: '14px', fontFamily: 'monospace', fontSize: '13px', color: '#374151', background: '#f8fafc', boxSizing: 'border-box' as const, resize: 'vertical' as const, marginBottom: '12px' }}
            />

            {/* Export buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '10px' }}>
              <button onClick={copyAll} style={{ padding: '12px', background: copied ? '#dcfce7' : '#0F2A4A', color: copied ? '#16a34a' : 'white', border: 'none', borderRadius: '10px', fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                {copied ? '✅ Copied!' : '📋 Copy All'}
              </button>
              <button onClick={() => download(uuids.join('\n'), 'uuids.txt')} style={{ padding: '12px', background: 'white', color: '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                ⬇️ Download .txt
              </button>
              <button onClick={() => download(JSON.stringify(uuids, null, 2), 'uuids.json')} style={{ padding: '12px', background: 'white', color: '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                ⬇️ Download .json
              </button>
              <button onClick={() => download(uuids.join('\n'), 'uuids.csv')} style={{ padding: '12px', background: 'white', color: '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                ⬇️ Download .csv
              </button>
              <button onClick={() => download(`const uuids = ${JSON.stringify(uuids, null, 2)}`, 'uuids.js')} style={{ padding: '12px', background: 'white', color: '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                ⬇️ Download .js
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
