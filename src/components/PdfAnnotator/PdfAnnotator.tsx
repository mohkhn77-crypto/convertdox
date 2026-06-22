'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { getPdfJs } from '@/lib/pdf-config'
import type { PDFDocumentProxy } from '@/lib/pdf-config'

// A stroke is a list of points in PDF-space (origin bottom-left, in PDF points).
type Point = { x: number; y: number }
type ToolKind = 'pencil' | 'highlighter' | 'eraser' | 'rect' | 'ellipse' | 'line' | 'check' | 'cross' | 'text'
type ShapeKind = 'rect' | 'ellipse' | 'line' | 'check' | 'cross'
type Stroke = { points: Point[]; color: string; width: number; opacity: number }
type Shape = { kind: ShapeKind; start: Point; end: Point; color: string; width: number }
type PageStrokes = { [pageNumber: number]: Stroke[] }
type PageShapes = { [pageNumber: number]: Shape[] }
type TextItem = { id: string; pos: Point; text: string; size: number; color: string }
type PageTexts = { [pageNumber: number]: TextItem[] }

const SHAPE_TOOLS: ToolKind[] = ['rect', 'ellipse', 'line', 'check', 'cross']

const RENDER_SCALE = 1.5 // display scale for the page canvas

export default function PdfAnnotator() {
  const [file, setFile] = useState<File | null>(null)
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null)
  const [pageNum, setPageNum] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [strokes, setStrokes] = useState<PageStrokes>({})
  const [shapes, setShapes] = useState<PageShapes>({})
  const [texts, setTexts] = useState<PageTexts>({})
  const [textSize, setTextSize] = useState(16)
  const [vpState, setVpState] = useState<{ width: number; height: number; pdfWidth: number; pdfHeight: number } | null>(null)
  const [pendingTextPos, setPendingTextPos] = useState<Point | null>(null)
  const [draftText, setDraftText] = useState('')
  const [cursorOn, setCursorOn] = useState(true)
  const hiddenInputRef = useRef<HTMLTextAreaElement>(null)
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
  const shapeRef = useRef<{ active: boolean; start: Point | null; end: Point | null }>({ active: false, start: null, end: null })

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
      setShapes({})
      setTexts({})
      setPendingTextPos(null)
      setDraftText('')
    } catch {
      setError('Could not open this PDF.')
    } finally {
      setBusy(false)
    }
  }, [])

  // Draw one shape onto a ctx using SCREEN coordinates
  const drawShapeScreen = (ctx: CanvasRenderingContext2D, sh: Shape) => {
    const vp = viewportRef.current!
    const toS = (p: Point) => ({ x: p.x * (vp.width / vp.pdfWidth), y: (vp.pdfHeight - p.y) * (vp.height / vp.pdfHeight) })
    const a = toS(sh.start), b = toS(sh.end)
    ctx.strokeStyle = sh.color
    ctx.lineWidth = sh.width
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    const x = Math.min(a.x, b.x), y = Math.min(a.y, b.y)
    const w = Math.abs(b.x - a.x), h = Math.abs(b.y - a.y)
    ctx.beginPath()
    if (sh.kind === 'rect') {
      ctx.rect(x, y, w, h)
    } else if (sh.kind === 'ellipse') {
      ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2)
    } else if (sh.kind === 'line') {
      ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
    } else if (sh.kind === 'check') {
      ctx.moveTo(x + w * 0.1, y + h * 0.55)
      ctx.lineTo(x + w * 0.4, y + h * 0.9)
      ctx.lineTo(x + w * 0.9, y + h * 0.1)
    } else if (sh.kind === 'cross') {
      ctx.moveTo(x, y); ctx.lineTo(x + w, y + h)
      ctx.moveTo(x + w, y); ctx.lineTo(x, y + h)
    }
    ctx.stroke()
  }

  // Redraw all stored strokes, shapes, and text for the current page onto the overlay
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
    const pageShapes = shapes[pageNum] || []
    for (const sh of pageShapes) drawShapeScreen(ctx, sh)
    // Draw committed text items directly on the canvas
    const pageTexts = texts[pageNum] || []
    for (const t of pageTexts) {
      const sx = t.pos.x * (vp.width / vp.pdfWidth)
      const sy = (vp.pdfHeight - t.pos.y) * (vp.height / vp.pdfHeight)
      ctx.fillStyle = t.color
      ctx.font = `${t.size * (vp.height / vp.pdfHeight)}px Helvetica, Arial, sans-serif`
      ctx.textBaseline = 'top'
      t.text.split('\n').forEach((line, i) => {
        ctx.fillText(line, sx, sy + i * t.size * 1.2 * (vp.height / vp.pdfHeight))
      })
    }
    // Draw in-progress draft text + blinking cursor
    if (pendingTextPos) {
      const mx = pendingTextPos.x * (vp.width / vp.pdfWidth)
      const my = (vp.pdfHeight - pendingTextPos.y) * (vp.height / vp.pdfHeight)
      const scl = vp.width / vp.pdfWidth
      const lineH = textSize * 1.2 * (vp.height / vp.pdfHeight)
      ctx.fillStyle = penColor
      ctx.font = `${textSize * scl}px Helvetica, Arial, sans-serif`
      ctx.textBaseline = 'top'
      const lines = draftText.split('\n')
      lines.forEach((line, i) => ctx.fillText(line, mx, my + i * lineH))
      if (cursorOn) {
        const lastLine = lines[lines.length - 1] || ''
        const w = ctx.measureText(lastLine).width
        const cy = my + (lines.length - 1) * lineH
        ctx.strokeStyle = penColor; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.moveTo(mx + w + 1, cy); ctx.lineTo(mx + w + 1, cy + textSize * scl); ctx.stroke()
      }
    }
  }, [strokes, shapes, texts, pageNum, pendingTextPos, draftText, cursorOn])

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
    const vpInfo = { width: viewport.width, height: viewport.height, pdfWidth: unscaled.width, pdfHeight: unscaled.height }
    viewportRef.current = vpInfo
    setVpState(vpInfo)
    redrawOverlay()
  }, [pdf, pageNum, redrawOverlay])

  useEffect(() => { if (pdf) renderPage() }, [pdf, pageNum, renderPage])

  useEffect(() => { redrawOverlay() }, [strokes, shapes, texts, pageNum, pendingTextPos, draftText, cursorOn, redrawOverlay])

  // Blink the text cursor while placing text
  useEffect(() => {
    if (!pendingTextPos) return
    const id = setInterval(() => setCursorOn(c => !c), 530)
    return () => clearInterval(id)
  }, [pendingTextPos])

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
    const { x, y } = getLocalXY(e)
    const pdfPt = toPdfPoint(x, y)
    // Text tool: commit any current draft, then start a fresh one at the click point
    if (tool === 'text') {
      if (pendingTextPos && draftText.trim()) {
        const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
        setTexts(prev => ({ ...prev, [pageNum]: [...(prev[pageNum] || []), { id, pos: pendingTextPos, text: draftText, size: textSize, color: penColor }] }))
      }
      setDraftText('')
      setPendingTextPos(pdfPt)
      setCursorOn(true)
      setTimeout(() => hiddenInputRef.current?.focus(), 0)
      return
    }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    if (tool === 'eraser') { drawingRef.current = { active: true, pts: [] }; eraseAt(pdfPt); return }
    if (SHAPE_TOOLS.includes(tool)) { shapeRef.current = { active: true, start: pdfPt, end: pdfPt }; return }
    drawingRef.current = { active: true, pts: [pdfPt] }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drawingRef.current.active && !shapeRef.current.active) return
    const { x, y } = getLocalXY(e)
    const pdfPt = toPdfPoint(x, y)
    if (tool === 'eraser') { eraseAt(pdfPt); return }
    if (SHAPE_TOOLS.includes(tool)) {
      if (!shapeRef.current.active) return
      shapeRef.current.end = pdfPt
      const overlay = overlayRef.current!
      const ctx = overlay.getContext('2d')!
      redrawOverlay()
      drawShapeScreen(ctx, { kind: tool as ShapeKind, start: shapeRef.current.start!, end: pdfPt, color: activeColor, width: activeWidth })
      return
    }
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
    // Commit a shape if one was being drawn
    if (SHAPE_TOOLS.includes(tool) && shapeRef.current.active) {
      const { start, end } = shapeRef.current
      shapeRef.current = { active: false, start: null, end: null }
      if (start && end && (Math.abs(start.x - end.x) > 2 || Math.abs(start.y - end.y) > 2)) {
        setShapes(prev => ({ ...prev, [pageNum]: [...(prev[pageNum] || []), { kind: tool as ShapeKind, start, end, color: activeColor, width: activeWidth }] }))
      }
      return
    }
    if (!drawingRef.current.active) return
    const pts = drawingRef.current.pts
    const wasEraser = tool === 'eraser'
    drawingRef.current = { active: false, pts: [] }
    if (wasEraser || pts.length < 2) return
    setStrokes(prev => ({ ...prev, [pageNum]: [...(prev[pageNum] || []), { points: pts, color: activeColor, width: activeWidth, opacity: activeOpacity }] }))
  }

  const clearPage = () => { setStrokes(prev => ({ ...prev, [pageNum]: [] })); setShapes(prev => ({ ...prev, [pageNum]: [] })); setTexts(prev => ({ ...prev, [pageNum]: [] })); setPendingTextPos(null); setDraftText('') }

  const commitPendingText = () => {
    if (pendingTextPos && draftText.trim()) {
      const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
      setTexts(prev => ({ ...prev, [pageNum]: [...(prev[pageNum] || []), { id, pos: pendingTextPos, text: draftText, size: textSize, color: penColor }] }))
    }
    setPendingTextPos(null)
    setDraftText('')
  }
  const cancelPendingText = () => { setPendingTextPos(null); setDraftText('') }
  const onHiddenKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); cancelPendingText(); return }
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); commitPendingText(); return }
  }

  // Export: burn strokes onto the PDF with pdf-lib (in the browser)
  const exportPdf = async () => {
    if (!file) return
    setBusy(true); setError('')
    try {
      const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib')
      const bytes = await file.arrayBuffer()
      const doc = await PDFDocument.load(bytes)
      const helv = await doc.embedFont(StandardFonts.Helvetica)
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

      // Shapes
      type PdfPage = ReturnType<typeof doc.getPages>[number]
      const lineSeg = (page: PdfPage, a: Point, b: Point, c: { r: number; g: number; b: number }, w: number) => {
        page.drawLine({ start: { x: a.x, y: a.y }, end: { x: b.x, y: b.y }, thickness: w, color: rgb(c.r, c.g, c.b) })
      }
      Object.entries(shapes).forEach(([pgStr, pageShapes]) => {
        const idx = parseInt(pgStr, 10) - 1
        const page = pages[idx]
        if (!page) return
        for (const sh of pageShapes) {
          const c = hexToRgb(sh.color)
          const x = Math.min(sh.start.x, sh.end.x), y = Math.min(sh.start.y, sh.end.y)
          const w = Math.abs(sh.end.x - sh.start.x), h = Math.abs(sh.end.y - sh.start.y)
          if (sh.kind === 'rect') {
            page.drawRectangle({ x, y, width: w, height: h, borderColor: rgb(c.r, c.g, c.b), borderWidth: sh.width, opacity: 0 })
          } else if (sh.kind === 'ellipse') {
            page.drawEllipse({ x: x + w / 2, y: y + h / 2, xScale: w / 2, yScale: h / 2, borderColor: rgb(c.r, c.g, c.b), borderWidth: sh.width, opacity: 0 })
          } else if (sh.kind === 'line') {
            lineSeg(page, sh.start, sh.end, c, sh.width)
          } else if (sh.kind === 'check') {
            lineSeg(page, { x: x + w * 0.1, y: y + h * 0.45 }, { x: x + w * 0.4, y: y + h * 0.1 }, c, sh.width)
            lineSeg(page, { x: x + w * 0.4, y: y + h * 0.1 }, { x: x + w * 0.9, y: y + h * 0.9 }, c, sh.width)
          } else if (sh.kind === 'cross') {
            lineSeg(page, { x, y: y + h }, { x: x + w, y }, c, sh.width)
            lineSeg(page, { x, y }, { x: x + w, y: y + h }, c, sh.width)
          }
        }
      })
      // Text items
      Object.entries(texts).forEach(([pgStr, pageTexts]) => {
        const idx = parseInt(pgStr, 10) - 1
        const page = pages[idx]
        if (!page) return
        for (const t of pageTexts) {
          if (!t.text.trim()) continue
          const c = hexToRgb(t.color)
          page.drawText(t.text, {
            x: t.pos.x,
            y: t.pos.y - t.size,
            size: t.size,
            font: helv,
            color: rgb(c.r, c.g, c.b),
            lineHeight: t.size * 1.2,
          })
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
            <button onClick={() => setTool('rect')} style={btn(tool === 'rect')}>▭ Box</button>
            <button onClick={() => setTool('ellipse')} style={btn(tool === 'ellipse')}>⬭ Ellipse</button>
            <button onClick={() => setTool('line')} style={btn(tool === 'line')}>╱ Line</button>
            <button onClick={() => setTool('check')} style={btn(tool === 'check')}>✓ Check</button>
            <button onClick={() => setTool('cross')} style={btn(tool === 'cross')}>✗ Cross</button>
            <button onClick={() => setTool('text')} style={btn(tool === 'text')}>🅣 Text</button>
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
            {SHAPE_TOOLS.includes(tool) && (
              <>
                <input type="color" value={penColor} onChange={e => setPenColor(e.target.value)} title="Shape color" style={{ width: '34px', height: '34px', border: '1.5px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', background: 'white' }} />
                <input type="range" min={1} max={12} value={penWidth} onChange={e => setPenWidth(Number(e.target.value))} title="Shape line width" style={{ accentColor: '#E85D04' }} />
              </>
            )}
            {tool === 'text' && (
              <>
                <input type="color" value={penColor} onChange={e => setPenColor(e.target.value)} title="Text color" style={{ width: '34px', height: '34px', border: '1.5px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', background: 'white' }} />
                <input type="range" min={8} max={48} value={textSize} onChange={e => setTextSize(Number(e.target.value))} title="Text size" style={{ accentColor: '#E85D04' }} />
                <span style={{ fontSize: '12px', color: '#64748b' }}>Click the page to choose position, then type below</span>
              </>
            )}
            <button onClick={clearPage} style={btn()}>Clear page</button>
            <div style={{ flex: 1 }} />
            <button onClick={() => setPageNum(n => Math.max(1, n - 1))} disabled={pageNum <= 1} style={btn()}>◀ Prev</button>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A' }}>Page {pageNum} / {pageCount}</span>
            <button onClick={() => setPageNum(n => Math.min(pageCount, n + 1))} disabled={pageNum >= pageCount} style={btn()}>Next ▶</button>
            <div style={{ flex: 1 }} />
            <button onClick={exportPdf} disabled={busy} style={{ ...btn(), background: busy ? '#cbd5e1' : '#E85D04', color: 'white', borderColor: 'transparent' }}>{busy ? '⏳' : '⬇️ Download annotated PDF'}</button>
            <button onClick={() => { setFile(null); setPdf(null); setStrokes({}); setShapes({}); setTexts({}) }} style={{ ...btn(), color: '#DC2626' }}>✕ Close</button>
          </div>

          {/* Hidden key-catcher: captures typing for in-place canvas text */}
          {tool === 'text' && (
            <textarea
              ref={hiddenInputRef}
              value={draftText}
              onChange={e => setDraftText(e.target.value)}
              onKeyDown={onHiddenKey}
              onBlur={() => { /* keep draft; clicking canvas refocuses */ }}
              aria-label="PDF text input"
              style={{ position: 'fixed', top: 0, left: 0, width: '1px', height: '1px', opacity: 0, pointerEvents: 'none', resize: 'none' }} />
          )}

          {/* Page + overlay */}
          <div style={{ display: 'flex', justifyContent: 'center', background: '#e2e8f0', borderRadius: '12px', padding: '20px', overflow: 'auto' }}>
            <div style={{ position: 'relative', boxShadow: '0 4px 20px rgba(15,42,74,0.2)', width: '100%', maxWidth: vpState ? `${vpState.width}px` : '800px', alignSelf: 'flex-start' }}>
              <canvas ref={pageCanvasRef} style={{ display: 'block', width: '100%', height: 'auto' }} />
              <canvas ref={overlayRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', touchAction: 'none', zIndex: 10, cursor: tool === 'eraser' ? 'cell' : (tool === 'text' ? 'crosshair' : 'crosshair') }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
