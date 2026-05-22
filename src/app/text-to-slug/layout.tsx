import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text to Slug Generator — Free Online Tool | ConvertDox',
  description: 'Convert text to URL-friendly slugs in bulk. Supports diacritics removal, custom separators, prefix/suffix, max length, and CSV export of slug pairs.',
  alternates: { canonical: 'https://convertdox.com/text-to-slug' },
  openGraph: {
    title: 'Text to Slug Generator — Free Online Tool | ConvertDox',
    description: 'Convert text to URL-friendly slugs in bulk. Supports diacritics removal, custom separators, prefix/suffix, max length, and CSV export of slug pairs.',
    url: 'https://convertdox.com/text-to-slug',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
