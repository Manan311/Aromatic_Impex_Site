'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GlobeAltIcon,
  ScaleIcon,
  CubeIcon,
  CheckIcon,
  MapPinIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import SpiceCard from '@/components/SpiceCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { initEmailJS } from '@/lib/emailjs';
import { 
  productCategories, 
  getFilteredProducts, 
  getCategories, 
  getCategoryNames, 
  getAllProducts 
} from '@/data/products';

export default function HomePage() {
  const [clickCount, setClickCount] = useState(0);
  const [showHRLink, setShowHRLink] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Use centralized data
  const categories = getCategories();

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

      {/* Hero Section */}
      <section id="home" className="relative py-32 px-6 overflow-hidden">
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

            <h2 className="text-7xl lg:text-8xl font-bold bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-8 leading-tight">
              Aromatic Impex Inc.
            </h2>

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
              wholesale and bulk spice imports for businesses globally.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:scale-105 flex items-center space-x-2">
                <a href="#products">
                  <span>View Product Catalog</span>
                </a>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link href="/QuoteRequest">
                <button className="group border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-2xl font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 text-lg backdrop-blur-sm bg-white/60">
                  Request Quote
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-slate-50 via-white to-green-50/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-100/30 to-transparent rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60 rounded-full px-6 py-3 mb-8">
                <span className="text-sm font-semibold text-green-700">Our Story</span>
              </div>
              <h3 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 bg-clip-text text-transparent mb-6 tracking-tight">
                ABOUT US
              </h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
              <div className="space-y-8">
                <div className="relative">
                  <h4 className="text-3xl font-bold text-slate-800 mb-6">
                    Welcome to the Future of Spice Distribution
                  </h4>
                  <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-amber-400 rounded-full mb-8"></div>
                </div>

                <div className="space-y-6">
                  <p className="text-xl text-slate-600 leading-relaxed font-medium">
                    Welcome to <span className="font-bold text-green-700">Aromatic Impex Inc.</span>, 
                    your trusted partner for importing the finest quality spices from around the world.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    At Aromatic Impex Inc., our mission is to bring the world's most vibrant and authentic 
                    flavors to kitchens across the globe. From the fiery kick of chili to the earthy warmth 
                    of turmeric and the aromatic sweetness of cardamom, we ensure that every spice we deliver 
                    reflects its true essence and origin.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Our commitment to quality begins with selecting premium growers and suppliers who share 
                    our passion for excellence. With stringent quality checks, eco-friendly practices and 
                    a focus on freshness. We ensure that every product meets the highest standards.
                    Whether you're looking for essential spices or specialty blends, we have something to suit every need.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Whether you're a wholesaler or a business seeking reliable bulk spice imports, 
                    Aromatic Impex Inc. is your trusted partner for delivering authentic and premium-quality flavors.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Join us in celebrating the art of seasoning and the joy of creating unforgettable dishes. 
                    Let Aromatic Impex Inc. be your gateway to the vibrant world of spices.
                  </p>
                  <div className="bg-gradient-to-r from-green-50 to-amber-50 border border-green-200/50 rounded-2xl p-6">
                    <p className="text-lg text-slate-700 font-semibold leading-relaxed">
                      Discover the difference with Aromatic Impex Inc. – Where flavor meets authenticity.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-white via-white to-green-50/30 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-slate-200/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-100/50 to-transparent rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <h4 className="text-2xl font-bold text-slate-800 mb-8">Our Commitment</h4>
                  <div className="space-y-6">
                    {[
                      'Premium growers and suppliers who share our passion for excellence',
                      'Stringent quality checks and eco-friendly practices',
                      'Focus on freshness and highest standards',
                      'Essential spices and specialty blends for every need',
                      'Reliable bulk spice imports for businesses'
                    ].map((text, index) => (
                      <div key={index} className="group flex items-start space-x-4 hover:bg-green-50/50 p-3 rounded-2xl transition-all duration-300">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex-shrink-0 mt-1 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                          <CheckIcon className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-slate-600 leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-700 text-white rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <h4 className="text-4xl font-bold mb-8">Where Flavor Meets Authenticity</h4>
                <p className="text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
                  Join us in celebrating the art of seasoning and the joy of creating
                  unforgettable dishes. Let Aromatic Impex Inc. be your gateway to the
                  vibrant world of spices.
                </p>
                <button className="group bg-white text-green-700 px-12 py-5 rounded-2xl font-semibold hover:bg-slate-50 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform flex items-center space-x-2 mx-auto">
                  <a href="#contact">
                    <span>Contact Us Today</span>
                  </a>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60 rounded-full px-6 py-3 mb-8">
              <CubeIcon className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold text-green-700">Premium Collection</span>
            </div>

            <h3 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 bg-clip-text text-transparent mb-6 tracking-tight">
              SPICES
            </h3>
            <p className="text-2xl text-slate-600 font-medium mb-4">
              WHERE FLAVOR MEETS AUTHENTICITY!
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent to-amber-400 rounded-full"></div>
              <div className="w-8 h-1 bg-amber-400 rounded-full"></div>
              <div className="w-16 h-1 bg-gradient-to-l from-transparent to-amber-400 rounded-full"></div>
            </div>
          </div>

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
                  {category !== 'All' && (
                    <span className="ml-2 text-sm opacity-75">
                      ({productCategories[category]?.length || 0})
                    </span>
                  )}
                  {category === 'All' && (
                    <span className="ml-2 text-sm opacity-75">
                      ({getAllProducts().length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Category Info */}
            <div className="text-center mb-8">
              <p className="text-lg text-slate-600">
                {selectedCategory === 'All'
                  ? `Showing all ${getAllProducts().length} products across ${getCategoryNames().length} categories`
                  : `Showing ${getFilteredProducts(selectedCategory).length} products in ${selectedCategory}`
                }
              </p>
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
          <div className="text-center mb-12">
            <Link href="/QuoteRequest">
              <button className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:scale-105 flex items-center space-x-2 mx-auto">
                <span>Request Quote for Selected Products</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          {/* Business Features */}
          <div className="bg-gradient-to-br from-white via-white to-green-50/30 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-slate-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100/50 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h4 className="text-4xl font-bold text-center bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-12">
                Wholesale & Bulk Distribution
              </h4>
              <div className="grid md:grid-cols-3 gap-10">
                {[
                  {
                    icon: GlobeAltIcon,
                    title: 'Global Sourcing',
                    description: 'Direct partnerships with authentic spice origins worldwide'
                  },
                  {
                    icon: ScaleIcon,
                    title: 'Multiple Grades',
                    description: 'Various quality grades to meet specific business requirements'
                  },
                  {
                    icon: CubeIcon,
                    title: 'Bulk Quantities',
                    description: 'Competitive pricing for large volume commercial orders'
                  }
                ].map((feature, index) => (
                  <div key={index} className="group text-center hover:scale-105 transition-transform duration-300">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                        <feature.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-8 w-6 h-6 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h5 className="font-bold mb-4 text-xl text-slate-800 group-hover:text-green-700 transition-colors">
                      {feature.title}
                    </h5>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-white via-slate-50/50 to-green-50/30 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-green-200/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-gradient-to-br from-amber-200/20 to-transparent rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60 rounded-full px-6 py-3 mb-8">
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold text-green-700">Get In Touch</span>
            </div>

            <h3 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
              Let's talk with us...
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Reach out with inquiries — our team will respond promptly.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl"></div>
                <div className="relative text-white rounded-3xl p-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <h4 className="text-3xl font-bold">Contact Information</h4>
                  </div>

                  <div className="space-y-8">
                    {[
                      {
                        icon: MapPinIcon,
                        title: 'Address',
                        content: 'Unit 1 - 20 Newkirk Court, Brampton, ON, L6R 3R3'
                      },
                      {
                        icon: EnvelopeIcon,
                        title: 'Email',
                        content: 'info@aromaticimpex.com'
                      },
                      {
                        icon: GlobeAltIcon,
                        title: 'Service Area',
                        content: 'North America'
                      }
                    ].map((contact, index) => (
                      <div key={index} className="group flex items-start space-x-4 hover:scale-105 transition-transform duration-200">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                          <contact.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg mb-1">{contact.title}</p>
                          <p className="text-green-100 text-lg">{contact.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-3xl p-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <h4 className="text-3xl font-bold text-slate-800">Send us a Message</h4>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-sm font-semibold text-slate-700 mb-3">First Name *</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 group-hover:border-slate-300"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Last Name *</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 group-hover:border-slate-300"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Company Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 group-hover:border-slate-300"
                        placeholder="Enter your company name"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Email Address *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 group-hover:border-slate-300"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 group-hover:border-slate-300"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Message *</label>
                      <textarea
                        required
                        rows={6}
                        className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 group-hover:border-slate-300 resize-none"
                        placeholder="Tell us about your spice requirements..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="group w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <span>Send Message</span>
                      <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
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
