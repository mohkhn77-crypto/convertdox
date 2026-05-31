'use client'
import type { SplitRange } from '@/types/pdf-editor'

interface Props {
  ranges: SplitRange[]
  setRanges: (ranges: SplitRange[]) => void
  totalPages: number
}

export default function SplitRangesPanel({ ranges, setRanges, totalPages }: Props) {
  function addRange() {
    const newRange: SplitRange = {
      id: Math.random().toString(36).substring(2, 9),
      startPage: 1,
      endPage: totalPages,
    }
    setRanges([...ranges, newRange])
  }

  function updateRange(id: string, field: keyof Pick<SplitRange, 'startPage' | 'endPage' | 'name'>, value: number | string) {
    setRanges(ranges.map(r => r.id === id ? { ...r, [field]: value } : r))
  }

  function removeRange(id: string) {
    setRanges(ranges.filter(r => r.id !== id))
  }

  const numIn = (label: string, val: number, min: number, max: number, onChange: (v: number) => void) => (
    <input
      type="number"
      value={val}
      onChange={e => onChange(Number(e.target.value))}
      min={min}
      max={max}
      aria-label={label}
      style={{ width: '70px', padding: '6px 10px', border: '1.5px solid #e2e8f0', borderRadius: '6px', fontSize: '14px', fontFamily: 'inherit', outline: 'none' }}
    />
  )

  return (
    <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F2A4A' }}>Split Ranges ({ranges.length})</div>
        <button onClick={addRange}
          style={{ background: '#E85D04', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
          + Add Range
        </button>
      </div>

      {ranges.length === 0 && (
        <div style={{ padding: '16px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
          Add a range to define how the PDF is split
        </div>
      )}

      {ranges.map((range, idx) => (
        <div key={range.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#0F2A4A', minWidth: '70px' }}>Range {idx + 1}:</span>
          <span style={{ fontSize: '14px', color: '#64748b' }}>Pages</span>
          {numIn('start page', range.startPage, 1, totalPages, v => updateRange(range.id, 'startPage', v))}
          <span style={{ fontSize: '14px', color: '#64748b' }}>to</span>
          {numIn('end page', range.endPage, range.startPage, totalPages, v => updateRange(range.id, 'endPage', v))}
          <button onClick={() => removeRange(range.id)}
            style={{ background: '#FEF2F2', color: '#DC2626', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', marginLeft: 'auto', fontFamily: 'inherit' }}>
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}
