import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'PNG to PDF — Convert PNG Images to PDF Free | ConvertDox',
  description: 'Convert PNG images to PDF online. Combine multiple PNG files into one PDF. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/png-to-pdf' },
  openGraph: {
    title: 'PNG to PDF — Convert PNG Images to PDF Free',
    description: 'Convert PNG images to PDF online. Free, no signup.',
    url: 'https://convertdox.com/png-to-pdf',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
