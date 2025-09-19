'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  GlobeAltIcon,
  ScaleIcon,
  CubeIcon,
  CheckIcon,
  SparklesIcon,
  ArrowRightIcon,
  TruckIcon,
  ShieldCheckIcon,
  StarIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { initEmailJS } from '@/lib/emailjs';

export default function HomePage() {
  const [clickCount, setClickCount] = useState(0);
  const [showHRLink, setShowHRLink] = useState(false);

  useEffect(() => {
    initEmailJS();
  }, []);

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

      {/* Enhanced Hero Section with Background Image */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/homepage-image-1.png"
            alt="Colorful spices background"
            fill
            className="object-cover opacity-10"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-yellow-50/30"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-green-400/20 to-emerald-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-yellow-300/20 to-amber-400/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-full px-6 py-3 mb-8 shadow-lg">
              <SparklesIcon className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-semibold text-slate-700">
                Built on Trust. Backed by Experience.
              </span>
            </div>

            <h1 className="text-7xl lg:text-8xl font-bold bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-8 leading-tight">
              Aromatic Impex Inc.
            </h1>

            <p className="text-2xl lg:text-3xl text-slate-600 mb-6 font-medium leading-relaxed">
              Premium Quality Spices for
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold">
                {' '}Wholesale{' '}
              </span>
              &
              <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent font-bold">
                {' '}Bulk Distribution
              </span>
            </p>

            <p className="text-xl text-slate-500 mb-12 max-w-4xl mx-auto leading-relaxed">
              Leading importer of premium-quality spices, delivering authentic
              flavors sourced from the finest growers worldwide. Specialized in
              wholesale and bulk spice imports for businesses in North America.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/quote-request">
                <button className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-5 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:scale-105 flex items-center space-x-2">
                  <span>Request Quote</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/about">
                <button className="group border-2 border-slate-300 text-slate-700 px-10 py-5 rounded-2xl font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 text-lg backdrop-blur-sm bg-white/60">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '20+', label: 'Years Experience', icon: StarIcon },
              { number: '50+', label: 'Countries Sourced', icon: GlobeAltIcon },
              { number: '200+', label: 'Spice Varieties', icon: CubeIcon },
              { number: '500+', label: 'Happy Clients', icon: UsersIcon },
            ].map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-green-700 mb-2">{stat.number}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Images */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-green-50/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-100/30 to-transparent rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              Why Choose Aromatic Impex?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-amber-400 rounded-full mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                icon: GlobeAltIcon,
                title: 'Global Sourcing',
                description: 'Direct partnerships with authentic spice origins worldwide for the finest quality.',
                image: '/homepage-global.jpg'
              },
              {
                icon: ScaleIcon,
                title: 'Multiple Grades',
                description: 'Various quality grades to meet specific business requirements and budgets.',
                image: '/homepage-grade-2.jpg'
              },
              {
                icon: TruckIcon,
                title: 'Reliable Supply',
                description: 'Consistent delivery and supply chain management for your business needs.',
                image: '/homepage-reliable-2.jpg'
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative h-48 w-full">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className={`group-hover:scale-110 transition-transform duration-300 ${
                      index === 1 ? 'object-contain' :                    
                      index === 2 ? 'object-fill' :      
                      'object-cover object-center'                        
                    }`}
                    />
                </div>
                <div className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-green-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality & Standards Section */}
      <section className="pt-24 pb-12 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              Quality & Standards
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-amber-400 rounded-full mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheckIcon,
                title: 'Quality Certifications',
                description: 'SFCR compliant facilities with CFIA registration, ensuring rigorous quality control processes.',
                features: ['SFCR Compliant & CFIA Registered', 'HACCP Compliant', 'FDA Registered']
              },
              {
                icon: GlobeAltIcon,
                title: 'Global Network',
                description: 'Established partnerships with premium growers and suppliers across 50+ countries worldwide.',
                features: ['Direct Farm Partnerships', '50+ Source Countries', 'Sustainable Sourcing']
              },
              {
                icon: TruckIcon,
                title: 'Supply Chain Excellence',
                description: 'Reliable logistics and inventory management ensuring consistent supply and on-time delivery.',
                features: ['Cold Chain Storage', '99.8% On-Time Delivery', '24/7 Tracking']
              }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{item.description}</p>
                <div className="space-y-2">
                  {item.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckIcon className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-24 bg-gradient-to-br from-green-50/30 to-amber-50/30 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-800">
                Premium Spices from Around the World
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Discover our extensive collection of authentic spices sourced from the finest growers across 50+ countries. 
                From aromatic cardamom to fiery chilies, we bring you the world's best flavors.
              </p>
              <div className="space-y-4">
                {[
                  'Direct sourcing from origin countries',
                  'Stringent quality control processes',
                  'Multiple grades for different needs',
                  'Competitive wholesale pricing'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
              <Link href="/products">
                <button className="my-12 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                  Explore Our Spices
                </button>
              </Link>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-40 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="/homepage-turmeric-powder.jpg"
                      alt="Turmeric powder"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg">
                  <Image
  src="/homepage-cinnamon.avif"
  alt="Cinnamon sticks"
  fill
  className="object-cover"
/>
</div>
</div>
<div className="space-y-4 pt-8">
  <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg">
    <Image
      src="/homepage-spices.jpg"
      alt="Mixed spices"
      fill
      className="object-cover"
    />
  </div>
  <div className="relative h-40 rounded-2xl overflow-hidden shadow-lg">
    <Image
      src="/homepage-cardamom.webp"
      alt="Cardamom pods"
      fill
      className="object-cover"
    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto mt-6 mb-24 bg-gradient-to-br from-green-600 via-green-700 to-emerald-700 text-white rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-8">Ready to Transform Your Business?</h3>
                <p className="text-xl mb-10 leading-relaxed max-w-5xl mx-auto">
                Join hundreds of satisfied clients who trust Aromatic Impex for their premium spice needs. 
                Get started with a custom quote today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/quote-request">
              <button className="group bg-white text-green-700 px-12 py-5 rounded-2xl font-semibold hover:bg-slate-50 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform flex items-center space-x-2">
                <span>Get Your Quote</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
                  <Link href="/contact">
                  <button className="group border-2 border-white text-white px-12 py-5 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300 text-lg backdrop-blur-sm">
                  <span>Contact Us Today</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
      <Footer />
    </div>
  );
}