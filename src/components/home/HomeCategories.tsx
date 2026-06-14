'use client'
import Link from 'next/link'

const CATEGORIES = [
  {
    title: 'PDF Tools',
    description: 'Convert, merge, split, compress, edit',
    count: '40+ tools',
    slug: '/all-tools#pdf',
    color: '#DC2626',
    bg: '#FEF2F2'
  },
  {
    title: 'Image Tools',
    description: 'Compress, resize, convert formats',
    count: '30+ tools',
    slug: '/all-tools#image',
    color: '#9333EA',
    bg: '#FAF5FF'
  },
  {
    title: 'AI Writing',
    description: 'Summarize, paraphrase, translate',
    count: '20+ tools',
    slug: '/all-tools#ai',
    color: '#3B82F6',
    bg: '#EFF6FF'
  },
  {
    title: 'Documents',
    description: 'Invoices, resumes, business cards',
    count: '25+ tools',
    slug: '/all-tools#documents',
    color: '#16A34A',
    bg: '#F0FDF4'
  },
  {
    title: 'Calculators',
    description: 'Financial, health, productivity',
    count: '30+ tools',
    slug: '/all-tools#calculators',
    color: '#F59E0B',
    bg: '#FFFBEB'
  },
  {
    title: 'Developer Tools',
    description: 'JSON, Base64, regex, format checkers',
    count: '50+ tools',
    slug: '/all-tools#developer',
    color: '#06B6D4',
    bg: '#ECFEFF'
  }
]

export default function HomeCategories() {
  return (
    <section style={{
      padding: '80px 24px',
      background: '#fff'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 800,
          color: '#0F2A4A',
          textAlign: 'center',
          marginBottom: '16px',
          fontFamily: "'Space Grotesk',system-ui,sans-serif"
        }}>
          Everything You Need, Organized
        </h2>

        <p style={{
          fontSize: '18px',
          color: '#475569',
          textAlign: 'center',
          marginBottom: '48px',
          lineHeight: 1.6
        }}>
          Browse tools by category to find exactly what you need.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.slug}
              style={{
                padding: '32px',
                background: cat.bg,
                borderRadius: '16px',
                textDecoration: 'none',
                border: '2px solid transparent',
                transition: 'border-color 0.2s',
                display: 'block'
              }}
            >
              <div style={{
                fontSize: '13px',
                fontWeight: 700,
                color: cat.color,
                textTransform: 'uppercase' as const,
                letterSpacing: '1px',
                marginBottom: '8px'
              }}>
                {cat.count}
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 800,
                color: '#0F2A4A',
                marginBottom: '8px'
              }}>
                {cat.title}
              </h3>
              <p style={{
                fontSize: '15px',
                lineHeight: 1.6,
                color: '#475569',
                margin: 0
              }}>
                {cat.description}
              </p>
              <div style={{
                marginTop: '16px',
                color: cat.color,
                fontWeight: 700,
                fontSize: '14px'
              }}>
                Browse {cat.title} →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
