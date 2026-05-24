import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Body Fat Calculator — Free Online Tool | ConvertDox',
  description: 'Calculate your body fat percentage using the US Navy method or BMI-based formula. Imperial and metric units. Free, in-browser.',
  alternates: { canonical: 'https://convertdox.com/body-fat-calculator' },
  openGraph: {
    title: 'Body Fat Calculator — Free Online Tool | ConvertDox',
    description: 'Body fat % using Navy or BMI methods — male and female.',
    url: 'https://convertdox.com/body-fat-calculator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
