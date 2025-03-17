// Error types
export const ERROR_TYPES = {
  VALIDATION: 'VALIDATION_ERROR',
  API: 'API_ERROR',
  NETWORK: 'NETWORK_ERROR',
  AUTH: 'AUTH_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
};

// Error messages in both languages
export const ERROR_MESSAGES = {
  [ERROR_TYPES.VALIDATION]: {
    en: 'Please check your input and try again',
    hi: 'कृपया अपना इनपुट जांचें और पुनः प्रयास करें'
  },
  [ERROR_TYPES.API]: {
    en: 'Server error occurred. Please try again later',
    hi: 'सर्वर त्रुटि हुई। कृपया बाद में पुनः प्रयास करें'
  },
  [ERROR_TYPES.NETWORK]: {
    en: 'Network error. Please check your connection',
    hi: 'नेटवर्क त्रुटि। कृपया अपना कनेक्शन जांचें'
  },
  [ERROR_TYPES.AUTH]: {
    en: 'Authentication error. Please login again',
    hi: 'प्रमाणीकरण त्रुटि। कृपया फिर से लॉगिन करें'
  },
  [ERROR_TYPES.UNKNOWN]: {
    en: 'An unexpected error occurred',
    hi: 'एक अनपेक्षित त्रुटि हुई'
  }
};

// Helper to determine error type
export const getErrorType = (error) => {
  if (!error) return ERROR_TYPES.UNKNOWN;
  
  if (error.response) {
    const status = error.response.status;
    if (status === 401 || status === 403) return ERROR_TYPES.AUTH;
    if (status >= 400 && status < 500) return ERROR_TYPES.VALIDATION;
    if (status >= 500) return ERROR_TYPES.API;
  }
  
  if (error.message && error.message.includes('Network')) {
    return ERROR_TYPES.NETWORK;
  }
  
  return ERROR_TYPES.UNKNOWN;
};

// Main error handler
export const handleError = (error, language = 'en') => {
  const errorType = getErrorType(error);
  
  // Log error for debugging
  console.error('Error occurred:', {
    type: errorType,
    message: error.message,
    response: error.response?.data,
    stack: error.stack
  });
  
  // Get user-friendly message
  const message = ERROR_MESSAGES[errorType][language] || ERROR_MESSAGES[ERROR_TYPES.UNKNOWN][language];
  
  // Return structured error info
  return {
    type: errorType,
    message,
    originalError: error
  };
};
