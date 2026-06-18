'use client'
import { useState } from 'react'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || ''

export default function DeleteFileNowButton({ sessionId, onDeleted }: { sessionId: string, onDeleted?: () => void }) {
  const [state, setState] = useState<'idle' | 'deleting' | 'done' | 'error'>('idle')

  async function handleDelete() {
    if (!sessionId || state === 'deleting' || state === 'done') return
    setState('deleting')
    try {
      const res = await fetch(`${BACKEND}/api/pdf/editor/delete-session/${sessionId}`, {
        method: 'POST'
      })
      const data = await res.json()
      if (data.deleted) {
        setState('done')
        onDeleted?.()
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: '#F0FDF4', border: '1.5px solid #BBF7D0',
        borderRadius: '10px', padding: '10px 14px',
        fontSize: '13.5px', color: '#166534', fontWeight: 600
      }}>
        ✓ Your file was permanently deleted from our servers.
      </div>
    )
  }

  return (
    <div style={{ marginTop: '12px' }}>
      <button
        onClick={handleDelete}
        disabled={state === 'deleting'}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: state === 'error' ? '#FEF2F2' : 'white',
          border: `1.5px solid ${state === 'error' ? '#FECACA' : '#e2e8f0'}`,
          borderRadius: '10px', padding: '10px 16px',
          fontSize: '13.5px', fontWeight: 600,
          color: state === 'error' ? '#991B1B' : '#0F2A4A',
          cursor: state === 'deleting' ? 'default' : 'pointer'
        }}
      >
        🗑️ {state === 'deleting' ? 'Deleting…' : state === 'error' ? 'Try again' : 'Delete my file now'}
      </button>
      <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>
        Your file is held temporarily so you can keep editing, and auto-deletes within 1 hour. Delete it instantly above.
      </div>
    </div>
  )
}
