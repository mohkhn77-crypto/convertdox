'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

interface POItem { description: string; qty: string; unitPrice: string }
const emptyItem = (): POItem => ({ description: '', qty: '1', unitPrice: '' })

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '20px' }}>
      <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F2A4A', margin: '0 0 16px', paddingBottom: '12px', borderBottom: '1.5px solid #f1f5f9' }}>{title}</h2>
      {children}
    </div>
  )
}

const inp = (label: string, value: string, onChange: (v: string) => void, ph = '', type = 'text') => (
  <div>
    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F2A4A', marginBottom: '5px' }}>{label}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={ph}
      style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
  </div>
)

export default function PurchaseOrderGeneratorPage() {
  const [company, setCompany] = useState({ name: '', address: '', email: '', phone: '' })
  const [vendor, setVendor] = useState({ name: '', address: '', email: '', phone: '' })
  const [po, setPo] = useState({ number: 'PO-001', date: new Date().toISOString().split('T')[0], deliveryDate: '', terms: 'Net 30' })
  const [items, setItems] = useState<POItem[]>([emptyItem()])
  const [taxRate, setTaxRate] = useState('0')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const subtotal = items.reduce((s, it) => s + (parseFloat(it.qty) || 0) * (parseFloat(it.unitPrice) || 0), 0)
  const tax = subtotal * (parseFloat(taxRate) || 0) / 100
  const total = subtotal + tax
  const fmt = (n: number) => '$' + n.toFixed(2)

  const addItem = () => setItems(p => [...p, emptyItem()])
  const removeItem = (i: number) => setItems(p => p.filter((_, idx) => idx !== i))
  const updateItem = (i: number, f: keyof POItem, v: string) =>
    setItems(p => p.map((it, idx) => idx === i ? { ...it, [f]: v } : it))

  async function download() {
    if (!company.name || !vendor.name) { setError('Company and vendor names are required'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`${BACKEND_URL}/api/documents/purchase-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, vendor, purchaseOrder: po, items, taxRate: parseFloat(taxRate) || 0, notes })
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({ error: 'Generation failed' })) as { error?: string }
        throw new Error(d.error || 'Failed to generate PO')
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = `purchase-order-${po.number}.pdf`; a.click()
      URL.revokeObjectURL(url)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to generate purchase order.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📋</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Purchase Order Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Create professional purchase orders with vendor details and line items</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '900px', margin: '32px auto 0', padding: '0 20px 60px' }}>

        <Section title="Your Company Information">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            {inp('Company Name *', company.name, v => setCompany(p => ({ ...p, name: v })), 'Your Company')}
            {inp('Address', company.address, v => setCompany(p => ({ ...p, address: v })), '123 Main St, City')}
            {inp('Email', company.email, v => setCompany(p => ({ ...p, email: v })), 'you@company.com', 'email')}
            {inp('Phone', company.phone, v => setCompany(p => ({ ...p, phone: v })), '+1 555 000 0000')}
          </div>
        </Section>

        <Section title="Vendor Information">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            {inp('Vendor Name *', vendor.name, v => setVendor(p => ({ ...p, name: v })), 'Vendor Company')}
            {inp('Vendor Address', vendor.address, v => setVendor(p => ({ ...p, address: v })), '789 Vendor Rd, City')}
            {inp('Vendor Email', vendor.email, v => setVendor(p => ({ ...p, email: v })), 'vendor@supplier.com', 'email')}
            {inp('Vendor Phone', vendor.phone, v => setVendor(p => ({ ...p, phone: v })), '+1 555 111 2222')}
          </div>
        </Section>

        <Section title="PO Details">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
            {inp('PO Number', po.number, v => setPo(p => ({ ...p, number: v })), 'PO-001')}
            {inp('PO Date', po.date, v => setPo(p => ({ ...p, date: v })), '', 'date')}
            {inp('Delivery Date', po.deliveryDate, v => setPo(p => ({ ...p, deliveryDate: v })), '', 'date')}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F2A4A', marginBottom: '5px' }}>Payment Terms</label>
              <select value={po.terms} onChange={e => setPo(p => ({ ...p, terms: e.target.value }))}
                style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', background: 'white' }}>
                {['Net 15', 'Net 30', 'Net 45', 'Net 60', 'Due on Receipt', 'COD'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </Section>

        {/* Items */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F2A4A', margin: '0 0 16px', paddingBottom: '12px', borderBottom: '1.5px solid #f1f5f9' }}>Items to Order</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 110px 90px', gap: '8px', marginBottom: '8px' }}>
            {['Description', 'Qty', 'Unit Price', ''].map(h => (
              <div key={h} style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</div>
            ))}
          </div>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 110px 90px', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
              <input value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} placeholder="Product or service"
                style={{ padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
              <input type="number" value={item.qty} onChange={e => updateItem(i, 'qty', e.target.value)} min="0"
                style={{ padding: '9px 8px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', width: '100%', boxSizing: 'border-box', textAlign: 'right' }} />
              <input type="number" value={item.unitPrice} onChange={e => updateItem(i, 'unitPrice', e.target.value)} placeholder="0.00" min="0" step="0.01"
                style={{ padding: '9px 8px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', width: '100%', boxSizing: 'border-box', textAlign: 'right' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A' }}>{fmt((parseFloat(item.qty) || 0) * (parseFloat(item.unitPrice) || 0))}</span>
                {items.length > 1 && <button onClick={() => removeItem(i)} style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '6px', width: '24px', height: '24px', cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}>×</button>}
              </div>
            </div>
          ))}
          <button onClick={addItem} style={{ marginTop: '8px', background: 'white', color: '#E85D04', border: '1.5px dashed #E85D04', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
            + Add Item
          </button>
          <div style={{ marginTop: '16px', borderTop: '1.5px solid #f1f5f9', paddingTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: '260px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#64748b' }}><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '14px', color: '#64748b' }}>
                <span>Tax <input type="number" value={taxRate} onChange={e => setTaxRate(e.target.value)} min="0" max="100" step="0.1"
                  style={{ width: '48px', padding: '3px 6px', border: '1.5px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', marginLeft: '6px' }} />%</span>
                <span>{fmt(tax)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '17px', fontWeight: 800, color: '#0F2A4A', borderTop: '2px solid #0F2A4A', paddingTop: '8px' }}><span>Total</span><span>{fmt(total)}</span></div>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F2A4A', margin: '0 0 12px' }}>Notes / Terms (Optional)</h2>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Special instructions, shipping terms, or notes..."
            style={{ width: '100%', minHeight: '70px', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
        </div>

        {error && <div style={{ background: '#FEE2E2', border: '1.5px solid #FCA5A5', borderRadius: '10px', padding: '12px 16px', color: '#991B1B', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>⚠️ {error}</div>}

        <button onClick={download} disabled={loading}
          style={{ background: loading ? '#94a3b8' : '#E85D04', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', width: '100%' }}>
          {loading ? '⏳ Generating PDF…' : '⬇ Download Purchase Order PDF'}
        </button>

        <div style={{ marginTop: '60px', background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F2A4A', marginBottom: '16px' }}>What Is a Purchase Order?</h2>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            A purchase order (PO) is a formal document issued by a buyer to a vendor, authorizing the purchase of specific goods or services. Once accepted by the vendor, a PO becomes a legally binding contract. It protects both parties — the buyer gets a confirmed order, and the vendor gets a commitment to payment.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            POs are essential for businesses of all sizes to manage procurement, control spending, and maintain accurate financial records. They help avoid disputes by clearly specifying quantities, prices, delivery dates, and payment terms upfront.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8 }}>
            Our free purchase order generator creates professionally formatted PDFs that you can email directly to vendors. All calculation is automatic — just enter your items and the subtotals, tax, and total are calculated instantly. No account needed, completely free.
          </p>
        </div>
      </div>
    </div>
  )
}
