'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import ToolPageSEO from '@/components/ToolPageSEO'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

export default function BusinessCardGeneratorPage() {
  const [card, setCard] = useState({
    name: '', title: '', company: '', email: '', phone: '', website: '', address: '',
    bgColor: '#0F2A4A', textColor: '#FFFFFF', accentColor: '#E85D04'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (field: string) => (v: string) => setCard(p => ({ ...p, [field]: v }))

  async function download() {
    if (!card.name) { setError('Name is required'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`${BACKEND_URL}/api/documents/business-card`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(card)
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({ error: 'Generation failed' })) as { error?: string }
        throw new Error(d.error || 'Failed to generate business card')
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'business-card.pdf'; a.click()
      URL.revokeObjectURL(url)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to generate business card.')
    } finally {
      setLoading(false)
    }
  }

  const inp = (label: string, field: string, ph = '', type = 'text') => (
    <div>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F2A4A', marginBottom: '5px' }}>{label}</label>
      <input type={type} value={card[field as keyof typeof card]} onChange={e => set(field)(e.target.value)} placeholder={ph}
        style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
    </div>
  )

  const initials = card.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>💼</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Business Card Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Design professional business cards. Download print-ready PDF (2 cards per page).</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '900px', margin: '32px auto 0', padding: '0 20px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* Form */}
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F2A4A', margin: '0 0 16px', paddingBottom: '12px', borderBottom: '1.5px solid #f1f5f9' }}>Contact Information</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {inp('Full Name *', 'name', 'Jane Smith')}
                {inp('Job Title', 'title', 'Product Manager')}
                {inp('Company', 'company', 'Acme Corporation')}
                {inp('Email', 'email', 'jane@acmecorp.com', 'email')}
                {inp('Phone', 'phone', '+1 555 000 0000')}
                {inp('Website', 'website', 'www.acmecorp.com')}
                {inp('Address (optional)', 'address', '123 Main St, City, State')}
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F2A4A', margin: '0 0 16px', paddingBottom: '12px', borderBottom: '1.5px solid #f1f5f9' }}>Card Colors</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                {[['Background', 'bgColor'], ['Text', 'textColor'], ['Accent', 'accentColor']].map(([label, field]) => (
                  <div key={field}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F2A4A', marginBottom: '5px' }}>{label}</label>
                    <input type="color" value={card[field as keyof typeof card]} onChange={e => set(field)(e.target.value)}
                      style={{ width: '100%', height: '40px', border: '1.5px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', padding: '2px' }} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { bg: '#0F2A4A', text: '#FFFFFF', accent: '#E85D04' },
                  { bg: '#1E293B', text: '#F8FAFC', accent: '#60A5FA' },
                  { bg: '#FFFFFF', text: '#0F2A4A', accent: '#E85D04' },
                  { bg: '#7C3AED', text: '#FFFFFF', accent: '#FCD34D' },
                ].map((p, i) => (
                  <button key={i} onClick={() => setCard(prev => ({ ...prev, bgColor: p.bg, textColor: p.text, accentColor: p.accent }))}
                    style={{ width: '36px', height: '22px', borderRadius: '6px', background: p.bg, border: '2px solid ' + p.accent, cursor: 'pointer' }} />
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>Card Preview</div>
              {/* Business card preview (3.5 × 2 inch aspect ratio) */}
              <div style={{ background: card.bgColor, borderRadius: '12px', padding: '20px 24px', aspectRatio: '3.5/2', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
                <div>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: card.accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: card.bgColor, fontSize: '16px', marginBottom: '10px' }}>
                    {initials || 'AB'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: card.textColor, marginBottom: '3px' }}>{card.name || 'Your Name'}</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: card.accentColor, marginBottom: '8px' }}>{card.title || 'Job Title'}</div>
                  <div style={{ fontSize: '11px', color: card.textColor, opacity: 0.7 }}>
                    {card.company && <div>{card.company}</div>}
                    {card.email && <div>{card.email}</div>}
                    {card.phone && <div>{card.phone}</div>}
                    {card.website && <div>{card.website}</div>}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: '#FFF7ED', border: '1.5px solid #FED7AA', borderRadius: '12px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: '#92400E' }}>
              📄 Generates a <strong>print-ready PDF</strong> with 2 business cards per A4 page at standard 3.5 × 2 inch size.
            </div>

            {error && <div style={{ background: '#FEE2E2', border: '1.5px solid #FCA5A5', borderRadius: '10px', padding: '12px 16px', color: '#991B1B', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>⚠️ {error}</div>}

            <button onClick={download} disabled={loading}
              style={{ background: loading ? '#94a3b8' : '#E85D04', color: 'white', border: 'none', padding: '16px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', width: '100%' }}>
              {loading ? '⏳ Generating…' : '⬇ Download Business Card PDF'}
            </button>
          </div>
        </div>

        <div style={{ marginTop: '60px', background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F2A4A', marginBottom: '16px' }}>Free Business Card Generator</h2>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            A professional business card makes a lasting first impression at networking events, client meetings, and conferences. Our free business card generator lets you create a clean, modern business card design and download it as a print-ready PDF instantly.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            The PDF output is formatted at the standard business card size (3.5 × 2 inches) with 2 cards per A4 page. You can take this PDF to any local print shop or online printing service to get professional cards printed. Choose from pre-set color palettes or customize every color to match your brand.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8 }}>
            Good business cards include your name, job title, company, email, phone number, and website. Keep the design clean and uncluttered — your contact information should be easy to read at a glance. Our generator creates a modern design with your initials as a logo mark. Free, no account required.
          </p>
        </div>
      </div>
      <ToolPageSEO
        toolName="Business Card Generator"
        whatIs="A business card generator lets you design a professional business card by entering your details into a ready-made layout, without needing graphic design software. You add your name, title, company, and contact information, and the tool arranges it into a clean, balanced card design you can download and print. It's a fast way to get a professional-looking card whether you're starting a business, attending an event, or just need cards in a hurry."
        whatIsExtended="A business card is often the first tangible impression you leave, so clarity matters more than clutter. The essentials are your name, title, company, phone, email, and website — arranged with enough space to read easily. The ConvertDox Business Card Generator focuses on clean, professional layouts that put your information first. You enter your details directly into the tool, with no account required, and download a card ready to print or share digitally."
        howToUse={[
          'Enter your name and job title',
          'Add your company name and logo if you have one',
          'Fill in your contact details — phone, email, website, and address',
          'Choose a layout or style that fits your profession',
          'Preview the card to check the balance and readability',
          'Download your finished card, ready to print or share',
        ]}
        useCases={[
          { title: 'New Businesses', description: 'Get professional cards quickly when launching a business or brand.' },
          { title: 'Networking Events', description: 'Have cards ready to hand out at conferences, meetups, and trade shows.' },
          { title: 'Freelancers', description: 'Present yourself professionally to potential clients with a clean, branded card.' },
          { title: 'Job Seekers', description: 'Carry a simple personal card with your contact details to networking opportunities.' },
          { title: 'Small Teams', description: 'Create consistent cards for everyone on a small team in the same style.' },
          { title: 'Side Businesses', description: 'Produce affordable cards for a side hustle without hiring a designer.' },
        ]}
        tips={[
          'Keep it clean — white space makes a card look more professional than crammed information',
          'Include only the essentials: name, title, company, and the best ways to reach you',
          'Make sure text is large enough to read easily; avoid tiny fonts',
          'Use consistent branding (colors, logo) that matches your other materials',
          'Double-check every contact detail — a typo in a phone number or email defeats the purpose',
          'If printing, confirm the dimensions and resolution your print service requires',
        ]}
        faqs={[
          { question: 'Is the business card generator free?', answer: 'Yes, completely free with no signup and no watermark on your card.' },
          { question: 'Do I need design skills?', answer: 'No. The tool arranges your details into a balanced, professional layout for you — you just fill in your information.' },
          { question: 'Can I add my logo?', answer: 'Where the tool supports it, you can include a logo to reinforce your branding. Keep it clear and appropriately sized.' },
          { question: 'What information should a business card include?', answer: 'The essentials are your name, job title, company, phone, email, and website. Keep it focused — too much information makes a card hard to read.' },
          { question: 'Can I print these cards?', answer: 'Yes. Download your design and print it yourself or send it to a print service. Check the size and resolution requirements of your printer or provider.' },
          { question: 'Do I need an account?', answer: 'No. You can create and download a business card without registering.' },
        ]}
        relatedTools={[
          { name: 'Logo Maker', slug: 'logo-maker', description: 'Create a simple logo for your brand' },
          { name: 'Letterhead Generator', slug: 'letterhead-generator', description: 'Create branded letterhead' },
          { name: 'Resume Builder', slug: 'resume-builder', description: 'Build a professional resume' },
          { name: 'QR Code Generator', slug: 'qr-generator', description: 'Add a QR code to your card' },
          { name: 'Invoice Generator', slug: 'invoice-generator', description: 'Create professional invoices' },
        ]}
      />
    </div>
  )
}
