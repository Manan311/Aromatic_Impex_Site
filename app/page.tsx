import HomePage from '@/components/pages/HomePage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premium Spice Imports for Wholesale & Bulk Distribution',
  description: 'Aromatic Impex Inc. - Leading importer of premium-quality spices, delivering authentic flavors sourced from the finest growers worldwide. Specialized in wholesale and bulk distribution.',
  keywords: [
    'premium spices wholesale',
    'bulk spice imports',
    'commercial spice suppliers',
    'authentic spice distribution',
    'international spice trading',
    'wholesale food ingredients'
  ],
  openGraph: {
    title: 'Premium Spice Imports for Wholesale & Bulk Distribution',
    description: 'Leading importer of premium-quality spices for businesses worldwide. Authentic flavors, competitive pricing, reliable supply.',
    url: '/',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Aromatic Impex Inc. Premium Spices',
      },
    ],
  },
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return <HomePage />
}
