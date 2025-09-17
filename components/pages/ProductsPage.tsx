'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CubeIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  ScaleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import SpiceCard from '@/components/SpiceCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  productCategories, 
  getFilteredProducts, 
  getCategories, 
  getCategoryNames, 
  getAllProducts 
} from '@/data/products';

export default function ProductsPage() {
  const [clickCount, setClickCount] = useState(0);
  const [showHRLink, setShowHRLink] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = getCategories();

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

      {/* Page Header */}
            <section className="relative py-20 px-6 overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/homepage-image-1.png"
                  alt="Aromatic spices background"
                  fill
                  className="object-cover opacity-15"
                  priority
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-yellow-50/30"></div>
              <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-green-400/20 to-emerald-300/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-yellow-300/20 to-amber-400/20 rounded-full blur-3xl"></div>
      
              <div className="container mx-auto text-center relative z-10">
                <div className="max-w-4xl mx-auto">
                  <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-full px-6 py-3 mb-8 shadow-lg">
                    <SparklesIcon className="w-5 h-5 text-amber-500" />
                    <span className="text-sm font-semibold text-slate-700">Premium Collection</span>
                  </div>
                  <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 bg-clip-text text-transparent mb-6 tracking-tight">
                  SPICES                  </h1>
                  <p className="text-xl text-slate-600 leading-relaxed">
                  WHERE FLAVOR MEETS AUTHENTICITY!
                  </p>
                </div>
              </div>
            </section>


      {/* Products with Category Filtering */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          {/* Category Filter Buttons */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-20">
            {getFilteredProducts(selectedCategory).map((spice, index) => (
              <SpiceCard
                key={`${selectedCategory}-${index}`}
                name={spice.name}
                image={spice.image}
              />
            ))}
          </div>

          {/* Request Quote CTA */}
          <div className="text-center">
            <Link href="/quote-request">
              <button className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:scale-105 flex items-center space-x-2 mx-auto">
                <span>Request Quote for Selected Products</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
