'use client'
import type { EditorMode, PageState, SplitRange } from '@/types/pdf-editor'

interface Props {
  mode: EditorMode
  pageStates: PageState[]
  splitRanges: SplitRange[]
  processing: boolean
  onProcess: () => void
  onReset: () => void
  error: string
}

export default function EditorToolbar({ mode, pageStates, splitRanges, processing, onProcess, onReset, error }: Props) {
  const totalPages = pageStates.length
  const deletedCount = pageStates.filter(p => p.toDelete).length
  const selectedCount = pageStates.filter(p => p.selected).length
  const rotatedCount = pageStates.filter(p => p.rotation > 0).length

  let buttonLabel = 'Download Modified PDF'
  if (mode === 'split') buttonLabel = 'Download Split PDFs (ZIP)'
  if (mode === 'extract') buttonLabel = 'Download Selected Pages'

  let canProcess = totalPages > 0
  if (mode === 'split') canProcess = splitRanges.length > 0
  if (mode === 'extract') canProcess = selectedCount > 0
  if (mode === 'delete-only') canProcess = deletedCount > 0

  const btnStyle: React.CSSProperties = {
    background: !canProcess || processing ? '#94a3b8' : '#E85D04',
    color: 'white',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 700,
    cursor: !canProcess || processing ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit',
  }

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1.5px solid #e2e8f0', padding: '16px 24px', zIndex: 100, boxShadow: '0 -2px 12px rgba(0,0,0,0.05)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
        <div style={{ fontSize: '14px', color: '#64748b', fontFamily: 'inherit' }}>
          {totalPages - deletedCount} of {totalPages} pages remaining
          {selectedCount > 0 && ` · ${selectedCount} selected`}
          {rotatedCount > 0 && ` · ${rotatedCount} rotated`}
          {deletedCount > 0 && ` · ${deletedCount} to delete`}
          {mode === 'split' && splitRanges.length > 0 && ` · ${splitRanges.length} range(s)`}
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onReset} disabled={processing}
            style={{ background: 'white', border: '1.5px solid #e2e8f0', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: '#0F2A4A', cursor: processing ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
            Reset
          </button>
          <button onClick={onProcess} disabled={!canProcess || processing} style={btnStyle}>
            {processing ? '⏳ Processing…' : buttonLabel}
          </button>
        </div>
      </div>
      {error && (
        <div style={{ maxWidth: '1400px', margin: '12px auto 0', padding: '10px 14px', background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: '8px', color: '#DC2626', fontSize: '14px' }}>
          ⚠️ {error}
        </div>
      )}
    </div>
  )
}
