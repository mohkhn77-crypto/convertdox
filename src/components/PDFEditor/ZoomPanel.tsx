/* eslint-disable @next/next/no-img-element */
'use client'
import { useState, useEffect } from 'react'

interface Props {
  pageNumber: number
  sessionId: string
  backendUrl: string
  onClose: () => void
}

export default function ZoomPanel({ pageNumber, sessionId, backendUrl, onClose }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setError('')
    setImageUrl(`${backendUrl}/api/pdf/editor/page-image/${sessionId}/${pageNumber}`)
  }, [pageNumber, sessionId, backendUrl])

  return (
    <div style={{ width: '480px', flexShrink: 0, background: 'white', borderLeft: '1.5px solid #e2e8f0', position: 'sticky', top: '80px', height: 'calc(100vh - 80px)', overflowY: 'auto', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#0F2A4A' }}>Page {pageNumber}</div>
        <button onClick={onClose}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M5 5L15 15M5 15L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Page ${pageNumber} full view`}
          style={{ width: '100%', height: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
          onError={() => setError('Could not load page preview. The session may have expired.')}
        />
      )}

      {error && (
        <div style={{ padding: '12px 16px', background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: '8px', color: '#DC2626', fontSize: '14px' }}>
          {error}
        </div>
      )}
    </div>
  )
}
