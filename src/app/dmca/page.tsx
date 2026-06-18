import LegalPage from '@/components/LegalPage'

export const metadata = {
  title: 'Copyright & DMCA Policy - ConvertDox',
  description: 'ConvertDox DMCA and copyright policy. How to submit takedown notices and report copyright infringement.',
  alternates: { canonical: 'https://convertdox.com/dmca' },
}

export default function Page() {
  return (
    <LegalPage
      title="Copyright & DMCA Policy"
      fileName="dmca"
      description="Copyright and DMCA takedown policy"
    />
  )
}
