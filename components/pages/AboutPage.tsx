'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  HeartIcon,
  SparklesIcon,
  ShieldCheckIcon,
  UsersIcon,
  TruckIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
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

      {/* Enhanced Page Header with Background Image */}
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
              <span className="text-sm font-semibold text-slate-700">Our Story</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 bg-clip-text text-transparent mb-6 tracking-tight">
              ABOUT US
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Discover the story behind Aromatic Impex Inc. and our commitment to bringing 
              the world's finest spices to your business.
            </p>
          </div>
        </div>
      </section>

      {/* Main About Section - Enhanced Layout */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-green-50/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-100/30 to-transparent rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Company Story Section with Image */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
              <div className="space-y-8">
                <div className="relative">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6">
                    Our Founding Story
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-amber-400 rounded-full mb-8"></div>
                </div>

                <div className="space-y-6">
                  <p className="text-xl text-slate-600 leading-relaxed font-medium">
                    Aromatic Impex Inc. represents nearly two decades of expertise in the global spice industry, with operations beginning in India in 2005 as premium spice exporters.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Our journey started with establishing our own manufacturing facilities in India, ensuring complete quality control from processing to export. By 2009, we became dominant exporters to Gulf countries, building a reputation for excellence and reliability.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    With BRCS food safety certifications and two state-of-the-art manufacturing facilities, we expanded our operations to include importing from multiple countries, creating a comprehensive global supply network.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    In 2024, we launched Aromatic Impex Inc. in Canada as our dedicated North American wholesale distribution arm, bringing our decades of manufacturing expertise and global sourcing capabilities directly to the Canadian and U.S. markets.
                  </p>
                </div>
              </div>
              
              {/* Company Image */}
              <div className="relative">
                <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/about-facility.jpeg"
                    alt="Aromatic Impex spice collection"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent"></div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <SparklesIcon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <GlobeAltIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="mb-16">
              <div className="bg-gradient-to-br from-white via-white to-green-50/30 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-slate-200/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-100/50 to-transparent rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-slate-800 mb-4">Mission & Vision</h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-amber-400 rounded-full mx-auto"></div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-green-700 mb-3">Our Mission</h4>
                      <p className="text-slate-600 leading-relaxed">
                        To deliver authentic, premium-quality spices that enhance culinary experiences while building lasting partnerships based on trust, reliability, and shared success.
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-green-700 mb-3">Our Vision</h4>
                      <p className="text-slate-600 leading-relaxed">
                        To be North America's most trusted spice import partner, known for our unwavering commitment to quality, sustainability, and authentic flavors from around the world.
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-green-700 mb-3">Our Promise</h4>
                      <p className="text-slate-600 leading-relaxed">
                        Every spice we import undergoes rigorous quality testing and comes with our guarantee of authenticity, freshness, and consistent supply chain reliability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section - Added for credibility */}
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              {[
                { number: '20+', label: 'Years Experience', icon: StarIcon },
                { number: '50+', label: 'Countries Sourced', icon: GlobeAltIcon },
                { number: '200+', label: 'Spice Varieties', icon: TruckIcon },
                { number: '500+', label: 'Happy Clients', icon: UsersIcon },
              ].map((stat, index) => (
                <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-green-700 mb-2">{stat.number}</div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Sourcing Process Section with Visual Enhancements */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-slate-800 mb-4">Our Sourcing Process</h3>
                <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-amber-400 rounded-full mx-auto mb-6"></div>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  From farm to your business, we ensure quality at every step of our carefully managed supply chain.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    step: '01',
                    title: 'Origin Selection',
                    description: 'We identify the finest growing regions for each spice, focusing on climate, soil quality, and traditional cultivation methods.',
                    image: '/about-origin.jpg'
                  },
                  {
                    step: '02',
                    title: 'Farmer Partnerships',
                    description: 'We build direct relationships with growers who share our values of quality, sustainability, and fair trade practices.',
                    image: '/about-farmer.jpg'
                  },
                  {
                    step: '03',
                    title: 'Quality Testing',
                    description: 'Every batch undergoes comprehensive testing for purity, moisture content, flavor profile, and safety standards.',
                    image: '/about-qa.webp'
                  },
                  {
                    step: '04',
                    title: 'Careful Import',
                    description: 'We handle logistics with specialized storage and transportation to preserve freshness and quality during import.',
                    image: '/about-import.jpg'
                  }
                ].map((step, index) => (
                  <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative h-48">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm">{step.step}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-slate-800 mb-4">{step.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Values Section */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-slate-800 mb-4">Our Core Values</h3>
                <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-amber-400 rounded-full mx-auto"></div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: HeartIcon,
                    title: 'Quality First',
                    description: 'We never compromise on quality. Every spice is carefully selected and tested to meet our rigorous standards for authenticity and freshness.'
                  },
                  {
                    icon: GlobeAltIcon,
                    title: 'Global Reach',
                    description: 'Our network spans across continents, bringing you authentic spices from their countries of origin with direct partnerships worldwide.'
                  },
                  {
                    icon: ShieldCheckIcon,
                    title: 'Trust & Reliability',
                    description: 'Built on decades of experience, we deliver consistent quality and service you can depend on for your business needs.'
                  }
                ].map((value, index) => (
                  <div key={index} className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-green-700 transition-colors">{value.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Timeline Section */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-slate-800 mb-4">Our Journey</h3>
                <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-amber-400 rounded-full mx-auto mb-6"></div>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  From spice exporters in India to serving the North American wholesale market.
                </p>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-green-600 to-emerald-600 hidden md:block"></div>
                
                <div className="space-y-8">
                  {[
                    {
                      year: '2005',
                      title: 'Operations Begin',
                      description: 'Started operations in India by exporting premium quality spices to international markets'
                    },
                    {
                      year: '2006',
                      title: 'Manufacturing Facility',
                      description: 'Established our own state-of-the-art manufacturing facility to ensure quality control'
                    },
                    {
                      year: '2007',
                      title: 'Food Safety Certification',
                      description: 'Obtained BRCS food safety certificates, demonstrating our commitment to quality standards'
                    },
                    {
                      year: '2009',
                      title: 'Gulf Market Leadership',
                      description: 'Became a leading and dominant exporter to Gulf countries, establishing strong regional presence'
                    },
                    {
                      year: '2010',
                      title: 'Import Operations',
                      description: 'Expanded by importing spices from other countries to India, diversifying our supply chain'
                    },
                    {
                      year: '2015',
                      title: 'Second Facility',
                      description: 'Opened our second manufacturing facility to meet growing demand and expand capacity'
                    },
                    {
                      year: '2024',
                      title: 'North American Expansion',
                      description: 'Launched Aromatic Impex Inc. in Canada to better serve the North American wholesale market'
                    },
                  ].map((milestone, index) => (
                    <div key={index} className="flex items-start space-x-6 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10">
                        <span className="text-white font-bold text-sm">{milestone.year}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-slate-800 mb-2">{milestone.title}</h4>
                        <p className="text-slate-600 leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced CTA Section */}
            <div className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-700 text-white rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-8">Ready to Experience the Difference?</h3>
                <p className="text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
                  Discover why hundreds of businesses trust Aromatic Impex Inc. for their spice sourcing needs. 
                  Let's discuss how we can enhance your product offerings.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contact">
                    <button className="group bg-white text-green-700 px-12 py-5 rounded-2xl font-semibold hover:bg-slate-50 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform flex items-center space-x-2">
                      <span>Contact Us Today</span>
                      <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                  <Link href="/quote-request">
                    <button className="group border-2 border-white text-white px-12 py-5 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300 text-lg backdrop-blur-sm">
                      <span>Request a Quote</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}