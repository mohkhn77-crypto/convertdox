import NavBar from '@/components/NavBar'
import HomeHero from '@/components/home/HomeHero'
import HomeProblem from '@/components/home/HomeProblem'
import HomeApproach from '@/components/home/HomeApproach'
import HomeCategories from '@/components/home/HomeCategories'
import HomeFAQ from '@/components/home/HomeFAQ'
import LatestBlogPosts from '@/components/LatestBlogPosts'

export const metadata = {
  title: 'ConvertDox — Privacy-First Free Online Tools | No Signup, No Tracking',
  description: 'Free online tools that respect your privacy. PDF conversion, image editing, AI writing, calculators, and document generators. Files deleted within minutes. No accounts, no tracking, no data sold.',
  keywords: 'free online tools, PDF converter, image converter, AI writing tools, privacy-first tools, no signup converter',
  openGraph: {
    title: 'ConvertDox — Privacy-First Free Online Tools',
    description: "The free online tools that don't steal your data. PDF, image, AI, and document tools — all private.",
    url: 'https://convertdox.com',
    siteName: 'ConvertDox',
    images: [
      {
        url: 'https://convertdox.com/og-image.png',
        width: 1200,
        height: 630
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ConvertDox — Privacy-First Free Online Tools',
    description: "Free online tools that don't steal your data.",
    images: ['https://convertdox.com/og-image.png']
  },
  alternates: {
    canonical: 'https://convertdox.com'
  }
}

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <NavBar />

      {/* Hero with privacy-first message */}
      <HomeHero />

      {/* Problem: Why "free" tools are usually harmful */}
      <HomeProblem />

      {/* Approach: How ConvertDox is different */}
      <HomeApproach />

      {/* Categories: Browse tools by category */}
      <HomeCategories />

      {/* Featured blog posts */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 800,
            color: '#0F2A4A',
            textAlign: 'center',
            marginBottom: '16px',
            fontFamily: "'Space Grotesk',system-ui,sans-serif"
          }}>
            Tutorials and Guides
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#475569',
            textAlign: 'center',
            marginBottom: '48px',
            lineHeight: 1.6
          }}>
            In-depth articles on file conversion, privacy, and productivity.
          </p>
          <LatestBlogPosts />
        </div>
      </section>

      {/* FAQ */}
      <HomeFAQ />

      {/* Final CTA */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, #0F2A4A 0%, #1a3a5c 100%)',
        color: 'white',
        textAlign: 'center' as const
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 800,
            marginBottom: '16px',
            fontFamily: "'Space Grotesk',system-ui,sans-serif"
          }}>
            Ready to Try Privacy-First Tools?
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.85)',
            marginBottom: '32px',
            lineHeight: 1.6
          }}>
            No signup. No tracking. No catch. Just useful tools that respect your data.
          </p>
          <a href="/all-tools" style={{
            display: 'inline-block',
            background: '#E85D04',
            color: 'white',
            padding: '18px 40px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '18px'
          }}>
            Browse All Tools →
          </a>
        </div>
      </section>
    </div>
  )
}
