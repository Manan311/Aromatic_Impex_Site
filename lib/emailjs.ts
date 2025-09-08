import emailjs from '@emailjs/browser';

const EMAILJS_CONFIG = {
  serviceID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateID: {
    quote: process.env.NEXT_PUBLIC_EMAILJS_QUOTE_TEMPLATE_ID || '',
    contact: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || '',
    notification: process.env.NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID || ''
  },
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
};

export const initEmailJS = () => {
  if (EMAILJS_CONFIG.publicKey) {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }
};

export interface QuoteEmailData {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  spiceTypes: string;
  quantity: string;
  message?: string;
  submissionDate: string;
  submissionTime: string;
}

export const sendQuoteEmail = async (data: QuoteEmailData): Promise<{ success: boolean; error?: string }> => {
  if (!EMAILJS_CONFIG.serviceID || !EMAILJS_CONFIG.publicKey) {
    console.warn('EmailJS not configured - skipping email send');
    return { success: true }; // Return success to not break the flow
  }

  try {
    const customerEmailParams = {
      to_email: data.email,
      to_name: data.contactName,
      company_name: data.companyName,
      contact_name: data.contactName,
      spice_types: data.spiceTypes,
      quantity: data.quantity,
      message: data.message || 'No additional message',
      submission_date: data.submissionDate,
      submission_time: data.submissionTime,
      reply_to: 'info@aromaticimpex.com'
    };

    await emailjs.send(
      EMAILJS_CONFIG.serviceID,
      EMAILJS_CONFIG.templateID.quote,
      customerEmailParams
    );

    return { success: true };
  } catch (error) {
    console.error('EmailJS Quote Error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send email' 
    };
  }
};

export const getCurrentDateTime = () => {
  const now = new Date();
  return {
    date: now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    time: now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    })
  };
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
