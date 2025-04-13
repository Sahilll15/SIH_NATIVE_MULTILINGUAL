/**
 * Utility functions for date formatting throughout the application
 */

/**
 * Format a date in the local format with time
 * @param {string|Date} dateString - Date object or ISO date string
 * @param {string} language - Language code ('en', 'hi', 'mr')
 * @returns {string} Formatted date string
 */
export const formatDateTime = (dateString, language = 'en') => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  // Format options based on language
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  // Use different locale based on language
  let locale = 'en-US';
  if (language === 'hi') locale = 'hi-IN';
  if (language === 'mr') locale = 'mr-IN';
  
  try {
    return date.toLocaleString(locale, options);
  } catch (error) {
    // Fallback to default format if locale is not supported
    return date.toLocaleString('en-US', options);
  }
};

/**
 * Format a date in the local format without time
 * @param {string|Date} dateString - Date object or ISO date string
 * @param {string} language - Language code ('en', 'hi', 'mr')
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, language = 'en') => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  // Format options based on language
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  };
  
  // Use different locale based on language
  let locale = 'en-US';
  if (language === 'hi') locale = 'hi-IN';
  if (language === 'mr') locale = 'mr-IN';
  
  try {
    return date.toLocaleDateString(locale, options);
  } catch (error) {
    // Fallback to default format if locale is not supported
    return date.toLocaleDateString('en-US', options);
  }
};

/**
 * Format a time from a date
 * @param {string|Date} dateString - Date object or ISO date string
 * @param {string} language - Language code ('en', 'hi', 'mr')
 * @returns {string} Formatted time string
 */
export const formatTime = (dateString, language = 'en') => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  // Format options based on language
  const options = { 
    hour: '2-digit', 
    minute: '2-digit'
  };
  
  // Use different locale based on language
  let locale = 'en-US';
  if (language === 'hi') locale = 'hi-IN';
  if (language === 'mr') locale = 'mr-IN';
  
  try {
    return date.toLocaleTimeString(locale, options);
  } catch (error) {
    // Fallback to default format if locale is not supported
    return date.toLocaleTimeString('en-US', options);
  }
};

/**
 * Get relative time (like "2 days ago", "just now", etc.)
 * @param {string|Date} dateString - Date object or ISO date string
 * @param {string} language - Language code ('en', 'hi', 'mr')
 * @returns {string} Relative time string
 */
export const getRelativeTime = (dateString, language = 'en') => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  // Translation maps for different time units
  const translations = {
    en: {
      justNow: 'just now',
      secondsAgo: ' seconds ago',
      minuteAgo: '1 minute ago',
      minutesAgo: ' minutes ago',
      hourAgo: '1 hour ago',
      hoursAgo: ' hours ago',
      yesterday: 'yesterday',
      daysAgo: ' days ago',
      weekAgo: '1 week ago',
      weeksAgo: ' weeks ago',
      monthAgo: '1 month ago',
      monthsAgo: ' months ago',
      yearAgo: '1 year ago',
      yearsAgo: ' years ago'
    },
    hi: {
      justNow: 'अभी अभी',
      secondsAgo: ' सेकंड पहले',
      minuteAgo: '1 मिनट पहले',
      minutesAgo: ' मिनट पहले',
      hourAgo: '1 घंटा पहले',
      hoursAgo: ' घंटे पहले',
      yesterday: 'कल',
      daysAgo: ' दिन पहले',
      weekAgo: '1 सप्ताह पहले',
      weeksAgo: ' सप्ताह पहले',
      monthAgo: '1 महीना पहले',
      monthsAgo: ' महीने पहले',
      yearAgo: '1 साल पहले',
      yearsAgo: ' साल पहले'
    },
    mr: {
      justNow: 'आत्ताच',
      secondsAgo: ' सेकंद पूर्वी',
      minuteAgo: '1 मिनिट पूर्वी',
      minutesAgo: ' मिनिटे पूर्वी',
      hourAgo: '1 तास पूर्वी',
      hoursAgo: ' तास पूर्वी',
      yesterday: 'काल',
      daysAgo: ' दिवस पूर्वी',
      weekAgo: '1 आठवडा पूर्वी',
      weeksAgo: ' आठवडे पूर्वी',
      monthAgo: '1 महिना पूर्वी',
      monthsAgo: ' महिने पूर्वी',
      yearAgo: '1 वर्ष पूर्वी',
      yearsAgo: ' वर्षे पूर्वी'
    }
  };
  
  // Default to English if language not supported
  const trans = translations[language] || translations.en;
  
  if (diffInSeconds < 60) {
    return diffInSeconds < 10 ? trans.justNow : diffInSeconds + trans.secondsAgo;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return diffInMinutes === 1 ? trans.minuteAgo : diffInMinutes + trans.minutesAgo;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return diffInHours === 1 ? trans.hourAgo : diffInHours + trans.hoursAgo;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return trans.yesterday;
  }
  if (diffInDays < 7) {
    return diffInDays + trans.daysAgo;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return diffInWeeks === 1 ? trans.weekAgo : diffInWeeks + trans.weeksAgo;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return diffInMonths === 1 ? trans.monthAgo : diffInMonths + trans.monthsAgo;
  }
  
  const diffInYears = Math.floor(diffInDays / 365);
  return diffInYears === 1 ? trans.yearAgo : diffInYears + trans.yearsAgo;
};
