import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Magic 8 Ball — Free Online Fortune Teller | ConvertDox',
  description: 'Ask the Magic 8 Ball your burning questions and get classic predictions. 20 responses including positive, neutral, and negative answers. Free online tool.',
  alternates: { canonical: 'https://convertdox.com/magic-8-ball' },
  openGraph: { title: 'Magic 8 Ball — Free Online Fortune Teller | ConvertDox', description: 'Ask the Magic 8 Ball your burning questions and get classic predictions. 20 classic responses.', url: 'https://convertdox.com/magic-8-ball', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
