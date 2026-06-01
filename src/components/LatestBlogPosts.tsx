'use client'
import Link from 'next/link'

// Static metadata — update this array when new posts are added to content/blog/
const LATEST_POSTS = [
  {
    slug: 'heic-to-jpg-convert-iphone-photos',
    title: 'How to Convert HEIC to JPG (Free, No Download Required) - 2026 Guide',
    description: "Stuck with iPhone HEIC photos that won't open on Windows or share online? Learn 5 free ways to convert HEIC to JPG in seconds.",
    category: 'Image Tools',
    readingTime: '7 min read',
  },
  {
    slug: 'how-to-convert-images-to-base64',
    title: 'How to Convert Images to Base64: Complete Guide for Developers',
    description: 'When Base64-encoded images speed up your site and when they slow it down — plus copy-paste examples for HTML, CSS, JS, and Python.',
    category: 'Developer Tools',
    readingTime: '5 min read',
  },
  {
    slug: 'best-free-password-generators-2026',
    title: '10 Best Free Password Generators in 2026 (Security Expert Picks)',
    description: 'Browser-based, client-side, open source — we rank the most trustworthy free password generators and explain what really matters.',
    category: 'Security',
    readingTime: '5 min read',
  },
]

export default function LatestBlogPosts() {
  return (
    <section style={{ padding: '60px 20px', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: '#0F2A4A', margin: '0 0 8px' }}>
              Latest from the Blog
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>
              Tutorials, guides, and tips to help you work smarter
            </p>
          </div>

          <Link href="/blog" style={{ fontSize: '14px', fontWeight: 600, color: '#E85D04', textDecoration: 'none', padding: '9px 18px', border: '1.5px solid #E85D04', borderRadius: '8px', whiteSpace: 'nowrap' }}>
            View all posts →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {LATEST_POSTS.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <article style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '24px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ background: '#FEF3C7', color: '#92400E', fontSize: '11.5px', fontWeight: 700, padding: '3px 9px', borderRadius: '5px' }}>
                    {post.category}
                  </span>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>{post.readingTime}</span>
                </div>

                <h3 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '17px', fontWeight: 700, color: '#0F2A4A', margin: 0, lineHeight: 1.35 }}>
                  {post.title}
                </h3>

                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0, flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.description}
                </p>

                <div style={{ color: '#E85D04', fontSize: '13px', fontWeight: 700, marginTop: '4px' }}>
                  Read article →
                </div>
              </article>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
