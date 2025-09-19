'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

interface HeaderProps {
  showHRLink?: boolean;
  onLogoClick?: () => void;
  clickCount?: number;
}

export default function Header({ showHRLink = false, onLogoClick, clickCount = 0 }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/', current: pathname === '/' },
    { name: 'About', href: '/about', current: pathname === '/about' },
    { name: 'Products', href: '/products', current: pathname === '/products' },
    { name: 'Contact', href: '/contact', current: pathname === '/contact' },
  ];

  // Close mobile menu when route changes
  const handleMobileNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 cursor-pointer group" onClick={onLogoClick}>
            {/* <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"> */}
            <Image
                src="/Logo.2cf055fa029b9a6c0e4e.png"
                alt="Aromatic Impex Logo"
                width={100}
                height={120}
                className="object-contain"
              />            
              {/* </div> */}
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                Aromatic Impex Inc.
              </h1>
              <p className="text-sm text-slate-500 leading-none">Premium Spice Importer</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                  item.current
                    ? 'bg-green-50 text-green-700 shadow-sm'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-green-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {showHRLink && (
              <Link href="/hr" className="px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors animate-pulse">
                HR Portal
              </Link>
            )}
            <Link href="/quote-request" className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2">
              <span>Get Quote</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-slate-700" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-slate-200/60">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleMobileNavClick}
                  className={`block px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    item.current
                      ? 'bg-green-50 text-green-700 shadow-sm'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-green-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                {showHRLink && (
                  <Link href="/hr" onClick={handleMobileNavClick} className="block w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors animate-pulse">
                    HR Portal
                  </Link>
                )}
                <Link href="/quote-request" onClick={handleMobileNavClick} className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="flex items-center justify-center space-x-2">
                    <span>Get Quote</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Debug info (only visible during development) */}
      {process.env.NODE_ENV === 'development' && clickCount > 0 && (
        <div className="bg-yellow-100 text-yellow-800 text-xs px-4 py-1 text-center">
          Logo clicks: {clickCount}/5 for HR link
        </div>
      )}
    </header>
  );
}