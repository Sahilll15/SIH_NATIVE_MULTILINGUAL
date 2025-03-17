import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import { useAuth } from '../../Context/AuthContext';
import { handleError } from '../../utils/errorHandler';
import axiosInstance from '../../utils/axiosInstance';
import ErrorBoundary from '../../components/ErrorBoundary';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BlurView } from 'expo-blur';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';

const translations = {
  Hindi: {
    login: 'लॉग इन करें',
    email: 'ईमेल',
    password: 'पासवर्ड',
    error: 'त्रुटि',
    success: 'सफलता',
    pleaseEnterCredentials: 'कृपया ईमेल और पासवर्ड दर्ज करें',
    loginSuccess: 'सफलतापूर्वक लॉग इन किया गया',
    noAccount: 'खाता नहीं है? साइन अप करें',
    selectLanguage: 'भाषा चुनें',
    welcomeBack: 'वापसी पर स्वागत है',
    loginToContinue: 'जारी रखने के लिए लॉग इन करें',
    legalAidTitle: 'कानूनी सहायता',
    legalAidSubtitle: 'न्याय तक पहुंच को सशक्त बनाना',
  },
  English: {
    login: 'Login',
    email: 'Email',
    password: 'Password',
    error: 'Error',
    success: 'Success',
    pleaseEnterCredentials: 'Please enter email and password',
    loginSuccess: 'Successfully logged in',
    noAccount: 'No account? Sign up',
    selectLanguage: 'Select Language',
    welcomeBack: 'Welcome Back',
    loginToContinue: 'Login to continue',
    legalAidTitle: 'Legal Aid',
    legalAidSubtitle: 'Empowering Access to Justice',
  },
  Marathi: {
    login: 'लॉगिन करा',
    email: 'ईमेल',
    password: 'पासवर्ड',
    error: 'त्रुटी',
    success: 'यशस्वी',
    pleaseEnterCredentials: 'कृपया ईमेल आणि पासवर्ड टाका',
    loginSuccess: 'यशस्वीरित्या लॉगिन केले',
    noAccount: 'खाते नाही? साइन अप करा',
    selectLanguage: 'भाषा निवडा',
    welcomeBack: 'पुन्हा स्वागत आहे',
    loginToContinue: 'सुरू ठेवण्यासाठी लॉगिन करा',
    legalAidTitle: 'कायदेशीर मदत',
    legalAidSubtitle: 'न्यायापर्यंत पोहोचण्यास सक्षम करणे',
  }
};

const BACKGROUND_IMAGE = 'https://img.freepik.com/free-vector/abstract-blue-geometric-shapes-background_1035-17545.jpg';
const LOGO_IMAGE = 'https://img.icons8.com/color/96/000000/scales-of-justice.png';

const LoginScreenContent = ({ navigation }) => {
  const { selectedLang, setTokenFunction, setUserDetailsFunctions, selectedType, setSelectedLangFunction } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const t = translations[selectedLang] || translations.English;

  const languages = [
    { code: 'English', name: 'English', flag: '🇬🇧' },
    { code: 'Hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'Marathi', name: 'मराठी', flag: '🇮🇳' }
  ];

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(t.error, t.pleaseEnterCredentials);
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
        await setTokenFunction(token);
        await setUserDetailsFunctions(user);
        Alert.alert(t.success, t.loginSuccess, [
          { text: 'OK', onPress: () => navigation.replace('Home') }
        ]);
      }
    } catch (error) {
      const { message } = handleError(error, selectedLang === 'Hindi' ? 'hi' : 'en');
      Alert.alert(t.error, message);
    } finally {
      setLoading(false);
    }
  };

  const LanguageSelector = () => (
    <BlurView intensity={90} tint="light" style={styles.languageSelector}>
      <View style={styles.languageContent}>
        <Text style={styles.languageTitle}>{t.selectLanguage}</Text>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageOption,
              selectedLang === lang.code && styles.selectedLanguage
            ]}
            onPress={() => {
              setSelectedLangFunction(lang.code);
              setShowLanguageSelector(false);
            }}
          >
            <Text style={styles.languageFlag}>{lang.flag}</Text>
            <Text style={[
              styles.languageText,
              selectedLang === lang.code && styles.selectedLanguageText
            ]}>
              {lang.name}
            </Text>
            {selectedLang === lang.code && (
              <Icon name="check" size={20} color="#4A90E2" style={styles.checkIcon} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </BlurView>
  );

  return (
    <ImageBackground
      source={{ uri: BACKGROUND_IMAGE }}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.8)']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
          
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => setShowLanguageSelector(!showLanguageSelector)}
          >
            <Text style={styles.languageButtonText}>
              {languages.find(l => l.code === selectedLang)?.flag} {selectedLang}
            </Text>
            <Icon name="chevron-down" size={20} color="#4A90E2" />
          </TouchableOpacity>

          {showLanguageSelector && <LanguageSelector />}

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoid}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.logoContainer}>
                <Image
                  source={{ uri: LOGO_IMAGE }}
                  style={styles.logo}
                />
                <Text style={styles.legalAidTitle}>{t.legalAidTitle}</Text>
                <Text style={styles.legalAidSubtitle}>{t.legalAidSubtitle}</Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.headerContainer}>
                  <Text style={styles.welcomeText}>{t.welcomeBack}</Text>
                  <Text style={styles.subtitle}>{t.loginToContinue}</Text>
                </View>

                <CustomInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder={t.email}
                  iconName="email-outline"
                  keyboardType="email-address"
                  editable={!loading}
                />

                <CustomInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder={t.password}
                  iconName="lock-outline"
                  secureTextEntry={!showPassword}
                  editable={!loading}
                  rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
                  onRightIconPress={() => setShowPassword(!showPassword)}
                />

                <CustomButton
                  title={t.login}
                  onPress={handleLogin}
                  loading={loading}
                  disabled={loading}
                  style={styles.loginButton}
                />

                <CustomButton
                  title={t.noAccount}
                  onPress={() => navigation.navigate('SignUpSelection')}
                  disabled={loading}
                  variant="outline"
                  style={styles.signupButton}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

const LoginScreen = (props) => (
  <ErrorBoundary>
    <LoginScreenContent {...props} />
  </ErrorBoundary>
);

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.1,
    marginBottom: height * 0.05,
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 16,
  },
  legalAidTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  legalAidSubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginHorizontal: 32,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: 12,
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 8,
    marginRight: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
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
  languageButtonText: {
    fontSize: 16,
    marginRight: 4,
    color: '#4A90E2',
  },
  languageSelector: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight + 60,
    right: 16,
    borderRadius: 12,
    overflow: 'hidden',
    zIndex: 1000,
  },
  languageContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    minWidth: 200,
  },
  languageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  selectedLanguage: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
  },
  languageFlag: {
    fontSize: 20,
    marginRight: 8,
  },
  languageText: {
    fontSize: 16,
    color: '#2C3E50',
    flex: 1,
  },
  selectedLanguageText: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  checkIcon: {
    marginLeft: 8,
  },
  formContainer: {
    marginHorizontal: 24,
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerContainer: {
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  loginButton: {
    marginTop: 24,
  },
  signupButton: {
    marginTop: 16,
  },
});

export default LoginScreen;
