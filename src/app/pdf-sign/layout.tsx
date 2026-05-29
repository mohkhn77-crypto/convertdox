import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Sign PDF — Add Signature to PDF Free | ConvertDox',
  description: 'Sign PDF documents online. Draw, type, or upload your signature. Free electronic signature tool, no signup.',
  alternates: { canonical: 'https://convertdox.com/pdf-sign' },
  openGraph: {
    title: 'Sign PDF — Add Signature to PDF Free',
    description: 'Sign PDF documents online. Free, no signup.',
    url: 'https://convertdox.com/pdf-sign',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
