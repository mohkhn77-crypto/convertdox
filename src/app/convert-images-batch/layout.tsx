import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Batch Image Converter — Convert Multiple Images Free | ConvertDox',
  description: 'Convert multiple images to JPG, PNG, or WebP at once. Free batch image format converter, no signup.',
  alternates: { canonical: 'https://convertdox.com/convert-images-batch' },
  openGraph: {
    title: 'Batch Image Converter — Convert Multiple Images Free',
    description: 'Convert multiple images between formats at once. Free.',
    url: 'https://convertdox.com/convert-images-batch',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
