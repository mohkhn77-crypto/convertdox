import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calorie Calculator — Free Online Tool | ConvertDox',
  description: 'Calculate your BMR and daily calorie needs using the Mifflin-St Jeor formula. Get TDEE, weight loss, and weight gain calorie targets.',
  alternates: { canonical: 'https://convertdox.com/calorie-calculator' },
  openGraph: {
    title: 'Calorie Calculator — Free Online Tool | ConvertDox',
    description: 'Calculate your BMR and daily calorie needs. Get TDEE and weight loss/gain targets.',
    url: 'https://convertdox.com/calorie-calculator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
