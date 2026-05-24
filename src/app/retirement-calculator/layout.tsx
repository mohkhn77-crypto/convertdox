import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Retirement Calculator — Free Online Tool | ConvertDox',
  description: 'Project your retirement nest egg and check if you are on track. Includes employer match, expected return, and 4% withdrawal rule.',
  alternates: { canonical: 'https://convertdox.com/retirement-calculator' },
  openGraph: {
    title: 'Retirement Calculator — Free Online Tool | ConvertDox',
    description: '401k/IRA nest egg and withdrawal projections.',
    url: 'https://convertdox.com/retirement-calculator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
