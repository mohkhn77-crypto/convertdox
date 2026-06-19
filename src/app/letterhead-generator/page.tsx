'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import ToolPageSEO from '@/components/ToolPageSEO'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

const inp = (label: string, value: string, onChange: (v: string) => void, ph = '', type = 'text') => (
  <div>
    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F2A4A', marginBottom: '5px' }}>{label}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={ph}
      style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
  </div>
)

export default function LetterheadGeneratorPage() {
  const [header, setHeader] = useState({ name: '', tagline: '', address: '', phone: '', email: '', website: '' })
  const [letter, setLetter] = useState({ date: new Date().toISOString().split('T')[0], recipientName: '', recipientAddress: '', subject: '', body: '', closing: 'Sincerely', senderName: '', senderTitle: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function download() {
    if (!header.name) { setError('Business name is required'); return }
    if (!letter.body.trim()) { setError('Letter body is required'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`${BACKEND_URL}/api/documents/letterhead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ header, letter })
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({ error: 'Generation failed' })) as { error?: string }
        throw new Error(d.error || 'Failed to generate letterhead')
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'letterhead.pdf'; a.click()
      URL.revokeObjectURL(url)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to generate letterhead.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📄</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Letterhead Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Create professional business letterheads with your company branding</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '900px', margin: '32px auto 0', padding: '0 20px 60px' }}>

        {/* Business Header */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F2A4A', margin: '0 0 16px', paddingBottom: '12px', borderBottom: '1.5px solid #f1f5f9' }}>Business Header</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            {inp('Business Name *', header.name, v => setHeader(p => ({ ...p, name: v })), 'Your Company Name')}
            {inp('Tagline (optional)', header.tagline, v => setHeader(p => ({ ...p, tagline: v })), 'Your business tagline')}
            {inp('Address', header.address, v => setHeader(p => ({ ...p, address: v })), '123 Main St, City, State ZIP')}
            {inp('Phone', header.phone, v => setHeader(p => ({ ...p, phone: v })), '+1 555 000 0000')}
            {inp('Email', header.email, v => setHeader(p => ({ ...p, email: v })), 'info@yourcompany.com', 'email')}
            {inp('Website', header.website, v => setHeader(p => ({ ...p, website: v })), 'www.yourcompany.com')}
          </div>
        </div>

        {/* Letter Content */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F2A4A', margin: '0 0 16px', paddingBottom: '12px', borderBottom: '1.5px solid #f1f5f9' }}>Letter Content</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '14px' }}>
            {inp('Date', letter.date, v => setLetter(p => ({ ...p, date: v })), '', 'date')}
            {inp('Recipient Name', letter.recipientName, v => setLetter(p => ({ ...p, recipientName: v })), 'John Smith')}
            {inp('Recipient Address', letter.recipientAddress, v => setLetter(p => ({ ...p, recipientAddress: v })), '456 Oak Avenue, Town')}
            {inp('Subject', letter.subject, v => setLetter(p => ({ ...p, subject: v })), 'Re: Project Update')}
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F2A4A', marginBottom: '5px' }}>Letter Body *</label>
            <textarea value={letter.body} onChange={e => setLetter(p => ({ ...p, body: e.target.value }))}
              placeholder="Dear [Name],&#10;&#10;Write your letter content here..."
              style={{ width: '100%', minHeight: '180px', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.7 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F2A4A', marginBottom: '5px' }}>Closing</label>
              <select value={letter.closing} onChange={e => setLetter(p => ({ ...p, closing: e.target.value }))}
                style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', background: 'white' }}>
                {['Sincerely', 'Best regards', 'Kind regards', 'Yours faithfully', 'Respectfully', 'Warm regards'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            {inp('Sender Name', letter.senderName, v => setLetter(p => ({ ...p, senderName: v })), 'Your Full Name')}
            {inp('Sender Title', letter.senderTitle, v => setLetter(p => ({ ...p, senderTitle: v })), 'CEO / Manager')}
          </div>
        </div>

        {error && <div style={{ background: '#FEE2E2', border: '1.5px solid #FCA5A5', borderRadius: '10px', padding: '12px 16px', color: '#991B1B', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>⚠️ {error}</div>}

        <button onClick={download} disabled={loading}
          style={{ background: loading ? '#94a3b8' : '#E85D04', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', width: '100%' }}>
          {loading ? '⏳ Generating PDF…' : '⬇ Download Letterhead PDF'}
        </button>

        <div style={{ marginTop: '60px', background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F2A4A', marginBottom: '16px' }}>Professional Business Letterhead Generator</h2>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            A business letterhead establishes credibility and professionalism in your written communications. It typically includes your company name, logo, address, contact information, and sometimes a tagline — all presented consistently at the top of official correspondence.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            Letterheads are used for formal business letters, proposals, contracts, reference letters, partnership communications, and any official document that represents your company. A well-designed letterhead reinforces brand identity and makes your documents look polished and trustworthy.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8 }}>
            Our free letterhead generator creates properly formatted business letters in PDF format. You can include all your business contact details in the header, write your complete letter in the body, and download a print-ready PDF in seconds. No design skills or subscription required.
          </p>
        </div>
      </div>
      <ToolPageSEO
        toolName="Letterhead Generator"
        whatIs="A letterhead generator creates a professional branded header for your business documents and letters. A letterhead typically sits at the top of a page and includes your company name, logo, and contact details, giving official correspondence a consistent, credible appearance. Instead of recreating this header every time, a generator lets you design it once and produce a clean template you can use for letters, quotes, and other documents."
        whatIsExtended="Letterhead matters because it signals professionalism and authenticity — a letter on branded letterhead reads as official in a way a plain page doesn't. The key elements are your company name, logo, address, phone, email, and website, arranged cleanly so they frame the document without crowding the content. The ConvertDox Letterhead Generator helps you assemble these into a polished header. You enter your details directly, with no account required, and download a letterhead ready to use."
        howToUse={[
          'Enter your company or organization name',
          'Add your logo if you have one',
          'Fill in your contact details — address, phone, email, and website',
          'Choose a layout that positions your branding cleanly',
          'Preview to check the header looks balanced and leaves room for your content',
          'Download your letterhead, ready to use for letters and documents',
        ]}
        useCases={[
          { title: 'Business Correspondence', description: 'Give official letters and communications a professional, branded appearance.' },
          { title: 'Quotes and Proposals', description: 'Add credibility to quotes and proposals with consistent company branding.' },
          { title: 'Invoices and Statements', description: 'Top financial documents with a branded header for a polished, official look.' },
          { title: 'New Businesses', description: 'Establish a consistent brand identity across all your documents from day one.' },
          { title: 'Freelancers and Consultants', description: 'Look established and professional when sending client documents.' },
          { title: 'Nonprofits and Clubs', description: 'Create official-looking letterhead for organizational correspondence.' },
        ]}
        tips={[
          'Keep the header clean — it should frame your document, not dominate the page',
          'Use consistent branding (logo, colors, fonts) that matches your other materials',
          'Include the essentials: name, logo, and the main ways to contact you',
          'Leave plenty of space below the header for the actual content of your document',
          'Make sure contact details are accurate and current',
          'Save your letterhead as a reusable template so every document stays consistent',
        ]}
        faqs={[
          { question: 'Is the letterhead generator free?', answer: 'Yes, completely free with no signup and no watermark.' },
          { question: 'What should a letterhead include?', answer: 'Typically your company name, logo, address, phone, email, and website — arranged cleanly at the top of the page so it frames your content without crowding it.' },
          { question: 'Can I add my own logo?', answer: 'Where the tool supports it, you can include your logo to reinforce your branding.' },
          { question: 'Do I need an account?', answer: 'No. You can create and download letterhead without registering — you enter your details directly into the tool.' },
          { question: 'Can I reuse the letterhead for multiple documents?', answer: 'Yes. Once you\'ve created it, you can use the letterhead as a consistent header across all your business documents.' },
          { question: 'Is it suitable for official business use?', answer: 'Yes, the letterhead is free for personal and commercial use, giving your correspondence a professional, branded appearance.' },
        ]}
        relatedTools={[
          { name: 'Business Card Generator', slug: 'business-card-generator', description: 'Create professional business cards' },
          { name: 'Logo Maker', slug: 'logo-maker', description: 'Create a simple logo for your brand' },
          { name: 'Invoice Generator', slug: 'invoice-generator', description: 'Create professional invoices' },
          { name: 'Price Quote Generator', slug: 'price-quote-generator', description: 'Create professional price quotes' },
          { name: 'Purchase Order Generator', slug: 'purchase-order-generator', description: 'Create purchase orders' },
        ]}
      />
    </div>
  )
}
