import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Legal — Privacy Policy & Terms of Use | ConvertDox',
  description: 'Read the ConvertDox privacy policy, terms of use, cookie policy and GDPR information. We are committed to your privacy and data security.',
  keywords: 'privacy policy, terms of use, cookie policy, GDPR, convertdox legal',
  openGraph: {
    title: 'Legal | ConvertDox',
    description: 'Privacy policy, terms of use and cookie policy for ConvertDox.',
    url: 'https://convertdox.com/legal',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Legal | ConvertDox', description: 'Privacy policy, terms of use and cookie policy.' },
  alternates: { canonical: 'https://convertdox.com/legal' },
}
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
