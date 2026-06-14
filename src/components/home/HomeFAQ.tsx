'use client'

const FAQS = [
  {
    question: 'Are these tools really free?',
    answer: 'Yes. All tools are completely free with no hidden charges, no premium tier required, and no signup. The site is supported by minimal display ads on tool pages.'
  },
  {
    question: 'How do you make money if everything is free?',
    answer: "Honest answer: we currently don't. ConvertDox runs at a loss on $11/month infrastructure as a personal side project. The long-term plan is sustainable display advertising (no behavioral tracking, no profiles)."
  },
  {
    question: 'Do you store my files?',
    answer: 'No. Every uploaded file is automatically and permanently deleted within an hour of processing. Many tools process files in memory and delete them within seconds. We have no long-term storage of user files.'
  },
  {
    question: 'Is my data sold or shared?',
    answer: "Never. We don't sell, share, or transmit your file content to any third party. We don't build advertising profiles. We don't track you across other websites. Your data exists only long enough to complete your conversion."
  },
  {
    question: 'Can I trust this site with sensitive documents?',
    answer: 'For maximum sensitivity (tax returns, medical records, contracts), we recommend offline tools whenever possible. However, ConvertDox is significantly more privacy-preserving than typical "free" online tools that retain data and embed trackers.'
  },
  {
    question: 'Is the site secure?',
    answer: "All uploads use HTTPS encryption. Files are processed on isolated servers. We don't share infrastructure with advertising networks. The tools are built on open-source libraries that you can audit independently."
  },
  {
    question: 'Can I use these tools for commercial work?',
    answer: 'Yes. All tools are free for personal AND commercial use. No license required, no attribution required. Build invoices, edit documents, convert files for your business — completely free.'
  },
  {
    question: "What if a tool doesn't work for my file?",
    answer: 'Some tools have limitations (very large files, specific formats, advanced features). If something doesn\'t work, contact support@convertdox.com — most issues can be diagnosed quickly.'
  }
]

export default function HomeFAQ() {
  return (
    <section style={{
      padding: '80px 24px',
      background: '#f8fafc'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 800,
          color: '#0F2A4A',
          textAlign: 'center',
          marginBottom: '16px',
          fontFamily: "'Space Grotesk',system-ui,sans-serif"
        }}>
          Frequently Asked Questions
        </h2>

        <p style={{
          fontSize: '18px',
          color: '#475569',
          textAlign: 'center',
          marginBottom: '48px',
          lineHeight: 1.6
        }}>
          Common questions about privacy, security, and how this all works.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
          {FAQS.map((faq, i) => (
            <details key={i} style={{
              background: 'white',
              border: '1.5px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px 24px'
            }}>
              <summary style={{
                fontSize: '17px',
                fontWeight: 700,
                color: '#0F2A4A',
                cursor: 'pointer',
                outline: 'none'
              }}>
                {faq.question}
              </summary>
              <p style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: '#475569',
                marginTop: '12px',
                marginBottom: 0
              }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
