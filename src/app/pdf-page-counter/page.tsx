'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

interface Result { pageCount: number; fileSize: string; fileName: string }

function fmtBytes(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1048576).toFixed(2) + ' MB'
}

export default function PDFPageCounterPage() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(f: File | null) {
    if (!f) return
    if (f.type !== 'application/pdf') { setError('Please upload a PDF file'); return }
    if (f.size > 100 * 1024 * 1024) { setError('File is too large. Maximum size is 100 MB'); return }
    setFile(f); setResult(null); setError('')
  }

  async function countPages() {
    if (!file) return
    setLoading(true); setError('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch(`${BACKEND_URL}/api/utility/pdf-page-counter`, {
        method: 'POST',
        body: formData
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({ error: 'Unknown error' })) as { error?: string }
        throw new Error(d.error || `Server error: ${res.status}`)
      }
      const data = await res.json() as Result
      setResult(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to count pages. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📄</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>PDF Page Counter</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Count the exact number of pages in any PDF file instantly</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '700px', margin: '40px auto 0', padding: '0 20px 60px' }}>

        {/* Drop zone */}
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
          style={{
            background: dragOver ? '#FFF7ED' : 'white',
            border: `2px dashed ${dragOver ? '#E85D04' : file ? '#0F2A4A' : '#cbd5e1'}`,
            borderRadius: '16px',
            padding: '56px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            marginBottom: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
          <div style={{ fontSize: '52px', marginBottom: '16px' }}>{file ? '📄' : '⬆️'}</div>
          {file ? (
            <>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>{file.name}</div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>{fmtBytes(file.size)} · Click to change file</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Drop your PDF here</div>
              <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>or click to browse from your computer</div>
              <button style={{ background: '#E85D04', color: 'white', padding: '10px 28px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                Select PDF File
              </button>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '12px' }}>PDF only · Max 100 MB</div>
            </>
          )}
          <input ref={fileRef} type="file" accept="application/pdf" style={{ display: 'none' }} onChange={e => handleFile(e.target.files?.[0] ?? null)} />
        </div>

        {error && <div style={{ background: '#FEE2E2', border: '1.5px solid #FCA5A5', borderRadius: '10px', padding: '12px 16px', color: '#991B1B', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>⚠️ {error}</div>}

        {file && !result && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button onClick={countPages} disabled={loading}
              style={{ background: loading ? '#94a3b8' : '#E85D04', color: 'white', border: 'none', padding: '14px 40px', borderRadius: '10px', fontSize: '16px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
              {loading ? '⏳ Counting Pages…' : '📄 Count Pages'}
            </button>
          </div>
        )}

        {result && (
          <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '20px', padding: '32px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Page Count</div>
            <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(56px,10vw,96px)', fontWeight: 900, color: '#0F2A4A', lineHeight: 1, marginBottom: '16px' }}>
              {result.pageCount}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#E85D04', marginBottom: '8px' }}>
              {result.pageCount === 1 ? '1 Page' : `${result.pageCount} Pages`}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '20px', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>File Name</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginTop: '4px', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{result.fileName}</div>
              </div>
              {result.fileSize && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>File Size</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginTop: '4px' }}>{result.fileSize}</div>
                </div>
              )}
            </div>
            <button onClick={() => { setFile(null); setResult(null) }}
              style={{ marginTop: '20px', background: 'white', color: '#64748b', border: '1.5px solid #e2e8f0', borderRadius: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              Count Another PDF
            </button>
          </div>
        )}

        <div style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: '12px', padding: '14px 16px', marginBottom: '40px', fontSize: '13px', color: '#166534' }}>
          🔒 <strong>Privacy:</strong> Your PDF is sent to our server only to count pages — it is automatically deleted within 1 hour. No content is read or stored.
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F2A4A', marginBottom: '16px' }}>PDF Page Counter — Instant & Accurate</h2>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            Need to know exactly how many pages are in a PDF? Our free PDF page counter gives you an instant, accurate count without needing to open the file in a PDF viewer. This is especially useful for large documents, scanned books, legal filings, or print job estimation.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            Simply upload your PDF file (up to 100 MB), click &quot;Count Pages,&quot; and you&apos;ll get the exact page count along with the file name and size within seconds. The tool works with any valid PDF file including scanned documents, encrypted PDFs (if not password-protected), multi-section PDFs, and PDFs with embedded fonts or images.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8 }}>
            Common use cases: calculating printing costs (many print shops charge per page), verifying document completeness before submission, checking if a PDF was corrupted or truncated, and estimating reading or processing time. Our PDF page counter is 100% free with no account required.
          </p>
        </div>
      </div>
    </div>
  )
}
