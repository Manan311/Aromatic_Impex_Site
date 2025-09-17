export default function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aromatic Impex Inc.",
    "description": "Leading importer of premium-quality spices for wholesale and bulk distribution worldwide.",
    "url": "https://aromaticimpex.com",
    "logo": "https://aromaticimpex.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-XXX-XXX-XXXX",
      "contactType": "customer service",
      "email": "info@aromaticimpex.com"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Unit 1 - 20 Newkirk Court",
      "addressLocality": "Brampton",
      "addressRegion": "ON",
      "postalCode": "L6R 3R3",
      "addressCountry": "CA"
    },
    "sameAs": [
      "https://linkedin.com/company/aromatic-impex",
      "https://facebook.com/aromaticimpex"
    ]
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://aromaticimpex.com"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Products",
        "item": "https://aromaticimpex.com/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "About",
        "item": "https://aromaticimpex.com/about"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Contact",
        "item": "https://aromaticimpex.com/contact"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
    </>
  )
}
