import ProductsPage from '@/components/pages/ProductsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premium Spice Catalog - Wholesale & Bulk Orders Available',
  description: 'Browse our extensive collection of premium spices from global sources. Multiple grades available for bulk orders. Competitive wholesale pricing for businesses.',
  keywords: [
    'spice catalog',
    'wholesale spices list',
    'bulk spice orders',
    'premium spice varieties',
    'commercial spice suppliers',
    'international spice collection',
    'turmeric wholesale',
    'cardamom bulk',
    'cumin seeds wholesale',
    'black pepper bulk',
    'cinnamon wholesale',
    'coriander seeds bulk'
  ],
  openGraph: {
    title: 'Premium Spice Catalog - Wholesale & Bulk Orders',
    description: 'Explore our extensive collection of premium spices. Multiple grades, competitive pricing, reliable supply for businesses.',
    url: '/products',
    images: [
      {
        url: '/og-products.jpg',
        width: 1200,
        height: 630,
        alt: 'Aromatic Impex Spice Catalog',
      },
    ],
  },
  alternates: {
    canonical: '/products',
  },
}

export default function Products() {
  return <ProductsPage />
}
