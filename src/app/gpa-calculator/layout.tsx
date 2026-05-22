import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GPA Calculator — Free Online Tool | ConvertDox',
  description: 'Calculate your GPA from course grades and credit hours. Add multiple courses and see your running GPA updated in real time.',
  alternates: { canonical: 'https://convertdox.com/gpa-calculator' },
  openGraph: {
    title: 'GPA Calculator — Free Online Tool | ConvertDox',
    description: 'Calculate your GPA from course grades and credit hours with real-time updates.',
    url: 'https://convertdox.com/gpa-calculator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
