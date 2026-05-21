import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free Coin Flip & Dice Roller — Flip Coins Online | ConvertDox',
  description: 'Flip a coin or roll dice online. Free virtual coin flip and dice roller for any situation. Roll D6, D20 and custom dice. No signup needed.',
  keywords: 'coin flip, dice roller, virtual coin toss, flip a coin, online dice',
  openGraph: {
    title: 'Free Coin Flip & Dice Roller | ConvertDox',
    description: 'Flip a coin or roll any dice online instantly. Free virtual coin and dice tool.',
    url: 'https://convertdox.com/coin-flip',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free Coin Flip & Dice Roller | ConvertDox', description: 'Flip coins and roll dice online instantly.' },
  alternates: { canonical: 'https://convertdox.com/coin-flip' },
}
export default function CoinFlipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
