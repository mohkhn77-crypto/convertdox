import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Macro Calculator — Free Online Tool | ConvertDox',
  description: 'Calculate daily protein, carb, and fat targets based on your weight, activity level, and fitness goal. 3 macro splits supported.',
  alternates: { canonical: 'https://convertdox.com/macro-calculator' },
  openGraph: {
    title: 'Macro Calculator — Free Online Tool | ConvertDox',
    description: 'Daily protein, carbs, and fat targets by goal.',
    url: 'https://convertdox.com/macro-calculator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
