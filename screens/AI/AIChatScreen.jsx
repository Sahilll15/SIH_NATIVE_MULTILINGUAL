import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { LinearGradient } from 'expo-linear-gradient';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI('AIzaSyBJBUa6iFwzIdxhla4gSzS2DO9eh_HhmUo');

// Supported languages
const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' }
];

// UI text in different languages
const uiText = {
  en: {
    placeholder: 'Ask about your legal rights...',
    thinking: 'AI is thinking...',
    send: 'Send',
    selectLanguage: 'Select Language',
    error: 'Error',
    tryAgain: 'Please try again later.',
    welcome: 'Hello! I am your legal assistant. How can I help you today?'
  },
  hi: {
    placeholder: 'अपने कानूनी अधिकारों के बारे में पूछें...',
    thinking: 'AI सोच रहा है...',
    send: 'भेजें',
    selectLanguage: 'भाषा चुनें',
    error: 'त्रुटि',
    tryAgain: 'कृपया बाद में पुनः प्रयास करें।',
    welcome: 'नमस्ते! मैं आपका कानूनी सहायक हूं। मैं आपकी कैसे मदद कर सकता हूं?'
  },
  mr: {
    placeholder: 'तुमच्या कायदेशीर अधिकारांबद्दल विचारा...',
    thinking: 'AI विचार करत आहे...',
    send: 'पाठवा',
    selectLanguage: 'भाषा निवडा',
    error: 'त्रुटी',
    tryAgain: 'कृपया नंतर पुन्हा प्रयत्न करा.',
    welcome: 'नमस्कार! मी तुमचा कायदेशीर सहाय्यक आहे. मी तुमची कशी मदत करू शकतो?'
  },
  gu: {
    placeholder: 'તમારા કાનૂની અધિકારો વિશે પૂછો...',
    thinking: 'AI વિચારી રહ્યું છે...',
    send: 'મોકલો',
    selectLanguage: 'ભાષા પસંદ કરો',
    error: 'ભૂલ',
    tryAgain: 'કૃપા કરી પછી ફરી પ્રયાસ કરો.',
    welcome: 'નમસ્તે! હું તમારો કાનૂની સહાયક છું. હું તમારી કેવી રીતે મદદ કરી શકું?'
  },
  bn: {
    placeholder: 'আপনার আইনি অধিকার সম্পর্কে জিজ্ঞাসা করুন...',
    thinking: 'AI চিন্তা করছে...',
    send: 'পাঠান',
    selectLanguage: 'ভাষা নির্বাচন করুন',
    error: 'ত্রুটি',
    tryAgain: 'অনুগ্রহ করে পরে আবার চেষ্টা করুন.',
    welcome: 'হ্যালো! আমি আপনার আইনি সহকারী। আমি আপনাকে কীভাবে সাহায্য করতে পারি?'
  },
  ta: {
    placeholder: 'உங்கள் சட்ட உரிமைகள் பற்றி கேளுங்கள்...',
    thinking: 'AI சிந்தித்துக் கொண்டிருக்கிறது...',
    send: 'அனுப்பு',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    error: 'பிழை',
    tryAgain: 'தயவுசெய்து பின்னர் மீண்டும் முயற்சிக்கவும்.',
    welcome: 'வணக்கம்! நான் உங்கள் சட்ட உதவியாளர். நான் உங்களுக்கு எப்படி உதவ முடியும்?'
  },
  te: {
    placeholder: 'మీ చట్టపరమైన హక్కుల గురించి అడగండి...',
    thinking: 'AI ఆలోచిస్తోంది...',
    send: 'పంపండి',
    selectLanguage: 'భాష ఎంచుకోండి',
    error: 'లోపం',
    tryAgain: 'దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.',
    welcome: 'హలో! నేను మీ చట్టపరమైన సహాయకుడిని. నేను మీకు ఎలా సహాయం చేయగలను?'
  },
  kn: {
    placeholder: 'ನಿಮ್ಮ ಕಾನೂನು ಹಕ್ಕುಗಳ ಬಗ್ಗೆ ಕೇಳಿ...',
    thinking: 'AI ಯೋಚಿಸುತ್ತಿದೆ...',
    send: 'ಕಳುಹಿಸಿ',
    selectLanguage: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    error: 'ದೋಷ',
    tryAgain: 'ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    welcome: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಕಾನೂನು ಸಹಾಯಕ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?'
  },
  ml: {
    placeholder: 'നിങ്ങളുടെ നിയമപരമായ അവകാശങ്ങളെക്കുറിച്ച് ചോദിക്കൂ...',
    thinking: 'AI ചിന്തിക്കുന്നു...',
    send: 'അയയ്ക്കുക',
    selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    error: 'പിശക്',
    tryAgain: 'ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക.',
    welcome: 'നമസ്കാരം! ഞാൻ നിങ്ങളുടെ നിയമ സഹായി ആണ്. എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാൻ കഴിയും?'
  },
  pa: {
    placeholder: 'ਆਪਣੇ ਕਾਨੂੰਨੀ ਅਧਿਕਾਰਾਂ ਬਾਰੇ ਪੁੱਛੋ...',
    thinking: 'AI ਸੋਚ ਰਿਹਾ ਹੈ...',
    send: 'ਭੇਜੋ',
    selectLanguage: 'ਭਾਸ਼ਾ ਚੁਣੋ',
    error: 'ਗਲਤੀ',
    tryAgain: 'ਕਿਰਪਾ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
    welcome: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਕਾਨੂੰਨੀ ਸਹਾਇਕ ਹਾਂ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?'
  }
};

const AIChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [chat, setChat] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    initializeChat();
  }, [selectedLanguage]);

  const initializeChat = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const chat = model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: `You are a professional legal assistant specializing in helping undertrial prisoners in India. Your role is to:

1. Provide clear, accurate information about legal rights, procedures, and assistance
2. Use simple, respectful language that is easy to understand
3. Show empathy while maintaining professional boundaries
4. Never provide incorrect or misleading legal information
5. Always encourage seeking proper legal representation when needed
6. Maintain strict confidentiality and professionalism
7. Focus on Indian legal system and relevant laws
8. Explain legal terms in simple language
9. Be patient and supportive while addressing concerns
10. Avoid any discriminatory or biased language

VERY IMPORTANT: Always respond in the same language as the selected interface language. Current language: ${languages.find(lang => lang.code === selectedLanguage)?.name}. 

For example:
- If interface is in Hindi, respond in Hindi
- If interface is in Tamil, respond in Tamil
- If interface is in Bengali, respond in Bengali
etc.

Remember: Your responses should be concise, accurate, and focused on helping users understand their legal rights and options within the Indian legal system.` }]
          },
          {
            role: 'model',
            parts: [{ text: uiText[selectedLanguage].welcome }]
          }
        ],
      });
      setModel(model);
      setChat(chat);
      setMessages([
        {
          id: '1',
          text: uiText[selectedLanguage].welcome,
          sender: 'ai',
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error('Error initializing chat:', error);
      Alert.alert(
        uiText[selectedLanguage].error,
        uiText[selectedLanguage].tryAgain,
        [{ text: 'OK' }]
      );
    }
  };

  const handleSend = async () => {
    if (inputText.trim() === '' || !chat) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Remind AI about the language before each response
      const languagePrompt = `Remember to respond in ${languages.find(lang => lang.code === selectedLanguage)?.name} language.`;
      const result = await chat.sendMessage(`${languagePrompt}\n\nUser message: ${inputText}`);
      const response = await result.response;
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: response.text(),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      Alert.alert(
        uiText[selectedLanguage].error,
        uiText[selectedLanguage].tryAgain,
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.aiMessage
    ]}>
      <View style={styles.messageContent}>
        {item.sender === 'ai' && (
          <View style={styles.aiAvatar}>
            <Icon name="gavel" size={18} color="#fff" />
          </View>
        )}
        <View style={[
          styles.textContainer,
          item.sender === 'user' ? styles.userTextContainer : styles.aiTextContainer
        ]}>
          <Text style={[
            styles.messageText,
            item.sender === 'user' && styles.userMessageText
          ]}>{item.text}</Text>
          <Text style={[
            styles.timestamp,
            item.sender !== 'user' && styles.aiTimestamp
          ]}>
            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        selectedLanguage === item.code && styles.selectedLanguageItem
      ]}
      onPress={() => {
        setSelectedLanguage(item.code);
        setShowLanguageModal(false);
      }}
    >
      <Text style={[
        styles.languageText,
        selectedLanguage === item.code && styles.selectedLanguageText
      ]}>
        {item.native} ({item.name})
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="#1A365D" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>{selectedLanguage === 'en' ? 'Legal Assistant' : uiText[selectedLanguage].selectLanguage}</Text>
            <Text style={styles.headerSubtitle}>{selectedLanguage === 'en' ? 'Ask anything about legal rights' : ''}</Text>
          </View>
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => setShowLanguageModal(true)}
          >
            <Icon name="language" size={18} color="#fff" />
            <Text style={styles.languageButtonText}>
              {languages.find(lang => lang.code === selectedLanguage)?.native}
            </Text>
          </TouchableOpacity>
        </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        onLayout={() => flatListRef.current?.scrollToEnd()}
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#1A365D" />
          <Text style={styles.loadingText}>{uiText[selectedLanguage].thinking}</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder={uiText[selectedLanguage].placeholder}
          placeholderTextColor="#A0AEC0"
          multiline
          maxLength={500}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            (!inputText.trim() || isLoading) && styles.sendButtonDisabled
          ]}
          onPress={handleSend}
          disabled={!inputText.trim() || isLoading}
        >
          <Icon 
            name="paper-plane" 
            size={20} 
            color={(!inputText.trim() || isLoading) ? '#A0A0A0' : '#fff'} 
            solid
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{uiText[selectedLanguage].selectLanguage}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowLanguageModal(false)}
              >
                <Icon name="times" size={18} color="#4A5568" />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {languages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.languageItem,
                    selectedLanguage === language.code && styles.selectedLanguageItem
                  ]}
                  onPress={() => {
                    setSelectedLanguage(language.code);
                    setShowLanguageModal(false);
                  }}
                >
                  <Text style={[
                    styles.languageText,
                    selectedLanguage === language.code && styles.selectedLanguageText
                  ]}>
                    {language.native} ({language.name})
                  </Text>
                  {selectedLanguage === language.code && (
                    <Icon name="check-circle" size={20} color="#2A4365" style={styles.checkIcon} solid />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      
      {messages.length === 0 && !isLoading && (
        <View style={styles.emptyChat}>
          <Icon name="balance-scale" size={80} color="#CBD5E0" style={{marginBottom: 20}} />
          <Text style={styles.emptyText}>{selectedLanguage === 'en' ? 'Your legal assistant is ready' : uiText[selectedLanguage].welcome}</Text>
          <Text style={styles.emptySubtext}>{selectedLanguage === 'en' ? 'Ask about your legal rights, procedures, or any legal questions you have' : ''}</Text>
        </View>
      )}  
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFE',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#1A365D',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E2E8F0',
    marginTop: 2,
  },
  headerLeft: {
    flex: 1,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-end',
  },
  languageButtonText: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '85%',
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  aiMessage: {
    alignSelf: 'flex-start',
  },
  textContainer: {
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    elevation: 3,
  },
  userTextContainer: {
    borderBottomRightRadius: 5, // sharper corner on user bubble
    backgroundColor: '#2D5998',
  },
  aiTextContainer: {
    borderBottomLeftRadius: 5, // sharper corner on AI bubble
    backgroundColor: '#fff',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
  userMessageText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 5,
    alignSelf: 'flex-end',
    fontStyle: 'italic',
  },
  aiTimestamp: {
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    marginRight: 12,
    maxHeight: 120,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sendButton: {
    backgroundColor: '#1A365D',
    borderRadius: 25,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#CBD5E0',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 25,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  loadingText: {
    marginLeft: 12,
    color: '#4A5568',
    fontSize: 15,
    fontWeight: '500',
  },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A365D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '75%',
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A365D',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  languageItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedLanguageItem: {
    backgroundColor: '#EBF8FF',
  },
  languageText: {
    fontSize: 17,
    color: '#2D3748',
    flex: 1,
  },
  selectedLanguageText: {
    color: '#2A4365',
    fontWeight: 'bold',
  },
  checkIcon: {
    marginLeft: 10,
  },
  emptyChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyImage: {
    width: 150,
    height: 150,
    opacity: 0.8,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 15,
    color: '#A0AEC0',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  legalIcon: {
    marginRight: 15,
  }
});

export default AIChatScreen;
