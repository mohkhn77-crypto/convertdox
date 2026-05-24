import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '10 Best Free Password Generators in 2026 | ConvertDox',
  description: 'Security expert picks for the best free password generators in 2026 — client-side, open source, and built for real-world threats. Full comparison + FAQs.',
  alternates: { canonical: 'https://convertdox.com/blog/best-free-password-generators-2026' },
  openGraph: {
    title: '10 Best Free Password Generators in 2026',
    description: 'The most trustworthy free password generators, ranked.',
    url: 'https://convertdox.com/blog/best-free-password-generators-2026',
    siteName: 'ConvertDox',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
