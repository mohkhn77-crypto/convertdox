import LegalPage from '@/components/LegalPage'

export const metadata = {
  title: 'Disclaimer - ConvertDox',
  description: 'Important disclaimers for using ConvertDox tools.',
}

export default function Page() {
  return (
    <LegalPage
      title="Disclaimer"
      fileName="disclaimer"
      description="Important disclaimers"
    />
  )
}
