'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPinIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  PhoneIcon,
  ClockIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header 
        showHRLink={showHRLink}
        onLogoClick={handleLogoClick}
        clickCount={clickCount}
      />

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-br from-white via-slate-50/50 to-green-50/30 relative overflow-hidden">
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

                  <form onSubmit={handleSubmit} className="space-y-6">
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