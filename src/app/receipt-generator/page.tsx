'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

const inp = (label: string, value: string, onChange: (v: string) => void, ph = '', type = 'text') => (
  <div>
    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F2A4A', marginBottom: '5px' }}>{label}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={ph}
      style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
  </div>
)

interface ReceiptItem { description: string; amount: string }
const emptyItem = (): ReceiptItem => ({ description: '', amount: '' })

export default function ReceiptGeneratorPage() {
  const [biz, setBiz] = useState({ name: '', address: '', phone: '', email: '' })
  const [customer, setCustomer] = useState('')
  const [receiptNum, setReceiptNum] = useState('REC-001')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [paymentMethod, setPaymentMethod] = useState('Cash')
  const [items, setItems] = useState<ReceiptItem[]>([emptyItem()])
  const [taxRate, setTaxRate] = useState('0')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const subtotal = items.reduce((s, it) => s + (parseFloat(it.amount) || 0), 0)
  const tax = subtotal * (parseFloat(taxRate) || 0) / 100
  const total = subtotal + tax
  const fmt = (n: number) => '$' + n.toFixed(2)

  const addItem = () => setItems(p => [...p, emptyItem()])
  const removeItem = (i: number) => setItems(p => p.filter((_, idx) => idx !== i))
  const updateItem = (i: number, f: keyof ReceiptItem, v: string) =>
    setItems(p => p.map((it, idx) => idx === i ? { ...it, [f]: v } : it))

  async function download() {
    if (!biz.name) { setError('Business name is required'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`${BACKEND_URL}/api/documents/receipt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ business: biz, customer, receiptNumber: receiptNum, date, paymentMethod, items, taxRate: parseFloat(taxRate) || 0 })
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({ error: 'Generation failed' })) as { error?: string }
        throw new Error(d.error || 'Failed to generate receipt')
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = `receipt-${receiptNum}.pdf`; a.click()
      URL.revokeObjectURL(url)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to generate receipt. Please try again.')
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
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Receipt Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Generate professional receipts instantly. Free, no signup required.</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '900px', margin: '32px auto 0', padding: '0 20px 60px' }}>

        {/* Business Info */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F2A4A', margin: '0 0 16px', paddingBottom: '12px', borderBottom: '1.5px solid #f1f5f9' }}>Business Information</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            {inp('Business Name *', biz.name, v => setBiz(p => ({ ...p, name: v })), 'Your Business')}
            {inp('Address', biz.address, v => setBiz(p => ({ ...p, address: v })), '123 Main St, City')}
            {inp('Phone', biz.phone, v => setBiz(p => ({ ...p, phone: v })), '+1 555 000 0000')}
            {inp('Email', biz.email, v => setBiz(p => ({ ...p, email: v })), 'info@business.com', 'email')}
          </div>
        </div>

        {/* Receipt Details */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F2A4A', margin: '0 0 16px', paddingBottom: '12px', borderBottom: '1.5px solid #f1f5f9' }}>Receipt Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
            {inp('Receipt Number', receiptNum, setReceiptNum, 'REC-001')}
            {inp('Date', date, setDate, '', 'date')}
            {inp('Customer Name (optional)', customer, setCustomer, 'Walk-in Customer')}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F2A4A', marginBottom: '5px' }}>Payment Method</label>
              <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', background: 'white' }}>
                {['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'PayPal', 'Check', 'Other'].map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Items */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F2A4A', margin: '0 0 16px', paddingBottom: '12px', borderBottom: '1.5px solid #f1f5f9' }}>Items</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 40px', gap: '8px', marginBottom: '8px' }}>
            {['Description', 'Amount ($)', ''].map(h => (
              <div key={h} style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</div>
            ))}
          </div>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 40px', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
              <input value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} placeholder="Item description"
                style={{ padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
              <input type="number" value={item.amount} onChange={e => updateItem(i, 'amount', e.target.value)} placeholder="0.00" min="0" step="0.01"
                style={{ padding: '9px 8px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', width: '100%', boxSizing: 'border-box', textAlign: 'right' }} />
              {items.length > 1 && (
                <button onClick={() => removeItem(i)} style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '6px', width: '32px', height: '32px', cursor: 'pointer', fontSize: '16px', fontWeight: 700 }}>×</button>
              )}
            </div>
          ))}
          <button onClick={addItem}
            style={{ marginTop: '8px', background: 'white', color: '#E85D04', border: '1.5px dashed #E85D04', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
            + Add Item
          </button>

          <div style={{ marginTop: '16px', borderTop: '1.5px solid #f1f5f9', paddingTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: '260px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#64748b' }}>
                <span>Subtotal</span><span>{fmt(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '14px', color: '#64748b' }}>
                <span>Tax <input type="number" value={taxRate} onChange={e => setTaxRate(e.target.value)} min="0" max="100" step="0.1"
                  style={{ width: '50px', padding: '3px 6px', border: '1.5px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', marginLeft: '6px' }} />%</span>
                <span>{fmt(tax)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '17px', fontWeight: 800, color: '#0F2A4A', borderTop: '2px solid #0F2A4A', paddingTop: '8px' }}>
                <span>Total</span><span>{fmt(total)}</span>
              </div>
            </div>
          </div>
        </div>

        {error && <div style={{ background: '#FEE2E2', border: '1.5px solid #FCA5A5', borderRadius: '10px', padding: '12px 16px', color: '#991B1B', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>⚠️ {error}</div>}

        <button onClick={download} disabled={loading}
          style={{ background: loading ? '#94a3b8' : '#E85D04', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', width: '100%' }}>
          {loading ? '⏳ Generating PDF…' : '⬇ Download Receipt PDF'}
        </button>

        <div style={{ marginTop: '60px', background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F2A4A', marginBottom: '16px' }}>Free Receipt Generator</h2>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            A receipt is proof of payment for goods or services. Unlike invoices (which request payment), receipts confirm that payment has already been made. Our free receipt generator is ideal for retail businesses, service providers, tradespeople, and freelancers who need to give customers immediate proof of payment.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            Good receipts include your business name and contact details, a unique receipt number, the date of transaction, customer name (optional), itemized list of goods or services, payment method, and the total amount paid including any applicable tax.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8 }}>
            Receipts are essential for expense tracking, accounting, and tax purposes. Customers often need receipts for warranty claims, expense reimbursements, or returns. Our PDF receipts are professionally formatted and print-ready. Everything runs in your browser — no data is stored.
          </p>
        </div>
      </div>
    </div>
  )
}
