import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Letterhead Generator - Professional Business Letterhead | ConvertDox',
  description: 'Create professional business letterheads with your company branding. Free letterhead maker with header, recipient, body, and PDF download. No signup.',
  alternates: { canonical: 'https://convertdox.com/letterhead-generator' },
  robots: { index: true, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
