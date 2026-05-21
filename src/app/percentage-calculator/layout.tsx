import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free Percentage Calculator — 5 Types of % Calculations | ConvertDox',
  description: 'Calculate percentages instantly. Find what percentage, percentage of a number, increase/decrease, and more. Free online percentage calculator.',
  keywords: 'percentage calculator, percent calculator, percentage increase, percentage decrease',
  openGraph: {
    title: 'Free Percentage Calculator | ConvertDox',
    description: 'Calculate any type of percentage — find what %, % of a number, increase/decrease.',
    url: 'https://convertdox.com/percentage-calculator',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free Percentage Calculator | ConvertDox', description: 'Calculate percentages instantly — 5 types of calculations.' },
  alternates: { canonical: 'https://convertdox.com/percentage-calculator' },
}
export default function PercentageCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
