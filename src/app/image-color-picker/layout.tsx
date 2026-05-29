import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Image Color Picker — Extract Colors from Images Free | ConvertDox',
  description: 'Pick colors from any image online. Get HEX, RGB, and HSL color codes instantly. Free image color picker.',
  alternates: { canonical: 'https://convertdox.com/image-color-picker' },
  openGraph: {
    title: 'Image Color Picker — Extract Colors Free',
    description: 'Pick colors from images and get HEX/RGB codes. Free.',
    url: 'https://convertdox.com/image-color-picker',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
