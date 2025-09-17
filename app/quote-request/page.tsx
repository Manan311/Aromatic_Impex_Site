import QuoteRequestPage from '@/components/pages/QuoteRequestPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request Quote - Bulk Spice Pricing & Wholesale Orders',
  description: 'Get competitive pricing for bulk spice orders. Request a customized quote for wholesale spice purchases from Aromatic Impex Inc.',
  keywords: [
    'spice quote request',
    'bulk spice pricing',
    'wholesale spice quotes',
    'commercial spice pricing',
    'custom spice orders',
    'business spice supplies'
  ],
  openGraph: {
    title: 'Request Quote - Bulk Spice Pricing',
    description: 'Get competitive pricing for bulk spice orders. Fast, professional quotes for wholesale purchases.',
    url: '/quote-request',
    images: [
      {
        url: '/og-quote.jpg',
        width: 1200,
        height: 630,
        alt: 'Request Spice Quote',
      },
    ],
  },
  alternates: {
    canonical: '/quote-request',
  },
}

export default function QuoteRequest() {
  return <QuoteRequestPage />
}
