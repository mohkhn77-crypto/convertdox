import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Investment Calculator — Free Online Tool | ConvertDox',
  description: 'Project the future value of your investments with compound interest, monthly contributions, and adjustable return rates. Free, in-browser.',
  alternates: { canonical: 'https://convertdox.com/investment-calculator' },
  openGraph: {
    title: 'Investment Calculator — Free Online Tool | ConvertDox',
    description: 'Project stock/savings growth with compound returns.',
    url: 'https://convertdox.com/investment-calculator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
