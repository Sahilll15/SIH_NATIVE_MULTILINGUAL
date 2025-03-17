import { Platform } from 'react-native';

// Base URLs for different environments
const URLS = {
  development: {
    ios: 'localhost',
    android: '10.0.2.2'
  },
  production: {
    ios: 'your-production-ios-url.com',
    android: 'your-production-android-url.com'
  }
};

// API Configuration
const API_CONFIG = {
  port: '8000',
  version: 'v1',
  protocol: 'http'
};

// Environment selection
const ENV = __DEV__ ? 'development' : 'production';

// Get base URL based on platform and environment
const getBaseUrl = () => {
  try {
    const baseHost = URLS[ENV][Platform.OS];
    if (!baseHost) {
      throw new Error(`Invalid platform: ${Platform.OS}`);
    }
    
    // For development, include port
    const port = ENV === 'development' ? `:${API_CONFIG.port}` : '';
    
    return `${API_CONFIG.protocol}://${baseHost}${port}/api/${API_CONFIG.version}`;
  } catch (error) {
    console.error('Error configuring baseUrl:', error);
    // Fallback to development Android URL if something goes wrong
    return `${API_CONFIG.protocol}://${URLS.development.android}:${API_CONFIG.port}/api/${API_CONFIG.version}`;
  }
};

const baseUrl = getBaseUrl();

console.log('baseUrl',baseUrl)

export default baseUrl;

// Export additional config if needed
export const config = {
  baseUrl,
  environment: ENV,
  platform: Platform.OS,
  apiVersion: API_CONFIG.version
};
