'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { getPdfJs } from '@/lib/pdf-config'
import type { PDFDocumentProxy } from '@/lib/pdf-config'

// A stroke is a list of points in PDF-space (origin bottom-left, in PDF points).
type Point = { x: number; y: number }
type ToolKind = 'pencil' | 'highlighter' | 'eraser'
type Stroke = { points: Point[]; color: string; width: number; opacity: number }
type PageStrokes = { [pageNumber: number]: Stroke[] }

const RENDER_SCALE = 1.5 // display scale for the page canvas

export default function PdfAnnotator() {
  const [file, setFile] = useState<File | null>(null)
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null)
  const [pageNum, setPageNum] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [strokes, setStrokes] = useState<PageStrokes>({})
  const [tool, setTool] = useState<ToolKind>('pencil')
  const [penColor, setPenColor] = useState('#E11D48')
  const [penWidth, setPenWidth] = useState(3)
  const [hlColor, setHlColor] = useState('#FACC15')
  const [hlWidth, setHlWidth] = useState(16)
  // Active stroke style derived from the selected tool
  const activeColor = tool === 'highlighter' ? hlColor : penColor
  const activeWidth = tool === 'highlighter' ? hlWidth : penWidth
  const activeOpacity = tool === 'highlighter' ? 0.35 : 1
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const pageCanvasRef = useRef<HTMLCanvasElement>(null)   // rendered PDF page
  const overlayRef = useRef<HTMLCanvasElement>(null)       // drawing overlay
  // Current page viewport info needed to map screen <-> PDF coordinates
  const viewportRef = useRef<{ width: number; height: number; pdfWidth: number; pdfHeight: number } | null>(null)
  const drawingRef = useRef<{ active: boolean; pts: Point[] }>({ active: false, pts: [] })

  // Load the PDF document
  const loadFile = useCallback(async (f: File) => {
    if (f.type !== 'application/pdf') { setError('Please select a PDF file'); return }
    setError(''); setBusy(true)
    try {
      const pdfjs = await getPdfJs()
      const buf = await f.arrayBuffer()
      const doc = await pdfjs.getDocument({ data: buf }).promise
      setFile(f)
      setPdf(doc)
      setPageCount(doc.numPages)
      setPageNum(1)
      setStrokes({})
    } catch {
      setError('Could not open this PDF.')
    } finally {
      setBusy(false)
    }
  }, [])

  // Redraw all stored strokes for the current page onto the overlay
  const redrawOverlay = useCallback(() => {
    const overlay = overlayRef.current
    if (!overlay || !viewportRef.current) return
    const vp = viewportRef.current
    const ctx = overlay.getContext('2d')!
    ctx.clearRect(0, 0, overlay.width, overlay.height)
    const pageStrokes = strokes[pageNum] || []
    for (const st of pageStrokes) {
      ctx.globalAlpha = st.opacity
      ctx.strokeStyle = st.color
      ctx.lineWidth = st.width
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'
      ctx.beginPath()
      st.points.forEach((p, i) => {
        const sx = p.x * (vp.width / vp.pdfWidth)
        const sy = (vp.pdfHeight - p.y) * (vp.height / vp.pdfHeight)
        if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy)
      })
      ctx.stroke()
    }
    ctx.globalAlpha = 1
  }, [strokes, pageNum])

  // Render the current page to the page canvas + size the overlay to match
  const renderPage = useCallback(async () => {
    if (!pdf) return
    const page = await pdf.getPage(pageNum)
    const viewport = page.getViewport({ scale: RENDER_SCALE })
    const unscaled = page.getViewport({ scale: 1 })
    const canvas = pageCanvasRef.current
    const overlay = overlayRef.current
    if (!canvas || !overlay) return
    const ctx = canvas.getContext('2d')!
    canvas.width = viewport.width
    canvas.height = viewport.height
    overlay.width = viewport.width
    overlay.height = viewport.height
    await page.render({ canvasContext: ctx, viewport }).promise
    viewportRef.current = { width: viewport.width, height: viewport.height, pdfWidth: unscaled.width, pdfHeight: unscaled.height }
    redrawOverlay()
  }, [pdf, pageNum, redrawOverlay])

  useEffect(() => { if (pdf) renderPage() }, [pdf, pageNum, renderPage])

  useEffect(() => { redrawOverlay() }, [strokes, pageNum, redrawOverlay])

  // Convert a screen point (canvas px, origin top-left) to PDF point (origin bottom-left)
  const toPdfPoint = (sx: number, sy: number): Point => {
    const vp = viewportRef.current!
    return { x: sx * (vp.pdfWidth / vp.width), y: vp.pdfHeight - sy * (vp.pdfHeight / vp.height) }
  }

  // Pointer handlers for freehand drawing
  const getLocalXY = (e: React.PointerEvent) => {
    const overlay = overlayRef.current!
    const rect = overlay.getBoundingClientRect()
    const scaleX = overlay.width / rect.width
    const scaleY = overlay.height / rect.height
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY }
  }

  // Distance from a point to a stroke (in PDF units), for the eraser
  const eraseAt = (pdfPt: Point) => {
    const tol = 6 // PDF-units tolerance
    setStrokes(prev => {
      const pageStrokes = prev[pageNum] || []
      const kept = pageStrokes.filter(st => {
        // remove stroke if any of its points is within tolerance of the erase point
        return !st.points.some(p => Math.hypot(p.x - pdfPt.x, p.y - pdfPt.y) <= tol + st.width)
      })
      if (kept.length === pageStrokes.length) return prev
      return { ...prev, [pageNum]: kept }
    })
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (!viewportRef.current) return
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    const { x, y } = getLocalXY(e)
    const pdfPt = toPdfPoint(x, y)
    if (tool === 'eraser') { drawingRef.current = { active: true, pts: [] }; eraseAt(pdfPt); return }
    drawingRef.current = { active: true, pts: [pdfPt] }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drawingRef.current.active) return
    const { x, y } = getLocalXY(e)
    const pdfPt = toPdfPoint(x, y)
    if (tool === 'eraser') { eraseAt(pdfPt); return }
    drawingRef.current.pts.push(pdfPt)
    const overlay = overlayRef.current!
    const vp = viewportRef.current!
    const ctx = overlay.getContext('2d')!
    redrawOverlay()
    ctx.globalAlpha = activeOpacity
    ctx.strokeStyle = activeColor; ctx.lineWidth = activeWidth; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    ctx.beginPath()
    drawingRef.current.pts.forEach((p, i) => {
      const sx = p.x * (vp.width / vp.pdfWidth)
      const sy = (vp.pdfHeight - p.y) * (vp.height / vp.pdfHeight)
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy)
    })
    ctx.stroke()
    ctx.globalAlpha = 1
  }

  const onPointerUp = () => {
    if (!drawingRef.current.active) return
    const pts = drawingRef.current.pts
    const wasEraser = tool === 'eraser'
    drawingRef.current = { active: false, pts: [] }
    if (wasEraser || pts.length < 2) return
    setStrokes(prev => ({ ...prev, [pageNum]: [...(prev[pageNum] || []), { points: pts, color: activeColor, width: activeWidth, opacity: activeOpacity }] }))
  }

  const clearPage = () => setStrokes(prev => ({ ...prev, [pageNum]: [] }))

  // Export: burn strokes onto the PDF with pdf-lib (in the browser)
  const exportPdf = async () => {
    if (!file) return
    setBusy(true); setError('')
    try {
      const { PDFDocument, rgb } = await import('pdf-lib')
      const bytes = await file.arrayBuffer()
      const doc = await PDFDocument.load(bytes)
      const pages = doc.getPages()
      const hexToRgb = (hex: string) => {
        const h = hex.replace('#', '')
        return { r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255 }
      }
      Object.entries(strokes).forEach(([pgStr, pageStrokes]) => {
        const idx = parseInt(pgStr, 10) - 1
        const page = pages[idx]
        if (!page) return
        for (const st of pageStrokes) {
          const c = hexToRgb(st.color)
          for (let i = 1; i < st.points.length; i++) {
            const a = st.points[i - 1], b = st.points[i]
            page.drawLine({
              start: { x: a.x, y: a.y },
              end: { x: b.x, y: b.y },
              thickness: st.width,
              color: rgb(c.r, c.g, c.b),
              opacity: st.opacity,
            })
          }
        }
      })
      const out = await doc.save()
      const blob = new Blob([out.buffer as ArrayBuffer], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'annotated.pdf'
      document.body.appendChild(a); a.click()
      URL.revokeObjectURL(url); document.body.removeChild(a)
    } catch {
      setError('Export failed. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const btn = (active = false) => ({ padding: '8px 16px', borderRadius: '8px', border: '1.5px solid', borderColor: active ? '#E85D04' : '#e2e8f0', background: active ? '#FFF7ED' : 'white', color: active ? '#E85D04' : '#0F2A4A', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' })

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 16px' }}>
      {!file && (
        <div onClick={() => fileInputRef.current?.click()}
          style={{ background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '16px', padding: '48px 24px', textAlign: 'center' as const, cursor: 'pointer' }}>
          <div style={{ fontSize: '56px', marginBottom: '12px' }}>✏️</div>
          <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '20px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>Drop a PDF to annotate</div>
          <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '18px' }}>Your file stays in your browser — never uploaded</div>
          <button style={{ background: '#E85D04', color: 'white', padding: '12px 32px', borderRadius: '10px', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Select PDF</button>
          <input ref={fileInputRef} type="file" accept="application/pdf" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f) }} />
        </div>
      )}

      {busy && !file && (
        <div style={{ marginTop: '16px', textAlign: 'center' as const, color: '#64748b', fontSize: '14px' }}>⏳ Loading PDF…</div>
      )}

      {error && <div style={{ marginTop: '16px', background: '#FEE2E2', border: '1.5px solid #FCA5A5', borderRadius: '10px', padding: '12px 16px', color: '#991B1B', fontSize: '14px', fontWeight: 600 }}>⚠️ {error}</div>}

      {file && (
        <div style={{ marginTop: '8px' }}>
          {/* Toolbar */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const, alignItems: 'center', padding: '12px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', marginBottom: '12px', position: 'sticky' as const, top: '0', zIndex: 10 }}>
            <button onClick={() => setTool('pencil')} style={btn(tool === 'pencil')}>✏️ Pencil</button>
            <button onClick={() => setTool('highlighter')} style={btn(tool === 'highlighter')}>🖍 Highlighter</button>
            <button onClick={() => setTool('eraser')} style={btn(tool === 'eraser')}>🩹 Eraser</button>
            {tool === 'pencil' && (
              <>
                <input type="color" value={penColor} onChange={e => setPenColor(e.target.value)} title="Pencil color" style={{ width: '34px', height: '34px', border: '1.5px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', background: 'white' }} />
                <input type="range" min={1} max={12} value={penWidth} onChange={e => setPenWidth(Number(e.target.value))} title="Pencil width" style={{ accentColor: '#E85D04' }} />
              </>
            )}
            {tool === 'highlighter' && (
              <>
                <input type="color" value={hlColor} onChange={e => setHlColor(e.target.value)} title="Highlighter color" style={{ width: '34px', height: '34px', border: '1.5px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', background: 'white' }} />
                <input type="range" min={8} max={40} value={hlWidth} onChange={e => setHlWidth(Number(e.target.value))} title="Highlighter width" style={{ accentColor: '#E85D04' }} />
              </>
            )}
            <button onClick={clearPage} style={btn()}>Clear page</button>
            <div style={{ flex: 1 }} />
            <button onClick={() => setPageNum(n => Math.max(1, n - 1))} disabled={pageNum <= 1} style={btn()}>◀ Prev</button>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A' }}>Page {pageNum} / {pageCount}</span>
            <button onClick={() => setPageNum(n => Math.min(pageCount, n + 1))} disabled={pageNum >= pageCount} style={btn()}>Next ▶</button>
            <div style={{ flex: 1 }} />
            <button onClick={exportPdf} disabled={busy} style={{ ...btn(), background: busy ? '#cbd5e1' : '#E85D04', color: 'white', borderColor: 'transparent' }}>{busy ? '⏳' : '⬇️ Download annotated PDF'}</button>
            <button onClick={() => { setFile(null); setPdf(null); setStrokes({}) }} style={{ ...btn(), color: '#DC2626' }}>✕ Close</button>
          </div>

          {/* Page + overlay */}
          <div style={{ display: 'flex', justifyContent: 'center', background: '#e2e8f0', borderRadius: '12px', padding: '20px', overflow: 'auto' }}>
            <div style={{ position: 'relative', boxShadow: '0 4px 20px rgba(15,42,74,0.2)' }}>
              <canvas ref={pageCanvasRef} style={{ display: 'block', maxWidth: '100%' }} />
              <canvas ref={overlayRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                style={{ position: 'absolute', top: 0, left: 0, maxWidth: '100%', touchAction: 'none', cursor: tool === 'eraser' ? 'cell' : 'crosshair' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
