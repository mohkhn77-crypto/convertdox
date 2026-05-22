import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Team Picker — Random Team Generator from Names | ConvertDox',
  description: 'Shuffle names into random balanced teams instantly. Paste a list of names, choose how many teams, and get fair random groups. Free online tool.',
  alternates: { canonical: 'https://convertdox.com/team-picker' },
  openGraph: { title: 'Team Picker — Random Team Generator from Names | ConvertDox', description: 'Shuffle names into random balanced teams. Paste names, pick team count, get instant groups.', url: 'https://convertdox.com/team-picker', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
