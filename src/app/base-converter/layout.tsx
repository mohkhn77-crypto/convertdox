import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Number Base Converter — Free Online Tool | ConvertDox',
  description: 'Convert numbers between any bases: binary, octal, decimal, hexadecimal, base 32, base 36. Real-time multi-base conversion with copy buttons.',
  alternates: { canonical: 'https://convertdox.com/base-converter' },
  openGraph: {
    title: 'Number Base Converter — Free Online Tool | ConvertDox',
    description: 'Convert numbers between binary, octal, decimal, hex, base 32 and base 36.',
    url: 'https://convertdox.com/base-converter',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
