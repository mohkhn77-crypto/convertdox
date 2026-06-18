'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'
import DeleteFileNowButton from '@/components/DeleteFileNowButton'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || ''

type PageItem = {
  id: string
  originalPage: number
  rotation: number
}

export default function PdfEditorPage() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [fileName, setFileName] = useState('')
  const [pages, setPages] = useState<PageItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [deletedMessage, setDeletedMessage] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function buildPages(count: number): PageItem[] {
    return Array.from({ length: count }, (_, i) => ({
      id: `page-${i + 1}-${Date.now()}`,
      originalPage: i + 1,
      rotation: 0,
    }))
  }

  function resetAll() {
    setSessionId(null)
    setPageCount(0)
    setFileName('')
    setPages([])
    setError('')
    setDragIndex(null)
    setDragOverIndex(null)
  }

  async function handleFile(file: File | null) {
    if (!file) return
    if (file.type !== 'application/pdf') { setError('Only PDF files are accepted'); return }
    setError('')
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch(`${BACKEND}/api/pdf/editor/upload-session`, { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Upload failed' })) as { error?: string }
        throw new Error(data.error ?? `Server error ${res.status}`)
      }
      const data = await res.json() as { sessionId: string; pageCount: number; fileName: string; fileSize: number }
      setSessionId(data.sessionId)
      setPageCount(data.pageCount)
      setFileName(data.fileName)
      setPages(buildPages(data.pageCount))
      setDeletedMessage(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  function rotatePage(index: number) {
    setPages(prev => prev.map((p, i) =>
      i === index ? { ...p, rotation: (p.rotation + 90) % 360 } : p
    ))
  }

  function deletePage(index: number) {
    setPages(prev => prev.filter((_, i) => i !== index))
  }

  function resetPages() {
    setPages(buildPages(pageCount))
    setError('')
  }

  async function applyAndDownload() {
    if (!sessionId || pages.length === 0) return
    setProcessing(true)
    setError('')
    try {
      const res = await fetch(`${BACKEND}/api/pdf/editor/process/${sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operations: pages.map(p => ({ originalPage: p.originalPage, rotation: p.rotation }))
        })
      })
      const contentType = res.headers.get('content-type') ?? ''
      if (!res.ok || !contentType.includes('application/pdf')) {
        const data = await res.json().catch(() => ({ error: 'Processing failed' })) as { error?: string }
        throw new Error(data.error ?? `Server error ${res.status}`)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'edited.pdf'
      document.body.appendChild(a)
      a.click()
      URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing failed. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  function onDragStart(index: number) {
    setDragIndex(index)
  }

  function onDragOver(e: React.DragEvent, index: number) {
    e.preventDefault()
    setDragOverIndex(index)
  }

  function onDrop(e: React.DragEvent, dropIndex: number) {
    e.preventDefault()
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null)
      setDragOverIndex(null)
      return
    }
    setPages(prev => {
      const next = [...prev]
      const [moved] = next.splice(dragIndex, 1)
      next.splice(dropIndex, 0, moved)
      return next
    })
    setDragIndex(null)
    setDragOverIndex(null)
  }

  function onDragEnd() {
    setDragIndex(null)
    setDragOverIndex(null)
  }

  const fmt = (b: number) => b < 1_048_576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1_048_576).toFixed(1)} MB`

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>✂️</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>PDF Editor</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Rotate, reorder, and delete PDF pages — then download the result</p>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px 24px 0' }}>
        <div style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' as const, justifyContent: 'center' }}>
          {[{ icon: '🔒', text: 'Files auto-deleted within 1 hour' }, { icon: '🛡', text: 'HTTPS encrypted' }, { icon: '⚡', text: 'No signup required' }, { icon: '🆓', text: '100% free' }].map(item => (
            <span key={item.text} style={{ fontSize: '13px', color: '#166534', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '16px' }}>{item.icon}</span>{item.text}
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '32px auto 0', padding: '0 24px 64px' }}>

        {/* Upload screen */}
        {!sessionId && (
          <>
            {deletedMessage && (
              <div style={{ marginBottom: '20px', background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: '12px', padding: '12px 16px', color: '#166534', fontSize: '14px', fontWeight: 600 }}>
                ✓ Your file was permanently deleted from our servers.
              </div>
            )}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor = '#E85D04'; (e.currentTarget as HTMLDivElement).style.background = '#FFF7ED' }}
              onDragLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background = '#f8fafc' }}
              onDrop={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor = '#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background = '#f8fafc'; handleFile(e.dataTransfer.files[0] ?? null) }}
              style={{ background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '16px', padding: '64px 24px', textAlign: 'center' as const, cursor: uploading ? 'default' : 'pointer', transition: 'all 0.2s' }}
            >
              {uploading ? (
                <>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>⏳</div>
                  <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '20px', fontWeight: 700, color: '#0F2A4A' }}>Uploading…</div>
                  <div style={{ fontSize: '14px', color: '#64748b', marginTop: '6px' }}>This may take a moment for large files</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '56px', marginBottom: '12px' }}>📄</div>
                  <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '20px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>Drop your PDF here</div>
                  <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '18px' }}>or click to browse from your computer</div>
                  <button style={{ background: '#E85D04', color: 'white', padding: '12px 32px', borderRadius: '10px', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Select PDF</button>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '12px' }}>PDF files only · Max 50 MB</div>
                </>
              )}
              <input ref={fileInputRef} type="file" accept="application/pdf" style={{ display: 'none' }} onChange={e => handleFile(e.target.files?.[0] ?? null)} />
            </div>
            {error && (
              <div style={{ marginTop: '16px', background: '#FEE2E2', border: '1.5px solid #FCA5A5', borderRadius: '10px', padding: '12px 16px', color: '#991B1B', fontSize: '14px', fontWeight: 600 }}>⚠️ {error}</div>
            )}
          </>
        )}

        {/* Editor screen */}
        {sessionId && (
          <>
            {/* File info + controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' as const }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                <div style={{ width: '40px', height: '40px', background: '#FEE2E2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DC2626', fontWeight: 700, fontSize: '11px', flexShrink: 0 }}>PDF</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F2A4A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{fileName}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>{pageCount} pages</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
                <button
                  onClick={resetPages}
                  style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#0F2A4A', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  ↺ Reset
                </button>
                <button
                  onClick={applyAndDownload}
                  disabled={processing || pages.length === 0}
                  style={{ background: processing || pages.length === 0 ? '#cbd5e1' : '#E85D04', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: 700, cursor: processing || pages.length === 0 ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}
                >
                  {processing ? '⏳ Processing…' : '⬇️ Apply & Download'}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ marginBottom: '16px', background: '#FEE2E2', border: '1.5px solid #FCA5A5', borderRadius: '10px', padding: '12px 16px', color: '#991B1B', fontSize: '14px', fontWeight: 600 }}>⚠️ {error}</div>
            )}

            {pages.length === 0 && (
              <div style={{ textAlign: 'center' as const, padding: '48px', color: '#94a3b8', fontSize: '14px' }}>
                All pages have been deleted. Use Reset to restore them, or Apply &amp; Download to save an empty result.
              </div>
            )}

            {/* Privacy note */}
            <div style={{ marginBottom: '20px', fontSize: '12px', color: '#94a3b8', lineHeight: 1.5 }}>
              Your file is held securely on our server only while you edit (auto-deletes within 1 hour). Use &quot;Delete my file now&quot; to remove it instantly.
            </div>

            {/* Page grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '16px', marginBottom: '32px' }}>
              {pages.map((page, index) => (
                <div
                  key={page.id}
                  draggable
                  onDragStart={() => onDragStart(index)}
                  onDragOver={e => onDragOver(e, index)}
                  onDrop={e => onDrop(e, index)}
                  onDragEnd={onDragEnd}
                  style={{
                    background: 'white',
                    border: `2px solid ${dragOverIndex === index && dragIndex !== index ? '#E85D04' : '#e2e8f0'}`,
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column' as const,
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'grab',
                    opacity: dragIndex === index ? 0.4 : 1,
                    transition: 'border-color 0.15s, opacity 0.15s',
                    boxShadow: '0 2px 8px rgba(15,42,74,0.06)',
                    userSelect: 'none' as const,
                  }}
                >
                  {/* Page image */}
                  <div style={{ width: '100%', aspectRatio: '3/4', background: '#f8fafc', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                      src={`${BACKEND}/api/pdf/editor/page-image/${sessionId}/${page.originalPage}`}
                      alt={`Page ${page.originalPage}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        transform: `rotate(${page.rotation}deg)`,
                        transition: 'transform 0.2s',
                      }}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; (e.currentTarget.parentElement as HTMLDivElement).innerHTML = '<div style="font-size:32px;color:#cbd5e1">📄</div>' }}
                    />
                  </div>

                  {/* Label */}
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Page {page.originalPage}</div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
                    <button
                      onClick={() => rotatePage(index)}
                      title="Rotate 90°"
                      style={{ flex: 1, background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '6px', padding: '5px', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      🔄
                    </button>
                    <button
                      onClick={() => deletePage(index)}
                      title="Remove page"
                      style={{ flex: 1, background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: '6px', padding: '5px', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Delete session */}
            <DeleteFileNowButton
              sessionId={sessionId}
              onDeleted={() => {
                resetAll()
                setDeletedMessage(true)
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}
