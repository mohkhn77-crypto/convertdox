import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Calculate BMI Accurately: Formula, Categories & Limits | ConvertDox',
  description: 'The metric and imperial BMI formulas, a step-by-step worked example, the standard category table, and where BMI falls short as a measurement.',
  alternates: { canonical: 'https://convertdox.com/blog/how-to-calculate-bmi-accurately' },
  openGraph: {
    title: 'How to Calculate BMI Accurately',
    description: 'Formula, categories, limitations, and alternatives.',
    url: 'https://convertdox.com/blog/how-to-calculate-bmi-accurately',
    siteName: 'ConvertDox',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
