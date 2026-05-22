import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Binary to Decimal Converter — Free Online Tool | ConvertDox',
  description: 'Convert between binary, decimal, hexadecimal, and octal numbers instantly. Bidirectional converter with validation and quick examples for common values.',
  alternates: { canonical: 'https://convertdox.com/binary-decimal' },
  openGraph: {
    title: 'Binary to Decimal Converter — Free Online Tool | ConvertDox',
    description: 'Convert between binary, decimal, hexadecimal, and octal numbers instantly. Bidirectional converter with validation and quick examples for common values.',
    url: 'https://convertdox.com/binary-decimal',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
