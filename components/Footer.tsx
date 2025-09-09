'use client';

import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 relative overflow-hidden">
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

        <p className="text-slate-300 mb-6 text-lg max-w-3xl mx-auto leading-relaxed">
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
  );
};

export default Footer;
