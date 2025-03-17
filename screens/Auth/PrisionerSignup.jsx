import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../Context/AuthContext';
import { handleError } from '../../utils/errorHandler';
import axiosInstance from '../../utils/axiosInstance';
import ErrorBoundary from '../../components/ErrorBoundary';

const PrisonerSignupScreen = ({ navigation }) => {
  const { selectedLang, setTokenFunction, setUserDetailsFunctions } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    addharCard: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  }, []);

  const handleSignup = async () => {
    try {
      setLoading(true);
      
      // Basic validation
      if (!formData.email || !formData.password || !formData.name) {
        throw new Error('Email, password and name are required');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Invalid email format');
      }

      // Phone number validation (10 digits)
      if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
        throw new Error('Invalid phone number format');
      }

      // Aadhar card validation (12 digits)
      if (!formData.addharCard || !/^\d{12}$/.test(formData.addharCard)) {
        throw new Error('Invalid Aadhar card number');
      }

      const response = await axiosInstance.post('/prisioners/signup', formData);

      if (response.status === 200) {
        const { token, user } = response.data;
        
        // First set the token to trigger user data fetch
        await setTokenFunction(token);
        
        // Then set user details
        await setUserDetailsFunctions(user);

        Alert.alert(
          selectedLang === 'Hindi' ? 'सफलता' : 'Success',
          selectedLang === 'Hindi' 
            ? 'आपका खाता सफलतापूर्वक बनाया गया है'
            : 'Your account has been created successfully',
          [
            {
              text: 'OK',
              onPress: () => navigation.replace('Home')
            }
          ]
        );
      }
    } catch (error) {
      const { message } = handleError(error, selectedLang === 'Hindi' ? 'hi' : 'en');
      Alert.alert(
        selectedLang === 'Hindi' ? 'त्रुटि' : 'Error',
        message
      );
    } finally {
      setLoading(false);
    }
  };

  const InputField = React.memo(({ placeholder, value, onChangeText, icon, secureTextEntry, keyboardType }) => (
    <View style={styles.inputContainer}>
      <FontAwesome5 name={icon} size={20} color="#4A90E2" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={selectedLang === 'Hindi' ? placeholder.hi : placeholder.en}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor="#7F8C8D"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!loading}
      />
    </View>
  ));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          {selectedLang === 'Hindi' ? 'बंदी पंजीकरण' : 'Prisoner Registration'}
        </Text>
        
        <InputField
          placeholder={{ en: 'Name', hi: 'नाम' }}
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
          icon="user"
        />

        <InputField
          placeholder={{ en: 'Email', hi: 'ईमेल' }}
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          icon="envelope"
          keyboardType="email-address"
        />

        <InputField
          placeholder={{ en: 'Password', hi: 'पासवर्ड' }}
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
          icon="lock"
          secureTextEntry
        />

        <InputField
          placeholder={{ en: 'Phone Number', hi: 'फोन नंबर' }}
          value={formData.phoneNumber}
          onChangeText={(text) => handleInputChange('phoneNumber', text)}
          icon="phone"
          keyboardType="numeric"
        />

        <InputField
          placeholder={{ en: 'Aadhar Card Number', hi: 'आधार कार्ड नंबर' }}
          value={formData.addharCard}
          onChangeText={(text) => handleInputChange('addharCard', text)}
          icon="id-card"
          keyboardType="numeric"
        />

        <TouchableOpacity 
          style={[styles.signupButton, loading && styles.signupButtonDisabled]}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.signupButtonText}>
              {selectedLang === 'Hindi' ? 'पंजीकरण करें' : 'Register'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
          disabled={loading}
        >
          <Text style={styles.loginLinkText}>
            {selectedLang === 'Hindi' 
              ? 'पहले से खाता है? लॉग इन करें' 
              : 'Already have an account? Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Wrap with ErrorBoundary
const PrisonerSignup = (props) => (
  <ErrorBoundary>
    <PrisonerSignupScreen {...props} />
  </ErrorBoundary>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  formContainer: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },
  signupButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  signupButtonDisabled: {
    backgroundColor: '#95A5A6',
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  loginLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#4A90E2',
    fontSize: 16,
  },
});

export default PrisonerSignup;