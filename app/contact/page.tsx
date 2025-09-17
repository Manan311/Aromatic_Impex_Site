import ContactPage from '@/components/pages/ContactPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch for Bulk Spice Orders',
  description: 'Contact Aromatic Impex Inc. for inquiries, bulk orders, and premium spice requirements. Located in Brampton, ON. Expert customer service for North America.',
  keywords: [
    'contact aromatic impex',
    'bulk spice orders',
    'spice supplier contact',
    'wholesale spice inquiry',
    'brampton spice company',
    'canada spice imports',
    'commercial spice quotes'
  ],
  openGraph: {
    title: 'Contact Aromatic Impex Inc. - Bulk Spice Orders',
    description: 'Get in touch for bulk orders, inquiries, and premium spice requirements. Expert service across North America.',
    url: '/contact',
    images: [
      {
        url: '/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Aromatic Impex Inc.',
      },
    ],
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function Contact() {
  return <ContactPage />
}
