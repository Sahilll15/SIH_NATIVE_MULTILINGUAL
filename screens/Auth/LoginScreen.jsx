import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../Context/AuthContext';
import { handleError } from '../../utils/errorHandler';
import axiosInstance from '../../utils/axiosInstance';
import ErrorBoundary from '../../components/ErrorBoundary';

const LoginScreenContent = ({ navigation }) => {
  const { selectedLang, setTokenFunction, setUserDetailsFunctions, selectedType } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(
        selectedLang === 'Hindi' ? 'त्रुटि' : 'Error',
        selectedLang === 'Hindi' 
          ? 'कृपया ईमेल और पासवर्ड दर्ज करें'
          : 'Please enter email and password'
      );
      return;
    }

    setLoading(true);
    try {
      const endpoint = selectedType === "Lawyer" ? '/lawyer/loginLawyer' : '/priosioner/login';
      const response = await axiosInstance.post(endpoint, {
        email: email.toLowerCase(),
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        
        // First set the token to trigger user data fetch
        await setTokenFunction(token);
        
        // Then set user details
        await setUserDetailsFunctions(user);

        Alert.alert(
          selectedLang === 'Hindi' ? 'सफलता' : 'Success',
          selectedLang === 'Hindi' 
            ? 'सफलतापूर्वक लॉग इन किया गया'
            : 'Successfully logged in',
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          {selectedLang === 'Hindi' ? 'लॉग इन करें' : 'Login'}
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={selectedLang === 'Hindi' ? 'ईमेल' : 'Email'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
            placeholderTextColor="#7F8C8D"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={selectedLang === 'Hindi' ? 'पासवर्ड' : 'Password'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            editable={!loading}
            placeholderTextColor="#7F8C8D"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
            disabled={loading}
          >
            <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.loginButtonText}>
              {selectedLang === 'Hindi' ? 'लॉग इन करें' : 'Login'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.signupLink}
          onPress={() => navigation.navigate('SignUpSelection')}
          disabled={loading}
        >
          <Text style={styles.signupLinkText}>
            {selectedLang === 'Hindi' 
              ? 'खाता नहीं है? साइन अप करें'
              : 'No account? Sign up'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Wrap with ErrorBoundary
const LoginScreen = (props) => (
  <ErrorBoundary>
    <LoginScreenContent {...props} />
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
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: '#2C3E50',
  },
  eyeIcon: {
    padding: 8,
  },
  loginButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  loginButtonDisabled: {
    backgroundColor: '#95A5A6',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  signupLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  signupLinkText: {
    color: '#4A90E2',
    fontSize: 16,
  },
});

export default LoginScreen;
