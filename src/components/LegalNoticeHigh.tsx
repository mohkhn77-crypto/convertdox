'use client'

interface LegalNoticeHighProps {
  type: 'copyright' | 'security' | 'privacy' | 'thirdparty'
  toolName: string
  acknowledged: boolean
  onAcknowledge: (value: boolean) => void
  customMessage?: string
}

const NOTICE_CONFIGS = {
  copyright: {
    icon: '⚖️',
    title: 'Copyright & Fair Use Notice',
    bg: '#FEF3C7', border: '#FCD34D', textColor: '#92400E', bodyColor: '#78350F',
    points: [
      { strong: 'Content ownership:', text: 'All content processed belongs to its original creators and copyright holders. This tool does not host, store, or claim ownership of any user-provided content.' },
      { strong: 'Permitted uses:', text: 'Personal reference, fair use commentary, criticism, news reporting, teaching, and research as defined under copyright law.' },
      { strong: 'Not permitted:', text: 'Republishing copyrighted content as your own, commercial use without permission from the copyright holder, or violating intellectual property rights.' },
    ],
    ackText: 'I understand that processed content remains the property of its original creators, and I will use it in accordance with copyright law and fair use principles.',
  },
  security: {
    icon: '🔒',
    title: 'Security & Authorization Notice',
    bg: '#FEE2E2', border: '#FCA5A5', textColor: '#991B1B', bodyColor: '#7F1D1D',
    points: [
      { strong: 'Authorization required:', text: 'You must own this document or have explicit permission from the owner to modify its security settings. Unauthorized modification of documents may violate computer fraud and copyright laws.' },
      { strong: 'Legal compliance:', text: 'This tool is intended for legitimate purposes such as recovering access to your own documents or applying security to documents you own.' },
      { strong: 'Privacy:', text: 'Documents are processed in-memory and auto-deleted within 1 hour. We do not store, log, or share your file contents.' },
    ],
    ackText: 'I confirm that I have authorization to modify this document and will use this tool only for lawful purposes.',
  },
  privacy: {
    icon: '🛡️',
    title: 'Privacy & Data Notice',
    bg: '#F3E8FF', border: '#D8B4FE', textColor: '#6B21A8', bodyColor: '#581C87',
    points: [
      { strong: 'Sensitive data:', text: 'This tool may process content containing personal information. Files are processed in-memory and auto-deleted within 1 hour.' },
      { strong: 'No tracking:', text: 'We do not log, store, share, or analyze the content of your files. URLs and queries are not retained.' },
      { strong: 'Your responsibility:', text: 'Do not process content containing third-party personal data without proper authorization (GDPR, CCPA, HIPAA, etc.).' },
    ],
    ackText: 'I understand that I am responsible for ensuring I have the right to process any content I submit through this tool.',
  },
  thirdparty: {
    icon: '⚖️',
    title: 'Third-Party Content Notice',
    bg: '#E0F2FE', border: '#7DD3FC', textColor: '#075985', bodyColor: '#0C4A6E',
    points: [
      { strong: 'Third-party content:', text: 'This tool interacts with publicly available content from third-party platforms. All content belongs to its respective owners and creators.' },
      { strong: 'No affiliation:', text: 'ConvertDox is not affiliated with, endorsed by, or sponsored by any third-party platform mentioned in this tool. All trademarks are property of their respective owners.' },
      { strong: 'Fair use:', text: "Use this tool only for personal reference, fair use, education, research, or with the content creator's permission. Respect platform terms of service." },
    ],
    ackText: 'I understand that I will respect copyright laws and use any content obtained through this tool in compliance with fair use and platform terms of service.',
  },
}

export default function LegalNoticeHigh({ type, acknowledged, onAcknowledge, customMessage }: LegalNoticeHighProps) {
  const config = NOTICE_CONFIGS[type]

  return (
    <div style={{ maxWidth: '860px', margin: '20px auto 0', padding: '0 24px' }}>
      <div style={{ background: config.bg, border: `1.5px solid ${config.border}`, borderRadius: '12px', padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ fontSize: '20px', flexShrink: 0 }}>{config.icon}</div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: config.textColor, marginBottom: '8px' }}>
              {config.title}
            </div>
            <div style={{ fontSize: '13px', color: config.bodyColor, lineHeight: '1.6' }}>
              {customMessage && <p style={{ margin: '0 0 8px', fontWeight: 600 }}>{customMessage}</p>}
              {config.points.map((point, idx) => (
                <p key={idx} style={{ margin: idx === config.points.length - 1 ? '0' : '0 0 8px' }}>
                  <strong>{point.strong}</strong> {point.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '12px 16px', marginTop: '12px' }}>
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={(e) => onAcknowledge(e.target.checked)}
          style={{ marginTop: '2px', width: '16px', height: '16px', cursor: 'pointer', accentColor: '#E85D04', flexShrink: 0 }}
        />
        <span style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
          {config.ackText}
        </span>
      </label>
    </div>
  )
}
