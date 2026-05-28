'use client'

interface LegalNoticeMediumProps {
  type: 'personal' | 'financial' | 'legal' | 'privacy'
  customMessage?: string
}

const NOTICE_CONFIGS = {
  personal: {
    icon: 'ℹ️',
    title: 'Personal Information Notice',
    bg: '#EFF6FF', border: '#BFDBFE', textColor: '#1E40AF', bodyColor: '#1E3A8A',
    message: 'This tool helps you create documents with personal information. Your data is processed entirely in your browser and the generated PDF is not stored on our servers. Only share documents containing personal information with trusted parties.',
  },
  financial: {
    icon: '💼',
    title: 'Financial Document Notice',
    bg: '#F0FDF4', border: '#BBF7D0', textColor: '#166534', bodyColor: '#14532D',
    message: 'This tool generates financial documents using information you provide. ConvertDox does not store, log, or share any financial information. The generated PDF is created on-demand and not retained. For tax or legal documents, consult with a qualified professional.',
  },
  legal: {
    icon: '📜',
    title: 'Legal Document Notice',
    bg: '#F1F5F9', border: '#CBD5E1', textColor: '#1E293B', bodyColor: '#334155',
    message: 'This tool helps you add legal elements (signatures, annotations) to documents. ConvertDox does not provide legal advice. For legally binding signatures or critical documents, consult with a qualified legal professional and consider using a certified e-signature service.',
  },
  privacy: {
    icon: '🛡️',
    title: 'Privacy Tool Notice',
    bg: '#F0FDF4', border: '#BBF7D0', textColor: '#166534', bodyColor: '#14532D',
    message: 'This tool is designed to protect your privacy by removing sensitive metadata from your files. The original files are processed in-memory and auto-deleted within 1 hour. We do not access, store, or share the metadata being removed.',
  },
}

export default function LegalNoticeMedium({ type, customMessage }: LegalNoticeMediumProps) {
  const config = NOTICE_CONFIGS[type]

  return (
    <div style={{ maxWidth: '860px', margin: '20px auto 0', padding: '0 24px' }}>
      <div style={{ background: config.bg, border: `1px solid ${config.border}`, borderRadius: '10px', padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <div style={{ fontSize: '16px', flexShrink: 0 }}>{config.icon}</div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: config.textColor, marginBottom: '4px' }}>
              {config.title}
            </div>
            <div style={{ fontSize: '12px', color: config.bodyColor, lineHeight: '1.5' }}>
              {customMessage || config.message}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
