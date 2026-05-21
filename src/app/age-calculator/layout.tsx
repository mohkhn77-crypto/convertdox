import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free Age Calculator — Exact Age, Zodiac & Birthday | ConvertDox',
  description: 'Calculate your exact age in years, months, days, hours and minutes. Find your zodiac sign and next birthday countdown. Free, no signup.',
  keywords: 'age calculator, birthday calculator, zodiac sign calculator, how old am I',
  openGraph: {
    title: 'Free Age Calculator | ConvertDox',
    description: 'Calculate your exact age, zodiac sign and next birthday countdown instantly.',
    url: 'https://convertdox.com/age-calculator',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free Age Calculator | ConvertDox', description: 'Find your exact age, zodiac sign and next birthday instantly.' },
  alternates: { canonical: 'https://convertdox.com/age-calculator' },
}
export default function AgeCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
