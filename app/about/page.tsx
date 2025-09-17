import AboutPage from '@/components/pages/AboutPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Our Story & Commitment to Quality Spices',
  description: 'Learn about Aromatic Impex Inc. and our mission to bring authentic, premium-quality spices from global sources. Discover our commitment to excellence and sustainable practices.',
  keywords: [
    'about aromatic impex',
    'spice company story',
    'quality spice imports',
    'sustainable spice sourcing',
    'premium spice suppliers',
    'authentic spice origins'
  ],
  openGraph: {
    title: 'About Aromatic Impex Inc. - Premium Spice Importers',
    description: 'Discover our story, values, and commitment to bringing the world\'s finest spices to your business.',
    url: '/about',
    images: [
      {
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'About Aromatic Impex Inc.',
      },
    ],
  },
  alternates: {
    canonical: '/about',
  },
}

export default function About() {
  return <AboutPage />
}
