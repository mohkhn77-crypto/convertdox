import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Yes No Picker — Flip a Coin for Yes or No Answers | ConvertDox',
  description: 'Flip a virtual coin for instant Yes or No answers. Track flip history, counters, and confidence percentage. Free online yes no random picker tool.',
  alternates: { canonical: 'https://convertdox.com/yes-no-picker' },
  openGraph: { title: 'Yes No Picker — Flip a Coin for Yes or No Answers | ConvertDox', description: 'Get instant Yes or No answers with a virtual coin flip. Track history and stats.', url: 'https://convertdox.com/yes-no-picker', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
