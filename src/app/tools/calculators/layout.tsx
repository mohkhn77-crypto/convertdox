import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculators & Converters — BMI, Tip, Loan, Unit & More | ConvertDox',
  description: 'Free online calculators and converters: tip calculator, BMI, percentage, age, discount, unit converter, loan calculator, timezone converter, date difference, salary, compound interest, and more.',
  alternates: { canonical: 'https://convertdox.com/tools/calculators' },
  openGraph: {
    title: 'Calculators & Converters | ConvertDox',
    description: 'Free online calculators and converters — 20+ tools for everyday math.',
    url: 'https://convertdox.com/tools/calculators',
  },
}

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return children
}
