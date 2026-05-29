import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Delete PDF Pages — Remove Pages from PDF Free | ConvertDox',
  description: 'Delete or remove specific pages from PDF files online. Select pages to remove and download. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/pdf-delete-pages' },
  openGraph: {
    title: 'Delete PDF Pages — Remove Pages from PDF Free',
    description: 'Delete pages from PDF online. Free, no signup.',
    url: 'https://convertdox.com/pdf-delete-pages',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
