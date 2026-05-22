import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Random Emoji Picker — Browse & Copy Emojis by Category | ConvertDox',
  description: 'Pick random emojis or browse by category. Smileys, animals, food, travel, activities, objects, nature and symbols. Copy any emoji instantly. Free tool.',
  alternates: { canonical: 'https://convertdox.com/emoji-picker' },
  openGraph: { title: 'Random Emoji Picker — Browse & Copy Emojis by Category | ConvertDox', description: 'Pick random emojis by category. Copy instantly. 200+ emojis across 8 categories.', url: 'https://convertdox.com/emoji-picker', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
