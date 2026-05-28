import fs from 'fs'
import path from 'path'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'

interface LegalPageProps {
  title: string
  fileName: string
  description: string
}

export default function LegalPage({ title, fileName }: LegalPageProps) {
  const filePath = path.join(process.cwd(), `src/data/${fileName}.html`)
  let htmlContent = ''

  try {
    htmlContent = fs.readFileSync(filePath, 'utf-8')
  } catch {
    htmlContent = `<h1>${title}</h1><p>This page is being updated. Please check back soon.</p>`
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <main style={{ maxWidth: '900px', margin: '40px auto 80px', padding: '0 24px' }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}>
          <style dangerouslySetInnerHTML={{ __html: `
            .legal-content {
              color: #334155;
              line-height: 1.7;
              font-size: 15px;
            }
            .legal-content h1 {
              font-size: 32px !important;
              font-weight: 800 !important;
              color: #0F2A4A !important;
              margin-bottom: 16px !important;
              margin-top: 0 !important;
              font-family: inherit !important;
            }
            .legal-content h2 {
              font-size: 22px !important;
              font-weight: 700 !important;
              color: #0F2A4A !important;
              margin-top: 36px !important;
              margin-bottom: 14px !important;
              font-family: inherit !important;
            }
            .legal-content h3 {
              font-size: 18px !important;
              font-weight: 700 !important;
              color: #0F2A4A !important;
              margin-top: 24px !important;
              margin-bottom: 10px !important;
              font-family: inherit !important;
            }
            .legal-content p {
              color: #334155 !important;
              line-height: 1.7 !important;
              margin-bottom: 14px !important;
              font-family: inherit !important;
              font-size: 15px !important;
            }
            .legal-content ul, .legal-content ol {
              margin-left: 20px !important;
              margin-bottom: 16px !important;
              padding-left: 20px !important;
            }
            .legal-content li {
              color: #334155 !important;
              line-height: 1.7 !important;
              margin-bottom: 8px !important;
              font-family: inherit !important;
              font-size: 15px !important;
            }
            .legal-content a {
              color: #E85D04 !important;
              font-weight: 600 !important;
              text-decoration: underline;
            }
            .legal-content a:hover {
              text-decoration: none;
            }
            .legal-content table {
              width: 100% !important;
              border-collapse: collapse !important;
              margin: 20px 0 !important;
            }
            .legal-content table td,
            .legal-content table th {
              padding: 12px !important;
              border: 1px solid #e2e8f0 !important;
              font-size: 14px !important;
              text-align: left !important;
              color: #334155 !important;
              font-family: inherit !important;
            }
            .legal-content table th {
              background: #f8fafc !important;
              font-weight: 700 !important;
              color: #0F2A4A !important;
            }
            .legal-content strong {
              font-weight: 700 !important;
              color: #0F2A4A !important;
            }
            .legal-content em {
              font-style: italic !important;
            }
            .legal-content [data-custom-class='title'],
            .legal-content [data-custom-class='title'] * {
              font-family: inherit !important;
              font-size: 32px !important;
              color: #0F2A4A !important;
              font-weight: 800 !important;
            }
            .legal-content [data-custom-class='subtitle'],
            .legal-content [data-custom-class='subtitle'] * {
              font-family: inherit !important;
              color: #64748b !important;
              font-size: 14px !important;
            }
            .legal-content [data-custom-class='heading_1'],
            .legal-content [data-custom-class='heading_1'] * {
              font-family: inherit !important;
              font-size: 22px !important;
              color: #0F2A4A !important;
              font-weight: 700 !important;
            }
            .legal-content [data-custom-class='heading_2'],
            .legal-content [data-custom-class='heading_2'] * {
              font-family: inherit !important;
              font-size: 18px !important;
              color: #0F2A4A !important;
              font-weight: 700 !important;
            }
            .legal-content [data-custom-class='body_text'],
            .legal-content [data-custom-class='body_text'] * {
              font-family: inherit !important;
              color: #334155 !important;
              font-size: 15px !important;
            }
            .legal-content [data-custom-class='link'],
            .legal-content [data-custom-class='link'] * {
              font-family: inherit !important;
              color: #E85D04 !important;
              font-size: 15px !important;
            }
            .legal-content > span:first-child[style*="background: url(data:image/svg+xml"] {
              display: none !important;
            }
            .legal-content .privacy123 {
              display: none !important;
            }
          ` }} />

          <div className="legal-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />

          <div style={{
            marginTop: '40px',
            padding: '20px',
            background: '#f8fafc',
            borderRadius: '10px',
            fontSize: '14px',
            color: '#64748b',
          }}>
            <strong style={{ color: '#0F2A4A' }}>Questions?</strong> Contact us at{' '}
            <a href="/contact" style={{ color: '#E85D04', fontWeight: 600 }}>convertdox.com/contact</a> or email{' '}
            <a href="mailto:support@convertdox.com" style={{ color: '#E85D04', fontWeight: 600 }}>support@convertdox.com</a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
