'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CubeIcon,
  CheckIcon,
  UserIcon,
  PlusIcon,
  PaperAirplaneIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createInitialSpices, type SpiceProduct } from '@/data/products';

interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  spices: SpiceProduct[];
  otherProducts: string;
  packaging: string[];
  additionalComments: string;
}

interface ValidationErrors {
  email?: string;
  phone?: string;
  country?: string;
  quantities?: string[];
}

const QuoteRequestPage: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [realtimeErrors, setRealtimeErrors] = useState<ValidationErrors>({});

  // Use centralized product data
  const initialSpices = createInitialSpices();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    spices: initialSpices,
    otherProducts: '',
    packaging: [],
    additionalComments: ''
  });

  const packagingOptions = [
    'PP Bags', 
    'Custom Packaging',
    'Private Labeling'
  ];

  // Valid countries list (simplified)
  const validCountries = [
    'Canada', 
    'United States'
  ];

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Phone validation regex (supports various international formats)
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

  // Function to extract numeric value from quantity string
  const extractQuantityValue = (quantityStr: string): number => {
    if (!quantityStr) return 0;
    
    const cleanStr = quantityStr.toLowerCase().replace(/[^\d.,]/g, '');
    const numericValue = parseFloat(cleanStr.replace(',', ''));
    
    if (isNaN(numericValue)) return 0;
    
    const lowerQuantity = quantityStr.toLowerCase();
    
    if (lowerQuantity.includes('t') || lowerQuantity.includes('ton')) {
      return numericValue * 1000;
    } else if (lowerQuantity.includes('g') && !lowerQuantity.includes('kg')) {
      return numericValue / 1000;
    } else if (lowerQuantity.includes('lb') || lowerQuantity.includes('pound')) {
      return numericValue * 0.453592;
    }
    
    return numericValue;
  };

  // Validate email format
  const validateEmail = (email: string): string | null => {
    if (!email) return null;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address (e.g., user@example.com)';
    }
    return null;
  };

  // Validate phone format
  const validatePhone = (phone: string): string | null => {
    if (!phone) return null;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return 'Please enter a valid phone number (e.g., +1234567890 or 1234567890)';
    }
    return null;
  };

  // Validate country
  const validateCountry = (country: string): string | null => {
    if (!country) return null;
    const isValid = validCountries.some(validCountry => 
      validCountry.toLowerCase() === country.toLowerCase()
    );
    if (!isValid) {
      return 'Please enter a valid country name';
    }
    return null;
  };

  // Validate minimum quantities
  const validateQuantities = (): string[] => {
    const errors: string[] = [];
    const selectedSpices = formData.spices.filter(spice => spice.selected);
    
    if (selectedSpices.length === 0) {
      errors.push('Please select at least one product.');
    }
    
    selectedSpices.forEach(spice => {
      if (!spice.quantity.trim()) {
        errors.push(`Please specify quantity for ${spice.name}.`);
      } else {
        const quantityInKg = extractQuantityValue(spice.quantity);
        if (quantityInKg < 1000) {
          errors.push(`${spice.name}: Minimum order quantity is 1000kg (Current: ${quantityInKg}kg).`);
        }
      }
    });
    
    return errors;
  };

  const handleSpiceChange = (index: number, field: 'selected' | 'quantity', value: boolean | string) => {
    const updatedSpices = [...formData.spices];
    
    if (field === 'selected') {
      updatedSpices[index].selected = value as boolean;
      if (!value) {
        updatedSpices[index].quantity = '';
      }
    } else {
      updatedSpices[index].quantity = value as string;
      // Auto-check if quantity > 0
      const quantityValue = extractQuantityValue(value as string);
      if (quantityValue > 0) {
        updatedSpices[index].selected = true;
      } else {
        updatedSpices[index].selected = false;
      }
    }
    
    setFormData({ ...formData, spices: updatedSpices });
    
    // Clear validation errors when user makes changes
    if (validationErrors.quantities) {
      setValidationErrors({ ...validationErrors, quantities: undefined });
    }
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

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear specific validation errors when user types
    if (field === 'email' && validationErrors.email) {
      setValidationErrors({ ...validationErrors, email: undefined });
    }
    if (field === 'phone' && validationErrors.phone) {
      setValidationErrors({ ...validationErrors, phone: undefined });
    }
    if (field === 'country' && validationErrors.country) {
      setValidationErrors({ ...validationErrors, country: undefined });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: ValidationErrors = {};
    
    // Validate email
    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;
    
    // Validate phone
    const phoneError = validatePhone(formData.phone);
    if (phoneError) errors.phone = phoneError;
    
    // Validate country
    const countryError = validateCountry(formData.country);
    if (countryError) errors.country = countryError;
    
    // Validate quantities
    const quantityErrors = validateQuantities();
    if (quantityErrors.length > 0) errors.quantities = quantityErrors;
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      window.scrollTo(0, 0);
      return;
    }
    
    setShowSuccess(true);
    console.log('Form submitted:', formData);
  };

  const closeSuccessMessage = () => {
    setShowSuccess(false);
    setFormData({
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      phone: '',
      country: '',
      spices: initialSpices,
      otherProducts: '',
      packaging: [],
      additionalComments: ''
    });
    setValidationErrors({});
    setRealtimeErrors({});
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Link href="/" className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 mb-6 transition-colors">
              <ArrowLeftIcon className="w-4 h-4" />
              <span className="text-black">Back to Home</span>
            </Link>
            
            <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-black to-slate-800 bg-clip-text text-transparent mb-6">
              Wholesale Quote Request
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto mb-6">
              Fill out the form below with your bulk requirements. All products have a minimum order quantity of <span className="font-bold text-green-600">1000kg</span>.
            </p>
            <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-semibold text-amber-700">Minimum Order: 1000kg per product</span>
            </div>
          </div>

          {/* Validation Errors */}
          {(validationErrors.email || validationErrors.phone || validationErrors.country || validationErrors.quantities) && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
              <div className="flex items-center mb-4">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold text-red-800">Please fix the following issues:</h3>
              </div>
              <ul className="list-disc list-inside space-y-2">
                {validationErrors.email && <li className="text-red-700">{validationErrors.email}</li>}
                {validationErrors.phone && <li className="text-red-700">{validationErrors.phone}</li>}
                {validationErrors.country && <li className="text-red-700">{validationErrors.country}</li>}
                {validationErrors.quantities?.map((error, index) => (
                  <li key={index} className="text-red-700">{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-3xl p-10 shadow-2xl">
            {/* Contact Information */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-black mb-6 flex items-center">
                <UserIcon className="w-6 h-6 text-green-600 mr-3" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-3">First Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-slate-300 hover:bg-white" 
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-3">Last Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-slate-300 hover:bg-white" 
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-3">Company Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-slate-300 hover:bg-white" 
                    placeholder="Enter your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-3">Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-4 text-black bg-slate-50/50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-slate-300 hover:bg-white ${
                      validationErrors.email ? 'border-red-300 bg-red-50/50' : 'border-slate-200'
                    }`}
                    placeholder="Enter your email address (e.g., user@example.com)"
                  />
                  {validationErrors.email && (
                    <p className="text-red-600 text-sm mt-1">{validationErrors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-3">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-4 text-black bg-slate-50/50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-slate-300 hover:bg-white ${
                      validationErrors.phone ? 'border-red-300 bg-red-50/50' : 'border-slate-200'
                    }`}
                    placeholder="Enter your phone number (e.g., +1234567890)"
                  />
                  {validationErrors.phone && (
                    <p className="text-red-600 text-sm mt-1">{validationErrors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-3">Country *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className={`w-full px-4 py-4 text-black bg-slate-50/50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-slate-300 hover:bg-white ${
                      validationErrors.country ? 'border-red-300 bg-red-50/50' : 'border-slate-200'
                    }`}
                    placeholder="Enter your country (e.g., Canada, United States)"
                    list="countries"
                  />
                  <datalist id="countries">
                    {validCountries.map(country => (
                      <option key={country} value={country} />
                    ))}
                  </datalist>
                  {validationErrors.country && (
                    <p className="text-red-600 text-sm mt-1">{validationErrors.country}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Product Selection */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-black mb-6 flex items-center">
                <CubeIcon className="w-6 h-6 text-green-600 mr-3" />
                Product Selection
              </h3>
              <p className="text-black mb-6">
                Select products and specify quantities (minimum 1000kg per product). You can use units like: 1000kg, 1.5t, 2000 kg, etc.
                <br />
                <span className="text-sm text-green-600 font-medium">Tip: Enter a quantity and the product will be automatically selected!</span>
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {formData.spices.map((spice, index) => (
                  <div key={spice.name} className={`border rounded-2xl p-4 transition-all duration-200 hover:scale-105 hover:shadow-md ${
                    spice.selected 
                      ? 'bg-green-50/50 border-green-200 hover:bg-green-50' 
                      : 'bg-slate-50/50 border-slate-200 hover:bg-green-50/50 hover:border-green-200'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={spice.selected}
                          onChange={(e) => handleSpiceChange(index, 'selected', e.target.checked)}
                          className="w-4 h-4 accent-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 hover:border-green-400 transition-colors duration-200"
                        />
                        <span className="ml-2 font-semibold text-black text-sm">{spice.name}</span>
                      </label>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Min: 1000kg (e.g., 1500kg, 2t)"
                      value={spice.quantity}
                      onChange={(e) => handleSpiceChange(index, 'quantity', e.target.value)}
                      className="w-full px-3 py-2 text-sm text-black bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300 hover:bg-green-50/30"
                    />
                    {spice.selected && spice.quantity && (
                      <div className="mt-2 text-xs">
                        <span className={`font-medium ${
                          extractQuantityValue(spice.quantity) >= 1000 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {extractQuantityValue(spice.quantity)}kg 
                          {extractQuantityValue(spice.quantity) < 1000 ? ' (Below minimum)' : ' ✓'}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Requirements */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-black mb-6 flex items-center">
                <PlusIcon className="w-6 h-6 text-green-600 mr-3" />
                Additional Requirements
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-3">Other Products (minimum 1000kg each)</label>
                  <textarea 
                    rows={4} 
                    value={formData.otherProducts}
                    onChange={(e) => handleInputChange('otherProducts', e.target.value)}
                    className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none hover:border-slate-300 hover:bg-white" 
                    placeholder="List any other spices or products with quantities (e.g., Custom Spice Blend - 2000kg, Organic Turmeric - 1500kg)..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-3">Packaging Requirements</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {packagingOptions.map((option) => (
                      <label key={option} className="flex items-center cursor-pointer bg-slate-50/50 border border-slate-200 rounded-2xl p-4 hover:bg-green-50/50 hover:border-green-200 transition-all duration-200 hover:scale-105">
                        <input 
                          type="checkbox" 
                          checked={formData.packaging.includes(option)}
                          onChange={(e) => handlePackagingChange(option, e.target.checked)}
                          className="w-4 h-4 accent-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 hover:border-green-400 transition-colors duration-200"
                        />
                        <span className="ml-2 text-black">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-3">Additional Comments or Special Requirements</label>
                  <textarea 
                    rows={6} 
                    value={formData.additionalComments}
                    onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                    className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none hover:border-slate-300 hover:bg-white" 
                    placeholder="Please provide any additional details about your requirements, certifications needed, delivery address, quality specifications, or any special requests..."
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
              <p className="text-black text-sm mt-4">We'll get back to you within 24 hours with a detailed wholesale quote.</p>
            </div>
          </form>
        </div>
      </main>

      {/* Success Message Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-12 max-w-md mx-4 text-center shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-4">Wholesale Quote Request Submitted!</h3>
            <p className="text-black mb-6">Thank you for your bulk order inquiry. We'll review your requirements and get back to you within 24 hours with a detailed wholesale quote.</p>
            <button 
              onClick={closeSuccessMessage}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default QuoteRequestPage;