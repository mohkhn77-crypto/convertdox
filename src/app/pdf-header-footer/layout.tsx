import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'PDF Header & Footer — Add to PDF Free | ConvertDox',
  description: 'Add custom headers and footers to PDF documents online. Choose text, font, and position. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/pdf-header-footer' },
  openGraph: {
    title: 'PDF Header & Footer — Add to PDF Free',
    description: 'Add headers and footers to PDF online. Free, no signup.',
    url: 'https://convertdox.com/pdf-header-footer',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
