'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  MapPinIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  PhoneIcon,
  ClockIcon,
  CubeIcon,
  CheckCircleIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { sendContactEmail, getCurrentDateTime, initEmailJS, type ContactEmailData } from '@/lib/emailjs';

export default function ContactPage() {
  const [clickCount, setClickCount] = useState(0);
  const [showHRLink, setShowHRLink] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [countdown, setCountdown] = useState(30);
  
  // Form validation states
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [message, setMessage] = useState('');
  const [characterCount, setCharacterCount] = useState(1000);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    initEmailJS();
  }, []);

  // Countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (showThankYou && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      handleCloseModal();
    }

    return () => clearInterval(interval);
  }, [showThankYou, countdown]);

  // Phone number validation
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

  // Handle phone number change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    
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

  // Handle message change with character count
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const maxLength = 1000;
    
    if (value.length <= maxLength) {
      setMessage(value);
      setCharacterCount(maxLength - value.length);
    } else {
      // Prevent typing beyond limit
      const truncatedValue = value.slice(0, maxLength);
      setMessage(truncatedValue);
      setCharacterCount(0);
    }
  };

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

  const handleCloseModal = () => {
    setShowThankYou(false);
    setCountdown(30);
    router.push('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;

    // Validate phone number if provided
    let phoneValidationError = '';
    if (phoneNumber.trim()) {
      phoneValidationError = validatePhoneNumber(phoneNumber);
    }

    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      setShowValidationErrors(true);
      return;
    }

    setIsSubmitting(true);
    setShowValidationErrors(false);

    try {
      // Get form data
      const formData = new FormData(formRef.current);
      const { date, time } = getCurrentDateTime();
      
      const contactData: ContactEmailData = {
        firstName: formData.get('first_name') as string,
        lastName: formData.get('last_name') as string,
        companyName: formData.get('company_name') as string,
        email: formData.get('email') as string,
        phone: phoneNumber.trim() || undefined,
        message: message,
        submissionDate: date,
        submissionTime: time
      };

      // Send email using EmailJS
      const result = await sendContactEmail(contactData);

      if (result.success) {
        console.log('Contact email sent successfully');
        
        // Reset form and state
        formRef.current.reset();
        setPhoneNumber('');
        setPhoneError('');
        setMessage('');
        setCharacterCount(1000);
        setShowValidationErrors(false);
        
        // Show thank you modal
        setShowThankYou(true);
        setCountdown(30);
        
      } else {
        throw new Error(result.error || 'Failed to send contact message');
      }
      
    } catch (error) {
      console.error('Failed to send contact message:', error);
      alert('Failed to send message. Please try again or contact us directly at info@aromaticimpex.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header 
        showHRLink={showHRLink}
        onLogoClick={handleLogoClick}
        clickCount={clickCount}
      />

      {/* Thank You Modal */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
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
                Thank You!
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Your message has been sent successfully. Someone from our team will be in touch with you shortly.
              </p>

              {/* Countdown */}
              <div className="text-sm text-slate-500 mb-6">
                Redirecting to homepage in {countdown} seconds...
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCloseModal}
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

                  {/* Validation Error Banner */}
                  {showValidationErrors && phoneError && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
                      <div className="flex items-center">
                        <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-2" />
                        <span className="text-red-700 text-sm font-medium">Please fix the following error:</span>
                      </div>
                      <p className="text-red-600 text-sm mt-1">{phoneError}</p>
                    </div>
                  )}

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-sm font-semibold text-slate-700 mb-3">First Name *</label>
                        <input
                          type="text"
                          name="first_name"
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 group-hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Last Name *</label>
                        <input
                          type="text"
                          name="last_name"
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 group-hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Company Name *</label>
                      <input
                        type="text"
                        name="company_name"
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 group-hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Enter your company name"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 group-hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        disabled={isSubmitting}
                        className={`w-full px-4 py-4 text-black bg-slate-50/50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 group-hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                          phoneError ? 'border-red-300 bg-red-50/50' : 'border-slate-200'
                        }`}
                        placeholder="Enter your phone number (e.g., +1 234-567-8900)"
                      />
                      {phoneError && (
                        <p className="text-red-600 text-xs mt-2">{phoneError}</p>
                      )}
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Message *</label>
                      <div className="relative">
                        <textarea
                          name="message"
                          required
                          rows={6}
                          value={message}
                          onChange={handleMessageChange}
                          disabled={isSubmitting}
                          className="w-full px-4 py-4 text-black bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 group-hover:border-slate-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Tell us about your spice requirements..."
                          maxLength={1000}
                        />
                        {/* Character Counter */}
                        <div className="absolute bottom-3 right-3 text-xs font-medium">
                          <span className={`${
                            characterCount < 50 ? 'text-red-500' : 
                            characterCount < 100 ? 'text-amber-500' : 
                            'text-slate-500'
                          }`}>
                            {characterCount} characters remaining
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !!phoneError}
                      className="group w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
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