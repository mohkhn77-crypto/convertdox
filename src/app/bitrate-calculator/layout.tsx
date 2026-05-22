import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Bitrate Calculator — File Size, Duration & Bitrate | ConvertDox',
  description: 'Calculate audio/video bitrate, file size, or duration. Enter any two values and calculate the third. Presets for MP3, Spotify, YouTube HD and 4K video.',
  alternates: { canonical: 'https://convertdox.com/bitrate-calculator' },
  openGraph: { title: 'Bitrate Calculator — File Size, Duration & Bitrate | ConvertDox', description: 'Calculate bitrate, file size or duration. Preset buttons for MP3, Spotify, YouTube, 4K video.', url: 'https://convertdox.com/bitrate-calculator', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
