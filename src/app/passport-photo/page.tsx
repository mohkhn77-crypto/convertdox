'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'
import PassportEditor from '@/components/PassportEditor'


const COUNTRIES = [
  { key: 'us',         pxW: 600, pxH: 600, name: 'United States',        flag: '🇺🇸', size: '2×2 in (600×600px)',        bg: 'Plain white or off-white',    bgColor: '#FFFFFF', note: 'Head 25–35mm (chin to crown). Off-white accepted.' },
  { key: 'uk',         pxW: 413, pxH: 531, name: 'United Kingdom',        flag: '🇬🇧', size: '35×45mm (413×531px)',        bg: 'Light grey (NOT pure white)', bgColor: '#D8D8D8', note: 'UK prefers a light grey background — pure white is a common rejection reason.' },
  { key: 'schengen',   pxW: 413, pxH: 531, name: 'Schengen / EU',         flag: '🇪🇺', size: '35×45mm (413×531px)',        bg: 'Light grey or cream',         bgColor: '#D8D8D8', note: 'Used for Schengen visas and most EU passports. Germany requires light grey.' },
  { key: 'canada',     pxW: 591, pxH: 827, name: 'Canada',                flag: '🇨🇦', size: '50×70mm (591×827px)',        bg: 'Plain white',                 bgColor: '#FFFFFF', note: 'Unique larger size. Face 31–36mm chin to crown. Printed photos need a photographer stamp.' },
  { key: 'india',      pxW: 600, pxH: 600, name: 'India',                 flag: '🇮🇳', size: '51×51mm (600×600px)',        bg: 'Pure white only',             bgColor: '#FFFFFF', note: 'Off-white can be rejected. Online uploads often capped at 300KB — compress after.' },
  { key: 'pakistan',   pxW: 413, pxH: 531, name: 'Pakistan',              flag: '🇵🇰', size: '35×45mm (413×531px)',        bg: 'Plain white',                 bgColor: '#FFFFFF', note: 'White background, full face, neutral expression. Used for NADRA/passport and visa photos.' },
  { key: 'australia',  pxW: 413, pxH: 531, name: 'Australia',             flag: '🇦🇺', size: '35×45mm (413×531px)',        bg: 'Plain white',                 bgColor: '#FFFFFF', note: 'Head 32–36mm chin to crown. No glasses (strict since 2024).' },
  { key: 'china',      pxW: 390, pxH: 567, name: 'China',                 flag: '🇨🇳', size: '33×48mm (390×567px)',        bg: 'Plain white',                 bgColor: '#FFFFFF', note: 'Narrower format. Visa uploads often need a specific small file size.' },
  { key: 'japan',      pxW: 413, pxH: 531, name: 'Japan',                 flag: '🇯🇵', size: '35×45mm (413×531px)',        bg: 'Plain white or light',        bgColor: '#FFFFFF', note: 'Head should fill roughly 70–80% of the photo height.' },
  { key: 'germany',    pxW: 413, pxH: 531, name: 'Germany',               flag: '🇩🇪', size: '35×45mm (413×531px)',        bg: 'Light grey (NOT white)',      bgColor: '#D8D8D8', note: 'Germany requires a plain light-grey background. Pure white is commonly rejected.' },
  { key: 'france',     pxW: 413, pxH: 531, name: 'France',                flag: '🇫🇷', size: '35×45mm (413×531px)',        bg: 'Light grey or light blue',    bgColor: '#D8D8D8', note: 'France bans pure white backgrounds — use light grey or light blue.' },
  { key: 'italy',      pxW: 413, pxH: 531, name: 'Italy',                 flag: '🇮🇹', size: '35×45mm (413×531px)',        bg: 'White or light grey',         bgColor: '#FFFFFF', note: 'Standard 35×45mm. Check whether you need a passport, CIE, or consular photo.' },
  { key: 'spain',      pxW: 413, pxH: 531, name: 'Spain',                 flag: '🇪🇸', size: '35×45mm (413×531px)',        bg: 'White or light grey',         bgColor: '#FFFFFF', note: 'Standard 35×45mm format for Spanish passport and ID.' },
  { key: 'ireland',    pxW: 413, pxH: 531, name: 'Ireland',               flag: '🇮🇪', size: '35×45mm (413×531px)',        bg: 'White, grey or cream',        bgColor: '#FFFFFF', note: 'Ireland accepts white, light grey, or cream backgrounds.' },
  { key: 'brazil',     pxW: 591, pxH: 827, name: 'Brazil',                flag: '🇧🇷', size: '50×70mm (591×827px)',        bg: 'Plain white',                 bgColor: '#FFFFFF', note: 'Brazil uses the larger 50×70mm format, like Canada.' },
  { key: 'mexico',     pxW: 413, pxH: 531, name: 'Mexico',                flag: '🇲🇽', size: '35×45mm (413×531px)',        bg: 'Plain white',                 bgColor: '#FFFFFF', note: 'Passport applications often require three printed copies.' },
  { key: 'bangladesh', pxW: 413, pxH: 531, name: 'Bangladesh',            flag: '🇧🇩', size: '35×45mm (413×531px)',        bg: 'Plain white',                 bgColor: '#FFFFFF', note: 'Standard 35×45mm with a plain white background.' },
  { key: 'nigeria',    pxW: 413, pxH: 531, name: 'Nigeria',               flag: '🇳🇬', size: '35×45mm (413×531px)',        bg: 'Plain white',                 bgColor: '#FFFFFF', note: 'Standard 35×45mm. Used for passport and many visa applications.' },
  { key: 'philippines',pxW: 600, pxH: 600, name: 'Philippines',           flag: '🇵🇭', size: '2×2 in (600×600px)',        bg: 'Plain white',                 bgColor: '#FFFFFF', note: 'Philippines uses the 2×2 inch square format like the US.' },
  { key: 'uae',        pxW: 508, pxH: 650, name: 'United Arab Emirates',  flag: '🇦🇪', size: '43×55mm (508×650px)',        bg: 'Plain white',                 bgColor: '#FFFFFF', note: 'UAE visa/residence photos. Emirates ID may use a different size — check your document.' },
  { key: 'saudi',      pxW: 472, pxH: 709, name: 'Saudi Arabia',          flag: '🇸🇦', size: '40×60mm (472×709px)',        bg: 'Plain white',                 bgColor: '#FFFFFF', note: 'White background. Online portals often enforce a small file-size limit (~200KB).' },
  { key: 'turkey',     pxW: 591, pxH: 709, name: 'Turkey',                flag: '🇹🇷', size: '50×60mm (591×709px)',        bg: 'Plain white',                 bgColor: '#FFFFFF', note: 'Taller 50×60mm format. Both ears should be visible.' },
  { key: 'singapore',  pxW: 413, pxH: 531, name: 'Singapore',             flag: '🇸🇬', size: '35×45mm (413×531px)',        bg: 'Plain white',                 bgColor: '#FFFFFF', note: 'White background. Online uploads often capped near 60KB — compress after sizing.' },
  { key: 'malaysia',   pxW: 413, pxH: 531, name: 'Malaysia',              flag: '🇲🇾', size: '35×45mm (413×531px)',        bg: 'Plain white',                 bgColor: '#FFFFFF', note: 'Standard 35×45mm with a white background.' },
]

export default function PassportPhotoPage() {
  const [file, setFile] = useState<File | null>(null)
  const [country, setCountry] = useState('us')
  const [replaceBg, setReplaceBg] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const selectedCountry = COUNTRIES.find(c => c.key === country) || COUNTRIES[0]

  const handleFile = (f: File | null) => {
    if (!f) return
    if (!f.type.startsWith('image/')) { setError('Only image files are accepted'); return }
    setFile(f); setError(''); setSuccess(false)
  }

  // Called by the editor with the already-cropped, correctly-sized JPEG blob
  const handleCropped = async (croppedBlob: Blob) => {
    setProcessing(true); setError(''); setSuccess(false); setStatusMsg('')
    try {
      let finalBlob: Blob = croppedBlob

      if (replaceBg) {
        // Remove background from the cropped image, then composite onto the country color
        setStatusMsg('Loading model (first run may take a moment)…')
        const { removeBackground } = await import('@imgly/background-removal')
        setStatusMsg('Removing background…')
        const cutout = await removeBackground(croppedBlob)

        setStatusMsg('Applying passport background…')
        finalBlob = await new Promise<Blob>((resolve, reject) => {
          const img = new Image()
          img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight
            const ctx = canvas.getContext('2d')
            if (!ctx) { reject(new Error('Canvas not supported')); return }
            ctx.fillStyle = selectedCountry.bgColor || '#FFFFFF'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0)
            canvas.toBlob(b => b ? resolve(b) : reject(new Error('Failed to create image')), 'image/jpeg', 0.95)
          }
          img.onerror = () => reject(new Error('Failed to load cutout'))
          img.src = URL.createObjectURL(cutout)
        })
      }

      // Download
      const url = URL.createObjectURL(finalBlob)
      const a = document.createElement('a')
      a.href = url; a.download = 'passport-photo.jpg'
      document.body.appendChild(a); a.click()
      URL.revokeObjectURL(url); document.body.removeChild(a)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create passport photo. Please try again.')
    } finally {
      setProcessing(false)
      setStatusMsg('')
    }
  }

  const fmt = (b: number) => b < 1_048_576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1_048_576).toFixed(1)} MB`

  return (
    <div style={{ minHeight:'100vh', background:'#fff', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>🛂</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>Passport Photo Editor</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Crop & size photos to official passport dimensions for the US, UK, EU, Canada, India & more</p>
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

      <div style={{ maxWidth:'860px', margin:'20px auto 0', padding:'0 24px' }}>
          {/* Disclaimer banner */}
          <div style={{ background:'#FFFBEB', border:'1.5px solid #FDE68A', borderRadius:'12px', padding:'12px 16px', marginBottom:'16px' }}>
            <div style={{ fontSize:'13px', color:'#92400E', lineHeight:'1.6' }}>
              <strong>⚠️ Please read:</strong> This tool crops and sizes your photo to the official <strong>dimensions</strong> for the selected country. You are responsible for meeting the other requirements — background color, head size and position, neutral expression, and no glasses where required. Always verify against the official government source before submitting.
            </div>
          </div>

          {/* Country selector */}
          <div style={{ background:'white', border:'1.5px solid #e2e8f0', borderRadius:'12px', padding:'18px' }}>
            <label style={{ fontSize:'14px', fontWeight:700, color:'#0F2A4A', display:'block', marginBottom:'10px' }}>🌍 Select country</label>
            <select value={country} onChange={e => setCountry(e.target.value)}
              style={{ width:'100%', padding:'12px 14px', borderRadius:'10px', border:'1.5px solid #e2e8f0', fontSize:'14px', fontFamily:'inherit', color:'#0F2A4A', outline:'none', background:'white', boxSizing:'border-box' as const, marginBottom:'14px' }}>
              {COUNTRIES.map(c => <option key={c.key} value={c.key}>{c.flag} {c.name} — {c.size}</option>)}
            </select>

            {/* Per-country info */}
            <div style={{ background:'#EFF6FF', border:'1.5px solid #BFDBFE', borderRadius:'10px', padding:'12px 14px', marginBottom:'14px' }}>
              <div style={{ fontSize:'13px', color:'#1E3A8A', lineHeight:'1.7' }}>
                <div style={{ fontSize:'15px', fontWeight:700, marginBottom:'4px' }}>{selectedCountry.flag} {selectedCountry.name}</div>
                <div><strong>Size:</strong> {selectedCountry.size} · 300 DPI · JPEG</div>
                <div><strong>Background:</strong> {selectedCountry.bg}</div>
                <div style={{ marginTop:'4px', color:'#1E40AF' }}>{selectedCountry.note}</div>
              </div>
            </div>

            {/* Background replacement toggle */}
            <div style={{ marginTop:'16px', paddingTop:'16px', borderTop:'1.5px solid #f1f5f9' }}>
              <label style={{ display:'flex', alignItems:'flex-start', gap:'10px', cursor:'pointer' }}>
                <input type="checkbox" checked={replaceBg} onChange={e => setReplaceBg(e.target.checked)} style={{ marginTop:'3px', width:'18px', height:'18px', accentColor:'#E85D04', cursor:'pointer' }} />
                <span>
                  <span style={{ fontSize:'14px', fontWeight:700, color:'#0F2A4A' }}>✨ Replace background with {selectedCountry.name} passport color</span>
                  <span style={{ display:'block', fontSize:'12px', color:'#94a3b8', marginTop:'4px', lineHeight:'1.5' }}>
                    Removes your photo&apos;s background and replaces it with the required color ({selectedCountry.bg}). Runs an AI model in your browser — the first run downloads it (a few seconds). Works best with a clear subject. Always check the result before submitting.
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>

      <div style={{ maxWidth:'860px', margin:'16px auto 0', padding:'0 24px' }}>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#E85D04'; (e.currentTarget as HTMLDivElement).style.background='#FFF7ED' }}
          onDragLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc' }}
          onDrop={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc'; handleFile(e.dataTransfer.files[0] ?? null) }}
          style={{ background:'#f8fafc', border:'2px dashed #cbd5e1', borderRadius:'16px', padding:'48px 24px', textAlign:'center' as const, cursor:'pointer', transition:'all 0.2s' }}>
          <div style={{ fontSize:'56px', marginBottom:'12px' }}>🛂</div>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'20px', fontWeight:700, color:'#0F2A4A', marginBottom:'6px' }}>Drop your photo here</div>
          <div style={{ fontSize:'14px', color:'#64748b', marginBottom:'18px' }}>or click to browse from your computer</div>
          <button style={{ background:'#E85D04', color:'white', padding:'12px 32px', borderRadius:'10px', border:'none', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Select Photo</button>
          <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'12px' }}>JPG, PNG, WebP · Max 20 MB</div>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e => handleFile(e.target.files?.[0] ?? null)} />
        </div>

        {file && (
          <div style={{ marginTop:'20px', background:'white', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'16px', display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ width:'40px', height:'40px', background:'#F0FDF4', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0 }}>🖼</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'14px', fontWeight:600, color:'#0F2A4A', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{file.name}</div>
              <div style={{ fontSize:'12px', color:'#94a3b8' }}>{fmt(file.size)}</div>
            </div>
            <button onClick={() => { setFile(null); setSuccess(false) }} style={{ background:'#FEE2E2', color:'#DC2626', border:'none', borderRadius:'6px', padding:'4px 10px', cursor:'pointer', fontWeight:700, fontSize:'16px' }}>×</button>
          </div>
        )}

        {file && (
          <div style={{ marginTop:'24px', background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'16px', padding:'24px' }}>
            <div style={{ fontSize:'15px', fontWeight:700, color:'#0F2A4A', marginBottom:'4px', textAlign:'center' as const }}>Position your photo</div>
            <div style={{ fontSize:'13px', color:'#64748b', marginBottom:'18px', textAlign:'center' as const }}>Drag to move, pinch or use the slider to zoom. Line up your face with the guide oval.</div>
            <PassportEditor
              key={country + '-' + (file?.name ?? '')}
              file={file}
              targetWidth={selectedCountry.pxW}
              targetHeight={selectedCountry.pxH}
              bgColor={replaceBg ? selectedCountry.bgColor : '#FFFFFF'}
              showGuides={true}
              onCropped={handleCropped}
              exportLabel={processing ? '⏳ Working…' : (replaceBg ? '✨ Create with background' : '🛂 Create Passport Photo')}
            />
          </div>
        )}

        {error && <div style={{ marginTop:'16px', background:'#FEE2E2', border:'1.5px solid #FCA5A5', borderRadius:'10px', padding:'12px 16px', color:'#991B1B', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}
        {processing && statusMsg && <div style={{ marginTop:'16px', background:'#EFF6FF', border:'1.5px solid #BFDBFE', borderRadius:'10px', padding:'12px 16px', color:'#1E40AF', fontSize:'14px', fontWeight:600 }}>⏳ {statusMsg}</div>}
        {success && <div style={{ marginTop:'16px', background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'10px', padding:'12px 16px', color:'#166534', fontSize:'14px', fontWeight:600 }}>✅ Done! Your passport-photo.jpg has downloaded ({selectedCountry.size}).</div>}
      </div>

      <div style={{ maxWidth:'860px', margin:'48px auto 0', padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>How to Make a Passport Photo</h2>
          <ol style={{ paddingLeft:'24px', fontSize:'15px', color:'#64748b', lineHeight:'1.8' }}>
            {['Take a photo with your face centered against a plain background.','Upload the photo here.','Click "Create Passport Photo" — image is cropped to 600×600px at 300 DPI.','Download and print at 2×2 inches on photo paper.'].map((s,i) => (
              <li key={i} style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step {i+1}:</strong> {s}</li>
            ))}
          </ol>
        </section>
        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'Does this meet official passport requirements?', a:'The output dimensions match US standard (2×2 inches at 300 DPI). However, each country has specific requirements (white background, head position, expression). Always verify official requirements before submitting.' },
            { q:'What if my face is not centered?', a:'The tool applies a center crop. For best results, ensure your face is centered in the original photo before uploading.' },
            { q:'Can I use this for visa photos?', a:'Visa photos typically follow the same 2×2 inch format. Check the specific country\'s visa photo requirements for any additional rules.' },
            { q:'Is there a file size limit?', a:'Images up to 20 MB are supported.' },
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
