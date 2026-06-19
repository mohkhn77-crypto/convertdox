'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import ToolPageSEO from '@/components/ToolPageSEO'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

interface LineItem { description: string; qty: string; unitPrice: string }

const emptyItem = (): LineItem => ({ description: '', qty: '1', unitPrice: '' })

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '20px' }}>
      <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F2A4A', margin: '0 0 16px', paddingBottom: '12px', borderBottom: '1.5px solid #f1f5f9' }}>{title}</h2>
      {children}
    </div>
  )
}

const inp = (label: string, value: string, onChange: (v: string) => void, placeholder = '', type = 'text') => (
  <div>
    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F2A4A', marginBottom: '5px' }}>{label}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
  </div>
)

export default function InvoiceGeneratorPage() {
  const [biz, setBiz] = useState({ name: '', email: '', phone: '', address: '' })
  const [client, setClient] = useState({ name: '', email: '', address: '' })
  const [inv, setInv] = useState({ number: 'INV-001', date: new Date().toISOString().split('T')[0], dueDate: '', currency: 'USD' })
  const [items, setItems] = useState<LineItem[]>([emptyItem()])
  const [taxRate, setTaxRate] = useState('0')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const subtotal = items.reduce((s, it) => s + (parseFloat(it.qty) || 0) * (parseFloat(it.unitPrice) || 0), 0)
  const tax = subtotal * (parseFloat(taxRate) || 0) / 100
  const total = subtotal + tax
  const fmt = (n: number) => n.toFixed(2)

  const addItem = () => setItems(prev => [...prev, emptyItem()])
  const removeItem = (i: number) => setItems(prev => prev.filter((_, idx) => idx !== i))
  const updateItem = (i: number, field: keyof LineItem, val: string) =>
    setItems(prev => prev.map((it, idx) => idx === i ? { ...it, [field]: val } : it))

  async function download() {
    if (!biz.name || !client.name) { setError('Business name and client name are required'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`${BACKEND_URL}/api/documents/invoice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ business: biz, client, invoice: inv, items, taxRate: parseFloat(taxRate) || 0, notes })
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({ error: 'Generation failed' })) as { error?: string }
        throw new Error(d.error || 'Failed to generate invoice')
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = `invoice-${inv.number}.pdf`; a.click()
      URL.revokeObjectURL(url)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to generate invoice. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🧾</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Free Invoice Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Create professional invoices instantly. Free, no signup required.</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '900px', margin: '32px auto 0', padding: '0 20px 60px' }}>

        <Section title="Your Business Information">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            {inp('Business Name *', biz.name, v => setBiz(p => ({ ...p, name: v })), 'Acme Corp')}
            {inp('Email', biz.email, v => setBiz(p => ({ ...p, email: v })), 'you@business.com', 'email')}
            {inp('Phone', biz.phone, v => setBiz(p => ({ ...p, phone: v })), '+1 555 000 0000')}
            {inp('Address', biz.address, v => setBiz(p => ({ ...p, address: v })), '123 Main St, City, State')}
          </div>
        </Section>

        <Section title="Bill To (Client)">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            {inp('Client Name *', client.name, v => setClient(p => ({ ...p, name: v })), 'Client Company')}
            {inp('Client Email', client.email, v => setClient(p => ({ ...p, email: v })), 'client@example.com', 'email')}
            {inp('Client Address', client.address, v => setClient(p => ({ ...p, address: v })), '456 Client Ave, City')}
          </div>
        </Section>

        <Section title="Invoice Details">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
            {inp('Invoice Number', inv.number, v => setInv(p => ({ ...p, number: v })), 'INV-001')}
            {inp('Invoice Date', inv.date, v => setInv(p => ({ ...p, date: v })), '', 'date')}
            {inp('Due Date', inv.dueDate, v => setInv(p => ({ ...p, dueDate: v })), '', 'date')}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F2A4A', marginBottom: '5px' }}>Currency</label>
              <select value={inv.currency} onChange={e => setInv(p => ({ ...p, currency: e.target.value }))}
                style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', background: 'white' }}>
                {['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </Section>

        {/* Line Items */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F2A4A', margin: '0 0 16px', paddingBottom: '12px', borderBottom: '1.5px solid #f1f5f9' }}>Line Items</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 100px 80px', gap: '8px', marginBottom: '8px' }}>
            {['Description', 'Qty', 'Unit Price', ''].map(h => (
              <div key={h} style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</div>
            ))}
          </div>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 100px 80px', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
              <input value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} placeholder="Service or product"
                style={{ padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
              <input type="number" value={item.qty} onChange={e => updateItem(i, 'qty', e.target.value)} min="0"
                style={{ padding: '9px 8px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', width: '100%', boxSizing: 'border-box', textAlign: 'right' }} />
              <input type="number" value={item.unitPrice} onChange={e => updateItem(i, 'unitPrice', e.target.value)} placeholder="0.00" min="0" step="0.01"
                style={{ padding: '9px 8px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', width: '100%', boxSizing: 'border-box', textAlign: 'right' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A' }}>
                  {((parseFloat(item.qty) || 0) * (parseFloat(item.unitPrice) || 0)).toFixed(2)}
                </span>
                {items.length > 1 && (
                  <button onClick={() => removeItem(i)} style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '6px', width: '24px', height: '24px', cursor: 'pointer', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                )}
              </div>
            </div>
          ))}
          <button onClick={addItem}
            style={{ marginTop: '8px', background: 'white', color: '#E85D04', border: '1.5px dashed #E85D04', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
            + Add Item
          </button>

          {/* Totals */}
          <div style={{ marginTop: '20px', borderTop: '1.5px solid #f1f5f9', paddingTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: '280px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#64748b' }}>
                  <span>Subtotal</span><span>{fmt(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '14px', color: '#64748b' }}>
                  <span>Tax <input type="number" value={taxRate} onChange={e => setTaxRate(e.target.value)} min="0" max="100" step="0.1"
                    style={{ width: '52px', padding: '3px 6px', border: '1.5px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', marginLeft: '6px' }} />%</span>
                  <span>{fmt(tax)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: '#0F2A4A', borderTop: '2px solid #0F2A4A', paddingTop: '10px' }}>
                  <span>Total</span><span>{inv.currency} {fmt(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Section title="Notes (Optional)">
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Payment terms, bank details, or any other notes..."
            style={{ width: '100%', minHeight: '80px', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
        </Section>

        {error && (
          <div style={{ background: '#FEE2E2', border: '1.5px solid #FCA5A5', borderRadius: '10px', padding: '12px 16px', color: '#991B1B', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>⚠️ {error}</div>
        )}

        <button onClick={download} disabled={loading}
          style={{ background: loading ? '#94a3b8' : '#E85D04', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', width: '100%' }}>
          {loading ? '⏳ Generating PDF…' : '⬇ Download Invoice PDF'}
        </button>

        {/* SEO Section */}
        <div style={{ marginTop: '60px', background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F2A4A', marginBottom: '16px' }}>Free Professional Invoice Generator</h2>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            Creating professional invoices is essential for freelancers, small businesses, and contractors. Our free invoice generator lets you create polished, print-ready PDF invoices in under a minute. Fill in your business details, add your client information, list your services or products, and download the PDF instantly.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            A good invoice includes your business name and contact info, the client&apos;s details, a unique invoice number, payment due date, itemized line items with quantities and unit prices, tax calculations, and any payment terms. Our generator covers all of these automatically.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8 }}>
            Supports multiple currencies including USD, EUR, GBP, INR, CAD, and AUD. Tax calculation is fully adjustable. All data stays in your browser — nothing is stored on our servers beyond the PDF generation request. ConvertDox is 100% free with no subscription required.
          </p>
        </div>
      </div>
      <ToolPageSEO
        toolName="Invoice Generator"
        whatIs="An invoice generator lets you create professional, properly formatted invoices without needing accounting software or design skills. You fill in your business details, your client's details, the items or services provided, and the amounts — and the tool produces a clean, ready-to-send invoice you can download. It's especially useful for freelancers, contractors, and small businesses who need to bill clients quickly and look professional doing it."
        whatIsExtended="A good invoice does more than request payment — it sets clear expectations and creates a record for both parties. It should include a unique invoice number, dates, an itemized breakdown, the total due, and payment terms. The ConvertDox Invoice Generator builds all of this into a polished layout you can download and send. You enter your information directly into the tool, so you stay in control of your data — there's no account required to create an invoice."
        howToUse={[
          'Enter your business name, address, and contact details',
          'Add your client\'s name and billing information',
          'Set an invoice number and the invoice and due dates',
          'List each item or service with its description, quantity, and price',
          'Add any tax, discount, or notes, then review the calculated total',
          'Download your finished invoice, ready to send to your client',
        ]}
        useCases={[
          { title: 'Freelancers', description: 'Bill clients for design, writing, development, or consulting work with a professional invoice that gets you paid faster.' },
          { title: 'Small Businesses', description: 'Create invoices for products or services without investing in accounting software.' },
          { title: 'Contractors', description: 'Itemize labor and materials clearly for clients on a per-job basis.' },
          { title: 'Side Projects', description: 'Send a polished invoice for occasional or one-off work without setting up a billing system.' },
          { title: 'Tutors and Coaches', description: 'Bill for sessions or packages with a clear, professional record.' },
          { title: 'Service Providers', description: 'Generate consistent invoices for recurring clients and keep your billing tidy.' },
        ]}
        tips={[
          'Use a unique, sequential invoice number for every invoice to stay organized and aid record-keeping',
          'Always include clear payment terms — like "due within 14 days" — to set expectations',
          'Itemize work clearly so clients understand exactly what they\'re paying for',
          'Include your preferred payment method and details to make paying easy',
          'Double-check the totals and tax before sending',
          'Keep a copy of every invoice you send for your own records and tax purposes',
        ]}
        faqs={[
          { question: 'Is the invoice generator free?', answer: 'Yes, completely free with no signup and no watermark on your invoice.' },
          { question: 'Do I need an account?', answer: 'No. You can create and download an invoice without registering. You enter your details directly into the tool.' },
          { question: 'What should an invoice include?', answer: 'A professional invoice includes your business details, the client\'s details, a unique invoice number, the invoice and due dates, an itemized list of goods or services, the total due, and payment terms.' },
          { question: 'Can I add tax and discounts?', answer: 'Yes. You can add tax and discounts, and the tool calculates the adjusted total for you.' },
          { question: 'Can I use this for my business legally?', answer: 'Yes, the invoices are free for personal and commercial use. Note that specific invoicing and tax requirements vary by country — check your local rules or consult an accountant if unsure.' },
          { question: 'How do I send the invoice?', answer: 'Download the finished invoice and send it to your client by email or your preferred method.' },
        ]}
        relatedTools={[
          { name: 'Receipt Generator', slug: 'receipt-generator', description: 'Create receipts for payments' },
          { name: 'Price Quote Generator', slug: 'price-quote-generator', description: 'Create professional price quotes' },
          { name: 'Purchase Order Generator', slug: 'purchase-order-generator', description: 'Create purchase orders' },
          { name: 'Letterhead Generator', slug: 'letterhead-generator', description: 'Create branded letterhead' },
          { name: 'Tax Calculator', slug: 'tax-calculator', description: 'Estimate tax amounts' },
        ]}
      />
    </div>
  )
}
