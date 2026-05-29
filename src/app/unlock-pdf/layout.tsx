import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Unlock PDF — Remove PDF Password Free | ConvertDox',
  description: 'Remove password protection from PDF files online. Unlock encrypted PDFs instantly. Free PDF unlocker, no signup.',
  alternates: { canonical: 'https://convertdox.com/unlock-pdf' },
  openGraph: {
    title: 'Unlock PDF — Remove PDF Password Free',
    description: 'Remove password protection from PDFs online. Free.',
    url: 'https://convertdox.com/unlock-pdf',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
