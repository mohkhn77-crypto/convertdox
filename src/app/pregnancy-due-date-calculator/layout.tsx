import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pregnancy Due Date Calculator - Free | ConvertDox',
  description: 'Calculate pregnancy due date instantly. Free calculator with trimester breakdown, current week, and milestones.',
  alternates: { canonical: 'https://convertdox.com/pregnancy-due-date-calculator' },
  robots: { index: true, follow: true }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
