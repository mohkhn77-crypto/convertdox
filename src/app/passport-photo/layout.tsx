import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Passport Photo Maker — Resize Photo to ID Size Free | ConvertDox',
  description: 'Create passport and ID photos online. Resize photos to US, UK, and international standard sizes. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/passport-photo' },
  openGraph: {
    title: 'Passport Photo Maker — Resize Photo to ID Size Free',
    description: 'Create passport and ID photos online. Free, no signup.',
    url: 'https://convertdox.com/passport-photo',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
