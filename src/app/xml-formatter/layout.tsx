import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'XML Formatter — Free Online Tool | ConvertDox',
  description: 'Format, validate, and minify XML code online. Pretty-print XML with 2-space indentation and validate for syntax errors instantly.',
  alternates: { canonical: 'https://convertdox.com/xml-formatter' },
  openGraph: {
    title: 'XML Formatter — Free Online Tool | ConvertDox',
    description: 'Format, validate, and minify XML code online with instant syntax validation.',
    url: 'https://convertdox.com/xml-formatter',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
