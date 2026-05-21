export default function TrustStrip() {
  return (
    <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'16px 24px 0' }}>
      <div style={{ background:'#F0FDF4',border:'1.5px solid #BBF7D0',borderRadius:'12px',padding:'12px 16px',display:'flex',alignItems:'center',gap:'14px',flexWrap:'wrap',justifyContent:'center' }}>
        {[
          { icon:'🔒', text:'No files stored' },
          { icon:'🛡', text:'HTTPS encrypted' },
          { icon:'⚡', text:'Works in your browser' },
          { icon:'🆓', text:'100% free, no signup' },
        ].map(item => (
          <span key={item.text} style={{ fontSize:'13px',color:'#166534',fontWeight:600,display:'flex',alignItems:'center',gap:'6px' }}>
            <span style={{ fontSize:'16px' }}>{item.icon}</span>{item.text}
          </span>
        ))}
      </div>
    </div>
  )
}
