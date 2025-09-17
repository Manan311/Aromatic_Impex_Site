import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Aromatic Impex Inc. - Premium Spice Imports',
    template: '%s | Aromatic Impex Inc.'
  },
  description: 'Leading importer of premium-quality spices, delivering authentic flavors sourced from the finest growers worldwide. Specialized in wholesale and bulk spice imports for businesses globally.',
  keywords: [
    'spices', 
    'wholesale spices', 
    'bulk spices', 
    'spice import', 
    'spice distribution', 
    'premium spices', 
    'authentic spices',
    'commercial spices',
    'food ingredients',
    'culinary spices',
    'international spices',
    'spice suppliers'
  ],
  authors: [{ name: 'Aromatic Impex Inc.' }],
  creator: 'Aromatic Impex Inc.',
  publisher: 'Aromatic Impex Inc.',
  metadataBase: new URL('https://aromaticimpex.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Aromatic Impex Inc. - Premium Spice Imports',
    description: 'Leading importer of premium-quality spices for wholesale and bulk distribution worldwide.',
    url: 'https://aromaticimpex.com',
    siteName: 'Aromatic Impex Inc.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aromatic Impex Inc. - Premium Spices',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aromatic Impex Inc. - Premium Spice Imports',
    description: 'Leading importer of premium-quality spices for wholesale and bulk distribution worldwide.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://aromaticimpex.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#059669" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
