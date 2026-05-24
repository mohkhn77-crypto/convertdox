import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Letter Spacing Generator — Free Online Tool | ConvertDox',
  description: 'Add spaces, dots, dashes, or underscores between letters. Perfect for social media bios and design accents. Free, in-browser.',
  alternates: { canonical: 'https://convertdox.com/letter-spacing' },
  openGraph: {
    title: 'Letter Spacing Generator — Free Online Tool | ConvertDox',
    description: 'Add separators between letters for Instagram bios and social media.',
    url: 'https://convertdox.com/letter-spacing',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
