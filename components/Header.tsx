'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ClockIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  showHRLink?: boolean;
  onLogoClick?: () => void;
  clickCount?: number;
}

const Header: React.FC<HeaderProps> = ({ 
  showHRLink = false, 
  onLogoClick, 
  clickCount = 0 
}) => {
  return (
    <header className="backdrop-blur-md bg-white/80 border-b border-slate-200/60 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative cursor-pointer" onClick={onLogoClick}>
            <Image
              src="https://www.aromaticimpex.com/Logo.png"
              alt="Aromatic Impex Logo"
              width={104}
              height={104}
              className="hover:scale-105 transition-transform duration-200"
            />
            {clickCount > 0 && clickCount < 5 && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {clickCount}
                </span>
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Aromatic Impex Inc.
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Premium Spices • Trusted Across North America
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          <Link
            href="/"
            className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200 font-medium"
          >
            Home
          </Link>
          <a
            href="/#about"
            className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200 font-medium"
          >
            About
          </a>
          <a
            href="/#products"
            className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200 font-medium"
          >
            Products
          </a>
          <a
            href="/#contact"
            className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200 font-medium"
          >
            Contact
          </a>
          <Link
            href="/QuoteRequest"
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 rounded-xl transition-all duration-200 font-medium shadow-md hover:shadow-lg"
          >
            Get Quote
          </Link>
          {showHRLink && (
            <Link
              href="/internal/hr-system"
              className="px-4 py-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-xl transition-all duration-200 font-medium border border-green-200 animate-pulse"
            >
              <ClockIcon className="w-4 h-4 inline mr-2" />
              Staff Portal
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Link
            href="/QuoteRequest"
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 rounded-xl transition-all duration-200 font-medium shadow-md hover:shadow-lg text-sm"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
