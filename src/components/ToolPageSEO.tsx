type FAQ = {
  question: string
  answer: string
}

type UseCase = {
  title: string
  description: string
}

type RelatedTool = {
  name: string
  slug: string
  description: string
}

type ToolPageSEOProps = {
  toolName: string
  whatIs: string
  whatIsExtended?: string
  howToUse: string[]
  useCases: UseCase[]
  tips: string[]
  faqs: FAQ[]
  relatedTools: RelatedTool[]
}

export default function ToolPageSEO({
  toolName,
  whatIs,
  whatIsExtended,
  howToUse,
  useCases,
  tips,
  faqs,
  relatedTools
}: ToolPageSEOProps) {
  return (
    <div style={{
      maxWidth: '860px',
      margin: '0 auto',
      padding: '0 24px 48px',
      fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif"
    }}>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 800,
          color: '#0F2A4A',
          marginBottom: '16px',
          fontFamily: "'Space Grotesk',system-ui,sans-serif"
        }}>
          What is {toolName}?
        </h2>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.7',
          color: '#475569',
          marginBottom: '12px'
        }}>
          {whatIs}
        </p>
        {whatIsExtended && (
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#475569'
          }}>
            {whatIsExtended}
          </p>
        )}
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 800,
          color: '#0F2A4A',
          marginBottom: '16px',
          fontFamily: "'Space Grotesk',system-ui,sans-serif"
        }}>
          How to Use {toolName}
        </h2>
        <ol style={{
          fontSize: '16px',
          lineHeight: '2',
          color: '#475569',
          paddingLeft: '24px'
        }}>
          {howToUse.map((step, i) => (
            <li key={i} style={{ marginBottom: '8px' }}>{step}</li>
          ))}
        </ol>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 800,
          color: '#0F2A4A',
          marginBottom: '16px',
          fontFamily: "'Space Grotesk',system-ui,sans-serif"
        }}>
          When You Need {toolName}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          {useCases.map((useCase, i) => (
            <div key={i} style={{
              padding: '20px',
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1.5px solid #e2e8f0'
            }}>
              <h3 style={{
                fontSize: '17px',
                fontWeight: 700,
                color: '#0F2A4A',
                marginBottom: '8px'
              }}>
                {useCase.title}
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#475569',
                margin: 0
              }}>
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 800,
          color: '#0F2A4A',
          marginBottom: '16px',
          fontFamily: "'Space Grotesk',system-ui,sans-serif"
        }}>
          Tips for Best Results
        </h2>
        <ul style={{
          fontSize: '16px',
          lineHeight: '2',
          color: '#475569',
          paddingLeft: '24px'
        }}>
          {tips.map((tip, i) => (
            <li key={i} style={{ marginBottom: '8px' }}>{tip}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 800,
          color: '#0F2A4A',
          marginBottom: '16px',
          fontFamily: "'Space Grotesk',system-ui,sans-serif"
        }}>
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, i) => (
          <div key={i} style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#0F2A4A',
              marginBottom: '8px'
            }}>
              {faq.question}
            </h3>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#475569'
            }}>
              {faq.answer}
            </p>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 800,
          color: '#0F2A4A',
          marginBottom: '16px',
          fontFamily: "'Space Grotesk',system-ui,sans-serif"
        }}>
          Related Tools
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginTop: '20px'
        }}>
          {relatedTools.map((tool, i) => (
            <a
              key={i}
              href={`/${tool.slug}`}
              style={{
                padding: '20px',
                background: 'white',
                borderRadius: '12px',
                border: '1.5px solid #e2e8f0',
                textDecoration: 'none'
              }}
            >
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#0F2A4A',
                marginBottom: '6px'
              }}>
                {tool.name}
              </h3>
              <p style={{
                fontSize: '13px',
                lineHeight: '1.5',
                color: '#64748b',
                margin: 0
              }}>
                {tool.description}
              </p>
            </a>
          ))}
        </div>
      </section>

    </div>
  )
}
