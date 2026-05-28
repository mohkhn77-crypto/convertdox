'use client'

interface LegalFooterProps {
  toolName: string
  type: 'copyright' | 'security' | 'privacy' | 'thirdparty'
  thirdParty?: string
}

export default function LegalFooter({ thirdParty }: LegalFooterProps) {
  return (
    <div style={{ maxWidth: '860px', margin: '40px auto 0', padding: '0 24px 20px' }}>
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 18px', fontSize: '12px', color: '#64748b', lineHeight: '1.6' }}>
        <p style={{ margin: '0 0 6px' }}>
          <strong style={{ color: '#0F2A4A' }}>DMCA Notice:</strong> If you are a copyright owner and believe content is being misused via this tool, please{' '}
          <a href="/legal#dmca" style={{ color: '#E85D04', fontWeight: 600 }}>review our DMCA policy</a> or{' '}
          <a href="/contact" style={{ color: '#E85D04', fontWeight: 600 }}>contact us</a>. We respond to legitimate takedown requests within 48 hours.
        </p>
        {thirdParty && (
          <p style={{ margin: '0 0 6px' }}>
            <strong style={{ color: '#0F2A4A' }}>Trademark Notice:</strong> {thirdParty} is a trademark of its respective owner. ConvertDox is not affiliated with, endorsed by, or sponsored by {thirdParty}. Use of trademark names is for descriptive purposes only.
          </p>
        )}
        <p style={{ margin: '0 0 6px' }}>
          <strong style={{ color: '#0F2A4A' }}>Privacy:</strong> Files and data are processed in-memory and auto-deleted within 1 hour. We do not store, log, share, or analyze content processed through this tool.
        </p>
        <p style={{ margin: '0' }}>
          <strong style={{ color: '#0F2A4A' }}>Liability:</strong> ConvertDox provides this tool &ldquo;as is&rdquo; without warranty. Users are responsible for ensuring their use complies with applicable laws, copyright, and platform terms of service. See{' '}
          <a href="/legal#terms" style={{ color: '#E85D04', fontWeight: 600 }}>full terms</a>.
        </p>
      </div>
    </div>
  )
}
