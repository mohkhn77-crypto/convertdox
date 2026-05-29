import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Extract PDF Pages — Save Pages as New PDF Free | ConvertDox',
  description: 'Extract specific pages from PDF files and save as a new PDF. Free online page extractor, no signup required.',
  alternates: { canonical: 'https://convertdox.com/pdf-extract-pages' },
  openGraph: {
    title: 'Extract PDF Pages — Save Pages as New PDF Free',
    description: 'Extract pages from PDF online. Free, no signup.',
    url: 'https://convertdox.com/pdf-extract-pages',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
