'use client'
import { useState, useRef, useCallback } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

type OutputTab = 'dataurl' | 'base64' | 'css'

export default function ImageToBase64Page() {
  const [dataUrl, setDataUrl] = useState<string>('')
  const [rawBase64, setRawBase64] = useState<string>('')
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState(0)
  const [tab, setTab] = useState<OutputTab>('dataurl')
  const [copied, setCopied] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [warning, setWarning] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback((file: File) => {
    setWarning('')
    if (file.size > 5 * 1024 * 1024) {
      setWarning('Warning: File is larger than 5MB. Base64 output will be very large.')
    }
    setFileName(file.name)
    setFileSize(file.size)
    const reader = new FileReader()
    reader.onload = (e) => {
      const url = e.target?.result as string
      setDataUrl(url)
      setRawBase64(url.split(',')[1] ?? '')
    }
    reader.readAsDataURL(file)
  }, [])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  function getOutput(): string {
    if (!dataUrl) return ''
    if (tab === 'dataurl') return dataUrl
    if (tab === 'base64') return rawBase64
    if (tab === 'css') return `background-image: url("${dataUrl}");`
    return dataUrl
  }

  function copy() {
    navigator.clipboard.writeText(getOutput()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`
  }

  const TABS: { id: OutputTab; label: string }[] = [
    { id: 'dataurl', label: 'Data URL' },
    { id: 'base64', label: 'Raw Base64' },
    { id: 'css', label: 'CSS Background' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🖼️</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Image to Base64</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Convert images to Base64 — files never leave your browser</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Drop zone */}
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          style={{ border: `2px dashed ${dragging ? '#E85D04' : '#cbd5e1'}`, borderRadius: '16px', padding: '48px', textAlign: 'center', cursor: 'pointer', background: dragging ? '#fff7ed' : '#f8fafc', marginBottom: '24px', transition: 'all 0.2s' }}
        >
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🖼️</div>
          <div style={{ fontWeight: 700, color: '#0F2A4A', fontSize: '16px', marginBottom: '6px' }}>Drop image here or click to upload</div>
          <div style={{ color: '#94a3b8', fontSize: '13px' }}>Supports PNG, JPG, GIF, WEBP, SVG</div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
        </div>

        {warning && (
          <div style={{ background: '#fef3c7', border: '1.5px solid #d97706', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', color: '#92400e', fontSize: '14px', fontWeight: 600 }}>
            ⚠️ {warning}
          </div>
        )}

        {dataUrl && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Preview */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>Preview</div>
              <div style={{ border: '1.5px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden', marginBottom: '14px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={dataUrl} alt={fileName} style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', display: 'block', background: '#f8fafc' }} />
              </div>
              <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>File name</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>{fileName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>File size</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>{formatSize(fileSize)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Base64 length</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>{rawBase64.length.toLocaleString()} chars</span>
                </div>
              </div>
            </div>

            {/* Output */}
            <div>
              <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '10px', padding: '3px', marginBottom: '12px' }}>
                {TABS.map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)}
                    style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', background: tab === t.id ? 'white' : 'transparent', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, color: tab === t.id ? '#0F2A4A' : '#64748b', cursor: 'pointer', boxShadow: tab === t.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
                    {t.label}
                  </button>
                ))}
              </div>
              <textarea
                readOnly
                value={getOutput()}
                rows={10}
                style={{ width: '100%', padding: '12px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontFamily: 'monospace', fontSize: '11px', color: '#374151', background: '#f8fafc', boxSizing: 'border-box' as const, resize: 'vertical' as const }}
              />
              <button onClick={copy} style={{ width: '100%', padding: '12px', background: copied ? '#dcfce7' : '#0F2A4A', color: copied ? '#16a34a' : 'white', border: 'none', borderRadius: '10px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, cursor: 'pointer', marginTop: '8px' }}>
                {copied ? '✅ Copied!' : '📋 Copy Output'}
              </button>
            </div>
          </div>
        )}

        <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '12px', padding: '16px', marginTop: '24px' }}>
          <div style={{ fontWeight: 700, color: '#15803d', marginBottom: '4px', fontSize: '14px' }}>🔒 100% Private</div>
          <div style={{ color: '#166534', fontSize: '13px' }}>Your images are processed entirely in your browser using the FileReader API. No data is uploaded to any server.</div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
