import LegalPage from '@/components/LegalPage'

export const metadata = {
  title: 'Terms of Service - ConvertDox',
  description: 'Terms and conditions for using ConvertDox free online tools platform.',
}

export default function Page() {
  return (
    <LegalPage
      title="Terms of Service"
      fileName="terms-of-service"
      description="Rules for using our service"
    />
  )
}
