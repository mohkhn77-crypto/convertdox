'use client'

export default function FileAutoDeletedNotice() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: '#F0FDF4',
      border: '1.5px solid #BBF7D0',
      borderRadius: '12px',
      padding: '12px 16px',
      marginTop: '16px',
      fontSize: '13.5px',
      color: '#166534',
      lineHeight: 1.5
    }}>
      <span style={{ fontSize: '16px', flexShrink: 0 }}>🔒</span>
      <span>
        <strong>Your file was automatically deleted from our servers.</strong>{' '}
        We remove uploaded files within seconds of processing — nothing is stored or shared.
      </span>
    </div>
  )
}
