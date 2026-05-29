import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Merge Specific PDF Pages — Custom PDF Merge Free | ConvertDox',
  description: 'Merge specific pages from multiple PDFs into one document. Select exact pages to combine. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/pdf-merge-specific' },
  openGraph: {
    title: 'Merge Specific PDF Pages — Custom PDF Merge Free',
    description: 'Merge specific pages from multiple PDFs. Free, no signup.',
    url: 'https://convertdox.com/pdf-merge-specific',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
