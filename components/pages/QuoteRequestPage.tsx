'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CubeIcon,
  CheckIcon,
  UserIcon,
  PlusIcon,
  PaperAirplaneIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createInitialSpices, getProductCategory, getProductMinimumRequirements, type SpiceProduct } from '@/data/products';
import { sendQuoteRequestEmail, getCurrentDateTime, initEmailJS, type QuoteRequestEmailData } from '@/lib/emailjs';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(30);
  
  // Individual field error states for real-time validation
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  // Use centralized product data with category information
  const initialSpices = createInitialSpices();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    spices: initialSpices, // Already includes category information from createInitialSpices()
    otherProducts: '',
    packaging: [],
    additionalComments: ''
  });

  useEffect(() => {
    initEmailJS();
  }, []);

  // Countdown effect for success modal
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (showSuccess && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      handleCloseModal();
    }

    return () => clearInterval(interval);
  }, [showSuccess, countdown]);

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

  // Enhanced phone number validation (same as ContactPage)
  const validatePhoneNumber = (phone: string): string => {
    if (!phone.trim()) return ''; // Phone is optional
    
    // Remove all non-digit characters except + at the beginning
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    
    // Check for valid patterns
    const phonePatterns = [
      /^\+1[2-9]\d{2}[2-9]\d{2}\d{4}$/, // +1XXXXXXXXXX (US/Canada)
      /^[2-9]\d{2}[2-9]\d{2}\d{4}$/, // XXXXXXXXXX (US/Canada without +1)
      /^\+\d{10,15}$/, // International format +XXXXXXXXXXX
      /^\d{10}$/, // 10 digit US/Canada
    ];
    
    const isValid = phonePatterns.some(pattern => pattern.test(cleanPhone));
    
    if (!isValid) {
      return 'Please enter a valid phone number (e.g., +1234567890, 123-456-7890, or (123) 456-7890)';
    }
    
    return '';
  };

  // Enhanced email validation
  const validateEmail = (email: string): string => {
    if (!email.trim()) return '';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address (e.g., user@example.com)';
    }
    return '';
  };

  // Enhanced country validation
  const validateCountry = (country: string): string => {
    if (!country.trim()) return '';
    
    const isValid = validCountries.some(validCountry => 
      validCountry.toLowerCase() === country.toLowerCase()
    );
    if (!isValid) {
      return 'Please enter a valid country name (Canada or United States)';
    }
    return '';
  };

  // Handle phone number change with real-time validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, phone: value });
    
    // Clear error when user starts typing
    if (phoneError) {
      setPhoneError('');
    }
    
    // Validate on blur or if there's content
    if (value.trim()) {
      const error = validatePhoneNumber(value);
      setPhoneError(error);
    }
  };

  // Handle email change with real-time validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    
    // Clear error when user starts typing
    if (emailError) {
      setEmailError('');
    }
    
    // Validate on blur or if there's content
    if (value.trim()) {
      const error = validateEmail(value);
      setEmailError(error);
    }
  };

  // Handle country change with real-time validation
  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, country: value });
    
    // Clear error when user starts typing
    if (countryError) {
      setCountryError('');
    }
    
    // Validate on blur or if there's content
    if (value.trim()) {
      const error = validateCountry(value);
      setCountryError(error);
    }
  };

  // Function to extract numeric value from quantity string (handles both kg and cases)
  const extractQuantityValue = (quantityStr: string, productName: string): number => {
    if (!quantityStr) return 0;
    
    const cleanStr = quantityStr.toLowerCase().replace(/[^\d.,]/g, '');
    const numericValue = parseFloat(cleanStr.replace(',', ''));
    
    if (isNaN(numericValue)) return 0;
    
    const { unit } = getProductMinimumRequirements(productName);
    
    if (unit === 'cases') {
      // For beverages, return the number as cases
      return numericValue;
    } else {
      // For regular products, handle kg conversion
      const lowerQuantity = quantityStr.toLowerCase();
      
      if (lowerQuantity.includes('t') || lowerQuantity.includes('ton')) {
        return numericValue * 1000;
      } else if (lowerQuantity.includes('g') && !lowerQuantity.includes('kg')) {
        return numericValue / 1000;
      } else if (lowerQuantity.includes('lb') || lowerQuantity.includes('pound')) {
        return numericValue * 0.453592;
      }
      
      return numericValue;
    }
  };

  // Validate minimum quantities with product-specific requirements
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
        const quantityValue = extractQuantityValue(spice.quantity, spice.name);
        const { min, unit } = getProductMinimumRequirements(spice.name);
        
        if (quantityValue < min) {
          errors.push(`${spice.name}: Minimum order quantity is ${min} ${unit} (Current: ${quantityValue} ${unit}).`);
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
      const quantityValue = extractQuantityValue(value as string, updatedSpices[index].name);
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
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
    setCountdown(30);
    router.push('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields on submit
    const emailValidationError = validateEmail(formData.email);
    const phoneValidationError = validatePhoneNumber(formData.phone);
    const countryValidationError = validateCountry(formData.country);
    const quantityErrors = validateQuantities();

    // Set individual field errors
    setEmailError(emailValidationError);
    setPhoneError(phoneValidationError);
    setCountryError(countryValidationError);

    // Check for any errors
    if (emailValidationError || phoneValidationError || countryValidationError || quantityErrors.length > 0) {
      setShowValidationErrors(true);
      setValidationErrors({
        email: emailValidationError || undefined,
        phone: phoneValidationError || undefined,
        country: countryValidationError || undefined,
        quantities: quantityErrors.length > 0 ? quantityErrors : undefined
      });
      window.scrollTo(0, 0);
      return;
    }

    setIsSubmitting(true);
    setShowValidationErrors(false);

    try {
      // Prepare selected products data
      const selectedProducts = formData.spices
        .filter(spice => spice.selected && spice.quantity.trim())
        .map(spice => {
          const { unit } = getProductMinimumRequirements(spice.name);
          const quantity = extractQuantityValue(spice.quantity, spice.name);
          
          return {
            name: spice.name,
            quantity: spice.quantity,
            quantityInKg: unit === 'cases' ? quantity : quantity, // Keep consistent for email template
            actualUnit: unit,
            actualQuantity: quantity
          };
        });

      const { date, time } = getCurrentDateTime();
      
      const quoteRequestData: QuoteRequestEmailData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone.trim() || undefined,
        country: formData.country,
        selectedProducts,
        otherProducts: formData.otherProducts.trim() || undefined,
        packaging: formData.packaging,
        additionalComments: formData.additionalComments.trim() || undefined,
        submissionDate: date,
        submissionTime: time
      };

      // Send email using EmailJS
      const result = await sendQuoteRequestEmail(quoteRequestData);

      if (result.success) {
        console.log('Quote request email sent successfully');
        
        // Reset form and state
        setFormData({
          firstName: '',
          lastName: '',
          companyName: '',
          email: '',
          phone: '',
          country: '',
          spices: initialSpices, // Already includes category information from createInitialSpices()
          otherProducts: '',
          packaging: [],
          additionalComments: ''
        });
        setValidationErrors({});
        setPhoneError('');
        setEmailError('');
        setCountryError('');
        setShowValidationErrors(false);
        
        // Show thank you modal
        setShowSuccess(true);
        setCountdown(30);
        
      } else {
        throw new Error(result.error || 'Failed to send quote request');
      }
      
    } catch (error) {
      console.error('Failed to send quote request:', error);
      alert('Failed to send quote request. Please try again or contact us directly at info@aromaticimpex.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessMessage = () => {
    setShowSuccess(false);
    setCountdown(30);
    router.push('/');
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
              Fill out the form below with your bulk requirements. Products have minimum order quantities: <span className="font-bold text-green-600">1000kg for spices</span>
            </p>
            <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-semibold text-amber-700">Different minimum quantities apply per product type</span>
            </div>
          </div>

          {/* Validation Errors Banner */}
          {showValidationErrors && (emailError || phoneError || countryError || validationErrors.quantities) && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
              <div className="flex items-center mb-4">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold text-red-800">Please fix the following issues:</h3>
              </div>
              <ul className="list-disc list-inside space-y-2">
                {emailError && <li className="text-red-700">{emailError}</li>}
                {phoneError && <li className="text-red-700">{phoneError}</li>}
                {countryError && <li className="text-red-700">{countryError}</li>}
                {validationErrors.quantities?.map((error, index) => (
                  <li key={index} className="text-red-700">{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-3xl p-10 shadow-2xl">
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-slate-300 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed" 
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-slate-300 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed" 
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-slate-300 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed" 
                    placeholder="Enter your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-3">Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={handleEmailChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-4 text-black bg-slate-50/50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-slate-300 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed ${
                      emailError ? 'border-red-300 bg-red-50/50' : 'border-slate-200'
                    }`}
                    placeholder="Enter your email address (e.g., user@example.com)"
                  />
                  {emailError && (
                    <p className="text-red-600 text-xs mt-2">{emailError}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-3">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-4 text-black bg-slate-50/50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-slate-300 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed ${
                      phoneError ? 'border-red-300 bg-red-50/50' : 'border-slate-200'
                    }`}
                    placeholder="Enter your phone number (e.g., +1 234-567-8900)"
                  />
                  {phoneError && (
                    <p className="text-red-600 text-xs mt-2">{phoneError}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-3">Country *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.country}
                    onChange={handleCountryChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-4 text-black bg-slate-50/50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-slate-300 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed ${
                      countryError ? 'border-red-300 bg-red-50/50' : 'border-slate-200'
                    }`}
                    placeholder="Enter your country (e.g., Canada, United States)"
                    list="countries"
                  />
                  <datalist id="countries">
                    {validCountries.map(country => (
                      <option key={country} value={country} />
                    ))}
                  </datalist>
                  {countryError && (
                    <p className="text-red-600 text-xs mt-2">{countryError}</p>
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
              Select products and specify quantities. Please note that minimum order quantities vary by product.                <br />
                <span className="text-sm text-green-600 font-medium">Tip: Enter a quantity and the product will be automatically selected!</span>
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {formData.spices.map((spice, index) => {
                  const { min, unit } = getProductMinimumRequirements(spice.name);
                  
                  // Create more specific placeholders for beverages
                  let placeholder;
                  if (spice.name === 'Jivraj 9 Tea' || spice.name === 'Cow Ghee') {
                    placeholder = `Min: ${min} cases (e.g., 60 cases, 100 cases)`;
                  } else if (unit === 'cases') {
                    placeholder = `Min: ${min} cases (e.g., 200 cases, 300 cases)`;
                  } else {
                    placeholder = `Min: ${min}kg (e.g., 1500kg, 2t, 2000kg)`;
                  }
                  
                  return (
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
                            disabled={isSubmitting}
                            className="w-4 h-4 accent-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 hover:border-green-400 transition-colors duration-200 disabled:opacity-50"
                          />
                          <span className="ml-2 font-semibold text-black text-sm">
                            {spice.name}
                            {unit === 'cases' && <span className="text-blue-600 text-xs ml-1">(Cases)</span>}
                          </span>
                        </label>
                      </div>
                      <input 
                        type="text" 
                        placeholder={placeholder}
                        value={spice.quantity}
                        onChange={(e) => handleSpiceChange(index, 'quantity', e.target.value)}
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 text-sm text-black bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300 hover:bg-green-50/30 disabled:opacity-50"
                      />
                      {spice.selected && spice.quantity && (
                        <div className="mt-2 text-xs">
                          <span className={`font-medium ${
                            extractQuantityValue(spice.quantity, spice.name) >= min 
                              ? 'text-green-600' 
                              : 'text-red-600'
                          }`}>
                            {extractQuantityValue(spice.quantity, spice.name)} {unit}
                            {extractQuantityValue(spice.quantity, spice.name) < min ? 
                              (unit === 'cases' ? ' (Below minimum cases)' : ' (Below minimum)') : 
                              ' ✓'
                            }
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
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
                  <label className="block text-sm font-semibold text-black mb-3">Other Products</label>
                  <textarea 
                    rows={4} 
                    value={formData.otherProducts}
                    onChange={(e) => handleInputChange('otherProducts', e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none hover:border-slate-300 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed" 
                    placeholder="List any other spices or products with quantities."
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
                          disabled={isSubmitting}
                          className="w-4 h-4 accent-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 hover:border-green-400 transition-colors duration-200 disabled:opacity-50"
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none hover:border-slate-300 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed" 
                    placeholder="Please provide any additional details about your requirements, certifications needed, delivery address, quality specifications, or any special requests..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button 
                type="submit" 
                disabled={isSubmitting || emailError || phoneError || countryError ? true : false}
                className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 py-5 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:scale-105 flex items-center space-x-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Quote Request</span>
                    <PaperAirplaneIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              <p className="text-black text-sm mt-4">We'll get back to you within 24 hours with a detailed wholesale quote.</p>
            </div>
          </form>
        </div>
      </main>

      {/* Success Message Modal - Same as ContactPage */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            {/* Close Button */}
            <button
              onClick={closeSuccessMessage}
              className="absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
            >
              <XMarkIcon className="w-4 h-4 text-slate-600" />
            </button>

            {/* Success Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-8 h-8 text-white" />
            </div>

            {/* Thank You Message */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Quote Request Submitted!
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Thank you for your wholesale quote request. Our team will review your requirements and get back to you within 24 hours with a detailed quote.
              </p>

              {/* Countdown */}
              <div className="text-sm text-slate-500 mb-6">
                Redirecting to homepage in {countdown} seconds...
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={closeSuccessMessage}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                >
                  Go to Homepage
                </button>
                <Link href="/products" className="flex-1">
                  <button className="w-full border-2 border-green-600 text-green-600 py-3 px-6 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300">
                    View Products
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default QuoteRequestPage;