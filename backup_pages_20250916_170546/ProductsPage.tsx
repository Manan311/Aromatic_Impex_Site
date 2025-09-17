'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductsPage() {
  const [clickCount, setClickCount] = useState(0);
  const [showHRLink, setShowHRLink] = useState(false);

  const handleLogoClick = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setShowHRLink(true);
        setTimeout(() => setShowHRLink(false), 10000);
        return 0;
      }
      return newCount;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header 
        showHRLink={showHRLink}
        onLogoClick={handleLogoClick}
        clickCount={clickCount}
      />
      
      <section className="py-32 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-8">
            Our Spices
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            Explore our extensive collection of premium spices from global sources. 
            Multiple grades available for bulk orders with competitive wholesale pricing.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
