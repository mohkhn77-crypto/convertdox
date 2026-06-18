import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import { CATS, getToolsByCategory, getCategory } from '@/lib/tools'
import { getCategoryContent } from '@/lib/categoryContent'

export function generateStaticParams() {
  return CATS.filter(c => c.id !== 'all').map(c => ({ id: c.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const cat = getCategory(id)
  const content = getCategoryContent(id)
  if (!cat || !content) {
    return { title: 'Category Not Found | ConvertDox' }
  }
  return {
    title: `${content.heading} — Free Online Tools | ConvertDox`,
    description: content.intro,
    alternates: { canonical: `https://convertdox.com/category/${id}` },
    openGraph: {
      title: `${content.heading} | ConvertDox`,
      description: content.intro,
      url: `https://convertdox.com/category/${id}`,
      images: ['https://convertdox.com/og-image.png'],
    }
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cat = getCategory(id)
  const content = getCategoryContent(id)
  const tools = getToolsByCategory(id)

  if (!cat || !content || id === 'all') {
    notFound()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', textDecoration: 'none' }}>← All Categories</Link>
          <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: 'white', margin: '16px 0 12px' }}>
            {content.heading}
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, maxWidth: '700px', margin: 0 }}>
            {content.intro}
          </p>
          <div style={{ marginTop: '16px', color: '#F48C42', fontWeight: 700, fontSize: '14px' }}>
            {tools.length} free {tools.length === 1 ? 'tool' : 'tools'}
          </div>
        </div>
      </div>

      {/* Tools grid */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>
        {tools.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '16px' }}>
            {tools.map(tool => (
              <a key={tool.href} href={tool.href}
                style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '24px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 2px 8px rgba(15,42,74,0.04)' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F2A4A' }}>{tool.title}</div>
                <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, flex: 1 }}>{tool.desc}</div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#E85D04', background: '#FFF7ED', padding: '4px 12px', borderRadius: '999px', alignSelf: 'flex-start' }}>Open Tool →</span>
              </a>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#94a3b8', padding: '48px' }}>
            Tools for this category are coming soon.
          </p>
        )}

        {/* SEO content */}
        <section style={{ marginTop: '56px', maxWidth: '760px' }}>
          <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '26px', fontWeight: 800, color: '#0F2A4A', marginBottom: '16px' }}>
            About {content.heading}
          </h2>
          <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.8 }}>
            {content.body}
          </p>
        </section>

        {/* Other categories */}
        <section style={{ marginTop: '56px' }}>
          <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '22px', fontWeight: 800, color: '#0F2A4A', marginBottom: '20px' }}>
            Explore Other Categories
          </h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {CATS.filter(c => c.id !== 'all' && c.id !== id).map(c => (
              <Link key={c.id} href={`/category/${c.id}`}
                style={{ padding: '8px 16px', borderRadius: '999px', border: '1.5px solid #e2e8f0', background: 'white', color: '#0F2A4A', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
                {c.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
