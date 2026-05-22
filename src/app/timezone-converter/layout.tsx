import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Time Zone Converter — Free Online Tool | ConvertDox',
  description: 'Convert times between any time zones instantly. See current time in multiple zones and convert dates across the world for free.',
  alternates: { canonical: 'https://convertdox.com/timezone-converter' },
  openGraph: {
    title: 'Time Zone Converter — Free Online Tool | ConvertDox',
    description: 'Convert times between any time zones instantly. See current time in multiple zones.',
    url: 'https://convertdox.com/timezone-converter',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
