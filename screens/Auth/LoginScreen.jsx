import React, { useEffect, useState } from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

// Premium background with subtle gradient and geometric patterns
const BACKGROUND_IMAGE = 'data:image/jpeg;base64,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';
// High-quality justice scales logo with transparent background
const LOGO_IMAGE = 'https://i.imgur.com/KS9XVpL.png';

const LoginScreenContent = ({ navigation }) => {
  const { selectedLang, setTokenFunction, setUserDetailsFunctions, selectedType,setSelectedTypeFunction ,setSelectedLangFunction } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showTypeSelector, setShowTypeSelector] = useState(false);


  useEffect(()=>{
    if(selectedType==='Prisioner'){
      setEmail('sahilchalke1011@gmail.com')
      setPassword('Sahil@123')
    } else if(selectedType==='Lawyer') {
      setEmail('lawyer@gmail.com')
      setPassword('lawyer@123')
    } else if(selectedType==='Governor') {
      setEmail('governor@gov.in')
      setPassword('governor@123')
    }
  },[selectedType])

  const t = translations[selectedLang] || translations.English;

  const languages = [
    { code: 'English', name: 'English', flag: '🇬🇧' },
    { code: 'Hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'Marathi', name: 'मराठी', flag: '🇮🇳' }
  ];

  const userTypes = [
    { code: 'Prisioner', name: t.prisoner },
    { code: 'Lawyer', name: t.lawyer },
    { code: 'Governor', name: t.governor || 'Governor' }
  ];

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(t.error, t.pleaseEnterCredentials);
      return;
    }

    setLoading(true);
    try {
      let endpoint;
      if (selectedType === "Lawyer") {
        endpoint = '/lawyer/loginLawyer';
      } else if (selectedType === "Governor") {
        endpoint = '/goverenr/login';
      } else {
        endpoint = '/priosioner/login';
      }
      
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

  const TypeSelector = () => (
    <View style={styles.selector}>
      <View style={styles.selectorContent}>
        <View style={styles.selectorHeader}>
          <Text style={styles.selectorTitle}>Select User Type</Text>
        </View>
        {userTypes.map((type) => (
          <TouchableOpacity
            key={type.code}
            style={[
              styles.selectorOption,
              selectedType === type.code && styles.selectedOption
            ]}
            onPress={() => {
              setSelectedTypeFunction(type.code);
              setShowTypeSelector(false);
            }}
          >
            <MaterialIcons
              name={type.code === 'Prisioner' ? 'person' : 'gavel'}
              size={22}
              color={selectedType === type.code ? '#FFFFFF' : '#4A90E2'}
            />
            <Text style={[
              styles.optionName,
              selectedType === type.code && styles.selectedOptionName
            ]}>
              {type.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={{ uri: BACKGROUND_IMAGE }}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={['rgba(25,80,150,0.85)', 'rgba(10,30,80,0.95)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

          <View style={styles.topButtonsContainer}>
            <TouchableOpacity style={styles.selectButton} onPress={() => setShowTypeSelector(!showTypeSelector)}>
              <Text style={styles.selectButtonText}>{selectedType}</Text>
              <MaterialIcons name="people" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.selectButton} onPress={() => setShowLanguageSelector(!showLanguageSelector)}>
              <Text style={styles.selectButtonText}>
                {languages.find(l => l.code === selectedLang)?.flag} {selectedLang}
              </Text>
              <MaterialIcons name="arrow-drop-down" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {showLanguageSelector && <LanguageSelector />}
          {showTypeSelector && <TypeSelector />}

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoid}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.logoContainer}>

                <Text style={styles.legalAidTitle}>{t.legalAidTitle}</Text>
                <Text style={styles.legalAidSubtitle}>{t.legalAidSubtitle}</Text>
                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <View style={styles.dividerIcon}>
                    <Icon name="gavel" size={20} color="#FFFFFF" />
                  </View>
                  <View style={styles.divider} />
                </View>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.formBars}>
                  {[...Array(5)].map((_, i) => (
                    <View key={i} style={styles.formBar} />
                  ))}
                </View>
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
                  textStyle={styles.loginButtonText}
                />

                <View style={styles.formBottomBars}>
                  {[...Array(5)].map((_, i) => (
                    <View key={i} style={styles.formBar} />
                  ))}
                </View>

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
  // Main container styles
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
    paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
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
    marginTop: height * 0.08,
    marginBottom: height * 0.04,
  },
  logoWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 0,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerIcon: {
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  legalAidTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    letterSpacing: 1,
  },
  legalAidSubtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    textAlign: 'center',
    marginHorizontal: 32,
    letterSpacing: 0.5,
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: Platform.OS === 'ios' ? 10 : StatusBar.currentHeight + 8,
    marginRight: 16,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
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
  selectButtonText: {
    color: '#FFFFFF',
    marginRight: 8,
    fontWeight: '600',
  },
  selector: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 45,
    right: 16,
    width: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 10,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  selectorContent: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  selectorOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  selectedOption: {
    backgroundColor: '#4A90E2',
  },
  languageFlag: {
    fontSize: 16,
    marginRight: 10,
  },
  optionName: {
    fontSize: 15,
    color: '#000',
    marginLeft: 8,
    fontWeight: '500',
  },
  selectedOptionName: {
    color: '#000',
    fontWeight: '600',
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
    backgroundColor: 'rgba(20, 30, 60, 0.95)',
    padding: 16,
    minWidth: 200,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  languageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
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
  languageText: {
    fontSize: 16,
    color: '#E0E0E0',
    flex: 1,
  },
  selectedLanguageText: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  checkIcon: {
    marginLeft: 8,
  },
  selectorHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    paddingBottom: 10,
    marginBottom: 5,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A90E2',
    textAlign: 'center',
  },
  loginContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 38,
    width: '100%',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  formContainer: {
    marginHorizontal: 24,
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
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
    marginBottom: 30,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  formBars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    height: 20,
    paddingHorizontal: 40,
  },
  formBar: {
    width: 2,
    height: 20,
    backgroundColor: 'rgba(42, 82, 152, 0.6)',
    borderRadius: 1,
  },
  formBottomBars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    height: 20,
    paddingHorizontal: 40,
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: 'rgba(245, 247, 250, 0.8)',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 54,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#334155',
    fontSize: 16,
  },
  passwordToggle: {
    padding: 8,
  },
  loginButton: {
    width: '100%',
    marginTop: 30,
    height: 58,
    borderRadius: 16,
    backgroundColor: '#4A90E2',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  signupButton: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#4A5568',
    fontSize: 16,
  },
});

export default LoginScreen;
