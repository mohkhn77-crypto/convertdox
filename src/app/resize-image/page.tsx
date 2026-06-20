'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'
import FileAutoDeletedNotice from '@/components/FileAutoDeletedNotice'
import ToolPageSEO from '@/components/ToolPageSEO'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp']
const PRESETS = [{ label: '1920px', value: 1920 }, { label: '1200px', value: 1200 }, { label: '800px', value: 800 }, { label: '600px', value: 600 }]

export default function ResizeImagePage() {
  const [file, setFile] = useState<File | null>(null)
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [mode, setMode] = useState<'pixels' | 'percent' | 'ratio'>('pixels')
  const [percent, setPercent] = useState('50')
  const [ratioW, setRatioW] = useState(1)
  const [ratioH, setRatioH] = useState(1)
  const [ratioWidth, setRatioWidth] = useState('1080')
  const [cropPosition, setCropPosition] = useState<'top' | 'center' | 'bottom'>('center')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File | null) => {
    if (!f) return
    if (!ACCEPTED.includes(f.type)) { setError('Only JPG, PNG, WebP, BMP images are accepted'); return }
    setFile(f); setError(''); setSuccess(false)
  }

  const resize = async () => {
    if (!file) return
    if (mode === 'pixels' && !width && !height) { setError('Please enter a width or height'); return }
    if (mode === 'percent' && (!percent || Number(percent) <= 0)) { setError('Please enter a percentage'); return }
    setProcessing(true); setError(''); setSuccess(false)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('mode', mode)
      if (mode === 'pixels') {
        if (width) formData.append('width', width)
        if (height) formData.append('height', height)
      } else if (mode === 'percent') {
        formData.append('percent', percent)
      } else if (mode === 'ratio') {
        formData.append('ratioW', String(ratioW))
        formData.append('ratioH', String(ratioH))
        if (ratioWidth) formData.append('width', ratioWidth)
        formData.append('cropPosition', cropPosition)
      }
      const res = await fetch(`${BACKEND_URL}/api/image/resize`, { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Unknown error' })) as { error?: string }
        throw new Error(data.error ?? `Server error: ${res.status}`)
      }
      const blob = await res.blob()
      const ext = file.name.split('.').pop() ?? 'jpg'
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = `resized.${ext}`
      document.body.appendChild(a); a.click()
      URL.revokeObjectURL(url); document.body.removeChild(a)
      setSuccess(true); setFile(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resize image. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const fmt = (b: number) => b < 1_048_576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1_048_576).toFixed(1)} MB`

  return (
    <div style={{ minHeight:'100vh', background:'#fff', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>⤢</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>Resize Image</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Change image dimensions — aspect ratio preserved automatically</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'16px 24px 0' }}>
        <div style={{ background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'12px', padding:'12px 16px', display:'flex', alignItems:'center', gap:'14px', flexWrap:'wrap' as const, justifyContent:'center' }}>
          {[{icon:'🔒',text:'Files auto-deleted in 1 hour'},{icon:'🛡',text:'HTTPS encrypted'},{icon:'⚡',text:'Fast processing'},{icon:'🆓',text:'100% free, no signup'}].map(item => (
            <span key={item.text} style={{ fontSize:'13px', color:'#166534', fontWeight:600, display:'flex', alignItems:'center', gap:'6px' }}><span style={{ fontSize:'16px' }}>{item.icon}</span>{item.text}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'32px auto 0', padding:'0 24px' }}>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#E85D04'; (e.currentTarget as HTMLDivElement).style.background='#FFF7ED' }}
          onDragLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc' }}
          onDrop={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc'; handleFile(e.dataTransfer.files[0] ?? null) }}
          style={{ background:'#f8fafc', border:'2px dashed #cbd5e1', borderRadius:'16px', padding:'48px 24px', textAlign:'center' as const, cursor:'pointer', transition:'all 0.2s' }}>
          <div style={{ fontSize:'56px', marginBottom:'12px' }}>⤢</div>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'20px', fontWeight:700, color:'#0F2A4A', marginBottom:'6px' }}>Drop your image here</div>
          <div style={{ fontSize:'14px', color:'#64748b', marginBottom:'18px' }}>or click to browse from your computer</div>
          <button style={{ background:'#E85D04', color:'white', padding:'12px 32px', borderRadius:'10px', border:'none', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Select Image</button>
          <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'12px' }}>JPG, PNG, WebP, BMP · Max 20 MB</div>
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/bmp" style={{ display:'none' }} onChange={e => handleFile(e.target.files?.[0] ?? null)} />
        </div>

        {file && (
          <div style={{ marginTop:'20px', background:'white', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'16px', display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ width:'40px', height:'40px', background:'#FEF3C7', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#92400E', fontWeight:700, fontSize:'10px', flexShrink:0 }}>IMG</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'14px', fontWeight:600, color:'#0F2A4A', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{file.name}</div>
              <div style={{ fontSize:'12px', color:'#94a3b8' }}>{fmt(file.size)}</div>
            </div>
            <button onClick={() => setFile(null)} style={{ background:'#FEE2E2', color:'#DC2626', border:'none', borderRadius:'6px', padding:'4px 10px', cursor:'pointer', fontWeight:700, fontSize:'16px' }}>×</button>
          </div>
        )}

        <div style={{ marginTop:'24px' }}>
          {/* Mode tabs */}
          <div style={{ display:'flex', gap:'8px', marginBottom:'20px', borderBottom:'2px solid #f1f5f9' }}>
            {([['pixels','By Pixels'],['percent','By Percentage'],['ratio','By Aspect Ratio']] as const).map(([m, label]) => (
              <button key={m} onClick={() => setMode(m)}
                style={{ padding:'10px 18px', border:'none', background:'transparent', borderBottom: mode === m ? '3px solid #E85D04' : '3px solid transparent', marginBottom:'-2px', color: mode === m ? '#E85D04' : '#64748b', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
                {label}
              </button>
            ))}
          </div>

          {/* PIXELS MODE */}
          {mode === 'pixels' && (
            <div>
              <div style={{ fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'12px' }}>Common presets (width):</div>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const, marginBottom:'16px' }}>
                {PRESETS.map(p => (
                  <button key={p.value} onClick={() => { setWidth(String(p.value)); setHeight('') }}
                    style={{ padding:'8px 16px', borderRadius:'8px', border:'1.5px solid', borderColor: width === String(p.value) ? '#E85D04' : '#e2e8f0', background: width === String(p.value) ? '#FFF7ED' : 'white', color: width === String(p.value) ? '#E85D04' : '#0F2A4A', fontSize:'13px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
                    {p.label}
                  </button>
                ))}
              </div>
              <div style={{ display:'flex', gap:'16px', flexWrap:'wrap' as const }}>
                <div style={{ flex:1, minWidth:'140px' }}>
                  <label style={{ display:'block', fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px' }}>Width (px)</label>
                  <input type="number" value={width} onChange={e => setWidth(e.target.value)} placeholder="e.g. 1200"
                    style={{ width:'100%', padding:'12px 14px', borderRadius:'10px', border:'1.5px solid #e2e8f0', fontSize:'14px', fontFamily:'inherit', color:'#0F2A4A', outline:'none', boxSizing:'border-box' as const }} />
                </div>
                <div style={{ flex:1, minWidth:'140px' }}>
                  <label style={{ display:'block', fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px' }}>Height (px) <span style={{ color:'#94a3b8', fontWeight:400 }}>— optional</span></label>
                  <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="Leave blank to maintain ratio"
                    style={{ width:'100%', padding:'12px 14px', borderRadius:'10px', border:'1.5px solid #e2e8f0', fontSize:'14px', fontFamily:'inherit', color:'#0F2A4A', outline:'none', boxSizing:'border-box' as const }} />
                </div>
              </div>
              <div style={{ marginTop:'8px', fontSize:'12px', color:'#94a3b8' }}>If only width is set, height is calculated automatically to preserve the original aspect ratio.</div>
            </div>
          )}

          {/* PERCENT MODE */}
          {mode === 'percent' && (
            <div>
              <div style={{ fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'12px' }}>Scale to percentage of original:</div>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const, marginBottom:'16px' }}>
                {['25','50','75'].map(p => (
                  <button key={p} onClick={() => setPercent(p)}
                    style={{ padding:'8px 16px', borderRadius:'8px', border:'1.5px solid', borderColor: percent === p ? '#E85D04' : '#e2e8f0', background: percent === p ? '#FFF7ED' : 'white', color: percent === p ? '#E85D04' : '#0F2A4A', fontSize:'13px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
                    {p}%
                  </button>
                ))}
              </div>
              <label style={{ display:'block', fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px' }}>Custom percentage (1–100)</label>
              <input type="number" min="1" max="100" value={percent} onChange={e => setPercent(e.target.value)} placeholder="e.g. 50"
                style={{ width:'100%', padding:'12px 14px', borderRadius:'10px', border:'1.5px solid #e2e8f0', fontSize:'14px', fontFamily:'inherit', color:'#0F2A4A', outline:'none', boxSizing:'border-box' as const }} />
              <div style={{ marginTop:'8px', fontSize:'12px', color:'#94a3b8' }}>The image is scaled to this percentage of its original size, keeping its proportions.</div>
            </div>
          )}

          {/* RATIO MODE */}
          {mode === 'ratio' && (
            <div>
              <div style={{ fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'12px' }}>Aspect ratio:</div>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const, marginBottom:'20px' }}>
                {([['1:1',1,1],['16:9',16,9],['4:3',4,3],['9:16',9,16],['3:2',3,2]] as const).map(([label, w, h]) => {
                  const active = ratioW === w && ratioH === h
                  return (
                    <button key={label} onClick={() => { setRatioW(w); setRatioH(h) }}
                      style={{ padding:'8px 16px', borderRadius:'8px', border:'1.5px solid', borderColor: active ? '#E85D04' : '#e2e8f0', background: active ? '#FFF7ED' : 'white', color: active ? '#E85D04' : '#0F2A4A', fontSize:'13px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
                      {label}
                    </button>
                  )
                })}
              </div>
              <div style={{ display:'flex', gap:'16px', flexWrap:'wrap' as const, marginBottom:'16px' }}>
                <div style={{ flex:1, minWidth:'140px' }}>
                  <label style={{ display:'block', fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px' }}>Target width (px)</label>
                  <input type="number" value={ratioWidth} onChange={e => setRatioWidth(e.target.value)} placeholder="e.g. 1080"
                    style={{ width:'100%', padding:'12px 14px', borderRadius:'10px', border:'1.5px solid #e2e8f0', fontSize:'14px', fontFamily:'inherit', color:'#0F2A4A', outline:'none', boxSizing:'border-box' as const }} />
                </div>
                <div style={{ flex:1, minWidth:'140px' }}>
                  <label style={{ display:'block', fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px' }}>Crop position</label>
                  <div style={{ display:'flex', gap:'6px' }}>
                    {(['top','center','bottom'] as const).map(pos => (
                      <button key={pos} onClick={() => setCropPosition(pos)}
                        style={{ flex:1, padding:'12px 6px', borderRadius:'10px', border:'1.5px solid', borderColor: cropPosition === pos ? '#E85D04' : '#e2e8f0', background: cropPosition === pos ? '#FFF7ED' : 'white', color: cropPosition === pos ? '#E85D04' : '#0F2A4A', fontSize:'13px', fontWeight:700, cursor:'pointer', fontFamily:'inherit', textTransform:'capitalize' as const }}>
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ fontSize:'12px', color:'#94a3b8' }}>The image is cropped to the chosen ratio. Crop position controls which part is kept when the image must be trimmed.</div>
            </div>
          )}
        </div>

        {error && <div style={{ marginTop:'16px', background:'#FEE2E2', border:'1.5px solid #FCA5A5', borderRadius:'10px', padding:'12px 16px', color:'#991B1B', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}
        {success && <div style={{ marginTop:'16px', background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'10px', padding:'12px 16px', color:'#166534', fontSize:'14px', fontWeight:600 }}>✅ Image resized! Your download has started.</div>}
        {success && <FileAutoDeletedNotice />}

        <div style={{ marginTop:'24px', textAlign:'center' as const }}>
          <button onClick={resize} disabled={!file || processing}
            style={{ background: !file || processing ? '#cbd5e1' : '#E85D04', color:'white', padding:'16px 48px', borderRadius:'12px', border:'none', fontSize:'16px', fontWeight:700, cursor: !file || processing ? 'not-allowed' : 'pointer', fontFamily:'inherit', minWidth:'220px' }}>
            {processing ? '⏳ Resizing…' : '⤢ Resize Image'}
          </button>
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'48px auto 0', padding:'0 24px 48px' }}>
        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'Will the aspect ratio be maintained?', a:'Yes — if you only set the width, height is calculated automatically. If you set both, the image will be resized to exactly those dimensions (may distort).' },
            { q:'What formats are supported?', a:'JPG, PNG, WebP, and BMP. The output format matches the input.' },
            { q:'Is there a file size limit?', a:'Yes, images up to 20 MB are supported.' },
            { q:'Are my files kept private?', a:'Yes. Files are sent over HTTPS and deleted within 1 hour.' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'14px 18px', marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px', fontWeight:600, color:'#0F2A4A', cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px', color:'#64748b', lineHeight:'1.7', marginTop:'10px', marginBottom:0 }}>{faq.a}</p>
            </details>
          ))}
        </section>
      </div>
      <ToolPageSEO
        toolName="Image Resizer"
        whatIs="Resizing an image means changing its dimensions — the width and height measured in pixels. This is different from compressing: resizing changes how big the image is, while compression changes how much space it takes up. You resize an image to fit a specific space: a profile picture that needs to be a certain size, a banner with exact dimensions, or a photo that's simply too large for where you want to use it."
        whatIsExtended="Most images straight from a camera or phone are far larger than they need to be — often several thousand pixels wide. Resizing them down to the size you actually need makes them load faster and fit properly. ConvertDox lets you set exact dimensions or scale by percentage, with the option to keep the original proportions so the image doesn't look stretched. Files are processed securely and deleted within minutes, with no watermark."
        howToUse={[
          'Upload the image you want to resize by clicking the upload area or dragging it in',
          'Enter the new width and height in pixels, or scale by a percentage',
          'Keep the "maintain aspect ratio" option on to avoid stretching the image',
          'Preview the new dimensions before applying',
          'Resize and download the new image, ready to use',
          'Your original file is automatically deleted from our servers within minutes',
        ]}
        useCases={[
          { title: 'Profile Pictures', description: 'Resize a photo to the exact dimensions a platform requires for avatars or profile images.' },
          { title: 'Social Media Graphics', description: 'Fit images to the precise sizes each platform uses for posts, stories, and banners.' },
          { title: 'Website Images', description: 'Scale images down to their display size so pages load faster and look crisp.' },
          { title: 'Email Signatures', description: 'Resize a logo or photo to fit neatly within an email signature.' },
          { title: 'Printing', description: 'Adjust image dimensions to match the size you intend to print.' },
          { title: 'Thumbnails', description: 'Create small, consistent thumbnail versions of larger images for galleries or listings.' },
        ]}
        tips={[
          'Keep aspect ratio locked to avoid a stretched or squashed look',
          'Resizing down keeps quality; enlarging a small image can make it blurry',
          'Know the exact dimensions you need before resizing — check the platform\'s requirements',
          'Resize first, then compress, for the smallest possible file',
          'For web, match the image to its display size rather than uploading something much larger',
          'Keep the original if you might need a larger version later',
        ]}
        faqs={[
          { question: 'Is the image resizer free?', answer: 'Yes, completely free with no signup and no watermark added to your images.' },
          { question: 'What\'s the difference between resizing and compressing?', answer: 'Resizing changes the image dimensions (width and height in pixels). Compressing reduces the file size without necessarily changing dimensions. You can do both for the smallest, best-fitting image.' },
          { question: 'Will resizing reduce quality?', answer: 'Resizing down preserves quality well. Enlarging a small image beyond its original size can make it look blurry, since there\'s no extra detail to add.' },
          { question: 'Can I keep the proportions?', answer: 'Yes. Keep the "maintain aspect ratio" option enabled and the image scales proportionally without stretching.' },
          { question: 'Are my images private?', answer: 'Yes. Your image is uploaded securely, resized, and automatically deleted from our servers within minutes. We never store or share your files.' },
          { question: 'What formats can I resize?', answer: 'Common image formats including JPG, PNG, and WebP are supported.' },
        ]}
        relatedTools={[
          { name: 'Compress Image', slug: 'compress-image', description: 'Reduce image file size' },
          { name: 'Crop Image', slug: 'image-crop', description: 'Crop images to a specific area' },
          { name: 'Image Converter', slug: 'image-convert', description: 'Convert between JPG, PNG, WebP, and AVIF' },
          { name: 'Batch Resize', slug: 'resize-images-batch', description: 'Resize multiple images at once' },
          { name: 'Aspect Ratio Calculator', slug: 'aspect-ratio', description: 'Work out dimensions and ratios' },
        ]}
      />
    </div>
  )
}
