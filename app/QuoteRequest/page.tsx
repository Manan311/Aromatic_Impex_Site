'use client';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Request Quote - Aromatic Impex Inc.',
//   description: 'Get a personalized quote for premium quality spices for wholesale and bulk distribution.',
// };

import React, { useState } from 'react';
import Image from 'next/image';
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
  UserIcon,
  PlusIcon,
  PaperAirplaneIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

interface SpiceProduct {
  name: string;
  selected: boolean;
  quantity: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  spices: SpiceProduct[];
  otherProducts: string;
  qualityGrade: string;
  deliveryTimeline: string;
  packaging: string[];
  additionalComments: string;
}

const QuoteRequestPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'form'>('landing');
  const [showSuccess, setShowSuccess] = useState(false);

  const initialSpices: SpiceProduct[] = [
    { name: 'Cumin', selected: false, quantity: '' },
    { name: 'Green Cardamom', selected: false, quantity: '' },
    { name: 'Fennel', selected: false, quantity: '' },
    { name: 'Sesame', selected: false, quantity: '' },
    { name: 'Ajwain', selected: false, quantity: '' },
    { name: 'Fenugreek', selected: false, quantity: '' },
    { name: 'Coriander', selected: false, quantity: '' },
    { name: 'Chilli', selected: false, quantity: '' },
    { name: 'Turmeric', selected: false, quantity: '' },
    { name: 'Black Pepper', selected: false, quantity: '' },
    { name: 'Cloves', selected: false, quantity: '' },
    { name: 'Phool Makhana', selected: false, quantity: '' },
    { name: 'Cinnamon', selected: false, quantity: '' },
    { name: 'Star Anise', selected: false, quantity: '' },
    { name: 'Bay Leaf', selected: false, quantity: '' },
    { name: 'Kalonji (Black Seed)', selected: false, quantity: '' }
  ];

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    spices: initialSpices,
    otherProducts: '',
    qualityGrade: '',
    deliveryTimeline: '',
    packaging: [],
    additionalComments: ''
  });

  const packagingOptions = [
    'PP Bags', 
    'Custom Packaging',
    'Private Labeling'
  ];

  const handleSpiceChange = (index: number, field: 'selected' | 'quantity', value: boolean | string) => {
    const updatedSpices = [...formData.spices];
    if (field === 'selected') {
      updatedSpices[index].selected = value as boolean;
      if (!value) {
        updatedSpices[index].quantity = '';
      }
    } else {
      updatedSpices[index].quantity = value as string;
    }
    setFormData({ ...formData, spices: updatedSpices });
  };

  const handlePackagingChange = (option: string, checked: boolean) => {
    let updatedPackaging;
    if (checked) {
      updatedPackaging = [...formData.packaging, option];
    } else {
      updatedPackaging = formData.packaging.filter(item => item !== option);
    }
    setFormData({ ...formData, packaging: updatedPackaging });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    // In a real application, you would send the form data to your server here
    console.log('Form submitted:', formData);
  };

  const showQuoteForm = () => {
    setCurrentPage('form');
    window.scrollTo(0, 0);
  };

  const showLandingPage = () => {
    setCurrentPage('landing');
    window.scrollTo(0, 0);
  };

  const closeSuccessMessage = () => {
    setShowSuccess(false);
    showLandingPage();
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      phone: '',
      country: '',
      spices: initialSpices,
      otherProducts: '',
      qualityGrade: '',
      deliveryTimeline: '',
      packaging: [],
      additionalComments: ''
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/80 border-b border-slate-200/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src="https://www.aromaticimpex.com/Logo.png"
                alt="Aromatic Impex Logo"
                width={64}
                height={64}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Aromatic Impex Inc.
              </h1>
              <p className="text-sm text-slate-500 font-medium">Premium Spices • Trusted Across North America</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-1">
            <a href="/" className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200 font-medium">Home</a>
            <a href="/#products" className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200 font-medium">Products</a>
            <a href="/#about" className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200 font-medium">About</a>
            <a href="/#contact" className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200 font-medium">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Landing Page */}
        {currentPage === 'landing' && (
          <div className="max-w-4xl mx-auto text-center">
            {/* Background Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-green-400/20 to-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-yellow-300/20 to-amber-400/20 rounded-full blur-3xl animate-pulse"></div>
            
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60 rounded-full px-6 py-3 mb-8">
                <EnvelopeIcon className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-700">Request Quote</span>
              </div>

              {/* Title */}
              <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6 tracking-tight">
                Get Your Quote
              </h1>
              
              <p className="text-2xl text-slate-600 mb-6 font-medium leading-relaxed">
                Premium Quality Spices for 
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold"> Wholesale</span>
                &
                <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent font-bold"> Bulk Distribution</span>
              </p>

              <p className="text-xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed">
                Tell us about your spice requirements and get a personalized quote for premium-quality spices sourced from the finest growers worldwide.
              </p>

              {/* CTA Button */}
              <button 
                onClick={showQuoteForm}
                className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 py-5 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:scale-105 flex items-center space-x-2 mx-auto"
              >
                <span>Start Quote Request</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-8 mt-16">
                <div className="group text-center hover:scale-105 transition-transform duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                    <GlobeAltIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold mb-3 text-lg text-slate-800">Global Sourcing</h3>
                  <p className="text-slate-600">Direct partnerships with authentic spice origins worldwide</p>
                </div>
                
                <div className="group text-center hover:scale-105 transition-transform duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                    <CubeIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold mb-3 text-lg text-slate-800">Bulk Quantities</h3>
                  <p className="text-slate-600">Competitive pricing for large volume commercial orders</p>
                </div>
                
                <div className="group text-center hover:scale-105 transition-transform duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                    <CheckIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold mb-3 text-lg text-slate-800">Quality Assured</h3>
                  <p className="text-slate-600">Stringent quality checks and eco-friendly practices</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quote Form Page */}
        {currentPage === 'form' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <button 
                onClick={showLandingPage}
                className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 mb-6 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Back to Quote Request</span>
              </button>
              
              <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
                Quote Request Form
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Please fill out the form below with your requirements and we'll get back to you with a detailed quote.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-3xl p-10 shadow-2xl">
              {/* Contact Information */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <UserIcon className="w-6 h-6 text-green-600 mr-3" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">First Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200" 
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Last Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200" 
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Company Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      className="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200" 
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200" 
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Phone Number</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200" 
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Country *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200" 
                      placeholder="Enter your country"
                    />
                  </div>
                </div>
              </div>

              {/* Product Selection */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <CubeIcon className="w-6 h-6 text-green-600 mr-3" />
                  Product Selection
                </h3>
                <p className="text-slate-600 mb-6">Select the spices you're interested in and specify quantities:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {formData.spices.map((spice, index) => (
                    <div key={spice.name} className="bg-slate-50/50 border border-slate-200 rounded-2xl p-4 hover:bg-green-50/50 hover:border-green-200 transition-all duration-200 hover:scale-105">
                      <div className="flex items-center justify-between mb-3">
                        <label className="flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={spice.selected}
                            onChange={(e) => handleSpiceChange(index, 'selected', e.target.checked)}
                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                          />
                          <span className="ml-2 font-semibold text-slate-700">{spice.name}</span>
                        </label>
                      </div>
                      <input 
                        type="text" 
                        placeholder={`Quantity (e.g., ${Math.floor(Math.random() * 150) + 20} kg)`}
                        value={spice.quantity}
                        onChange={(e) => handleSpiceChange(index, 'quantity', e.target.value)}
                        disabled={!spice.selected}
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 disabled:bg-slate-100 disabled:text-slate-400"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Requirements */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <PlusIcon className="w-6 h-6 text-green-600 mr-3" />
                  Other Requirements
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Other Spices or Products (Please specify)</label>
                    <textarea 
                      rows={4} 
                      value={formData.otherProducts}
                      onChange={(e) => setFormData({...formData, otherProducts: e.target.value})}
                      className="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none" 
                      placeholder="List any other spices, blends, or products you need with quantities..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Packaging Requirements</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {packagingOptions.map((option) => (
                        <label key={option} className="flex items-center cursor-pointer bg-slate-50/50 border border-slate-200 rounded-2xl p-4 hover:bg-green-50/50 hover:border-green-200 transition-all duration-200">
                          <input 
                            type="checkbox" 
                            checked={formData.packaging.includes(option)}
                            onChange={(e) => handlePackagingChange(option, e.target.checked)}
                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                          />
                          <span className="ml-2 text-slate-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Additional Comments or Special Requirements</label>
                    <textarea 
                      rows={6} 
                      value={formData.additionalComments}
                      onChange={(e) => setFormData({...formData, additionalComments: e.target.value})}
                      className="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none" 
                      placeholder="Please provide any additional details about your requirements, certifications needed, delivery address, or any special requests..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button 
                  type="submit" 
                  className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 py-5 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:scale-105 flex items-center space-x-2 mx-auto"
                >
                  <span>Submit Quote Request</span>
                  <PaperAirplaneIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-slate-500 text-sm mt-4">We'll get back to you within 24 hours with a detailed quote.</p>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Success Message Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-12 max-w-md mx-4 text-center shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Quote Request Submitted!</h3>
            <p className="text-slate-600 mb-6">Thank you for your interest in our premium spices. We'll review your requirements and get back to you within 24 hours with a detailed quote.</p>
            <button 
              onClick={closeSuccessMessage}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 relative overflow-hidden mt-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="flex justify-center items-center mb-8">
            <div className="relative mr-4">
              <Image
                src="https://www.aromaticimpex.com/Logo.png"
                alt="Aromatic Impex Logo"
                width={48}
                height={48}
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Aromatic Impex Inc.
            </span>
          </div>

          <p className="text-slate-300 mb-6 text-lg max-w-2xl mx-auto leading-relaxed">
            Premium Quality Spices from Around the World • Built on Trust. Backed by Experience.
          </p>

          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-green-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-green-400 rounded-full"></div>
          </div>

          <p className="text-sm text-slate-400">
            © 2025 Aromatic Impex Inc. All rights reserved. • Where Flavor Meets Authenticity
          </p>
        </div>
      </footer>
    </div>
  );
};

export default QuoteRequestPage;