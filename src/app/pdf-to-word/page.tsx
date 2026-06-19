'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'
import LegalNoticeHigh from '@/components/LegalNoticeHigh'
import LegalFooter from '@/components/LegalFooter'
import ToolPageSEO from '@/components/ToolPageSEO'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

export default function PdfToWordPage() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [acknowledged, setAcknowledged] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File | null) => {
    if (!f) return
    if (f.type !== 'application/pdf') { setError('Only PDF files are accepted'); return }
    setFile(f); setError(''); setSuccess(false)
  }

  const convert = async () => {
    if (!file) return
    setProcessing(true); setError(''); setSuccess(false)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch(`${BACKEND_URL}/api/pdf/to-word`, { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Unknown error' })) as { error?: string }
        throw new Error(data.error ?? `Server error: ${res.status}`)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'converted.docx'
      document.body.appendChild(a); a.click()
      URL.revokeObjectURL(url); document.body.removeChild(a)
      setSuccess(true); setFile(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert PDF. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const fmt = (b: number) => b < 1_048_576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1_048_576).toFixed(1)} MB`

  return (
    <div style={{ minHeight:'100vh', background:'#fff', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(43,87,154,0.25)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', color:'white', fontWeight:800 }}>W</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>PDF to Word</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Convert PDF documents to editable Word files (.docx)</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'16px 24px 0' }}>
        <div style={{ background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'12px', padding:'12px 16px', display:'flex', alignItems:'center', gap:'14px', flexWrap:'wrap' as const, justifyContent:'center' }}>
          {[{icon:'🔒',text:'Files auto-deleted in 1 hour'},{icon:'🛡',text:'HTTPS encrypted'},{icon:'⚡',text:'Fast processing'},{icon:'🆓',text:'100% free, no signup'}].map(item => (
            <span key={item.text} style={{ fontSize:'13px', color:'#166534', fontWeight:600, display:'flex', alignItems:'center', gap:'6px' }}><span style={{ fontSize:'16px' }}>{item.icon}</span>{item.text}</span>
          ))}
        </div>
      </div>

      <LegalNoticeHigh type="copyright" toolName="PDF to Word" acknowledged={acknowledged} onAcknowledge={setAcknowledged}
        customMessage="When extracting content from PDFs, ensure you have the right to use the extracted content." />

      <div style={{ maxWidth:'860px', margin:'16px auto 0', padding:'0 24px' }}>
        <div style={{ background:'#FFF7ED', border:'1.5px solid #FED7AA', borderRadius:'10px', padding:'12px 16px', fontSize:'13px', color:'#92400E', lineHeight:'1.6' }}>
          ⚠️ <strong>Conversion note:</strong> Complex layouts, tables, and images may not convert perfectly. This tool works best for text-heavy PDFs. Scanned documents and image-only PDFs are not supported.
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'16px auto 0', padding:'0 24px' }}>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#E85D04'; (e.currentTarget as HTMLDivElement).style.background='#FFF7ED' }}
          onDragLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc' }}
          onDrop={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc'; handleFile(e.dataTransfer.files[0] ?? null) }}
          style={{ background:'#f8fafc', border:'2px dashed #cbd5e1', borderRadius:'16px', padding:'48px 24px', textAlign:'center' as const, cursor:'pointer', transition:'all 0.2s' }}>
          <div style={{ fontSize:'56px', marginBottom:'12px' }}>📄</div>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'20px', fontWeight:700, color:'#0F2A4A', marginBottom:'6px' }}>Drop your PDF here</div>
          <div style={{ fontSize:'14px', color:'#64748b', marginBottom:'18px' }}>or click to browse from your computer</div>
          <button style={{ background:'#E85D04', color:'white', padding:'12px 32px', borderRadius:'10px', border:'none', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Select PDF</button>
          <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'12px' }}>PDF files only · Max 50 MB · Text-based PDFs work best</div>
          <input ref={fileInputRef} type="file" accept="application/pdf" style={{ display:'none' }} onChange={e => handleFile(e.target.files?.[0] ?? null)} />
        </div>

        {file && (
          <div style={{ marginTop:'20px', background:'white', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'16px', display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ width:'40px', height:'40px', background:'#FEE2E2', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#DC2626', fontWeight:700, fontSize:'11px', flexShrink:0 }}>PDF</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'14px', fontWeight:600, color:'#0F2A4A', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{file.name}</div>
              <div style={{ fontSize:'12px', color:'#94a3b8' }}>{fmt(file.size)}</div>
            </div>
            <button onClick={() => setFile(null)} style={{ background:'#FEE2E2', color:'#DC2626', border:'none', borderRadius:'6px', padding:'4px 10px', cursor:'pointer', fontWeight:700, fontSize:'16px' }}>×</button>
          </div>
        )}

        {error && <div style={{ marginTop:'16px', background:'#FEE2E2', border:'1.5px solid #FCA5A5', borderRadius:'10px', padding:'12px 16px', color:'#991B1B', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}
        {success && <div style={{ marginTop:'16px', background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'10px', padding:'12px 16px', color:'#166534', fontSize:'14px', fontWeight:600 }}>✅ Converted successfully! Your .docx file has downloaded.</div>}

        <div style={{ marginTop:'24px', textAlign:'center' as const }}>
          <button onClick={convert} disabled={!file || !acknowledged || processing}
            style={{ background: !file || !acknowledged || processing ? '#cbd5e1' : '#E85D04', color:'white', padding:'16px 48px', borderRadius:'12px', border:'none', fontSize:'16px', fontWeight:700, cursor: !file || !acknowledged || processing ? 'not-allowed' : 'pointer', fontFamily:'inherit', minWidth:'260px' }}>
            {processing ? '⏳ Converting… (up to 1 minute)' : !acknowledged ? '☑️ Check box to continue' : 'W Convert to Word'}
          </button>
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'48px auto 0', padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>How to Convert PDF to Word</h2>
          <ol style={{ paddingLeft:'24px', fontSize:'15px', color:'#64748b', lineHeight:'1.8' }}>
            {['Upload your PDF by clicking "Select PDF" or dragging it into the area above.','Click "Convert to Word" — our server extracts text and structure from the PDF.','Wait up to 1 minute for large or complex documents.','Your .docx file downloads automatically and can be opened in Microsoft Word or Google Docs.'].map((s,i) => (
              <li key={i} style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step {i+1}:</strong> {s}</li>
            ))}
          </ol>
        </section>
        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'What kinds of PDFs convert best?', a:'Text-heavy PDFs with simple layouts convert most accurately. Multi-column layouts, complex tables, and documents with many images may lose formatting.' },
            { q:'Can it convert scanned PDFs?', a:'No. Scanned PDFs are image-only — there is no embedded text to extract. You would need OCR software for those.' },
            { q:'How long does conversion take?', a:'Most PDFs convert in under 30 seconds. Large or complex files may take up to 1 minute. Please wait and do not close the tab.' },
            { q:'Is there a file size limit?', a:'Yes, PDFs up to 50 MB are supported.' },
            { q:'Are my files safe?', a:'Yes. Files are sent over HTTPS and deleted from our server within 1 hour.' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'14px 18px', marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px', fontWeight:600, color:'#0F2A4A', cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px', color:'#64748b', lineHeight:'1.7', marginTop:'10px', marginBottom:0 }}>{faq.a}</p>
            </details>
          ))}
        </section>
      </div>
      <LegalFooter toolName="PDF to Word" type="copyright" />
      <ToolPageSEO
        toolName="PDF to Word"
        whatIs="Converting PDF to Word means turning a fixed, non-editable PDF document into an editable Word (.docx) file you can change in Microsoft Word, Google Docs, or any word processor. PDFs are designed to look the same everywhere, which makes them great for sharing but frustrating when you need to edit the text. A PDF to Word converter extracts the text, formatting, and layout from the PDF and rebuilds it as an editable document."
        whatIsExtended="The quality of a PDF-to-Word conversion depends on how the original PDF was created. PDFs generated from text (exported from Word, for example) convert cleanly with editable text and preserved formatting. Scanned PDFs — which are essentially images of pages — are harder, since the text has to be recognized first. ConvertDox processes your file securely and deletes it within minutes, with no watermark on the output."
        howToUse={[
          'Upload the PDF you want to convert by clicking the upload area or dragging the file in',
          'Wait while the file uploads and the converter analyzes its structure',
          'The tool extracts text and formatting and rebuilds it as a Word document',
          'Download the converted .docx file',
          'Open it in Microsoft Word, Google Docs, or any word processor to edit',
          'Your original PDF is automatically deleted from our servers within minutes',
        ]}
        useCases={[
          { title: 'Editing Received Documents', description: 'Someone sent you a PDF you need to revise. Convert it to Word, make your changes, and you\'re done — no retyping.' },
          { title: 'Updating Old Files', description: 'Reuse content from an old PDF report or proposal by converting it to an editable format instead of rebuilding from scratch.' },
          { title: 'Extracting Text', description: 'Pull paragraphs, tables, or sections out of a PDF to repurpose in another document.' },
          { title: 'Reformatting Resumes', description: 'Convert a PDF resume back to Word so you can tailor it for a new application.' },
          { title: 'Translating Documents', description: 'Get an editable version so you can translate or annotate the text directly.' },
          { title: 'Filling Forms', description: 'Turn a flat PDF form into an editable document you can complete and customize.' },
        ]}
        tips={[
          'Text-based PDFs convert best — files exported from Word or similar keep their formatting cleanly',
          'Scanned PDFs may need OCR first; try our PDF OCR tool if the text isn\'t selectable',
          'Always review the converted file — complex layouts and tables may need minor cleanup',
          'Fonts may shift slightly if your computer doesn\'t have the original font installed',
          'For simple text documents, conversion is usually near-perfect',
          'Keep the original PDF until you\'ve confirmed the Word version is correct',
        ]}
        faqs={[
          { question: 'Is the PDF to Word converter free?', answer: 'Yes, completely free with no signup and no watermark added to the converted document.' },
          { question: 'Will the formatting be preserved?', answer: 'For text-based PDFs, formatting like headings, paragraphs, and basic layout is preserved well. Very complex layouts may need minor adjustments after conversion.' },
          { question: 'Can I convert a scanned PDF?', answer: 'Scanned PDFs are images of text, so they convert best after OCR (optical character recognition). Try our PDF OCR tool first if the text in your PDF isn\'t selectable.' },
          { question: 'Are my files private?', answer: 'Yes. Your PDF is uploaded securely, converted, and automatically deleted from our servers within minutes. We never store or read your documents.' },
          { question: 'What format is the output?', answer: 'The output is a .docx file, which opens in Microsoft Word, Google Docs, LibreOffice, and virtually any modern word processor.' },
          { question: 'Is there a file size limit?', answer: 'You can convert large files, though very large or image-heavy PDFs take longer to process.' },
        ]}
        relatedTools={[
          { name: 'Word to PDF', slug: 'word-to-pdf', description: 'Convert Word documents to PDF' },
          { name: 'PDF to Text', slug: 'pdf-to-text', description: 'Extract plain text from a PDF' },
          { name: 'PDF OCR', slug: 'pdf-ocr', description: 'Recognize text in scanned PDFs' },
          { name: 'Merge PDF', slug: 'merge-pdf', description: 'Combine multiple PDFs into one file' },
          { name: 'Compress PDF', slug: 'compress-pdf', description: 'Reduce PDF file size for easier sharing' },
        ]}
      />
    </div>
  )
}
