import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Date Difference Calculator — Free Online Tool | ConvertDox',
  description: 'Calculate the exact difference between two dates in days, weeks, months, and years. Also counts business days excluding weekends.',
  alternates: { canonical: 'https://convertdox.com/date-difference' },
  openGraph: {
    title: 'Date Difference Calculator — Free Online Tool | ConvertDox',
    description: 'Calculate the exact difference between two dates in days, weeks, months, and years.',
    url: 'https://convertdox.com/date-difference',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
