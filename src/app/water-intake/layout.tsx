import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Water Intake Calculator — Free Online Tool | ConvertDox',
  description: 'Calculate your optimal daily water intake based on weight, activity level, climate, pregnancy and breastfeeding status. Free, in-browser.',
  alternates: { canonical: 'https://convertdox.com/water-intake' },
  openGraph: {
    title: 'Water Intake Calculator — Free Online Tool | ConvertDox',
    description: 'Daily hydration needs based on weight and activity.',
    url: 'https://convertdox.com/water-intake',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
