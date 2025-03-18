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
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
            <Icon name="robot" size={20} color="#fff" />
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
          <Text style={styles.timestamp}>
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
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => setShowLanguageModal(true)}
        >
          <Icon name="language" size={20} color="#4A90E2" />
          <Text style={styles.languageButtonText}>
            {languages.find(lang => lang.code === selectedLanguage)?.native}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        style={styles.messagesList}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        onLayout={() => flatListRef.current?.scrollToEnd()}
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#4A90E2" />
          <Text style={styles.loadingText}>{uiText[selectedLanguage].thinking}</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={uiText[selectedLanguage].placeholder}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={1000}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim() || isLoading}
        >
          <Icon name="paper-plane" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showLanguageModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {uiText[selectedLanguage].selectLanguage}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowLanguageModal(false)}
              >
                <Icon name="times" size={20} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageItem,
                    selectedLanguage === lang.code && styles.selectedLanguageItem,
                  ]}
                  onPress={() => {
                    setSelectedLanguage(lang.code);
                    setShowLanguageModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.languageText,
                      selectedLanguage === lang.code && styles.selectedLanguageText,
                    ]}
                  >
                    {`${lang.native} (${lang.name})`}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingBottom: Platform.OS === 'ios' ? 34 : 16, 
  },
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
  },
  languageButtonText: {
    marginLeft: 8,
    color: '#4A90E2',
    fontSize: 16,
  },
  messagesList: {
    padding: 15,
  },
  messageContainer: {
    marginBottom: 15,
    maxWidth: '80%',
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
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  userTextContainer: {
    backgroundColor: '#4A90E2',
  },
  aiTextContainer: {
    backgroundColor: '#fff',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  userMessageText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'flex-end',
    paddingBottom: Platform.OS === 'ios' ? 25 : 15, 
    marginBottom: Platform.OS === 'android' ? 10 : 0, 
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  loadingText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 14,
  },
  aiAvatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  languageItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  selectedLanguageItem: {
    backgroundColor: '#F0F8FF',
  },
  languageText: {
    fontSize: 16,
    color: '#333',
  },
  selectedLanguageText: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
});

export default AIChatScreen;
