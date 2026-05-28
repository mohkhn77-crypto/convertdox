'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import LegalNoticeHigh from '@/components/LegalNoticeHigh'
import LegalFooter from '@/components/LegalFooter'

interface Thumbnail {
  label: string
  url: string
  width: number
  height: number
}

function extractVideoId(input: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ]
  for (const p of patterns) {
    const m = input.trim().match(p)
    if (m) return m[1]
  }
  return null
}

export default function YouTubeThumbnailPage() {
  const [url, setUrl] = useState('')
  const [acknowledged, setAcknowledged] = useState(false)
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchThumbnails = () => {
    const videoId = extractVideoId(url)
    if (!videoId) {
      setError('Could not find a valid YouTube video ID. Paste the full YouTube URL or just the video ID.')
      setThumbnails([])
      return
    }
    setLoading(true)
    setError('')
    const sizes: Thumbnail[] = [
      { label: 'Max Resolution (1280×720)', url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, width: 1280, height: 720 },
      { label: 'Standard (640×480)', url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`, width: 640, height: 480 },
      { label: 'High Quality (480×360)', url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, width: 480, height: 360 },
      { label: 'Medium Quality (320×180)', url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, width: 320, height: 180 },
      { label: 'Default (120×90)', url: `https://img.youtube.com/vi/${videoId}/default.jpg`, width: 120, height: 90 },
    ]
    setThumbnails(sizes)
    setLoading(false)
  }

  const downloadThumbnail = async (thumb: Thumbnail) => {
    try {
      const res = await fetch(thumb.url)
      const blob = await res.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = `youtube-thumbnail-${thumb.width}x${thumb.height}.jpg`
      document.body.appendChild(a)
      a.click()
      URL.revokeObjectURL(blobUrl)
      document.body.removeChild(a)
    } catch {
      window.open(thumb.url, '_blank')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📥</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>YouTube Thumbnail Downloader</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Download YouTube video thumbnails in all available resolutions — free</p>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px 24px 0' }}>
        <div style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' as const, justifyContent: 'center' }}>
          {[{ icon: '🔒', text: 'URLs not stored' }, { icon: '🛡', text: 'HTTPS only' }, { icon: '⚡', text: 'Instant results' }, { icon: '🆓', text: '100% free' }].map(item => (
            <span key={item.text} style={{ fontSize: '13px', color: '#166534', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ fontSize: '16px' }}>{item.icon}</span>{item.text}</span>
          ))}
        </div>
      </div>

      <LegalNoticeHigh type="thirdparty" toolName="YouTube Thumbnail Downloader" acknowledged={acknowledged} onAcknowledge={setAcknowledged} />

      {/* URL input */}
      <div style={{ maxWidth: '700px', margin: '16px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' as const }}>
          <input
            type="text"
            value={url}
            onChange={e => { setUrl(e.target.value); setError(''); setThumbnails([]) }}
            onKeyDown={e => e.key === 'Enter' && url && acknowledged && !loading && fetchThumbnails()}
            placeholder="Paste YouTube URL or video ID…"
            style={{ flex: 1, minWidth: '200px', padding: '14px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', color: '#0F2A4A' }}
          />
          <button
            onClick={fetchThumbnails}
            disabled={!url || !acknowledged || loading}
            style={{
              background: !url || !acknowledged || loading ? '#cbd5e1' : '#E85D04',
              color: 'white',
              padding: '14px 32px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '15px',
              fontWeight: 700,
              cursor: !url || !acknowledged || loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {loading ? '⏳ Fetching…' : !acknowledged ? '☑️ Check box to continue' : '📥 Get Thumbnails'}
          </button>
        </div>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
          Works with full YouTube URLs, youtu.be links, Shorts URLs, and raw video IDs
        </div>
      </div>

      {error && (
        <div style={{ maxWidth: '700px', margin: '16px auto 0', padding: '0 24px' }}>
          <div style={{ background: '#FEE2E2', border: '1.5px solid #FCA5A5', borderRadius: '10px', padding: '12px 16px', color: '#991B1B', fontSize: '14px', fontWeight: 600 }}>⚠️ {error}</div>
        </div>
      )}

      {/* Thumbnail results */}
      {thumbnails.length > 0 && (
        <div style={{ maxWidth: '860px', margin: '32px auto 0', padding: '0 24px' }}>
          <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '20px', fontWeight: 800, color: '#0F2A4A', marginBottom: '20px' }}>Available Thumbnails</h2>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '20px' }}>
            {thumbnails.map(thumb => (
              <div key={thumb.label} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px', display: 'flex', flexWrap: 'wrap' as const, gap: '20px', alignItems: 'center' }}>
                <img
                  src={thumb.url}
                  alt={thumb.label}
                  style={{ width: '180px', height: 'auto', borderRadius: '8px', border: '1px solid #e2e8f0', flexShrink: 0, objectFit: 'cover' }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
                <div style={{ flex: 1, minWidth: '160px' }}>
                  <div style={{ fontWeight: 700, color: '#0F2A4A', fontSize: '15px', marginBottom: '4px' }}>{thumb.label}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>{thumb.width}×{thumb.height} px · JPEG</div>
                  <button
                    onClick={() => downloadThumbnail(thumb)}
                    style={{ background: '#E85D04', color: 'white', padding: '10px 24px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    ⬇ Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* How-to + FAQ */}
      <div style={{ maxWidth: '860px', margin: '48px auto 0', padding: '0 24px' }}>
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '26px', fontWeight: 800, color: '#0F2A4A', marginBottom: '16px' }}>How to Download YouTube Thumbnails</h2>
          <ol style={{ paddingLeft: '24px', fontSize: '15px', color: '#64748b', lineHeight: '1.8' }}>
            {[
              'Copy the YouTube video URL from your browser or the YouTube app.',
              'Paste it into the input above and check the acknowledgment box.',
              'Click "Get Thumbnails" — all available sizes appear instantly.',
              'Click Download next to the resolution you need.',
            ].map((s, i) => (
              <li key={i} style={{ marginBottom: '10px' }}><strong style={{ color: '#0F2A4A' }}>Step {i + 1}:</strong> {s}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '26px', fontWeight: 800, color: '#0F2A4A', marginBottom: '16px' }}>Frequently Asked Questions</h2>
          {[
            { q: 'Is it legal to download YouTube thumbnails?', a: "YouTube thumbnails are public images that YouTube makes accessible to anyone. You can download them for personal use, fair use (commentary, criticism, education, research), or with the creator's permission. However, you cannot republish them as your own content or use them commercially without authorization from the copyright holder." },
            { q: 'Are these thumbnails royalty-free?', a: 'No. All thumbnails belong to their original creators and are protected by copyright. This tool simply provides access to publicly available image URLs. Always respect creators\' intellectual property rights.' },
            { q: 'Can I use thumbnails for my YouTube channel or website?', a: 'Only if you have permission from the original creator or if your usage qualifies as fair use (commentary, criticism, education, news, research). When in doubt, contact the creator for permission.' },
            { q: 'Does this tool store my downloaded thumbnails?', a: 'No. ConvertDox does not store or save any thumbnails. We simply provide direct links to YouTube\'s publicly hosted thumbnail images.' },
            { q: 'What if I find a thumbnail that violates copyright?', a: 'YouTube has their own DMCA process for copyright issues. We recommend reporting copyright infringement directly to YouTube. You can also contact us if you believe our tool is being misused.' },
            { q: 'Why does the Max Resolution thumbnail sometimes fail to load?', a: 'Not all videos have a maxresdefault.jpg — it depends on the upload. If it fails to display, use the Standard (640×480) or High Quality version instead.' },
            { q: 'Which formats and sizes are available?', a: 'YouTube generates thumbnails at five standard sizes: 1280×720 (max), 640×480 (standard), 480×360 (high quality), 320×180 (medium), and 120×90 (default). All are JPEG format.' },
          ].map(faq => (
            <details key={faq.q} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '14px 18px', marginBottom: '8px' }}>
              <summary style={{ fontSize: '15px', fontWeight: 600, color: '#0F2A4A', cursor: 'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.7', marginTop: '10px', marginBottom: 0 }}>{faq.a}</p>
            </details>
          ))}
        </section>
      </div>

      <LegalFooter toolName="YouTube Thumbnail Downloader" type="thirdparty" thirdParty="YouTube" />
      <SiteFooter />
    </div>
  )
}
