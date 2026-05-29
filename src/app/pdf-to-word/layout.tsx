import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'PDF to Word — Convert PDF to Editable DOCX Free | ConvertDox',
  description: 'Convert PDF to editable Word documents online. Preserve formatting, fonts, and layout. Free PDF to DOCX converter.',
  alternates: { canonical: 'https://convertdox.com/pdf-to-word' },
  openGraph: {
    title: 'PDF to Word — Convert PDF to Editable DOCX Free',
    description: 'Convert PDF to Word documents online. Free, no signup.',
    url: 'https://convertdox.com/pdf-to-word',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
