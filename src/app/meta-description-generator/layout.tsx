import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meta Description Generator - Free SEO Meta Descriptions | ConvertDox',
  description: 'Generate 3 optimized meta description variations instantly. Free SEO tool with character count, length indicator, and one-click copy. No signup needed.',
  alternates: { canonical: 'https://convertdox.com/meta-description-generator' },
  robots: { index: true, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
