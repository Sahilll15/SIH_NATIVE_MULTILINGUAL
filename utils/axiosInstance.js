import axios from 'axios';
import baseUrl from '../config';
import { handleError } from './errorHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create custom axios instance
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers = {
          ...config.headers,
          'Authorization': `Bearer ${token}`
        };
      }
    } catch (error) {
      console.error('Error accessing token:', error);
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Detailed error logging
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.config?.headers,
      timestamp: new Date().toISOString()
    });
    
    // Network error handling
    if (!error.response) {
      console.error('Network Error:', error.message);
      error.isNetworkError = true;
    }
    
    // Token expiration handling
    if (error.response?.status === 401) {
      try {
        // Clear token
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userDetails');
      } catch (storageError) {
        console.error('Error clearing storage:', storageError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
