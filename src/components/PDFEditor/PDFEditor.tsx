'use client'
import { useState, useRef, useCallback } from 'react'
import { getPdfJs } from '@/lib/pdf-config'
import type { PDFDocumentProxy } from '@/lib/pdf-config'
import type { PageState, SplitRange, PDFEditorProps, UploadSessionResponse } from '@/types/pdf-editor'
import PDFThumbnail from './PDFThumbnail'
import ZoomPanel from './ZoomPanel'
import SplitRangesPanel from './SplitRangesPanel'
import EditorToolbar from './EditorToolbar'

export default function PDFEditor({ mode, features = ['delete', 'rotate', 'zoom'], toolTitle, toolDescription, onComplete, backendUrl }: PDFEditorProps) {
  const [file, setFile] = useState<File | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [pageStates, setPageStates] = useState<PageState[]>([])
  const [thumbnailCache, setThumbnailCache] = useState<Map<number, string>>(new Map())
  const [loadingThumbnails, setLoadingThumbnails] = useState(false)
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)
  const [zoomedPage, setZoomedPage] = useState<number | null>(null)
  const [splitRanges, setSplitRanges] = useState<SplitRange[]>([])
  const [isDragSelecting, setIsDragSelecting] = useState(false)
  const [dragStartIdx, setDragStartIdx] = useState<number | null>(null)

  const pdfRef = useRef<PDFDocumentProxy | null>(null)

  async function handleFileUpload(uploadedFile: File) {
    if (!uploadedFile.type.includes('pdf')) { setError('Please upload a PDF file'); return }
    if (uploadedFile.size > 100 * 1024 * 1024) { setError('File too large. Maximum 100 MB.'); return }

    setError(''); setUploading(true); setFile(uploadedFile)

    try {
      const formData = new FormData()
      formData.append('file', uploadedFile)

      const res = await fetch(`${backendUrl}/api/pdf/editor/upload-session`, { method: 'POST', body: formData })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: 'Upload failed' })) as { error?: string }
        throw new Error(errData.error || 'Upload failed')
      }

      const data = await res.json() as UploadSessionResponse
      setSessionId(data.sessionId)

      const states: PageState[] = Array.from({ length: data.pageCount }, (_, i) => ({
        pageNumber: i + 1,
        rotation: 0,
        toDelete: false,
        isDuplicate: false,
        selected: false,
      }))
      setPageStates(states)

      // Load PDF for thumbnail rendering
      setLoadingThumbnails(true)
      const pdfjs = await getPdfJs()
      const arrayBuffer = await uploadedFile.arrayBuffer()
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise
      pdfRef.current = pdf

      await renderThumbnails(pdf, data.pageCount)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      resetState()
    } finally {
      setUploading(false)
      setLoadingThumbnails(false)
    }
  }

  async function renderThumbnails(pdf: PDFDocumentProxy, count: number) {
    const cache = new Map<number, string>()
    for (let pageNum = 1; pageNum <= count; pageNum++) {
      try {
        const page = await pdf.getPage(pageNum)
        const viewport = page.getViewport({ scale: 0.4 })
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')!
        canvas.width = viewport.width
        canvas.height = viewport.height
        await page.render({ canvasContext: context, viewport }).promise
        cache.set(pageNum, canvas.toDataURL('image/jpeg', 0.75))
        setThumbnailCache(new Map(cache))
      } catch {
        // skip failed page
      }
    }
  }

  const togglePageSelection = useCallback((pageNum: number) => {
    setPageStates(prev => prev.map(p => p.pageNumber === pageNum ? { ...p, selected: !p.selected } : p))
  }, [])

  const togglePageDelete = useCallback((pageNum: number) => {
    if (mode === 'view') return
    setPageStates(prev => prev.map(p => p.pageNumber === pageNum ? { ...p, toDelete: !p.toDelete } : p))
  }, [mode])

  const rotatePage = useCallback((pageNum: number) => {
    setPageStates(prev => prev.map(p => p.pageNumber === pageNum ? { ...p, rotation: (p.rotation + 90) % 360 } : p))
  }, [])

  const duplicatePage = useCallback((pageNum: number) => {
    setPageStates(prev => {
      const idx = prev.findIndex(p => p.pageNumber === pageNum)
      if (idx === -1) return prev
      const duplicate: PageState = { ...prev[idx], isDuplicate: true, selected: false }
      return [...prev.slice(0, idx + 1), duplicate, ...prev.slice(idx + 1)]
    })
  }, [])

  const handleDragStart = useCallback((idx: number) => {
    setIsDragSelecting(true)
    setDragStartIdx(idx)
  }, [])

  const handleDragEnter = useCallback((idx: number) => {
    if (!isDragSelecting || dragStartIdx === null) return
    const start = Math.min(dragStartIdx, idx)
    const end = Math.max(dragStartIdx, idx)
    setPageStates(prev => prev.map((p, i) => ({ ...p, selected: i >= start && i <= end })))
  }, [isDragSelecting, dragStartIdx])

  const handleDragEnd = useCallback(() => {
    setIsDragSelecting(false)
    setDragStartIdx(null)
  }, [])

  async function handleProcess() {
    if (!sessionId) return
    setProcessing(true); setError('')
    try {
      if (mode === 'split') { await handleSplit() }
      else if (mode === 'extract') { await handleExtract() }
      else { await handleEdit() }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Processing failed')
    } finally {
      setProcessing(false)
    }
  }

  async function handleEdit() {
    const operations = pageStates.filter(p => !p.toDelete).map(p => ({ originalPage: p.pageNumber, rotation: p.rotation }))
    if (operations.length === 0) throw new Error('No pages remaining after deletions')

    const res = await fetch(`${backendUrl}/api/pdf/editor/process/${sessionId}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ operations }),
    })
    if (!res.ok) { const d = await res.json().catch(() => ({ error: 'Failed' })) as { error?: string }; throw new Error(d.error || 'Processing failed') }
    onComplete(await res.blob(), 'modified.pdf')
  }

  async function handleSplit() {
    if (splitRanges.length === 0) throw new Error('Add at least one split range')
    const operations = pageStates.map(p => ({ originalPage: p.pageNumber, rotation: p.rotation }))
    const res = await fetch(`${backendUrl}/api/pdf/editor/split-ranges/${sessionId}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ranges: splitRanges.map(r => ({ start: r.startPage, end: r.endPage, name: r.name })), operations }),
    })
    if (!res.ok) { const d = await res.json().catch(() => ({ error: 'Failed' })) as { error?: string }; throw new Error(d.error || 'Split failed') }
    onComplete(await res.blob(), 'split_pdfs.zip')
  }

  async function handleExtract() {
    const selected = pageStates.filter(p => p.selected)
    if (selected.length === 0) throw new Error('Select at least one page to extract')
    const operations = selected.map(p => ({ originalPage: p.pageNumber, rotation: p.rotation }))
    const res = await fetch(`${backendUrl}/api/pdf/editor/process/${sessionId}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ operations }),
    })
    if (!res.ok) { const d = await res.json().catch(() => ({ error: 'Failed' })) as { error?: string }; throw new Error(d.error || 'Extract failed') }
    onComplete(await res.blob(), 'extracted_pages.pdf')
  }

  function resetState() {
    setFile(null); setSessionId(null); setPageStates([]); setThumbnailCache(new Map())
    setSplitRanges([]); setError(''); pdfRef.current = null
  }

  // ── Upload zone ────────────────────────────────────────────────────────────
  if (!sessionId) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 20px' }}>
          <h1 style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: '#0F2A4A', marginBottom: '8px' }}>{toolTitle}</h1>
          <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '32px' }}>{toolDescription}</p>

          <div
            style={{ background: 'white', border: '2px dashed #e2e8f0', borderRadius: '16px', padding: '60px 32px', textAlign: 'center', cursor: uploading ? 'wait' : 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
            onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = '#E85D04'; e.currentTarget.style.background = '#FFF7ED' }}
            onDragLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = 'white' }}
            onDrop={e => { e.preventDefault(); e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = 'white'; const f = e.dataTransfer.files[0]; if (f) handleFileUpload(f) }}
            onClick={() => !uploading && document.getElementById('pdf-file-input')?.click()}
          >
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>📄</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>
              {uploading ? '⏳ Uploading & processing…' : 'Drop PDF here or click to select'}
            </div>
            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>Maximum file size: 100 MB</div>
            {!uploading && (
              <button style={{ background: '#E85D04', color: 'white', padding: '12px 32px', borderRadius: '10px', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                Select PDF File
              </button>
            )}
            <input id="pdf-file-input" type="file" accept="application/pdf" style={{ display: 'none' }}
              onChange={e => { const f = e.target.files?.[0]; if (f) handleFileUpload(f) }} />
          </div>

          {error && (
            <div style={{ marginTop: '16px', padding: '12px 16px', background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: '10px', color: '#DC2626', fontSize: '14px', fontWeight: 600 }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{ marginTop: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[{ icon: '🔒', text: 'Files auto-deleted in 1 hour' }, { icon: '⚡', text: 'Fast processing' }, { icon: '🆓', text: '100% free, no signup' }].map(item => (
              <span key={item.text} style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                {item.icon} {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Editor view ────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif' }}>
      {/* Sticky header */}
      <div style={{ background: 'white', borderBottom: '1.5px solid #e2e8f0', padding: '14px 24px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0F2A4A' }}>{toolTitle}</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '3px' }}>
              📄 {file?.name} · {pageStates.length} pages
              {loadingThumbnails && thumbnailCache.size < pageStates.length && ` · Loading previews ${thumbnailCache.size}/${pageStates.length}`}
            </div>
          </div>
          <button onClick={resetState}
            style={{ background: 'white', border: '1.5px solid #e2e8f0', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#0F2A4A', cursor: 'pointer', fontFamily: 'inherit' }}>
            ← Upload Different File
          </button>
        </div>
      </div>

      {/* Content + Zoom panel */}
      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Thumbnail grid */}
        <div style={{ flex: 1, padding: '24px', paddingBottom: '100px' }}
          onMouseUp={handleDragEnd} onMouseLeave={handleDragEnd}>
          {mode === 'split' && (
            <SplitRangesPanel ranges={splitRanges} setRanges={setSplitRanges} totalPages={pageStates.length} />
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {pageStates.map((pageState, idx) => (
              <PDFThumbnail
                key={`${pageState.pageNumber}-${idx}-${pageState.isDuplicate}`}
                pageState={pageState}
                thumbnail={thumbnailCache.get(pageState.pageNumber)}
                mode={mode}
                features={features}
                onSelect={() => togglePageSelection(pageState.pageNumber)}
                onDelete={() => togglePageDelete(pageState.pageNumber)}
                onRotate={() => rotatePage(pageState.pageNumber)}
                onDuplicate={() => duplicatePage(pageState.pageNumber)}
                onZoom={() => setZoomedPage(pageState.pageNumber)}
                onDragStart={() => handleDragStart(idx)}
                onDragEnter={() => handleDragEnter(idx)}
              />
            ))}
          </div>
        </div>

        {/* Zoom panel */}
        {zoomedPage !== null && sessionId && (
          <ZoomPanel
            pageNumber={zoomedPage}
            sessionId={sessionId}
            backendUrl={backendUrl}
            onClose={() => setZoomedPage(null)}
          />
        )}
      </div>

      <EditorToolbar
        mode={mode}
        pageStates={pageStates}
        splitRanges={splitRanges}
        processing={processing}
        onProcess={handleProcess}
        onReset={() => setPageStates(prev => prev.map(p => ({ ...p, toDelete: false, rotation: 0, selected: false })))}
        error={error}
      />

      {/* Shimmer animation */}
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </div>
  )
}
