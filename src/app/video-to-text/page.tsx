'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

type Frame = { id: string; time: number; dataUrl: string; blob: Blob }
type FrameResult = { time: number; text: string }

export default function VideoToTextPage() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [frames, setFrames] = useState<Frame[]>([])
  const [results, setResults] = useState<FrameResult[]>([])
  const [processing, setProcessing] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')
  const [error, setError] = useState('')
  const [interval, setIntervalSec] = useState(2)
  const [dedupe, setDedupe] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File | null) => {
    if (!f) return
    if (!f.type.startsWith('video/')) { setError('Please select a video file'); return }
    setError(''); setFrames([]); setResults([])
    if (videoUrl) URL.revokeObjectURL(videoUrl)
    setVideoUrl(URL.createObjectURL(f))
  }

  const fmtTime = (t: number) => {
    const m = Math.floor(t / 60); const s = Math.floor(t % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  // Capture the current video frame to a JPEG blob + dataURL
  const grabFrame = (time: number): Promise<Frame | null> => {
    return new Promise(resolve => {
      const video = videoRef.current
      if (!video) { resolve(null); return }
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) { resolve(null); return }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
      canvas.toBlob(blob => {
        if (!blob) { resolve(null); return }
        resolve({ id: `${time}-${Math.random().toString(36).slice(2, 7)}`, time, dataUrl, blob })
      }, 'image/jpeg', 0.9)
    })
  }

  const captureCurrent = async () => {
    const video = videoRef.current
    if (!video) return
    const f = await grabFrame(video.currentTime)
    if (f) setFrames(prev => [...prev, f].sort((a, b) => a.time - b.time))
  }

  const seekBy = (delta: number) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + delta))
  }

  // Auto-capture: step through the whole video at the chosen interval
  const autoCapture = async () => {
    const video = videoRef.current
    if (!video || !video.duration) return
    setProcessing(true); setError(''); setStatusMsg('Capturing frames…')
    try {
      const grabbed: Frame[] = []
      const wasPaused = video.paused
      video.pause()
      for (let t = 0; t < video.duration; t += interval) {
        await new Promise<void>(res => {
          const onSeeked = () => { video.removeEventListener('seeked', onSeeked); res() }
          video.addEventListener('seeked', onSeeked)
          video.currentTime = t
        })
        const f = await grabFrame(t)
        if (f) grabbed.push(f)
        setStatusMsg(`Capturing frames… ${grabbed.length}`)
      }
      setFrames(prev => [...prev, ...grabbed].sort((a, b) => a.time - b.time))
      if (!wasPaused) video.play()
    } catch {
      setError('Auto-capture failed. Try capturing frames manually.')
    } finally {
      setProcessing(false); setStatusMsg('')
    }
  }

  const removeFrame = (id: string) => setFrames(prev => prev.filter(f => f.id !== id))
  const clearFrames = () => { setFrames([]); setResults([]) }

  // Send each captured frame to the existing OCR endpoint
  const extractText = async () => {
    if (frames.length === 0) return
    setProcessing(true); setError(''); setResults([])
    try {
      const out: FrameResult[] = []
      for (let i = 0; i < frames.length; i++) {
        setStatusMsg(`Reading frame ${i + 1} of ${frames.length}…`)
        const fd = new FormData()
        fd.append('file', frames[i].blob, `frame-${i}.jpg`)
        fd.append('language', 'eng')
        const res = await fetch(`${BACKEND_URL}/api/ocr/image-to-text`, { method: 'POST', body: fd })
        if (!res.ok) continue
        const data = await res.json() as { text?: string }
        const text = (data.text || '').trim()
        if (text) out.push({ time: frames[i].time, text })
      }
      setResults(out)
      if (out.length === 0) setError('No readable text found in the captured frames. Try frames where text is clear and large.')
    } catch {
      setError('Failed to extract text. Please try again.')
    } finally {
      setProcessing(false); setStatusMsg('')
    }
  }

  // Combine results, optionally removing duplicate lines across frames
  const combinedText = (() => {
    if (results.length === 0) return ''
    if (!dedupe) {
      return results.map(r => `[${fmtTime(r.time)}]\n${r.text}`).join('\n\n')
    }
    const seen = new Set<string>()
    const lines: string[] = []
    for (const r of results) {
      for (const raw of r.text.split('\n')) {
        const line = raw.trim()
        if (line && !seen.has(line.toLowerCase())) { seen.add(line.toLowerCase()); lines.push(line) }
      }
    }
    return lines.join('\n')
  })()

  const copyAll = async () => { if (combinedText) await navigator.clipboard.writeText(combinedText) }
  const downloadTxt = () => {
    if (!combinedText) return
    const blob = new Blob([combinedText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'video-text.txt'
    document.body.appendChild(a); a.click()
    URL.revokeObjectURL(url); document.body.removeChild(a)
  }

  const btn = (bg: string, color: string) => ({ padding:'10px 18px', borderRadius:'10px', border: bg === 'white' ? '1.5px solid #e2e8f0' : 'none', background: bg, color, fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' })

  return (
    <div style={{ minHeight:'100vh', background:'#fff', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>🎬</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>Video to Text</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Extract text from any video — capture frames and read them with OCR. Your video stays in your browser.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'16px 24px 0' }}>
        <div style={{ background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'12px', padding:'12px 16px', display:'flex', alignItems:'center', gap:'14px', flexWrap:'wrap' as const, justifyContent:'center' }}>
          {[{icon:'🔒',text:'Video never uploaded — stays on your device'},{icon:'⚡',text:'Free, no signup'},{icon:'📝',text:'Manual or auto frame capture'}].map(item => (
            <span key={item.text} style={{ fontSize:'13px', color:'#166534', fontWeight:600, display:'flex', alignItems:'center', gap:'6px' }}><span style={{ fontSize:'16px' }}>{item.icon}</span>{item.text}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'24px auto 0', padding:'0 24px' }}>
        {!videoUrl && (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#E85D04'; (e.currentTarget as HTMLDivElement).style.background='#FFF7ED' }}
            onDragLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc' }}
            onDrop={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc'; handleFile(e.dataTransfer.files[0] ?? null) }}
            style={{ background:'#f8fafc', border:'2px dashed #cbd5e1', borderRadius:'16px', padding:'48px 24px', textAlign:'center' as const, cursor:'pointer', transition:'all 0.2s' }}>
            <div style={{ fontSize:'56px', marginBottom:'12px' }}>🎬</div>
            <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'20px', fontWeight:700, color:'#0F2A4A', marginBottom:'6px' }}>Drop your video here</div>
            <div style={{ fontSize:'14px', color:'#64748b', marginBottom:'18px' }}>or click to browse — your video is never uploaded</div>
            <button style={{ background:'#E85D04', color:'white', padding:'12px 32px', borderRadius:'10px', border:'none', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Select Video</button>
            <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'12px' }}>MP4, WebM, MOV and other common formats</div>
            <input ref={fileInputRef} type="file" accept="video/*" style={{ display:'none' }} onChange={e => handleFile(e.target.files?.[0] ?? null)} />
          </div>
        )}

        {videoUrl && (
          <div>
            <video ref={videoRef} src={videoUrl} controls style={{ width:'100%', borderRadius:'12px', border:'1.5px solid #e2e8f0', background:'#000' }} />

            {/* Manual capture controls */}
            <div style={{ marginTop:'14px', background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'12px', padding:'16px' }}>
              <div style={{ fontSize:'13px', fontWeight:700, color:'#0F2A4A', marginBottom:'10px' }}>Capture frames manually</div>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const, alignItems:'center' }}>
                <button onClick={() => seekBy(-1)} style={btn('white', '#0F2A4A')}>◀ −1s</button>
                <button onClick={() => seekBy(-0.2)} style={btn('white', '#0F2A4A')}>−0.2s</button>
                <button onClick={() => seekBy(0.2)} style={btn('white', '#0F2A4A')}>+0.2s</button>
                <button onClick={() => seekBy(1)} style={btn('white', '#0F2A4A')}>+1s ▶</button>
                <button onClick={captureCurrent} style={btn('#E85D04', 'white')}>📸 Capture this frame</button>
              </div>
            </div>

            {/* Auto capture */}
            <div style={{ marginTop:'12px', background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'12px', padding:'16px' }}>
              <div style={{ fontSize:'13px', fontWeight:700, color:'#0F2A4A', marginBottom:'10px' }}>Or auto-capture across the whole video</div>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const, alignItems:'center' }}>
                <span style={{ fontSize:'13px', color:'#64748b' }}>Every</span>
                {[1, 2, 5].map(n => (
                  <button key={n} onClick={() => setIntervalSec(n)} style={{ ...btn(interval === n ? '#FFF7ED' : 'white', interval === n ? '#E85D04' : '#0F2A4A'), borderColor: interval === n ? '#E85D04' : '#e2e8f0', border:'1.5px solid' }}>{n}s</button>
                ))}
                <button onClick={autoCapture} disabled={processing} style={btn(processing ? '#cbd5e1' : '#0F2A4A', 'white')}>⚡ Auto-capture</button>
              </div>
            </div>

            <div style={{ marginTop:'12px', textAlign:'center' as const }}>
              <button onClick={() => { if (videoUrl) URL.revokeObjectURL(videoUrl); setVideoUrl(null); setFrames([]); setResults([]) }} style={{ ...btn('white', '#DC2626'), fontSize:'13px' }}>Choose a different video</button>
            </div>
          </div>
        )}

        {/* Captured frames tray */}
        {frames.length > 0 && (
          <div style={{ marginTop:'20px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
              <div style={{ fontSize:'14px', fontWeight:700, color:'#0F2A4A' }}>{frames.length} frame{frames.length !== 1 ? 's' : ''} captured</div>
              <button onClick={clearFrames} style={{ background:'#FEE2E2', color:'#DC2626', border:'none', borderRadius:'6px', padding:'4px 12px', cursor:'pointer', fontWeight:700, fontSize:'12px' }}>Clear all</button>
            </div>
            <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const }}>
              {frames.map(f => (
                <div key={f.id} style={{ position:'relative', width:'110px' }}>
                  <img src={f.dataUrl} alt={`Frame at ${fmtTime(f.time)}`} style={{ width:'110px', height:'72px', objectFit:'cover', borderRadius:'8px', border:'1.5px solid #e2e8f0' }} />
                  <div style={{ fontSize:'11px', color:'#64748b', textAlign:'center' as const, marginTop:'3px' }}>{fmtTime(f.time)}</div>
                  <button onClick={() => removeFrame(f.id)} style={{ position:'absolute', top:'-6px', right:'-6px', background:'#DC2626', color:'white', border:'none', borderRadius:'50%', width:'20px', height:'20px', cursor:'pointer', fontSize:'12px', lineHeight:'1' }}>×</button>
                </div>
              ))}
            </div>
            <div style={{ marginTop:'16px', textAlign:'center' as const }}>
              <button onClick={extractText} disabled={processing}
                style={{ background: processing ? '#cbd5e1' : '#E85D04', color:'white', padding:'14px 40px', borderRadius:'12px', border:'none', fontSize:'15px', fontWeight:700, cursor: processing ? 'not-allowed' : 'pointer', fontFamily:'inherit' }}>
                {processing ? '⏳ Working…' : `📝 Extract Text from ${frames.length} Frame${frames.length !== 1 ? 's' : ''}`}
              </button>
            </div>
          </div>
        )}

        {error && <div style={{ marginTop:'16px', background:'#FEE2E2', border:'1.5px solid #FCA5A5', borderRadius:'10px', padding:'12px 16px', color:'#991B1B', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}
        {processing && statusMsg && <div style={{ marginTop:'16px', background:'#EFF6FF', border:'1.5px solid #BFDBFE', borderRadius:'10px', padding:'12px 16px', color:'#1E40AF', fontSize:'14px', fontWeight:600 }}>⏳ {statusMsg}</div>}

        {/* Results */}
        {results.length > 0 && (
          <div style={{ marginTop:'24px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px', flexWrap:'wrap' as const, gap:'10px' }}>
              <div style={{ fontSize:'16px', fontWeight:800, color:'#0F2A4A' }}>Extracted Text</div>
              <label style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'13px', color:'#64748b', cursor:'pointer' }}>
                <input type="checkbox" checked={dedupe} onChange={e => setDedupe(e.target.checked)} style={{ accentColor:'#E85D04', cursor:'pointer' }} />
                Remove duplicate lines
              </label>
            </div>
            <textarea readOnly value={combinedText}
              style={{ width:'100%', minHeight:'220px', padding:'14px', borderRadius:'12px', border:'1.5px solid #e2e8f0', fontSize:'14px', fontFamily:'ui-monospace,monospace', color:'#0F2A4A', resize:'vertical' as const, boxSizing:'border-box' as const, lineHeight:'1.6' }} />
            <div style={{ display:'flex', gap:'12px', marginTop:'12px', flexWrap:'wrap' as const }}>
              <button onClick={copyAll} style={btn('#E85D04', 'white')}>📋 Copy text</button>
              <button onClick={downloadTxt} style={btn('white', '#0F2A4A')}>💾 Download .txt</button>
            </div>
          </div>
        )}
      </div>

      {/* SEO content */}
      <div style={{ maxWidth:'860px', margin:'48px auto 0', padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>How to Extract Text from a Video</h2>
          <ol style={{ paddingLeft:'24px', fontSize:'15px', color:'#64748b', lineHeight:'1.8' }}>
            {['Select a video — it loads in your browser and is never uploaded.','Scrub to a moment with visible text and click "Capture this frame", or use auto-capture to grab frames across the whole video.','Review the captured frames and remove any you don\'t need.','Click "Extract Text" — each frame is read using OCR.','Copy or download the combined text. Turn on "Remove duplicate lines" to clean up repeated text.'].map((s,i) => (
              <li key={i} style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step {i+1}:</strong> {s}</li>
            ))}
          </ol>
        </section>
        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'Is my video uploaded to a server?', a:'No. Your video stays in your browser and is never uploaded. Only the individual frames you capture are sent for text recognition, which keeps your video private and avoids large uploads.' },
            { q:'How do I get the best results?', a:'Capture frames where the text is large, sharp, and high-contrast. Blurry or fast-moving text is harder to read. The manual capture lets you pick exactly the clearest frames.' },
            { q:'What\'s the difference between manual and auto capture?', a:'Manual lets you scrub to specific moments and grab just the frames with the text you want — best for accuracy. Auto-capture grabs a frame every few seconds across the whole video — convenient, but may produce duplicate text you can clean up with the dedupe option.' },
            { q:'What languages are supported?', a:'Text recognition currently runs in English. Clear printed or on-screen text works best; stylized or handwritten text is harder to read.' },
            { q:'Why didn\'t it find any text?', a:'OCR needs readable text in the frame. If a frame has no clear text, small text, or heavy motion blur, nothing will be extracted. Try capturing a sharper frame where the text is larger.' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'14px 18px', marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px', fontWeight:600, color:'#0F2A4A', cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px', color:'#64748b', lineHeight:'1.7', marginTop:'10px', marginBottom:0 }}>{faq.a}</p>
            </details>
          ))}
        </section>
      </div>
    </div>
  )
}
