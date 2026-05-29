import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Protect PDF — Add Password to PDF Free | ConvertDox',
  description: 'Add password protection to PDF files online. Encrypt and secure your PDF documents. Free PDF protector, no signup.',
  alternates: { canonical: 'https://convertdox.com/protect-pdf' },
  openGraph: {
    title: 'Protect PDF — Add Password to PDF Free',
    description: 'Password-protect PDF files online. Free, no signup.',
    url: 'https://convertdox.com/protect-pdf',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
