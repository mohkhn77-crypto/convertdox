import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllSlugs } from '@/lib/blog/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Not Found | ConvertDox' }
  return {
    title: `${post.title} | ConvertDox Blog`,
    description: post.description,
    alternates: { canonical: `https://convertdox.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      siteName: 'ConvertDox',
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'ConvertDox', url: 'https://convertdox.com' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://convertdox.com/blog/${slug}` },
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif' }}>
      <NavBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 20px 80px' }}>
        <Link href="/blog" style={{ color: '#E85D04', fontSize: '14px', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginBottom: '28px' }}>
          ← Back to Blog
        </Link>

        <article style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '48px 44px' }}>
          {/* Meta row */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', fontSize: '13px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ background: '#FEF3C7', color: '#92400E', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
              {post.category}
            </span>
            <span style={{ color: '#94a3b8' }}>
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span style={{ color: '#94a3b8' }}>· {post.readingTime}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(26px,4vw,38px)', fontWeight: 800, color: '#0F2A4A', marginBottom: '16px', lineHeight: 1.2, letterSpacing: '-0.3px' }}>
            {post.title}
          </h1>

          <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '36px', lineHeight: 1.65, borderBottom: '1.5px solid #f1f5f9', paddingBottom: '28px' }}>
            {post.description}
          </p>

          {/* MDX content */}
          <div className="blog-prose">
            <MDXRemote source={post.content} />
          </div>

          {/* CTA */}
          <div style={{ marginTop: '48px', padding: '24px', background: '#FEF3C7', border: '1.5px solid #FCD34D', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#92400E', marginBottom: '6px' }}>Try ConvertDox Free</div>
            <div style={{ fontSize: '14px', color: '#92400E', marginBottom: '14px' }}>200+ free online tools. No signup. Files never stored.</div>
            <Link href="/" style={{ display: 'inline-block', background: '#E85D04', color: 'white', padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>
              Browse All Tools →
            </Link>
          </div>
        </article>
      </div>

      {/* Prose styles for MDX content */}
      <style>{`
        .blog-prose { color: #334155; font-size: 16px; line-height: 1.8; }
        .blog-prose h2 { font-size: 24px; font-weight: 800; color: #0F2A4A; margin: 36px 0 14px; letter-spacing: -0.2px; }
        .blog-prose h3 { font-size: 19px; font-weight: 700; color: #0F2A4A; margin: 28px 0 10px; }
        .blog-prose p { margin: 0 0 16px; }
        .blog-prose a { color: #E85D04; font-weight: 600; text-decoration: underline; }
        .blog-prose a:hover { color: #c94d00; }
        .blog-prose ul, .blog-prose ol { padding-left: 24px; margin: 0 0 16px; }
        .blog-prose li { margin-bottom: 6px; }
        .blog-prose strong { color: #0F2A4A; font-weight: 700; }
        .blog-prose code { background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 4px; padding: 2px 6px; font-size: 14px; font-family: ui-monospace, monospace; color: #0F2A4A; }
        .blog-prose pre { background: #0F2A4A; border-radius: 10px; padding: 20px 22px; overflow-x: auto; margin: 0 0 20px; }
        .blog-prose pre code { background: none; border: none; padding: 0; color: #e2e8f0; font-size: 14px; }
        .blog-prose table { width: 100%; border-collapse: collapse; margin: 0 0 20px; font-size: 15px; }
        .blog-prose th { background: #f8fafc; color: #0F2A4A; font-weight: 700; padding: 10px 14px; border: 1.5px solid #e2e8f0; text-align: left; }
        .blog-prose td { padding: 9px 14px; border: 1.5px solid #e2e8f0; color: #334155; }
        .blog-prose tr:hover td { background: #fafbfc; }
        .blog-prose blockquote { border-left: 4px solid #E85D04; padding: 12px 20px; margin: 0 0 20px; background: #FFF7ED; border-radius: 0 8px 8px 0; color: #92400E; font-style: italic; }
        .blog-prose hr { border: none; border-top: 1.5px solid #e2e8f0; margin: 32px 0; }
      `}</style>
    </div>
  )
}
