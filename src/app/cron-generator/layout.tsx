import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cron Expression Generator — Free Online Tool | ConvertDox',
  description: 'Build and explain cron job schedules visually. Generate cron expressions with human-readable descriptions and use preset schedules.',
  alternates: { canonical: 'https://convertdox.com/cron-generator' },
  openGraph: {
    title: 'Cron Expression Generator — Free Online Tool | ConvertDox',
    description: 'Build cron expressions visually with human-readable descriptions and presets.',
    url: 'https://convertdox.com/cron-generator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
