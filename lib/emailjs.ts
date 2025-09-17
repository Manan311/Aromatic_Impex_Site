import emailjs from '@emailjs/browser';

const EMAILJS_CONFIG = {
  serviceID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateID: {
    quote: process.env.NEXT_PUBLIC_EMAILJS_QUOTE_TEMPLATE_ID || '',
    contact: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || '',
    quoteRequest: process.env.NEXT_PUBLIC_EMAILJS_QUOTE_TEMPLATE_ID || '', 
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

export interface ContactEmailData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone?: string;
  message: string;
  submissionDate: string;
  submissionTime: string;
}

export interface QuoteRequestEmailData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone?: string;
  country: string;
  selectedProducts: Array<{
    name: string;
    quantity: string;
    quantityInKg: number;
  }>;
  otherProducts?: string;
  packaging: string[];
  additionalComments?: string;
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

export const sendQuoteRequestEmail = async (data: QuoteRequestEmailData): Promise<{ success: boolean; error?: string }> => {
  if (!EMAILJS_CONFIG.serviceID || !EMAILJS_CONFIG.publicKey) {
    console.warn('EmailJS not configured - skipping email send');
    return { success: true }; // Return success to not break the flow
  }

  try {
    // Format selected products for email
    const productsList = data.selectedProducts.map(product => 
      `${product.name}: ${product.quantity} (${product.quantityInKg}kg)`
    ).join('\n');

    // Format packaging requirements
    const packagingList = data.packaging.length > 0 ? data.packaging.join(', ') : 'No specific packaging requirements';

    const quoteRequestParams = {
      to_name: `${data.firstName} ${data.lastName}`,
      first_name: data.firstName,
      last_name: data.lastName,
      company_name: data.companyName,
      contact_email: data.email,
      phone: data.phone || 'Not provided',
      country: data.country,
      selected_products: productsList,
      other_products: data.otherProducts || 'None specified',
      packaging_requirements: packagingList,
      additional_comments: data.additionalComments || 'No additional comments',
      submission_date: data.submissionDate,
      submission_time: data.submissionTime,
      reply_to: data.email
    };

    await emailjs.send(
      EMAILJS_CONFIG.serviceID,
      EMAILJS_CONFIG.templateID.quoteRequest,
      quoteRequestParams
    );

    return { success: true };
  } catch (error) {
    console.error('EmailJS Quote Request Error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send quote request' 
    };
  }
};

export const sendContactEmail = async (data: ContactEmailData): Promise<{ success: boolean; error?: string }> => {
  if (!EMAILJS_CONFIG.serviceID || !EMAILJS_CONFIG.publicKey) {
    console.warn('EmailJS not configured - skipping email send');
    return { success: true }; // Return success to not break the flow
  }

  try {
    const contactEmailParams = {
      // Remove to_email since it should be set in template
      to_name: `${data.firstName} ${data.lastName}`,
      first_name: data.firstName,
      last_name: data.lastName,
      company_name: data.companyName,
      contact_email: data.email,
      phone: data.phone || 'Not provided',
      message: data.message,
      submission_date: data.submissionDate,
      submission_time: data.submissionTime,
      reply_to: data.email  // Set reply-to to customer's email
    };

    await emailjs.send(
      EMAILJS_CONFIG.serviceID,
      EMAILJS_CONFIG.templateID.contact,
      contactEmailParams
    );

    return { success: true };
  } catch (error) {
    console.error('EmailJS Contact Error:', error);
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
