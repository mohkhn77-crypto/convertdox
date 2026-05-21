import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free BMI Calculator — Body Mass Index Metric & Imperial | ConvertDox',
  description: 'Calculate your body mass index (BMI) instantly. Supports metric and imperial units. Free BMI calculator with health category information.',
  keywords: 'BMI calculator, body mass index, healthy weight, overweight calculator',
  openGraph: {
    title: 'Free BMI Calculator | ConvertDox',
    description: 'Calculate your BMI with metric or imperial units. See your health category instantly.',
    url: 'https://convertdox.com/bmi-calculator',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free BMI Calculator | ConvertDox', description: 'Calculate your body mass index instantly.' },
  alternates: { canonical: 'https://convertdox.com/bmi-calculator' },
}
export default function BmiCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
