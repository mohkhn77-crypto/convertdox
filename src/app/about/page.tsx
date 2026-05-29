import Link from 'next/link'
import NavBar from '@/components/NavBar'

export const metadata = {
  title: 'About ConvertDox - Free Online Tools for Everyone',
  description: 'ConvertDox provides 184+ free online tools for PDF conversion, image processing, AI writing, calculators, and more. Built for everyone, no signup required.',
  alternates: { canonical: 'https://convertdox.com/about' },
  robots: { index: true, follow: true },
}

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px 80px' }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: 'clamp(36px,5vw,52px)', fontWeight: 800, color: '#0F2A4A', marginBottom: '16px', lineHeight: 1.2, fontFamily: "'Space Grotesk',system-ui,sans-serif" }}>
            About <span style={{ color: '#E85D04' }}>ConvertDox</span>
          </h1>
          <p style={{ fontSize: '20px', color: '#64748b', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto' }}>
            Every online tool you need, in one place. Free, fast, and private.
          </p>
        </div>

        {/* Mission */}
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0F2A4A', marginBottom: '16px', fontFamily: "'Space Grotesk',system-ui,sans-serif" }}>
            Our Mission
          </h2>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.7, marginBottom: '16px' }}>
            ConvertDox was built on a simple belief: <strong>essential online tools should be free, fast, and accessible to everyone</strong>. We saw people paying for basic utilities, watching annoying ads, creating accounts, and waiting for slow uploads just to compress a PDF or convert an image.
          </p>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.7, margin: 0 }}>
            We set out to build something better — a single platform with every tool you need, that respects your privacy, doesn&apos;t store your files, and works instantly without sign-ups or paywalls.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '20px', marginBottom: '32px' }}>
          <StatCard number="184+" label="Free Tools" />
          <StatCard number="100%" label="Free Forever" />
          <StatCard number="0" label="Files Stored" />
          <StatCard number="∞" label="Uses Per Day" />
        </div>

        {/* What We Offer */}
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0F2A4A', marginBottom: '24px', fontFamily: "'Space Grotesk',system-ui,sans-serif" }}>
            What ConvertDox Offers
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '20px' }}>
            <Category icon="📄" title="PDF Tools" count="26 tools"
              items="Merge, Split, Compress, Convert PDF↔Word/Excel/PPT/JPG, Sign, Watermark, Page Numbers, OCR, and more" />
            <Category icon="🖼️" title="Image Tools" count="24 tools"
              items="Compress, Resize, Convert (HEIC, WebP, SVG), Crop, Rotate, Watermark, Background Remover, EXIF Stripper, Batch Processing" />
            <Category icon="🤖" title="AI Tools" count="8 tools"
              items="AI Summarizer, Grammar Checker, Paraphraser, Resume Improver, Cover Letter Generator, Email Writer, Translator, Tone Changer" />
            <Category icon="📝" title="Document Generators" count="8 tools"
              items="Invoice, Receipt, Quote, Purchase Order, Business Card, Letterhead, Resume Builder, Logo Maker" />
            <Category icon="🔢" title="Calculators" count="15+ tools"
              items="EMI, Mortgage, BMI, Age, Pregnancy Due Date, Tip, Discount, Percentage, Tax, Currency" />
            <Category icon="💻" title="Developer Tools" count="20+ tools"
              items="JSON Formatter, Base64 Encoder, URL Encoder, Regex Tester, CSS Gradient, Color Picker, Hash Generator" />
            <Category icon="🔤" title="Text Tools" count="15+ tools"
              items="Word Counter, Case Converter, Lorem Ipsum, Markdown Editor, Text Diff, Find & Replace" />
            <Category icon="🔍" title="OCR & Utilities" count="10+ tools"
              items="Image to Text, PDF OCR, QR Reader/Generator, YouTube Thumbnail, Passport Photo, Favicon Generator" />
          </div>
        </div>

        {/* Why Choose Us */}
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0F2A4A', marginBottom: '24px', fontFamily: "'Space Grotesk',system-ui,sans-serif" }}>
            Why People Choose ConvertDox
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '24px' }}>
            <Feature icon="🆓" title="100% Free Forever"
              text="No hidden costs, no premium tiers, no credit card required. Every tool, free for everyone." />
            <Feature icon="🔒" title="Privacy First"
              text="Your files are automatically deleted within 1 hour. We never store, sell, or share your data." />
            <Feature icon="⚡" title="Lightning Fast"
              text="Most tools work instantly in your browser. Heavy processing happens on our optimized servers." />
            <Feature icon="📱" title="Works Everywhere"
              text="No downloads, no installations. Use ConvertDox on any device with a web browser." />
            <Feature icon="🚫" title="No Sign-Up Required"
              text="Jump in and start using any tool immediately. No accounts, no emails, no friction." />
            <Feature icon="🌍" title="Available 24/7"
              text="Access your tools from anywhere, anytime. Reliable infrastructure keeps us online." />
          </div>
        </div>

        {/* Story */}
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0F2A4A', marginBottom: '16px', fontFamily: "'Space Grotesk',system-ui,sans-serif" }}>
            Our Story
          </h2>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.7, marginBottom: '16px' }}>
            ConvertDox started in 2026 as a frustration-driven project. After paying for multiple SaaS tools to do basic tasks — compressing PDFs, converting images, generating QR codes — we decided to build a single platform with everything for free.
          </p>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.7, marginBottom: '16px' }}>
            What started with a handful of utility tools has grown to <strong>184+ comprehensive tools</strong> across PDF, image, AI, document, calculator, and developer categories — all maintained as completely free with no usage limits.
          </p>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.7, margin: 0 }}>
            We&apos;re constantly adding new tools based on user feedback. If you have a tool idea,{' '}
            <Link href="/contact" style={{ color: '#E85D04', fontWeight: 600 }}>let us know</Link>.
          </p>
        </div>

        {/* How We're Funded */}
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0F2A4A', marginBottom: '16px', fontFamily: "'Space Grotesk',system-ui,sans-serif" }}>
            How We Stay Free
          </h2>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.7, marginBottom: '16px' }}>
            ConvertDox is supported by <strong>non-intrusive advertising</strong>. We display a small number of relevant ads (powered by Google AdSense) on our pages, which helps us cover infrastructure costs and keep all tools free for users.
          </p>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.7, margin: 0 }}>
            We&apos;re committed to keeping ads minimal and non-disruptive. You&apos;ll never see popup ads, autoplay videos, or anything that interrupts your work.
          </p>
        </div>

        {/* CTA */}
        <div style={{ background: '#0F2A4A', padding: '40px', borderRadius: '16px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'white', marginBottom: '16px', fontFamily: "'Space Grotesk',system-ui,sans-serif" }}>
            Ready to Get Started?
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', marginBottom: '24px', lineHeight: 1.6 }}>
            Browse our complete collection of free online tools.
          </p>
          <Link href="/" style={{ display: 'inline-block', background: '#E85D04', color: 'white', padding: '16px 40px', borderRadius: '12px', textDecoration: 'none', fontWeight: 700, fontSize: '16px' }}>
            Explore All Tools →
          </Link>
          <div style={{ marginTop: '20px' }}>
            <Link href="/contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px' }}>
              Have feedback? Contact us →
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div style={{ background: 'white', padding: '24px', borderRadius: '14px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <div style={{ fontSize: '36px', fontWeight: 800, color: '#E85D04', marginBottom: '4px', fontFamily: "'Space Grotesk',system-ui,sans-serif" }}>{number}</div>
      <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>{label}</div>
    </div>
  )
}

function Category({ icon, title, count, items }: { icon: string; title: string; count: string; items: string }) {
  return (
    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1.5px solid #e2e8f0' }}>
      <div style={{ fontSize: '32px', marginBottom: '8px' }}>{icon}</div>
      <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F2A4A', marginBottom: '4px', fontFamily: "'Space Grotesk',system-ui,sans-serif" }}>{title}</h3>
      <div style={{ fontSize: '13px', color: '#E85D04', fontWeight: 700, marginBottom: '8px' }}>{count}</div>
      <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>{items}</p>
    </div>
  )
}

function Feature({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div>
      <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icon}</div>
      <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px', fontFamily: "'Space Grotesk',system-ui,sans-serif" }}>{title}</h3>
      <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{text}</p>
    </div>
  )
}
