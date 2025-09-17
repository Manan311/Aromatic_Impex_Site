'use client';

import { useState } from 'react';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header 
        showHRLink={showHRLink}
        onLogoClick={handleLogoClick}
        clickCount={clickCount}
      />
      
      <section className="py-32 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-8">
            Contact Us
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            Get in touch for bulk orders, inquiries, and premium spice requirements.
          </p>
          <div className="max-w-2xl mx-auto text-left bg-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
            <p className="mb-2"><strong>Address:</strong> Unit 1 - 20 Newkirk Court, Brampton, ON, L6R 3R3</p>
            <p className="mb-2"><strong>Email:</strong> info@aromaticimpex.com</p>
            <p><strong>Service Area:</strong> North America</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
