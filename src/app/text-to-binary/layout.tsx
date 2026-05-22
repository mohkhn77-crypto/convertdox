import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text to Binary Converter — Free Online Tool | ConvertDox',
  description: 'Convert text to binary code and binary back to text. Choose space-separated, no-spaces, or 0b-prefixed formats. Also shows ASCII codes and hex equivalents.',
  alternates: { canonical: 'https://convertdox.com/text-to-binary' },
  openGraph: {
    title: 'Text to Binary Converter — Free Online Tool | ConvertDox',
    description: 'Convert text to binary code and binary back to text.',
    url: 'https://convertdox.com/text-to-binary',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
