'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

function toSlug(text: string, sep: string, maxLen: number, prefix: string, suffix: string): string {
  let slug = text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, sep)
  if (prefix) slug = prefix + sep + slug
  if (suffix) slug = slug + sep + suffix
  slug = slug.replace(new RegExp(`\\${sep}+`, 'g'), sep).replace(new RegExp(`^\\${sep}|\\${sep}$`, 'g'), '')
  if (maxLen > 0) slug = slug.slice(0, maxLen).replace(new RegExp(`\\${sep}$`), '')
  return slug
}

export default function TextToSlugPage() {
  const [input, setInput] = useState('')
  const [separator, setSeparator] = useState('-')
  const [maxLen, setMaxLen] = useState(100)
  const [prefix, setPrefix] = useState('')
  const [suffix, setSuffix] = useState('')
  const [copied, setCopied] = useState(false)

  const lines = input.split('\n').filter(l => l.trim().length > 0)
  const slugs = lines.map(l => ({ original: l, slug: toSlug(l, separator, maxLen, prefix, suffix) }))

  const allSlugs = slugs.map(s => s.slug).join('\n')

  const copyAll = () => {
    navigator.clipboard.writeText(allSlugs)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const exportCSV = () => {
    const csv = 'slug,original\n' + slugs.map(s => `"${s.slug}","${s.original.replace(/"/g, '""')}"`).join('\n')
    const a = document.createElement('a')
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
    a.download = 'slugs.csv'
    a.click()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🔗</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Text to Slug</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Batch URL-friendly slug generator from text</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Options row */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' as const, marginBottom: '20px', alignItems: 'flex-end' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px', display: 'block' }}>Separator</label>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['-', '_', '.'].map(s => (
                <button key={s} onClick={() => setSeparator(s)}
                  style={{ padding: '8px 16px', borderRadius: '8px', border: '1.5px solid', borderColor: separator === s ? '#E85D04' : '#e2e8f0', background: separator === s ? '#E85D04' : 'white', color: separator === s ? 'white' : '#0F2A4A', fontFamily: 'monospace', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px', display: 'block' }}>Max Length</label>
            <input type="number" value={maxLen} onChange={e => setMaxLen(Number(e.target.value))} min={1} max={500}
              style={{ width: '80px', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px', display: 'block' }}>Prefix</label>
            <input type="text" value={prefix} onChange={e => setPrefix(e.target.value)} placeholder="e.g. blog"
              style={{ width: '120px', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px', display: 'block' }}>Suffix</label>
            <input type="text" value={suffix} onChange={e => setSuffix(e.target.value)} placeholder="e.g. page"
              style={{ width: '120px', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px', display: 'block' }}>Input (one title per line)</label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={'My Blog Post Title\nHello World Example\nÁccented Chàracters Work'}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical' as const, outline: 'none', boxSizing: 'border-box' as const, minHeight: '280px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px', display: 'block' }}>Slugs</label>
            <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '12px 16px', minHeight: '280px', fontFamily: 'monospace', fontSize: '14px', color: '#0F2A4A' }}>
              {slugs.length === 0 ? (
                <span style={{ color: '#94a3b8' }}>Slugs will appear here...</span>
              ) : (
                slugs.map((s, i) => (
                  <div key={i} style={{ padding: '4px 0', borderBottom: i < slugs.length - 1 ? '1px solid #e2e8f0' : 'none', color: '#E85D04' }}>{s.slug}</div>
                ))
              )}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
          <button onClick={copyAll}
            style={{ background: copied ? '#16A34A' : '#E85D04', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            {copied ? '✓ Copied!' : 'Copy All Slugs'}
          </button>
          <button onClick={exportCSV}
            style={{ background: 'white', color: '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            Export CSV
          </button>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
