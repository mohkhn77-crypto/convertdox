'use client'
import Link from 'next/link'

export default function HomeHero() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #0F2A4A 0%, #1a3a5c 100%)',
      padding: '80px 24px 100px',
      color: 'white'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(232,93,4,0.15)',
          border: '1.5px solid rgba(232,93,4,0.3)',
          color: '#F48C42',
          padding: '8px 20px',
          borderRadius: '999px',
          fontSize: '14px',
          fontWeight: 700,
          marginBottom: '24px'
        }}>
          🔒 Privacy-First Free Online Tools
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: '24px',
          fontFamily: "'Space Grotesk',system-ui,sans-serif"
        }}>
          The Free Online Tools<br/>
          <span style={{ color: '#F48C42' }}>That Don&apos;t Steal Your Data</span>
        </h1>

        <p style={{
          fontSize: '20px',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.85)',
          marginBottom: '40px',
          maxWidth: '700px',
          margin: '0 auto 40px'
        }}>
          PDF conversion, image editing, AI writing, calculators, and more —
          all free, all private. Files deleted within minutes. No accounts.
          No tracking. No data sold to third parties.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/all-tools" style={{
            background: '#E85D04',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer'
          }}>
            Browse All Tools →
          </Link>
          <Link href="/about" style={{
            background: 'transparent',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '16px',
            border: '1.5px solid rgba(255,255,255,0.3)'
          }}>
            Our Privacy Approach
          </Link>
        </div>

        <div style={{
          marginTop: '40px',
          display: 'flex',
          gap: '32px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.7)'
        }}>
          <div>✓ Files deleted in minutes</div>
          <div>✓ No accounts required</div>
          <div>✓ No third-party trackers</div>
          <div>✓ 100% free forever</div>
        </div>
      </div>
    </section>
  )
}
