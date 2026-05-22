import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Salary Calculator — Free Online Tool | ConvertDox',
  description: 'Convert hourly to annual salary and vice versa. See your pay broken down as hourly, daily, weekly, bi-weekly, monthly, and yearly rates.',
  alternates: { canonical: 'https://convertdox.com/salary-calculator' },
  openGraph: {
    title: 'Salary Calculator — Free Online Tool | ConvertDox',
    description: 'Convert hourly to annual salary and see pay broken down across all time periods.',
    url: 'https://convertdox.com/salary-calculator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
