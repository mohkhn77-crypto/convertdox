import Link from 'next/link'
import { getAllPosts } from '@/lib/blog/posts'
import NavBar from '@/components/NavBar'

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A 0%,#1a3a5c 100%)', padding: '72px 24px 56px', textAlign: 'center' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', padding: '5px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginBottom: '22px' }}>
            <span style={{ background: '#E85D04', borderRadius: '999px', padding: '1px 8px', fontWeight: 700, color: 'white', fontSize: '11px' }}>BLOG</span>
            New guides every week
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, color: 'white', lineHeight: 1.15, letterSpacing: '-0.5px', margin: '0 0 16px' }}>
            Tools, Tips &amp; <span style={{ color: '#F48C42' }}>Tutorials</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
            Practical guides for developers, writers, and creators. Every article is free, ad-light, and written to actually be useful.
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '56px 24px' }}>
        {posts.length === 0 ? (
          <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
            New blog posts coming soon — check back next week!
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '24px' }}>
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                <article style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '18px', overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: 1, boxShadow: '0 2px 10px rgba(15,42,74,0.05)', transition: 'box-shadow 0.15s' }}>
                  {/* Category header */}
                  <div style={{ background: 'linear-gradient(135deg,#FFF7ED 0%,#FFEDD5 100%)', padding: '32px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #FED7AA' }}>
                    <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '32px', fontWeight: 800, color: '#C2410C', letterSpacing: '-0.5px' }}>
                      {post.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '22px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1, gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <span style={{ background: '#FFF7ED', color: '#C2410C', fontSize: '11.5px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {post.category}
                      </span>
                      <span style={{ fontSize: '12.5px', color: '#94a3b8' }}>{post.readingTime}</span>
                    </div>
                    <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '19px', fontWeight: 800, color: '#0F2A4A', margin: 0, lineHeight: 1.3, letterSpacing: '-0.2px' }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.65', margin: 0, flex: 1 }}>
                      {post.description}
                    </p>
                    <div style={{ color: '#E85D04', fontSize: '13.5px', fontWeight: 700, marginTop: '4px' }}>
                      Read article →
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
