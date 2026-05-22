import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Decision Maker — Random Yes/No & Multi-Choice Picker | ConvertDox',
  description: 'Can\'t decide? Let our free decision maker choose for you. Yes/No mode or add up to 10 options for a random pick. No signup needed.',
  alternates: { canonical: 'https://convertdox.com/decision-maker' },
  openGraph: { title: 'Decision Maker — Random Yes/No & Multi-Choice Picker | ConvertDox', description: 'Free online decision maker. Yes/No random answer or pick from up to 10 custom options.', url: 'https://convertdox.com/decision-maker', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
