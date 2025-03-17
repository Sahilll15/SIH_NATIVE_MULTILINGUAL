import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../utils/axiosInstance';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [token, setToken] = useState(null);
  const [selectedLang, setSelectedLang] = useState('English');
  const [selectedType, setSelectedType] = useState('Prisioner');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  useEffect(() => {
    if (token) {
      fetchLoggedInUser();
    }
  }, [token]);

  const loadStoredAuth = async () => {
    try {
      const [storedToken, storedLang, storedType] = await Promise.all([
        AsyncStorage.getItem('userToken'),
        AsyncStorage.getItem('selectedLang'),
        AsyncStorage.getItem('selectedType')
      ]);

      if (storedToken) setToken(storedToken);
      if (storedLang) setSelectedLang(storedLang);
      if (storedType) setSelectedType(storedType);
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLoggedInUser = async () => {
    try {
      const response = await axiosInstance.post('/prisioners/getLoggedInUser');
      if (response.status === 200) {
        console.log('User data fetched:', response.data);
        setUserDetails(response.data.user);
        await AsyncStorage.setItem('userDetails', JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.error('Error fetching logged in user:', error);
      if (error.response?.status === 401) {
        await logout();
      }
    }
  };

  const setTokenFunction = async (newToken) => {
    try {
      if (newToken) {
        await AsyncStorage.setItem('userToken', newToken);
        setToken(newToken);
      } else {
        await logout();
      }
    } catch (error) {
      console.error('Error setting token:', error);
    }
  };

  const setUserDetailsFunctions = async (details) => {
    try {
      if (details) {
        await AsyncStorage.setItem('userDetails', JSON.stringify(details));
        setUserDetails(details);
      } else {
        await AsyncStorage.removeItem('userDetails');
        setUserDetails(null);
      }
    } catch (error) {
      console.error('Error setting user details:', error);
    }
  };

  const setSelectedLangFunction = async (lang) => {
    try {
      await AsyncStorage.setItem('selectedLang', lang);
      setSelectedLang(lang);
    } catch (error) {
      console.error('Error setting language:', error);
    }
  };

  const setSelectedTypeFunction = async (type) => {
    try {
      await AsyncStorage.setItem('selectedType', type);
      setSelectedType(type);
    } catch (error) {
      console.error('Error setting type:', error);
    }
  };

  const logout = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem('userToken'),
        AsyncStorage.removeItem('userDetails'),
      ]);
      setToken(null);
      setUserDetails(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const value = {
    userDetails,
    token,
    selectedLang,
    selectedType,
    loading,
    setTokenFunction,
    setUserDetailsFunctions,
    setSelectedLangFunction,
    setSelectedTypeFunction,
    logout
  };

  if (loading) {
    return null; // or a loading spinner component
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
