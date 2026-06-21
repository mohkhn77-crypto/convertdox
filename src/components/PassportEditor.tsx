'use client'
import { useRef, useEffect, useState, useCallback } from 'react'

type PassportEditorProps = {
  /** The user's uploaded image file */
  file: File
  /** Target output width in pixels (e.g. 600) */
  targetWidth: number
  /** Target output height in pixels (e.g. 600 or 531) */
  targetHeight: number
  /** Background color hex for the export (used if image doesn't cover the frame) */
  bgColor?: string
  /** Show ICAO head-position guides */
  showGuides?: boolean
  /** Called with the cropped JPEG blob when the user clicks the export button.
   *  The parent decides what to do next (background replacement, download, etc.) */
  onCropped: (blob: Blob) => void
  /** Optional label for the export button */
  exportLabel?: string
}

export default function PassportEditor({
  file, targetWidth, targetHeight, bgColor = '#FFFFFF',
  showGuides = true, onCropped, exportLabel = 'Use this crop',
}: PassportEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [imgLoaded, setImgLoaded] = useState(false)

  // Display frame size (CSS pixels). The crop frame matches target aspect ratio.
  const FRAME_MAX = 360 // max width or height of the on-screen frame
  const aspect = targetWidth / targetHeight
  const frameW = aspect >= 1 ? FRAME_MAX : Math.round(FRAME_MAX * aspect)
  const frameH = aspect >= 1 ? Math.round(FRAME_MAX / aspect) : FRAME_MAX

  // Transform state: image offset (in display px, relative to frame top-left) + scale
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [minScale, setMinScale] = useState(0.1)

  // Pointer drag tracking
  const dragRef = useRef<{ active: boolean; startX: number; startY: number; ox: number; oy: number }>({ active: false, startX: 0, startY: 0, ox: 0, oy: 0 })
  // Pinch tracking
  const pinchRef = useRef<{ active: boolean; startDist: number; startScale: number }>({ active: false, startDist: 0, startScale: 1 })

  // Load the image from the file
  useEffect(() => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      imgRef.current = img
      // Fit image to COVER the frame initially, centered
      const coverScale = Math.max(frameW / img.naturalWidth, frameH / img.naturalHeight)
      setMinScale(coverScale * 0.5)
      setScale(coverScale)
      setOffset({
        x: (frameW - img.naturalWidth * coverScale) / 2,
        y: (frameH - img.naturalHeight * coverScale) / 2,
      })
      setImgLoaded(true)
    }
    img.src = url
    return () => URL.revokeObjectURL(url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, frameW, frameH])

  // Draw the preview canvas (frame-sized, showing the positioned image + guides)
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const img = imgRef.current
    if (!canvas || !img) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Hi-DPI
    const dpr = window.devicePixelRatio || 1
    canvas.width = frameW * dpr
    canvas.height = frameH * dpr
    canvas.style.width = frameW + 'px'
    canvas.style.height = frameH + 'px'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    // Background (shows if image doesn't fully cover)
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, frameW, frameH)

    // The positioned image
    ctx.drawImage(img, offset.x, offset.y, img.naturalWidth * scale, img.naturalHeight * scale)

    // ICAO guides
    if (showGuides) {
      ctx.save()
      // Head oval: centered horizontally, head should occupy ~70% of frame height,
      // positioned with a little headroom at top.
      const ovalH = frameH * 0.62
      const ovalW = ovalH * 0.62
      const cx = frameW / 2
      const cy = frameH * 0.46
      ctx.strokeStyle = 'rgba(232,93,4,0.9)'
      ctx.lineWidth = 2
      ctx.setLineDash([6, 5])
      ctx.beginPath()
      ctx.ellipse(cx, cy, ovalW / 2, ovalH / 2, 0, 0, Math.PI * 2)
      ctx.stroke()
      // Eye line (~ upper third of head)
      const eyeY = frameH * 0.40
      ctx.beginPath()
      ctx.moveTo(0, eyeY)
      ctx.lineTo(frameW, eyeY)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle = 'rgba(232,93,4,0.9)'
      ctx.font = '11px system-ui, sans-serif'
      ctx.fillText('eye level', 6, eyeY - 5)
      ctx.restore()
    }
  }, [frameW, frameH, offset, scale, bgColor, showGuides])

  useEffect(() => { if (imgLoaded) draw() }, [imgLoaded, draw])

  // ----- Drag handlers -----
  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId)
    dragRef.current = { active: true, startX: e.clientX, startY: e.clientY, ox: offset.x, oy: offset.y }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return
    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY
    setOffset({ x: dragRef.current.ox + dx, y: dragRef.current.oy + dy })
  }
  const onPointerUp = () => { dragRef.current.active = false }

  // ----- Wheel zoom -----
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const factor = e.deltaY < 0 ? 1.05 : 0.95
    setScale(s => Math.max(minScale, Math.min(s * factor, minScale * 30)))
  }

  // ----- Touch pinch -----
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY)
      pinchRef.current = { active: true, startDist: d, startScale: scale }
    }
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (pinchRef.current.active && e.touches.length === 2) {
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY)
      const ratio = d / pinchRef.current.startDist
      setScale(Math.max(minScale, Math.min(pinchRef.current.startScale * ratio, minScale * 30)))
    }
  }
  const onTouchEnd = () => { pinchRef.current.active = false }

  // ----- Export: render the crop at exact target pixel dimensions -----
  const exportCrop = () => {
    const img = imgRef.current
    if (!img) return
    const out = document.createElement('canvas')
    out.width = targetWidth
    out.height = targetHeight
    const ctx = out.getContext('2d')
    if (!ctx) return
    // Map display-frame coordinates to output pixels
    const sx = targetWidth / frameW
    const sy = targetHeight / frameH
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, targetWidth, targetHeight)
    ctx.drawImage(
      img,
      offset.x * sx,
      offset.y * sy,
      img.naturalWidth * scale * sx,
      img.naturalHeight * scale * sy,
    )
    out.toBlob(b => { if (b) onCropped(b) }, 'image/jpeg', 0.95)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'14px' }}>
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ width: frameW, height: frameH, position:'relative', cursor:'grab', touchAction:'none', borderRadius:'8px', overflow:'hidden', border:'2px solid #E85D04', boxShadow:'0 4px 20px rgba(15,42,74,0.15)' }}
      >
        <canvas ref={canvasRef} style={{ display:'block' }} />
      </div>

      <div style={{ width: Math.max(frameW, 240) }}>
        <label style={{ fontSize:'13px', fontWeight:700, color:'#0F2A4A', display:'block', marginBottom:'6px' }}>Zoom</label>
        <input type="range" min={minScale} max={minScale * 30} step={minScale / 50}
          value={scale} onChange={e => setScale(parseFloat(e.target.value))}
          style={{ width:'100%', accentColor:'#E85D04' }} />
        <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'4px', textAlign:'center' as const }}>
          Drag the photo to position your face inside the oval. Pinch or use the slider to zoom.
        </div>
      </div>

      <button onClick={exportCrop}
        style={{ background:'#E85D04', color:'white', padding:'14px 40px', borderRadius:'12px', border:'none', fontSize:'15px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
        {exportLabel}
      </button>
    </div>
  )
}
