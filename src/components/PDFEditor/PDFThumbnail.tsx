/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from 'react'
import type { PageState, EditorMode, EditorFeature } from '@/types/pdf-editor'

interface Props {
  pageState: PageState
  thumbnail?: string
  mode: EditorMode
  features: EditorFeature[]
  onSelect: () => void
  onDelete: () => void
  onRotate: () => void
  onDuplicate: () => void
  onZoom: () => void
  onDragStart: () => void
  onDragEnter: () => void
}

function ActionButton({ children, onClick, title, danger }: { children: React.ReactNode; onClick: () => void; title: string; danger?: boolean }) {
  return (
    <button
      onMouseDown={e => e.stopPropagation()}
      onClick={e => { e.stopPropagation(); onClick() }}
      title={title}
      style={{ width: '28px', height: '28px', borderRadius: '6px', border: 'none', background: 'transparent', color: danger ? '#DC2626' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontFamily: 'inherit' }}
      onMouseEnter={e => { e.currentTarget.style.background = danger ? '#FEF2F2' : '#f1f5f9' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
    >
      {children}
    </button>
  )
}

export default function PDFThumbnail({ pageState, thumbnail, mode, features, onSelect, onDelete, onRotate, onDuplicate, onZoom, onDragStart, onDragEnter }: Props) {
  const [hovered, setHovered] = useState(false)

  const canDelete = features.includes('delete') && mode !== 'view'
  const canRotate = features.includes('rotate')
  const canDuplicate = features.includes('duplicate')
  const canZoom = features.includes('zoom')

  const borderColor = pageState.toDelete ? '#DC2626' : pageState.selected ? '#E85D04' : hovered ? '#94a3b8' : '#e2e8f0'
  const accentColor = pageState.toDelete ? '#DC2626' : pageState.selected ? '#E85D04' : '#0F2A4A'

  return (
    <div
      onMouseEnter={() => { setHovered(true); onDragEnter() }}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={e => { e.preventDefault(); onDragStart() }}
      style={{
        background: 'white',
        borderRadius: '12px',
        border: `2px solid ${borderColor}`,
        overflow: 'hidden',
        transition: 'border-color 0.15s, transform 0.15s, box-shadow 0.15s',
        position: 'relative',
        cursor: mode !== 'view' ? 'pointer' : 'default',
        transform: hovered && !pageState.toDelete ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
        userSelect: 'none',
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: '3px', background: accentColor, transition: 'background 0.15s' }} />

      {/* Checkbox (visible on hover or when selected) */}
      {mode !== 'view' && (hovered || pageState.selected) && (
        <div
          onMouseDown={e => e.stopPropagation()}
          onClick={e => { e.stopPropagation(); onSelect() }}
          style={{
            position: 'absolute', top: '12px', right: '12px',
            width: '24px', height: '24px', borderRadius: '6px',
            background: pageState.selected ? '#E85D04' : 'white',
            border: `2px solid ${pageState.selected ? '#E85D04' : '#cbd5e1'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 10, transition: 'all 0.15s',
          }}
        >
          {pageState.selected && (
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5L5 9.5L11 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      )}

      {/* Thumbnail */}
      <div style={{ padding: '12px', aspectRatio: '0.77', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', opacity: pageState.toDelete ? 0.35 : 1, position: 'relative', overflow: 'hidden' }}>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={`Page ${pageState.pageNumber}`}
            draggable={false}
            style={{
              maxWidth: '100%', maxHeight: '100%', objectFit: 'contain',
              transform: `rotate(${pageState.rotation}deg)`,
              transition: 'transform 0.3s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '160px', background: 'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)', backgroundSize: '200% 100%', borderRadius: '4px', animation: 'shimmer 1.5s infinite' }} />
        )}

        {pageState.toDelete && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(220,38,38,0.08)' }}>
            <div style={{ background: 'rgba(220,38,38,0.9)', color: 'white', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 700 }}>
              Will be deleted
            </div>
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div style={{ padding: '9px 12px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', minHeight: '40px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A' }}>
          Page {pageState.pageNumber}
          {pageState.isDuplicate && <span style={{ marginLeft: '6px', fontSize: '11px', color: '#E85D04' }}>(copy)</span>}
        </div>

        {hovered && !pageState.toDelete && (
          <div style={{ display: 'flex', gap: '2px' }}>
            {canRotate && (
              <ActionButton onClick={onRotate} title="Rotate 90°">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M2 7.5a5.5 5.5 0 1 1 5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M2 4.5V7.5H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ActionButton>
            )}
            {canZoom && (
              <ActionButton onClick={onZoom} title="View full page">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </ActionButton>
            )}
            {canDuplicate && (
              <ActionButton onClick={onDuplicate} title="Duplicate page">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <rect x="2" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="5" y="2" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </ActionButton>
            )}
            {canDelete && (
              <ActionButton onClick={onDelete} title="Mark for deletion" danger>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M4 4h7M5.5 4V3h4v1M5 4l.5 8M10 4l-.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ActionButton>
            )}
          </div>
        )}

        {pageState.toDelete && (
          <button onClick={e => { e.stopPropagation(); onDelete() }}
            style={{ background: 'transparent', border: 'none', color: '#E85D04', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Undo
          </button>
        )}
      </div>
    </div>
  )
}
