import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Remove Duplicate Lines — Free Online Tool | ConvertDox',
  description: 'Remove duplicate lines from any text instantly. Options for case-insensitive matching, trim whitespace, remove empty lines, and sort results.',
  alternates: { canonical: 'https://convertdox.com/remove-duplicates' },
  openGraph: {
    title: 'Remove Duplicate Lines — Free Online Tool | ConvertDox',
    description: 'Remove duplicate lines from any text instantly. Options for case-insensitive matching, trim whitespace, remove empty lines, and sort results.',
    url: 'https://convertdox.com/remove-duplicates',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
