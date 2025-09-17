'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
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

      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-7xl lg:text-8xl font-bold bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-8 leading-tight">
              Aromatic Impex Inc.
            </h1>
            <p className="text-2xl lg:text-3xl text-slate-600 mb-6 font-medium leading-relaxed">
              Premium Quality Spices for Wholesale & Bulk Distribution
            </p>
            <p className="text-xl text-slate-500 mb-12 max-w-4xl mx-auto leading-relaxed">
              Leading importer of premium-quality spices, delivering authentic
              flavors sourced from the finest growers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products" className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 text-lg shadow-xl">
                View Products
              </Link>
              <Link href="/contact" className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-2xl font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 text-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
