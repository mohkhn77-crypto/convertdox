import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free JSON Formatter & Validator — Minify & Beautify JSON | ConvertDox',
  description: 'Format, validate and minify JSON online. Free JSON formatter and beautifier for developers. Syntax highlighting and error detection.',
  keywords: 'json formatter, json validator, json beautifier, json minifier, json viewer',
  openGraph: {
    title: 'Free JSON Formatter & Validator | ConvertDox',
    description: 'Format, validate and minify JSON with syntax highlighting instantly.',
    url: 'https://convertdox.com/json-formatter',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free JSON Formatter | ConvertDox', description: 'Format, validate and minify JSON instantly.' },
  alternates: { canonical: 'https://convertdox.com/json-formatter' },
}
export default function JsonFormatterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
